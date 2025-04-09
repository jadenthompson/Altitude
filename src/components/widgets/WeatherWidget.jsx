// src/components/widgets/WeatherWidget.jsx
import React from 'react';

const WeatherWidget = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow text-gray-800">
      <h3 className="font-semibold text-lg mb-2">🌤️ Weather</h3>
      <p>72°F · Sunny · Los Angeles</p>
    </div>
  );
};

export default WeatherWidget;
