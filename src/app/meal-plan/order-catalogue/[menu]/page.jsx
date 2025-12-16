"use client";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/AuthProvider";
import PrivateRoute from "@/routers/PrivateRoute";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const MealPlanDetails = () => {
  const router = useRouter();
  const params = useParams();
  const { menu: id } = params;
  const [mealMenu, setMealMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // State to track quantities per meal (object: key = `${name}-${type}`, value = quantity)
  const [mealQuantities, setMealQuantities] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`https://single-plate-express-backend.vercel.app/meal-plans/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meal plan details");
        }
        const data = await response.json();
        setMealMenu(data);
      } catch (error) {
        console.error("Error fetching meal plan details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlan();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!mealMenu) {
    return <div>Error loading meal plan details.</div>;
  }

  // Calculate total selected meals
  const totalSelected = Object.values(mealQuantities).reduce((sum, qty) => sum + qty, 0);

  // Function to increase quantity for a meal
  const handleIncrease = (meal) => {
    const key = `${meal.name}-${meal.type}`;
    if (totalSelected < mealMenu.meals_selected) {
      setMealQuantities((prev) => ({
        ...prev,
        [key]: (prev[key] || 0) + 1,
      }));
    } else {
      toast.error(`You can only select ${mealMenu.meals_selected} meals in total.`);
    }
  };

  // Function to decrease quantity for a meal
  const handleDecrease = (meal) => {
    const key = `${meal.name}-${meal.type}`;
    if (mealQuantities[key] > 0) {
      setMealQuantities((prev) => ({
        ...prev,
        [key]: prev[key] - 1,
      }));
    }
  };

  // Function to add the full plan to cart (only when total matches required)
  const handleAddPlanToCart = async () => {
    if (totalSelected !== mealMenu.meals_selected) {
      toast.error(`Please select exactly ${mealMenu.meals_selected} meals.`);
      return;
    }

    const selectedMealsBreakdown = [];
    Object.entries(mealQuantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const [name, type] = key.split("-");
        const meal = mealMenu.meals_available.find((m) => m.name === name && m.type === type);
        selectedMealsBreakdown.push({
          name: meal.name,
          type: meal.type,
          dishes: meal.dishes,
          quantity: qty,
        });
      }
    });

    const cartBundle = {
      mealPlanId: mealMenu._id,
      mealPlanTitle: mealMenu.title,
      mealPlanPrice: mealMenu.price,
      mealsSelectedCount: mealMenu.meals_selected,
      selectedMeals: selectedMealsBreakdown,
      userEmail: user?.email,
    };

    try {
      const response = await fetch("https://single-plate-express-backend.vercel.app/cart-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartBundle), // Fixed: Changed cartData to cartBundle
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to add to cart");
      }

      toast.success(`${mealMenu.title} added to cart! bao bao`);
      setMealQuantities({});
    } catch (error) {
      toast.error(error.message || "Failed to add plan to cart");
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.back()} className="mb-8 flex items-center cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            ← Back to All Plans
          </button>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{mealMenu.title}</h1>
              <span className={`px-4 py-2 rounded-full text-sm ${totalSelected === mealMenu.meals_selected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                Selected: {totalSelected}/{mealMenu.meals_selected} Meals
              </span>
            </div>
            <div className="">
              <span className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2 md:mb-0">{mealMenu.price}</span>
            </div>
            <p className="text-gray-600 text-lg">{mealMenu.description}</p>
            {/* Add Plan to Cart button */}
            <div className="mt-4">
              <button
                onClick={handleAddPlanToCart}
                disabled={totalSelected !== mealMenu.meals_selected}
                className={`w-full py-2 px-4 rounded font-semibold ${
                  totalSelected === mealMenu.meals_selected ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add Plan to Cart
              </button>
              {/* Inline warning message when incomplete */}
              {totalSelected !== mealMenu.meals_selected && (
                <p className="mt-2 text-center text-sm text-red-600 font-medium">Please select the required number of meals before adding this plan to the cart.</p>
              )}
            </div>
          </div>

          {/* Summary of selected meals with quantities */}
          {totalSelected > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">Selected Meals:</h2>
              <ul className="space-y-1">
                {Object.entries(mealQuantities).map(([key, qty]) => {
                  if (qty > 0) {
                    const [name, type] = key.split("-");
                    return (
                      <li key={key} className="text-gray-700">
                        • {name} ({type}) x{qty}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mealMenu.meals_available.map((meal, index) => {
              const key = `${meal.name}-${meal.type}`;
              const quantity = mealQuantities[key] || 0;
              return (
                <div key={`${meal.name}-${meal.type}-${index}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{meal.type}</span>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    <span className="inline-block font-bold">Menu:</span>
                    {meal.dishes.map((dish, dishIndex) => (
                      <li key={`${meal.name}-${dishIndex}`} className="flex items-center text-gray-700">
                        <span className="mr-2">•</span>
                        <span>{dish}</span>
                      </li>
                    ))}
                    {/* Quantity selector */}
                    <div className="mt-8 flex items-center justify-center space-x-4">
                      <button
                        onClick={() => handleDecrease(meal)}
                        disabled={quantity === 0}
                        className={`px-3 py-1 rounded font-semibold border-2 ${
                          quantity > 0 ? "bg-red-500 text-white border-red-600 hover:bg-red-600 cursor-pointer" : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                        }`}
                      >
                        -
                      </button>
                      <span className="text-lg font-bold">{quantity}</span>
                      <button
                        onClick={() => handleIncrease(meal)}
                        disabled={totalSelected >= mealMenu.meals_selected}
                        className={`px-3 py-1 rounded font-semibold border-2 ${
                          totalSelected < mealMenu.meals_selected
                            ? "bg-green-600 text-white border-green-600 hover:bg-green-700 cursor-pointer"
                            : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MealPlanDetails;
