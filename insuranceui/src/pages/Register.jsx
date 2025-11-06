// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await axios.post("http://localhost:7000/register", form);
//       alert("Registration successful! You can now log in.");
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//       setError("Registration failed. Try again with valid details.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen  bg-neutral-200">
//       <div className="bg-slate-50 rounded-4xl shadow-lg  p-8 w-full  mt-40 max-w-md">
//         <h2 className="text-2xl  font-semibold text-center mb-6">Register</h2>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
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
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <textarea
//             name="address"
//             placeholder="Address"
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-900 transition"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 mt-4 text-center">
//           Already have an account?{" "}
//           <button
//             className="text-blue-600 hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
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

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:7000/register", form);

      toast({
        title: "Registration Successful 🎉",
        description: `Welcome aboard, ${
          res.data.name || form.name
        }! You can now log in.`,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again with valid details.");

      toast({
        title: "Registration Failed ❌",
        description: "Something went wrong. Please check your details.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200">
      <div className="bg-slate-50 rounded-4xl shadow-lg p-8 w-full mt-40 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
