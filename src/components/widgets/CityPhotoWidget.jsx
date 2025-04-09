// src/components/widgets/CityPhotoWidget.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const CityPhotoWidget = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchCityPhoto = async () => {
      const { data: artistData, error } = await supabase
        .from('artists')
        .select('city')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching artist city:', error.message);
        return;
      }

      const cityName = artistData?.city || 'New York';
      setCity(cityName);

      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${cityName}&client_id=53aZo05gjX9GxRogOT_VelqfHRo3AWSZw0V1joqsSg0`
        );
        const imgData = await res.json();
        setImageUrl(imgData.urls?.regular);
      } catch (err) {
        console.error('Unsplash error:', err);
      }
    };

    fetchCityPhoto();
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md">
      <h3 className="font-semibold text-lg mb-2">📸 {city} Vibes</h3>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`City view of ${city}`}
          className="w-full h-48 object-cover rounded-xl"
        />
      ) : (
        <p>Loading city view...</p>
      )}
    </div>
  );
};

export default CityPhotoWidget;
