
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/a11y/FormError';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { a11yTests } from '../utils/a11y-test-utils';

// Import test setup
import './setup/a11y-test-setup';

describe('Form Validation Accessibility', () => {
  // Test form with validation and error messages
  test('Form validation error messages are accessible', async () => {
    // Define a schema for the test form
    const formSchema = z.object({
      email: z.string().email({ message: "Please enter a valid email address" }),
      password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    });

    // Create a test component with validation
    const TestValidationForm = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        }
      });

      const [submitted, setSubmitted] = useState(false);

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        setSubmitted(true);
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        aria-required="true"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="email-error" aria-live="polite" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input 
                        id="password"
                        type="password" 
                        placeholder="********"
                        aria-required="true"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="password-error" aria-live="polite" />
                  </FormItem>
                )}
              />
              
              {submitted && (
                <Alert role="status" aria-live="polite" className="bg-green-50 border-green-200">
                  <AlertDescription>Form submitted successfully!</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      );
    };

    const { container } = render(<TestValidationForm />);
    
    // Initial render should have no accessibility violations
    let results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Fill in invalid values to trigger validation errors
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);
    
    // Form should now display validation errors
    // Check that they're accessible
    results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check if error messages have proper accessibility attributes
    const emailError = await screen.findByText(/please enter a valid email address/i);
    const passwordError = await screen.findByText(/password must be at least 8 characters/i);
    
    // Error messages should be visible to screen readers
    expect(emailError).toHaveAttribute('id', 'email-error');
    expect(passwordError).toHaveAttribute('id', 'password-error');
    
    // Now fill in valid values and submit again
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword123' } });
    fireEvent.click(submitButton);
    
    // Success message should appear and be accessible
    const successMessage = await screen.findByText(/form submitted successfully/i);
    expect(successMessage).toBeInTheDocument();
    
    // Check that success message is accessible
    results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check success message has proper accessibility attributes
    const successAlert = successMessage.closest('[role="status"]');
    expect(successAlert).toHaveAttribute('aria-live', 'polite');
  });
  
  test('Alert error messages are accessible', async () => {
    const AlertErrorTest = () => {
      const [error, setError] = useState<string | null>("This is an error message");
      return (
        <div>
          <h2 id="form-title">Form with Error</h2>
          <div aria-labelledby="form-title">
            <FormError 
              id="form-error"
              error={error} 
              autoAnnounce={true} 
            />
            <Button onClick={() => setError(null)}>Dismiss Error</Button>
          </div>
        </div>
      );
    };
    
    const { container } = render(<AlertErrorTest />);
    
    // Check for accessibility violations
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check error message accessibility attributes
    const errorElement = container.querySelector('#form-error');
    expect(errorElement).toHaveAttribute('role', 'alert');
    expect(errorElement).toHaveAttribute('aria-live', 'assertive');
    
    // Test dismissing the error
    const dismissButton = screen.getByRole('button', { name: /dismiss error/i });
    fireEvent.click(dismissButton);
    
    // Error should no longer be in the document
    expect(screen.queryByText(/this is an error message/i)).not.toBeInTheDocument();
  });
  
  test('FormError component with useFormErrorAnnouncement hook', async () => {
    // Testing the FormError component's hook functionality
    const TestFormErrors = () => {
      const [errors, setErrors] = useState<Record<string, string>>({});
      
      const handleAddError = () => {
        setErrors({
          ...errors,
          name: "Name is required",
          email: "Email must be valid"
        });
      };
      
      const handleResetErrors = () => {
        setErrors({});
      };
      
      return (
        <div>
          <div className="space-y-4">
            <Button onClick={handleAddError}>Show Errors</Button>
            <Button onClick={handleResetErrors}>Clear Errors</Button>
            
            {Object.entries(errors).map(([field, errorMsg]) => (
              <FormError 
                key={field}
                id={`${field}-error`}
                error={errorMsg}
              />
            ))}
          </div>
        </div>
      );
    };
    
    const { container } = render(<TestFormErrors />);
    
    // Initial render should be accessible
    let results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Show errors
    const showButton = screen.getByRole('button', { name: /show errors/i });
    fireEvent.click(showButton);
    
    // Check if errors are rendered and accessible
    const nameError = screen.getByText(/name is required/i);
    const emailError = screen.getByText(/email must be valid/i);
    
    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    
    // Check accessibility after errors appear
    results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check that errors have proper ARIA attributes
    const nameErrorContainer = container.querySelector('#name-error');
    const emailErrorContainer = container.querySelector('#email-error');
    
    expect(nameErrorContainer).toHaveAttribute('role', 'alert');
    expect(emailErrorContainer).toHaveAttribute('role', 'alert');
    expect(nameErrorContainer).toHaveAttribute('aria-live', 'assertive');
    expect(emailErrorContainer).toHaveAttribute('aria-live', 'assertive');
    
    // Clear errors
    const clearButton = screen.getByRole('button', { name: /clear errors/i });
    fireEvent.click(clearButton);
    
    // Errors should be gone
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email must be valid/i)).not.toBeInTheDocument();
  });
  
  test('Form with pending state feedback is accessible', async () => {
    // Test submission feedback states
    const TestFormSubmissionStates = () => {
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);
      
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
        }, 100);
      };
      
      return (
        <form onSubmit={handleSubmit} aria-live="polite">
          <div className="space-y-4">
            <div>
              <label htmlFor="test-input" className="block">Test Input</label>
              <Input id="test-input" />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
            
            {isSubmitting && (
              <div role="status" aria-live="polite">
                <p>Processing your submission...</p>
              </div>
            )}
            
            {isSuccess && (
              <div role="status" aria-live="polite" className="text-green-600">
                <p>Form submitted successfully!</p>
              </div>
            )}
          </div>
        </form>
      );
    };
    
    const { container } = render(<TestFormSubmissionStates />);
    
    // Initial render should be accessible
    let results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Submit the form
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    
    // Button should now be disabled with aria-busy
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
    
    // Wait for the "success" state
    const successMessage = await screen.findByText(/form submitted successfully/i);
    expect(successMessage).toBeInTheDocument();
    
    // Success state should be accessible
    results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check proper aria attributes for success message
    const successContainer = successMessage.closest('[role="status"]');
    expect(successContainer).toHaveAttribute('aria-live', 'polite');
  });
});
