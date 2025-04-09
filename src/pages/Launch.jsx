import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Launch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col items-center justify-center text-white px-4 relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 opacity-70 blur-3xl z-0" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.img
          src="/assets/altitude-logo.png"
          alt="Altitude Logo"
          className="w-20 h-20 mx-auto mb-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Supercharged logistics for musicians on the move.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          A travel logistics app — built for artists, by artists.
        </motion.p>

        <motion.button
          onClick={() => navigate('/auth')}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Launch;
