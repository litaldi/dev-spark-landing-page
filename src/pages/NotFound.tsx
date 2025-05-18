
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md text-center space-y-6">
        <div className="rounded-full bg-brand-50 dark:bg-brand-900/20 p-6 w-24 h-24 flex items-center justify-center mx-auto">
          <span className="text-4xl font-bold text-brand-600 dark:text-brand-400">404</span>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="default">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground pt-4">
          Need help? <Link to="/contact" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 underline">Contact support</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
