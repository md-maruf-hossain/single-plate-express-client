"use client";
import PrivateRoute from "@/routers/PrivateRoute";
import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";

const ContactTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("https://single-plate-express-backend.vercel.app/contact-us-message");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800">Contact Messages</h1>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Message</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{item.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default ContactTable;
