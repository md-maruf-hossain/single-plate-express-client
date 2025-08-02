"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserDropDownMenu from "./Navbar/UserDropDownMenu";
import LoginRegisterPage from "./Navbar/LoginRegisterPage";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "./Loading";
import UseAdmin from "@/hooks/UseAdmin";
import CartButon from "./Navbar/CartButon";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = UseAdmin(user?.email);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR MAIN WRAPPER */}
        <div className="flex items-center justify-between lg:justify-between py-4 relative">
          {/* LEFT - HAMBURGER FOR MOBILE */}
          <button className="lg:hidden text-gray-700 text-2xl font-black focus:outline-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          {/* CENTER - LOGO */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 text-xl lg:text-2xl font-bold text-green-600 text-center">
            <Image src="/images/icons/logo.png" alt="Logo" width={150} height={150} />
          </Link>

          {/* RIGHT - LOGIN/USER */}
          <div className="lg:hidden  flex space-x-1 items-center">
            {!isAdmin && !isAdminLoading && <CartButon />}
            {loading ? <Loading /> : user?.uid ? <UserDropDownMenu user={user} logout={logout} /> : <LoginRegisterPage />}
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex space-x-8 items-center">
            <Link href="/meal-plan" className="text-gray-700 hover:text-green-500">
              Meal Plans
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-green-500">
              How it works
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-500">
              About us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-500">
              Contact
            </Link>

            <div className="flex space-x-1 items-center">
              {!isAdmin && !isAdminLoading && <CartButon />}
              {loading ? <Loading /> : user?.uid ? <UserDropDownMenu user={user} logout={logout} /> : <LoginRegisterPage />}
            </div>
          </div>
        </div>

        {/* MOBILE MENU LINKS */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col space-y-4 pb-4">
            <Link href="/meal-plan" className="text-gray-700 hover:text-green-500">
              Meal Plans
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-green-500">
              How it works
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-500">
              About us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-500">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
