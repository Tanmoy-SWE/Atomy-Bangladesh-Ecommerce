import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
};

// Renders a stylized product bottle/box depending on category, on top of the
// product's gradient background. No external images required.
export function ProductVisual({ product, className, size = "md" }: Props) {
  const letters = product.name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 3)
    .map((w) => w[0])
    .join("");

  const shape = pickShape(product);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br flex items-center justify-center",
        product.gradient,
        className,
      )}
    >
      {/* Ambient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/40 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />

      {/* Product silhouette */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {shape === "bottle" && <Bottle letters={letters} size={size} />}
        {shape === "jar" && <Jar letters={letters} size={size} />}
        {shape === "tube" && <Tube letters={letters} size={size} />}
        {shape === "box" && <Box letters={letters} size={size} />}
        {shape === "sachet" && <Sachet letters={letters} size={size} />}
      </div>

      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
    </div>
  );
}

function pickShape(p: Product) {
  const n = p.name.toLowerCase();
  if (n.includes("cream") || n.includes("gel") || n.includes("mask")) return "jar";
  if (n.includes("serum") || n.includes("ampoule") || n.includes("tonic") || n.includes("shampoo") || n.includes("wash") || n.includes("drink")) return "bottle";
  if (n.includes("toothpaste") || n.includes("hand cream") || n.includes("spf")) return "tube";
  if (n.includes("stick") || n.includes("pouches") || n.includes("sachet") || n.includes("sheet")) return "sachet";
  return "box";
}

const dims = {
  sm: { w: 64, h: 96 },
  md: { w: 110, h: 170 },
  lg: { w: 180, h: 280 },
};

function Bottle({ letters, size }: { letters: string; size: "sm" | "md" | "lg" }) {
  const { w, h } = dims[size];
  return (
    <svg width={w} height={h} viewBox="0 0 110 170" fill="none">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="100%" stopColor="white" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect x="42" y="8" width="26" height="16" rx="3" fill="#222" />
      <path d="M35 30 h40 c5 0 8 3 8 8 v115 c0 5 -3 8 -8 8 h-40 c-5 0 -8 -3 -8 -8 v-115 c0 -5 3 -8 8 -8z" fill="url(#bg1)" stroke="rgba(0,0,0,0.1)" />
      <rect x="36" y="70" width="38" height="50" rx="3" fill="white" fillOpacity="0.7" />
      <text x="55" y="102" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111" fontFamily="serif">{letters}</text>
    </svg>
  );
}

function Jar({ letters, size }: { letters: string; size: "sm" | "md" | "lg" }) {
  const { w, h } = dims[size];
  return (
    <svg width={w} height={h} viewBox="0 0 110 170" fill="none">
      <ellipse cx="55" cy="38" rx="40" ry="10" fill="#222" />
      <rect x="15" y="38" width="80" height="20" fill="#333" />
      <rect x="15" y="58" width="80" height="100" rx="4" fill="white" fillOpacity="0.92" stroke="rgba(0,0,0,0.08)" />
      <text x="55" y="120" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111" fontFamily="serif">{letters}</text>
    </svg>
  );
}

function Tube({ letters, size }: { letters: string; size: "sm" | "md" | "lg" }) {
  const { w, h } = dims[size];
  return (
    <svg width={w} height={h} viewBox="0 0 110 170" fill="none">
      <rect x="36" y="6" width="38" height="10" rx="2" fill="#333" />
      <path d="M30 16 h50 l-5 140 c0 4 -3 8 -8 8 h-24 c-5 0 -8 -4 -8 -8z" fill="white" fillOpacity="0.94" stroke="rgba(0,0,0,0.08)" />
      <text x="55" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#111" fontFamily="serif">{letters}</text>
    </svg>
  );
}

function Box({ letters, size }: { letters: string; size: "sm" | "md" | "lg" }) {
  const { w, h } = dims[size];
  return (
    <svg width={w} height={h} viewBox="0 0 110 170" fill="none">
      <rect x="12" y="20" width="86" height="130" rx="6" fill="white" fillOpacity="0.94" stroke="rgba(0,0,0,0.08)" />
      <rect x="12" y="60" width="86" height="6" fill="rgba(0,0,0,0.1)" />
      <text x="55" y="110" textAnchor="middle" fontSize="22" fontWeight="700" fill="#111" fontFamily="serif">{letters}</text>
    </svg>
  );
}

function Sachet({ letters, size }: { letters: string; size: "sm" | "md" | "lg" }) {
  const { w, h } = dims[size];
  return (
    <svg width={w} height={h} viewBox="0 0 110 170" fill="none">
      <path d="M20 18 L90 18 L98 26 L98 150 L12 150 L12 26 Z" fill="white" fillOpacity="0.94" stroke="rgba(0,0,0,0.08)" />
      <path d="M20 18 L90 18 L98 26 L12 26 Z" fill="rgba(0,0,0,0.08)" />
      <text x="55" y="100" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111" fontFamily="serif">{letters}</text>
    </svg>
  );
}
