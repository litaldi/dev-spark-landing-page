
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NetworkStatusProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  onRetry, 
  className 
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    // Get connection information if available
    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionType(connection.effectiveType || connection.type || 'unknown');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    updateConnectionInfo();

    // Listen for connection changes if supported
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    // Show initial status if offline
    if (!navigator.onLine) {
      setShowStatus(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  if (!showStatus && isOnline) return null;

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={cn(
            "fixed top-4 right-4 z-50 max-w-sm",
            className
          )}
        >
          <Alert
            variant={isOnline ? "default" : "destructive"}
            className={cn(
              "border shadow-lg backdrop-blur-sm",
              isOnline 
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
            )}
          >
            <div className="flex items-center gap-2">
              {isOnline ? (
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
              <div className="flex-1">
                <AlertDescription className={cn(
                  "font-medium",
                  isOnline 
                    ? "text-green-800 dark:text-green-300" 
                    : "text-red-800 dark:text-red-300"
                )}>
                  {isOnline ? (
                    <div className="flex items-center justify-between">
                      <span>Connection restored</span>
                      {connectionType !== 'unknown' && (
                        <span className="text-xs opacity-70 ml-2">
                          {connectionType.toUpperCase()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <WifiOff className="h-3 w-3" />
                        <span>No internet connection</span>
                      </div>
                      <p className="text-xs opacity-80">
                        Please check your network and try again
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetry}
                        className="w-full mt-2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                      >
                        Retry
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </div>
              {isOnline && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowStatus(false)}
                  className="h-auto p-1 hover:bg-green-100 dark:hover:bg-green-900/40"
                  aria-label="Dismiss notification"
                >
                  ×
                </Button>
              )}
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setConnectionType(connection.effectiveType || connection.type || 'unknown');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    updateConnectionInfo();

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  return { isOnline, connectionType };
};
