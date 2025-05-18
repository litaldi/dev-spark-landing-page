
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useFormState } from '@/hooks/use-form-state';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock useToast
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Mock announceToScreenReader functionality for accessibility testing
const mockAnnounceSpy = jest.fn();
jest.mock('@/utils/accessibility', () => ({
  announceToScreenReader: (message: string) => mockAnnounceSpy(message),
}));

// Test component that uses the useFormState hook
const TestForm = ({ 
  onSubmitMock, 
  shouldFail = false,
  successMessage = "Success!",
  errorMessage = "Error occurred."
}: { 
  onSubmitMock: jest.Mock, 
  shouldFail?: boolean,
  successMessage?: string,
  errorMessage?: string
}) => {
  // Create a simple form schema
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
  });
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ""
    }
  });
  
  // Use our hook
  const { 
    handleSubmit, 
    isSubmitting, 
    isSuccess,
    error, 
    resetFormState
  } = useFormState({
    onSubmit: async (data) => {
      onSubmitMock(data);
      if (shouldFail) throw new Error("Submission failed");
      return true;
    },
    successMessage,
    errorMessage,
    focusOptions: {
      focusOnError: true,
      announceResult: true
    }
  });
  
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} data-testid="test-form">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...form.register("name")}
            placeholder="Enter name"
            data-testid="name-input"
          />
          {form.formState.errors.name && (
            <span data-testid="name-error">{form.formState.errors.name.message}</span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          data-testid="submit-button"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        
        {isSuccess && <div data-testid="success-message">Form submitted successfully!</div>}
        {error && <div data-testid="error-message">{error}</div>}
        
        {isSuccess && (
          <button 
            type="button"
            onClick={resetFormState}
            data-testid="reset-button"
          >
            Reset
          </button>
        )}
      </form>
    </FormProvider>
  );
};

describe('useFormState Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('handles successful form submission', async () => {
    const onSubmitMock = jest.fn();
    
    render(<TestForm onSubmitMock={onSubmitMock} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Should display loading state
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submitting...');
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
    
    // Should call onSubmit with form data
    expect(onSubmitMock).toHaveBeenCalledWith({ name: 'John Doe' });
    
    // Should announce success message for screen readers
    expect(mockAnnounceSpy).toHaveBeenCalledWith(
      expect.stringContaining("Success")
    );
  });
  
  test('handles form submission errors', async () => {
    const onSubmitMock = jest.fn();
    
    render(<TestForm onSubmitMock={onSubmitMock} shouldFail={true} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Wait for submission to fail
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    // Should display error message
    expect(screen.getByTestId('error-message')).toHaveTextContent('Error occurred.');
    
    // Should announce error message for screen readers
    expect(mockAnnounceSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error")
    );
  });
  
  test('validates form fields before submission', async () => {
    const onSubmitMock = jest.fn();
    
    render(<TestForm onSubmitMock={onSubmitMock} />);
    
    // Submit without filling the required field
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Wait for validation error
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
    });
    
    // Should not call onSubmit
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
  
  test('resets form state when clicking reset button', async () => {
    const onSubmitMock = jest.fn();
    
    render(<TestForm onSubmitMock={onSubmitMock} />);
    
    // Fill out and submit the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Wait for submission to succeed
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
    
    // Click reset button
    fireEvent.click(screen.getByTestId('reset-button'));
    
    // Success message should be gone
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
  });
  
  test('uses custom success and error messages', async () => {
    const onSubmitMock = jest.fn();
    const customSuccess = "Custom success message!";
    const customError = "Custom error occurred!";
    
    // Test success scenario
    const { rerender } = render(
      <TestForm 
        onSubmitMock={onSubmitMock} 
        successMessage={customSuccess} 
        errorMessage={customError}
      />
    );
    
    // Fill out and submit the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Wait for submission and check for custom announcement
    await waitFor(() => {
      expect(mockAnnounceSpy).toHaveBeenCalledWith(
        expect.stringContaining(customSuccess)
      );
    });
    
    // Test error scenario
    jest.clearAllMocks();
    rerender(
      <TestForm 
        onSubmitMock={onSubmitMock} 
        shouldFail={true}
        successMessage={customSuccess} 
        errorMessage={customError}
      />
    );
    
    // Fill out and submit the form again
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'John Doe' }
    });
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Wait for error and check for custom error message
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(customError);
      expect(mockAnnounceSpy).toHaveBeenCalledWith(
        expect.stringContaining(customError)
      );
    });
  });
});
