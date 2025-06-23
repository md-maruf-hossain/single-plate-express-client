import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-100">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-green-800 lg:w-1/3 lg:mb-0 mb-4">A Visual Feast - Explore Our Gallery</h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Dive into a collection of mouthwatering dishes that showcase the art of fine dining. Browse through our gallery and get inspired by the vibrant flavors and beautiful presentation of every
            meal we serve.
          </p>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <Image alt="gallery" width="500" height="300" className="w-full object-cover h-full object-center block rounded-lg" src="/images/dish-1.jpg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image alt="gallery" width="501" height="301" className="w-full object-cover h-full object-center block rounded-lg" src="/images/dish-2.jpg" />
            </div>
            <div className="md:p-2 p-1 w-full">
              <Image alt="gallery" width="600" height="300" className="w-full object-cover h-full object-center block rounded-lg" src="/images/dish-5.jpg" />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <Image alt="gallery" width="601" height="361" className="w-full object-cover h-full object-center block rounded-lg" src="/images/dish-3.jpg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image alt="gallery" width="502" height="302" className="w-full object-cover h-full object-center block rounded-lg" src="/images/dish-4.jpg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <Image alt="gallery" width="503" height="303" className="w-full object-cover h-full object-center block rounded-lg" src="/images/dish-6.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
