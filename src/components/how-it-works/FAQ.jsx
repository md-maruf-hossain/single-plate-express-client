"use client";
import { useState, useEffect } from "react";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://single-plate-express-backend.vercel.app/faq")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        return res.json();
      })
      .then((data) => setFaqs(data))
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className=" text-gray-800">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-2xl font-semibold text-green-700 text-center sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-4 mb-8 text-center text-black">Find answers to common questions about Single meal Express.</p>

        {loading && <p>Loading FAQs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && faqs.length === 0 && <p>No FAQs available.</p>}

        <div className="space-y-">
          {faqs.map((faq, index) => (
            <details key={index} className="w-full">
              <summary className="px-4 py-4 cursor-pointer">{faq.question}</summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-green-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
