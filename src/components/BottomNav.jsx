// src/components/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Home, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 flex justify-around items-center py-3 px-6 shadow-md md:hidden">
      <NavLink
        to="/today"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-300'
          }`
        }
      >
        <Home size={22} />
        Today
      </NavLink>

      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-300'
          }`
        }
      >
        <Calendar size={22} />
        Calendar
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-300'
          }`
        }
      >
        <User size={22} />
        Profile
      </NavLink>
    </div>
  );
};

export default BottomNav;