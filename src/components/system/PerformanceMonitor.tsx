
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Clock, 
  Zap, 
  Eye, 
  HardDrive, 
  Cpu, 
  Wifi,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceMetrics {
  fcp: number;      // First Contentful Paint
  lcp: number;      // Largest Contentful Paint
  fid: number;      // First Input Delay
  cls: number;      // Cumulative Layout Shift
  ttfb: number;     // Time to First Byte
  memoryUsage: number;
  connectionSpeed: string;
  renderTime: number;
}

interface PerformanceIssue {
  type: 'warning' | 'error';
  metric: string;
  value: number;
  threshold: number;
  message: string;
  suggestion: string;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [issues, setIssues] = useState<PerformanceIssue[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Only show in development or with debug flag
    const showMonitor = process.env.NODE_ENV === 'development' || 
                       new URLSearchParams(window.location.search).has('debug-perf');
    
    if (!showMonitor) return;

    const observer = new PerformanceObserver((list) => {
      updateMetrics();
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });

    // Initial metrics collection
    setTimeout(updateMetrics, 1000);

    return () => observer.disconnect();
  }, []);

  const updateMetrics = () => {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      const lcp = performance.getEntriesByType('largest-contentful-paint');
      const fid = performance.getEntriesByType('first-input');

      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const lcpValue = lcp[lcp.length - 1]?.startTime || 0;
      const fidValue = fid[fid.length - 1]?.processingStart - fid[fid.length - 1]?.startTime || 0;
      const ttfb = navigation?.responseStart - navigation?.requestStart || 0;

      // Memory usage (if available)
      const memory = (performance as any).memory;
      const memoryUsage = memory ? 
        (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100 : 0;

      // Connection info
      const connection = (navigator as any).connection;
      const connectionSpeed = connection?.effectiveType || 'unknown';

      // Calculate render time
      const renderTime = performance.now();

      const newMetrics: PerformanceMetrics = {
        fcp,
        lcp: lcpValue,
        fid: fidValue,
        cls: 0, // Would need layout shift observer
        ttfb,
        memoryUsage,
        connectionSpeed,
        renderTime
      };

      setMetrics(newMetrics);
      analyzePerformance(newMetrics);
      calculateScore(newMetrics);
    } catch (error) {
      console.error('Performance monitoring error:', error);
    }
  };

  const analyzePerformance = (metrics: PerformanceMetrics) => {
    const newIssues: PerformanceIssue[] = [];

    // FCP analysis
    if (metrics.fcp > 3000) {
      newIssues.push({
        type: 'error',
        metric: 'FCP',
        value: metrics.fcp,
        threshold: 3000,
        message: 'First Contentful Paint is too slow',
        suggestion: 'Optimize critical resources and reduce bundle size'
      });
    } else if (metrics.fcp > 1800) {
      newIssues.push({
        type: 'warning',
        metric: 'FCP',
        value: metrics.fcp,
        threshold: 1800,
        message: 'First Contentful Paint could be faster',
        suggestion: 'Consider code splitting and resource optimization'
      });
    }

    // LCP analysis
    if (metrics.lcp > 4000) {
      newIssues.push({
        type: 'error',
        metric: 'LCP',
        value: metrics.lcp,
        threshold: 4000,
        message: 'Largest Contentful Paint is too slow',
        suggestion: 'Optimize images and above-the-fold content'
      });
    } else if (metrics.lcp > 2500) {
      newIssues.push({
        type: 'warning',
        metric: 'LCP',
        value: metrics.lcp,
        threshold: 2500,
        message: 'Largest Contentful Paint could be improved',
        suggestion: 'Preload critical resources and optimize images'
      });
    }

    // FID analysis
    if (metrics.fid > 300) {
      newIssues.push({
        type: 'error',
        metric: 'FID',
        value: metrics.fid,
        threshold: 300,
        message: 'First Input Delay is too high',
        suggestion: 'Reduce JavaScript execution time and use code splitting'
      });
    } else if (metrics.fid > 100) {
      newIssues.push({
        type: 'warning',
        metric: 'FID',
        value: metrics.fid,
        threshold: 100,
        message: 'First Input Delay could be better',
        suggestion: 'Optimize JavaScript and consider web workers'
      });
    }

    // Memory usage analysis
    if (metrics.memoryUsage > 80) {
      newIssues.push({
        type: 'error',
        metric: 'Memory',
        value: metrics.memoryUsage,
        threshold: 80,
        message: 'High memory usage detected',
        suggestion: 'Check for memory leaks and optimize data structures'
      });
    } else if (metrics.memoryUsage > 60) {
      newIssues.push({
        type: 'warning',
        metric: 'Memory',
        value: metrics.memoryUsage,
        threshold: 60,
        message: 'Memory usage is elevated',
        suggestion: 'Monitor memory usage and consider optimization'
      });
    }

    setIssues(newIssues);
  };

  const calculateScore = (metrics: PerformanceMetrics) => {
    let score = 100;
    
    // FCP scoring
    if (metrics.fcp > 3000) score -= 25;
    else if (metrics.fcp > 1800) score -= 10;
    
    // LCP scoring
    if (metrics.lcp > 4000) score -= 25;
    else if (metrics.lcp > 2500) score -= 10;
    
    // FID scoring
    if (metrics.fid > 300) score -= 25;
    else if (metrics.fid > 100) score -= 10;
    
    // Memory scoring
    if (metrics.memoryUsage > 80) score -= 15;
    else if (metrics.memoryUsage > 60) score -= 5;
    
    setScore(Math.max(0, score));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (time: number) => {
    if (time < 1000) return `${Math.round(time)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  if (!metrics || (!isVisible && process.env.NODE_ENV !== 'development')) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 left-4 z-40 opacity-50 hover:opacity-100"
        aria-label="Show performance monitor"
      >
        <Activity className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="fixed bottom-4 left-4 z-40 w-80 max-h-96 overflow-y-auto"
        >
          <Card className="shadow-xl bg-background/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4" />
                  Performance Monitor
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-bold", getScoreColor(score))}>
                    {score}/100
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisible(false)}
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
              </div>
              <Progress value={score} className="h-2" />
            </CardHeader>
            
            <CardContent className="space-y-3 text-xs">
              {/* Core Web Vitals */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>FCP</span>
                  </div>
                  <div className="font-mono">{formatTime(metrics.fcp)}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>LCP</span>
                  </div>
                  <div className="font-mono">{formatTime(metrics.lcp)}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>FID</span>
                  </div>
                  <div className="font-mono">{formatTime(metrics.fid)}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>TTFB</span>
                  </div>
                  <div className="font-mono">{formatTime(metrics.ttfb)}</div>
                </div>
              </div>

              {/* System Info */}
              <div className="pt-2 border-t space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3" />
                    <span>Memory</span>
                  </div>
                  <span className="font-mono">{metrics.memoryUsage.toFixed(1)}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    <span>Connection</span>
                  </div>
                  <span className="font-mono uppercase">{metrics.connectionSpeed}</span>
                </div>
              </div>

              {/* Issues */}
              {issues.length > 0 && (
                <div className="pt-2 border-t space-y-2">
                  <div className="font-medium text-foreground">Issues Found:</div>
                  {issues.slice(0, 3).map((issue, index) => (
                    <Alert 
                      key={index} 
                      variant={issue.type === 'error' ? 'destructive' : 'default'}
                      className="p-2"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      <AlertDescription className="text-xs">
                        <div className="font-medium">{issue.message}</div>
                        <div className="text-muted-foreground mt-1">
                          {issue.suggestion}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={updateMetrics}
                className="w-full h-8 text-xs"
              >
                Refresh Metrics
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
