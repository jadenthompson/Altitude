// src/pages/EventDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import moment from 'moment';
import { CalendarIcon, Plane, Hotel, User, X, Pencil } from 'lucide-react';
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [travel, setTravel] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: eventData } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      setEvent(eventData);

      const { data: travelData } = await supabase
        .from('travel_segments')
        .select('*')
        .eq('event_id', id);
      setTravel(travelData || []);

      const { data: hotelData } = await supabase
        .from('accommodations')
        .select('*')
        .eq('event_id', id);
      setHotel(hotelData || []);

      const { data: guestData } = await supabase
        .from('guests')
        .select('*')
        .eq('event_id', id)
        .order('order', { ascending: true });
      setGuests(guestData || []);
    };

    fetchData();
  }, [id]);

  const addGuest = async () => {
    if (!newGuest.trim()) return;
    const { error } = await supabase.from('guests').insert({
      name: newGuest,
      event_id: id,
      order: guests.length
    });
    if (!error) {
      setGuests([...guests, { name: newGuest, order: guests.length }]);
      setNewGuest('');
    }
  };

  const deleteGuest = async (guestId) => {
    await supabase.from('guests').delete().eq('id', guestId);
    setGuests(guests.filter((g) => g.id !== guestId));
  };

  const editGuest = async (guestId, newName) => {
    await supabase.from('guests').update({ name: newName }).eq('id', guestId);
    setGuests(
      guests.map((g) => (g.id === guestId ? { ...g, name: newName } : g))
    );
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(guests);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setGuests(reordered);
    await Promise.all(
      reordered.map((g, i) =>
        supabase.from('guests').update({ order: i }).eq('id', g.id)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 p-6">
      {event && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-500" />
            {event.title || 'Untitled Event'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {moment(event.start_time).format('ddd, MMM D – h:mm A')} →{' '}
            {moment(event.end_time).format('h:mm A')}
          </p>
        </div>
      )}

      {travel.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700">
            <Plane className="w-4 h-4" /> Travel Info
          </h2>
          <div className="bg-white p-4 rounded-xl shadow">
            {travel.map((flight) => (
              <div key={flight.id} className="mb-3">
                <p className="font-medium">{flight.airline} {flight.flight_number}</p>
                <p>{flight.departure_city} → {flight.arrival_city}</p>
                <p>
                  {moment(flight.departure_time).format('DD/MM/YYYY, HH:mm')} →{' '}
                  {moment(flight.arrival_time).format('DD/MM/YYYY, HH:mm')}
                </p>
                <p className="text-sm text-slate-600">Terminal: {flight.terminal} | Gate: {flight.gate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {hotel.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700">
            <Hotel className="w-4 h-4" /> Hotel Info
          </h2>
          <div className="bg-white p-4 rounded-xl shadow">
            {hotel.map((h) => (
              <div key={h.id} className="mb-2">
                <p className="font-medium">{h.hotel_name}</p>
                <p className="text-sm text-slate-600">{h.address}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700">
          <User className="w-4 h-4" /> Guestlist
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add guest..."
            value={newGuest}
            onChange={(e) => setNewGuest(e.target.value)}
            className="flex-1 rounded-lg border p-2"
          />
          <button
            onClick={addGuest}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            +
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="guestlist">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {guests.map((guest, index) => (
                  <Draggable key={guest.id} draggableId={guest.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-3 rounded-lg shadow flex items-center justify-between"
                      >
                        <input
                          type="text"
                          value={guest.name}
                          onChange={(e) => editGuest(guest.id, e.target.value)}
                          className="border-none w-full focus:outline-none text-slate-800"
                        />
                        <button onClick={() => deleteGuest(guest.id)}>
                          <X className="text-red-500 w-5 h-5 ml-2" />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default EventDetails;
