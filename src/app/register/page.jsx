"use client";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation"; // use "next/router" if you're using the pages directory
import { AuthContext } from "../../contexts/AuthProvider";
import UseAccessToken from "../../hooks/UseAccessToken";
import Loading from "@/components/Loading";
import UpButton from "@/components/UpButton";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    role: "User",
  });

  const { createUser, updateUserProfile, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = UseAccessToken(loginUserEmail);
  if (token) {
    nevigate("/");
    window.location.reload(false);
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // reset error when typing
  };

  // user data submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://single-plate-express-backend.vercel.app/users-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          phone: formData.phone,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        createUser(formData.email, formData.password).then((result) => {
          const user = result.user;
          if (user) {
            toast.success("User registered successfully! Please Login to access your account");
            handleUpdateUser(formData.name); // update user profile with name
            router.push("/"); // redirect to login page or home page
            loading;
          }
        });

        // maybe redirect or clear form here
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Server error");
    }
  };
  // update user
  const handleUpdateUser = (name) => {
    const currentUser = {
      displayName: name,
    };
    updateUserProfile(currentUser)
      .then(() => {})
      .catch((error) => toast.error(error));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="p-3 border border-gray-300 rounded-xl" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="p-3 border border-gray-300 rounded-xl" required />
        </div>

        {/* Password Fields with Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl pr-10"
              required
            />
            <span className="absolute right-3 top-4 text-gray-500 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl pr-10"
              required
            />
            <span className="absolute right-3 top-4 text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Name */}
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl" required />

        {/* Street */}
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl" required />

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-3 border border-gray-300 rounded-xl" required />
          <input type="text" name="state" placeholder="State/Province" value={formData.state} onChange={handleChange} className="p-3 border border-gray-300 rounded-xl" required />
          <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="p-3 border border-gray-300 rounded-xl" required />
        </div>

        {/* Password Error */}
        {/* {error && toast.error`${error}`} */}
        {error && <p className="text-red-500 text-lg font-bold">⚠️{error}</p>}

        {/* Submit Button */}
        <div className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600">
            Login{" "}
          </Link>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 cursor-pointer transition">
          {loading ? <Loading /> : "Create Account"}
        </button>
      </form>
      <UpButton />
    </div>
  );
}
