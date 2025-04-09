import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import Select from 'react-select';
import countryList from 'react-select-country-list';

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
        navigate('/auth');
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
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      alert('Could not fetch user.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        country: country?.label,
        role: role,
        onboarding_complete: true,
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      alert('Error saving info: ' + error.message);
      console.error(error);
    } else {
      // ✅ Force reload so App.jsx re-fetches fresh userMeta
      window.location.href = '/plan';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome! Let’s personalize your experience</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 rounded-xl bg-gray-200 text-gray-600"
          />

          <Select
            options={countries}
            value={country}
            onChange={setCountry}
            placeholder="Select your country"
            className="text-black"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black"
          >
            <option value="">Select Role</option>
            <option value="artist">Artist</option>
            <option value="manager">Manager</option>
            <option value="agency">Agency</option>
            <option value="crew">Crew</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
