import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="pb-3.5">
          <Image src="/images/icons/logo-footer.png" alt="Logo" width={250} height={250} className="mx-auto" />
        </div>
        <p className=" text-green-500">&copy; {new Date().getFullYear()} Single meal Express. All rights reserved.</p>
        <ul className="mt-4 flex justify-center space-x-6">
          <li>
            <Link href="/about" className="hover:underline hover:text-green-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline hover:text-green-500">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/policy" className="hover:underline hover:text-green-500">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
