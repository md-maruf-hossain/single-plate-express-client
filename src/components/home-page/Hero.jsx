"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="/images/hero-image.jpg" // Update with your image path
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-gray-50 px-4 max-w-3xl">
        <h1 className="text-5xl font-bold leading-none sm:text-6xl">Fuel Your Life with Fresh, Healthy, and Customized meal Plans</h1>
        <p className="mt-6 mb-8 text-lg">Delivered Right to Your Doorstep!</p>
        <div className="flex flex-wrap justify-center">
          <Link href="/meal-plan">
            <button className="px-8 py-3 m-2 text-lg font-semibold rounded cursor-pointer bg-gray-100 text-gray-900 hover:bg-green-100 hover:text-green-800">Plan Your meal</button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-3 m-2 text-lg border rounded border-gray-300 text-gray-50 cursor-pointer">Learn more</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
