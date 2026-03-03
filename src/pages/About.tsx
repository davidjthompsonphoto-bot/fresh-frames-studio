import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import SEO from "@/components/SEO";

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

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <SEO
        title="About — David Thompson Photography"
        description="David Thompson grew up with a camera and has travelled the world as a specialist studio photographer. Work in Vogue, The New York Times Magazine, and held in The National Portrait Gallery."
        canonicalPath="/about"
        ogImage="https://payload.cargocollective.com/1/1/60539/719151/DT_new_670.jpg"
        jsonLd={jsonLd}
      />
      <Nav />
      <main className="pt-24 px-8 pb-24 max-w-5xl">
        <motion.h2
          className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT
        </motion.h2>

        <div className="max-w-2xl">
          <motion.div
            className="flex flex-col justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <p className="font-serif text-lg leading-relaxed text-foreground">
              David Thompson literally grew up with a camera in his hand, as his father was a keen amateur photographer and encouraged his interest from an early age.
            </p>
            <p className="font-serif text-lg leading-relaxed text-foreground">
              Since graduating from art school, he has travelled the world working as a specialist studio photographer, known for his timeless, clean, beautifully lit and produced imagery. His work has featured across various publications including numerous international editions of Vogue and The New York Times Magazine, and is held in the permanent collection of The National Portrait Gallery.
            </p>

            <div>
              <h3 className="font-display text-2xl tracking-widest text-foreground mb-3">MAGAZINE CREDITS</h3>
              <p className="font-serif text-lg leading-relaxed text-foreground">
                Vogue Germany, Vogue Japan, Vogue Brazil, Vogue China, Vogue Hellas, Vogue Mexico, Vogue Gioello, Vogue Italia, Myself (Condé Nast) Italy, Easy Living (Condé Nast) UK, Brides (Condé Nast) UK, The Rake (International Edition), French Marie-Claire, Spanish Marie-Claire, Japanese Marie-Claire, Italian Amica, Jalouse (France), West-East (Hong Kong), InStyle UK, The National (Dubai), Glamour Mexico, RED UK, Elle Sweden, Donna, New York Times Sunday Magazine
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-widest text-foreground mb-3">CLIENT CREDITS</h3>
              <p className="font-serif text-lg leading-relaxed text-foreground">
                Adidas, Swarovski, L'Oreal, Wella, EMI, Hirsh Jewellery, Marks & Spencer, The White Company, Random House, Lara Bohinc, The Royal Family of Jordan
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
