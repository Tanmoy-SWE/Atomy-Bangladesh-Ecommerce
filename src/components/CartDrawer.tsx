"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { ProductVisual } from "./ProductVisual";
import { formatBDT } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, remove, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-serif text-lg font-semibold">Your Bag</h2>
                <span className="text-sm text-muted-foreground">({items.length})</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-muted"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-lg font-semibold">Your bag is empty</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Discover products tailored for you.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="mt-6 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-border">
                  {items.map(({ product, qty }) => (
                    <motion.li
                      key={product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4 flex gap-4"
                    >
                      <ProductVisual
                        product={product}
                        size="sm"
                        className="w-20 h-20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={closeCart}
                            className="font-medium text-sm leading-tight hover:text-accent"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => remove(product.id)}
                            className="text-muted-foreground hover:text-red-600"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{product.size}</div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button
                              onClick={() => updateQty(product.id, qty - 1)}
                              className="p-1.5 hover:bg-muted rounded-l-full"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-medium tabular-nums">{qty}</span>
                            <button
                              onClick={() => updateQty(product.id, qty + 1)}
                              className="p-1.5 hover:bg-muted rounded-r-full"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="font-semibold text-sm">
                            {formatBDT(product.price * qty)}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <footer className="border-t border-border p-5 space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatBDT(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {subtotal > 3000 ? "Free" : formatBDT(120)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="font-serif text-lg font-semibold">Total</span>
                    <span className="font-serif text-lg font-semibold">
                      {formatBDT(subtotal + (subtotal > 3000 ? 0 : 120))}
                    </span>
                  </div>
                  <button className="w-full py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors">
                    Proceed to checkout
                  </button>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="block text-center text-xs text-muted-foreground hover:text-accent"
                  >
                    Continue shopping
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
