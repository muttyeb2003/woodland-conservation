//Author: Yousef Yousef, Muttyeb Tahir
//Purpose of the file is to diplay all the components together in the website

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import FAQ from "./components/FAQ";
import Homepage from "./components/Homepage";
import About from "./components/About";
import SiteMap from "./components/Sitemap";
import NaturalBurial from "./components/NaturalBurial";
import Contact from "./components/Contact"; // Importing Contact component
import Gallery from "./components/gallery";
import Flora from "./components/flora";
import EcosystemQuiz from "./components/EcosystemQuiz";
import VirtualTour from "./components/VirtualTour";
import Ecommerce from "./components/Ecommerce";  // <-- Import Ecommerce component here
import FloatingFAQButton from "./components/FloatingFAQButton";

// App component definition
function App() {
  const [dark, setDark] = useState(false); // State to manage dark mode

  // Function to toggle dark mode
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    // Router component to handle navigation
    <Router>
      {/* Main container with dynamic background color based on dark mode */}
      <div className="bg-yellow-100 dark:bg-blue-900 min-h-screen">
        {/* Navigation component with dark mode toggle handler */}
        <Navigation toggleDarkMode={darkModeHandler} dark={dark} />
        {/* Routes component to handle different pages */}
        <Routes>
          <Route path="/" element={<Homepage dark={dark} />} />{" "}
          {/* Route for Homepage component */}
          <Route path="/about" element={<About />} />{" "}
          {/* Route for About component */}
          <Route path="/sitemap" element={<SiteMap />} />{" "}
          {/* Route for SiteMap component */}
          <Route path="/natural-burial" element={<NaturalBurial dark={dark} />} />{" "}
          {/* Route for Natural Burial component */}
          <Route path="/contact" element={<Contact />} />{" "}
          {/* Route for Contact component */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/flora" element={<Flora />} />
          <Route path="/ecosystem" element={<EcosystemQuiz />} />
          <Route path="/virtualtour" element={<VirtualTour />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ecommerce" element={<Ecommerce />} /> {/* Added route */}
        </Routes>
        <FloatingFAQButton />
      </div>
    </Router>
  );
}

export default App; // Exporting the App component as default
