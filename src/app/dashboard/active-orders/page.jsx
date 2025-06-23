import React from "react";
import DashboardLayout from "../DashboardLayout";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const page = () => {
  return (
    <PrivateRoute>
      <DashboardLayout>
        <div>
          <p>active orders</p>
          <UpButton />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default page;
