// src/pages/Launch.jsx
import React, { useEffect, useRef } from 'react';
import logo from '../assets/altitude-logo.png';
import { useNavigate } from 'react-router-dom';

const Launch = () => {
  const navigate = useNavigate();
  const logoRef = useRef(null);

  const handleStart = () => {
    navigate('/today');
  };

  useEffect(() => {
    const logo = logoRef.current;
    if (logo) {
      logo.classList.add('animate-logoFlyIn');
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b relative from-[#6a6ff0] via-[#b967d0] to-[#f4a261]">
      {/* Animated gradient background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] opacity-80 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white px-4 text-center">
        <img
          ref={logoRef}
          src={logo}
          alt="Altitude Logo"
          className="w-40 md:w-52 mb-8"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Altitude</h1>
        <p className="text-lg md:text-2xl mb-10">Go further with altitude</p>
        <button
          onClick={handleStart}
          className="bg-[#2d2d85] hover:bg-[#1f1f70] text-white font-semibold text-lg md:text-xl px-8 py-4 rounded-full transition duration-300 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Launch;
