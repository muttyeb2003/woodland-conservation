// src/components/FAQ.js
import React, { useState } from "react";
import { faqs as initialFaqs } from "../data/faqs";

function FAQ() {
  // Base FAQ list (system + any user-submitted while page is open)
  const [faqList, setFaqList] = useState(initialFaqs);

  // Track which FAQ IDs this browser has already voted on
  const [votedIds, setVotedIds] = useState(() => {
    const stored = localStorage.getItem("faqVotes");
    return stored ? JSON.parse(stored) : [];
  });

  // For "Ask a Question" textarea
  const [newQuestion, setNewQuestion] = useState("");

  // Sort FAQs by upvotes (highest first)
  const sortedFaqs = [...faqList].sort((a, b) => b.upvotes - a.upvotes);

  const handleUpvote = (id) => {
    // Already voted for this FAQ on this browser
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
      // tempAnswer will be added later when replying
    };

    setFaqList((prev) => [...prev, newFAQ]);
    setNewQuestion("");
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
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <h1 className="text-3xl font-bold mb-2">Woodland Conservation FAQs</h1>
      <p className="text-gray-700 dark:text-gray-200 mb-6">
        Browse common questions about woodlands, wildlife, and conservation.
        Answers with more upvotes appear at the top. You can also submit a new
        question and reply to user-submitted questions.
      </p>

      {/* FAQ LIST */}
      {sortedFaqs.map((faq) => (
        <div
          key={faq.id}
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4 bg-white dark:bg-blue-950"
        >
          <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
            Category: <span className="font-semibold">{faq.category}</span>
          </div>

          <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>

          {/* If it's a user-submitted FAQ with placeholder answer, show reply UI */}
          {faq.source === "user" &&
          faq.answer ===
            "This question has been submitted and will be answered soon." ? (
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                This question is waiting for an answer:
              </p>

              <textarea
                className="w-full p-2 rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 mb-2"
                rows="3"
                placeholder="Type an answer..."
                value={faq.tempAnswer || ""}
                onChange={(e) => handleTempAnswerChange(faq.id, e.target.value)}
              ></textarea>

              <button
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                onClick={() => handleSubmitAnswer(faq.id)}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            // Otherwise just show the normal answer text
            <p className="text-gray-800 dark:text-gray-100 mb-4">
              {faq.answer}
            </p>
          )}

          <button
            onClick={() => handleUpvote(faq.id)}
            className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-500 text-sm hover:bg-gray-100 dark:hover:bg-blue-800"
          >
            👍 Upvote ({faq.upvotes})
          </button>
        </div>
      ))}

      {/* SUBMIT QUESTION FORM */}
      <div className="mt-10 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-blue-950">
        <h2 className="text-xl font-semibold mb-3">Ask a Question</h2>

        <form onSubmit={handleSubmitQuestion}>
          <textarea
            placeholder="Type your question here..."
            className="w-full p-2 rounded-md border border-gray-400 dark:border-gray-600 mb-3 bg-white dark:bg-gray-900"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows="3"
          ></textarea>

          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default FAQ;
