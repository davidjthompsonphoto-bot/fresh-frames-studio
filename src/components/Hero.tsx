import { useMemo } from "react";
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
const CLUSTERS: ClusterSlot[][] = [
  // Cluster 1 — top left heavy, one portrait overlapping a landscape
  [
    { left: 20,  top: 0,   width: 480, zIndex: 1 },
    { left: 380, top: 60,  width: 320, zIndex: 2 },
    { left: 700, top: 20,  width: 380, zIndex: 1 },
  ],
  // Cluster 2 — right-aligned trio
  [
    { left: 60,  top: 820,  width: 300, zIndex: 1 },
    { left: 300, top: 760,  width: 500, zIndex: 2 },
    { left: 740, top: 800,  width: 360, zIndex: 3 },
    { left: 1020,top: 780,  width: 220, zIndex: 2 },
  ],
  // Cluster 3
  [
    { left: 10,  top: 1560, width: 420, zIndex: 2 },
    { left: 360, top: 1620, width: 280, zIndex: 3 },
    { left: 580, top: 1540, width: 440, zIndex: 1 },
    { left: 960, top: 1580, width: 300, zIndex: 2 },
  ],
  // Cluster 4
  [
    { left: 100, top: 2340, width: 340, zIndex: 1 },
    { left: 380, top: 2280, width: 500, zIndex: 2 },
    { left: 820, top: 2320, width: 360, zIndex: 1 },
  ],
  // Cluster 5
  [
    { left: 20,  top: 3060, width: 260, zIndex: 2 },
    { left: 240, top: 3000, width: 460, zIndex: 1 },
    { left: 640, top: 3040, width: 320, zIndex: 3 },
    { left: 900, top: 3020, width: 280, zIndex: 2 },
  ],
];

const TOTAL_SLOTS = CLUSTERS.reduce((sum, c) => sum + c.length, 0);
const CONTAINER_HEIGHT = 3600; // px — full scroll height of the collage

export default function Hero() {
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
          className="font-display text-[clamp(4rem,11vw,13rem)] leading-[0.9] tracking-tight text-foreground font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          DAVID<br />THOMPSON
        </motion.h1>
        <motion.p
          className="font-serif italic text-[clamp(0.85rem,1.3vw,1.1rem)] text-foreground/50 mt-3 ml-1 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Fashion &amp; Beauty Photographer — London
        </motion.p>
      </div>

      {/* Overlapping collage — absolutely positioned within a fixed-height container */}
      <div
        className="relative w-full overflow-hidden"
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
              zIndex: slot.zIndex,
            }}
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
                <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-25 transition-opacity duration-400" />
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
