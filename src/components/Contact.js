// Author: Muhammad Asfand Yar Khan, Muttyeb Tahir
// Updated: Click-to-speech for all sections, hover-speech for Send Message

import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { IoVolumeHigh } from "react-icons/io5";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";

const Contact = () => {
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const speakText = (text) => {
    if (!ttsEnabled) return;
    const utterance = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleHoverSpeak = (text) => {
    if (!ttsEnabled) return;
    const utterance = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const toggleVoiceEnabled = () => {
    if (ttsEnabled) stopSpeech();
    setTtsEnabled((prev) => !prev);
  };

  return (
    <div
      id="contact"
      className="p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-amber-100 min-h-screen flex flex-col items-center font-[Calibri,ui-sans-serif]"
    >
      {/* TITLE WITH CLICK-TO-SPEAK */}
      <h1
        className="text-5xl font-bold mb-6 text-center cursor-pointer"
        onClick={() => speakText("Get in Touch")}
      >
        Get in Touch
      </h1>

      {/* INTRO TEXT WITH CLICK-TO-SPEAK */}
      <p
        className="text-lg text-center mb-8 max-w-2xl cursor-pointer"
        onClick={() =>
          speakText(
            "Have questions, feedback, or just want to say hello? We'd love to hear from you! Fill out the form below or connect with us through our social channels."
          )
        }
      >
        Have questions, feedback, or just want to say hello? We'd love to hear
        from you! Fill out the form below or connect with us through our social
        channels.
      </p>

      <div className="bg-white/95 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl w-full">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* NAME */}
            <div>
              <label className="block text-lg font-medium mb-2 flex items-center">
                Name
                <button
                  type="button"
                  onClick={() => speakText("Please enter your name")}
                  className="ml-2 text-gray-900 dark:text-gray-100"
                >
                  <IoVolumeHigh className="text-2xl" />
                </button>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50 dark:bg-gray-900"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-lg font-medium mb-2 flex items-center">
                Email
                <button
                  type="button"
                  onClick={() => speakText("Please enter your email")}
                  className="ml-2 text-gray-900 dark:text-gray-100"
                >
                  <IoVolumeHigh className="text-2xl" />
                </button>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50 dark:bg-gray-900"
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 flex items-center">
              Message
              <button
                type="button"
                onClick={() => speakText("Please enter your message")}
                className="ml-2 text-gray-900 dark:text-gray-100"
              >
                <IoVolumeHigh className="text-2xl" />
              </button>
            </label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50 dark:bg-gray-900"
            ></textarea>
          </div>

          {/* SEND MESSAGE – HOVER TO SPEAK */}
          <button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-800 text-white dark:text-amber-100 text-lg font-bold py-3 px-6 rounded-md transition-all duration-300 shadow-md"
            onMouseEnter={() => handleHoverSpeak("Send Message")}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* CONTACT INFO */}
      <div className="mt-12 text-center">
        <h2
          className="text-3xl font-bold mb-4 cursor-pointer"
          onClick={() => speakText("Contact Information")}
        >
          Contact Information
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* PHONE */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => speakText("Phone number: +1 123 456 7890")}
          >
            <FaPhone className="text-2xl text-sky-800 dark:text-sky-400" />
            <p className="text-lg">+1 (123) 456-7890</p>
          </div>

          {/* EMAIL */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              speakText("Email address: info at woodland conservation dot c a")
            }
          >
            <FaEnvelope className="text-2xl text-sky-800 dark:text-sky-400" />
            <p className="text-lg">info@woodlandconservation.ca</p>
          </div>

          {/* LOCATION */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => speakText("Location: Halifax, Nova Scotia")}
          >
            <FaMapMarkerAlt className="text-2xl text-sky-800 dark:text-sky-400" />
            <p className="text-lg">Halifax, Nova Scotia</p>
          </div>
        </div>
      </div>

      {/* SOCIAL ICONS */}
      <div className="mt-8 text-center">
        <h3
          className="text-2xl font-bold mb-4 cursor-pointer"
          onClick={() => speakText("Follow Us")}
        >
          Follow Us
        </h3>

        <div className="flex justify-center gap-6 text-3xl text-sky-800 dark:text-sky-400">
          <FaFacebook
            className="hover:scale-110 transition-transform cursor-pointer"
            onClick={() => speakText("Facebook")}
          />
          <FaInstagram
            className="hover:scale-110 transition-transform cursor-pointer"
            onClick={() => speakText("Instagram")}
          />
          <FaTwitter
            className="hover:scale-110 transition-transform cursor-pointer"
            onClick={() => speakText("Twitter")}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;



