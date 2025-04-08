import React from 'react';

const FlightWidget = () => (
  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-md animate-fadeIn">
    <h3 className="text-xl font-semibold mb-2">✈️ Flight Info</h3>
    <p className="text-sm text-white/90">No upcoming flights.</p>
  </div>
);

export default FlightWidget;