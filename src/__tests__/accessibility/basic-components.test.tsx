
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { a11yTests } from '../utils/a11y-test-utils';

import { Button } from '@/components/ui/button';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Import test setup
import './setup/a11y-test-setup';

describe('Basic Components Accessibility', () => {
  test('Button meets accessibility standards', async () => {
    const { container } = render(
      <Button aria-label="Test Button">Click Me</Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Form inputs have proper labels', async () => {
    // Create a proper TestForm component with mocked form context
    const TestForm = () => {
      // Create a more complete mock form object that satisfies the UseFormReturn interface
      const mockForm = {
        control: { _formState: {} },
        // Add missing methods required by UseFormReturn
        watch: jest.fn(),
        getValues: jest.fn(),
        getFieldState: jest.fn(),
        setError: jest.fn(),
        clearErrors: jest.fn(),
        reset: jest.fn(),
        resetField: jest.fn(),
        setValue: jest.fn(),
        trigger: jest.fn(),
        unregister: jest.fn(),
        formState: { errors: {} }
      };
      
      return (
        <Form {...mockForm as any}>
          <FormField
            control={mockForm.control as any}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="your@email.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    };

    const { container } = render(<TestForm />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Custom test for form labels
    const labelCount = a11yTests.testFormLabels(container);
    expect(labelCount).toBeGreaterThan(0);
  });
});
