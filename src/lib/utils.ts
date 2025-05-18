
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string using tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date according to the specified format
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }
  
  return new Date(date).toLocaleDateString(undefined, defaultOptions)
}

/**
 * Truncates a string if it exceeds the maximum length
 */
export function truncate(str: string, maxLength: number = 100): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Debounces a function to limit how often it can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}
