import { useState, useEffect } from 'react';
import { Ticket, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <Ticket className="h-6 w-6 text-indigo-600" />
          <span>ChainTickets</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</a>
          <a href="#booking" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Booking</a>
          <a href="#dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">My Bookings</a>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={() => setDark(v => !v)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
