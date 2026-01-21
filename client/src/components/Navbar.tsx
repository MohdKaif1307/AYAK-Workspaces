import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="/images/LOGO.png" 
            alt="AYAK Logo" 
            className="h-20 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-semibold transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/quote-request">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
               <Link href="/dashboard">
                <Button variant="ghost" className="hidden sm:flex text-base font-semibold">
                  Dashboard
                </Button>
               </Link>
              <Button variant="outline" className="text-base font-semibold" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button variant="default" className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-10">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMobileOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setIsMobileOpen(false); }} className="text-left text-destructive">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/auth" onClick={() => setIsMobileOpen(false)}>
                    Sign In
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
