import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/altitude-logo.png'; // make sure this file is white and exists here

const Launch = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleStart = () => {
    navigate('/today');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#6a6ff0] via-[#b967d0] to-[#f4a261] overflow-hidden flex items-center justify-center">
      <div className="text-white text-center px-6 relative z-10">
        <img
          src={logo}
          alt="Altitude Logo"
          className={`w-32 md:w-44 mx-auto mb-6 transition-all duration-1000 ease-out transform ${
            animate ? 'translate-y-0 opacity-100 scale-110' : '-translate-y-20 opacity-0 scale-50'
          }`}
        />
        <h1
          className={`text-4xl md:text-6xl font-bold transition-opacity duration-1000 delay-300 ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Altitude
        </h1>
        <p
          className={`text-lg md:text-2xl mt-2 mb-10 transition-opacity duration-1000 delay-500 ${
            animate ? 'opacity-90' : 'opacity-0'
          }`}
        >
          Go further with altitude
        </p>
        <button
          onClick={handleStart}
          className={`bg-[#2d2d85] hover:bg-[#1f1f70] text-white font-semibold text-lg md:text-xl px-8 py-4 rounded-full transition duration-300 shadow-lg ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Launch;
