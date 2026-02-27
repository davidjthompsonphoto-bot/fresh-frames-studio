import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import SEO from "@/components/SEO";
import { portfolios } from "@/data/portfolio";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Per-slug object-position overrides to keep the model centred in the thumbnail crop
const objectPosition: Record<string, string> = {
  "the-national": "90% center",
  "mlle-birkin":  "95% center",
};

// Slugs whose images have baked-in black edges — use inset shadow to hide them
const REMOVE_EDGE_SLUGS = new Set(["viva-la-linda", "please-sir"]);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://davidthompsonphotography.com/work#webpage",
  "url": "https://davidthompsonphotography.com/work",
  "name": "Work — David Thompson Photography",
  "description": "Fashion and beauty photography portfolio by David Thompson — editorial series for Vogue, Marie-Claire, The New York Times Magazine and more.",
  "isPartOf": { "@id": "https://davidthompsonphotography.com/#website" },
};

export default function Work() {
  const randomised = useMemo(() => shuffle(portfolios), []);
  return (
    <div className="bg-background min-h-screen">
      <SEO
        title="Work — David Thompson Photography"
        description="Fashion and beauty photography portfolio by David Thompson — editorial series for Vogue, Marie-Claire, The New York Times Magazine and more."
        canonicalPath="/work"
        jsonLd={jsonLd}
      />
      <Nav />
      <main className="pt-24 px-8 pb-16">
        <motion.h2
          className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          WORK
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {randomised.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Link to={`/work/${p.slug}`} className="group block relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-background relative">
                  <img
                    src={p.images[0]}
                    alt={`${p.title}${p.client ? ` — ${p.client}` : ""} by David Thompson`}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{ objectPosition: objectPosition[p.slug] ?? "center" }}
                    loading="lazy"
                  />
                  {REMOVE_EDGE_SLUGS.has(p.slug) && (
                    <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 20px hsl(var(--background))" }} />
                  )}
                </div>
                
                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-background">
                    {p.client ?? p.title}
                  </span>
                </div>
              </Link>
              <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-foreground opacity-40 mt-1 px-0.5 truncate">
                {p.title}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
