import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';

import Launch from './pages/Launch';
import Today from './pages/Today';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import BigCalendar from './pages/BigCalendar';

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
        {/* Always show Launch at root */}
        <Route path="/" element={<Launch />} />

        {/* Auth page */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected routes */}
        <Route path="/today" element={session ? <Today /> : <Navigate to="/auth" />} />
        <Route path="/calendar" element={session ? <BigCalendar /> : <Navigate to="/auth" />} />
        <Route path="/onboarding" element={session ? <Onboarding /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
