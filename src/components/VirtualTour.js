// Author: Muhammad Asfand Yar Khan
// Purpose: Virtual Tour Slideshow with Text-to-Speech, Uploads, and Caption Editing

import React, { useState, useEffect, useCallback } from "react";
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";
import img6 from "../assets/image6.jpg";
import bgImage from "../assets/image6.jpg";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";

const defaultSlides = [
  { src: img1, caption: "Twisted understory" },
  { src: img2, caption: "Mossy boulder path with wild apples" },
  { src: img3, caption: "Wild apple canopy" },
  { src: img4, caption: "Sunlit apple tree" },
  { src: img5, caption: "September apple thicket" },
  { src: img6, caption: "Old-growth birch grove" },
];

const VirtualTour = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [narrationOn, setNarrationOn] = useState(true);
  const [pendingUploads, setPendingUploads] = useState([]);

  // Slideshow auto-change every 10s
  const nextSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(() => nextSlide(), 10000);
    return () => clearInterval(id);
  }, [nextSlide]);

  // 🔊 narration
  const speak = (text) => {
    if (!text) return;
    const utter = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    if (narrationOn && slides[index]) speak(slides[index].caption);
  }, [index, narrationOn, slides]);

  const toggleNarration = () => {
    setNarrationOn((on) => {
      if (on) window.speechSynthesis.cancel();
      else speak(slides[index].caption);
      return !on;
    });
  };

  // handle uploads — create preview + editable caption
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    const previewPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ src: reader.result, caption: "", temp: true });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then((newImages) => {
      setPendingUploads((prev) => [...prev, ...newImages]);
    });
  };

  // handle caption typing
  const handleCaptionChange = (index, newCaption) => {
    setPendingUploads((prev) => {
      const updated = [...prev];
      updated[index].caption = newCaption;
      return updated;
    });
  };

  // Add pending uploads to slideshow
  const addToSlideshow = () => {
    setSlides((prev) => [...prev, ...pendingUploads]);
    setPendingUploads([]);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center text-gray-900 dark:text-gray-100 flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 p-8 w-full flex flex-col items-center font-sans">
        {/* CLICK-TO-SPEAK TITLE (SHORT, does NOT mention uploads) */}
        <h1
          className="text-5xl font-bold text-center mb-10 cursor-pointer text-[#FFF5E1]"
          style={{ fontFamily: "'Playfair Display', serif" }}
          onClick={() => speak("Virtual Tour of the Woodland")}
        >
          Virtual Tour of the Woodland
        </h1>


        {/* Slideshow */}
        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
          <img
            key={index}
            src={slides[index].src}
            alt={`Slide ${index + 1}`}
            className={`w-full h-[550px] object-cover transition-opacity duration-1000 ease-in-out ${fade ? "opacity-100" : "opacity-0"
              }`}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <p className="text-white text-2xl font-semibold text-center tracking-wide">
              {slides[index]?.caption}
            </p>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition"
          >
            ❯
          </button>
        </div>

        {/* Narration Controls */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => speak(slides[index].caption)}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition"
          >
            🔊 Hear Description
          </button>
          <button
            onClick={toggleNarration}
            className={`${narrationOn
                ? "bg-red-600 hover:bg-red-800"
                : "bg-green-600 hover:bg-green-800"
              } text-white font-bold py-2 px-6 rounded-full transition`}
          >
            {narrationOn ? "⏸️ Pause Narration" : "▶️ Resume Narration"}
          </button>
        </div>

        {/* Upload Section */}
        <div className="mt-12 text-center border-2 border-dashed border-gray-500 p-6 rounded-lg bg-gray-100 dark:bg-gray-800 max-w-2xl transition-all duration-300 hover:shadow-lg">
          {/* Click-to-speak the paragraph text */}
          <p
            className="text-xl text-gray-700 dark:text-gray-300 mb-4 cursor-pointer"
            onClick={() =>
              speak("Upload your own images and add captions for the virtual tour")
            }
          >
            Upload your own images and add captions for the virtual tour:
          </p>

          {/* Hover-to-speak label button (still opens file picker) */}
          <label
            className="block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded cursor-pointer transition-transform duration-300 hover:scale-105 mb-6 inline-block"
            onMouseEnter={() => speak("Upload Images")}
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </label>

          {/* Preview + caption inputs */}
          {pendingUploads.length > 0 && (
            <div className="space-y-4 mb-6">
              {pendingUploads.map((img, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center border border-gray-400 rounded-lg p-3 bg-white dark:bg-gray-700"
                >
                  <img
                    src={img.src}
                    alt="Preview"
                    className="w-full max-w-sm h-56 object-cover rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Type caption here..."
                    value={img.caption}
                    onChange={(e) => handleCaptionChange(idx, e.target.value)}
                    className="w-full max-w-sm p-2 border rounded-md text-gray-900"
                  />
                </div>
              ))}
              <button
                onClick={addToSlideshow}
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full transition mt-4"
              >
                ➕ Add to Slideshow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
