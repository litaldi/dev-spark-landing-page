
/**
 * Performance monitoring utilities for Core Web Vitals and user experience metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
}

interface CoreWebVitals {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private coreWebVitals: CoreWebVitals = {};

  constructor() {
    this.initializeObservers();
    this.trackNavigationTiming();
  }

  private initializeObservers() {
    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
        this.coreWebVitals.lcp = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
          this.coreWebVitals.fid = entry.processingStart - entry.startTime;
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        let clsValue = 0;
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('CLS', clsValue);
        this.coreWebVitals.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('FCP', entry.startTime);
          this.coreWebVitals.fcp = entry.startTime;
        });
      }).observe({ entryTypes: ['paint'] });
    }
  }

  private trackNavigationTiming() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Time to First Byte
        const ttfb = navigation.responseStart - navigation.requestStart;
        this.recordMetric('TTFB', ttfb);
        this.coreWebVitals.ttfb = ttfb;

        // DOM Content Loaded
        const dcl = navigation.domContentLoadedEventEnd - navigation.navigationStart;
        this.recordMetric('DCL', dcl);

        // Load Complete
        const loadComplete = navigation.loadEventEnd - navigation.navigationStart;
        this.recordMetric('Load', loadComplete);
      }
    });
  }

  private recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href,
    };

    this.metrics.push(metric);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}: ${value.toFixed(2)}ms`);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // In a real app, send to your analytics service
    // Example: Google Analytics, DataDog, New Relic, etc.
    console.log('Sending metric to analytics:', metric);
  }

  // Public methods
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getCoreWebVitals(): CoreWebVitals {
    return { ...this.coreWebVitals };
  }

  public measureUserTiming(name: string, startTime?: number): () => void {
    const start = startTime || performance.now();
    
    return () => {
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
    };
  }

  public markUserAction(action: string) {
    this.recordMetric(`UserAction:${action}`, performance.now());
  }

  // Get performance report
  public getPerformanceReport(): {
    coreWebVitals: CoreWebVitals;
    metrics: PerformanceMetric[];
    recommendations: string[];
  } {
    const recommendations: string[] = [];

    // Analyze Core Web Vitals and provide recommendations
    if (this.coreWebVitals.lcp && this.coreWebVitals.lcp > 2500) {
      recommendations.push('LCP is over 2.5s. Consider optimizing images and reducing server response times.');
    }

    if (this.coreWebVitals.fid && this.coreWebVitals.fid > 100) {
      recommendations.push('FID is over 100ms. Consider reducing JavaScript execution time.');
    }

    if (this.coreWebVitals.cls && this.coreWebVitals.cls > 0.1) {
      recommendations.push('CLS is over 0.1. Consider adding size attributes to images and avoiding dynamic content injection.');
    }

    if (this.coreWebVitals.ttfb && this.coreWebVitals.ttfb > 600) {
      recommendations.push('TTFB is over 600ms. Consider optimizing server response times.');
    }

    return {
      coreWebVitals: this.getCoreWebVitals(),
      metrics: this.getMetrics(),
      recommendations,
    };
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const measureTask = (taskName: string) => {
    return performanceMonitor.measureUserTiming(taskName);
  };

  const markAction = (action: string) => {
    performanceMonitor.markUserAction(action);
  };

  const getReport = () => {
    return performanceMonitor.getPerformanceReport();
  };

  return {
    measureTask,
    markAction,
    getReport,
    getCoreWebVitals: () => performanceMonitor.getCoreWebVitals(),
    getMetrics: () => performanceMonitor.getMetrics(),
  };
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Auto-start monitoring
  performanceMonitor;
}
