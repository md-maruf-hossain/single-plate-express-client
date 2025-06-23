"use client";
import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import toast from "react-hot-toast";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    meals_available: [
      {
        name: "",
        type: "",
        dishes: [""],
      },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    // Validate price format
    if (!/^\$?\d+\.\d{2}$/.test(formData.price)) {
      toast.error("Please enter price in correct format (e.g., $35.99)");
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate and process meals
      const mealsWithDishes = formData.meals_available.map((meal) => {
        if (!meal.dishes[0]?.trim()) {
          throw new Error("Dishes field cannot be empty");
        }
        if (!meal.name.trim() || !meal.type.trim()) {
          throw new Error("All meal fields are required");
        }

        return {
          ...meal,
          dishes: meal.dishes[0].split(",").map((dish) => dish.trim()),
        };
      });

      // Send request
      const res = await fetch("https://single-plate-express-backend.vercel.app/mealPlans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          meals_available: mealsWithDishes,
        }),
      });

      // Handle response
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add meal plan");

      // Success handling
      setFormData({
        title: "",
        price: "",
        description: "",
        meals_available: [
          {
            name: "",
            type: "",
            dishes: [""],
          },
        ],
      });
      toast.success("Meal plan added successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Error adding meal plan");
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  const handleMealChange = (index, field, value) => {
    const updatedMeals = [...formData.meals_available];
    updatedMeals[index][field] = value;
    setFormData({ ...formData, meals_available: updatedMeals });
  };

  const handleDishChange = (mealIndex, value) => {
    const updatedMeals = [...formData.meals_available];
    updatedMeals[mealIndex].dishes = [value];
    setFormData({ ...formData, meals_available: updatedMeals });
  };

  const addNewMeal = () => {
    setFormData({
      ...formData,
      meals_available: [...formData.meals_available, { name: "", type: "", dishes: [""] }],
    });
  };

  const removeMeal = (index) => {
    const filteredMeals = formData.meals_available.filter((_, i) => i !== index);
    setFormData({ ...formData, meals_available: filteredMeals });
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="container py-10">
          <h2 className="text-3xl font-bold mb-6">Add New Meal Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" required />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Price</label>
                <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 border rounded" placeholder="$35.99" required />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" required />
              </div>
            </div>

            {/* Meals Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Meals Available</h3>

              {formData.meals_available.map((meal, index) => (
                <div key={index} className="border p-4 rounded space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Meal {index + 1}</h4>
                    {formData.meals_available.length > 1 && (
                      <button type="button" onClick={() => removeMeal(index)} className="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Meal Name</label>
                    <input type="text" value={meal.name} onChange={(e) => handleMealChange(index, "name", e.target.value)} className="w-full p-2 border rounded" required />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Meal Type</label>
                    <input type="text" value={meal.type} onChange={(e) => handleMealChange(index, "type", e.target.value)} className="w-full p-2 border rounded" required />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Dishes (comma separated)</label>
                    <input type="text" value={meal.dishes[0]} onChange={(e) => handleDishChange(index, e.target.value)} className="w-full p-2 border rounded" required />
                  </div>
                </div>
              ))}

              <button type="button" onClick={addNewMeal} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Add Another Meal
              </button>
            </div>

            <button type="submit" className="w-full py-3 bg-gray-950 text-white hover:bg-gray-700 rounded" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Meal Plan"}
            </button>
          </form>
          <UpButton />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default Page;
