import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { heroPool } from "@/data/portfolio";

// Seeded random shuffle using current timestamp so it changes each reload
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

// A single image block in the collage layout
interface ImageBlock {
  src: string;
  title: string;
  slug: string;
  // Column span: 1, 2, or 3 out of a 12-col grid
  colSpan: number;
  // Optional alignment offset (margin-left as col offset)
  colStart: number;
}

// Pre-defined row templates: each row has image slot definitions
// colStart is 1-based out of 12 columns, colSpan is width
const ROW_TEMPLATES: { colStart: number; colSpan: number }[][] = [
  // Row 1: large left + small right
  [{ colStart: 1, colSpan: 7 }, { colStart: 9, colSpan: 4 }],
  // Row 2: small left offset + large right
  [{ colStart: 2, colSpan: 4 }, { colStart: 7, colSpan: 6 }],
  // Row 3: three images
  [{ colStart: 1, colSpan: 4 }, { colStart: 5, colSpan: 4 }, { colStart: 10, colSpan: 3 }],
  // Row 4: centred large
  [{ colStart: 3, colSpan: 8 }],
  // Row 5: two even
  [{ colStart: 1, colSpan: 5 }, { colStart: 7, colSpan: 5 }],
  // Row 6: small + large offset
  [{ colStart: 1, colSpan: 3 }, { colStart: 5, colSpan: 7 }],
  // Row 7: large left
  [{ colStart: 1, colSpan: 6 }, { colStart: 8, colSpan: 4 }],
  // Row 8: three
  [{ colStart: 2, colSpan: 3 }, { colStart: 6, colSpan: 4 }, { colStart: 11, colSpan: 2 }],
];

function buildLayout(images: typeof heroPool): ImageBlock[] {
  const shuffled = seededShuffle(images);
  const blocks: ImageBlock[] = [];
  let imgIdx = 0;

  for (const row of ROW_TEMPLATES) {
    for (const slot of row) {
      if (imgIdx >= shuffled.length) break;
      blocks.push({
        src: shuffled[imgIdx].src,
        title: shuffled[imgIdx].title,
        slug: shuffled[imgIdx].slug,
        colSpan: slot.colSpan,
        colStart: slot.colStart,
      });
      imgIdx++;
    }
    if (imgIdx >= shuffled.length) break;
  }

  return blocks;
}

export default function Hero() {
  const layout = useMemo(() => buildLayout(heroPool), []);

  return (
    <section className="bg-background w-full">
      {/* Hero header */}
      <div className="px-8 pt-12 pb-8">
        <motion.h1
          className="font-display text-[clamp(4.5rem,13vw,15rem)] leading-[0.88] tracking-tight text-foreground font-black"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          DAVID<br />THOMPSON
        </motion.h1>
        <motion.p
          className="font-serif italic text-[clamp(0.9rem,1.4vw,1.15rem)] text-foreground opacity-50 mt-3 ml-1 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Fashion &amp; Beauty Photographer — London
        </motion.p>
      </div>

      {/* Collage grid — 12-col CSS grid, no cropping, straight */}
      <div
        className="px-6 pb-24"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "clamp(6px, 1vw, 14px)",
          alignItems: "start",
        }}
      >
        {layout.map((block, i) => (
          <motion.div
            key={`${block.slug}-${i}`}
            style={{
              gridColumn: `${block.colStart} / span ${block.colSpan}`,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
          >
            <Link to={`/work/${block.slug}`} className="group block">
              <div className="relative overflow-hidden">
                {/* No cropping: natural aspect ratio preserved */}
                <img
                  src={block.src}
                  alt={block.title}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-30 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-background bg-foreground px-1.5 py-0.5">
                    {block.title}
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
