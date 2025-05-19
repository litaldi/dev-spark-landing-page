
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
    // Using Fragment to avoid TypeScript error with function as child
    const TestForm = () => {
      // Mock form object to pass to the render prop
      const mockForm = {
        control: { _formState: {} },
      };
      
      return (
        <Form>
          {/* Explicitly type the form parameter and cast the function as any to resolve the type error */}
          {(form: typeof mockForm) => (
            <FormField
              control={form.control}
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
          ) as any}
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
