
import React from 'react';

interface PerformanceMetrics {
  navigationTiming: PerformanceNavigationTiming | null;
  paintTiming: PerformanceEntry[];
  resourceTiming: PerformanceResourceTiming[];
  memoryInfo: any;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
    navigationTiming: null,
    paintTiming: [],
    resourceTiming: [],
    memoryInfo: null
  });

  React.useEffect(() => {
    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      const resource = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const memory = (performance as any).memory;

      setMetrics({
        navigationTiming: navigation,
        paintTiming: paint,
        resourceTiming: resource,
        memoryInfo: memory
      });

      // Core Web Vitals monitoring
      if ('web-vital' in window) {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', (entry as any).processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry) => {
            clsValue += (entry as any).value;
          });
          console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => {
      window.removeEventListener('load', collectMetrics);
    };
  }, []);

  return metrics;
}

export function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  const metrics = usePerformanceMonitor();

  // Log performance metrics in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && metrics.navigationTiming) {
      const nav = metrics.navigationTiming;
      console.group('🚀 Performance Metrics');
      console.log('DNS Lookup:', nav.domainLookupEnd - nav.domainLookupStart, 'ms');
      console.log('TCP Connection:', nav.connectEnd - nav.connectStart, 'ms');
      console.log('Request + Response:', nav.responseEnd - nav.requestStart, 'ms');
      console.log('DOM Content Loaded:', nav.domContentLoadedEventEnd - nav.startTime, 'ms');
      console.log('Page Load Complete:', nav.loadEventEnd - nav.startTime, 'ms');
      
      if (metrics.paintTiming.length > 0) {
        metrics.paintTiming.forEach((paint) => {
          console.log(`${paint.name}:`, paint.startTime, 'ms');
        });
      }
      
      if (metrics.memoryInfo) {
        console.log('Memory Usage:', {
          used: Math.round(metrics.memoryInfo.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(metrics.memoryInfo.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(metrics.memoryInfo.jsHeapSizeLimit / 1048576) + ' MB'
        });
      }
      console.groupEnd();
    }
  }, [metrics]);

  return <>{children}</>;
}
