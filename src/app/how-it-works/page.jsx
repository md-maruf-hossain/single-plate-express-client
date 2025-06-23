import FAQ from "@/components/how-it-works/FAQ";
import Steps from "@/components/how-it-works/Steps";
import UpButton from "@/components/UpButton";
import React from "react";

const page = () => {
  return (
    <div>
      <p className="text-3xl font-bold text-green-700 text-center pt-10">How Single meal Express works</p>
      <Steps />
      <FAQ />
      <UpButton />
    </div>
  );
};

export default page;
