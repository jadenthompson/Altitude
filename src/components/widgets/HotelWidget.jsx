// src/components/HotelWidget.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { BedDouble } from 'lucide-react';

const HotelWidget = () => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('check_in', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) console.error('Hotel fetch error:', error.message);
      else setHotel(data);
    };

    fetchHotel();
  }, []);

  if (!hotel) return (
    <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
      <h2 className="font-semibold text-lg mb-1 flex items-center gap-2">
        <BedDouble className="w-5 h-5" />
        Hotel Info
      </h2>
      <p className="text-sm text-gray-500">No hotel info available.</p>
    </div>
  );

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
      <h2 className="font-semibold text-lg mb-1 flex items-center gap-2">
        <BedDouble className="w-5 h-5" />
        Hotel Info
      </h2>
      <p className="text-sm font-medium">{hotel.name}</p>
      <p className="text-sm text-gray-500">{hotel.address}</p>
      <p className="text-sm text-gray-500">Check-in: {hotel.check_in}</p>
      {hotel.reservation_number && (
        <p className="text-sm text-gray-500">Reservation #: {hotel.reservation_number}</p>
      )}
    </div>
  );
};

export default HotelWidget;
