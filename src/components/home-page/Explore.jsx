import Link from "next/link";
import React from "react";

const Explore = () => {
  return (
    <div className="p-6 my-10 bg-emerald-600 text-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between lg:flex-row text-center lg:text-left">
          <h2 className="text-4xl sm:text-4xl lg:text-5xl tracking-tighter font-bold">
            GET A TASTE <br className="hidden sm:inline" /> Recipes you'll love!
          </h2>
          <div className="space-x-2 py-4 lg:py-0">
            <span>Get Free Ready Made meals For Life + 50% Off</span>
          </div>
          <Link href="/meal-plan" rel="noreferrer noopener" className="px-6 py-3 mt-4 lg:mt-0 rounded-md border bg-gray-900 text-gray-50 border-gray-600 hover:bg-gray-800 transition">
            Choose a plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;
