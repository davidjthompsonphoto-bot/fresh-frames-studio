import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import SEO from "@/components/SEO";
import aboutFullbleed from "@/assets/about-fullbleed.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://davidthompsonphotography.com/about#webpage",
  "url": "https://davidthompsonphotography.com/about",
  "name": "About David Thompson — Fashion & Beauty Photographer",
  "isPartOf": { "@id": "https://davidthompsonphotography.com/#website" },
  "about": { "@id": "https://davidthompsonphotography.com/#person" },
  "description": "About David Thompson — multi award-winning London fashion and beauty photographer with work in Vogue, The New York Times Magazine, and The National Portrait Gallery.",
};

// Eyelid blink overlay — upper lid descends and retracts on a natural blink cycle
function BlinkOverlay() {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    async function blinkLoop() {
      while (!cancelled) {
        // Wait 4–6 seconds between blinks (vary naturally)
        const delay = 4500 + Math.random() * 2000;
        await new Promise(r => setTimeout(r, delay));
        if (cancelled) break;

        // Close eye (lid sweeps down)
        await controls.start({
          scaleY: 1,
          transition: { duration: 0.07, ease: "easeIn" },
        });
        // Hold closed briefly
        await new Promise(r => setTimeout(r, 60));
        if (cancelled) break;

        // Open eye (lid retracts)
        await controls.start({
          scaleY: 0,
          transition: { duration: 0.1, ease: "easeOut" },
        });
      }
    }

    blinkLoop();
    return () => { cancelled = true; };
  }, [controls]);

  return (
    <>
      {/* Upper eyelid */}
      <motion.div
        animate={controls}
        initial={{ scaleY: 0 }}
        className="fixed pointer-events-none"
        style={{
          // Positioned over the model's eye — tuned to the about-fullbleed image
          left: "62.5%",
          top: "41.5%",
          width: "22vw",
          height: "16vh",
          // Arc shape matching the natural upper lid curve
          borderRadius: "45% 45% 55% 55%",
          background: "linear-gradient(to bottom, #0c0509 60%, #150a10)",
          transformOrigin: "top center",
          zIndex: 1,
        }}
      />
      {/* Lower eyelid — subtle upward rise to meet upper lid */}
      <motion.div
        animate={controls}
        initial={{ scaleY: 0 }}
        className="fixed pointer-events-none"
        style={{
          left: "62.5%",
          top: "55%",
          width: "22vw",
          height: "6vh",
          borderRadius: "55% 55% 45% 45%",
          background: "linear-gradient(to top, #0c0509 60%, #150a10)",
          transformOrigin: "bottom center",
          zIndex: 1,
        }}
      />
    </>
  );
}

export default function About() {
  return (
    <div className="relative min-h-screen">
      <SEO
        title="About — David Thompson Photography"
        description="David Thompson grew up with a camera and has travelled the world as a specialist studio photographer. Work in Vogue, The New York Times Magazine, and held in The National Portrait Gallery."
        canonicalPath="/about"
        ogImage="https://payload.cargocollective.com/1/1/60539/719151/DT_new_670.jpg"
        jsonLd={jsonLd}
      />

      {/* Full bleed background image */}
      <img
        src={aboutFullbleed}
        alt="David Thompson fashion photography"
        className="fixed inset-0 w-full h-full object-cover object-top"
        style={{ zIndex: 0 }}
      />

      {/* Blink animation overlay */}
      <BlinkOverlay />

      <div className="relative" style={{ zIndex: 2 }}>
        <Nav />
        <main className="pt-24 px-8 pb-24 max-w-5xl">
          <motion.h2
            className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ABOUT
          </motion.h2>

          <motion.div
            className="max-w-2xl flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="font-sans text-lg leading-relaxed text-white">
              David Thompson literally grew up with a camera in his hand, as his father was a keen amateur photographer and encouraged his interest from an early age.
            </p>
            <p className="font-sans text-lg leading-relaxed text-white">
              Since graduating from art school, he has travelled the world working as a specialist studio photographer, known for his timeless, clean, beautifully lit and produced imagery. His work has featured across various publications including numerous international editions of Vogue and The New York Times Magazine, and is held in the permanent collection of The National Portrait Gallery.
            </p>

            <div>
              <h3 className="font-display text-2xl tracking-widest text-white mb-3">MAGAZINE CREDITS</h3>
              <p className="font-sans text-lg leading-relaxed text-white/80">
                Vogue Germany, Vogue Japan, Vogue Brazil, Vogue China, Vogue Hellas, Vogue Mexico, Vogue Gioello, Vogue Italia, Myself (Condé Nast) Italy, Easy Living (Condé Nast) UK, Brides (Condé Nast) UK, The Rake (International Edition), French Marie-Claire, Spanish Marie-Claire, Japanese Marie-Claire, Italian Amica, Jalouse (France), West-East (Hong Kong), InStyle UK, The National (Dubai), Glamour Mexico, RED UK, Elle Sweden, Donna, New York Times Sunday Magazine
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-widest text-white mb-3">CLIENT CREDITS</h3>
              <p className="font-sans text-lg leading-relaxed text-white/80">
                Adidas, Swarovski, L'Oreal, Wella, EMI, Hirsh Jewellery, Marks & Spencer, The White Company, Random House, Lara Bohinc, The Royal Family of Jordan
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
