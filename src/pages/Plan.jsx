import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (planType) => {
    setSelectedPlan(planType);
  };

  const handleContinue = async () => {
    setLoading(true);
  
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (!user || userError) {
      alert('Error fetching user.');
      console.error(userError);
      setLoading(false);
      return;
    }
  
    const { error: updateError } = await supabase
      .from('users')
      .update({ plan: selectedPlan })
      .eq('id', user.id);
  
    if (updateError) {
      alert('Error saving plan: ' + updateError.message);
      console.error(updateError);
      setLoading(false);
      return;
    }
  
    const { data: updatedUser, error: fetchError } = await supabase
  .from('users')
  .select('plan')
  .eq('id', user.id)
  .maybeSingle();

console.log('Fetched plan:', updatedUser, 'Fetch error:', fetchError);

  
    if (fetchError) {
      console.error('Fetch error:', fetchError.message);
      alert('Error verifying plan update.');
      setLoading(false);
      return;
    }
  
    if (updatedUser?.plan) {
      console.log('✅ Plan updated:', updatedUser.plan);
      navigate('/today');
    } else {
      console.warn('⚠️ Plan still null after update:', updatedUser);
      alert('Plan was not saved. Please try again.');
    }
  
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 to-pink-500 text-white px-4">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Plan</h2>

        <div className="space-y-4 mb-6">
          <div
            onClick={() => handleSelect('free')}
            className={`cursor-pointer p-4 rounded-lg border ${
              selectedPlan === 'free' ? 'bg-white/20 border-white' : 'border-white/50'
            }`}
          >
            <h3 className="text-lg font-semibold">Free Plan</h3>
            <p className="text-sm">Basic access to logistics tools. Ideal for indie artists & small teams.</p>
          </div>

          <div
            onClick={() => handleSelect('pro')}
            className={`cursor-pointer p-4 rounded-lg border ${
              selectedPlan === 'pro' ? 'bg-white/20 border-white' : 'border-white/50'
            }`}
          >
            <h3 className="text-lg font-semibold">Pro Plan</h3>
            <p className="text-sm">Unlock full features, flight tracking, team tools & premium support.</p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`w-full py-3 rounded text-indigo-700 font-semibold bg-white hover:bg-indigo-100 transition ${
            !selectedPlan && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Plan;
