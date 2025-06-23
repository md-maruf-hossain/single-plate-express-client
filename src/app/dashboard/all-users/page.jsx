"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://single-plate-express-backend.vercel.app/users"); // Your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">All Users</h1>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full text-left table-auto border-collapse">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-lg font-semibold">Name</th>
                  <th className="py-3 px-6 text-lg font-semibold">Email</th>
                  <th className="py-3 px-6 text-lg font-semibold">Phone</th>
                  <th className="py-3 px-6 text-lg font-semibold">City</th>
                  <th className="py-3 px-6 text-lg font-semibold">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-green-50 transition-all duration-200">
                    <td className="py-4 px-6 border-b">{user.name}</td>
                    <td className="py-4 px-6 border-b">{user.email}</td>
                    <td className="py-4 px-6 border-b">{user.phone}</td>
                    <td className="py-4 px-6 border-b">{user.city}</td>
                    <td className="py-4 px-6 border-b capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <UpButton />
          </div>
        )}
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default Page;
