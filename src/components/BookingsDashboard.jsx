import { BadgeCheck } from 'lucide-react';

const sample = [
  { id: 'TIX-41A9', status: 'Active', passengers: 2, route: 'NYC → BOS', date: '2025-02-14' },
  { id: 'TIX-77C2', status: 'Checked-in', passengers: 1, route: 'SFO → LAX', date: '2025-03-02' },
];

export default function BookingsDashboard() {
  return (
    <section id="dashboard" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">My bookings</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sample.map((b) => (
            <div key={b.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ticket</p>
                  <p className="font-semibold">{b.id}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{b.status}</span>
              </div>
              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                <p>{b.route}</p>
                <p className="text-gray-500">{b.date} • {b.passengers} passenger(s)</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-emerald-600">
                <BadgeCheck className="h-4 w-4" /> Blockchain verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
