import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>
      
      <h1 className="font-display font-bold text-4xl mb-4 text-center">Page Not Found</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="default" size="lg">Go Home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="lg">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}
