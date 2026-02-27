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
      className="fixed top-0 left-0 right-0 z-[500] flex flex-col items-start gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5 sm:gap-8"
      style={{ mixBlendMode: "difference", color: "white" }}
    >
      <Link
        to="/"
        className="font-display text-sm sm:text-base font-bold tracking-[0.12em] uppercase hover:opacity-60 transition-opacity leading-tight"
      >
        David Thompson
      </Link>
      <ul className="flex gap-4 sm:gap-8">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="font-sans text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:opacity-60"
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
