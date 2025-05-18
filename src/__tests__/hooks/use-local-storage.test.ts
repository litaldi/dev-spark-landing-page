
import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '@/hooks/use-local-storage';

describe('useLocalStorage hook', () => {
  const testKey = 'test-storage-key';
  const initialValue = { name: 'test', count: 0 };
  
  // Mock localStorage
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();
  
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    
    // Create a mock implementation of localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('should initialize with the default value when localStorage is empty', () => {
    // Mock that localStorage is empty (returns null)
    mockGetItem.mockReturnValueOnce(null);
    
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    // Should return the initial value
    expect(result.current[0]).toEqual(initialValue);
    expect(mockGetItem).toHaveBeenCalledWith(testKey);
  });

  test('should use the value from localStorage if it exists', () => {
    const storedValue = { name: 'stored', count: 5 };
    mockGetItem.mockReturnValueOnce(JSON.stringify(storedValue));
    
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    // Should return the stored value
    expect(result.current[0]).toEqual(storedValue);
    expect(mockGetItem).toHaveBeenCalledWith(testKey);
  });

  test('should update the value in localStorage when setValue is called', () => {
    mockGetItem.mockReturnValueOnce(null);
    
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    const newValue = { name: 'updated', count: 1 };
    
    act(() => {
      // Update the value
      result.current[1](newValue);
    });
    
    // Should store the new value in localStorage
    expect(mockSetItem).toHaveBeenCalledWith(testKey, JSON.stringify(newValue));
    
    // Should update the returned value
    expect(result.current[0]).toEqual(newValue);
  });

  test('should handle function updates correctly', () => {
    const storedValue = { name: 'stored', count: 5 };
    mockGetItem.mockReturnValueOnce(JSON.stringify(storedValue));
    
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    act(() => {
      // Update using a function
      result.current[1]((prev) => ({ ...prev, count: prev.count + 1 }));
    });
    
    // Should store the updated value
    const expectedValue = { name: 'stored', count: 6 };
    expect(mockSetItem).toHaveBeenCalledWith(testKey, JSON.stringify(expectedValue));
    
    // Should update the returned value
    expect(result.current[0]).toEqual(expectedValue);
  });

  test('should handle JSON parse errors gracefully', () => {
    // Return invalid JSON
    mockGetItem.mockReturnValueOnce('invalid-json');
    
    // Mock console.error to prevent test output pollution
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    // Should fall back to initial value on parsing error
    expect(result.current[0]).toEqual(initialValue);
    expect(console.error).toHaveBeenCalled();
    
    // Restore console.error
    console.error = originalConsoleError;
  });

  test('should handle localStorage.setItem errors', () => {
    mockGetItem.mockReturnValueOnce(null);
    
    // Mock setItem to throw an error (e.g., quota exceeded)
    mockSetItem.mockImplementationOnce(() => {
      throw new Error('Storage quota exceeded');
    });
    
    // Mock console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    act(() => {
      // This will cause the error to be thrown
      result.current[1]({ name: 'new', count: 10 });
    });
    
    // Error should be caught and logged
    expect(console.error).toHaveBeenCalled();
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});
