import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import SEO from "@/components/SEO";
import contactFullbleed from "@/assets/contact-fullbleed.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://davidthompsonphotography.com/contact#webpage",
  "url": "https://davidthompsonphotography.com/contact",
  "name": "Contact — David Thompson Photography",
  "description": "Commission David Thompson for fashion, beauty, bridal or luxury advertising photography. Based in London, available for international work.",
  "isPartOf": { "@id": "https://davidthompsonphotography.com/#website" },
  "about": { "@id": "https://davidthompsonphotography.com/#person" },
};

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      {/* Full bleed background image */}
      <img
        src={contactFullbleed}
        alt="David Thompson"
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ zIndex: 0 }}
      />
      {/* Subtle dark overlay for text legibility */}
      

      <div className="relative" style={{ zIndex: 2 }}>
        <Nav />
        <main className="pt-24 px-8 pb-24">
          <motion.h2
            className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight text-white mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            CONTACT
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-widest text-white mb-2">EMAIL</h3>
                <a
                  href="mailto:thompson@mail.com"
                  className="font-sans text-lg text-white/70 hover:text-white transition-colors"
                >
                  thompson@mail.com
                </a>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold tracking-widest text-white mb-3">AGENTS</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/50">UK</p>
                    <a href="mailto:thompson@mail.com" className="font-sans text-base text-white/70 hover:text-white transition-colors">
                      Direct
                    </a>
                  </div>
                  <div>
                    <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/50">Italy</p>
                    <a href="mailto:vittoria@photogroupservice.com" className="font-sans text-base text-white/70 hover:text-white transition-colors">
                      Photogroup Service
                    </a>
                  </div>
                  <div>
                    <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/50">Spain</p>
                    <a href="mailto:info@davidecampi.com" className="font-sans text-base text-white/70 hover:text-white transition-colors">
                      Davide Campi Artist Representatives
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
