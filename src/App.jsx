import React, { useEffect, useState } from 'react';
import { Sun, Moon, Rocket } from 'lucide-react';
import HeroSection from './components/HeroSection.jsx';
import FeaturesGrid from './components/FeaturesGrid.jsx';
import BookingWizard from './components/BookingWizard.jsx';
import BookingsDashboard from './components/BookingsDashboard.jsx';

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100`}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(50%_40%_at_50%_-10%,rgba(99,102,241,0.2),transparent),radial-gradient(40%_30%_at_10%_20%,rgba(34,211,238,0.12),transparent)]" />

      <header className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white">
              <Rocket className="h-5 w-5" />
            </span>
            <span className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-lg font-semibold text-transparent">
              HoloTicket
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#booking" className="hover:text-white">Book</a>
            <a href="#dashboard" className="hover:text-white">My Bookings</a>
          </nav>
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 space-y-8 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <HeroSection onBookClick={scrollToBooking} />
        </div>

        <FeaturesGrid />
        <BookingWizard />
        <BookingsDashboard />
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} HoloTicket — Blockchain-verified travel & events</p>
          <a href="#" className="text-cyan-300 hover:underline">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
