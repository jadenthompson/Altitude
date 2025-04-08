import React, { useEffect, useRef } from 'react';
import logo from '../assets/altitude-logo-white.png'; // white version
import cloudSvg from '../assets/clouds.svg'; // make sure this exists
import ambientAudio from '../assets/ambient-loop.mp3'; // make sure this exists
import { useNavigate } from 'react-router-dom';

const Launch = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    };

    playAudio();
  }, []);

  const handleStart = () => {
    navigate('/today');
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] relative animate-gradient">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] opacity-90 animate-backgroundBlur z-0" />

      {/* Cloud Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 animate-clouds z-0"
        style={{ backgroundImage: `url(${cloudSvg})` }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-white text-center px-4">
        <img
          src={logo}
          alt="Altitude Logo"
          className="w-32 md:w-44 lg:w-56 mb-6 animate-logoFlyIn"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Altitude</h1>
        <p className="text-lg md:text-2xl text-white/90 mb-10">
          Go further with altitude
        </p>
        <button
          onClick={handleStart}
          className="bg-indigo-900 px-8 py-3 rounded-full text-white font-semibold text-lg shadow-md hover:scale-105 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Launch;
