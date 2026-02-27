import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

const NAV_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function NavContents({ color, activeOpacity }: { color?: string; activeOpacity: (to: string) => number }) {
  const location = useLocation();
  return (
    <>
      <Link
        to="/"
        className="font-display text-base font-bold tracking-[0.12em] uppercase hover:opacity-60 transition-opacity"
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
              style={{ color, opacity: activeOpacity(to) }}
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
  const navRef = useRef<HTMLElement>(null);
  const [letterRects, setLetterRects] = useState<{ left: number; right: number; nearNav: boolean }[]>([]);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const navEl = navRef.current;
    const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 70;
    const els = document.querySelectorAll<HTMLElement>("[data-initial-letter]");
    const rects = Array.from(els).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left,
        right: r.right,
        nearNav: r.bottom > 0 && r.top < navBottom,
      };
    });
    setLetterRects(rects);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Slight delay to ensure hero letters are mounted
    const t = setTimeout(update, 100);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const activeOpacity = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to)) ? 1 : 0.4;

  return (
    <>
      {/* Base nav */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-5 gap-8 bg-background"
      >
        <NavContents activeOpacity={activeOpacity} />
      </nav>

      {/* White mirror nav — one per letter, clipped to letter's horizontal extent only */}
      {letterRects.map((rect, i) => {
        if (!rect.nearNav) return null;
        const vw = window.innerWidth;
        const clipLeft = Math.max(0, rect.left);
        const clipRight = Math.max(0, vw - rect.right);
        return (
          <nav
            key={i}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[400] flex items-center justify-between px-8 py-5 gap-8 pointer-events-none"
            style={{ clipPath: `inset(0px ${clipRight}px 0px ${clipLeft}px)` }}
          >
            <NavContents color="white" activeOpacity={() => 1} />
          </nav>
        );
      })}
    </>
  );
}
