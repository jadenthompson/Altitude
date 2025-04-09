import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('artist');
  const [subRole, setSubRole] = useState('solo');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email);
      } else {
        alert('User not found');
        navigate('/auth');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('User not found');
      return;
    }

    const { error } = await supabase.from('users').update({
      full_name: fullName,
      country,
      role,
      sub_role: subRole,
    }).eq('id', user.id);

    setLoading(false);

    if (error) alert(error.message);
    else navigate('/plan');
  };

  const countryList = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
    "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina",
    "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bermuda", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
    "Canada", "Cape Verde", "Cayman Islands", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
    "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

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

        <h2 className="text-2xl font-bold mb-6">🌍 Let's get you set up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-3 rounded-xl text-black placeholder-gray-500 focus:outline-none"
          />

          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 rounded-xl border text-black"
          >
            <option value="">Select your country</option>
            {countryList.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-xl border text-black"
          >
            <option value="artist">🎤 Artist</option>
            <option value="manager">🎧 Manager</option>
            <option value="agency">🏢 Agency</option>
            <option value="crew">🧑‍🚀 Crew</option>
          </select>

          <select
            value={subRole}
            onChange={(e) => setSubRole(e.target.value)}
            className="w-full p-3 rounded-xl border text-black"
          >
            <option value="solo">Solo Artist</option>
            <option value="band">Part of a Band</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-800 text-white font-semibold py-3 rounded-xl hover:bg-indigo-900 transition"
            disabled={loading}
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
