import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

const NAV_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function NavContents({ color, opacity }: { color?: string; opacity?: (to: string) => number }) {
  const location = useLocation();
  return (
    <>
      <Link
        to="/"
        className="font-display text-base font-bold tracking-[0.12em] uppercase transition-opacity hover:opacity-60"
        style={{ color }}
      >
        David Thompson
      </Link>
      <ul className="flex gap-8">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="font-sans text-xs tracking-[0.2em] uppercase hover:opacity-60"
              style={{
                color,
                opacity: opacity ? opacity(to) : undefined,
                transition: "opacity 0.2s",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Nav() {
  const location = useLocation();
  const [letterRects, setLetterRects] = useState<DOMRect[]>([]);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-initial-letter]");
    setLetterRects(Array.from(els).map((el) => el.getBoundingClientRect()));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const activeOpacity = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to)) ? 1 : 0.4;

  return (
    <>
      {/* Base nav */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-5 gap-8 bg-background">
        <NavContents opacity={activeOpacity} />
      </nav>

      {/* White mirror nav — one clone per letter, each clipped to that letter's bounding box */}
      {letterRects.map((rect, i) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // Only render when letter is near the nav area
        if (rect.bottom < 0 || rect.top > 80) return null;
        const top = Math.max(0, rect.top);
        const right = Math.max(0, vw - rect.right);
        const bottom = Math.max(0, vh - rect.bottom);
        const left = Math.max(0, rect.left);
        return (
          <nav
            key={i}
            className="fixed top-0 left-0 right-0 z-[400] flex items-center justify-between px-8 py-5 gap-8 pointer-events-none"
            style={{ clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)` }}
          >
            <NavContents color="white" opacity={() => 1} />
          </nav>
        );
      })}
    </>
  );
}
