"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getBestsellers } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function BestsellerGrid() {
  const items = getBestsellers().slice(0, 8);
  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-accent font-semibold"
            >
              Customer favorites
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              Bestsellers this week.
            </motion.h2>
          </div>
          <Link href="/products" className="text-sm font-medium text-accent hover:underline hidden sm:inline">
            Browse all →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
