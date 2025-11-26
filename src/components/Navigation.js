//Author: Marko Ostrovitsa (A00448932)
//Purpose: The purpose of this file is to create a navigation bar that is flexible between desktop and mobile versions

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Importing the logo image
import { IoMoon, IoSunny } from "react-icons/io5"; // Importing icons for the dark mode toggle

// Navigation component definition
const Navigation = ({ toggleDarkMode, dark }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the navigation menu
  const navLinks = [
    { to: "/", label: "Homepage" },
    { to: "/about", label: "About" },
    { to: "/sitemap", label: "Site Map" },
    { to: "/gallery", label: "Gallery" },
    { to: "/ecosystem", label: "Ecosystem Quiz" },
    { to: "/flora", label: "Flora/Fauna/Fungi" },
    { to: "/natural-burial", label: "Natural Burial" },
    { to: "/ecommerce", label: "eCommerce" },
    { to: "/contact", label: "Contact" },
    { to: "/virtualtour", label: "Virtual Tour" },
    { to: "/faq", label: "FAQ" },
  ];

  // Function to toggle navigation menu
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Main navigation bar */}
      <div
        className={`flex items-center justify-between transition-colors duration-500 sticky top-0 z-30 shadow-lg ${
          dark ? "bg-gradient-to-r from-[#0d1b2a] via-[#102542] to-[#0d1b2a]" : "bg-gradient-to-r from-[#4f2b18] via-[#704321] to-[#4f2b18]"
        } text-white h-16 px-4 md:px-6`}
      >
        <div className="flex items-center">
          {/* Logo section */}
          <img src={logo} alt="Logo" className="h-14 w-14 mr-3 drop-shadow" />
        </div>
        {/* Navigation links for desktop view */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-2 text-lg z-50 relative">
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="py-2 px-4 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 hover:border-white/30 backdrop-blur transition-all duration-300 ease-out shadow-sm hover:shadow-md"
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Dark mode toggle button for desktop view */}
        <div className="hidden md:flex items-center ml-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 text-yellow-300 rounded-full text-2xl focus:outline-none transition-colors duration-300 border border-white/20 shadow-inner"
          >
            {dark ? (
              <IoSunny className="text-yellow-500" />
            ) : (
              <IoMoon className="text-yellow-500" />
            )}
          </button>
        </div>
        {/* Mobile menu toggle button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 text-yellow-300 rounded-full text-2xl focus:outline-none mr-4 transition-colors duration-300 border border-white/20 shadow-inner"
          >
            {dark ? (
              <IoSunny className="text-yellow-500" />
            ) : (
              <IoMoon className="text-yellow-500" />
            )}
          </button>
          <button
            onClick={toggleNav}
            className="text-white focus:outline-none z-20"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-10"
          onClick={toggleNav}
        ></div>
      )}
      {/* Mobile navigation menu */}
      <div
        className={`md:hidden fixed top-0 right-0 transition-colors duration-500 ${
          dark ? "bg-gradient-to-b from-[#0d1b2a]/95 via-[#102542]/95 to-[#0d1b2a]/95" : "bg-gradient-to-b from-[#4f2b18]/95 via-[#704321]/95 to-[#4f2b18]/95"
        } text-white w-72 h-screen p-6 z-20 transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start mt-16 text-lg space-y-2 pb-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all duration-300 ease-out shadow-sm hover:shadow-md"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;


