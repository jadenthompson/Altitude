import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [fullName, setFullName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('User not found');
      return;
    }

    // Update `users` table
    await supabase
      .from('users')
      .update({ full_name: fullName })
      .eq('id', user.id);

    // Insert into `artists` table
    await supabase.from('artists').insert({
      user_id: user.id,
      name: artistName,
      city: homeCity,
      timezone: timezone,
    });

    setLoading(false);
    navigate('/today');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-xl space-y-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center">Let's set up your profile</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 rounded-xl text-black placeholder-gray-500"
        />

        <input
          type="text"
          placeholder="Artist Name"
          value={artistName}
          required
          onChange={(e) => setArtistName(e.target.value)}
          className="w-full p-3 rounded-xl text-black placeholder-gray-500"
        />

        <input
          type="text"
          placeholder="Home City"
          value={homeCity}
          required
          onChange={(e) => setHomeCity(e.target.value)}
          className="w-full p-3 rounded-xl text-black placeholder-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? 'Saving...' : 'Finish Setup'}
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
