"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
import { FaEdit, FaTimesCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const page = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [editData, setEditData] = useState(null); // Data for editing in modal
  const [showModal, setShowModal] = useState(false); // Show or hide modal

  // Fetch meal plans from the API on component mount
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch("https://single-plate-express-backend.vercel.app/meal-plans");
        const data = await response.json();
        setMealPlans(data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, []); // Runs only once when the component mounts

  // Function to refetch meal plans
  const refetchMealPlans = async () => {
    try {
      const response = await fetch("https://single-plate-express-backend.vercel.app/meal-plans");
      const data = await response.json();
      setMealPlans(data); // Update the meal plans state with the fetched data
    } catch (error) {
      console.error("Error refetching meal plans:", error);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await fetch(`https://single-plate-express-backend.vercel.app/meal-plans/${id}`, {
        method: "DELETE",
      });

      // Show success toast
      toast.success("Meal plan deleted successfully!");

      // Refetch meal plans after deletion
      refetchMealPlans();
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      toast.error("Failed to delete meal plan.");
    }
  };

  // Handle edit button click
  const handleEdit = (meal) => {
    setEditData(meal); // Set the data of the meal to be edited
    setShowModal(true); // Show the modal
  };

  // Handle input change for editing data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle saving the edited data
  const handleSave = async () => {
    try {
      const { _id, ...updateData } = editData; // Remove _id before sending the request
      const response = await fetch(`https://single-plate-express-backend.vercel.app/meal-plans/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Send only the fields that should be updated
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred");
        return;
      }

      const updatedMealPlan = await response.json();

      // Update the meal plans state with the edited meal plan
      setMealPlans(mealPlans.map((meal) => (meal._id === updatedMealPlan._id ? updatedMealPlan : meal)));
      setShowModal(false); // Close the modal

      // Show success toast
      toast.success("Meal plan updated successfully!");

      // Refetch meal plans after saving
      refetchMealPlans();
    } catch (error) {
      console.error("Error saving edited meal plan:", error);
      toast.error("Failed to save changes.");
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="container py-10">
          <h2 className="text-3xl font-bold mb-6">Meal Plans</h2>

          {/* Table Display */}
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2 px-4 border border-gray-300">Title</th>
                <th className="py-2 px-4 border border-gray-300">Price</th>
                <th className="py-2 px-4 border border-gray-300">Description</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealPlans.map((meal) => (
                <tr key={meal._id}>
                  {/* No whitespace between <tr> tags */}
                  <td className="py-2 px-4 border border-gray-300">{meal.title}</td>
                  <td className="py-2 px-4 border border-gray-300">{meal.price}</td>
                  <td className="py-2 px-4 border border-gray-300">{meal.description}</td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button className="bg-blue-500 text-white p-1 mr-1 rounded cursor-pointer" onClick={() => handleEdit(meal)}>
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded cursor-pointer"
                      onClick={() => handleDelete(meal._id)} // Use meal._id for delete
                    >
                      <FaTimesCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Editing */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-md shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Meal Plan</h3>
                <div>
                  <label className="block">Title</label>
                  <input type="text" name="title" value={editData.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
                </div>
                <div>
                  <label className="block">Price</label>
                  <input type="text" name="price" value={editData.price} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" />
                </div>
                <div>
                  <label className="block">Description</label>
                  <textarea name="description" value={editData.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
                </div>
                <div className="flex justify-between">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          <UpButton />
        </div>

        {/* Toast Notifications */}
        <Toaster />
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default page;
