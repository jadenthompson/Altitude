// src/components/widgets/FlightWidget.jsx
import React from 'react';

const FlightWidget = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow text-gray-800">
      <h3 className="font-semibold text-lg mb-2">✈️ Flight Info</h3>
      <p>No flights today. Enjoy the downtime!</p>
    </div>
  );
};

export default FlightWidget;
