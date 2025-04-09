// App.jsx
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
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [planSelected, setPlanSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserMeta = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('onboarding_complete, plan')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setOnboardingComplete(data.onboarding_complete);
      setPlanSelected(!!data.plan);
    } else {
      console.warn('Could not fetch user meta:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      if (session?.user) await fetchUserMeta(session.user.id);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchUserMeta(session.user.id);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
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
              !onboardingComplete ? <Onboarding onComplete={() => setOnboardingComplete(true)} /> : <Navigate to="/plan" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/plan"
          element={
            session ? (
              onboardingComplete ? <Plan onPlanSelected={() => setPlanSelected(true)} /> : <Navigate to="/onboarding" />
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
