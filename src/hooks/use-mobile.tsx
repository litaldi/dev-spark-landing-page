
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    
    const mql = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`
    )
    
    mql.addEventListener("change", checkTablet)
    checkTablet()
    
    return () => mql.removeEventListener("change", checkTablet)
  }, [])

  return !!isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    mql.addEventListener("change", checkDesktop)
    checkDesktop()
    
    return () => mql.removeEventListener("change", checkDesktop)
  }, [])

  return !!isDesktop
}

export function useViewportSize() {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  
  React.useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', updateSize)
    updateSize()
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return size
}

export function useBreakpoint() {
  const { width } = useViewportSize();
  
  if (width === 0) {
    return null; // Not yet determined (SSR or initial load)
  }
  
  if (width < MOBILE_BREAKPOINT) {
    return "mobile";
  } else if (width < TABLET_BREAKPOINT) {
    return "tablet";
  } else {
    return "desktop";
  }
}

export function useResponsiveValue<T>(
  options: {
    mobile: T;
    tablet: T;
    desktop: T;
  }
) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  if (isMobile) return options.mobile;
  if (isTablet) return options.tablet;
  return options.desktop;
}
