// src/pages/Today.jsx
import React from 'react';
import FlightWidget from '../components/widgets/FlightWidget';
import HotelWidget from '../components/widgets/HotelWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import CityPhotoWidget from '../components/widgets/CityPhotoWidget';
import CalendarSummaryWidget from '../components/widgets/CalendarSummaryWidget';
import BottomNav from '../components/BottomNav';

const Today = () => {
  return (
    <div className="min-h-screen px-4 pt-6 pb-28 text-zinc-900 dark:text-white bg-gradient-to-br from-black via-zinc-900 to-zinc-950">
      <h2 className="text-2xl font-bold mb-6">Welcome to Altitude</h2>

      <div className="space-y-6">
        <FlightWidget />
        <HotelWidget />
        <WeatherWidget />
        <CityPhotoWidget />
        <CalendarSummaryWidget />
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Today;
