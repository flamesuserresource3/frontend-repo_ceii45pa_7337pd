import Navbar from './components/Navbar';
import DestinationBar from './components/DestinationBar';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import BookingWizard from './components/BookingWizard';
import BookingsDashboard from './components/BookingsDashboard';
import { useState } from 'react';

function App() {
  const [preset, setPreset] = useState({ from: '', to: '', date: '' });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <DestinationBar onChange={(v) => setPreset(v)} />
      <HeroSection />
      <FeaturesGrid />
      <BookingWizard preset={preset} />
      <BookingsDashboard />
      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} ChainTickets</footer>
    </div>
  );
}

export default App;
