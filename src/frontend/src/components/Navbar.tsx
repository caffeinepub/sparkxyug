import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onCategoryChange: (cat: "all" | "tees" | "hoodies") => void;
  scrollToProducts: () => void;
}

export default function Navbar({
  cartCount,
  onCartOpen,
  onCategoryChange,
  scrollToProducts,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      label: "HOME",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      label: "TEES",
      action: () => {
        onCategoryChange("tees");
        scrollToProducts();
      },
    },
    {
      label: "HOODIES",
      action: () => {
        onCategoryChange("hoodies");
        scrollToProducts();
      },
    },
    {
      label: "ALL",
      action: () => {
        onCategoryChange("all");
        scrollToProducts();
      },
    },
    {
      label: "ABOUT",
      action: () =>
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#1f1f1f]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <img
            src="/assets/generated/sparkxyug-logo-transparent.dim_400x200.png"
            alt="SPARKxYUG"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                data-ocid="nav.link"
                onClick={link.action}
                className="font-display text-sm font-700 tracking-widest text-white/70 hover:text-[#f5c518] transition-colors duration-200 uppercase"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Cart + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            data-ocid="nav.cart_button"
            onClick={onCartOpen}
            className="relative p-2 text-white hover:text-[#a855f7] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#a855f7] text-white text-xs flex items-center justify-center font-bold animate-glow-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d0d] border-t border-[#1f1f1f] overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    data-ocid="nav.link"
                    onClick={() => {
                      link.action();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 font-display text-sm font-700 tracking-widest text-white/70 hover:text-[#f5c518] transition-colors uppercase w-full text-left"
                  >
                    <Zap className="w-3 h-3 text-[#a855f7]" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
