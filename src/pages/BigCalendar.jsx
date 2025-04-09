import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { supabase } from '../utils/supabaseClient';
import { Dialog } from '@headlessui/react';
import { Plus, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';

const localizer = momentLocalizer(moment);

const eventTypes = {
  gig: '🪩',
  press: '📸',
  hotel: '🏨',
  travel: '✈️',
  crew: '🧑‍🚀',
};

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({
    title: '',
    type: 'gig',
    start: '',
    end: '',
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (!error && data) {
        const mapped = data.map((evt) => ({
          ...evt,
          title: `${eventTypes[evt.type] || ''} ${evt.title || 'Untitled Event'}`,
          start: new Date(evt.start_time),
          end: evt.end_time ? new Date(evt.end_time) : new Date(evt.start_time),
        }));
        setEvents(mapped);
      }
    };
    fetchEvents();
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, type, start, end } = form;
    const { error } = await supabase.from('events').insert({
      title,
      type,
      start_time: new Date(start),
      end_time: new Date(end),
    });
    if (!error) {
      setShowModal(false);
      setForm({ title: '', type: 'gig', start: '', end: '' });
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 flex flex-col p-4 pb-28">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
        <CalendarDays className="inline-block w-8 h-8 mr-2 text-indigo-600" />
        Altitude Calendar
      </h1>

      <div className="flex-1 overflow-auto max-h-[70vh]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventClick}
          views={['month', 'week', 'day', 'agenda']}
          popup
          className="rounded-xl shadow-md bg-white p-2"
        />
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Add Event Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Add New Event</Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Event Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded-lg border"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full p-3 rounded-lg border"
              >
                <option value="gig">🪩 Gig</option>
                <option value="press">📸 Press</option>
                <option value="hotel">🏨 Hotel</option>
                <option value="travel">✈️ Travel</option>
                <option value="crew">🧑‍🚀 Crew</option>
              </select>
              <input
                type="datetime-local"
                value={form.start}
                required
                onChange={(e) => setForm({ ...form, start: e.target.value })}
                className="w-full p-3 rounded-lg border"
              />
              <input
                type="datetime-local"
                value={form.end}
                required
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                className="w-full p-3 rounded-lg border"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
              >
                Save Event
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View Event Details Modal */}
      <Dialog open={!!selectedEvent} onClose={closeEventModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">
              {selectedEvent?.title || 'Event'}
            </Dialog.Title>
            <div className="space-y-2 text-gray-700">
              <p><strong>Start:</strong> {selectedEvent?.start?.toLocaleString()}</p>
              <p><strong>End:</strong> {selectedEvent?.end?.toLocaleString()}</p>
              <p><strong>Type:</strong> {selectedEvent?.type || 'Not specified'}</p>
            </div>
            <button
              onClick={closeEventModal}
              className="mt-6 w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default BigCalendar;
