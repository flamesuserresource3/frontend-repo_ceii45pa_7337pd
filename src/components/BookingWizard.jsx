import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, Coins, CheckCircle } from 'lucide-react';

const steps = [
  'Select Destination',
  'Date & Time',
  'Seats',
  'Passengers',
  'Payment',
  'Confirm',
];

function ProgressBar({ step }) {
  const pct = (step / (steps.length - 1)) * 100;
  return (
    <div className="relative h-2 w-full rounded-full bg-white/10">
      <div
        className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function SeatGrid({ selected, onToggle }) {
  const rows = 5;
  const cols = 8;
  const seats = useMemo(() => {
    return Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => `${String.fromCharCode(65 + r)}${c + 1}`)
    );
  }, []);

  return (
    <div className="mt-4 grid grid-cols-8 gap-2">
      {seats.flat().map((s) => {
        const isSelected = selected.includes(s);
        const isDisabled = s.endsWith('1') && s.startsWith('C'); // sample taken seat
        return (
          <button
            key={s}
            disabled={isDisabled}
            onClick={() => onToggle(s)}
            className={`aspect-square rounded-lg text-xs font-medium transition ${
              isDisabled
                ? 'bg-slate-700/50 text-slate-500 line-through'
                : isSelected
                ? 'bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState('Neo City Arena');
  const [date, setDate] = useState('2025-12-20');
  const [time, setTime] = useState('19:30');
  const [seats, setSeats] = useState([]);
  const [passengers, setPassengers] = useState([{ name: '', age: '', id: '' }]);
  const [payment, setPayment] = useState('card');
  const [verifying, setVerifying] = useState(false);
  const [txHash, setTxHash] = useState('');

  const goNext = async () => {
    if (step === steps.length - 1) return;
    if (step === steps.length - 2) {
      // simulate payment + blockchain verification
      setVerifying(true);
      setTimeout(() => {
        setVerifying(false);
        setTxHash('0x9f3a...b42c');
        setStep(step + 1);
      }, 1600);
      return;
    }
    setStep(step + 1);
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const toggleSeat = (s) => {
    setSeats((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const updatePassenger = (i, key, value) => {
    setPassengers((prev) => prev.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)));
  };

  const addPassenger = () => setPassengers((p) => [...p, { name: '', age: '', id: '' }]);

  return (
    <section id="booking" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Book Tickets</h2>
        <span className="text-sm text-slate-300">Step {step + 1} of {steps.length}</span>
      </div>

      <ProgressBar step={step} />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {step === 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm text-slate-300">Event / Route / Destination</span>
                      <div className="relative">
                        <input
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          placeholder="e.g. Neo City Arena"
                        />
                        <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </label>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm text-slate-300">Choose Date</span>
                      <div className="relative">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm text-slate-300">Choose Time</span>
                      <div className="relative">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </label>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="text-sm text-slate-300">Select Seats</p>
                    <SeatGrid selected={seats} onToggle={toggleSeat} />
                    <p className="mt-3 text-xs text-slate-400">Note: Some seats are pre-filled to simulate availability.</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    {passengers.map((p, i) => (
                      <div key={i} className="grid gap-3 sm:grid-cols-3">
                        <input
                          value={p.name}
                          onChange={(e) => updatePassenger(i, 'name', e.target.value)}
                          placeholder="Full Name"
                          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                          value={p.age}
                          onChange={(e) => updatePassenger(i, 'age', e.target.value)}
                          placeholder="Age"
                          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                          value={p.id}
                          onChange={(e) => updatePassenger(i, 'id', e.target.value)}
                          placeholder="ID / Passport"
                          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    ))}
                    <button
                      onClick={addPassenger}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      + Add Passenger
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      onClick={() => setPayment('card')}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left ${
                        payment === 'card'
                          ? 'border-cyan-400/50 bg-cyan-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <div className="text-sm font-medium">Pay with Card</div>
                        <div className="text-xs text-slate-400">Visa, Mastercard, AmEx</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setPayment('crypto')}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left ${
                        payment === 'crypto'
                          ? 'border-fuchsia-400/50 bg-fuchsia-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Coins className="h-5 w-5" />
                      <div>
                        <div className="text-sm font-medium">Pay with Crypto</div>
                        <div className="text-xs text-slate-400">ETH, USDC, more</div>
                      </div>
                    </button>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      Review & Confirm
                    </div>
                    <ul className="text-sm text-slate-300">
                      <li><span className="text-slate-400">Destination:</span> {destination}</li>
                      <li><span className="text-slate-400">Date:</span> {date} <span className="text-slate-400">Time:</span> {time}</li>
                      <li><span className="text-slate-400">Seats:</span> {seats.join(', ') || 'None'}</li>
                      <li><span className="text-slate-400">Passengers:</span> {passengers.length}</li>
                      <li><span className="text-slate-400">Payment:</span> {payment === 'card' ? 'Card' : 'Crypto'}</li>
                    </ul>
                    {txHash && (
                      <div className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-emerald-200">
                        Blockchain verified. Tx Hash: <span className="font-mono">{txHash}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={step === 0 || verifying}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={goNext}
                disabled={verifying}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.01] disabled:cursor-wait disabled:opacity-60"
              >
                {step === steps.length - 2 ? (verifying ? 'Blockchain Verification…' : 'Pay & Verify') : step === steps.length - 1 ? 'Done' : 'Next'}
              </button>
            </div>

            <AnimatePresence>
              {verifying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-cyan-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 animate-ping rounded-full bg-cyan-400" />
                    Blockchain Verification in Progress
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Booking Summary</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center justify-between"><span>Destination</span><span>{destination}</span></li>
              <li className="flex items-center justify-between"><span>Date</span><span>{date}</span></li>
              <li className="flex items-center justify-between"><span>Time</span><span>{time}</span></li>
              <li className="flex items-center justify-between"><span>Seats</span><span>{seats.length}</span></li>
              <li className="flex items-center justify-between"><span>Passengers</span><span>{passengers.length}</span></li>
              <li className="flex items-center justify-between"><span>Payment</span><span className="capitalize">{payment}</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-5">
            <h3 className="mb-2 text-sm font-semibold text-white">Status</h3>
            <p className="text-sm text-slate-300">
              {verifying ? 'Verifying on-chain…' : txHash ? 'Verified on-chain' : 'Awaiting payment'}
            </p>
            {txHash && (
              <a
                href="#"
                className="mt-2 inline-block text-xs text-cyan-300 underline"
              >
                View on explorer
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
