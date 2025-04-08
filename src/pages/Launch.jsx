import React from 'react';
import { useNavigate } from 'react-router-dom';
import whiteLogo from '../assets/altitude-logo-white.png'; // replace with your new white logo filename

const Launch = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/today'); // Update this path if needed
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] flex items-center justify-center px-6 text-white relative">
      {/* Floating background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] opacity-80 animate-gradient z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <img
          src={whiteLogo}
          alt="Altitude Logo"
          className="w-32 md:w-40 mb-8 drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-3">Altitude</h1>
        <p className="text-lg md:text-2xl mb-10">Go further with altitude</p>
        <button
          onClick={handleStart}
          className="bg-[#2d2d85] hover:bg-[#1f1f70] px-8 py-4 rounded-full font-semibold text-lg md:text-xl shadow-lg transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Launch;
