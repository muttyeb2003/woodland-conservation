// Author: Hemanth Harsha Rangaswamy Anitha
// Update: Added progress bar , background image and easier questions.
// Background image: “The Oak Woodland in South End Halifax” by NS Wild Flora  
// URL: https://nswildflora.ca/2020/05/07/the-oak-woodland-in-south-end-halifax/  
// Used as background for Halifax Woodlands Quiz (© NS Wild Flora, 2020)

import React, { useState, useCallback } from "react";
import { applyTalkingTreesVoice } from "../utils/talkingTreesVoice";
import bgImage from "../assets/woodlands-bg.jpg"; // your background image

const EcosystemQuiz = () => {
  const questions = [
    {
      question: "What is one of the most common tree species in the Halifax woodlands?",
      options: ["Maple", "Oak", "Spruce", "Palm"],
      answer: "Spruce",
    },
    {
      question: "Which protected area is known for its forest trails near Halifax?",
      options: ["Point Pleasant Park", "Peggy’s Cove", "Citadel Hill", "Halifax Harbour"],
      answer: "Point Pleasant Park",
    },
    {
      question: "Why are Halifax’s woodlands important to the ecosystem?",
      options: [
        "They provide shade for tourists",
        "They filter air and store carbon",
        "They are mainly used for farming",
        "They prevent snow buildup",
      ],
      answer: "They filter air and store carbon",
    },
    {
      question: "What kind of wildlife can often be found in Halifax forests?",
      options: [
        "Deer and red squirrels",
        "Camels and scorpions",
        "Penguins and seals",
        "Tigers and elephants",
      ],
      answer: "Deer and red squirrels",
    },
    {
      question: "What do trees produce that humans need to breathe?",
      options: ["Oxygen", "Water", "Smoke", "Helium"],
      answer: "Oxygen",
    },
    {
      question: "What do tree roots mainly help with?",
      options: ["Holding soil in place", "Flying", "Heating the ground", "Creating noise"],
      answer: "Holding soil in place",
    },
    {
      question: "Which season causes most leaves to change color?",
      options: ["Summer", "Fall", "Winter", "Spring"],
      answer: "Fall",
    },
    {
      question: "Which animal is commonly found in Nova Scotia forests?",
      options: ["Black bears", "Kangaroos", "Polar bears", "Hyenas"],
      answer: "Black bears",
    },
    {
      question: "What natural process turns old plants into soil?",
      options: ["Decomposition", "Evaporation", "Photosynthesis", "Melting"],
      answer: "Decomposition",
    },
    {
      question: "What do forests help clean?",
      options: ["Air and water", "Sand", "Metal", "Plastic"],
      answer: "Air and water",
    },
  ];

  const totalQuestions = questions.length;

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Voice
  const speakText = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
    window.speechSynthesis.speak(utter);
  }, []);

  const handleSubmit = () => {
    if (!showFeedback) {
      if (selected === questions[current].answer) {
        setScore((prev) => prev + 1);
      }
      setShowFeedback(true);
      return;
    }

    const next = current + 1;
    if (next < totalQuestions) {
      setCurrent(next);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-3xl px-6 py-10">
        <h1
          className="text-4xl font-extrabold text-green-100 text-center mb-6 cursor-pointer"
          onClick={() => speakText("Halifax Woodlands Quiz")}
        >
          Halifax Woodlands Quiz
        </h1>

        {!finished ? (
          <div className="bg-green-900/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-700">

            {/* Question */}
            <h2
              data-cy="question-text"
              className="text-3xl font-bold text-green-50 mb-6 text-center cursor-pointer"
              onClick={() => speakText(questions[current].question)}
            >
              {questions[current].question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {questions[current].options.map((option, idx) => {
                const correct = option === questions[current].answer;
                const wrongSelected =
                  showFeedback && selected === option && !correct;

                let style =
                  "w-full py-3 px-4 rounded-xl border text-lg transition shadow-sm bg-green-800 border-green-600 text-green-50";

                if (!showFeedback && selected === option) {
                  style =
                    "w-full py-3 px-4 rounded-xl border text-lg transition shadow-sm bg-green-600 border-green-300 text-white";
                }

                if (showFeedback) {
                  if (correct)
                    style =
                      "w-full py-3 px-4 rounded-xl border text-lg transition shadow-sm bg-green-500 border-green-200 text-green-900";
                  if (wrongSelected)
                    style =
                      "w-full py-3 px-4 rounded-xl border text-lg transition shadow-sm bg-red-500 border-red-200 text-white";
                }

                return (
                  <button
                    data-cy="option"
                    key={idx}
                    className={style}
                    onClick={() => !showFeedback && setSelected(option)}
                    onMouseEnter={() =>
                      !showFeedback && speakText(option)
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Submit button */}
            <button
              data-cy="submit-button"
              className="mt-6 w-full bg-green-500 hover:bg-green-400 text-green-900 font-semibold text-lg py-3 rounded-xl shadow-md"
              onClick={handleSubmit}
              onMouseEnter={() =>
                speakText(showFeedback ? "Next Question" : "Submit Answer")
              }
            >
              {showFeedback ? "Next Question" : "Submit Answer"}
            </button>

            <p
              data-cy="progress-text"
              className="mt-4 text-green-200/80 text-center cursor-pointer"
              onClick={() =>
                speakText(`Question ${current + 1} of ${totalQuestions}`)
              }
            >
              Question {current + 1} of {totalQuestions}
            </p>
          </div>
        ) : (
          <div
            data-cy="results-screen"
            className="bg-green-900/80 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center border border-green-700"
          >
            <h2
              className="text-3xl font-extrabold text-green-100 mb-4 cursor-pointer"
              onClick={() => speakText("Quiz Complete")}
            >
              Quiz Complete!
            </h2>

            <p
              className="text-xl text-green-200 mb-6 cursor-pointer"
              onClick={() =>
                speakText(`You scored ${score} out of ${totalQuestions}`)
              }
            >
              You scored {score} out of {totalQuestions}.
            </p>

            <button
              data-cy="retry-button"
              className="bg-green-500 hover:bg-green-400 text-green-900 font-semibold text-lg py-3 px-5 rounded-xl shadow-md"
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setFinished(false);
                setSelected(null);
                setShowFeedback(false);
                speakText("Try Again");
              }}
              onMouseEnter={() => speakText("Try Again")}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemQuiz;
