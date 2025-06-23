import Image from "next/image";
import React from "react";

const Cover = () => {
  return (
    <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <Image src="/images/hero-image.jpg" alt="Random Unsplash Image" width={480} height={360} className="w-full h-60 sm:h-96 bg-gray-500 object-cover" />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold leading-tight text-green-700">About us</h2>
            <p className="text-gray-600">We are a team of passionate individuals dedicated to providing the best catering service at your door steps.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
