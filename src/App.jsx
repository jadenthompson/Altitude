import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Launch from './pages/Launch';
import Today from './pages/Today';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Plan from './pages/Plan';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={session ? <Onboarding /> : <Navigate to="/auth" />} />
        <Route path="/today" element={session ? <Today /> : <Navigate to="/auth" />} />
        <Route path="/plan" element={session ? <Plan /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
