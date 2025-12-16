"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const page = () => {
  const [zipCodes, setZipCodes] = useState([]);
  const [selectedZip, setSelectedZip] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchZipCodes = async () => {
      try {
        const response = await fetch("https://single-plate-express-backend.vercel.app/zipCode");
        if (!response.ok) throw new Error("Failed to fetch ZIP codes");
        const data = await response.json();
        setZipCodes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchZipCodes();
  }, []);

  const handleZipChange = (event) => {
    const zip = event.target.value;
    setSelectedZip(zip);

    const selected = zipCodes.find((item) => item.zip === zip);
    if (selected) {
      setSelectedArea(selected.area);
      // Store in localStorage
      localStorage.setItem("selectedZip", zip);
      localStorage.setItem("selectedArea", selected.area);
    }
  };

  const handleNextPage = () => {
    // Make sure values are in localStorage (optional redundancy)
    localStorage.setItem("selectedZip", selectedZip);
    localStorage.setItem("selectedArea", selectedArea);

    // Navigate to the next page
    router.push(`/meal-plan/order-catalogue`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PrivateRoute>
      <div className="container mx-auto p-4 h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center mb-4">Select Your ZIP Code</h1>
        <div className="max-w-sm mx-auto">
          <select className="w-full p-2 border rounded-md shadow-md mb-4 border-green-700 cursor-pointer" value={selectedZip} onChange={handleZipChange}>
            <option value="">Select ZIP Code</option>
            {zipCodes.map((zipCode) => (
              <option key={zipCode.zip} value={zipCode.zip}>
                {zipCode.zip}
              </option>
            ))}
          </select>

          {selectedArea && (
            <div className="text-center mb-4">
              <p className="font-medium">Area: {selectedArea}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button onClick={handleNextPage} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md shadow-md focus:outline-none cursor-pointer" disabled={!selectedZip}>
              Go to Order Food
            </button>
          </div>
        </div>
        <p className="text-center font-semibold mt-5 text-green-600">
          We are currently offering our catering service exclusively in the Queens area. <br /> Our service will be expanding to other areas soon. Thank you for your interest and patience!
        </p>
      </div>
      <UpButton />
    </PrivateRoute>
  );
};

export default page;
