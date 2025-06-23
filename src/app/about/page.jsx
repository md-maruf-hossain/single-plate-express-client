import Cover from "@/components/about/Cover";
import WhyChooseUS from "@/components/about/WhyChooseUS";
import App from "@/components/home-page/App";
import FAQ from "@/components/how-it-works/FAQ";
import Testimonals from "@/components/Testimonals";
import UpButton from "@/components/UpButton";

const page = () => {
  return (
    <div className="bg-gray-100">
      <Cover />
      <WhyChooseUS />
      <FAQ />
      <h2 className="text-3xl font-bold sm:text-4xl text-black pb-10 text-center">Testimonials</h2>
      <Testimonals />
      <App />
      <UpButton />
    </div>
  );
};

export default page;
