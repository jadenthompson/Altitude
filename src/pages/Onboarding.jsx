import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "Spain", "Italy", "Netherlands", "Sweden", "Brazil", "Japan", "India", "South Africa",
  "Mexico", "New Zealand", "Norway", "Ireland", "Portugal", "Switzerland", "Argentina",
  "Belgium", "Denmark", "Finland", "Greece", "Poland", "South Korea", "Turkey", "UAE", "Other"
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('artist');
  const [artistType, setArtistType] = useState('solo');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        alert('User not found');
        navigate('/auth');
        return;
      }
      setEmail(data.user.email);
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        country,
        role,
        artist_type: role === 'artist' ? artistType : null,
      })
      .eq('email', email);

    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      navigate('/plan');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 transition duration-500 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white'
    }`}>
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
          className="cursor-pointer w-14 h-14 mx-auto mb-4"
        />

        <h2 className="text-xl font-semibold mb-6">🌍 Let’s get you set up</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Hidden Email */}
          <input type="hidden" value={email} />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black focus:outline-none"
          >
            <option value="" disabled>Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black focus:outline-none"
          >
            <option value="agency">Agency</option>
            <option value="manager">Manager</option>
            <option value="artist">Artist</option>
            <option value="crew">Crew</option>
          </select>

          {role === 'artist' && (
            <select
              value={artistType}
              onChange={(e) => setArtistType(e.target.value)}
              className="w-full p-3 rounded-xl text-black focus:outline-none"
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
