import React from 'react';
import { Shield, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Secure with Blockchain',
    desc: 'Every ticket is issued with an on-chain proof, protecting against fraud and double-spends.',
    gradient: 'from-cyan-500/20 to-cyan-300/10',
  },
  {
    icon: Users,
    title: 'Multi-passenger Booking',
    desc: 'Add multiple passengers and seats in a single, streamlined checkout experience.',
    gradient: 'from-fuchsia-500/20 to-purple-400/10',
  },
  {
    icon: Zap,
    title: 'Real-time Verification',
    desc: 'Instant status updates during scanning: Valid, Already Checked-in, or Invalid.',
    gradient: 'from-emerald-500/20 to-lime-400/10',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
          Built for trust and speed
        </h2>
        <p className="mt-3 text-slate-300">
          Designed with a futuristic aesthetic and seamless UX so you can book and verify with confidence.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${f.gradient} p-6`}
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <f.icon className="h-6 w-6 text-white" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
