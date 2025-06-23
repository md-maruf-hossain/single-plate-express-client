import Image from "next/image";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <section className="text-center py-16">
      <div className="container mx-auto">
        <div className="flex justify-center mb-4">
          <Image src="/images/icons/logo.png" alt="Logo" width={600} height={600} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Transform your everyday meals with a personalized
          <br /> catering experience designed just for you.
        </h1>
        <div className="mt-6">
          <Link href="/meal-plan">
            <button className="px-6 py-2 border-2 border-green-800 text-green-600 font-medium rounded-full cursor-pointer hover:bg-green-700 hover:text-white transition-all">Get Started</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
