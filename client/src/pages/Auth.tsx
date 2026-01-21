import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden md:block relative bg-black">
        <img 
          src="https://cdn.dribbble.com/userupload/32922234/file/original-02d0ac6da863f0278ae68bda9b65191c.png?format=webp&resize=800x1200" 
          alt="Office Interior" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h2 className="font-display font-bold text-5xl mb-6">Welcome to AYAK.</h2>
            <p className="text-xl opacity-90">Sign in to manage your quotes, save your favorites, and track your orders.</p>
          </div>
        </div>
      </div>

      {/* Login Side */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center md:text-left">
            <h1 className="font-display font-bold text-3xl mb-2">Sign In</h1>
            <p className="text-muted-foreground">Access your AYAK Workspaces account.</p>
          </div>

          <div className="space-y-4">
            <Button onClick={handleLogin} size="lg" className="w-full h-12 text-lg">
              Continue with Replit Auth
            </Button>
            
            <p className="text-center text-xs text-muted-foreground">
              By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
