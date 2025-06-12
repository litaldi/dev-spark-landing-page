
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Clock, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  interactionTime: number;
  vitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

interface PerformanceMonitorProps {
  showDetails?: boolean;
  threshold?: {
    fps: number;
    memory: number;
    loadTime: number;
  };
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showDetails = false,
  threshold = { fps: 30, memory: 50, loadTime: 3000 },
  className
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    interactionTime: 0,
    vitals: { lcp: 0, fid: 0, cls: 0 }
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  // Use refs to prevent infinite loops
  const metricsInitialized = useRef(false);
  const observersSetup = useRef(false);

  const measureLoadTime = useCallback(() => {
    if (metricsInitialized.current) return;
    
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation && navigation.loadEventEnd > 0) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        setMetrics(prev => ({
          ...prev,
          loadTime: Math.round(loadTime)
        }));
        metricsInitialized.current = true;
      }
    } catch (error) {
      console.warn('Failed to measure load time:', error);
    }
  }, []);

  const measureWebVitals = useCallback(() => {
    if (observersSetup.current) return;
    
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({
            ...prev,
            vitals: { ...prev.vitals, lcp: Math.round(lastEntry.startTime) }
          }));
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics(prev => ({
          ...prev,
          vitals: { ...prev.vitals, cls: Math.round(clsValue * 1000) / 1000 }
        }));
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      
      observersSetup.current = true;
      
      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (error) {
      console.warn('Web Vitals not supported:', error);
      return () => {};
    }
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;

    let frameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsValues: number[] = [];

    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        fpsValues.push(fps);
        if (fpsValues.length > 5) fpsValues.shift();
        
        const avgFPS = fpsValues.reduce((a, b) => a + b, 0) / fpsValues.length;
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(avgFPS)
        }));
        
        frameCount = 0;
        lastTime = currentTime;
        
        // Check for performance issues
        if (avgFPS < threshold.fps) {
          setShowAlert(true);
        }
      }
      
      frameId = requestAnimationFrame(measureFPS);
    };

    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const used = memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100;
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(used)
        }));
        
        if (used > threshold.memory) {
          setShowAlert(true);
        }
      }
    };

    // Start FPS monitoring
    measureFPS();
    
    // Measure load time once
    measureLoadTime();
    
    // Setup web vitals observers once
    const vitalsCleanup = measureWebVitals();
    
    // Memory monitoring interval
    const memoryInterval = setInterval(measureMemory, 2000);
    
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(memoryInterval);
      vitalsCleanup?.();
    };
  }, [isMonitoring, threshold, measureLoadTime, measureWebVitals]);

  useEffect(() => {
    // Auto-start monitoring in development
    if (import.meta.env.DEV) {
      setIsMonitoring(true);
    }
  }, []);

  const getPerformanceStatus = () => {
    const issues = [];
    if (metrics.fps < threshold.fps) issues.push('Low FPS');
    if (metrics.memoryUsage > threshold.memory) issues.push('High Memory');
    if (metrics.loadTime > threshold.loadTime) issues.push('Slow Load');
    if (metrics.vitals.lcp > 2500) issues.push('Poor LCP');
    if (metrics.vitals.cls > 0.1) issues.push('Layout Shift');
    
    return issues.length === 0 ? 'good' : issues.length <= 2 ? 'warning' : 'poor';
  };

  const status = getPerformanceStatus();

  if (!isMonitoring && !showDetails) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsMonitoring(true)}
        className="fixed bottom-4 left-4 z-50 opacity-50 hover:opacity-100"
      >
        <Activity className="h-4 w-4 mr-2" />
        Monitor Performance
      </Button>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Performance issues detected. Consider optimizing your app.
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAlert(false)}
                  className="mt-2 w-full"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {(showDetails || isMonitoring) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "fixed bottom-4 left-4 z-50 bg-background border rounded-lg p-4 shadow-lg backdrop-blur-sm",
            "min-w-[240px]",
            className
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="font-semibold text-sm">Performance</span>
              <div className={cn(
                "w-2 h-2 rounded-full",
                status === 'good' && "bg-green-500",
                status === 'warning' && "bg-yellow-500",
                status === 'poor' && "bg-red-500"
              )} />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMonitoring(false)}
              className="h-auto p-1"
            >
              ×
            </Button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                FPS
              </span>
              <span className={cn(
                "font-mono",
                metrics.fps < threshold.fps ? "text-red-500" : "text-green-500"
              )}>
                {metrics.fps}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Memory</span>
              <span className={cn(
                "font-mono",
                metrics.memoryUsage > threshold.memory ? "text-red-500" : "text-green-500"
              )}>
                {metrics.memoryUsage}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Load
              </span>
              <span className="font-mono">
                {metrics.loadTime}ms
              </span>
            </div>

            {metrics.vitals.lcp > 0 && (
              <div className="flex justify-between items-center">
                <span>LCP</span>
                <span className={cn(
                  "font-mono",
                  metrics.vitals.lcp > 2500 ? "text-red-500" : "text-green-500"
                )}>
                  {metrics.vitals.lcp}ms
                </span>
              </div>
            )}

            {metrics.vitals.cls > 0 && (
              <div className="flex justify-between items-center">
                <span>CLS</span>
                <span className={cn(
                  "font-mono",
                  metrics.vitals.cls > 0.1 ? "text-red-500" : "text-green-500"
                )}>
                  {metrics.vitals.cls}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};
