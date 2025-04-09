import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Launch from './pages/Launch';
import Auth from './pages/Auth';
import Today from './pages/Today';
import Onboarding from './pages/Onboarding';
import Plan from './pages/Plan';
import BigCalendar from './pages/BigCalendar';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        {/* Launch */}
        <Route path="/" element={<Launch />} />

        {/* Auth */}
        <Route
          path="/auth"
          element={!session ? <Auth /> : <Navigate to="/today" />}
        />

        {/* Onboarding (temporarily bypassed) */}
        <Route path="/onboarding" element={<Navigate to="/today" />} />

        {/* Plan (temporarily bypassed) */}
        <Route path="/plan" element={<Navigate to="/today" />} />

        {/* Today */}
        <Route
          path="/today"
          element={session ? <Today /> : <Navigate to="/auth" />}
        />

        {/* Calendar */}
        <Route
          path="/calendar"
          element={session ? <BigCalendar /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
