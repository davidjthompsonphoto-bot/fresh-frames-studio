import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const links = [
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 gap-8 bg-background">
      <Link to="/" className="font-display text-base font-bold tracking-[0.12em] uppercase text-foreground hover:opacity-60 transition-opacity">
        David Thompson
      </Link>
      <ul className="flex gap-8">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
            className={`font-sans text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-60 ${
                location.pathname === to || (to !== "/" && location.pathname.startsWith(to)) ? "opacity-100" : "opacity-40"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
