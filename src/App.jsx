import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launch from './pages/Launch';
import Today from './pages/Today'; // or whatever your main app page is

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/today" element={<Today />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
