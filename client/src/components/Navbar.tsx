import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, ShoppingBag, ChevronRight, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Collections" },
    { href: "/solutions", label: "Solutions" },
    { href: "/services", label: "Services" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
        ? "glass shadow-lg border-b border-border/30"
        : "bg-background/80 backdrop-blur-sm border-b border-border/20"
        }`}
    >
      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"
        }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/images/logo1.png"
            alt="AYAK Logo"
            className={`w-auto dark:invert transition-all duration-300 hover:opacity-80 ${scrolled ? "h-14" : "h-20"
              }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 group"
            >
              <span className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${isActive(link.href)
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
                }`}>
                {link.label}
              </span>
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full"
                initial={false}
                animate={{ width: isActive(link.href) ? "60%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={resolvedTheme}
                initial={{ y: -10, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 10, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm font-semibold hover:bg-primary/10">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-sm font-semibold border-primary/30 hover:bg-primary/10 hover:border-primary"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-background/95 backdrop-blur-xl border-l border-border/50">
              <div className="flex flex-col gap-1 mt-8">
                <div className="mb-6">
                  <img src="/images/logo1.png" alt="AYAK Logo" className="h-12 w-auto" />
                </div>
                {links.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium transition-all ${isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary hover:text-primary"
                        }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                      <ChevronRight className={`w-4 h-4 transition-opacity ${isActive(link.href) ? "opacity-100 text-primary" : "opacity-0"
                        }`} />
                    </Link>
                  </motion.div>
                ))}
                <div className="h-px bg-border my-4" />
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="py-3 px-4 rounded-lg text-base font-medium hover:bg-secondary transition-colors">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setIsMobileOpen(false); }}
                      className="text-left py-3 px-4 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/auth" onClick={() => setIsMobileOpen(false)} className="mt-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
