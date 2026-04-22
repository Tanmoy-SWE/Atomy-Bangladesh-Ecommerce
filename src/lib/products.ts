export type ProductCategory = "skincare" | "haircare" | "health" | "personal-care";

export type SkinConcern =
  | "acne"
  | "dryness"
  | "oiliness"
  | "wrinkles"
  | "dark-spots"
  | "sensitivity"
  | "dullness"
  | "redness";

export type HairConcern =
  | "dandruff"
  | "hair-fall"
  | "dry-scalp"
  | "oily-scalp"
  | "damaged"
  | "frizzy"
  | "thinning"
  | "split-ends";

export type HealthConcern =
  | "immunity"
  | "fatigue"
  | "joints"
  | "digestion"
  | "sleep"
  | "eye-health"
  | "heart-health"
  | "bone-health";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  bestseller?: boolean;
  newArrival?: boolean;
  image: string;
  gradient: string;
  size: string;
  highlights: string[];
  ingredients?: string[];
  howToUse: string;
  concerns: (SkinConcern | HairConcern | HealthConcern)[];
  skinType?: ("oily" | "dry" | "combination" | "sensitive" | "normal" | "all")[];
  hairType?: ("oily" | "dry" | "damaged" | "normal" | "all")[];
};

// Placeholder visuals use SVG data URIs + gradient backgrounds so no external images are needed.
export const products: Product[] = [
  // ── Skincare ─────────────────────────────────────────────
  {
    id: "sk-001",
    slug: "the-fame-skincare-set",
    name: "The Fame Skincare Set",
    tagline: "6-step premium anti-aging ritual",
    description:
      "A signature 6-step Korean skincare system formulated with pine needle and botanical stem cell extracts for firming, radiance, and deep hydration.",
    category: "skincare",
    price: 12500,
    oldPrice: 14200,
    rating: 4.9,
    reviews: 2148,
    bestseller: true,
    image: "/products/skincare-1.svg",
    gradient: "from-rose-200 via-amber-100 to-teal-100",
    size: "6 pc set",
    highlights: [
      "Reduces fine lines in 4 weeks",
      "Pine needle stem-cell extract",
      "Dermatologist tested",
    ],
    ingredients: ["Pine Needle Extract", "Niacinamide", "Adenosine", "Hyaluronic Acid"],
    howToUse: "Cleanser → Toner → Essence → Serum → Eye cream → Moisturizer. AM & PM.",
    concerns: ["wrinkles", "dullness", "dryness", "dark-spots"],
    skinType: ["dry", "normal", "combination"],
  },
  {
    id: "sk-002",
    slug: "absolute-cellactive-cream",
    name: "Absolute CellActive Cream",
    tagline: "Deep-action anti-wrinkle moisturizer",
    description:
      "Luxurious night cream infused with 24 botanical stem cells for visible lifting, firming, and overnight cell renewal.",
    category: "skincare",
    price: 6800,
    rating: 4.8,
    reviews: 964,
    image: "/products/skincare-2.svg",
    gradient: "from-amber-200 via-orange-100 to-rose-100",
    size: "50 ml",
    highlights: ["24 botanical stem cells", "Visible lifting in 14 days", "Rich, velvety texture"],
    ingredients: ["Edelweiss Stem Cell", "Ceramide NP", "Peptide Complex"],
    howToUse: "Apply a pea-sized amount to face and neck at night after serum.",
    concerns: ["wrinkles", "dullness", "dryness"],
    skinType: ["dry", "normal", "combination"],
  },
  {
    id: "sk-003",
    slug: "propolis-ampoule",
    name: "Propolis Radiance Ampoule",
    tagline: "Honey-glow brightening serum",
    description:
      "A lightweight ampoule with 72% black bee propolis and niacinamide — calms redness and restores a healthy, luminous glow.",
    category: "skincare",
    price: 3400,
    oldPrice: 3900,
    rating: 4.7,
    reviews: 1322,
    newArrival: true,
    image: "/products/skincare-3.svg",
    gradient: "from-yellow-200 via-amber-100 to-orange-100",
    size: "30 ml",
    highlights: ["72% black bee propolis", "Reduces redness", "Niacinamide 5%"],
    ingredients: ["Propolis Extract", "Niacinamide", "Panthenol"],
    howToUse: "After toner, press 3–4 drops into face. Layer under moisturizer.",
    concerns: ["dullness", "redness", "sensitivity", "dark-spots"],
    skinType: ["sensitive", "normal", "combination"],
  },
  {
    id: "sk-004",
    slug: "herb-purifying-cleanser",
    name: "Herb Purifying Cleanser",
    tagline: "Gentle foaming cleanser for acne-prone skin",
    description:
      "Low-pH herbal foam with tea tree and centella — sweeps away excess sebum while keeping the barrier intact.",
    category: "skincare",
    price: 1650,
    rating: 4.6,
    reviews: 2819,
    bestseller: true,
    image: "/products/skincare-4.svg",
    gradient: "from-green-200 via-emerald-100 to-teal-100",
    size: "150 ml",
    highlights: ["Low-pH 5.5", "Tea tree + Centella", "Non-drying"],
    ingredients: ["Tea Tree Oil", "Centella Asiatica", "Green Tea Extract"],
    howToUse: "Massage onto damp skin, rinse with lukewarm water. Use AM & PM.",
    concerns: ["acne", "oiliness", "sensitivity"],
    skinType: ["oily", "combination", "sensitive"],
  },
  {
    id: "sk-005",
    slug: "hydra-aqua-gel",
    name: "Hydra Aqua Gel",
    tagline: "72-hour water-burst moisture gel",
    description:
      "A featherlight gel powered by glacier water and hyaluronic acid — floods thirsty skin with moisture without any heaviness.",
    category: "skincare",
    price: 2950,
    rating: 4.5,
    reviews: 607,
    image: "/products/skincare-5.svg",
    gradient: "from-sky-200 via-cyan-100 to-blue-100",
    size: "80 ml",
    highlights: ["72h hydration", "Oil-free", "Cooling finish"],
    ingredients: ["Glacier Water", "Hyaluronic Acid", "Aloe Vera"],
    howToUse: "Smooth over face and neck after serum, AM & PM.",
    concerns: ["dryness", "oiliness", "dullness"],
    skinType: ["oily", "combination", "normal"],
  },
  {
    id: "sk-006",
    slug: "vitamin-c-spot-serum",
    name: "Vitamin C Spot Corrector",
    tagline: "Brightens dark spots & evens tone",
    description:
      "20% stabilized vitamin C with ferulic acid — visibly fades dark spots and brings back a radiant, even complexion.",
    category: "skincare",
    price: 2750,
    rating: 4.7,
    reviews: 1041,
    newArrival: true,
    image: "/products/skincare-6.svg",
    gradient: "from-orange-200 via-yellow-100 to-amber-100",
    size: "20 ml",
    highlights: ["20% Vit C", "Fades spots in 6 weeks", "Antioxidant boost"],
    ingredients: ["Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
    howToUse: "Apply 2–3 drops in the morning before moisturizer and SPF.",
    concerns: ["dark-spots", "dullness", "wrinkles"],
    skinType: ["all"],
  },
  {
    id: "sk-007",
    slug: "mineral-sun-shield-spf50",
    name: "Mineral Sun Shield SPF 50+",
    tagline: "Zero-white-cast daily UV defense",
    description:
      "A silky mineral sunscreen that doubles as a primer — protects against UVA/UVB and blue light without any white cast.",
    category: "skincare",
    price: 2250,
    rating: 4.8,
    reviews: 1680,
    bestseller: true,
    image: "/products/skincare-7.svg",
    gradient: "from-yellow-200 via-amber-200 to-orange-200",
    size: "50 ml",
    highlights: ["SPF 50+ PA++++", "No white cast", "Blue-light shield"],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide"],
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours.",
    concerns: ["dark-spots", "wrinkles", "sensitivity"],
    skinType: ["all"],
  },
  {
    id: "sk-008",
    slug: "centella-calming-mask",
    name: "Centella Calming Sheet Mask",
    tagline: "Redness rescue in 15 minutes",
    description:
      "Biodegradable cellulose mask drenched in centella and madecassoside — instantly soothes irritated, reactive skin.",
    category: "skincare",
    price: 220,
    rating: 4.6,
    reviews: 4302,
    image: "/products/skincare-8.svg",
    gradient: "from-green-200 via-teal-100 to-emerald-100",
    size: "25 ml × 1",
    highlights: ["Instant calming", "Biodegradable fiber", "For reactive skin"],
    ingredients: ["Centella Asiatica", "Madecassoside", "Panthenol"],
    howToUse: "Apply to clean skin for 15 minutes, pat in remaining essence.",
    concerns: ["redness", "sensitivity", "dryness"],
    skinType: ["sensitive", "dry", "all"],
  },

  // ── Haircare ─────────────────────────────────────────────
  {
    id: "hc-001",
    slug: "herbal-scalp-therapy-shampoo",
    name: "Herbal Scalp Therapy Shampoo",
    tagline: "Anti-hair fall with ginseng & biotin",
    description:
      "A densifying shampoo combining red ginseng, biotin, and caffeine — strengthens thinning hair from the root.",
    category: "haircare",
    price: 1950,
    rating: 4.8,
    reviews: 3120,
    bestseller: true,
    image: "/products/hair-1.svg",
    gradient: "from-emerald-200 via-green-100 to-lime-100",
    size: "500 ml",
    highlights: ["Reduces hair fall 47%", "Caffeine + biotin", "Sulfate-free"],
    ingredients: ["Red Ginseng", "Biotin", "Caffeine", "Panthenol"],
    howToUse: "Massage into wet scalp for 60 seconds, rinse. Use 3–4 times weekly.",
    concerns: ["hair-fall", "thinning", "dry-scalp"],
    hairType: ["all"],
  },
  {
    id: "hc-002",
    slug: "anti-dandruff-tonic",
    name: "Anti-Dandruff Scalp Tonic",
    tagline: "Clinically reduces flakes in 14 days",
    description:
      "A cooling leave-on tonic with piroctone olamine and tea tree — calms itch and eliminates visible flakes.",
    category: "haircare",
    price: 1650,
    rating: 4.6,
    reviews: 872,
    image: "/products/hair-2.svg",
    gradient: "from-cyan-200 via-sky-100 to-blue-100",
    size: "100 ml",
    highlights: ["Clears flakes in 14d", "Cooling menthol", "No parabens"],
    ingredients: ["Piroctone Olamine", "Tea Tree Oil", "Menthol"],
    howToUse: "Part hair, apply tonic to scalp and massage. Do not rinse.",
    concerns: ["dandruff", "dry-scalp"],
    hairType: ["all"],
  },
  {
    id: "hc-003",
    slug: "repair-mask-keratin",
    name: "Keratin Repair Hair Mask",
    tagline: "5-minute rescue for damaged hair",
    description:
      "A deep-conditioning mask with hydrolyzed keratin and argan oil — restores softness, shine, and elasticity.",
    category: "haircare",
    price: 2400,
    rating: 4.7,
    reviews: 1495,
    image: "/products/hair-3.svg",
    gradient: "from-amber-200 via-yellow-100 to-orange-100",
    size: "200 ml",
    highlights: ["Visible shine in 5 min", "Keratin + argan", "Heat protection"],
    ingredients: ["Hydrolyzed Keratin", "Argan Oil", "Silk Protein"],
    howToUse: "Apply to damp hair after shampoo, leave 5 min, rinse thoroughly.",
    concerns: ["damaged", "frizzy", "split-ends"],
    hairType: ["damaged", "dry"],
  },
  {
    id: "hc-004",
    slug: "oil-control-shampoo",
    name: "Oil Control Daily Shampoo",
    tagline: "Fresh roots, no squeaky feel",
    description:
      "A balancing clay-infused shampoo that absorbs excess oil without stripping the scalp.",
    category: "haircare",
    price: 1450,
    rating: 4.5,
    reviews: 720,
    image: "/products/hair-4.svg",
    gradient: "from-slate-200 via-zinc-100 to-neutral-100",
    size: "400 ml",
    highlights: ["Clay detox", "Daily use", "Pore-decongesting"],
    ingredients: ["White Clay", "Green Tea", "Salicylic Acid"],
    howToUse: "Lather, massage scalp 1 minute, rinse. Daily use.",
    concerns: ["oily-scalp", "dandruff"],
    hairType: ["oily"],
  },
  {
    id: "hc-005",
    slug: "silk-serum-frizz",
    name: "Silk Smoothing Serum",
    tagline: "Tames frizz, locks in shine",
    description:
      "A weightless hair serum with camellia oil that smooths flyaways and adds mirror-glass shine.",
    category: "haircare",
    price: 1750,
    rating: 4.7,
    reviews: 1140,
    newArrival: true,
    image: "/products/hair-5.svg",
    gradient: "from-fuchsia-200 via-pink-100 to-rose-100",
    size: "60 ml",
    highlights: ["Anti-frizz 24h", "Heat protect 230°C", "Non-greasy"],
    ingredients: ["Camellia Oil", "Silicone Blend", "Vitamin E"],
    howToUse: "Rub 2–3 drops between palms, work through mid-lengths to ends.",
    concerns: ["frizzy", "split-ends", "damaged"],
    hairType: ["all"],
  },

  // ── Health ───────────────────────────────────────────────
  {
    id: "ht-001",
    slug: "hemohim-immune",
    name: "HemoHIM Immune Support",
    tagline: "Clinical herbal immunity formula",
    description:
      "Atomy's signature immune booster — a clinically tested blend of Angelica, Cnidium, and Paeonia extracts that supports immune cells.",
    category: "health",
    price: 8900,
    rating: 4.9,
    reviews: 5421,
    bestseller: true,
    image: "/products/health-1.svg",
    gradient: "from-red-200 via-rose-100 to-pink-100",
    size: "60 pouches",
    highlights: ["Clinically tested", "No artificial colors", "Family favorite"],
    ingredients: ["Angelica Gigas", "Cnidium Officinale", "Paeonia Japonica"],
    howToUse: "Drink one pouch daily, preferably 30 minutes before a meal.",
    concerns: ["immunity", "fatigue"],
  },
  {
    id: "ht-002",
    slug: "probiotic-plus-10",
    name: "Probiotic Plus 10",
    tagline: "10 billion CFU for gut balance",
    description:
      "A shelf-stable multi-strain probiotic with prebiotic fiber — restores a balanced gut microbiome for better digestion.",
    category: "health",
    price: 3200,
    rating: 4.8,
    reviews: 2087,
    image: "/products/health-2.svg",
    gradient: "from-teal-200 via-emerald-100 to-green-100",
    size: "30 sachets",
    highlights: ["10 bn CFU", "10 strains", "With FOS prebiotic"],
    ingredients: ["L. acidophilus", "B. lactis", "FOS"],
    howToUse: "Take one sachet once a day, any time, directly on tongue or in water.",
    concerns: ["digestion", "immunity"],
  },
  {
    id: "ht-003",
    slug: "omega-3-plus",
    name: "Omega-3 EPA/DHA Plus",
    tagline: "Heart & brain support",
    description:
      "Ultra-pure molecularly distilled fish oil — 1000mg EPA/DHA per serving to support heart, brain, and eyes.",
    category: "health",
    price: 2400,
    rating: 4.7,
    reviews: 1342,
    image: "/products/health-3.svg",
    gradient: "from-blue-200 via-indigo-100 to-sky-100",
    size: "60 softgels",
    highlights: ["1000 mg EPA+DHA", "No fishy aftertaste", "IFOS certified"],
    ingredients: ["Fish Oil Concentrate", "Vitamin E"],
    howToUse: "Take 2 softgels daily with food.",
    concerns: ["heart-health", "eye-health", "joints"],
  },
  {
    id: "ht-004",
    slug: "collagen-peptide-drink",
    name: "Marine Collagen Peptide Drink",
    tagline: "Beauty from within",
    description:
      "5,000 mg of hydrolyzed marine collagen with vitamin C — supports skin elasticity, nails, and joint comfort.",
    category: "health",
    price: 4600,
    rating: 4.8,
    reviews: 2790,
    bestseller: true,
    newArrival: true,
    image: "/products/health-4.svg",
    gradient: "from-pink-200 via-rose-100 to-fuchsia-100",
    size: "30 bottles",
    highlights: ["5,000 mg collagen", "Low-molecular peptide", "Refreshing peach"],
    ingredients: ["Marine Collagen", "Vitamin C", "Hyaluronic Acid"],
    howToUse: "Drink one bottle daily, chilled for best taste.",
    concerns: ["joints", "immunity"],
  },
  {
    id: "ht-005",
    slug: "lutein-eye-support",
    name: "Lutein Eye Support",
    tagline: "For screen-fatigued eyes",
    description:
      "A daily capsule with 20 mg lutein and zeaxanthin — helps filter blue light and supports macular health.",
    category: "health",
    price: 2100,
    rating: 4.6,
    reviews: 612,
    image: "/products/health-5.svg",
    gradient: "from-yellow-200 via-amber-100 to-lime-100",
    size: "30 capsules",
    highlights: ["20 mg lutein", "Blue-light filter", "1/day"],
    ingredients: ["Lutein", "Zeaxanthin", "Vitamin A"],
    howToUse: "Take 1 capsule daily after lunch.",
    concerns: ["eye-health", "fatigue"],
  },
  {
    id: "ht-006",
    slug: "calcium-mag-d",
    name: "Calcium + Magnesium + D3",
    tagline: "Bones, sleep, and calm",
    description:
      "A balanced 2:1 calcium-magnesium complex with vitamin D3 — supports bone density and restful sleep.",
    category: "health",
    price: 1800,
    rating: 4.7,
    reviews: 984,
    image: "/products/health-6.svg",
    gradient: "from-stone-200 via-neutral-100 to-zinc-100",
    size: "90 tablets",
    highlights: ["2:1 Ca:Mg", "Vit D3 1000 IU", "Night-friendly"],
    ingredients: ["Calcium Citrate", "Magnesium Glycinate", "Vitamin D3"],
    howToUse: "Take 2 tablets with dinner.",
    concerns: ["bone-health", "sleep", "joints"],
  },
  {
    id: "ht-007",
    slug: "ginseng-energy-stick",
    name: "Red Ginseng Energy Stick",
    tagline: "Natural all-day energy",
    description:
      "6-year Korean red ginseng concentrate in convenient travel sticks — fights fatigue and boosts stamina.",
    category: "health",
    price: 3800,
    rating: 4.8,
    reviews: 1521,
    image: "/products/health-7.svg",
    gradient: "from-red-200 via-orange-100 to-amber-100",
    size: "30 sticks",
    highlights: ["6-yr red ginseng", "Stamina boost", "Sugar-free"],
    ingredients: ["Korean Red Ginseng Extract"],
    howToUse: "Tear one stick, consume directly. Up to 2 sticks daily.",
    concerns: ["fatigue", "immunity"],
  },
  {
    id: "ht-008",
    slug: "sleep-gummy-melatonin",
    name: "Dream Sleep Gummies",
    tagline: "Fall asleep faster, naturally",
    description:
      "Melatonin + L-theanine gummies with chamomile — helps you drift off in ~20 minutes without morning grogginess.",
    category: "health",
    price: 1600,
    rating: 4.5,
    reviews: 702,
    newArrival: true,
    image: "/products/health-8.svg",
    gradient: "from-violet-200 via-purple-100 to-indigo-100",
    size: "60 gummies",
    highlights: ["Melatonin 1 mg", "L-theanine 50 mg", "Berry flavor"],
    ingredients: ["Melatonin", "L-theanine", "Chamomile Extract"],
    howToUse: "Chew 1–2 gummies 30 minutes before bed.",
    concerns: ["sleep", "fatigue"],
  },

  // ── Personal Care ────────────────────────────────────────
  {
    id: "pc-001",
    slug: "toothpaste-herbal",
    name: "Herbal Mineral Toothpaste",
    tagline: "Clean, fresh, fluoride-balanced",
    description:
      "A low-abrasion herbal toothpaste with green tea, mint, and xylitol — whitens gently while protecting enamel.",
    category: "personal-care",
    price: 350,
    rating: 4.6,
    reviews: 2831,
    image: "/products/pc-1.svg",
    gradient: "from-teal-200 via-cyan-100 to-emerald-100",
    size: "150 g",
    highlights: ["Enamel-safe", "Xylitol", "Cool mint"],
    ingredients: ["Green Tea", "Mint Oil", "Xylitol", "Sodium Fluoride"],
    howToUse: "Brush twice daily for 2 minutes.",
    concerns: [],
  },
  {
    id: "pc-002",
    slug: "body-wash-rose",
    name: "Rose & Shea Body Wash",
    tagline: "Silky skin, lingering scent",
    description:
      "A creamy sulfate-free body wash with damask rose and shea butter — cleanses while locking in moisture.",
    category: "personal-care",
    price: 780,
    rating: 4.7,
    reviews: 940,
    image: "/products/pc-2.svg",
    gradient: "from-rose-200 via-pink-100 to-red-100",
    size: "500 ml",
    highlights: ["Sulfate-free", "Damask rose", "Silky lather"],
    ingredients: ["Damask Rose", "Shea Butter", "Glycerin"],
    howToUse: "Work into lather on wet skin, rinse.",
    concerns: ["dryness"],
    skinType: ["all"],
  },
  {
    id: "pc-003",
    slug: "hand-cream-jeju",
    name: "Jeju Hand Cream",
    tagline: "Fast-absorbing, never sticky",
    description:
      "A lightweight hand cream infused with Jeju green tea and camellia oil — absorbs quickly and leaves hands silky soft.",
    category: "personal-care",
    price: 450,
    rating: 4.8,
    reviews: 1876,
    image: "/products/pc-3.svg",
    gradient: "from-lime-200 via-green-100 to-emerald-100",
    size: "60 ml",
    highlights: ["Non-sticky", "Jeju green tea", "Handbag-size"],
    ingredients: ["Green Tea", "Camellia Oil", "Glycerin"],
    howToUse: "Apply a small amount to clean hands, massage until absorbed.",
    concerns: ["dryness"],
    skinType: ["all"],
  },
];

export const allCategories: { id: ProductCategory; label: string; description: string }[] = [
  { id: "skincare", label: "Skincare", description: "Cleansers, serums, masks, and sun care" },
  { id: "haircare", label: "Haircare", description: "Shampoos, tonics, and treatments" },
  { id: "health", label: "Health", description: "Supplements & functional foods" },
  { id: "personal-care", label: "Personal Care", description: "Everyday essentials for the whole family" },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (category: ProductCategory) =>
  products.filter((p) => p.category === category);
export const getBestsellers = () => products.filter((p) => p.bestseller);
export const getNewArrivals = () => products.filter((p) => p.newArrival);

export const recommendForConcerns = (concerns: string[], max = 6) => {
  if (!concerns.length) return products.slice(0, max);
  const scored = products.map((p) => {
    const score = concerns.reduce(
      (acc, c) => acc + (p.concerns.includes(c as never) ? 1 : 0),
      0,
    );
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
    .filter((x) => x.score > 0)
    .slice(0, max)
    .map((x) => x.p);
};
