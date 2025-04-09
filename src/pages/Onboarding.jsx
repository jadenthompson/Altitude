import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import Select from 'react-select';

const Onboarding = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const countries = countryList().getData();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user || error) {
        navigate('/auth'); // If not logged in, redirect
      } else {
        setEmail(user.email);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        country: country?.label,
        role,
        onboarding_complete: true,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      alert('Error saving info: ' + error.message);
    } else {
      navigate('/plan');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🌍 Let’s get you set up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 rounded-xl bg-gray-200 text-gray-600 placeholder-gray-500 focus:outline-none"
          />

          <div className="text-black">
            <Select
              options={countries}
              value={country}
              onChange={setCountry}
              placeholder="Select your country"
              className="rounded-xl"
            />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black"
          >
            <option value="">Select Role</option>
            <option value="artist">🎤 Artist</option>
            <option value="manager">🧠 Manager</option>
            <option value="agency">🏢 Agency</option>
            <option value="crew">🛠 Crew</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-indigo-100 underline hover:text-white"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
