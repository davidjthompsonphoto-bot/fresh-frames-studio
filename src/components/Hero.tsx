import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { heroPool } from "@/data/portfolio";

function randomShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface ClusterSlot {
  left: number; // px within 1200px container
  top: number;
  width: number;
  zIndex: number;
}

// Desktop clusters (1200px reference)
const CLUSTERS_DESKTOP: ClusterSlot[][] = [
  [
    { left: 30,  top: 0,    width: 520, zIndex: 1 },
    { left: 720, top: 60,   width: 300, zIndex: 2 },
  ],
  [
    { left: 140, top: 580,  width: 340, zIndex: 2 },
    { left: 520, top: 520,  width: 500, zIndex: 1 },
  ],
  [
    { left: 20,  top: 1160, width: 300, zIndex: 1 },
    { left: 380, top: 1100, width: 440, zIndex: 2 },
    { left: 860, top: 1140, width: 280, zIndex: 1 },
  ],
  [
    { left: 60,  top: 1740, width: 560, zIndex: 1 },
    { left: 680, top: 1800, width: 320, zIndex: 2 },
  ],
  [
    { left: 10,  top: 2360, width: 280, zIndex: 2 },
    { left: 340, top: 2300, width: 460, zIndex: 1 },
    { left: 840, top: 2340, width: 320, zIndex: 2 },
  ],
];
const CONTAINER_HEIGHT_DESKTOP = 3600;

// Tablet clusters (768px reference) — tighter vertical gaps, more overlap
const CLUSTERS_TABLET: ClusterSlot[][] = [
  [
    { left: 20,  top: 0,   width: 380, zIndex: 1 },
    { left: 460, top: 50,  width: 260, zIndex: 2 },
  ],
  [
    { left: 80,  top: 400, width: 260, zIndex: 2 },
    { left: 360, top: 360, width: 360, zIndex: 1 },
  ],
  [
    { left: 10,  top: 800, width: 220, zIndex: 1 },
    { left: 270, top: 760, width: 320, zIndex: 2 },
    { left: 620, top: 790, width: 200, zIndex: 1 },
  ],
  [
    { left: 40,  top: 1180, width: 400, zIndex: 1 },
    { left: 480, top: 1230, width: 240, zIndex: 2 },
  ],
  [
    { left: 10,  top: 1560, width: 200, zIndex: 2 },
    { left: 240, top: 1510, width: 340, zIndex: 1 },
    { left: 610, top: 1545, width: 220, zIndex: 2 },
  ],
];
const CONTAINER_HEIGHT_TABLET = 2200;

// Mobile clusters (390px reference) — single + overlapping pairs
const CLUSTERS_MOBILE: ClusterSlot[][] = [
  [
    { left: 10,  top: 0,   width: 240, zIndex: 1 },
    { left: 180, top: 60,  width: 170, zIndex: 2 },
  ],
  [
    { left: 20,  top: 320, width: 200, zIndex: 2 },
    { left: 190, top: 280, width: 175, zIndex: 1 },
  ],
  [
    { left: 5,   top: 620, width: 170, zIndex: 1 },
    { left: 185, top: 590, width: 185, zIndex: 2 },
  ],
  [
    { left: 15,  top: 920, width: 220, zIndex: 1 },
    { left: 200, top: 970, width: 160, zIndex: 2 },
  ],
  [
    { left: 10,  top: 1220, width: 175, zIndex: 2 },
    { left: 185, top: 1185, width: 190, zIndex: 1 },
  ],
];
const CONTAINER_HEIGHT_MOBILE = 1660;

// Letter positions — scaled to each breakpoint's container width
const INITIALS_DESKTOP = (rand: number[]) => [
  { letter: "D", left: rand[0] * 600 + 50,  top: 80,   ref: 1200 },
  { letter: "J", left: rand[1] * 600 + 50,  top: 1020, ref: 1200 },
  { letter: "T", left: rand[2] * 600 + 50,  top: 2100, ref: 1200 },
];
const INITIALS_TABLET = (rand: number[]) => [
  { letter: "D", left: rand[0] * 300 + 20, top: 50,   ref: 768 },
  { letter: "J", left: rand[1] * 300 + 20, top: 760,  ref: 768 },
  { letter: "T", left: rand[2] * 300 + 20, top: 1500, ref: 768 },
];
const INITIALS_MOBILE = (rand: number[]) => [
  { letter: "D", left: rand[0] * 60 + 10, top: 20,  ref: 390 },
  { letter: "J", left: rand[1] * 60 + 10, top: 600, ref: 390 },
  { letter: "T", left: rand[2] * 60 + 10, top: 1200, ref: 390 },
];

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">(() => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 640) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  });

  useMemo(() => {
    const handler = () => {
      if (window.innerWidth < 640) setBp("mobile");
      else if (window.innerWidth < 1024) setBp("tablet");
      else setBp("desktop");
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return bp;
}

export default function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const bp = useBreakpoint();

  const rand = useMemo(() => [Math.random(), Math.random(), Math.random()], []);

  const clusters =
    bp === "mobile" ? CLUSTERS_MOBILE :
    bp === "tablet" ? CLUSTERS_TABLET :
    CLUSTERS_DESKTOP;

  const containerHeight =
    bp === "mobile" ? CONTAINER_HEIGHT_MOBILE :
    bp === "tablet" ? CONTAINER_HEIGHT_TABLET :
    CONTAINER_HEIGHT_DESKTOP;

  const initials =
    bp === "mobile" ? INITIALS_MOBILE(rand) :
    bp === "tablet" ? INITIALS_TABLET(rand) :
    INITIALS_DESKTOP(rand);

  // Letter font size — smaller on mobile so it doesn't over-crop
  const letterSize =
    bp === "mobile"  ? "clamp(280px, 88vw, 380px)" :
    bp === "tablet"  ? "clamp(420px, 90vw, 700px)" :
    "clamp(600px, 93vw, 1125px)";

  const slots = useMemo(() => {
    const shuffled = randomShuffle(heroPool);
    const result: Array<ClusterSlot & { src: string; title: string; slug: string }> = [];
    let idx = 0;
    for (const cluster of clusters) {
      for (const slot of cluster) {
        const img = shuffled[idx % shuffled.length];
        result.push({ ...slot, src: img.src, title: img.title, slug: img.slug });
        idx++;
      }
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bp]);

  const refWidth = bp === "mobile" ? 390 : bp === "tablet" ? 768 : 1200;

  return (
    <section className="bg-background w-full">
      {/* Hero header */}
      <div className="px-8 pt-12 pb-10">
        <motion.h1
          className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          DAVID<br />THOMPSON
        </motion.h1>
        <motion.p
          className="font-serif italic text-[clamp(1rem,1.6vw,1.35rem)] text-foreground/70 mt-3 ml-1 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Fashion &amp; Beauty Photographer
        </motion.p>
      </div>

      {/* Overlapping collage */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${containerHeight}px` }}
      >
        {/* Initials */}
        {initials.map(({ letter, left, top, ref }) => (
          <div
            key={letter}
            className="absolute pointer-events-none select-none font-display text-foreground leading-none"
            style={{
              left: `${(left / ref) * 100}%`,
              top,
              zIndex: 300,
              fontSize: letterSize,
              lineHeight: 0.85,
              fontWeight: 900,
              fontStyle: "italic",
              fontVariationSettings: "'wght' 900",
            }}
          >
            {letter}
          </div>
        ))}

        {slots.map((slot, i) => (
          <motion.div
            key={`${slot.slug}-${i}-${bp}`}
            className="absolute"
            style={{
              left: `${(slot.left / refWidth) * 100}%`,
              top: slot.top,
              width: `${(slot.width / refWidth) * 100}%`,
              zIndex: hoveredIdx === i ? 100 : slot.zIndex,
              transition: "z-index 0s",
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: (i % 3) * 0.08 }}
          >
            <Link to={`/work/${slot.slug}`} className="group block">
              <div className="relative">
                <img
                  src={slot.src}
                  alt={slot.title}
                  className="w-full h-auto block"
                />
                {["viva-la-linda", "please-sir"].includes(slot.slug) && (
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 20px hsl(var(--background))" }} />
                )}
                <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-background bg-foreground px-1.5 py-0.5">
                    {slot.title}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
