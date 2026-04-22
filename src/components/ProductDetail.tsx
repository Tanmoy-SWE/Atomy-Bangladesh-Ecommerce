"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Minus,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";
import { ProductCard } from "./ProductCard";
import { formatBDT } from "@/lib/utils";
import { useCart } from "./CartContext";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"highlights" | "ingredients" | "how">("highlights");

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-accent">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/products?category=${product.category}`} className="hover:text-accent capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="sticky top-24">
              <ProductVisual
                product={product}
                size="lg"
                className="w-full aspect-square rounded-3xl shadow-xl"
              />
              <div className="mt-4 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border border-border hover:border-accent cursor-pointer"
                  >
                    <ProductVisual product={product} size="sm" className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-accent">
                {product.category.replace("-", " ")}
              </span>
              {product.bestseller && (
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[color:var(--gold)] text-white">
                  Bestseller
                </span>
              )}
              {product.newArrival && (
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-accent text-white">
                  New
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
              {product.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-[color:var(--gold)] text-[color:var(--gold)]"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <div className="font-serif text-4xl font-semibold">{formatBDT(product.price)}</div>
              {product.oldPrice && (
                <>
                  <div className="text-lg text-muted-foreground line-through">
                    {formatBDT(product.oldPrice)}
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-semibold">
                    Save {formatBDT(product.oldPrice - product.price)}
                  </div>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Size: <span className="text-foreground font-medium">{product.size}</span>
            </div>

            <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

            {/* Qty + CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="inline-flex items-center rounded-full border border-border h-12">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-12 h-full flex items-center justify-center hover:bg-muted rounded-l-full"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-10 text-center font-medium tabular-nums">{qty}</div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-12 h-full flex items-center justify-center hover:bg-muted rounded-r-full"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => add(product, qty)}
                className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to bag — {formatBDT(product.price * qty)}
              </motion.button>

              <button
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Save"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Perk icon={Truck} title="Free delivery" detail="Orders over ৳3000" />
              <Perk icon={RefreshCcw} title="14-day returns" detail="No questions asked" />
              <Perk icon={ShieldCheck} title="100% authentic" detail="Direct from Atomy" />
            </div>

            {/* Tabs */}
            <div className="mt-10 border-b border-border flex gap-6">
              {(
                [
                  { id: "highlights", label: "Highlights" },
                  { id: "ingredients", label: "Ingredients" },
                  { id: "how", label: "How to use" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative py-3 text-sm font-medium transition-colors ${
                    tab === t.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.span
                      layoutId="tabLine"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="py-6 min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === "highlights" && (
                    <ul className="space-y-2.5">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {tab === "ingredients" && (
                    <div className="flex flex-wrap gap-2">
                      {(product.ingredients ?? []).map((ing) => (
                        <span
                          key={ing}
                          className="px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                      {(!product.ingredients || product.ingredients.length === 0) && (
                        <p className="text-sm text-muted-foreground">
                          Detailed ingredient list available on the packaging.
                        </p>
                      )}
                    </div>
                  )}
                  {tab === "how" && (
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {product.howToUse}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
              You may also love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Perk({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Truck;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
      <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{detail}</div>
      </div>
    </div>
  );
}
