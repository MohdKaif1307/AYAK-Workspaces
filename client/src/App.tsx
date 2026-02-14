import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop, BackToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Solutions from "@/pages/Solutions";
import Services from "@/pages/Services";
import Features from "@/pages/Features";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import Auth from "@/pages/Auth";
import Quote from "@/pages/Quote";
import NotFound from "@/pages/NotFound";
import { QuoteProvider } from "@/context/QuoteContext";

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Switch key={location}>
            <Route path="/">{() => <AnimatedPage><Home /></AnimatedPage>}</Route>
            <Route path="/products">{() => <AnimatedPage><Products /></AnimatedPage>}</Route>
            <Route path="/products/:id">{() => <AnimatedPage><ProductDetail /></AnimatedPage>}</Route>
            <Route path="/solutions">{() => <AnimatedPage><Solutions /></AnimatedPage>}</Route>
            <Route path="/services">{() => <AnimatedPage><Services /></AnimatedPage>}</Route>
            <Route path="/features">{() => <AnimatedPage><Features /></AnimatedPage>}</Route>
            <Route path="/about">{() => <AnimatedPage><About /></AnimatedPage>}</Route>
            <Route path="/contact">{() => <AnimatedPage><Contact /></AnimatedPage>}</Route>
            <Route path="/dashboard">{() => <AnimatedPage><Dashboard /></AnimatedPage>}</Route>
            <Route path="/auth">{() => <AnimatedPage><Auth /></AnimatedPage>}</Route>
            <Route path="/quote">{() => <AnimatedPage><Quote /></AnimatedPage>}</Route>
            <Route>{() => <AnimatedPage><NotFound /></AnimatedPage>}</Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuoteProvider>
          <Router />
          <Toaster />
        </QuoteProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
