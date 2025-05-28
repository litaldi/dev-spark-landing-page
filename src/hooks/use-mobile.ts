
import { useState, useEffect } from 'react';

interface ViewportSize {
  width: number;
  height: number;
}

export const useViewportSize = (): ViewportSize => {
  const [size, setSize] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Set initial size

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return size;
};

type Breakpoint = 'xs' | 'mobile' | 'tablet' | 'desktop' | 'xl';

export const useBreakpoint = (): Breakpoint => {
  const { width } = useViewportSize();

  if (width < 480) return 'xs';
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1280) return 'desktop';
  return 'xl';
};

export const useIsMobile = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'mobile';
};

export const useIsTablet = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'tablet';
};

export const useIsDesktop = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'desktop' || breakpoint === 'xl';
};
