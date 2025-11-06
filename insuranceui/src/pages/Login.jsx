// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:7000/login", form);
//       alert("Login successful!");
//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-neutral-200">
//       <div className="bg-white shadow-lg rounded-4xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 mt-4 text-center">
//           Don’t have an account?{" "}
//           <button
//             className="text-blue-600 hover:underline"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/hooks/use-toast";
import { Button } from "../components/lightswind/button";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user"); // 👈 Default role = user
  const [error, setError] = useState("");
  const { toast } = useToast(); // ✅ Call the hook
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send role to backend
      const res = await axios.post("http://localhost:7000/login", {
        ...form,
        role,
      });

      // alert(`${role === "admin" ? "Admin" : "User"} login successful!`);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      toast({
        title: "Login Successfull bro",
        description: `Welcome back!! ${role}`,
      });
      // Redirect based on role
      navigate(role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials. Please try again.");
      toast({
        title: "Login failed ❌",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200">
      <div className="bg-white shadow-lg rounded-4xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* 👇 Role Selection */}
          <div className="flex justify-center mb-6">
            <label className="mr-6 flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="accent-blue-600"
              />
              <span>User</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                className="accent-blue-600"
              />
              <span>Admin</span>
            </label>
          </div>

          {/* 👇 Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* 👇 Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* 👇 Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            {role === "admin" ? "Admin Login" : "User Login"}
          </button> */}

          <Button type="submit">
            {role === "admin" ? "Admin Login" : "User Login"}
          </Button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
