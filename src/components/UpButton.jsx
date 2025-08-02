"use client";
import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa"; // React Icon for the Up Arrow

const UpButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Detect scrolling to show/hide the button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none cursor-pointer">
          <FaChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default UpButton;
