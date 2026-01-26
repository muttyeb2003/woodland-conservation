//Author: Muttyeb Tahir
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

  const desktopLinkClasses =
    "py-1.5 px-2.5 lg:py-2 lg:px-3 text-white transition-colors duration-500 ease-in-out hover:bg-yellow-400 rounded-lg whitespace-nowrap";
  const mobileLinkClasses =
    "py-2 text-white transition-colors duration-500 ease-in-out hover:bg-yellow-400 w-full text-center rounded-lg hover:rounded-xl";

  // Function to toggle navigation menu
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Main navigation bar */}
      <div
        className={`flex items-center justify-between transition-colors duration-500 sticky top-0 z-30 shadow-lg ${
          dark
            ? "bg-gradient-to-r from-[#0d1b2a] via-[#102542] to-[#0d1b2a]"
            : "bg-gradient-to-r from-[#4f2b18] via-[#704321] to-[#4f2b18]"
        } text-white min-h-16 py-2 px-4 md:px-6`}
      >
        <div className="flex items-center">
          {/* Logo section */}
          <img src={logo} alt="Logo" className="h-14 w-14 mr-3 drop-shadow" />
        </div>
        {/* Navigation links for desktop view */}
        <div className="hidden md:flex items-center justify-center flex-1 flex-wrap gap-2 lg:gap-3 text-sm lg:text-base xl:text-lg z-50 relative">
          <Link to="/" className={desktopLinkClasses}>
            Homepage
          </Link>
          <Link to="/about" className={desktopLinkClasses}>
            About
          </Link>
          <Link to="/sitemap" className={desktopLinkClasses}>
            Site Map
          </Link>
          <Link to="/gallery" className={desktopLinkClasses}>
            Gallery
          </Link>
          <Link to="/ecosystem" className={desktopLinkClasses}>
            Ecosystem Quiz
          </Link>
          <Link to="/flora" className={desktopLinkClasses}>
            Flora/Fauna/Fungi
          </Link>
          <Link to="/natural-burial" className={desktopLinkClasses}>
            Natural Burial
          </Link>

          {/* eCommerce link */}
          <Link to="/ecommerce" className={desktopLinkClasses}>
            eCommerce
          </Link>

          <Link to="/contact" className={desktopLinkClasses}>
            Contact
          </Link>
          <Link to="/virtualtour" className={desktopLinkClasses}>
            Virtual Tour
          </Link>
          <Link to="/faq" data-cy="nav-faq" className={desktopLinkClasses}>
            FAQ
          </Link>
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
          dark
            ? "bg-gradient-to-b from-[#0d1b2a]/95 via-[#102542]/95 to-[#0d1b2a]/95"
            : "bg-gradient-to-b from-[#4f2b18]/95 via-[#704321]/95 to-[#4f2b18]/95"
        } text-white w-72 h-screen p-6 z-20 transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center mt-16 text-lg">
          <Link to="/" className={mobileLinkClasses}>
            Homepage
          </Link>
          <Link to="/about" className={mobileLinkClasses}>
            About
          </Link>
          <Link to="/sitemap" className={mobileLinkClasses}>
            Site Map
          </Link>
          <Link to="/gallery" className={mobileLinkClasses}>
            Gallery
          </Link>
          <Link to="/ecosystem" className={mobileLinkClasses}>
            Ecosystem Quiz
          </Link>
          <Link to="/flora" className={mobileLinkClasses}>
            Flora/Fauna/Fungi
          </Link>
          <Link to="/natural-burial" className={mobileLinkClasses}>
            Natural Burial
          </Link>

          {/* eCommerce link in mobile menu */}
          <Link to="/ecommerce" className={mobileLinkClasses}>
            eCommerce
          </Link>

          <Link to="/contact" className={mobileLinkClasses}>
            Contact
          </Link>
          <Link to="/virtualtour" className={mobileLinkClasses}>
            Virtual Tour
          </Link>
          <Link to="/faq" className={mobileLinkClasses}>
            FAQ
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
