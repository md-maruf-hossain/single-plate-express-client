import Contact from "@/components/contact/Contact";
import GetStarted from "@/components/contact/GetStarted";
import GetTouch from "@/components/contact/GetTouch";
import Location from "@/components/contact/Location";
import UpButton from "@/components/UpButton";

const page = () => {
  return (
    <div className="bg-gray-100">
      <GetTouch />
      <Contact />
      <GetStarted />
      <Location />
      <UpButton />
    </div>
  );
};

export default page;
