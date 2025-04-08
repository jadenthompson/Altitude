import React from 'react';

const CalendarSummaryWidget = () => (
  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-md animate-fadeIn">
    <h3 className="text-xl font-semibold mb-2">📅 Today’s Events</h3>
    <p className="text-sm text-white/90">No events today.</p>
  </div>
);

export default CalendarSummaryWidget;