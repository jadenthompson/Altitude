// src/components/widgets/CalendarSummaryWidget.jsx
import React from 'react';

const CalendarSummaryWidget = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow text-gray-800">
      <h3 className="font-semibold text-lg mb-2">📅 Today’s Events</h3>
      <ul className="list-disc list-inside">
        <li>4PM Soundcheck · The Wiltern</li>
        <li>8PM Show · Main Stage</li>
      </ul>
    </div>
  );
};

export default CalendarSummaryWidget;
