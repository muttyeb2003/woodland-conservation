import React, { useEffect, useState } from "react";

// Your Points of Interest (POIs)
const pointsOfInterest = [
  {
    id: 1,
    name: "Old Oak",
    lat: 43.5001,
    lng: -80.5201,
    audioText: "This is the Old Oak tree, planted over 150 years ago."
  },
  {
    id: 2,
    name: "Sugar Maple",
    lat: 43.5004,
    lng: -80.5207,
    audioText: "This Sugar Maple is known for its beautiful fall colors."
  }
];

// Utility: Haversine distance (returns meters)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const TalkingTrees = () => {
  const [userPos, setUserPos] = useState(null);
  const [nearestPOI, setNearestPOI] = useState(null);

  // Requirement 1:
  // “The software shall calculate the distance of the user from 
  // each of the points of interest every 15 seconds.”
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Check distances whenever userPos updates
  useEffect(() => {
    if (!userPos) return;

    let closest = null;

    for (const poi of pointsOfInterest) {
      const dist = getDistance(userPos.lat, userPos.lng, poi.lat, poi.lng);

      // Requirement 2:
      // The 3-meter detection radius
      if (dist <= 3) {
        if (!closest || dist < closest.distance) {
          closest = { ...poi, distance: dist };
        }
      }
    }

    // Requirement 4:
    // “When within 3 meters of more than one point, the software decides 
    // which audio will be played.” → we choose the closest.
    setNearestPOI(closest);
  }, [userPos]);

  // Requirement 3:
  // Clicking button plays text as audio
  const playAudio = () => {
    if (!nearestPOI) return;
    const utter = new SpeechSynthesisUtterance(nearestPOI.audioText);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Talking Trees</h2>

      {/* Requirement 5:
          Button disappears when user is not within 3 meters */}
      {nearestPOI ? (
        <button
          onClick={playAudio}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Play Audio ({nearestPOI.name})
        </button>
      ) : (
        <p>You are not within 3 meters of any point of interest.</p>
      )}
    </div>
  );
};

export default TalkingTrees;
