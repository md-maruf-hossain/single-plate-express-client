import Hero from "@/components/home-page/Hero";
import Feature from "@/components/home-page/Feature";
import Gallery from "@/components/home-page/Gallery";
import App from "@/components/home-page/App";
import Carousel from "@/components/home-page/Carousel";
import Explore from "@/components/home-page/Explore";
import Testimonals from "@/components/Testimonals";
import Contact from "@/components/Contact";
import UpButton from "@/components/UpButton";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Gallery />
      <Feature />
      <App />
      <Carousel />
      <Explore />
      <Testimonals />
      <Contact />
      <UpButton />
    </div>
  );
}
