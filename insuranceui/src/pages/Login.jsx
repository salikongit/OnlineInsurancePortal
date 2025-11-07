import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/hooks/use-toast";
import { Button } from "../components/lightswind/button";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({}); // New: Field-specific errors
  const { toast } = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email || !emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.password || form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      toast({
        title: "Validation Failed ⚠️",
        description: "Please correct the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:7000/login", {
        ...form,
        role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("storage"));

      toast({
        title: "Login Successful ✅",
        description: `Welcome aboard, ${res.data.user.name}!`,
        variant: "success",
      });

      navigate(role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials. Please try again.");
      toast({
        title: "Login failed ❌",
        description: "Invalid email or password.",
        variant: "warning",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200">
      <div className="bg-white shadow-lg rounded-4xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 ${
              validationErrors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            required
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mb-4">
              {validationErrors.email}
            </p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 ${
              validationErrors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            required
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs mb-4">
              {validationErrors.password}
            </p>
          )}

          <Button type="submit" className="mt-4">
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
