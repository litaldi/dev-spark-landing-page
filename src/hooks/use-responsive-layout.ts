
import { useState, useEffect } from 'react';
import { useBreakpoint } from './use-mobile';

interface ResponsiveLayout {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  columns: number;
  gridGap: string;
  containerPadding: string;
  fontSize: {
    heading: string;
    body: string;
    caption: string;
  };
  spacing: {
    section: string;
    component: string;
    element: string;
  };
}

export const useResponsiveLayout = (): ResponsiveLayout => {
  const breakpoint = useBreakpoint();
  
  const [layout, setLayout] = useState<ResponsiveLayout>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    columns: 3,
    gridGap: 'gap-6',
    containerPadding: 'px-6',
    fontSize: {
      heading: 'text-2xl',
      body: 'text-base',
      caption: 'text-sm'
    },
    spacing: {
      section: 'space-y-8',
      component: 'space-y-6',
      element: 'space-y-4'
    }
  });

  useEffect(() => {
    switch (breakpoint) {
      case 'xs':
      case 'mobile':
        setLayout({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          columns: 1,
          gridGap: 'gap-3',
          containerPadding: 'px-4',
          fontSize: {
            heading: 'text-xl',
            body: 'text-sm',
            caption: 'text-xs'
          },
          spacing: {
            section: 'space-y-4',
            component: 'space-y-3',
            element: 'space-y-2'
          }
        });
        break;
      case 'tablet':
        setLayout({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          columns: 2,
          gridGap: 'gap-4',
          containerPadding: 'px-5',
          fontSize: {
            heading: 'text-xl',
            body: 'text-base',
            caption: 'text-sm'
          },
          spacing: {
            section: 'space-y-6',
            component: 'space-y-4',
            element: 'space-y-3'
          }
        });
        break;
      default:
        setLayout({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          columns: 3,
          gridGap: 'gap-6',
          containerPadding: 'px-6',
          fontSize: {
            heading: 'text-2xl',
            body: 'text-base',
            caption: 'text-sm'
          },
          spacing: {
            section: 'space-y-8',
            component: 'space-y-6',
            element: 'space-y-4'
          }
        });
    }
  }, [breakpoint]);

  return layout;
};
