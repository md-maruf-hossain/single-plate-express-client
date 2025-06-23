"use client";
import React, { useEffect, useState } from "react";
import OrderPlan from "./OrderCatalogueComponent";
import PrivateRoute from "@/routers/PrivateRoute";

const page = () => {
  const [selectedZip, setSelectedZip] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    const zip = localStorage.getItem("selectedZip");
    const area = localStorage.getItem("selectedArea");

    setSelectedZip(zip || "");
    setSelectedArea(area || "");
  }, []);

  return (
    <PrivateRoute>
      <OrderPlan />
    </PrivateRoute>
  );
};

export default page;
