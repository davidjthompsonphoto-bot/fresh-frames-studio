import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://davidthompsonphotography.com/#webpage",
  "url": "https://davidthompsonphotography.com/",
  "name": "David Thompson — Fashion & Beauty Photographer",
  "isPartOf": { "@id": "https://davidthompsonphotography.com/#website" },
  "about": { "@id": "https://davidthompsonphotography.com/#person" },
  "description": "Portfolio homepage of multi award-winning London fashion and beauty photographer David Thompson.",
};

export default function Index() {
  return (
    <div className="bg-background min-h-screen">
      <SEO canonicalPath="/" jsonLd={jsonLd} />
      <Nav />
      <main className="pt-20">
        <Hero />
      </main>
    </div>
  );
}
