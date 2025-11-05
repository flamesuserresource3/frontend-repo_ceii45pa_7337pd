import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function HeroSection({ onBookClick }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_0%,rgba(56,189,248,0.25),transparent),radial-gradient(40%_40%_at_80%_20%,rgba(147,51,234,0.25),transparent)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-sm"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-1 text-xs font-medium text-cyan-200 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            Blockchain Verified Tickets
          </span>
          <h1 className="mt-6 bg-gradient-to-br from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl">
            Book. Verify. Travel.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-cyan-100/80 md:text-lg">
            A futuristic booking experience with secure, on-chain verification and multi-passenger checkout.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={onBookClick}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-fuchsia-500/20"
            >
              Book Ticket
            </button>
            <a
              href="#features"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white/90 backdrop-blur-md hover:bg-white/10"
            >
              Learn more
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
