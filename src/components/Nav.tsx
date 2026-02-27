import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const check = () => {
      const nav = navRef.current;
      if (!nav) return;
      const navRect = nav.getBoundingClientRect();
      const letters = document.querySelectorAll<HTMLElement>("[data-initial-letter]");
      let overlaps = false;
      letters.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > navRect.top && r.top < navRect.bottom &&
            r.right > navRect.left && r.left < navRect.right) {
          overlaps = true;
        }
      });
      setInverted(overlaps);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const links = [
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-5 gap-8 bg-background"
    >
      <Link
        to="/"
        className="font-display text-base font-bold tracking-[0.12em] uppercase transition-all hover:opacity-60"
        style={{ color: inverted ? "white" : undefined }}
      >
        David Thompson
      </Link>
      <ul className="flex gap-8">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="font-sans text-xs tracking-[0.2em] uppercase transition-all hover:opacity-60"
              style={{
                color: inverted ? "white" : undefined,
                opacity: inverted
                  ? (location.pathname === to || (to !== "/" && location.pathname.startsWith(to)) ? 1 : 0.6)
                  : undefined,
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
