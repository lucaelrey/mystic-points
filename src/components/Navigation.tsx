import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book, Home, Info, Trophy } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { href: "/", label: "Point Tracker", icon: Trophy },
    { href: "/guide", label: "Game Guide", icon: Book },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 backdrop-blur-xl bg-mystic-dark/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Mystic Cards
            </span>
          </Link>
          
          <div className="flex gap-1 sm:gap-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-primary/20",
                  location.pathname === href
                    ? "text-primary"
                    : "text-mystic-light/60 hover:text-mystic-light"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}