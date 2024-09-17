import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#8B0000] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">KNOMS</h3>
            <p className="text-sm">Empowering excellence through recognition</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm">
              <li className="mb-2"><Link href="/">Home</Link></li>
              <li className="mb-2"><Link href="/opportunities">Opportunities</Link></li>
              <li className="mb-2"><Link href="/about">About</Link></li>
              <li className="mb-2"><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm mb-2">Email: info@knoms.edu.gh</p>
            <p className="text-sm mb-2">Phone: +233 123 456 789</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <FaFacebook className="text-2xl hover:text-gray-300 cursor-pointer" />
              <FaTwitter className="text-2xl hover:text-gray-300 cursor-pointer" />
              <FaInstagram className="text-2xl hover:text-gray-300 cursor-pointer" />
              <FaLinkedin className="text-2xl hover:text-gray-300 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} KNOMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;