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
  const [onboardingComplete, setOnboardingComplete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('onboarding_complete')
          .eq('id', session.user.id)
          .single();

        if (!error) {
          setOnboardingComplete(data.onboarding_complete);
        }
      }

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
        <Route path="/" element={<Launch />} />

        <Route
          path="/auth"
          element={
            !session ? (
              <Auth />
            ) : onboardingComplete ? (
              <Navigate to="/today" />
            ) : (
              <Navigate to="/onboarding" />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            session ? (
              !onboardingComplete ? <Onboarding /> : <Navigate to="/today" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/plan"
          element={
            session ? (
              onboardingComplete ? <Plan /> : <Navigate to="/onboarding" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/today"
          element={
            session ? (
              onboardingComplete ? <Today /> : <Navigate to="/onboarding" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/calendar"
          element={
            session ? (
              onboardingComplete ? <BigCalendar /> : <Navigate to="/onboarding" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
