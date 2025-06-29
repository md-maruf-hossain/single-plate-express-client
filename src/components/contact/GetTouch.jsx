import Image from "next/image";
import React from "react";

const GetTouch = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Get in touch with
            <br className="hidden lg:inline-block" />
            Single meal Express
          </h1>
          <p className="mb-8 leading-relaxed">Get in touch with customer support, sales, or culinary partnerships teams below.</p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src="/images/hero-image.jpg" // Update with your image path
            alt="Background"
            width={500}
            height={500}
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default GetTouch;
