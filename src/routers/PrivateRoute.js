"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
