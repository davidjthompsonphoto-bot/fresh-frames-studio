import { motion } from "framer-motion";
import Nav from "@/components/Nav";

export default function Contact() {
  return (
    <div className="bg-background min-h-screen">
      <Nav />
      <main className="pt-24 px-8 pb-24">
        <motion.h2
          className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight text-foreground mb-16"
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
              <h3 className="font-display text-2xl tracking-widest text-foreground mb-2">EMAIL</h3>
              <a
                href="mailto:thompson@mail.com"
                className="font-serif italic text-lg text-foreground opacity-60 hover:opacity-100 transition-opacity"
              >
                thompson@mail.com
              </a>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-widest text-foreground mb-3">AGENTS</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-foreground opacity-40">UK</p>
                  <a href="mailto:thompson@mail.com" className="font-serif italic text-base text-foreground opacity-60 hover:opacity-100 transition-opacity">
                    Direct
                  </a>
                </div>
                <div>
                  <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-foreground opacity-40">Italy</p>
                  <a href="mailto:vittoria@photogroupservice.com" className="font-serif italic text-base text-foreground opacity-60 hover:opacity-100 transition-opacity">
                    Photogroup Service
                  </a>
                </div>
                <div>
                  <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-foreground opacity-40">Spain</p>
                  <a href="mailto:info@davidecampi.com" className="font-serif italic text-base text-foreground opacity-60 hover:opacity-100 transition-opacity">
                    Davide Campi Artist Representatives
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <img
              src="https://payload.cargocollective.com/1/1/60539/719860/Thompson_Vogue_Brides.12_670.jpg"
              alt="David Thompson"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
