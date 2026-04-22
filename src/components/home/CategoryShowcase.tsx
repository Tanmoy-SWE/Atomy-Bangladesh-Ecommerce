"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    href: "/products?category=skincare",
    title: "Skincare",
    subtitle: "Glow rituals",
    desc: "Cleansers, serums, and creams for radiant, healthy skin.",
    gradient: "from-rose-300 via-pink-200 to-amber-200",
    count: 32,
  },
  {
    href: "/products?category=haircare",
    title: "Haircare",
    subtitle: "Scalp to tips",
    desc: "Anti-fall, anti-frizz, and scalp-rebalancing essentials.",
    gradient: "from-emerald-300 via-teal-200 to-lime-200",
    count: 18,
  },
  {
    href: "/products?category=health",
    title: "Health",
    subtitle: "Wellness within",
    desc: "Clinically backed supplements for daily vitality.",
    gradient: "from-amber-300 via-orange-200 to-red-200",
    count: 24,
  },
  {
    href: "/products?category=personal-care",
    title: "Personal Care",
    subtitle: "Everyday rituals",
    desc: "Thoughtful essentials for the whole family.",
    gradient: "from-sky-300 via-cyan-200 to-blue-200",
    count: 14,
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-accent font-semibold"
          >
            Shop by category
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight"
          >
            Curated for your ritual.
          </motion.h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          See all
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link
              href={c.href}
              className={`group relative block overflow-hidden rounded-3xl aspect-[4/5] p-6 flex flex-col justify-between bg-gradient-to-br ${c.gradient} hover:shadow-xl transition-shadow`}
            >
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-black/60">
                  {c.subtitle}
                </div>
                <h3 className="mt-1 font-serif text-3xl font-semibold text-black">{c.title}</h3>
              </div>

              <motion.div
                initial={false}
                whileHover={{ scale: 1.1 }}
                className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/30 blur-2xl group-hover:bg-white/50 transition-colors"
              />

              <div className="relative z-10 flex items-end justify-between">
                <p className="text-sm text-black/70 max-w-[60%] leading-snug">{c.desc}</p>
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-accent transition-colors">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>

              <span className="absolute top-6 right-6 text-[10px] uppercase tracking-widest font-semibold text-black/50">
                {c.count} items
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
