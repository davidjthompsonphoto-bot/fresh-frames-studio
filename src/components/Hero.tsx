import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { heroPool } from "@/data/portfolio";

function seededShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  let seed = Date.now();
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(seed) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Each "cluster" places several images in a loose overlapping group.
// Positions are expressed as percentages of the container width/height.
// z-index layering is defined per slot.
interface ClusterSlot {
  // left/top as percentage of the 1200px wide container
  left: number; // px
  top: number;  // px
  width: number; // px
  zIndex: number;
}

// Hand-crafted clusters of overlapping images.
// Container is 100% width; we use absolute px values that scale via a transform.
// Each cluster has 2-4 slots. We spread clusters vertically so the page scrolls.
// Images placed in loose groups with generous white space.
// Adjacent groups nudge into each other only slightly (~80-120px overlap).
const CLUSTERS: ClusterSlot[][] = [
  // Cluster 1 — wide landscape left, small portrait right
  [
    { left: 30,   top: 0,    width: 520, zIndex: 1 },
    { left: 720,  top: 60,   width: 300, zIndex: 2 },
  ],
  // Cluster 2 — offset right, slight vertical nudge into cluster 1
  [
    { left: 140,  top: 580,  width: 340, zIndex: 2 },
    { left: 520,  top: 520,  width: 500, zIndex: 1 },
  ],
  // Cluster 3 — three images, generous gaps
  [
    { left: 20,   top: 1160, width: 300, zIndex: 1 },
    { left: 380,  top: 1100, width: 440, zIndex: 2 },
    { left: 860,  top: 1140, width: 280, zIndex: 1 },
  ],
  // Cluster 4 — large centred image with small companion
  [
    { left: 60,   top: 1740, width: 560, zIndex: 1 },
    { left: 680,  top: 1800, width: 320, zIndex: 2 },
  ],
  // Cluster 5 — scattered trio
  [
    { left: 10,   top: 2360, width: 280, zIndex: 2 },
    { left: 340,  top: 2300, width: 460, zIndex: 1 },
    { left: 840,  top: 2340, width: 320, zIndex: 2 },
  ],
];

const CONTAINER_HEIGHT = 3600; // px — tall enough for bottom images to fully render

export default function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const slots = useMemo(() => {
    const shuffled = seededShuffle(heroPool);
    // Cycle through images if we have fewer than slots
    const result: Array<ClusterSlot & { src: string; title: string; slug: string }> = [];
    let idx = 0;
    for (const cluster of CLUSTERS) {
      for (const slot of cluster) {
        const img = shuffled[idx % shuffled.length];
        result.push({ ...slot, src: img.src, title: img.title, slug: img.slug });
        idx++;
      }
    }
    return result;
  }, []);

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

      {/* Overlapping collage — absolutely positioned within a fixed-height container */}
      <div
        className="relative w-full"
        style={{ height: `${CONTAINER_HEIGHT}px` }}
      >
        {slots.map((slot, i) => (
          <motion.div
            key={`${slot.slug}-${i}`}
            className="absolute"
            style={{
              left: `${(slot.left / 1200) * 100}%`,
              top: slot.top,
              width: `${(slot.width / 1200) * 100}%`,
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
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0" />
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
