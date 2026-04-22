"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Nusrat R.",
    city: "Dhaka",
    rating: 5,
    text: "The AI recommended the propolis ampoule for my uneven tone — 3 weeks in and my skin glows. Genuinely a game changer.",
    product: "Propolis Radiance Ampoule",
  },
  {
    name: "Tanvir A.",
    city: "Chattogram",
    rating: 5,
    text: "My hair fall reduced noticeably after using the scalp therapy shampoo for a month. Also love how fast it ships here.",
    product: "Herbal Scalp Therapy Shampoo",
  },
  {
    name: "Farzana K.",
    city: "Sylhet",
    rating: 5,
    text: "HemoHIM has become part of our family's daily routine. Felt more energetic within two weeks.",
    product: "HemoHIM Immune Support",
  },
  {
    name: "Rahat M.",
    city: "Dhaka",
    rating: 5,
    text: "I was skeptical about the AI consultation but the suggestions were spot on. Saved me from wasting money on the wrong products.",
    product: "AI Consultation",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-accent font-semibold"
        >
          Real stories, real results
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight"
        >
          Loved across Bangladesh.
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative p-6 rounded-2xl bg-white border border-border hover:shadow-lg transition-shadow"
          >
            <Quote className="absolute top-5 right-5 w-8 h-8 text-accent/10" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[color:var(--gold)] text-[color:var(--gold)]" />
              ))}
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <div className="mt-5 pt-4 border-t border-border">
              <div className="font-medium text-sm">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.city} · {r.product}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
