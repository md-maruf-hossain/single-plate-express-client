"use client";
import { useEffect, useState } from "react";

const WhyChooseUS = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/whyChooseUs.json") // Change to .json
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch features");
        return res.json();
      })
      .then((data) => setFeatures(data))
      .catch((error) => {
        console.error("Error fetching features:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-100 text-gray-800 text-justify">
      <div className="container max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl text-green-700">Our meal Services</h2>
          <p className="text-lg text-gray-600">Providing quality, sustainable, and affordable meals.</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              {features.slice(0, 3).map((feature) => (
                <div key={feature.id} className="mb-6 flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-emerald-600 text-white">✓</div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {features.slice(3).map((feature) => (
                <div key={feature.id} className="mb-6 flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-emerald-600 text-white">✓</div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUS;
