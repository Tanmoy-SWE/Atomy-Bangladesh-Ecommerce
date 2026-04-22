"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";
import { formatBDT } from "@/lib/utils";
import { useCart } from "./CartContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl bg-white border border-border overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <ProductVisual product={product} className="w-full h-full rounded-none" size="md" />
          </motion.div>

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.bestseller && (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-[color:var(--gold)] text-white shadow-sm">
                Bestseller
              </span>
            )}
            {product.newArrival && (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-accent text-white shadow-sm">
                New
              </span>
            )}
            {product.oldPrice && (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-red-600 text-white shadow-sm">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <button
            aria-label="Save to wishlist"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all hover:text-red-500"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-[color:var(--gold)] text-[color:var(--gold)]" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>·</span>
          <span>{product.reviews.toLocaleString()} reviews</span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 font-serif text-base font-semibold leading-tight group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.tagline}</p>

        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold">{formatBDT(product.price)}</span>
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatBDT(product.oldPrice)}
                </span>
              )}
            </div>
            <div className="text-[11px] text-muted-foreground">{product.size}</div>
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={(e) => {
              e.preventDefault();
              add(product, 1);
            }}
            className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
