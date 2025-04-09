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
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-zinc-900 dark:text-white pb-28 px-4 pt-6">
      <h2 className="text-2xl font-semibold mb-6">Welcome to TourLife</h2>

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
