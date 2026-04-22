"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Camera, MessageSquare, ArrowRight } from "lucide-react";

export function AIBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(15,118,110,0.12),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(176,138,78,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 overflow-hidden"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <PulseOrb className="top-10 right-10" color="from-teal-400" />
          <PulseOrb className="bottom-10 left-14" color="from-amber-400" delay={1.5} />

          <div className="relative grid lg:grid-cols-2 items-center gap-10 p-10 lg:p-14">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium backdrop-blur border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                AI-powered consultation
              </div>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-semibold text-white leading-[1.1]">
                Snap a photo.
                <br />
                <span className="bg-gradient-to-r from-amber-200 to-teal-200 bg-clip-text text-transparent">
                  Get expert guidance.
                </span>
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
                Upload a picture of your skin, hair, or scalp — or just describe your concerns.
                Our AI analyzes and matches you with the Atomy products most likely to help.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/consultation"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-900 font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Start consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full text-xs text-white/60">
                  Free · ~10 seconds
                </span>
              </div>
            </div>

            <div className="relative h-[340px] flex items-center justify-center">
              <FloatingCard
                icon={Camera}
                label="Skin analysis"
                detail="Hydration · Clarity · Tone"
                className="top-4 left-2 sm:left-6"
                delay={0}
              />
              <FloatingCard
                icon={MessageSquare}
                label="Text prompt"
                detail='"My scalp itches in dry weather"'
                className="bottom-4 right-2 sm:right-6"
                delay={1}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-56 h-56 rounded-full border border-dashed border-white/20" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-amber-400 shadow-2xl flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  icon: Icon,
  label,
  detail,
  className,
  delay,
}: {
  icon: typeof Camera;
  label: string;
  detail: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute w-56 p-4 rounded-2xl glass shadow-xl border border-white/40 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-[11px] text-muted-foreground">{detail}</div>
        </div>
      </div>
    </motion.div>
  );
}

function PulseOrb({ className, color, delay = 0 }: { className: string; color: string; delay?: number }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute w-40 h-40 rounded-full bg-gradient-radial ${color} to-transparent blur-3xl ${className}`}
    />
  );
}
