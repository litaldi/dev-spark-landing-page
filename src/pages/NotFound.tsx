
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="rounded-full bg-brand-50 dark:bg-brand-900/20 p-6 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto">
          <span className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400">404</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Page not found</h1>
        
        <p className="text-muted-foreground text-sm md:text-base">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link to="/" className="flex items-center justify-center gap-2">
              {isMobile ? <Home className="h-4 w-4" /> : null}
              {isMobile ? "Home" : "Return to Home"}
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/dashboard" className="flex items-center justify-center gap-2">
              {isMobile ? "Dashboard" : "Go to Dashboard"} 
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <p className="text-xs md:text-sm text-muted-foreground pt-4">
          Need help? <Link to="/contact" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 underline">Contact support</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
