import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('artist');
  const [artistType, setArtistType] = useState('solo');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('User not found');

    const updates = {
      id: user.id,
      email,
      full_name: fullName,
      country,
      role,
      artist_type: role === 'artist' ? artistType : null,
      has_onboarded: true,
    };

    const { error } = await supabase.from('users').upsert(updates, { onConflict: ['id'] });
    setLoading(false);

    if (error) {
      alert('Error saving your info: ' + error.message);
    } else {
      navigate('/plan');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative transition duration-500 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white'
    }`}>
      {/* 🔙 Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-white text-sm underline hover:text-indigo-200 z-20"
      >
        ← Back to Home
      </button>

      <div className="absolute inset-0 opacity-60 blur-3xl z-0" />

      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-center">
        <motion.img
          src="/assets/altitude-logo.png"
          alt="Altitude Logo"
          onClick={() => navigate('/')}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="cursor-pointer w-16 h-16 mx-auto mb-6"
        />

        <h2 className="text-2xl font-bold mb-4">🧭 Let’s get you set up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 rounded-xl text-gray-500 bg-gray-100 cursor-not-allowed"
          />

          <input
            type="text"
            placeholder="Country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-xl text-black"
          >
            <option value="artist">🎤 Artist</option>
            <option value="manager">🧑‍💼 Manager</option>
            <option value="agency">🏢 Agency</option>
            <option value="crew">🧑‍🚀 Crew</option>
          </select>

          {role === 'artist' && (
            <select
              value={artistType}
              onChange={(e) => setArtistType(e.target.value)}
              className="w-full p-3 rounded-xl text-black"
            >
              <option value="solo">Solo Artist</option>
              <option value="band">Band / Group</option>
            </select>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs text-indigo-100 underline hover:text-white"
          >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
