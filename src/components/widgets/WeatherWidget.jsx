// src/components/WeatherWidget.jsx
import React, { useEffect, useState } from 'react';
import { MapPin, Thermometer } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const { data: userData } = await supabase
        .from('artists')
        .select('city')
        .limit(1)
        .maybeSingle();

      const city = userData?.city || 'Los Angeles';
      const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
      const units = 'metric';

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
      );
      const data = await res.json();
      setWeather({ ...data, city });
    };

    fetchWeather();
  }, []);

  if (!weather) return (
    <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
      <h2 className="font-semibold text-lg flex items-center gap-2">
        <Thermometer className="w-5 h-5" /> Weather
      </h2>
      <p className="text-sm text-gray-500">Loading weather...</p>
    </div>
  );

  return (
    <div className="rounded-2xl shadow-md p-4 bg-gradient-to-r from-blue-200 to-cyan-300 dark:from-slate-700 dark:to-slate-900">
      <h2 className="font-semibold text-lg mb-1 flex items-center gap-2 text-white">
        <Thermometer className="w-5 h-5" /> {weather.city}
      </h2>
      <p className="text-white text-sm">🌤 {weather.weather[0].description}</p>
      <p className="text-white text-sm">Temp: {Math.round(weather.main.temp)}°C</p>
      <p className="text-white text-sm">Feels like: {Math.round(weather.main.feels_like)}°C</p>
    </div>
  );
};

export default WeatherWidget;
