import Image from "next/image";

const Feature = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-100">
      <div className="container px-5 py-10 mx-auto flex flex-wrap">
        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div className="w-full sm:p-4 px-4 mb-6">
            <h1 className="title-font font-medium text-xl mb-2 text-gray-900">Crafted with Care, Served with Love - Explore Our Featured Dish</h1>
            <div className="leading-relaxed">
              Savor every bite of our chef's special creation, made with the freshest ingredients and a lot of love. Treat yourself to a meal that’s as delicious as it is memorable.
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2   text-center">
            <h2 className="title-font font-medium text-3xl text-gray-900">500+</h2>
            <p className="leading-relaxed text-green-800">Users</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
            <h2 className="title-font font-medium text-3xl text-gray-900">200+</h2>
            <p className="leading-relaxed text-green-800">Subscribes</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
            <h2 className="title-font font-medium text-3xl text-gray-900">350+</h2>
            <p className="leading-relaxed text-green-800">Delivery</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2 text-center">
            <h2 className="title-font font-medium text-3xl text-gray-900">300+</h2>
            <p className="leading-relaxed text-green-800">meals</p>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
          <Image className="object-cover object-center" src="/images/hero-image.jpg" alt="stats image" width="600" height="300" />
        </div>
      </div>
    </section>
  );
};

export default Feature;
