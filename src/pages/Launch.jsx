import React from 'react';
import logo from '../assets/altitude-logo.png'; // make sure this file exists
import { useNavigate } from 'react-router-dom';

const Launch = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/today'); // or wherever you want to go after clicking
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b relative from-[#6a6ff0] via-[#b967d0] to-[#f4a261] animate-gradient">
      {/* Animated gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] opacity-80 animate-backgroundBlur z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <img
          src={logo}
          alt="Altitude Logo"
          className="w-32 md:w-40 mb-8"
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

      {/* Soft cloud overlay */}
      <div className="absolute inset-0 bg-[url('/clouds.svg')] bg-cover bg-center opacity-10 animate-clouds z-0" />
    </div>
  );
};

export default Launch;
