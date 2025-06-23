"use client";
import UpButton from "@/components/UpButton";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Enter Your Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md mb-4" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md cursor-pointer hover:bg-green-700">
            Reset Password
          </button>
          <Link href={"/"} className="block text-center mt-4">
            <button className="w-full bg-green-600 text-white py-2 rounded-md cursor-pointer hover:bg-green-700">Home</button>
          </Link>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
      <UpButton />
    </div>
  );
};

export default page;
