import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { supabase } from '../utils/supabaseClient';
import { Dialog } from '@headlessui/react';
import { Plus, Pencil, Trash } from 'lucide-react';
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
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form, setForm] = useState({
    title: '',
    type: 'gig',
    start: '',
    end: '',
  });

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (!error && data) {
      const mapped = data.map((evt) => ({
        ...evt,
        title: `${eventTypes[evt.type] || ''} ${evt.title || 'Untitled Event'}`,
        start: new Date(evt.start_time),
        end: new Date(evt.end_time || evt.start_time),
      }));
      setEvents(mapped);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [showModal]);

  const handleSelectEvent = (event) => {
    setEditMode(true);
    setSelectedEvent(event);
    setForm({
      title: event.title.replace(eventTypes[event.type] || '', '').trim(),
      type: event.type,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, type, start, end } = form;

    if (editMode && selectedEvent) {
      await supabase
        .from('events')
        .update({
          title,
          type,
          start_time: new Date(start),
          end_time: new Date(end),
        })
        .eq('id', selectedEvent.id);
    } else {
      await supabase.from('events').insert({
        title,
        type,
        start_time: new Date(start),
        end_time: new Date(end),
      });
    }

    setShowModal(false);
    setForm({ title: '', type: 'gig', start: '', end: '' });
    setEditMode(false);
    setSelectedEvent(null);
  };

  const handleDelete = async () => {
    if (selectedEvent) {
      await supabase.from('events').delete().eq('id', selectedEvent.id);
      setShowModal(false);
      setEditMode(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col p-4 pb-28">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
        📅 Altitude Calendar
      </h1>

      <div className="flex-1 overflow-auto max-h-[70vh]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          onSelectEvent={handleSelectEvent}
          className="rounded-xl shadow-md bg-white p-2"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setForm({ title: '', type: 'gig', start: '', end: '' });
          setEditMode(false);
          setShowModal(true);
        }}
        className="fixed bottom-20 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
            <Dialog.Title className="text-lg font-bold">
              {editMode ? 'Edit Event' : 'Add New Event'}
            </Dialog.Title>
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
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                >
                  {editMode ? 'Update Event' : 'Save Event'}
                </button>
                {editMode && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600"
                  >
                    <Trash size={18} />
                  </button>
                )}
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default BigCalendar;
