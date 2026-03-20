import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: object;
}

const SITE_URL = "https://davidthompson.eu";
const DEFAULT_IMAGE = "https://payload.cargocollective.com/1/1/60539/10079154/prt_1435310768.jpg";
const DEFAULT_DESC =
  "David Thompson is a multi award-winning, London-based fashion and beauty photographer. Editorial and campaign work for Vogue, Condé Nast, The New York Times Magazine, Marie-Claire. Bridal, beauty, jewellery and luxury advertising photography. Work held in The National Portrait Gallery.";

export default function SEO({
  title = "David Thompson — Fashion & Beauty Photographer",
  description = DEFAULT_DESC,
  canonicalPath = "/",
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  const canonical = `${SITE_URL}${canonicalPath}`;

  useEffect(() => {
    // Title
    document.title = title;

    // Helper to upsert a <meta> tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = attr.split("=");
        el.setAttribute(key, val.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // Helper to upsert a <link> tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    setMeta('meta[name="description"]', 'name="description"', description);
    setLink("canonical", canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', 'property="og:title"', title);
    setMeta('meta[property="og:description"]', 'property="og:description"', description);
    setMeta('meta[property="og:url"]', 'property="og:url"', canonical);
    setMeta('meta[property="og:image"]', 'property="og:image"', ogImage);
    setMeta('meta[property="og:type"]', 'property="og:type"', ogType);

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', title);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', description);
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', ogImage);
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', "summary_large_image");

    // JSON-LD
    const existingLd = document.querySelector('script[data-seo-ld]');
    if (existingLd) existingLd.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, ogImage, ogType, jsonLd]);

  return null;
}
