// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import Launch from './pages/Launch';
import Auth from './pages/Auth';
import Today from './pages/Today';
import BigCalendar from './pages/BigCalendar';

const App = () => {
  const [session, setSession] = useState(null);
  const [userMeta, setUserMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionAndUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('User fetch error:', error.message);
        } else {
          setUserMeta(data);
        }
      }

      setLoading(false);
    };

    getSessionAndUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        getSessionAndUser();
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route
          path="/auth"
          element={
            session ? <Navigate to="/today" /> : <Auth />
          }
        />
        <Route
          path="/today"
          element={
            session ? <Today /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/calendar"
          element={
            session ? <BigCalendar /> : <Navigate to="/auth" />
          }
        />
        {/* Optional fallback */}
        <Route path="*" element={<Navigate to="/today" />} />
      </Routes>
    </Router>
  );
};

export default App;
