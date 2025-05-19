
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormState } from '@/hooks/use-form-state';
import { useToast } from '@/hooks/use-toast';

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

// Mock document.createElement for announceToScreenReader
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();
const mockCreateElement = jest.fn();

const mockElement = {
  setAttribute: jest.fn(),
  classList: {
    add: jest.fn(),
  },
  textContent: '',
};

document.createElement = mockCreateElement.mockReturnValue(mockElement);
document.body.appendChild = mockAppendChild;
document.body.removeChild = mockRemoveChild;

describe('useFormState hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup mock for useToast
    const mockToast = { toast: jest.fn() };
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  test('should initialize with default values', () => {
    const onSubmit = jest.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useFormState({ onSubmit }));

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should handle successful submission', async () => {
    const onSubmit = jest.fn().mockResolvedValue(true);
    const { result, waitForNextUpdate } = renderHook(() => 
      useFormState({ 
        onSubmit, 
        successMessage: 'Success!' 
      })
    );

    act(() => {
      result.current.handleSubmit({ name: 'Test' });
    });

    // Check if submission state is correct
    expect(result.current.isSubmitting).toBe(true);
    
    await waitForNextUpdate();
    
    // After submission is complete
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Test' });
    
    // Verify toast was called
    const { toast } = useToast();
    expect(toast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Success!',
      variant: 'default',
    });
  });

  test('should handle submission error', async () => {
    const error = new Error('Failed');
    const onSubmit = jest.fn().mockRejectedValue(error);
    const { result, waitForNextUpdate } = renderHook(() => 
      useFormState({ 
        onSubmit,
        errorMessage: 'An error occurred.' 
      })
    );

    act(() => {
      result.current.handleSubmit({ data: 'test' });
    });

    // Check if submission state is correct
    expect(result.current.isSubmitting).toBe(true);
    
    await waitForNextUpdate();
    
    // After submission is complete
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('An error occurred.');
    
    // Verify toast was called with error
    const { toast } = useToast();
    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'An error occurred.',
      variant: 'destructive',
    });
  });

  test('should reset form state', async () => {
    const onSubmit = jest.fn().mockResolvedValue(true);
    const { result, waitForNextUpdate } = renderHook(() => 
      useFormState({ onSubmit })
    );

    act(() => {
      result.current.handleSubmit({ data: 'test' });
    });
    
    await waitForNextUpdate();
    
    expect(result.current.success).toBe(true);
    
    act(() => {
      result.current.resetFormState();
    });
    
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should focus element after successful submission', async () => {
    // Mock getElementById
    const mockFocusElement = { focus: jest.fn() };
    document.getElementById = jest.fn().mockReturnValue(mockFocusElement);
    
    const onSubmit = jest.fn().mockResolvedValue(true);
    const { result, waitForNextUpdate } = renderHook(() => 
      useFormState({ 
        onSubmit,
        focusOptions: {
          successElementId: 'test-element',
          announceResult: true
        }
      })
    );

    act(() => {
      result.current.handleSubmit({ data: 'test' });
    });
    
    await waitForNextUpdate();
    
    // Wait for setTimeout to execute
    await new Promise(r => setTimeout(r, 10));
    
    expect(document.getElementById).toHaveBeenCalledWith('test-element');
    expect(mockFocusElement.focus).toHaveBeenCalled();
  });

  test('should announce to screen readers', async () => {
    const onSubmit = jest.fn().mockResolvedValue(true);
    const { result } = renderHook(() => 
      useFormState({ 
        onSubmit,
        successMessage: 'Success!',
        focusOptions: {
          announceResult: true
        }
      })
    );

    act(() => {
      result.current.announceToScreenReader('Test announcement');
    });

    expect(mockCreateElement).toHaveBeenCalledWith('div');
    expect(mockElement.setAttribute).toHaveBeenCalledWith('aria-live', 'assertive');
    expect(mockElement.setAttribute).toHaveBeenCalledWith('role', 'status');
    expect(mockElement.classList.add).toHaveBeenCalledWith('sr-only');
    expect(mockElement.textContent).toBe('Test announcement');
    expect(mockAppendChild).toHaveBeenCalledWith(mockElement);
  });

  test('should clean up announcement element on unmount', async () => {
    const onSubmit = jest.fn();
    const { result, unmount } = renderHook(() => 
      useFormState({ onSubmit })
    );

    // Call announceToScreenReader to create the ref
    act(() => {
      result.current.announceToScreenReader('Test');
    });

    unmount();
    
    expect(mockRemoveChild).toHaveBeenCalledWith(mockElement);
  });
});
