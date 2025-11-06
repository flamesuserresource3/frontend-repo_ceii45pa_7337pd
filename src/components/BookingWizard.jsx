import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function BookingWizard({ preset }) {
  const [step, setStep] = useState(1);
  const [from, setFrom] = useState(preset?.from || '');
  const [to, setTo] = useState(preset?.to || '');
  const [date, setDate] = useState(preset?.date || '');
  const [passengers, setPassengers] = useState([{ name: '', seat: '' }]);
  const [payment, setPayment] = useState('card');
  const [confirmed, setConfirmed] = useState(false);
  const [txHash, setTxHash] = useState('');

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const confirm = () => {
    setConfirmed(true);
    // mock tx hash
    const hash = '0x' + Math.random().toString(16).slice(2).padEnd(64, '0');
    setTxHash(hash);
    setStep(5);
  };

  return (
    <section id="booking" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Book your trip</h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
                  <input value={from} onChange={(e)=>setFrom(e.target.value)} placeholder="City or Venue" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
                  <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder="City or Venue" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Date</label>
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Passengers</h3>
                <div className="mt-3 space-y-3">
                  {passengers.map((p, i) => (
                    <div key={i} className="grid grid-cols-2 gap-3">
                      <input value={p.name} onChange={(e)=>{
                        const next = [...passengers];
                        next[i].name = e.target.value;
                        setPassengers(next);
                      }} placeholder={`Passenger ${i+1} Name`} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm" />
                      <input value={p.seat} onChange={(e)=>{
                        const next = [...passengers];
                        next[i].seat = e.target.value;
                        setPassengers(next);
                      }} placeholder="Seat (e.g., 12A)" className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm" />
                    </div>
                  ))}
                  <button onClick={()=>setPassengers([...passengers, { name: '', seat: '' }])} className="text-sm px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">Add passenger</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Payment</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button onClick={()=>setPayment('card')} className={`px-3 py-3 rounded-lg border ${payment==='card'?'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30':'border-gray-200 dark:border-gray-800'}`}>Card</button>
                  <button onClick={()=>setPayment('crypto')} className={`px-3 py-3 rounded-lg border ${payment==='crypto'?'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30':'border-gray-200 dark:border-gray-800'}`}>Crypto</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-10">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Ready to confirm. Your booking will be verified on-chain.</p>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500">Transaction Hash</p>
                <p className="font-mono text-xs md:text-sm break-all text-indigo-600">{txHash}</p>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button disabled={step===1} onClick={prev} className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 disabled:opacity-50">Back</button>
              {step < 4 && <button onClick={next} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Next</button>}
              {step === 4 && <button onClick={confirm} className="px-4 py-2 rounded-md bg-green-600 text-white">Confirm</button>}
            </div>
          </div>

          <aside className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="font-medium text-gray-900 dark:text-white">Summary</h3>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">From</dt><dd className="text-gray-900 dark:text-gray-100">{from || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">To</dt><dd className="text-gray-900 dark:text-gray-100">{to || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Date</dt><dd className="text-gray-900 dark:text-gray-100">{date || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Passengers</dt><dd className="text-gray-900 dark:text-gray-100">{passengers.length}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Payment</dt><dd className="text-gray-900 dark:text-gray-100 capitalize">{payment}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
