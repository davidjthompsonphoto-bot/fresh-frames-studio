import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

const NAV_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function NavContents({ activeOpacity, style }: { activeOpacity: (to: string) => number; style?: React.CSSProperties }) {
  const location = useLocation();
  return (
    <>
      <Link
        to="/"
        className="font-display text-base font-bold tracking-[0.12em] uppercase hover:opacity-60 transition-opacity"
      >
        David Thompson
      </Link>
      <ul className="flex gap-8">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="font-sans text-xs tracking-[0.2em] uppercase hover:opacity-60"
              style={{ opacity: activeOpacity(to) }}
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
  const [letterNearNav, setLetterNearNav] = useState(false);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const navEl = navRef.current;
    const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 70;
    const els = document.querySelectorAll<HTMLElement>("[data-initial-letter]");
    const near = Array.from(els).some((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < navBottom;
    });
    setLetterNearNav(near);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
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

      {/* Difference-blend overlay — only mounted when a letter is near the nav.
          White text + mix-blend-mode:difference inverts to white over black letter pixels
          and disappears over white background, respecting letter holes (e.g. inside D). */}
      {letterNearNav && (
        <nav
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 py-5 gap-8 pointer-events-none text-white"
          style={{ mixBlendMode: "difference" }}
        >
          <NavContents activeOpacity={() => 1} />
        </nav>
      )}
    </>
  );
}
