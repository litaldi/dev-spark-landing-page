import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Activity, Zap, Clock, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  loadTime: number;
}

interface PerformanceMonitorProps {
  showDetails?: boolean;
  className?: string;
}

export function PerformanceMonitor({ showDetails = false, className }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const measurePerformance = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        // Get paint metrics
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        
        // Calculate basic metrics
        const loadTime = navigation.loadEventEnd - navigation.startTime;
        const ttfb = navigation.responseStart - navigation.startTime;
        
        // Mock LCP, FID, CLS for demo (in real app, use web-vitals library)
        const lcp = fcp + Math.random() * 1000 + 1000; // Simulate LCP
        const fid = Math.random() * 100; // Simulate FID
        const cls = Math.random() * 0.25; // Simulate CLS
        
        setMetrics({
          lcp,
          fid,
          fcp,
          cls,
          ttfb,
          loadTime
        });
        
        setIsLoading(false);
      } catch (error) {
        console.warn('Performance monitoring failed:', error);
        setIsLoading(false);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  const getMetricStatus = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 },
      loadTime: { good: 3000, poor: 5000 }
    };

    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Good';
      case 'needs-improvement': return 'Needs Improvement';
      case 'poor': return 'Poor';
      default: return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Monitor
          </CardTitle>
          <CardDescription>Measuring page performance...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-2 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Performance Monitor
          </CardTitle>
          <CardDescription>Unable to measure performance metrics</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const coreWebVitals = [
    { key: 'lcp', name: 'Largest Contentful Paint', value: metrics.lcp, unit: 'ms', icon: Zap },
    { key: 'fid', name: 'First Input Delay', value: metrics.fid, unit: 'ms', icon: Clock },
    { key: 'cls', name: 'Cumulative Layout Shift', value: metrics.cls, unit: '', icon: Activity }
  ];

  const otherMetrics = [
    { key: 'fcp', name: 'First Contentful Paint', value: metrics.fcp, unit: 'ms' },
    { key: 'ttfb', name: 'Time to First Byte', value: metrics.ttfb, unit: 'ms' },
    { key: 'loadTime', name: 'Total Load Time', value: metrics.loadTime, unit: 'ms' }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Performance Monitor
        </CardTitle>
        <CardDescription>
          Core Web Vitals and performance metrics for this page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Core Web Vitals */}
        <div>
          <h4 className="font-medium text-sm mb-3">Core Web Vitals</h4>
          <div className="grid gap-4">
            {coreWebVitals.map((metric) => {
              const status = getMetricStatus(metric.key as keyof PerformanceMetrics, metric.value);
              const Icon = metric.icon;
              
              return (
                <div key={metric.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{metric.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {metric.value.toFixed(metric.key === 'cls' ? 3 : 0)}{metric.unit}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(status)} text-white`}
                  >
                    {getStatusText(status)}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {showDetails && (
          <>
            <Separator />
            {/* Other Metrics */}
            <div>
              <h4 className="font-medium text-sm mb-3">Other Metrics</h4>
              <div className="space-y-3">
                {otherMetrics.map((metric) => {
                  const status = getMetricStatus(metric.key as keyof PerformanceMetrics, metric.value);
                  
                  return (
                    <div key={metric.key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.name}</span>
                        <span className="text-muted-foreground">
                          {metric.value.toFixed(0)}{metric.unit}
                        </span>
                      </div>
                      <Progress 
                        value={status === 'good' ? 100 : status === 'needs-improvement' ? 60 : 30} 
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
