import { Link, useLocation } from "react-router-dom";

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

  const activeOpacity = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to)) ? 1 : 0.4;

  return (
    <>
      {/* Base nav */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 py-5 gap-8 bg-background">
        <NavContents activeOpacity={activeOpacity} />
      </nav>

      {/* Difference-blend overlay: white text inverts to white on black letter pixels, invisible on white bg */}
      <nav
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 py-5 gap-8 pointer-events-none text-white"
        style={{ mixBlendMode: "difference" }}
      >
        <NavContents activeOpacity={() => 1} />
      </nav>
    </>
  );
}
