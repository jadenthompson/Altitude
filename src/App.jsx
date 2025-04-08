import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Launch from './pages/Launch';
import Today from './pages/Today';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';

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
        <Route path="/" element={session ? <Today /> : <Navigate to="/auth" />} />
        <Route path="/today" element={<Today />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
