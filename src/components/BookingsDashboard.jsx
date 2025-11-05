import React, { useMemo, useState } from 'react';
import { QrCode, Search, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function StatusBadge({ status }) {
  const map = {
    Active: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20',
    'Checked-in': 'bg-cyan-500/10 text-cyan-300 ring-cyan-400/20',
    Cancelled: 'bg-rose-500/10 text-rose-300 ring-rose-400/20',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 ${map[status]}`}>
      {status === 'Active' && <CheckCircle className="h-3.5 w-3.5" />}
      {status === 'Checked-in' && <AlertTriangle className="h-3.5 w-3.5" />}
      {status === 'Cancelled' && <XCircle className="h-3.5 w-3.5" />}
      {status}
    </span>
  );
}

function QRMock({ value }) {
  // simple stylized mock (not a real QR), just for visual
  const blocks = useMemo(() => Array.from({ length: 81 }, (_, i) => (Math.sin(i * value.length) > 0 ? 1 : 0)), [value.length]);
  return (
    <div className="grid grid-cols-9 gap-0.5 rounded-lg bg-white p-2">
      {blocks.map((b, i) => (
        <div key={i} className={`h-2 w-2 ${b ? 'bg-black' : 'bg-white'}`} />
      ))}
    </div>
  );
}

export default function BookingsDashboard() {
  const [query, setQuery] = useState('');

  const data = [
    {
      id: 'TIX-7A21',
      event: 'Neo City Arena',
      passengers: 3,
      status: 'Active',
      hash: '0x9f3a...b42c',
    },
    {
      id: 'TIX-4C19',
      event: 'Quantum Expo Line',
      passengers: 1,
      status: 'Checked-in',
      hash: '0x1c7d...9aa0',
    },
    {
      id: 'TIX-9Z88',
      event: 'Lunar Port Transfer',
      passengers: 2,
      status: 'Cancelled',
      hash: '0xab22...1eaf',
    },
  ];

  const filtered = data.filter(
    (d) => d.id.toLowerCase().includes(query.toLowerCase()) || d.event.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-white">My Bookings</h2>
        <div className="relative w-full sm:w-80">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ticket or route"
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b, idx) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white">{b.event}</h3>
                <p className="mt-1 text-sm text-slate-300">Ticket ID: <a href="#" className="text-cyan-300 underline">{b.id}</a></p>
              </div>
              <StatusBadge status={b.status} />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
              <span>Passengers: <span className="text-white">{b.passengers}</span></span>
              <a href="#" className="text-cyan-300 underline">{b.hash}</a>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="rounded-lg bg-white p-2">
                <QRMock value={b.id} />
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
                <QrCode className="h-4 w-4" />
                QR Code
              </button>
            </div>

            <div className="mt-4 text-xs text-cyan-200">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1">Blockchain Verified</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
