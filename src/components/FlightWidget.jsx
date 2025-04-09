// FlightWidget.jsx
import React from 'react';

const FlightWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">🛫 Flight Info</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">Your next flight will appear here.</p>
    </div>
  );
};

export default FlightWidget;