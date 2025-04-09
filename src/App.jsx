import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Launch from './pages/Launch';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding'; // You can disable this if skipping for now
import Plan from './pages/Plan';
import Today from './pages/Today';
import BigCalendar from './pages/BigCalendar';

function App() {
  const [session, setSession] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(null);
  const [planSelected, setPlanSelected] = useState(null);
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
          .select('onboarding_complete, plan')
          .eq('id', session.user.id)
          .maybeSingle();

        if (!error && data) {
          setOnboardingComplete(data.onboarding_complete);
          setPlanSelected(!!data.plan);
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
            ) : !onboardingComplete ? (
              <Navigate to="/onboarding" />
            ) : !planSelected ? (
              <Navigate to="/plan" />
            ) : (
              <Navigate to="/today" />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            session ? (
              !onboardingComplete ? <Onboarding /> : <Navigate to="/plan" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/plan"
          element={
            session ? (
              !planSelected ? <Plan /> : <Navigate to="/today" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/today"
          element={
            session && onboardingComplete && planSelected ? (
              <Today />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        <Route
          path="/calendar"
          element={
            session && onboardingComplete && planSelected ? (
              <BigCalendar />
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
