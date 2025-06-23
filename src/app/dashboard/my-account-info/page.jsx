"use client";
import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { AuthContext } from "@/contexts/AuthProvider";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const Page = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      if (!email) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://single-plate-express-backend.vercel.app/users/${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Failed to fetch account details");
        const data = await res.json();
        setAccount(data); // Set the account data received from API
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [email]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // No loading or error state, display the content
  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-semibold">{account?.name || "User Name"}</h2>
              <p className="text-gray-500 text-sm">{account?.email}</p>
            </div>
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" value={account?.name} />
            <FormField label="Email" value={account?.email} />
            <FormField label="Street Address" value={account?.street} />
            <FormField label="City" value={account?.city} />
            <FormField label="State" value={account?.state} />
            <FormField label="ZIP" value={account?.zip} />
            <FormField label="Phone" value={account?.phone} />
            <FormField label="Role" value={account?.role} />
          </div>

          {/* Last Login & Email Verified */}
          <div className="mt-6">
            <FormField label="Last Login" value={user?.metadata?.lastSignInTime} />
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

// FormField component to render the labels and values
const FormField = ({ label, value }) => (
  <div>
    <label className="text-sm text-gray-600 block mb-1">{label}</label>
    <input type="text" value={value || "Not provided"} readOnly className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700" />
    <UpButton />
  </div>
);

export default Page;
