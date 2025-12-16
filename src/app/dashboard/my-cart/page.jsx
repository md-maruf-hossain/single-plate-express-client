"use client";

import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import PrivateRoute from "@/routers/PrivateRoute";
import { AuthContext } from "@/contexts/AuthProvider";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaRedoAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import UpButton from "@/components/UpButton";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCartItems = async () => {
      if (!email) return;

      try {
        const res = await fetch(`https://single-plate-express-backend.vercel.app/cart/${encodeURIComponent(email)}`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart data");

        const data = await res.json();
        if (isMounted) {
          setCartItems(data);
          // Cache in localStorage
          localStorage.setItem("cartCache", JSON.stringify(data));
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching cart:", error);
          // Fallback to cache
          const cached = localStorage.getItem("cartCache");
          if (cached) setCartItems(JSON.parse(cached));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Initial fetch
    fetchCartItems();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [email]);

  const handleDeleteItemFromCart = async (item) => {
    try {
      const res = await fetch(`https://single-plate-express-backend.vercel.app/cart/${email}/${item._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete item");
      }

      // Update UI state
      setCartItems((prevItems) => prevItems.filter((i) => i._id !== item._id));

      // Update localStorage cache
      const cachedCart = JSON.parse(localStorage.getItem("cartCache")) || [];
      const updatedCart = cachedCart.filter((i) => i._id !== item._id);
      localStorage.setItem("cartCache", JSON.stringify(updatedCart));

      toast.success("Item removed successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to remove item. Please try again.");

      // Fallback to cached data
      const cached = localStorage.getItem("cartCache");
      if (cached) setCartItems(JSON.parse(cached));
    }
  };

  const getTotalCost = () => {
    if (!cartItems.length) return "0.00";
    const total = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.mealPlanPrice.replace(/[^0-9.-]+/g, ""));
      return acc + price;
    }, 0);
    return total.toFixed(2);
  };

  // New: Calculate total meals across all bundles
  const getTotalMeals = () => {
    return cartItems.reduce((acc, item) => {
      return acc + (item.mealsSelectedCount || 0); // Sum mealsSelectedCount for bundles
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading text="Loading your cart..." />
      </div>
    );
  }

  const totalMeals = getTotalMeals();

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="min-h-screen p-4 md:p-10">
          <div className="max-w-7xl mx-auto">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <Link href="/meal-plan" className="outline p-2 rounded-md hover:bg-black hover:text-white text-lg transition-transform duration-300 ease-in-out">
                  ← Browse meal plans
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Cart Items */}
                  <div className="bg-white rounded-xl shadow-md flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-green-600">Shopping Cart ({cartItems.length} Orders)</h2>
                      <button onClick={() => window.location.reload()} className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer flex items-center">
                        <FaRedoAlt className="text-green-600" />
                        <span className="pl-1 text-green-600">Refresh Cart</span>
                      </button>
                    </div>

                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-start justify-between py-4 border-b">
                        <div className="flex-1">
                          {item.isBundle ? (
                            // Render bundled plan
                            <>
                              <h3 className="font-semibold text-lg">{item.mealPlanTitle}</h3>
                              <p className="text-sm text-gray-500 mt-1">Plan for {item.mealsSelectedCount} Meals</p>
                              <div className="mt-2 text-sm text-gray-400">
                                <strong className="text-green-600">Selected Meals:</strong>
                                <ul className="list-disc list-inside mt-1 text-black">
                                  {item.selectedMeals.map((meal, index) => (
                                    <li key={index}>
                                      {meal.quantity}× {meal.name} ({meal.type})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            // Fallback for single meals (backward compatibility)
                            <>
                              <h3 className="font-semibold text-lg">{item.meal.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{item.mealPlanTitle}</p>
                              <div className="mt-2 text-sm text-gray-400">Includes: {item.meal.dishes.join(", ")}</div>
                            </>
                          )}
                          <button onClick={() => handleDeleteItemFromCart(item)} className="text-red-500 text-sm mt-2 hover:underline cursor-pointer">
                            Remove Item
                          </button>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-lg font-semibold">{item.mealPlanPrice}</p>
                        </div>
                      </div>
                    ))}

                    <div className="mt-6">
                      <Link href="/meal-plan/order-catalogue" className="hover:underline text-green-600">
                        ← Continue Shopping
                      </Link>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white rounded-xl shadow-md w-full md:w-96 p-6 h-fit sticky top-6">
                    <h2 className="text-2xl text-green-600 font-semibold mb-6">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>${getTotalCost()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${getTotalCost()}</span>
                      </div>
                    </div>
                    <Link href="/dashboard/checkout" className="w-full ">
                      <button
                        disabled={totalMeals < 4} // Updated: Check total meals >= 4
                        className={`w-full p-3 rounded-lg mt-6 text-white font-medium ${
                          totalMeals >= 4 ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                        } transition`}
                      >
                        {totalMeals >= 4 ? "Review payment and address" : "Add more items"}
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
          <UpButton />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default Page;
