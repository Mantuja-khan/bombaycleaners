import { useState } from "react";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About Us", href: "/about", isRoute: true },
  {
    label: "Services",
    href: "/services",
    isRoute: true,
    children: [
      { label: "Wash & Fold", href: "/services" },
      { label: "Dry Cleaning", href: "/services" },
      { label: "Ironing", href: "/services" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "Pricing", href: "/pricing", isRoute: true },
      { label: "Testimonials", href: "/testimonials", isRoute: true },
      { label: "Book Now", href: "/booking", isRoute: true },
    ],
  },
  { label: "Contact Us", href: "/contact", isRoute: true },
];

const Navbar = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setMobileOpen(false);
    if (isRoute || href.startsWith("/")) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 section-padding">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight">
          Bombay <span className="text-secondary">Dry</span> Cleaners
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative group"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick(link.href, (link as any).isRoute)}
                className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
                {link.children && <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {link.children && openDropdown === link.label && (
                <ul className="absolute top-full left-0 mt-2 w-44 bg-background rounded-lg shadow-lg border py-2 animate-fade-in">
                  {link.children.map((child) => (
                    <li key={child.label}>
                      <button
                        onClick={() => handleNavClick(child.href, (child as any).isRoute)}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + Auth */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Link
            to="/booking"
            className="lg:hidden inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
          >
            Book Now
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 border border-border px-4 py-2.5 rounded-full text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <User className="w-4 h-4" /> My Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 border border-border px-4 py-2.5 rounded-full text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            )}
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t animate-fade-in">
          <ul className="flex flex-col py-4 section-padding">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href, (link as any).isRoute)}
                  className="block w-full text-left py-3 text-sm font-medium text-foreground/80 hover:text-primary border-b border-border/50"
                >
                  {link.label}
                </button>
                {link.children && (
                  <ul className="pl-4">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <button
                          onClick={() => handleNavClick(child.href, (child as any).isRoute)}
                          className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-primary"
                        >
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4 flex gap-3">
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2.5 rounded-full text-sm font-medium"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2.5 rounded-full text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              )}
              <Link
                to="/booking"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
