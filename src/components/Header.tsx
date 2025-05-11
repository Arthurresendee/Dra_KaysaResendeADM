import { Link, useLocation } from "react-router-dom";
import logoHeader from "../assets/DraKAysa.png";

export function Header() {
  const location = useLocation();
  const links = [
    { to: "/landingPage", label: "LandingPage", aria: "Ir para LandingPage" },
    { to: "/galeria", label: "Galeria", aria: "Ir para Galeria" },
    { to: "/", label: "Inicial", aria: "Ir para Inicial" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logoHeader} alt="Logo" className="h-12 w-auto rounded-full hidden sm:block" />
        </div>
        <nav aria-label="Menu principal">
          <ul className="flex gap-6 md:gap-10 items-center">
            {links.map(link => {
              const isActive = location.pathname === link.to || (link.to === "/" && location.pathname === "/");
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-gray-700 font-medium rounded px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-50 hover:underline ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
                    tabIndex={0}
                    aria-label={link.aria}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
