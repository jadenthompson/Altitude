import React from 'react';
import FlightWidget from '../components/widgets/FlightWidget';
import HotelWidget from '../components/widgets/HotelWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import CityPhotoWidget from '../components/widgets/CityPhotoWidget';
import CalendarSummaryWidget from '../components/widgets/CalendarSummaryWidget';
import BottomNav from '../components/BottomNav';

const Today = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white pb-28 px-4 pt-6">
      <h2 className="text-2xl font-semibold mb-6">Welcome to Altitude</h2>

      <div className="space-y-6">
        <div className="rounded-2xl bg-white/5 backdrop-blur-md p-4 shadow-lg">
          <FlightWidget />
        </div>
        <div className="rounded-2xl bg-white/5 backdrop-blur-md p-4 shadow-lg">
          <HotelWidget />
        </div>
        <div className="rounded-2xl bg-white/5 backdrop-blur-md p-4 shadow-lg">
          <WeatherWidget />
        </div>

        {/* Only show City Photo on mobile */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-md p-4 shadow-lg md:hidden">
          <CityPhotoWidget />
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-md p-4 shadow-lg">
          <CalendarSummaryWidget />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Today;