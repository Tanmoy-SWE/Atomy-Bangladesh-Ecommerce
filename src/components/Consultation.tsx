"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Upload,
  Camera,
  X,
  Loader2,
  MessageSquare,
  ShieldCheck,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

type ConsultationTarget = "skin" | "hair" | "scalp" | "general";

type Analysis = {
  target: ConsultationTarget;
  summary: string;
  observations: string[];
  concerns: string[];
  routine: string[];
  mock?: boolean;
};

type ApiResponse = {
  analysis: Analysis;
  products: Product[];
};

const targetOptions: { id: ConsultationTarget; label: string; hint: string }[] = [
  { id: "skin", label: "Skin / Face", hint: "Acne, dryness, dark spots, wrinkles" },
  { id: "hair", label: "Hair", hint: "Fall, frizz, damage, split ends" },
  { id: "scalp", label: "Scalp", hint: "Dandruff, oiliness, itch" },
  { id: "general", label: "General wellness", hint: "Sleep, energy, immunity" },
];

export function Consultation() {
  const [target, setTarget] = useState<ConsultationTarget>("skin");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setError("Image is larger than 8 MB. Please choose a smaller photo.");
      return;
    }
    setError(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const submit = async () => {
    if (!file && !prompt.trim()) {
      setError("Upload a photo or describe your concerns to get started.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("target", target);
      form.append("prompt", prompt);
      if (file) form.append("image", file);
      const res = await fetch("/api/recommend", { method: "POST", body: form });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong");
      const data: ApiResponse = await res.json();
      setResult(data);
      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setPrompt("");
    setResult(null);
    setError(null);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotgrid)" />
          </svg>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-powered consultation · Free
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-serif text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]"
          >
            Your personal beauty
            <br />
            <span className="bg-gradient-to-r from-amber-200 to-teal-200 bg-clip-text text-transparent">
              and wellness expert.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Upload a photo, describe your concerns, or both. Our AI reviews the details and
            recommends the Atomy products most likely to help — backed by your unique needs.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-semibold">
                1
              </div>
              <h2 className="font-serif text-xl font-semibold">Add a photo (optional)</h2>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
              className={cn(
                "relative rounded-2xl border-2 border-dashed overflow-hidden transition-colors",
                preview ? "border-accent" : "border-border hover:border-accent",
              )}
            >
              {preview ? (
                <div className="relative aspect-[4/5] bg-stone-100">
                  <Image
                    src={preview}
                    alt="Uploaded"
                    fill
                    sizes="(min-width: 1024px) 32rem, 100vw"
                    className="object-cover"
                  />
                  <button
                    onClick={reset}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white shadow"
                    aria-label="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full aspect-[4/5] flex flex-col items-center justify-center gap-3 text-center p-8 bg-gradient-to-br from-stone-50 to-white"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Drop a photo here</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      or click to browse (JPG, PNG, HEIC · up to 8 MB)
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium">
                    <Upload className="w-3.5 h-3.5" /> Choose image
                  </span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Your image is processed securely and never stored on our servers.
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-semibold">
                2
              </div>
              <h2 className="font-serif text-xl font-semibold">Tell us more</h2>
            </div>

            <div className="space-y-5 p-6 rounded-2xl border border-border bg-white">
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
                  What would you like help with?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {targetOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTarget(t.id)}
                      className={cn(
                        "text-left p-3 rounded-xl border transition-colors",
                        target === t.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/40",
                      )}
                    >
                      <div className="font-medium text-sm">{t.label}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{t.hint}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
                  Describe your concerns
                </label>
                <div className="relative">
                  <MessageSquare className="absolute top-3 left-3 w-4 h-4 text-muted-foreground" />
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={5}
                    placeholder="e.g. I get occasional breakouts on my chin and my skin feels dry around the cheeks. I want to fade a few dark spots from old acne."
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-white text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-muted-foreground">
                  Takes ~10 seconds · Your photo is not stored
                </p>
                <button
                  onClick={submit}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-[color:var(--gold)] text-white font-medium shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl transition-shadow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Get my recommendations
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading state */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-accent"
              />
              <div className="mt-4 font-serif text-xl">Analyzing your details…</div>
              <div className="text-sm text-muted-foreground mt-1">
                Matching with the perfect routine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.section
            id="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          >
            <div className="rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-border p-8 lg:p-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-[color:var(--gold)] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-widest font-semibold text-accent">
                  Your personalized analysis
                </span>
                {result.analysis.mock && (
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    Demo mode
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
                {result.analysis.summary}
              </h2>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <Block title="What we observed">
                  <ul className="space-y-2 text-sm">
                    {result.analysis.observations.map((o, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block title="Primary concerns">
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.concerns.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium capitalize"
                      >
                        {c.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </Block>

                <Block title="Suggested routine">
                  <ol className="space-y-2 text-sm">
                    {result.analysis.routine.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </Block>
              </div>

              <div className="mt-10">
                <h3 className="font-serif text-2xl font-semibold">Recommended for you</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">
                  These products match your needs — start with what feels most relevant.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {result.products.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Disclaimer: AI suggestions are for guidance only and are not medical advice.
                </span>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Start over
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-border">
      <h4 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}
