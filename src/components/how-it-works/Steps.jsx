import Image from "next/image";
import Link from "next/link";
import React from "react";

const Steps = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* <!-- Step 1 --> */}
        <div className="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
          <div className="sm:w-1/2 w-full sm:pr-10 text-center sm:text-left">
            <h2 className="text-green-700 text-2xl title-font font-medium mb-2">Planning</h2>
            <p className="leading-relaxed text-base text-justify">
              Whether you're cooking for yourself or your family, our adaptable plan fits your lifestyle. Need to cancel, switch meals, or skip a week? No worries! Plus, don't miss out on our
              fantastic offer.
            </p>
            <Link href="meal-plan">
              <button className="mt-4 text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg cursor-pointer">Get Started</button>
            </Link>
          </div>
          <div className="sm:w-1/2 w-full">
            <Image width="600" height="300" className="m-auto max-h-full w-full max-w-full" src="/images/how-it-works/plan.png" alt="Pick a plan" />
          </div>
        </div>

        {/* <!-- Step 2 --> */}
        <div className="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col-reverse">
          <div className="sm:w-1/2 w-full">
            <Image width="600" height="300" className="m-auto max-h-full w-full max-w-full" src="/images/how-it-works/delivery.jpg" alt="Get your delivery" />
          </div>
          <div className="sm:w-1/2 w-full sm:pl-10 text-center sm:text-left">
            <h2 className="text-green-700 text-2xl title-font font-medium mb-2">Delivery</h2>
            <p className="leading-relaxed text-base text-justify">
              Every week, you'll receive easy, step-by-step recipes with nutritional details and fresh, pre-portioned ingredients, helping you prepare delicious dinners effortlessly.
            </p>
            <Link href="meal-plan">
              <button className="mt-4 text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg cursor-pointer">Get Started</button>
            </Link>
          </div>
        </div>

        {/* <!-- Step 3 --> */}
        <div className="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
          <div className="sm:w-1/2 w-full sm:pr-10 text-center sm:text-left">
            <h2 className="text-green-700 text-2xl title-font font-medium mb-2">Cook, eat, enjoy!</h2>
            <p className="leading-relaxed text-base text-justify">
              Say goodbye to the endless "What do you want to eat?" debate. Step into a world where dinner is always planned, effortless, and delicious.
            </p>
            <Link href="meal-plan">
              <button className="mt-4 text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg cursor-pointer">Get Started</button>
            </Link>
          </div>
          <div className="sm:w-1/2 w-full">
            <Image width="600" height="300" className="m-auto max-h-full w-full max-w-full" src="/images/how-it-works/cook.png" alt="Cook, eat, enjoy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
