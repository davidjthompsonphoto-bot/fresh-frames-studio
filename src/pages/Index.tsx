import Hero from "@/components/Hero";
import SEO from "@/components/SEO";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://davidthompsonphotography.com/#website",
    "url": "https://davidthompsonphotography.com/",
    "name": "David Thompson Photography",
    "description": "Portfolio of multi award-winning London fashion and beauty photographer David Thompson.",
    "publisher": { "@id": "https://davidthompsonphotography.com/#person" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://davidthompsonphotography.com/#person",
    "name": "David Thompson",
    "jobTitle": "Fashion & Beauty Photographer",
    "description": "David Thompson is a multi award-winning, London-based fashion and beauty photographer. Editorial and campaign work for Vogue, Condé Nast, The New York Times Magazine, Marie-Claire. Bridal, beauty, jewellery and luxury advertising photography. Work held in The National Portrait Gallery.",
    "url": "https://davidthompsonphotography.com/",
    "sameAs": [],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB",
    },
    "knowsAbout": [
      "Fashion Photography",
      "Beauty Photography",
      "Bridal Photography",
      "Editorial Photography",
      "Luxury Advertising Photography",
      "Portrait Photography",
      "Jewellery Photography",
    ],
    "worksFor": [
      { "@type": "Organization", "name": "Vogue" },
      { "@type": "Organization", "name": "Condé Nast" },
      { "@type": "Organization", "name": "The New York Times Magazine" },
      { "@type": "Organization", "name": "Marie-Claire" },
    ],
    "award": "Work held in the permanent collection of The National Portrait Gallery, London",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://davidthompsonphotography.com/#webpage",
    "url": "https://davidthompsonphotography.com/",
    "name": "David Thompson — Fashion & Beauty Photographer",
    "isPartOf": { "@id": "https://davidthompsonphotography.com/#website" },
    "about": { "@id": "https://davidthompsonphotography.com/#person" },
    "description": "Portfolio homepage of multi award-winning London fashion and beauty photographer David Thompson.",
  },
];

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
