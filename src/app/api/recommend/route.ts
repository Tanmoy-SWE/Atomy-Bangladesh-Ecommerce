import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  products,
  recommendForConcerns,
  type Product,
} from "@/lib/products";

export const runtime = "nodejs";
export const maxDuration = 60;

type ConsultationTarget = "skin" | "hair" | "scalp" | "general";

const allowedConcerns = [
  // skin
  "acne",
  "dryness",
  "oiliness",
  "wrinkles",
  "dark-spots",
  "sensitivity",
  "dullness",
  "redness",
  // hair
  "dandruff",
  "hair-fall",
  "dry-scalp",
  "oily-scalp",
  "damaged",
  "frizzy",
  "thinning",
  "split-ends",
  // health
  "immunity",
  "fatigue",
  "joints",
  "digestion",
  "sleep",
  "eye-health",
  "heart-health",
  "bone-health",
];

const systemPrompt = `You are a licensed beauty, haircare, and wellness consultant for Atomy Bangladesh.
You analyze user-submitted images of skin, hair, or scalp and/or text descriptions, then produce a structured analysis.
You never diagnose medical conditions — only describe visible characteristics and common cosmetic concerns.
Always return valid JSON that matches the schema the user describes, with no additional text.`;

function buildUserPrompt(target: ConsultationTarget, prompt: string) {
  const focus =
    target === "skin"
      ? "facial skin concerns (acne, hydration, tone, texture, spots, aging)"
      : target === "hair"
        ? "hair characteristics (damage, frizz, split-ends, fall)"
        : target === "scalp"
          ? "scalp conditions (dandruff, oiliness, dryness)"
          : "general wellness (sleep, energy, immunity, digestion)";

  return `Analyze the following for ${focus}.

User said: ${prompt ? `"${prompt}"` : "(no text provided)"}

Return strictly valid JSON with these keys:
{
  "summary": "one sentence, warm and specific, describing their overall situation (<= 140 chars)",
  "observations": ["3-5 specific, observable notes"],
  "concerns": ["2-5 concern tags from this allowed list: ${allowedConcerns.join(", ")}"],
  "routine": ["3-5 short, actionable routine steps"]
}

Only output the JSON object. No markdown, no prose.`;
}

function mockAnalysis(target: ConsultationTarget, prompt: string) {
  const lower = prompt.toLowerCase();
  const picks: string[] = [];
  const add = (c: string) => !picks.includes(c) && picks.push(c);

  if (target === "skin") {
    if (/acne|pimple|breakout/.test(lower)) add("acne");
    if (/dry|dehydrated|tight/.test(lower)) add("dryness");
    if (/oil|shiny|greasy/.test(lower)) add("oiliness");
    if (/dark|spot|pigment|tan/.test(lower)) add("dark-spots");
    if (/wrinkle|fine lines|aging/.test(lower)) add("wrinkles");
    if (/red|sensitive|irritat/.test(lower)) add("sensitivity");
    if (/dull|tired|glow/.test(lower)) add("dullness");
    if (!picks.length) picks.push("dullness", "dryness");
  } else if (target === "hair") {
    if (/fall|shed|thin/.test(lower)) add("hair-fall");
    if (/frizz|dry/.test(lower)) add("frizzy");
    if (/damage|bleach|color/.test(lower)) add("damaged");
    if (/split/.test(lower)) add("split-ends");
    if (!picks.length) picks.push("hair-fall", "frizzy");
  } else if (target === "scalp") {
    if (/dandruff|flake/.test(lower)) add("dandruff");
    if (/oil/.test(lower)) add("oily-scalp");
    if (/dry|itch/.test(lower)) add("dry-scalp");
    if (!picks.length) picks.push("dandruff");
  } else {
    if (/sleep|insomnia|tired/.test(lower)) add("sleep");
    if (/energy|fatigue|tired/.test(lower)) add("fatigue");
    if (/immun|cold|flu/.test(lower)) add("immunity");
    if (/joint|knee/.test(lower)) add("joints");
    if (/eye|screen/.test(lower)) add("eye-health");
    if (!picks.length) picks.push("immunity", "fatigue");
  }

  return {
    summary: `Based on what you shared, your ${target === "general" ? "wellness" : target} will respond well to a gentle, targeted routine.`,
    observations: defaultObservations(target, picks),
    concerns: picks,
    routine: defaultRoutine(target, picks),
  };
}

function defaultObservations(target: ConsultationTarget, concerns: string[]) {
  const humanize = (c: string) => c.replace("-", " ");
  const obs: string[] = [];
  if (target === "skin") {
    obs.push("Skin texture appears to need consistent hydration and barrier support.");
    if (concerns.includes("acne")) obs.push("Occasional congestion likely benefits from gentle exfoliation.");
    if (concerns.includes("dark-spots")) obs.push("Uneven tone can be visibly improved with antioxidants and SPF.");
  } else if (target === "hair") {
    obs.push("Mid-lengths and ends could use protein + moisture rebalancing.");
    if (concerns.includes("hair-fall")) obs.push("Strengthening the follicle with caffeine/biotin may help density.");
  } else if (target === "scalp") {
    obs.push("Scalp may benefit from a reset followed by soothing maintenance.");
  } else {
    obs.push("A balanced mix of targeted nutrients should help support your daily baseline.");
  }
  if (!obs.length) obs.push(`Primary areas to focus on: ${concerns.map(humanize).join(", ")}.`);
  return obs;
}

function defaultRoutine(target: ConsultationTarget, concerns: string[]) {
  if (target === "skin") {
    return [
      "AM: Gentle cleanse → antioxidant serum → moisturizer → SPF.",
      "PM: Double cleanse → treatment (retinoid / spot corrector) → rich moisturizer.",
      "Weekly: Calming sheet mask; avoid over-exfoliation.",
      "Drink 2L water daily and aim for 7–8 hours of sleep.",
    ];
  }
  if (target === "hair") {
    return [
      "Shampoo 3x/week, focus on scalp.",
      "Follow with a strengthening conditioner or mask.",
      "Heat-protect before styling.",
      "Trim split ends every 6–8 weeks.",
    ];
  }
  if (target === "scalp") {
    return [
      "Use a scalp-specific shampoo, massage for 60 seconds.",
      "Apply leave-in tonic to target concern area.",
      "Avoid over-washing with harsh cleansers.",
      concerns.includes("dandruff")
        ? "Stick with anti-flake routine for at least 14 days."
        : "Keep scalp well-hydrated.",
    ];
  }
  return [
    "Take supplements with meals for best absorption.",
    "Prioritize 7+ hours of sleep.",
    "Move for at least 30 minutes daily.",
    "Hydrate consistently through the day.",
  ];
}

async function analyzeWithOpenAI(
  target: ConsultationTarget,
  prompt: string,
  imageDataUrl: string | null,
) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const openai = new OpenAI({ apiKey: key });
  const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [
    { type: "text", text: buildUserPrompt(target, prompt) },
  ];
  if (imageDataUrl) {
    userContent.push({ type: "image_url", image_url: { url: imageDataUrl } });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
  });

  const text = completion.choices[0]?.message?.content ?? "";
  if (!text) return null;

  try {
    const parsed = JSON.parse(text) as {
      summary?: string;
      observations?: string[];
      concerns?: string[];
      routine?: string[];
    };
    const concerns = (parsed.concerns ?? [])
      .map((c) => c.toLowerCase().trim())
      .filter((c) => allowedConcerns.includes(c));

    return {
      summary: parsed.summary ?? "Here are some suggestions tailored to you.",
      observations: parsed.observations ?? [],
      concerns,
      routine: parsed.routine ?? [],
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const target = (form.get("target") as ConsultationTarget) || "skin";
    const prompt = (form.get("prompt") as string) || "";
    const image = form.get("image");

    let imageDataUrl: string | null = null;
    if (image instanceof File && image.size > 0) {
      if (image.size > 8 * 1024 * 1024) {
        return NextResponse.json({ error: "Image exceeds 8MB limit." }, { status: 400 });
      }
      const buf = Buffer.from(await image.arrayBuffer());
      const mime = image.type || "image/jpeg";
      imageDataUrl = `data:${mime};base64,${buf.toString("base64")}`;
    }

    let analysis = await analyzeWithOpenAI(target, prompt, imageDataUrl);
    let mock = false;
    if (!analysis) {
      analysis = mockAnalysis(target, prompt);
      mock = true;
    }

    let picks: Product[] = recommendForConcerns(analysis.concerns, 6);
    if (picks.length < 3) {
      const fallbackCategory =
        target === "skin"
          ? "skincare"
          : target === "hair" || target === "scalp"
            ? "haircare"
            : "health";
      picks = products.filter((p) => p.category === fallbackCategory).slice(0, 6);
    }

    return NextResponse.json({
      analysis: { target, ...analysis, mock },
      products: picks,
    });
  } catch (err) {
    console.error("recommend error", err);
    return NextResponse.json(
      { error: "We couldn't process that — please try again." },
      { status: 500 },
    );
  }
}
