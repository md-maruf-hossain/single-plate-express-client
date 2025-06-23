"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import PrivateRoute from "@/routers/PrivateRoute";
import { AuthContext } from "@/contexts/AuthProvider";
import UpButton from "@/components/UpButton";

const page = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!email) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://single-plate-express-backend.vercel.app/orders/${email}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="min-h-screen p-4 sm:p-6">
          <div className="mx-auto bg-white p-4 sm:p-6 rounded shadow">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Orders</h1>

            {loading && <p className="text-gray-700">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                  <thead className="bg-gray-100 text-sm text-gray-700">
                    <tr className="t">
                      <th className="px-3 py-2 text-center whitespace-nowrap">Items</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Quantity</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Total</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Grand Total</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Pament Status</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Address</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Order Created</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200 text-gray-800 text-center">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <ul className="list-disc list-inside space-y-1">
                            {order.items.map((item, index) => (
                              <li className="list-none" key={index}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-3 py-2">
                          <ul className="list-disc list-inside space-y-1">
                            {order.items.map((item, index) => (
                              <li className="list-none" key={index}>
                                {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-3 py-2">
                          <ul className="list-disc list-inside space-y-1">
                            {order.items.map((item, index) => (
                              <li className="list-none" key={index}>
                                ${item.price}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-3 py-2">${order.totalAmount.toFixed(2)}</td>
                        <td className="px-3 py-2 capitalize">{order.status}</td>
                        <td className="px-3 py-2">
                          {order.shippingAddress?.area}, {order.shippingAddress?.zipCode}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              !loading && email && <p className="text-gray-600">No orders found for this email.</p>
            )}
          </div>
          <UpButton />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default page;
