"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-accent/5 via-white to-[color:var(--gold)]/5 border border-border overflow-hidden text-center"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[color:var(--gold)]/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-xs font-medium">
              <Mail className="w-3.5 h-3.5" /> Newsletter
            </div>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
              Early access to drops & rituals.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Get skincare tips, new launches, and subscriber-only discounts — straight to your
              inbox. No spam, just the good stuff.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setEmail("");
              }}
              className="mt-7 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full border border-border bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
              >
                Subscribe
              </button>
            </form>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-accent font-medium"
              >
                Welcome aboard — check your inbox for a warm hello.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
