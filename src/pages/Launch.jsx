import React from 'react';
import logo from '../assets/altitude-logo.png'; // make sure this file exists
import { useNavigate } from 'react-router-dom';

const Launch = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/today'); // change to your app’s home route if different
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-white px-6 bg-gradient-to-b from-indigo-400 via-pink-300 to-orange-200">
      <img
        src={logo}
        alt="Altitude Logo"
        className="w-32 md:w-44 lg:w-52 mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-1">Altitude</h1>
      <p className="text-lg md:text-xl text-white/90 mb-10">
        Go further with altitude
      </p>
      <button
        onClick={handleStart}
        className="bg-indigo-900 px-8 py-3 rounded-full text-white font-semibold text-lg shadow-md hover:scale-105 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Launch;
