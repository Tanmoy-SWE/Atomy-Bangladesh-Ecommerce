"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type CartItem = { product: Product; qty: number };

type CartContextType = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "atomy-bd-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(raw));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartContextType>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = items.reduce((acc, i) => acc + i.qty * i.product.price, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (product, qty = 1) => {
        setItems((curr) => {
          const idx = curr.findIndex((c) => c.product.id === product.id);
          if (idx === -1) return [...curr, { product, qty }];
          const next = [...curr];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        });
        setOpen(true);
      },
      remove: (id) => setItems((curr) => curr.filter((c) => c.product.id !== id)),
      updateQty: (id, qty) =>
        setItems((curr) =>
          curr
            .map((c) => (c.product.id === id ? { ...c, qty } : c))
            .filter((c) => c.qty > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
