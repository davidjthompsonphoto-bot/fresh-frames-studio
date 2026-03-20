import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

const WORK_DROPDOWN = [
  { to: "/work/beauty", label: "Beauty" },
];

const getOpacity = (pathname: string, to: string) =>
  pathname === to || (to !== "/" && pathname.startsWith(to)) ? 1 : 0.4;

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] flex flex-col items-end gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-8 sm:py-5 sm:gap-8"
      style={{ mixBlendMode: "difference", color: "white" }}
    >
      <Link
        to="/"
        className="font-display text-sm sm:text-base font-bold tracking-[0.12em] uppercase hover:opacity-60 transition-opacity leading-tight"
      >
        David Thompson
      </Link>
      <ul className="flex gap-4 sm:gap-8">
        {/* Work with dropdown */}
        <li
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/work"
            className="font-sans text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:opacity-60"
            style={{ opacity: getOpacity(pathname, "/work") }}
          >
            Work
          </Link>

          {open && (
            <ul
              className="absolute top-full left-0 mt-3 flex flex-col gap-3 min-w-[7rem]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {WORK_DROPDOWN.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-[0.9rem] sm:text-[0.6rem] tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
                    style={{ opacity: 0.6 }}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* About */}
        <li>
          <Link
            to="/about"
            className="font-sans text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:opacity-60"
            style={{ opacity: getOpacity(pathname, "/about") }}
          >
            About
          </Link>
        </li>

        {/* Contact */}
        <li>
          <Link
            to="/contact"
            className="font-sans text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:opacity-60"
            style={{ opacity: getOpacity(pathname, "/contact") }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
