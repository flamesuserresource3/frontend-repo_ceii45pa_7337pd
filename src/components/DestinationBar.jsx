import { MapPin, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';

export default function DestinationBar({ onChange }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const swap = () => {
    setFrom(to);
    setTo(from);
    onChange?.({ from: to, to: from, date });
  };

  const update = (next) => {
    onChange?.(next);
  };

  return (
    <section className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <input
                value={from}
                onChange={(e) => { setFrom(e.target.value); update({ from: e.target.value, to, date }); }}
                placeholder="City, Station or Venue"
                className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-end md:items-center justify-center md:justify-center pt-2 md:pt-6">
            <button
              onClick={swap}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeftRight className="h-4 w-4" /> Swap
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <input
                value={to}
                onChange={(e) => { setTo(e.target.value); update({ from, to: e.target.value, date }); }}
                placeholder="City, Station or Venue"
                className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="text-xs text-gray-500 dark:text-gray-400">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); update({ from, to, date: e.target.value }); }}
              className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
