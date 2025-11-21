//Author: Hemanth Harsha Rangaswamy Anitha
//Purpose: Code to display the ecosystem quiz


import React, { useState } from "react";

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

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Halifax Woodlands Quiz</h1>
      {!finished ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            {questions[current].question}
          </h2>
          <div className="space-y-3">
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-lg transition"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-gray-600">
            Question {current + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Quiz Complete!</h2>
          <p className="text-lg mb-4">
            You scored {score} out of {questions.length}.
          </p>
          <button
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setFinished(false);
            }}
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
