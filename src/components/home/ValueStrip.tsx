"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RefreshCcw, BadgeCheck } from "lucide-react";

const values = [
  {
    icon: BadgeCheck,
    title: "100% authentic",
    description: "Direct from Atomy, no grey imports",
  },
  {
    icon: Truck,
    title: "Free shipping over ৳3000",
    description: "Delivered across 64 districts",
  },
  {
    icon: RefreshCcw,
    title: "14-day returns",
    description: "Hassle-free, no questions asked",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "bKash · Nagad · Card · COD",
  },
];

export function ValueStrip() {
  return (
    <section className="py-10 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <v.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-sm">{v.title}</div>
              <div className="text-xs text-muted-foreground">{v.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
