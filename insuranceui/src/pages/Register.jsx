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
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!form.name || form.name.length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }
    if (!form.email || !emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.password || form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (form.phone && !phoneRegex.test(form.phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
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
      const res = await axios.post("http://localhost:7000/register", form);

      toast({
        title: "Registration Successful ",
        description: `Welcome aboard, ${
          res.data.name || form.name
        }! You can now log in.`,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again with valid details.");

      toast({
        title: "Registration Failed ",
        description: "Something went wrong. Please check your details.",
        variant: "destructive",
      });
    }
  };

  const getInputClassName = (fieldName) =>
    `w-full border rounded-md px-3 py-2 mb-1 focus:outline-none focus:ring-2 ${
      validationErrors[fieldName]
        ? "border-red-500 focus:ring-red-500"
        : "focus:ring-blue-500"
    }`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200">
      <div className="bg-slate-50 rounded-4xl shadow-lg p-8 w-full mt-40 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className={getInputClassName("name")}
            required
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mb-4">{validationErrors.name}</p>
          )}

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={getInputClassName("email")}
            required
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mb-4">
              {validationErrors.email}
            </p>
          )}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            onChange={handleChange}
            className={getInputClassName("password")}
            required
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs mb-4">
              {validationErrors.password}
            </p>
          )}

          {/* Phone Number Input */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (optional, 10 digits)"
            onChange={handleChange}
            className={getInputClassName("phone")}
            maxLength="10" // Hint for user input
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-xs mb-4">
              {validationErrors.phone}
            </p>
          )}

          {/* Address Input */}
          <textarea
            name="address"
            placeholder="Address (optional)"
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
