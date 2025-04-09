import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import countryList from '../utils/countries'; // Make sure this file exists

const Onboarding = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('artist');
  const [artistType, setArtistType] = useState('solo');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setEmail(data.user.email);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('User not found');
      return;
    }

    const updates = {
      full_name: fullName,
      country,
      role,
      artist_type: artistType,
    };

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      navigate('/plan');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative transition duration-500 ${
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
          className="cursor-pointer w-16 h-16 mx-auto mb-6"
        />

        <h2 className="text-xl font-semibold mb-4">🌐 Let’s get you set up</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black placeholder-gray-500"
          />

          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 rounded-xl text-gray-500 bg-gray-200 cursor-not-allowed"
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black"
          >
            <option value="" disabled>Select Country</option>
            {countryList.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

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
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>

        <div className="mt-4 text-sm text-indigo-100">
          <button onClick={() => setDarkMode(!darkMode)} className="underline">
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
