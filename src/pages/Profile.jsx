import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import BottomNav from '../components/BottomNav';
import QRCode from 'react-qr-code';
import { Share2, MessageCircleHeart, BadgeCheck, Plane, CalendarCheck, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [tempUnit, setTempUnit] = useState('C');
  const [icalUrl, setIcalUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [frequentFlyers, setFrequentFlyers] = useState([]);
  const [newAirline, setNewAirline] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [totalShows, setTotalShows] = useState(0);
const [totalCities, setTotalCities] = useState(0);  
const [totalFlights, setTotalFlights] = useState(0);
const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

useEffect(() => {
  localStorage.setItem('theme', theme);
  const root = window.document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}, [theme]);



  
  const handleAskAssistant = async () => {
    if (!assistantInput.trim()) return;
    const res = await fetch('/askAssistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: assistantInput }),
    });
    const { response } = await res.json();
    setAssistantResponse(response);
  };
  
  const handleQuickAsk = (text) => {
    setAssistantInput(text);
    handleAskAssistant();
  };
  
  

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from('users')
          .select('full_name, role, email, plan, public_profile, temp_unit, ical_url')
          .eq('id', user.id)
          .maybeSingle();

        const { data: flyers } = await supabase
          .from('user_frequent_flyers')
          .select('*')
          .eq('user_id', user.id);

        setUserInfo({ ...data, email: user.email });
        setIsPublic(data?.public_profile || false);
        setTempUnit(data?.temp_unit || 'C');
        setIcalUrl(data?.ical_url || '');
        setFullName(data?.full_name || '');
        setFrequentFlyers(flyers || []);

        const { data: events } = await supabase
  .from('events')
  .select('city')
  .eq('user_id', user.id);

if (events) {
  setTotalShows(events.length);
  const uniqueCities = [...new Set(events.map((e) => e.city))];
  setTotalCities(uniqueCities.length);
}

const { data: flights } = await supabase
  .from('travel_segments')
  .select('id')
  .eq('user_id', user.id);

if (flights) {
  setTotalFlights(flights.length);
}
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  const handlePublicToggle = async () => {
    const newStatus = !isPublic;
    setIsPublic(newStatus);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from('users').update({ public_profile: newStatus }).eq('id', user.id);
  };

  const handleTempToggle = async () => {
    const newUnit = tempUnit === 'C' ? 'F' : 'C';
    setTempUnit(newUnit);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from('users').update({ temp_unit: newUnit }).eq('id', user.id);
  };

  const handleNameUpdate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from('users').update({ full_name: fullName }).eq('id', user.id);
  };

  const handleCalendarToggle = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newUrl = icalUrl
      ? ''
      : `https://yourapp.com/api/ical/${user.id}-${Math.random().toString(36).substring(2, 8)}`;

    setIcalUrl(newUrl);
    await supabase.from('users').update({ ical_url: newUrl }).eq('id', user.id);
  };

  const addFrequentFlyer = async () => {
    if (!newAirline || !newNumber) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('user_frequent_flyers')
      .insert({ user_id: user.id, airline: newAirline, number: newNumber })
      .select('*');
    setFrequentFlyers([...frequentFlyers, data[0]]);
    setNewAirline('');
    setNewNumber('');
  };

  const publicURL = `https://yourapp.com/u/${userInfo?.email?.split('@')[0] || 'user'}`;
  const initials = userInfo.full_name
    ? userInfo.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-slate-200 dark:from-zinc-900 dark:to-zinc-800 px-6 py-8 text-zinc-900 dark:text-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-extrabold tracking-tight mb-4 text-center"
      >
        Altitude Profile & Settings
      </motion.h2>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/60 dark:bg-zinc-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 text-center"
      >
        <div className="w-16 h-16 mx-auto bg-indigo-600 text-white text-xl font-bold rounded-full flex items-center justify-center shadow-md mb-4">
          {initials}
        </div>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={handleNameUpdate}
          placeholder="Your Name"
          className="w-full text-center font-semibold text-lg bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none mb-1"
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{userInfo.email}</p>
        <span className="inline-block bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4">
          {userInfo.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
        </span>

        <label className="flex items-center justify-center gap-2 text-sm mb-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={handlePublicToggle}
            className="accent-indigo-600"
          />
          <span>Make my tour pass public</span>
        </label>

        <div className="flex items-center justify-between">
  <span className="text-sm">Dark Mode</span>
  <button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="px-3 py-1 bg-zinc-700 text-white text-sm rounded-full"
  >
    {theme === 'dark' ? 'On' : 'Off'}
  </button>
</div>


        <AnimatePresence>
          {isPublic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 mb-4"
            >
              <div className="bg-white dark:bg-zinc-700 p-2 inline-block rounded-lg shadow">
                <QRCode value={publicURL} size={128} />
              </div>
              <p className="text-xs break-all text-zinc-500">{publicURL}</p>
              <button
                onClick={() => navigator.share?.({ url: publicURL })}
                className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <Share2 className="w-4 h-4" /> Share Link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-md mt-10 space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm">Temperature Unit</span>
          <button
            onClick={handleTempToggle}
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full"
          >
            {tempUnit === 'C' ? '°C' : '°F'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Calendar Sync</span>
          <button
            onClick={handleCalendarToggle}
            className="px-3 py-1 bg-zinc-600 text-white text-sm rounded-full"
          >
            {icalUrl ? 'On' : 'Off'}
          </button>
        </div>

        {icalUrl && <p className="text-xs text-zinc-400 break-all">{icalUrl}</p>}
      </motion.div>

      {/* Frequent Flyers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md mt-10"
      >
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Plane size={18} /> Frequent Flyer Numbers
        </h3>
        {frequentFlyers.map((ff, i) => (
          <p key={i} className="text-sm text-zinc-600 dark:text-zinc-300">
            {ff.airline}: {ff.number}
          </p>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            value={newAirline}
            onChange={(e) => setNewAirline(e.target.value)}
            placeholder="Airline"
            className="w-1/2 text-sm px-2 py-1 border rounded"
          />
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="Number"
            className="w-1/2 text-sm px-2 py-1 border rounded"
          />
        </div>
        <button
          onClick={addFrequentFlyer}
          className="mt-2 w-full bg-indigo-600 text-white text-sm py-2 rounded-lg"
        >
          Add Frequent Flyer
        </button>
      </motion.div>

      {/* Badges + Year Summary */}
      <div className="w-full max-w-md mt-10 space-y-6 text-sm">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold flex gap-2 items-center">
            <BadgeCheck size={18} /> 🧳 Badges Earned
          </h3>
          {totalShows >= 50 && <p>🏆 50 Shows Club</p>}
{totalCities >= 10 && <p>🌍 10 Cities Badge</p>}
{(totalShows < 50 && totalCities < 10) && <p>🔓 No badges unlocked yet</p>}

        </div>
        <div>
          <h3 className="font-bold flex gap-2 items-center">
            <CalendarCheck size={18} /> 📊 Year in Review
          </h3>
          <p>{totalShows} shows, {totalCities} cities, {totalFlights} flights</p>
        </div>
        <div>
          <h3 className="font-bold flex gap-2 items-center">
            <Star size={18} /> 📷 Shareable Tour Card
          </h3>
          <button className="mt-1 w-full bg-indigo-600 text-white py-2 rounded-lg">
            Generate Tour Card
          </button>
        </div>
        <div>
          <h3 className="font-bold flex gap-2 items-center">
            <MessageCircleHeart size={18} /> 💬 TourLife Assistant
          </h3>
          <button className="mt-1 w-full bg-zinc-700 text-white py-2 rounded-lg">
            Ask Assistant
          </button>
        </div>
      </div>

      {/* AI Assistant */}
<div className="w-full max-w-md mt-10 space-y-4">
  <h3 className="font-bold flex gap-2 items-center">
    <MessageCircleHeart size={18} /> 💬 TourLife Assistant
  </h3>
  <div className="flex gap-2">
    <button
      onClick={() => handleQuickAsk('What time is my next travel?')}
      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs"
    >
      Next Travel
    </button>
    <button
      onClick={() => handleQuickAsk('Give me some flight tips')}
      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs"
    >
      Flight Tips
    </button>
  </div>
  <textarea
    rows="2"
    className="w-full p-2 border rounded text-sm text-black"
    placeholder="Ask something..."
    value={assistantInput}
    onChange={(e) => setAssistantInput(e.target.value)}
  />
  <button
    onClick={handleAskAssistant}
    className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
  >
    Ask Assistant
  </button>
  {assistantResponse && (
    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 bg-white dark:bg-zinc-700 p-2 rounded-lg">
      {assistantResponse}
    </p>
  )}
</div>


      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={handleSignOut}
        className="mt-12 px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
      >
        Sign Out
      </motion.button>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;
