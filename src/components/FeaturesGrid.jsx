import { ShieldCheck, Users, ScanLine } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Blockchain Security',
    desc: 'Tamper-proof tickets with on-chain verification and transparent history.'
  },
  {
    icon: Users,
    title: 'Multi-passenger',
    desc: 'Book for groups with named passengers and seat assignment.'
  },
  {
    icon: ScanLine,
    title: 'Instant Verification',
    desc: 'QR-based check-in with live status synced to the ledger.'
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Why ChainTickets</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Built for trust, scale, and delightful booking experiences.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <f.icon className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
