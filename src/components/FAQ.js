// src/components/FAQ.js
// Author: Muttyeb Tahir
// FAQ component provides searchable questions, upvotes, speech feedback,
// user-submitted questions, and text-to-speech accessibility features.

import React, { useEffect, useState } from "react";
import { faqs as initialFaqs } from "../data/faqs";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";

const STORAGE_KEYS = {
  faqList: "faqList",
  votes: "faqVotes",
};

function FAQ() {
  // State: full FAQ list, restored from localStorage if available
  const [faqList, setFaqList] = useState(() => {
    if (typeof window === "undefined") return initialFaqs;
    const storedFaqs = localStorage.getItem(STORAGE_KEYS.faqList);
    if (storedFaqs) {
      try {
        return JSON.parse(storedFaqs);
      } catch {
        // Fallback to defaults if parsing fails
        return initialFaqs;
      }
    }
    return initialFaqs;
  });

  // Whether speech synthesis is paused or active
  const [isPaused, setIsPaused] = useState(false);

  // Load previously voted question IDs from localStorage to prevent repeated voting
  const [votedIds, setVotedIds] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEYS.votes);
    return stored ? JSON.parse(stored) : [];
  });

  // Input state for submitting a new question
  const [newQuestion, setNewQuestion] = useState("");

  // Sort FAQs so highest-upvoted appear first
  const sortedFaqs = [...faqList].sort((a, b) => b.upvotes - a.upvotes);

  // SPEECH SYNTHESIS: speak any given text using the Talking Trees voice filter
  const speak = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (synth.paused) synth.resume();
    synth.cancel();

    const utter = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
    synth.speak(utter);

    setIsPaused(false);
  };

  // SPEECH ON HOVER: used for buttons like Upvote, Submit Answer, etc.
  const speakOnHover = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (synth.paused) synth.resume();
    synth.cancel();

    const utter = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
    synth.speak(utter);

    setIsPaused(false);
  };

  // Pause / resume speech output
  const toggleSpeechPause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
  };

  // Handle upvoting: one vote per question per device via localStorage
  const handleUpvote = (id) => {
    const hasVoted = votedIds.includes(id);

    const updatedFaqs = faqList.map((faq) => {
      if (faq.id !== id) return faq;

      // Increment or decrement depending on vote state
      const nextVotes = hasVoted ? Math.max(0, faq.upvotes - 1) : faq.upvotes + 1;
      return { ...faq, upvotes: nextVotes };
    });

    // Update voted question IDs
    const updatedVotedIds = hasVoted
      ? votedIds.filter((voteId) => voteId !== id)
      : [...votedIds, id];

    setFaqList(updatedFaqs);
    setVotedIds(updatedVotedIds);

    // Persist votes into localStorage
    localStorage.setItem(STORAGE_KEYS.votes, JSON.stringify(updatedVotedIds));
  };

  // Handle adding a NEW QUESTION to the list
  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    // Temp placeholder answer until a team member responds
    const newFAQ = {
      id: Date.now(),
      question: newQuestion,
      answer: "This question has been submitted and will be answered soon.",
      category: "User Submitted",
      upvotes: 0,
      source: "user",
      createdAt: new Date().toISOString(),
    };

    setFaqList((prev) => [...prev, newFAQ]);
    setNewQuestion("");
    speak("Question submitted.");
  };

  // For admin replying to unanswered user-submitted questions
  const handleTempAnswerChange = (id, text) => {
    const updated = faqList.map((faq) =>
      faq.id === id ? { ...faq, tempAnswer: text } : faq
    );
    setFaqList(updated);
  };

  // Submit a written answer to a user question
  const handleSubmitAnswer = (id) => {
    const updated = faqList.map((faq) => {
      if (faq.id === id) {
        if (!faq.tempAnswer || !faq.tempAnswer.trim()) return faq;

        return {
          ...faq,
          answer: faq.tempAnswer,
          tempAnswer: "",
        };
      }
      return faq;
    });

    setFaqList(updated);
    speak("Answer submitted.");
  };

  // Persist FAQs (including upvote counts and user-submitted questions) locally
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.faqList, JSON.stringify(faqList));
  }, [faqList]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-left font-[Calibri,ui-sans-serif] text-gray-900 dark:text-amber-100">

      {/* Heading with text-to-speech on click */}
      <h1
        className="text-3xl font-bold mb-2 cursor-pointer select-none text-[#5b3a1a] dark:text-white"
        onClick={() => speak("Woodland Conservation Frequently Asked Questions")}
        title="Click to hear heading"
      >
        Woodland Conservation FAQs
      </h1>

      {/* Description paragraph with screen-reader speech */}
      <p
        className="text-gray-700 dark:text-gray-200 mb-6 cursor-pointer select-none"
        onClick={() =>
          speak(
            "Browse common questions about woodlands, wildlife, and conservation. Answers with more upvotes appear at the top. You can also submit a new question and reply to user-submitted questions."
          )
        }
        title="Click to hear description"
      >
        Browse common questions about woodlands, wildlife, and conservation.
        Answers with more upvotes appear at the top. You can also submit a new
        question and reply to user-submitted questions.
      </p>

      {/* Pause/resume speech */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={toggleSpeechPause}
          className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm text-[#5b3a1a] dark:text-white"
          aria-label={isPaused ? "Resume text to speech" : "Pause text to speech"}
          title={isPaused ? "Resume text to speech" : "Pause text to speech"}
        >
          {isPaused ? "Resume speech" : "Pause speech"}
        </button>
      </div>

      {/* === FAQ LIST SECTION === */}
      {sortedFaqs.map((faq) => {
        const hasVoted = votedIds.includes(faq.id);

        return (
          <div
            key={faq.id}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4 bg-white dark:bg-blue-950"
          >

            {/* Category line */}
            <div
              className="text-xs text-gray-500 dark:text-gray-300 mb-1 cursor-pointer select-none"
              onClick={() => speak(`Category: ${faq.category}`)}
              title="Click to hear category"
            >
              Category: <span className="font-semibold">{faq.category}</span>
            </div>

            {/* Question text */}
            <h3
              className="text-lg font-semibold mb-2 cursor-pointer select-none text-[#5b3a1a] dark:text-white"
              onClick={() => speak(`Question: ${faq.question}`)}
              title="Click to hear question"
            >
              {faq.question}
            </h3>

            {/* If question is user-submitted AND still unanswered */}
            {faq.source === "user" &&
            faq.answer ===
              "This question has been submitted and will be answered soon." ? (
              <div className="mb-4">
                <p
                  className="text-[#5b3a1a] dark:!text-white mb-2 cursor-pointer select-none"
                  onClick={() => speak("This question is waiting for an answer")}
                  title="Click to hear waiting message"
                >
                  This question is waiting for an answer:
                </p>

                {/* Answer input box */}
                <textarea
                  className="w-full p-2 rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 mb-2"
                  rows="3"
                  placeholder="Type an answer..."
                  value={faq.tempAnswer || ""}
                  onChange={(e) => handleTempAnswerChange(faq.id, e.target.value)}
                ></textarea>

                {/* Submit answer button */}
                <button
                  className="px-3 py-1 bg-sky-600 text-white dark:text-amber-100 rounded-md hover:bg-sky-700 text-sm"
                  onClick={() => handleSubmitAnswer(faq.id)}
                  onMouseEnter={() => speakOnHover("Submit answer")}
                  aria-label="Submit answer"
                  title="Hover to hear Submit answer"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              // Otherwise show real answer
              <p
                className="text-gray-800 dark:text-gray-100 mb-4 cursor-pointer select-none"
                onClick={() => speak(`Answer: ${faq.answer}`)}
                title="Click to hear answer"
              >
                {faq.answer}
              </p>
            )}

            {/* Upvote button with speech on hover */}
            <button
              data-cy="faq-upvote"
              onClick={() => handleUpvote(faq.id)}
              onMouseEnter={() =>
                speakOnHover(hasVoted ? "Remove vote" : "Upvote")
              }
              className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
                hasVoted
                  ? "bg-sky-700 text-white dark:text-amber-100 hover:bg-sky-800"
                  : "bg-sky-100 text-sky-900 dark:bg-sky-900 dark:text-amber-100 hover:bg-sky-200 dark:hover:bg-sky-800"
              }`}
              aria-label={`${hasVoted ? "Remove vote from" : "Upvote"} question: ${
                faq.question
              }`}
              title="Hover to hear Upvote"
            >
              {hasVoted ? "Remove vote" : "Upvote"} ({faq.upvotes})
            </button>
          </div>
        );
      })}

      {/* === SUBMIT QUESTION FORM === */}
      <div className="mt-10 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-blue-950">
        <h2
          className="text-xl font-semibold mb-3 cursor-pointer select-none text-[#5b3a1a] dark:text-white"
          onClick={() => speak("Ask a Question")}
          title="Click to hear heading"
        >
          Ask a Question
        </h2>

        <form onSubmit={handleSubmitQuestion}>
          {/* New question input */}
          <textarea
            placeholder="Type your question here..."
            className="w-full p-2 rounded-md border border-gray-400 dark:border-gray-600 mb-3 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows="3"
            aria-label="New question input"
          ></textarea>

          {/* Submit question button */}
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black dark:text-white rounded-md"
            onMouseEnter={() => speakOnHover("Submit question")}
            aria-label="Submit question"
            title="Hover to hear Submit question"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default FAQ;
