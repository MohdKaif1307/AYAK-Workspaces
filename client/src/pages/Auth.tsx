import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Auth() {
  const handleLogin = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden md:block relative bg-foreground overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
          alt="Modern Office Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/40 to-black/60" />

        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white max-w-md"
          >
            <img src="/images/logo1.png" alt="AYAK" className="h-16 w-auto brightness-200 invert mb-8" />
            <h2 className="font-display font-bold text-5xl mb-6 leading-tight">Welcome to AYAK.</h2>
            <p className="text-xl opacity-80 leading-relaxed">Sign in to manage your quotes, save favorites, and track your workspace projects.</p>
          </motion.div>
        </div>
      </div>

      {/* Login Side */}
      <div className="flex items-center justify-center p-8 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-8 relative z-10"
        >
          <div className="text-center md:text-left">
            <div className="md:hidden mb-6">
              <img src="/images/logo1.png" alt="AYAK" className="h-12 w-auto mx-auto md:mx-0" />
            </div>
            <h1 className="font-display font-bold text-3xl mb-2">Sign In</h1>
            <p className="text-muted-foreground">Access your AYAK Workspaces account.</p>
          </div>

          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleLogin}
                size="lg"
                className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue
              </Button>
            </motion.div>

            <p className="text-center text-xs text-muted-foreground pt-4">
              By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
