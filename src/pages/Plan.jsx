import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedPlan) return alert('Please select a plan');

    setLoading(true);

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('User not found.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ plan: selectedPlan })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      alert('Error saving plan: ' + error.message);
    } else {
      navigate('/today');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 flex flex-col items-center justify-center px-4 text-white">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl text-center">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Choose Your Plan
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => setSelectedPlan('free')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition ${
              selectedPlan === 'free'
                ? 'border-white bg-white/10'
                : 'border-white/20 hover:border-white'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
            <p className="text-white/70 text-sm">
              Basic access to logistics tools. Ideal for indie artists & small teams.
            </p>
          </div>

          <div
            onClick={() => setSelectedPlan('pro')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition ${
              selectedPlan === 'pro'
                ? 'border-white bg-white/10'
                : 'border-white/20 hover:border-white'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
            <p className="text-white/70 text-sm">
              Unlock full features, flight tracking, team tools & premium support.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-indigo-800 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Plan;
