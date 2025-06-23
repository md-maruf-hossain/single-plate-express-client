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
  const [mealMenu, setMealMenu] = useState(null); // Set initial state as null
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!id) return; // Don't fetch data if the id is not available yet

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
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchMealPlan();
  }, [id]); // Re-run effect when id changes

  if (isLoading) {
    return <Loading />; // Show loading state while fetching
  }

  if (!mealMenu) {
    return <div>Error loading meal plan details.</div>; // Show error if no data found
  }

  const handleAddToCart = async (meal) => {
    try {
      const cartData = {
        mealPlanId: mealMenu._id,
        mealPlanTitle: mealMenu.title,
        mealPlanPrice: mealMenu.price,
        userEmail: user?.email,
        meal: {
          name: meal.name,
          type: meal.type,
          dishes: meal.dishes,
        },
      };

      const response = await fetch("https://single-plate-express-backend.vercel.app/cart-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      // First check if the response is OK
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new Error(errorData.message || "Failed to add to cart");
      }

      const data = await response.json();
      console.log("Success:", data);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to add to cart");
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.back()} className="mb-8 flex items-center cursor-pointer underline">
            ← Back to All Plans
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{mealMenu.title}</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <span className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2 md:mb-0">{mealMenu.price}</span>
              <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm">{mealMenu.meals_available.length} Selected Meals</span>
            </div>
            <p className="text-gray-600 text-lg">{mealMenu.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mealMenu.meals_available.map((meal, index) => (
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
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => handleAddToCart(meal)}
                      className="p-1 w-full font-semibold rounded bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MealPlanDetails;
