"use client";
import UpButton from "@/components/UpButton";
import Link from "next/link";
import { useState, useEffect } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-01-01T00:00:00");
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return null; // Avoid hydration errors by rendering nothing initially
  }

  return (
    <div className="flex items-center justify-center p-22 h-screen text-white shadow-2xl">
      <div className="p-8 rounded-2xl shadow-lg text-center w-full max-w-md bg-black">
        <h1 className="text-3xl font-bold mb-4">Coming Soon!</h1>
        <p className="mb-6">We are launching something exciting. Stay tuned!</p>
        <div className="flex justify-center space-x-4 pb-5 text-lg font-semibold">
          <div>{timeLeft.days}d</div>
          <div>{timeLeft.hours}h</div>
          <div>{timeLeft.minutes}m</div>
          <div>{timeLeft.seconds}s</div>
        </div>
        <Link href="/" className="mt-6">
          <button className="w-full p-2 rounded text-black bg-white cursor-pointer text-lg">Home</button>
        </Link>
      </div>
      <UpButton />
    </div>
  );
};

export default ComingSoon;
