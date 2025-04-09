import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from('users')
          .select('full_name, role, email, plan')
          .eq('id', user.id)
          .maybeSingle();

        setUserInfo({ ...data, email: user.email });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-white px-6 pt-8 pb-28">
      <h2 className="text-2xl font-bold mb-6">Your Altitude Profile</h2>

      {/* Tour Pass Style Card */}
      <div className="bg-white/70 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-1">{userInfo.full_name}</h3>
        <p className="text-sm text-zinc-500 mb-1">{userInfo.role}</p>
        <p className="text-sm text-zinc-500 mb-1">{userInfo.email}</p>
        <span className="inline-block mt-3 text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          {userInfo.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center mb-8">
        <div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-zinc-500">Cities</p>
        </div>
        <div>
          <p className="text-2xl font-bold">27</p>
          <p className="text-xs text-zinc-500">Shows</p>
        </div>
        <div>
          <p className="text-2xl font-bold">9</p>
          <p className="text-xs text-zinc-500">Flights</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;
