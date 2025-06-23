import PrivateRoute from "@/routers/PrivateRoute";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const CartButon = () => {
  return (
    <PrivateRoute>
      <Link href="/dashboard/my-cart">
        <button className="flex items-center text-lg  p-2 rounded-full bg-black text-white shadow-sm relative cursor-pointer">
          <FaShoppingCart className="" />
        </button>
      </Link>
    </PrivateRoute>
  );
};

export default CartButon;
