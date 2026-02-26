import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { heroImages } from "@/data/portfolio";

// Seeded shuffle so it changes on each reload (based on timestamp)
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  // Use date-based seed so it changes each time
  let seed = Date.now();
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(seed) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface ImagePlacement {
  src: string;
  title: string;
  x: string;    // left %
  y: string;    // top %
  w: string;    // width in vw or px
  rotate: number;
  zIndex: number;
  aspectRatio: string;
}

function generateLayout(images: { src: string; title: string }[]): ImagePlacement[] {
  // Pick 7-9 images to scatter
  const shuffled = shuffleArray(images);
  const count = 8;
  const selected = shuffled.slice(0, count);

  // Pre-defined zone templates so they don't all stack in one corner
  const zones = [
    { x: 3, y: 12, w: 22, r: -2 },
    { x: 28, y: 5, w: 18, r: 1.5 },
    { x: 50, y: 8, w: 28, r: -1 },
    { x: 74, y: 14, w: 18, r: 2 },
    { x: 8, y: 50, w: 20, r: 1 },
    { x: 32, y: 42, w: 26, r: -1.5 },
    { x: 60, y: 46, w: 20, r: 1 },
    { x: 78, y: 52, w: 16, r: -2 },
  ];

  const aspectRatios = [
    "3/4", "4/5", "2/3", "3/4", "4/3", "2/3", "3/4", "4/5",
  ];

  return selected.map((img, i) => {
    const zone = zones[i % zones.length];
    // Randomize slightly around zone
    const seed = (i * 137 + Date.now()) % 1000;
    const jitterX = ((seed % 5) - 2) * 1.5;
    const jitterY = (((seed * 7) % 7) - 3) * 2;

    return {
      src: img.src,
      title: img.title,
      x: `${Math.min(80, Math.max(0, zone.x + jitterX))}%`,
      y: `${Math.min(72, Math.max(8, zone.y + jitterY))}%`,
      w: `${zone.w}vw`,
      rotate: zone.r + ((seed % 5) - 2) * 0.4,
      zIndex: i + 1,
      aspectRatio: aspectRatios[i % aspectRatios.length],
    };
  });
}

export default function Hero() {
  const [layout] = useState<ImagePlacement[]>(() =>
    generateLayout(heroImages)
  );
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Big editorial title */}
      <motion.div
        className="absolute bottom-8 left-8 z-50 pointer-events-none select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h1 className="font-display text-[clamp(4rem,12vw,14rem)] leading-none tracking-tight text-foreground">
          DAVID<br />THOMPSON
        </h1>
        <p className="font-serif italic text-[clamp(0.9rem,1.5vw,1.2rem)] tracking-widest text-foreground opacity-60 mt-1 ml-1">
          Fashion &amp; Beauty Photographer — London
        </p>
      </motion.div>

      {/* Scattered images */}
      {layout.map((img, i) => (
        <motion.div
          key={`${img.src}-${i}`}
          className="absolute cursor-pointer"
          style={{
            left: img.x,
            top: img.y,
            width: img.w,
            zIndex: hovered === i ? 50 : img.zIndex,
            rotate: img.rotate,
            aspectRatio: img.aspectRatio,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          whileHover={{ scale: 1.03, zIndex: 50 }}
          onHoverStart={() => setHovered(i)}
          onHoverEnd={() => setHovered(null)}
        >
          <Link to={`/work/${img.title.toLowerCase().replace(/[\s,\.]+/g, "-")}`}>
            <div className="relative w-full h-full overflow-hidden group">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
                style={{ aspectRatio: img.aspectRatio }}
              />
              <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-background bg-foreground px-1 py-0.5">
                  {img.title}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Scroll hint */}
      <motion.div
        className="absolute top-24 right-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
      >
        <p
          className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-foreground"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </p>
      </motion.div>
    </div>
  );
}
