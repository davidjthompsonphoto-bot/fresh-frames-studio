import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const getOpacity = (pathname: string, to: string) =>
  pathname === to || (to !== "/" && pathname.startsWith(to)) ? 1 : 0.4;

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 py-5 gap-8"
      style={{ mixBlendMode: "difference", color: "white" }}
    >
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
              style={{ opacity: getOpacity(pathname, to) }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
