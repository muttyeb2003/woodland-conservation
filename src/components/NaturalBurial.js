// Authors: Yousef Yousef
// Purpose: Natural Burial informational page for Woodland Conservation
import React, { useState } from "react";
import BrineGravestone from "../assets/BrineGravestone.jpg";
import { speakSoftly } from "../utils/speakSoftly";

const NaturalBurial = ({ dark }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleSpeechToggle = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
      return;
    }

    if (synth.speaking) {
      synth.pause();
      setIsPaused(true);
      return;
    }

    const text =
      "Natural burial at Woodland Conservation focuses on biodegradable materials, gentle ground care, and keeping the forest healthy. Paths remain accessible, with seating and guides for anyone needing support. Native plantings and memorial trees strengthen biodiversity and reduce carbon impact, honoring the land and community.";

    speakSoftly(text);
    setIsPaused(false);
  };

  return (
    <div
      className={`min-h-screen font-sans ${
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero */}
      <section
        className={`w-full bg-gradient-to-r ${
          dark
            ? "from-[#0f1f2d] via-[#103422] to-[#0f1f2d]"
            : "from-[#d9ead3] via-[#c7dbc1] to-[#d9ead3]"
        } text-center py-16 px-6 shadow-inner`}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Natural Burial at Woodland Conservation
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSpeechToggle}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm text-[#5b3a1a] dark:text-white"
            aria-label={isPaused ? "Resume text to speech" : "Play or pause text to speech"}
            title={isPaused ? "Resume text to speech" : "Play or pause text to speech"}
          >
            {isPaused ? "Resume speech" : "Play / Pause speech"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={BrineGravestone}
              alt="Natural burial gravestone in woodland"
              className="w-full max-w-xl rounded-2xl shadow-2xl object-cover transition duration-700 ease-out md:hover:scale-[1.01] md:hover:shadow-3xl"
            />
          </div>

          {/* Text */}
          <div className="space-y-5 text-lg leading-relaxed md:pr-2">
            <p>
              Natural burial keeps the woodland as the focus. Biodegradable
              caskets or shrouds, gentle ground care, and understated markers
              allow the forest to remain vibrant while honoring each person with
              quiet dignity.
            </p>
            <p>
              Accessibility is woven into the landscape: paths are tended,
              seating rests along routes, and guides are available for anyone
              needing support. The calm setting invites reflection without
              sacrificing comfort for elders, children, or visitors with
              mobility needs.
            </p>
            <p>
              This space is rooted in community stewardship. Native plantings,
              memorial trees, and living groundcovers strengthen biodiversity
              and lower the carbon footprint compared to conventional burials.
              Each choice helps restore the woodland for future generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NaturalBurial;
