"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import UpButton from "@/components/UpButton";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedZip, setSelectedZip] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [cartItems, setCartItems] = useState([]); // Ensure it's always an array
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // payment gateway
  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");

  // Credit card states
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiration: "",
    cvc: "",
  });

  // Validation functions
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    if (!/^\d{16}$/.test(cleaned)) return "Card number must be 16 digits";
    return "";
  };

  const validateExpiration = (date) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return "Invalid expiration date"; // Check MM/YY format

    const [month, year] = date.split("/");
    const currentYear = new Date().getFullYear(); // Current full year (e.g., 2025)
    const currentMonth = new Date().getMonth() + 1; // Current month (1-12)

    // Check if month is between 01 and 12
    if (parseInt(month) < 1 || parseInt(month) > 12) return "Invalid month";

    // Convert 2-digit year to full 4-digit year (e.g., 25 -> 2025)
    const fullYear = 2000 + parseInt(year);

    // Check if the year is less than the current year, or if the year is the same but the month is less than the current month
    if (fullYear < currentYear) {
      return "Card has expired"; // The year is in the past
    } else if (fullYear === currentYear && parseInt(month) < currentMonth) {
      return "Card has expired"; // The month is in the past for the current year
    }

    return ""; // No errors, valid expiration date
  };

  const validateCvc = (cvc) => {
    if (!/^\d{3}$/.test(cvc)) return "CVC must be 3 digits";
    return "";
  };

  // Handlers
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value =
      value
        .match(/.{1,4}/g)
        ?.join(" ")
        .substring(0, 19) || "";
    setCardNumber(value);
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiration(value.substring(0, 5));
  };

  // Get user data by email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://single-plate-express-backend.vercel.app/users/${encodeURIComponent(email)}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  // Get order summary from local storage
  useEffect(() => {
    const zip = localStorage.getItem("selectedZip");
    const area = localStorage.getItem("selectedArea");

    setSelectedZip(zip || "");
    setSelectedArea(area || "");
  }, []);

  // Get order summary by email
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
        if (Array.isArray(data)) {
          if (isMounted) {
            setCartItems(data); // Store cart items as an array
            localStorage.setItem("cartCache", JSON.stringify(data)); // Cache the cart data
          }
        } else {
          console.error("Fetched cart items are not an array:", data);
          setCartItems([]); // Fallback to an empty array
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

    fetchCartItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [email]);

  // Calculate total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.mealPlanPrice.replace(/[^0-9.-]+/g, "")); // Extract numeric price
      return acc + price;
    }, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate required fields before submission
      if (!userData?.name || !userData?.street || !userData?.city || !userData?.phone) {
        setSubmitError("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Check if cart is empty
      if (cartItems.length === 0) {
        setSubmitError("Your cart is empty.");
        setIsSubmitting(false);
        return;
      }

      // Card validation for payment method
      if (selectedPaymentMethod === "credit_card") {
        const cardError = validateCardNumber(cardNumber);
        const expirationError = validateExpiration(expiration);
        const cvcError = validateCvc(cvc);

        setErrors({
          cardNumber: cardError,
          expiration: expirationError,
          cvc: cvcError,
        });

        if (cardError || expirationError || cvcError) {
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare order data
      const orderData = {
        user: {
          email,
          name: userData?.name,
          phone: userData?.phone,
        },
        shippingAddress: {
          street: userData?.street,
          city: userData?.city,
          state: userData?.state,
          zipCode: selectedZip,
          area: selectedArea,
        },

        deliveryInstructions: userData?.deliveryInstructions,
        items: cartItems.map((item) => ({
          mealPlanId: item._id,
          name: item.meal?.name,
          price: parseFloat(item.mealPlanPrice.replace(/[^0-9.-]+/g, "")),
          quantity: 1, // Adjust if you have quantity
        })),
        totalAmount: calculateTotalAmount(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Send order to backend
      const response = await fetch("https://single-plate-express-backend.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      // After the order is successfully placed, delete all items from the cart
      const deleteResponse = await fetch(`https://single-plate-express-backend.vercel.app/cart/${encodeURIComponent(email)}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        // post order to the backend
      } else {
        throw new Error("Failed to delete cart items");
      }

      setCartItems([]); // Clear cart items from state
      window.location.href = "/"; // Redirect to payment page
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Order submission error:", error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading text="Loading your cart..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Shipping Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Information</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData?.name || ""}
                onChange={handleChange} // Add onChange handler
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                required
              />
            </div>

            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                id="street"
                name="street"
                type="text"
                value={userData?.street || ""}
                onChange={handleChange} // Add onChange handler
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={userData?.city || ""}
                  onChange={handleChange} // Add onChange handler
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={selectedZip || ""}
                  onChange={handleChange} // Add onChange handler
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={userData?.state || ""}
                  onChange={handleChange} // Add onChange handler
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                  Area
                </label>
                <input
                  id="area"
                  name="area"
                  type="text"
                  value={selectedArea || ""}
                  onChange={handleChange} // Add onChange handler
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={userData?.phone || ""}
                onChange={handleChange} // Add onChange handler
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                required
              />
            </div>

            <div>
              <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Instructions
              </label>
              <textarea
                id="deliveryInstructions"
                name="deliveryInstructions"
                value={userData?.deliveryInstructions || ""}
                onChange={handleChange} // Add onChange handler
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
          <div className="space-y-4">
            {/* Loop over each cart item */}
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                {/* Display meal name and meal plan price */}
                <div className="flex flex-col">
                  <span className="text-gray-600">{item.meal?.name}</span>
                </div>
                <span className="font-medium">{item.mealPlanPrice}</span>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">${calculateTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* payment gateway */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Information</h2>
          <p className="text-gray-600 mb-6">Get our meal plan, we will getyour food at our door steps</p>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3">Payment Method: Card Payment</label>
          </div>

          {/* Credit Card Form */}
          {selectedPaymentMethod === "credit_card" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className={`w-full p-3 border rounded-lg ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
                  maxLength={19}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    value={expiration}
                    onChange={handleExpirationChange}
                    placeholder="MM/YY"
                    className={`w-full p-3 border rounded-lg ${errors.expiration ? "border-red-500" : "border-gray-300"}`}
                    maxLength={5}
                  />
                  {errors.expiration && <p className="text-red-500 text-sm mt-1">{errors.expiration}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").substring(0, 3))}
                    placeholder="XXX"
                    className={`w-full p-3 border rounded-lg ${errors.cvc ? "border-red-500" : "border-gray-300"}`}
                    maxLength={3}
                  />
                  {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Other Payment Methods */}
          {selectedPaymentMethod === "paypal" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">You will be redirected to PayPal after submitting the order</p>
            </div>
          )}

          {/* Error Display */}
          {submitError && <div className="mt-4 text-red-500 text-sm">{submitError}</div>}
          {selectedPaymentMethod === "bank_transfer" && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Bank transfer details will be provided after order confirmation</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-8 px-6 py-4 bg-black text-white font-semibold rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"} transition-colors cursor-pointer`}
          >
            {isSubmitting ? "Processing..." : "Complete Order"}
          </button>
        </div>
        <UpButton />
      </form>
    </div>
  );
};

export default Checkout;
