"use client";
import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { AuthContext } from "@/contexts/AuthProvider";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";
import { toast } from "react-hot-toast";

const Page = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const fetchAccount = async () => {
      if (!email) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://single-plate-express-backend.vercel.app/users/${email}`);
        const data = await res.json();
        setAccount(data);
        setFormData({
          name: user?.displayName || data?.name || "",
          email: user?.email || data?.email || "",
          street: data?.street || "",
          city: data?.city || "",
          state: data?.state || "",
          zip: data?.zip || "",
          phone: data?.phone || "",
          role: data?.role || "",
        });
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [email, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://single-plate-express-backend.vercel.app/users-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: email || formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      } else {
        toast.success("Account updated successfully");
        window.location.reload();
      }

      const updatedData = await response.json();
      setAccount(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md">
          {/* Header */}
          <div>
            {account?.street ? <p /> : <p className="text-red-500 text-2xl font-bold text-center mb-10">Please Update Your Account ⚠️</p>}
            <h2 className="text-xl font-semibold text-green-600">{formData.name || "User Name"}</h2>
            <div className="flex justify-between items-center mb-8">
              <p className="text-green-600 text-sm">{formData.email}</p>
              <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} isEditing={false} />
              <FormField label="Email" name="email" value={formData.email} isEditing={false} />
              <FormField label="Street Address" name="street" value={formData.street} onChange={handleInputChange} isEditing={isEditing} />
              <FormField label="City" name="city" value={formData.city} onChange={handleInputChange} isEditing={isEditing} />
              <FormField label="State" name="state" value={formData.state} onChange={handleInputChange} isEditing={isEditing} />
              <FormField label="ZIP" name="zip" value={formData.zip} onChange={handleInputChange} isEditing={isEditing} />
              <FormField label="Phone" name="phone" type="number" value={formData.phone} onChange={handleInputChange} isEditing={isEditing} />
              <FormField label="Role" name="role" value={account?.role ? account?.role : "User"} onChange={handleInputChange} isEditing={false} />
            </div>

            {/* Last Login (non-editable) */}
            <div className="mt-6">
              <label className="text-sm text-gray-600 block mb-1">Last Login</label>
              <input type="text" value={user?.metadata?.lastSignInTime || "Unknown"} readOnly className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 bg-gray-50 border-gray-200" />
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  Save Changes
                </button>
              </div>
            )}
          </form>
          <UpButton />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

const FormField = ({ label, name, value = "", onChange, isEditing }) => {
  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={value ? "" : "Please enter..."}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white"
        />
      ) : (
        <input type="text" value={value} readOnly placeholder={value ? "" : "Please enter..."} className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 bg-gray-50 border-gray-200" />
      )}
    </div>
  );
};

export default Page;
