// src/components/FAQ.js
import React, { useState } from "react";
import { faqs as initialFaqs } from "../data/faqs";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";

function FAQ() {
  const [faqList, setFaqList] = useState(initialFaqs);
  const [isPaused, setIsPaused] = useState(false);

  const [votedIds, setVotedIds] = useState(() => {
    const stored = localStorage.getItem("faqVotes");
    return stored ? JSON.parse(stored) : [];
  });

  const [newQuestion, setNewQuestion] = useState("");

  const sortedFaqs = [...faqList].sort((a, b) => b.upvotes - a.upvotes);

  // Speech synthesis helper
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

  // Hover speech for buttons
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

  const handleUpvote = (id) => {
    if (votedIds.includes(id)) return;

    const updatedFaqs = faqList.map((faq) =>
      faq.id === id ? { ...faq, upvotes: faq.upvotes + 1 } : faq
    );

    const updatedVotedIds = [...votedIds, id];

    setFaqList(updatedFaqs);
    setVotedIds(updatedVotedIds);
    localStorage.setItem("faqVotes", JSON.stringify(updatedVotedIds));
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

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

  const handleTempAnswerChange = (id, text) => {
    const updated = faqList.map((faq) =>
      faq.id === id ? { ...faq, tempAnswer: text } : faq
    );
    setFaqList(updated);
  };

  const handleSubmitAnswer = (id) => {
    const updated = faqList.map((faq) => {
      if (faq.id === id) {
        if (!faq.tempAnswer || !faq.tempAnswer.trim()) {
          return faq;
        }
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

  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <h1
        className="text-3xl font-bold mb-2 cursor-pointer select-none text-[#5b3a1a] dark:text-white"
        onClick={() => speak("Woodland Conservation Frequently Asked Questions")}
        title="Click to hear heading"
      >
        Woodland Conservation FAQs
      </h1>
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

      {/* FAQ LIST */}
      {sortedFaqs.map((faq) => (
        <div
          key={faq.id}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4 bg-white dark:bg-blue-950"
        >
          <div className="text-xs text-gray-500 dark:text-gray-300 mb-1 cursor-pointer select-none" 
            onClick={() => speak(`Category: ${faq.category}`)}
            title="Click to hear category"
          >
            Category: <span className="font-semibold">{faq.category}</span>
          </div>

          <h3
            className="text-lg font-semibold mb-2 cursor-pointer select-none text-[#5b3a1a] dark:text-white"
            onClick={() => speak(`Question: ${faq.question}`)}
            title="Click to hear question"
          >
            {faq.question}
          </h3>

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

              <textarea
                className="w-full p-2 rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 mb-2"
                rows="3"
                placeholder="Type an answer..."
                value={faq.tempAnswer || ""}
                onChange={(e) => handleTempAnswerChange(faq.id, e.target.value)}
              ></textarea>

              <button
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                onClick={() => handleSubmitAnswer(faq.id)}
                onMouseEnter={() => speakOnHover("Submit answer")}
                aria-label="Submit answer"
                title="Hover to hear Submit answer"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <p
              className="text-gray-800 dark:text-gray-100 mb-4 cursor-pointer select-none"
              onClick={() => speak(`Answer: ${faq.answer}`)}
              title="Click to hear answer"
            >
              {faq.answer}
            </p>
          )}

          <button
            data-cy="faq-upvote"

            onClick={() => handleUpvote(faq.id)}
            onMouseEnter={() => speakOnHover("Upvote")}
            className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-500 text-sm hover:bg-gray-100 dark:hover:bg-blue-800 text-black dark:text-white"
            aria-label={`Upvote question: ${faq.question}`}
            title="Hover to hear Upvote"
          >
            👍 Upvote ({faq.upvotes})
          </button>
        </div>
      ))}

      {/* SUBMIT QUESTION FORM */}
      <div className="mt-10 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-blue-950">
        <h2
          className="text-xl font-semibold mb-3 cursor-pointer select-none text-[#5b3a1a] dark:text-white"
          onClick={() => speak("Ask a Question")}
          title="Click to hear heading"
        >
          Ask a Question
        </h2>

        <form onSubmit={handleSubmitQuestion}>
          <textarea
            placeholder="Type your question here..."
            className="w-full p-2 rounded-md border border-gray-400 dark:border-gray-600 mb-3 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows="3"
            aria-label="New question input"
          ></textarea>

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

