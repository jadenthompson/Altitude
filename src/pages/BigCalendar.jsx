import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { supabase } from '../utils/supabaseClient';
import { Dialog } from '@headlessui/react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    id: null,
    title: '',
    type: 'gig',
    start: '',
    end: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (!error && data) {
        const mapped = data
          .filter((evt) => evt.title)
          .map((evt) => ({
            ...evt,
            title: `${eventTypes[evt.type] || ''} ${evt.title}`,
            start: new Date(evt.start_time),
            end: new Date(evt.end_time || evt.start_time),
          }));
        setEvents(mapped);
      }
    };
    fetchEvents();
  }, [showModal]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, title, type, start, end } = form;

    const payload = {
      title,
      type,
      start_time: new Date(start),
      end_time: new Date(end),
    };

    const { error } = id
      ? await supabase.from('events').update(payload).eq('id', id)
      : await supabase.from('events').insert(payload);

    if (!error) {
      setShowModal(false);
      setForm({ id: null, title: '', type: 'gig', start: '', end: '' });
    } else {
      alert(error.message);
    }
  };

  const handleSelectEvent = (event) => {
    setForm({
      id: event.id,
      title: event.title.replace(/^[^\s]+\s/, ''),
      type: event.type || 'gig',
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-slate-100 to-slate-200 pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-4"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight flex justify-center items-center gap-2">
          📅 Altitude Calendar
        </h1>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 w-full max-w-7xl mx-auto mt-6 px-4"
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          view={view}
          onView={(newView) => setView(newView)}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          onSelectEvent={handleSelectEvent}
          className="bg-white rounded-xl shadow-xl p-4"
          style={{ height: 'calc(100vh - 220px)' }}
        />
      </motion.div>

      {/* Add button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setForm({ id: null, title: '', type: 'gig', start: '', end: '' });
          setShowModal(true);
        }}
        className="fixed bottom-20 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                  <Dialog.Title className="text-lg font-bold mb-4">
                    {form.id ? 'Edit Event' : 'Add New Event'}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      required
                      placeholder="Event Title"
                      value={form.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full p-3 rounded-lg border"
                    />
                    <select
                      value={form.type}
                      onChange={(e) => handleChange('type', e.target.value)}
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
                      onChange={(e) => handleChange('start', e.target.value)}
                      className="w-full p-3 rounded-lg border"
                    />
                    <input
                      type="datetime-local"
                      value={form.end}
                      required
                      onChange={(e) => handleChange('end', e.target.value)}
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
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default BigCalendar;
