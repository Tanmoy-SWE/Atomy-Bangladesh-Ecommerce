"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { formatBDT } from "@/lib/utils";

const row = [...products, ...products];

export function ProductMarquee() {
  return (
    <section className="py-20 overflow-hidden bg-stone-50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
          Explore the full range
        </p>
        <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
          From dawn rituals to nightly repair.
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ width: "max-content" }}
        >
          {row.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/products/${p.slug}`}
              className="group w-64 shrink-0 rounded-2xl bg-white border border-border p-4 hover:shadow-lg hover:border-accent/20 transition-all"
            >
              <ProductVisual product={p} size="md" className="w-full aspect-square" />
              <div className="mt-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.category.replace("-", " ")}
                </div>
                <div className="mt-1 font-serif font-semibold text-sm leading-tight line-clamp-1 group-hover:text-accent transition-colors">
                  {p.name}
                </div>
                <div className="mt-1 font-semibold text-sm">{formatBDT(p.price)}</div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
