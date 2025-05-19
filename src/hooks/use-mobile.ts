
import { useState, useEffect } from 'react';

/**
 * Custom hook that returns true if the current viewport matches mobile breakpoints
 * @param breakpoint Breakpoint to check against (default: 768px)
 * @returns Boolean indicating if viewport is mobile size
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkSize();

    // Set up event listener for window resize
    window.addEventListener('resize', checkSize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook that returns the current breakpoint based on viewport width
 * @returns Current breakpoint as a string
 */
export function useBreakpoint(): 'xs' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'xl' {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'xl'>(
    getInitialBreakpoint()
  );

  function getInitialBreakpoint(): 'xs' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'xl' {
    if (typeof window === 'undefined') return 'desktop'; // Default for SSR
    
    const width = window.innerWidth;
    
    if (width < 480) return 'xs';
    if (width < 640) return 'mobile';
    if (width < 768) return 'tablet';
    if (width < 1024) return 'laptop';
    if (width < 1280) return 'desktop';
    return 'xl';
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 480) setBreakpoint('xs');
      else if (width < 640) setBreakpoint('mobile');
      else if (width < 768) setBreakpoint('tablet');
      else if (width < 1024) setBreakpoint('laptop');
      else if (width < 1280) setBreakpoint('desktop');
      else setBreakpoint('xl');
    };

    // Initial check
    handleResize();

    // Listen for window resizes
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}

/**
 * Hook that returns viewport dimensions
 * @returns Object with viewport width and height
 */
export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial check
    handleResize();

    // Listen for window resizes
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
