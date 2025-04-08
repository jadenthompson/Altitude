import React from 'react';

const WeatherWidget = () => (
  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-md animate-fadeIn">
    <h3 className="text-xl font-semibold mb-2">🌤️ Weather</h3>
    <p className="text-sm text-white/90">20°C, Partly Cloudy</p>
  </div>
);

export default WeatherWidget;