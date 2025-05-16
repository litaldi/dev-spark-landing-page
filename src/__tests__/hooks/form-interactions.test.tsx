
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useFormState } from '@/hooks/use-form-state';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Test component using the useFormState hook
const TestForm = ({ onSubmitMock, successMessage }: { onSubmitMock: jest.Mock, successMessage?: string }) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ""
    }
  });

  const { handleSubmit, isSubmitting, error } = useFormState({
    onSubmit: onSubmitMock,
    successMessage: successMessage || "Success!",
    errorMessage: "An error occurred."
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} data-testid="test-form">
        <input
          {...form.register("name")}
          placeholder="Name"
          data-testid="name-input"
        />
        <button type="submit" disabled={isSubmitting} data-testid="submit-button">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {error && <div data-testid="error-message">{error}</div>}
      </form>
    </FormProvider>
  );
};

describe('Form Interactions with useFormState', () => {
  test('submits form with valid data', async () => {
    const onSubmitMock = jest.fn().mockResolvedValue(true);
    
    render(<TestForm onSubmitMock={onSubmitMock} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Test User' }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Check that submit button shows loading state
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submitting...');
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({ name: 'Test User' });
    });
  });

  test('displays error message on submission failure', async () => {
    const onSubmitMock = jest.fn().mockRejectedValue(new Error('Failed'));
    
    render(<TestForm onSubmitMock={onSubmitMock} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Test User' }
    });
    
    // Submit the form
    fireEvent.submit(screen.getByTestId('test-form'));
    
    // Wait for submission to fail
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent('An error occurred.');
    });
  });
});
