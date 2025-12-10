// Author: Lakshay Bansal (A00467478), refreshed styling and content by Codex
// Purpose: About page for St. Margaret's Bay Woodland Conservation

import React, { useCallback, useEffect, useRef, useState } from "react";
import outlookImage from "../assets/outlook.jpg";
import { IoVolumeHigh, IoVolumeOff } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";

const About = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [accordionState, setAccordionState] = useState({
    floraFauna: false,
    heritageLegacy: false,
  });
  const [showMoreMission, setShowMoreMission] = useState(false);
  const speechSynthesisRef = useRef(null);
  const textRef = useRef("");

  const speakSoftly = useCallback((text) => {
    const utterance = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const text = e.target.innerText?.trim();
      if (!text || text.length < 3 || text.length > 250) return;
      speakSoftly(text);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [speakSoftly]);

  const handleTextToSpeech = () => {
    if (speechSynthesisRef.current && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (speechSynthesisRef.current && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      textRef.current = `
        Welcome to the St. Margaret's Bay Woodland Conservation site in Halifax, Nova Scotia.
        This 200-acre living classroom is home to layered canopy, mossy understory, and thriving wildlife.
        Our mission is to protect biodiversity, keep trails accessible, and pair community stewardship with gentle remembrance.
      `;
      const utterance = applyTalkingTreesVoice(new SpeechSynthesisUtterance(textRef.current));
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        speechSynthesisRef.current = null;
        setIsPaused(false);
      };
    }
  };

  const toggleAccordion = (section) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-8 font-[Calibri,ui-sans-serif] bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 text-gray-900 dark:text-amber-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full max-w-6xl mb-8 flex-wrap gap-4">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-700 dark:text-amber-200">
            Woodland Conservation
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            About St. Margaret&apos;s Bay Woodland
          </h1>
          <p className="max-w-3xl text-lg text-gray-800 dark:text-amber-100/90">
            A 200-acre coastal forest stewarded with community science, accessible trails, and
            restoration that keeps carbon stored in healthy soil and canopy.
          </p>
        </div>
        <button
          onClick={handleTextToSpeech}
          className="shrink-0 bg-sky-100 text-sky-900 dark:bg-slate-800 dark:text-amber-100 rounded-full p-4 shadow-md hover:shadow-lg transition cursor-pointer"
          aria-label="Play or pause about page narration"
        >
          {speechSynthesisRef.current && !isPaused ? (
            <IoVolumeOff className="text-3xl" />
          ) : (
            <IoVolumeHigh className="text-3xl" />
          )}
        </button>
      </div>

      {/* Hero Image */}
      <div className="mb-12 w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <img
          src={outlookImage}
          alt="Woodland outlook across trees and trails"
          className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
        <button
          onClick={() => speakSoftly("Panoramic view of St. Margaret's Bay woodland canopy and gentle trails.")}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-sky-700 text-white dark:text-amber-100 text-sm font-semibold shadow-lg hover:bg-sky-800 transition cursor-pointer"
          aria-label="Play image description"
        >
          Image Audio
        </button>
      </div>

      {/* Accordion Section */}
      <div className="w-full max-w-6xl mb-12 grid md:grid-cols-2 gap-6">
        <div className="mb-4">
          <button
            className="flex justify-between w-full p-4 bg-white dark:bg-gray-800 text-xl font-semibold rounded-lg shadow-md focus:outline-none hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700 cursor-pointer"
            onClick={() => toggleAccordion("floraFauna")}
          >
            <span className="text-sky-800 dark:text-amber-200">Flora and Fauna</span>
            {accordionState.floraFauna ? <AiOutlineMinus className="text-3xl" /> : <AiOutlinePlus className="text-3xl" />}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              accordionState.floraFauna ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 text-base leading-relaxed bg-slate-50 dark:bg-gray-900 rounded-b-lg shadow-md border border-slate-200 dark:border-gray-700">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Flora: Red Maple, Wild Carrot, Coltsfoot, Sheep Laurel, and Multiflora Rose—plus
                  ongoing native plantings to replace invasives.
                </li>
                <li>
                  Fauna: Star-nosed Mole, Little Brown Bat, and diverse songbirds supported by layered understory.
                </li>
              </ul>
              <p className="mt-4">
                A layered canopy, mossy floor, and vernal pools keep water cycling and carbon stored in soil.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <button
            className="flex justify-between w-full p-4 bg-white dark:bg-gray-800 text-xl font-semibold rounded-lg shadow-md focus:outline-none hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700 cursor-pointer"
            onClick={() => toggleAccordion("heritageLegacy")}
          >
            <span className="text-sky-800 dark:text-amber-200">Heritage and Legacy</span>
            {accordionState.heritageLegacy ? <AiOutlineMinus className="text-3xl" /> : <AiOutlinePlus className="text-3xl" />}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              accordionState.heritageLegacy ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 text-base leading-relaxed bg-slate-50 dark:bg-gray-900 rounded-b-lg shadow-md border border-slate-200 dark:border-gray-700">
              <p>
                Trails follow Mi'kma'ki waterways and settler farm edges—each grove shows the layered history of people
                and place. Markers stay low and natural so stories live in the landscape, not in polished stone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission + Metrics */}
      <div className="w-full max-w-6xl grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-start">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-800 p-6">
          <h2 className="text-3xl font-bold mb-3">Mission</h2>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-amber-100">
            Preserve, restore, and share a resilient woodland that welcomes every visitor. We balance access with
            protection by tending trails, removing invasives, and planting native understory so soil, water, and
            wildlife remain healthy.
            {showMoreMission && (
              <span>
                {" "}
                We partner with local schools and elders for seasonal monitoring, bird counts, and guided walks that keep
                community knowledge alive. Every project is measured against biodiversity gains and carbon storage, not
                just aesthetics.
              </span>
            )}
          </p>
          <button
            onClick={() => setShowMoreMission(!showMoreMission)}
            className="mt-3 inline-flex items-center text-sm font-semibold text-sky-800 dark:text-amber-200 underline-offset-4 hover:underline cursor-pointer px-3 py-1 rounded-full bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-700"
          >
            {showMoreMission ? "Show less" : "Learn more"}
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Acres protected", value: "200+" },
            { label: "Native species monitored", value: "120+" },
            { label: "Volunteer hours yearly", value: "1,500" },
            { label: "Guided walks each season", value: "12" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-800 p-4 shadow"
            >
              <p className="text-sm uppercase tracking-wide text-sky-800 dark:text-amber-200">
                {stat.label}
              </p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision + Stewardship */}
      <div className="w-full max-w-6xl mt-12 grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-800 p-6">
          <h2 className="text-3xl font-bold mb-3">Vision</h2>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-amber-100">
            A thriving coastal forest that acts as a beacon for low-impact remembrance, outdoor learning, and community
            science. Trails stay soft, markers stay humble, and the canopy keeps growing.
          </p>
        </div>
        <div className="bg-sky-800 text-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-semibold mb-2">Stewardship in practice</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li>• Seasonal trail care and accessibility checks for elders and kids</li>
            <li>• Invasive species sweeps with local volunteers</li>
            <li>• Native understory plantings to cool soil and feed pollinators</li>
            <li>• Quiet zones for wildlife breeding and nocturnal species</li>
            <li>• Water monitoring to keep streams clear and resilient</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
