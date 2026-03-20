import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SEO from "@/components/SEO";
import { portfolios } from "@/data/portfolio";

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const portfolio = portfolios.find(p => p.slug === slug);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [prev] = useState(() => {
    const lastSlug = sessionStorage.getItem("lastVisitedStory");
    return lastSlug ? portfolios.find(p => p.slug === lastSlug) ?? null : null;
  });
  const [next] = useState(() => {
    const others = portfolios.filter(p => p.slug !== slug);
    return others[Math.floor(Math.random() * others.length)];
  });

  // Scroll to top on every story load
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Record this story as the last visited
  useEffect(() => { sessionStorage.setItem("lastVisitedStory", slug ?? ""); }, [slug]);

  const jsonLd = useMemo(() => portfolio ? ({
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `https://davidthompsonphotography.com/work/${portfolio.slug}#webpage`,
    "url": `https://davidthompsonphotography.com/work/${portfolio.slug}`,
    "name": `${portfolio.title} — David Thompson Photography`,
    "description": portfolio.caption || `${portfolio.title} — fashion and beauty photography by David Thompson.`,
    "author": { "@id": "https://davidthompsonphotography.com/#person" },
    "image": portfolio.images.slice(0, 3).map(src => ({ "@type": "ImageObject", "url": src })),
  }) : null, [portfolio]);

  if (!portfolio) {
    return (
      <div className="bg-background min-h-screen">
        <Nav />
        <div className="pt-32 px-8">
          <p className="font-sans text-sm text-muted-foreground">Series not found.</p>
          <Link to="/" className="font-sans text-xs tracking-widest uppercase underline mt-4 inline-block">← Back</Link>
        </div>
      </div>
    );
  }

  const idx = portfolios.findIndex(p => p.slug === slug);
  const needsEdgeFix = ["viva-la-linda", "please-sir"].includes(portfolio.slug);

  return (
    <div className="bg-background min-h-screen">
      <SEO
        title={`${portfolio.title} — David Thompson Photography`}
        description={portfolio.caption || `${portfolio.title} — fashion and beauty photography by David Thompson.`}
        canonicalPath={`/work/${portfolio.slug}`}
        ogImage={portfolio.images[0]}
        ogType="article"
        jsonLd={jsonLd ?? undefined}
      />
      <Nav />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[999] bg-background flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-8 font-sans text-[0.9rem] sm:text-[0.6rem] tracking-[0.25em] uppercase text-foreground opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
            <motion.img
              src={lightbox}
              alt=""
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 px-8 mb-10"
        >
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tight text-foreground uppercase">
            {portfolio.title}
          </h2>
          {portfolio.caption && (
            <p className="font-sans text-[0.75rem] sm:text-[clamp(0.5rem,0.8vw,0.675rem)] text-foreground/70 mt-3 ml-1 tracking-widest uppercase">
              {portfolio.caption}
            </p>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-10 pb-8 border-b border-border px-8">
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="font-sans text-[0.825rem] sm:text-[0.55rem] tracking-[0.2em] uppercase text-foreground opacity-40 group-hover:opacity-100 transition-opacity">← Previous</span>
              <span className="font-display text-xl tracking-widest text-foreground uppercase">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/work/${next.slug}`} className="group flex flex-col gap-1 sm:items-end sm:text-right">
              <span className="font-sans text-[0.825rem] sm:text-[0.55rem] tracking-[0.2em] uppercase text-foreground opacity-40 group-hover:opacity-100 transition-opacity">Next →</span>
              <span className="font-display text-xl tracking-widest text-foreground uppercase">{next.title}</span>
            </Link>
          ) : <div />}
        </div>

        {/* Images — grid */}
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden relative cursor-pointer"
              onClick={() => setLightbox(src)}
            >
              <img
                src={src}
                alt={`${portfolio.title} ${i + 1}`}
                className="w-full block"
              />
              {needsEdgeFix && (
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 20px hsl(var(--background))" }} />
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
