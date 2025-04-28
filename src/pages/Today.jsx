import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, RefreshCw } from 'lucide-react';
import FlightWidget from '../components/widgets/FlightWidget';
import HotelWidget from '../components/widgets/HotelWidget';
import WeatherWidget from '../components/widgets/WeatherWidget';
import CityPhotoWidget from '../components/widgets/CityPhotoWidget';
import CalendarSummaryWidget from '../components/widgets/CalendarSummaryWidget';




export default function Today() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('Welcome back');

  // Greeting with dynamic time + name
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Refresh logic
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload(); // You can make widget-specific fetch calls here instead
      setIsRefreshing(false);
    }, 800);
  };

  // Widget cards
  const widgets = [
    { component: <FlightWidget />, onClick: () => navigate('/flights') },
    { component: <HotelWidget />, onClick: () => navigate('/hotels') },
    { component: <WeatherWidget />, onClick: () => navigate('/weather') },
    { component: <CalendarSummaryWidget />, onClick: () => navigate('/calendar') },
    { component: <CityPhotoWidget />, onClick: () => navigate('/venue') },
  ];

  return (
    <div className="min-h-screen pb-32 px-4 pt-6 bg-background text-foreground">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting}, <span className="text-primary">Jaden</span>
        </h1>
        <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-muted">
          <Sun className="w-6 h-6" />
        </button>
      </div>

      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition"
      >
        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh widgets
      </button>

      <div className="flex flex-col gap-6">
        {widgets.map((widget, index) => (
          <div
            key={index}
            onClick={widget.onClick}
            className="rounded-2xl bg-card shadow-md p-4 cursor-pointer transition hover:scale-[1.01] active:scale-[0.98]"
          >
            {widget.component}
          </div>
        ))}
      </div>
    </div>
  );
}
