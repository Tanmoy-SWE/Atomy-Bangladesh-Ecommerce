"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
import { products } from "@/lib/products";

const featured = [products[0], products[8], products[12], products[2]];

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 pointer-events-none">
        <FloatingBlob className="top-[8%] left-[5%] w-72 h-72 bg-accent/10" delay={0} />
        <FloatingBlob className="bottom-[10%] right-[8%] w-96 h-96 bg-[color:var(--gold)]/10" delay={1.2} />
        <FloatingBlob className="top-[40%] left-[45%] w-64 h-64 bg-rose-300/10" delay={2.4} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 border border-accent/20 text-xs font-medium text-accent shadow-sm backdrop-blur"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Now delivering across Bangladesh
          </motion.div>

          <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Korean wellness,
            <br />
            <span className="gradient-text">made personal.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Atomy&apos;s globally loved skincare, haircare, and health essentials — now in Bangladesh.
            Let our AI consultation analyze your skin or hair in seconds and recommend exactly what
            works for you.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-accent to-[color:var(--gold)] text-white font-medium shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Try AI Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-border font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Shop all products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <Stat value="50k+" label="Happy customers" />
            <div className="w-px h-10 bg-border" />
            <Stat value="4.9★" label="Average rating" />
            <div className="w-px h-10 bg-border" />
            <Stat value="200+" label="Products" />
          </div>
        </motion.div>

        <div className="relative h-[460px] sm:h-[560px] lg:h-[620px]">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className={`absolute ${positions[i]}`}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                <Link href={`/products/${p.slug}`}>
                  <ProductVisual
                    product={p}
                    size="lg"
                    className={`${sizes[i]} shadow-2xl shadow-black/10 hover:shadow-black/20 transition-shadow`}
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}

          {/* Decorative ring */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] lg:w-[500px] lg:h-[500px] rounded-full border border-dashed border-accent/20"
          />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] rounded-full border border-dashed border-[color:var(--gold)]/30"
          />
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

const positions = [
  "top-[4%] left-[18%] sm:left-[22%]",
  "top-[12%] right-[6%]",
  "bottom-[8%] left-[6%]",
  "bottom-[14%] right-[20%]",
];

const sizes = [
  "w-[180px] h-[260px] sm:w-[200px] sm:h-[300px]",
  "w-[150px] h-[220px] sm:w-[170px] sm:h-[250px]",
  "w-[160px] h-[230px] sm:w-[180px] sm:h-[260px]",
  "w-[140px] h-[200px] sm:w-[160px] sm:h-[230px]",
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function FloatingBlob({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.08, 1],
        x: [0, 20, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}
