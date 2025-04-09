// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import Launch from './pages/Launch';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Plan from './pages/Plan';
import Today from './pages/Today';
import BigCalendar from './pages/BigCalendar';

const App = () => {
  const [session, setSession] = useState(null);
  const [userMeta, setUserMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get session and user profile
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
          console.error('Failed to fetch user meta:', error.message);
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

  const onboardingComplete = userMeta?.onboarding_complete === true;
  const planSelected = userMeta?.plan;

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />

        <Route path="/auth" element={
          session ? (
            !onboardingComplete ? <Navigate to="/onboarding" /> :
            !planSelected ? <Navigate to="/plan" /> :
            <Navigate to="/today" />
          ) : <Auth />
        } />

        <Route path="/onboarding" element={
          session ? (
            !onboardingComplete ? <Onboarding /> : <Navigate to="/plan" />
          ) : <Navigate to="/auth" />
        } />

        <Route path="/plan" element={
          session ? (
            !planSelected ? <Plan /> : <Navigate to="/today" />
          ) : <Navigate to="/auth" />
        } />

        <Route path="/today" element={
          session && onboardingComplete && planSelected ? (
            <Today />
          ) : <Navigate to="/auth" />
        } />

        <Route path="/calendar" element={
          session && onboardingComplete && planSelected ? (
            <BigCalendar />
          ) : <Navigate to="/auth" />
        } />
      </Routes>
    </Router>
  );
};

export default App;
