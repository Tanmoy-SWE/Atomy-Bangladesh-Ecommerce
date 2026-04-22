"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products, allCategories, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top rated" },
  { id: "new", label: "Newest" },
];

export function ProductsBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = (searchParams.get("category") as ProductCategory | null) ?? null;
  const query = searchParams.get("q") ?? "";

  const [sort, setSort] = useState<string>("featured");
  const [priceMax, setPriceMax] = useState<number>(20000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.slice();

    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      default:
        list.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    }

    return list;
  }, [activeCategory, query, priceMax, sort]);

  const setCategory = (cat: ProductCategory | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (cat) params.set("category", cat);
    else params.delete("category");
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const activeLabel = activeCategory
    ? allCategories.find((c) => c.id === activeCategory)?.label
    : "All products";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Shop</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
          {activeLabel}
        </h1>
        {activeCategory && (
          <p className="mt-2 text-muted-foreground max-w-2xl">
            {allCategories.find((c) => c.id === activeCategory)?.description}
          </p>
        )}
      </motion.div>

      {/* Category pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <CategoryPill active={!activeCategory} onClick={() => setCategory(null)}>
          All
        </CategoryPill>
        {allCategories.map((c) => (
          <CategoryPill
            key={c.id}
            active={activeCategory === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </CategoryPill>
        ))}
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFiltersOpen((s) => !s)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-medium transition-colors",
              filtersOpen ? "border-accent text-accent bg-accent/5" : "border-border hover:border-accent",
            )}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-full border border-border bg-white text-sm font-medium hover:border-accent focus:border-accent outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-6 p-5 rounded-2xl bg-muted/40 border border-border flex flex-wrap items-center gap-6">
              <div className="flex-1 min-w-[240px]">
                <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
                  Max price: <span className="text-foreground">৳{priceMax.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={200}
                  max={15000}
                  step={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
              <button
                onClick={() => {
                  setPriceMax(20000);
                  setSort("featured");
                }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent"
              >
                <X className="w-4 h-4" /> Reset filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="font-serif text-2xl font-semibold">No products match these filters</h3>
          <p className="text-muted-foreground mt-2">Try widening your price range or clearing filters.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
        active
          ? "bg-foreground text-background shadow-md"
          : "bg-white border border-border hover:border-accent hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}
