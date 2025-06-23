import { useEffect, useState } from "react";

const UseManager = (email) => {
  const [isManager, setIsManager] = useState(false);
  const [isManagerLoading, setIsManagerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://single-plate-express-backend.vercel.app/user/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsManager(data.isManager);
          setIsManagerLoading(false);
        });
    }
  }, [email]);
  return [isManager, isManagerLoading];
};

export default UseManager;
