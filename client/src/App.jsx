// import TypingTest from './components/TypingTest';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OtherStatsPage from './pages/OtherStatsPage';
import StatsPage from './pages/StatsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/stats' element={<StatsPage />} />
      <Route path='/stats/:userName' element={<OtherStatsPage />} />
      <Route path='/vasu' element={<AdminPage />} />
    </Routes>
  );
}

export default App;
