// src/components/CalendarSummaryWidget.jsx
import React, { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import dayjs from 'dayjs';

const CalendarSummaryWidget = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(3);

      if (error) console.error('Event fetch error:', error.message);
      else setEvents(data || []);
    };

    fetchEvents();
  }, []);

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
      <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
        <CalendarDays className="w-5 h-5" /> Upcoming Events
      </h2>
      {events.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No upcoming events.</p>
      ) : (
        <ul className="space-y-1">
          {events.map((event) => (
            <li key={event.id} className="text-sm text-gray-700 dark:text-gray-300">
              {dayjs(event.start_time).format('ddd, MMM D')} — {event.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarSummaryWidget;
