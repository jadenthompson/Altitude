import React, { useEffect, useState } from 'react';
import FlightWidget from '../components/FlightWidget';
import HotelWidget from '../components/HotelWidget';
import WeatherWidget from '../components/WeatherWidget';
import CalendarSummaryWidget from '../components/CalendarSummaryWidget';
import BottomNav from '../components/BottomNav';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Today = () => {
  const [greeting, setGreeting] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user name:', error.message);
        return;
      }

      if (data?.full_name) {
        const name = data.full_name.split(' ')[0];
        setFirstName(name);
      }
    };

    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    loadUser();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-100 to-slate-200 p-4 pb-28">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {greeting}{firstName ? `, ${firstName}` : ''}.
      </h2>

      <div className="space-y-6">
        <FlightWidget />
        <HotelWidget />
        <WeatherWidget />
        <CalendarSummaryWidget />
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Today;
