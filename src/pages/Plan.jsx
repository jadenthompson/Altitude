import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Plan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col items-center justify-center text-white px-4 relative">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 opacity-70 blur-2xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <motion.img
          src="/assets/altitude-logo.png"
          alt="Altitude Logo"
          className="w-16 h-16 mx-auto mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <h1 className="text-4xl font-extrabold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-white/80 mb-8">
          Unlock premium features and supercharge your tour logistics.
        </p>

        {/* Placeholder buttons */}
        <div className="space-y-4">
          <button className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-xl shadow hover:bg-indigo-100 transition">
            Free Plan – Try it out
          </button>
          <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl shadow hover:bg-yellow-300 transition">
            Pro Plan – $12/month
          </button>
        </div>

        <button
          onClick={() => navigate('/today')}
          className="mt-6 text-sm text-white underline hover:text-indigo-100"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Plan;
