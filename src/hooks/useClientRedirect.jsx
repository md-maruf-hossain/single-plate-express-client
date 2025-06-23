// hooks/useClientRedirect.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useClientRedirect = (condition, redirectTo) => {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(redirectTo); // Use Next.js router for redirect
    }
  }, [condition, redirectTo, router]);
};

export default useClientRedirect;
