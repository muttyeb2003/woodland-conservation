// Updated FloraFaunaFungi.js with click-to-speech on title and expanded descriptions
//Author: Muhammad Asfand Yar Khan

import React, { useState } from 'react';
import redMaple from '../assets/download-4.jpg';
import mole from '../assets/download-5.jpg';
import mushroom from '../assets/download-6.jpg';
import birchImage from '../assets/download-7.jpg';
import chipmunk from '../assets/download-8.jpg';

// --- Speech Helpers ---
const speak = (text) => {
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
};

const hoverSpeak = (text) => () => speak(text);

// Expanded descriptive data
const data = [
  {
    name: 'Red Maple',
    category: 'Flora',
    description:
      'The Red Maple is a defining species within the Mi’kma’ki woodlands conservation areas. It thrives in moist soils and is especially known for its vibrant red foliage during the fall. Red Maples play an important ecological role by supporting a variety of insects, birds, and mammals. Indigenous Mi’kmaq communities have historically used different parts of the tree for medicinal and practical purposes.',
    image: redMaple,
  },
  {
    name: 'Star-nosed Mole',
    category: 'Fauna',
    description:
      'The Star-nosed Mole is a fascinating small mammal found in moist, forested areas of Mi’kma’ki, including Halifax woodlands. Known for its distinctive star-shaped nose with 22 appendages, it is the fastest mammalian eater on earth. This species plays an essential role in controlling soil invertebrate populations and contributes to soil aeration through tunneling.',
    image: mole,
  },
  {
    name: 'Golden Oyster Mushroom',
    category: 'Fungi',
    description:
      'Golden Oyster Mushrooms grow on decaying hardwood trees throughout the Halifax region and wider Mi’kma’ki. Their bright yellow caps make them easy to spot in mature forests. As decomposers, they help recycle nutrients back into the ecosystem. They form essential relationships that maintain woodland soil health and biodiversity.',
    image: mushroom,
  },
  {
    name: 'Birch Tree',
    category: 'Flora',
    description:
      'Birch Trees, common throughout Mi’kma’ki woodlands, are easily identified by their white peeling bark. They support numerous organisms including birds, fungi, and insects. Traditionally, Mi’kmaq communities have used birch bark for canoe building, basket weaving, and shelter construction due to its waterproof and durable qualities.',
    image: birchImage,
  },
  {
    name: 'Eastern Chipmunk',
    category: 'Fauna',
    description:
      'The Eastern Chipmunk is frequently seen in Halifax forests and is an important species for seed dispersal. Living in burrows, chipmunks help aerate soil and contribute to forest regeneration. They are active indicators of woodland health and are part of the natural biodiversity found throughout Mi’kma’ki.',
    image: chipmunk,
  },
];

const FloraFaunaFungi = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('All');

  const closeModal = () => setSelectedItem(null);

  const filteredData = filter === 'All' ? data : data.filter((item) => item.category === filter);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Page Title */}
      <h1
        className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100 cursor-pointer"
        onClick={() => speak('Explore Flora, Fauna, and Fungi')}
      >
        Explore Flora, Fauna, and Fungi
      </h1>

      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {['All', 'Flora', 'Fauna', 'Fungi'].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-bold ${
              filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
            }`}
            onMouseEnter={hoverSpeak(category)}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              speak(item.name);
              setSelectedItem(item);
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold text-white">{item.name}</h2>
              <p className="text-sm text-gray-300">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative max-w-lg w-full">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              onMouseEnter={hoverSpeak('Close')}
              onClick={closeModal}
            >
              ✕
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h2
              className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 cursor-pointer"
              onClick={() => speak(selectedItem.name)}
            >
              {selectedItem.name}
            </h2>

            <p
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
              onClick={() => speak(selectedItem.description)}
            >
              {selectedItem.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloraFaunaFungi;


