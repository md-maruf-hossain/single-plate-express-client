"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

const UserDropDownMenu = ({ user, logout }) => {
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("You have successfully logged out");
      })
      .catch((error) => toast.error(error));
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Avatar */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center cursor-pointer focus:outline-none">
        <Image
          src="/images/icons/user.png" // place your avatar image in the /public folder
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full border border-gray-300"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <a onClick={handleLogout} className="block px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-100">
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDownMenu;
