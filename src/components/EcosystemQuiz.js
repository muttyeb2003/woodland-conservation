//Author: Hemanth Harsha Rangaswamy Anitha and Muhammad Asfand Yar Khan
//Purpose: Code to display the ecosystem quiz with hover-speak and submit button

import React, { useState, useCallback } from "react";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";

const EcosystemQuiz = () => {
  const questions = [
    {
      question: "What is one of the most common tree species in the Halifax woodlands?",
      options: ["Maple", "Oak", "Spruce", "Palm"],
      answer: "Spruce",
    },
    {
      question: "Which protected area is known for its forest trails near Halifax?",
      options: [
        "Point Pleasant Park",
        "Peggy’s Cove",
        "Citadel Hill",
        "Halifax Harbour"
      ],
      answer: "Point Pleasant Park",
    },
    {
      question: "Why are Halifax’s woodlands important to the ecosystem?",
      options: [
        "They provide shade for tourists",
        "They filter air and store carbon",
        "They are mainly used for farming",
        "They prevent snow buildup"
      ],
      answer: "They filter air and store carbon",
    },
    {
      question: "What kind of wildlife can often be found in Halifax forests?",
      options: [
        "Deer and red squirrels",
        "Camels and scorpions",
        "Penguins and seals",
        "Tigers and elephants"
      ],
      answer: "Deer and red squirrels",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  // ------ SPEECH FUNCTION (ONLY TRIGGERED MANUALLY)
  const speakText = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
    window.speechSynthesis.speak(utter);
  }, []);

  const handleSubmit = () => {
    if (selected === null) return;

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1
        className="text-3xl font-bold mb-6 text-green-700 cursor-pointer"
        onClick={() => speakText("Halifax Woodlands Quiz")}
      >
        Halifax Woodlands Quiz
      </h1>

      {!finished ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          {/* Question */}
          <h2
            className="text-xl font-semibold mb-4 cursor-pointer"
            onClick={() => speakText(questions[current].question)}
          >
            {questions[current].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(option)}                 
                onMouseEnter={() => speakText(option)}              
                className={`w-full py-2 px-4 rounded-lg border transition
                  ${selected === option
                    ? "bg-green-300 border-green-600 text-green-900"
                    : "bg-green-100 hover:bg-green-200 border-green-300 text-green-800"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit Button (NOW SPEAKS ON HOVER) */}
          <button
            onClick={handleSubmit}
            onMouseEnter={() => speakText("Submit Answer")}
            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            Submit Answer
          </button>

          <p
            className="mt-4 text-gray-600 cursor-pointer"
            onClick={() =>
              speakText(`Question ${current + 1} of ${questions.length}`)
            }
          >
            Question {current + 1} of {questions.length}
          </p>
        </div>
      ) : (
        // ---------------- QUIZ RESULTS ----------------
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2
            className="text-2xl font-bold text-green-700 mb-4 cursor-pointer"
            onClick={() => speakText("Quiz Complete")}
          >
            Quiz Complete!
          </h2>

          <p
            className="text-lg mb-4 cursor-pointer"
            onClick={() => speakText(`You scored ${score} out of ${questions.length}`)}
          >
            You scored {score} out of {questions.length}.
          </p>

          {/* Try Again button with hover speak */}
          <button
            onClick={() => {
              speakText("Try Again");
              setCurrent(0);
              setScore(0);
              setFinished(false);
              setSelected(null);
            }}
            onMouseEnter={() => speakText("Try Again")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default EcosystemQuiz;




