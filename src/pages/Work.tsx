import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import { portfolios } from "@/data/portfolio";

export default function Work() {
  return (
    <div className="bg-background min-h-screen">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5">
          {portfolios.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Link to={`/work/${p.slug}`} className="group block relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-background">
                    {p.title}
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
