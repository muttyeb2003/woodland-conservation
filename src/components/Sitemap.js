// Authors:
// Bhanu Prakash(A00468530) - Responsible for handling the 'Get Directions' functionality.
// Cole Turner (A00469026) - Responsible for map interction, UI design, TailWind CSS.
// Purpose: This file represents a site map component for the conservation area. 

import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import rewildingBirch from '../assets/rewildingBirch222.jpg';
import trailHead from '../assets/hiking.png';
import farm from '../assets/farm.png';
import well from '../assets/water-well.png';
import sitting from '../assets/sitting.png';
import birch from '../assets/birch.png';

const SiteMap = () => {
  const bounds = [
    [0, 0],
    [546, 648],
  ];

  const [userLocation, setUserLocation] = useState(null);

  const defaultUserLocation = { lat: 44.623917, lng: -63.920472 };

  const [voices, setVoices] = useState([]);

  // Load voices once
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ⭐ Soft-spoken TTS function (stable with useCallback)
  const speakSoftly = useCallback(
    (text) => {
      const utterance = new SpeechSynthesisUtterance(text);

      const selectedVoice = voices.find(
        (v) => v.name.includes("Female") && v.lang === "en-US"
      );
      if (selectedVoice) utterance.voice = selectedVoice;

      utterance.pitch = 1.4;
      utterance.rate = 0.9;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  // ⭐ Add click-to-speak for *all* clickable items on this page
  useEffect(() => {
    const handleClick = (e) => {
      const text = e.target.innerText?.trim();

      if (!text || text.length < 3 || text.length > 250) return;

      speakSoftly(text);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [speakSoftly]);

  // POI list
  const pointsOfInterest = [
    { id: 1, name: 'Trailhead', position: [540, 40], icon: trailHead, offset: [45, 95], googlePosition: { lat: 44.625028, lng: -63.921417 } },
    { id: 2, name: 'Farmhouse Foundation', position: [430, 200], icon: farm, offset: [0,0], googlePosition: { lat: 44.625833, lng: -63.920972 } },
    { id: 3, name: 'Well', position: [485, 40], icon: well, offset: [50, 70], googlePosition: { lat: 44.624022, lng: -63.920028 } },
    { id: 4, name: 'Sitting Area', position: [360, 240], icon: sitting, offset: [0,0], googlePosition: { lat: 44.625028, lng: -63.920417 } },
    { id: 5, name: 'Coastal Yellow Birch', position: [235, 465], icon: birch, offset: [0,0], googlePosition: { lat: 44.624000, lng: -63.920056 } }
  ];

  // Get directions
  const handleGetDirectionsClick = (poi) => {
    const destination = poi.googlePosition;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${defaultUserLocation.lat},${defaultUserLocation.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving`;

    window.open(googleMapsUrl, '_blank');
  };

  // Fake location
  const handleUserLocation = () => {
    setUserLocation([250, 250]);
  };

  return (
    <div className="p-8 bg-lime-800 dark:bg-darkBlue text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-sans mb-4 text-white dark:text-gray-300">
        Woodland Conservation Area
      </h1>

      <button
        onClick={handleUserLocation}
        className="mb-4 px-4 py-2 bg-orange-900 text-white rounded hover:bg-orange-800"
      >
        YOU ARE HERE
      </button>

      <MapContainer
        bounds={bounds}
        style={{ height: '545px', width: '100%', maxWidth: '630px' }}
        crs={L.CRS.Simple}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        maxBounds={bounds}
      >
        <ImageOverlay url={rewildingBirch} bounds={bounds} />

        {pointsOfInterest.map((poi) => (
          <Marker key={poi.id} position={poi.position} icon={L.icon({ iconUrl: poi.icon, iconSize: [48, 48], iconAnchor: [24, 24], popupAnchor: [0, -10] })}>
            <Popup direction="bottom" autoPan={false} offset={poi.offset}>
              <strong>{poi.name}</strong>
              <br />
              <button
                onClick={() => handleGetDirectionsClick(poi)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Get Directions
              </button>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({ className: 'bg-red-600 p-2 rounded-full text-white', html: '🧍' })}
          >
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="mt-8 text-center text-white dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
        <p>Click any marker and use "Get Directions" to open Google Maps.</p>
        <p className="mt-4">Click “YOU ARE HERE” to simulate your location.</p>
      </div>
    </div>
  );
};

export default SiteMap;

