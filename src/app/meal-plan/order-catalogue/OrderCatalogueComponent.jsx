import PrivateRoute from "@/routers/PrivateRoute";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderCatalogueComponent = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [isClient, setIsClient] = useState(false); // Track if it's on the client side

  useEffect(() => {
    setIsClient(true); // Set it to true after the component mounts (client side)
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
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server side
  }

  return (
    <PrivateRoute>
      <section className="py-20 bg-white text-black h-screen">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-bold tracking-wider uppercase text-gray-400">Meal Plans</span>
            <h2 className="text-4xl font-bold lg:text-5xl">Choose your best plan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mealPlans.map((plan) => (
              <div key={plan._id} className="flex flex-col p-6 space-y-6 rounded shadow bg-white text-black">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">{plan.title}</h4>
                  <span className="text-6xl font-bold">{plan.price}</span>
                </div>
                <p className="mt-3 leading-relaxed text-gray-600">{plan.description}</p>
                <div className="mt-auto">
                  <Link
                    href={`/meal-plan/order-catalogue/${plan._id}`} // Use dynamic route here
                    className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-black text-white w-full hover:bg-gray-800 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
    </PrivateRoute>
  );
};

export default OrderCatalogueComponent;
