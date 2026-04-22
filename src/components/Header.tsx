"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingBag, Sparkles, Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { CartDrawer } from "./CartDrawer";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products?category=skincare", label: "Skincare" },
  { href: "/products?category=haircare", label: "Haircare" },
  { href: "/products?category=health", label: "Health" },
  { href: "/consultation", label: "AI Consultation", accent: true },
];

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-white/60 backdrop-blur-sm",
        )}
      >
        {/* Top announcement bar */}
        <div className="bg-gradient-to-r from-accent to-[color:var(--gold)] text-white text-xs text-center py-1.5 font-medium tracking-wide">
          Free delivery across Bangladesh on orders over ৳3000 · Authentic Atomy guarantee
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                Atomy
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Bangladesh
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname || (link.href === "/products" && pathname?.startsWith("/products"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                    link.accent
                      ? "text-white bg-gradient-to-r from-accent to-[color:var(--gold)] hover:opacity-95 ml-2 flex items-center gap-1.5"
                      : isActive
                        ? "text-accent"
                        : "text-foreground/80 hover:text-accent",
                  )}
                >
                  {link.accent && <Sparkles className="w-3.5 h-3.5" />}
                  {link.label}
                  {!link.accent && isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-accent rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-semibold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2.5 rounded-lg text-sm font-medium",
                      link.accent
                        ? "text-white bg-gradient-to-r from-accent to-[color:var(--gold)] flex items-center gap-1.5 justify-center"
                        : "hover:bg-muted",
                    )}
                  >
                    {link.accent && <Sparkles className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <CartDrawer />
    </>
  );
}

function Logo() {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-[color:var(--gold)] p-[2px] relative">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <circle cx="12" cy="12" r="3" fill="var(--accent)" />
          <circle cx="12" cy="12" r="8" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="4" r="1.5" fill="var(--gold)" />
          <circle cx="20" cy="12" r="1.5" fill="var(--gold)" />
          <circle cx="12" cy="20" r="1.5" fill="var(--gold)" />
          <circle cx="4" cy="12" r="1.5" fill="var(--gold)" />
        </svg>
      </div>
    </div>
  );
}
