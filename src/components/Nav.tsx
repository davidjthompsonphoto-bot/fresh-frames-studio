import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import type React from "react";

const getOpacity = (pathname: string, to: string) =>
  pathname === to || (to !== "/" && pathname.startsWith(to)) ? 1 : 0.4;

function NavLink({ to, children, baseOpacity }: { to: string; children: React.ReactNode; baseOpacity: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      className="font-sans text-[0.75rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-opacity duration-150"
      style={{ opacity: hovered ? 1 : baseOpacity, WebkitTouchCallout: "none" } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

function ExternalNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-sans text-[0.75rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-opacity duration-150"
      style={{ opacity: hovered ? 1 : 0.4, WebkitTouchCallout: "none" } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const [nameHovered, setNameHovered] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] flex flex-col items-end gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-8 sm:py-5 sm:gap-8"
      style={{ mixBlendMode: "difference", color: "white" }}
    >
      <Link
        to="/"
        className="font-display text-sm sm:text-base font-bold tracking-[0.12em] uppercase transition-opacity duration-150 leading-tight"
        style={{ opacity: nameHovered ? 1 : 0.4, WebkitTouchCallout: "none" } as React.CSSProperties}
        onMouseEnter={() => setNameHovered(true)}
        onMouseLeave={() => setNameHovered(false)}
      >
        David Thompson
      </Link>
      <ul className="flex gap-4 sm:gap-8">
        {/* Work */}
        <li>
          <NavLink to="/work" baseOpacity={getOpacity(pathname, "/work")}>Work</NavLink>
        </li>

        {/* About */}
        <li>
          <NavLink to="/about" baseOpacity={getOpacity(pathname, "/about")}>About</NavLink>
        </li>

        {/* Contact */}
        <li>
          <NavLink to="/contact" baseOpacity={getOpacity(pathname, "/contact")}>Contact</NavLink>
        </li>

        {/* Portraits - external */}
        <li>
          <ExternalNavLink href="https://davidthompsonportraits.com/">Portraits</ExternalNavLink>
        </li>
      </ul>
    </nav>
  );
}
