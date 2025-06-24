import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VerificationApp from './components/VerificationApp'; // Rename your previous App logic here

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<VerificationApp />} />
    </Routes>
  );
}

export default App;
