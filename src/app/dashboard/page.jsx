"use client";

import { React, useContext } from "react";
import DashboardLayout from "./DashboardLayout";
import { AuthContext } from "../../contexts/AuthProvider";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const page = () => {
  const { user } = useContext(AuthContext);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-3xl text-center font-bold mb-4">
          Hello, <span className="text-black">{user?.displayName}</span> <br /> Welcome to your Dashboard
        </h1>
        <p className="text-center">This is the home page of your dashboard.</p>
      </DashboardLayout>
      <UpButton />
    </PrivateRoute>
  );
};

export default page;
