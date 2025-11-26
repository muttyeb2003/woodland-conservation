// Authors: Yousef Yousef
// Purpose: Floating FAQ shortcut button shown on every page
import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";

const FloatingFAQButton = () => {
  return (
    <Link
      to="/faq"
      aria-label="Open Frequently Asked Questions"
      title="FAQ Help"
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 dark:bg-yellow-400 text-white dark:text-black shadow-lg hover:scale-110 transition transform cursor-pointer flex items-center justify-center z-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-yellow-500"
    >
      <FaQuestionCircle className="text-2xl" />
    </Link>
  );
};

export default FloatingFAQButton;
