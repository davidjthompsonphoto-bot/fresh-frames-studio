import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import { portfolios } from "@/data/portfolio";

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const portfolio = portfolios.find(p => p.slug === slug);

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

  // Find adjacent portfolios
  const idx = portfolios.findIndex(p => p.slug === slug);
  const prev = portfolios[idx - 1];
  const next = portfolios[idx + 1];

  return (
    <div className="bg-background min-h-screen">
      <Nav />
      <main className="pt-24 px-8 pb-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-none tracking-tight text-foreground uppercase">
            {portfolio.title}
          </h2>
          {portfolio.caption && (
            <p className="font-serif italic text-[clamp(1rem,1.6vw,1.35rem)] text-foreground/70 mt-3 ml-1 tracking-widest">
              {portfolio.caption}
            </p>
          )}
        </motion.div>

        {/* Images */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {portfolio.images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="break-inside-avoid overflow-hidden relative"
            >
              <img
                src={src}
                alt={`${portfolio.title} ${i + 1}`}
                className="w-full block"
              />
              {["viva-la-linda", "please-sir"].includes(portfolio.slug) && (
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 20px hsl(var(--background))" }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-border">
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-foreground opacity-40 group-hover:opacity-100 transition-opacity">← Previous</span>
              <span className="font-display text-xl tracking-widest text-foreground uppercase">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/work/${next.slug}`} className="group flex flex-col gap-1 items-end text-right">
              <span className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-foreground opacity-40 group-hover:opacity-100 transition-opacity">Next →</span>
              <span className="font-display text-xl tracking-widest text-foreground uppercase">{next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
