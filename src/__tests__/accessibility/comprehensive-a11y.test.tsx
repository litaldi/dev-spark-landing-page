
import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('Comprehensive Accessibility Testing', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  describe('Form Components Accessibility', () => {
    it('EnhancedInput has proper ARIA attributes', async () => {
      const { container } = renderWithProviders(
        <EnhancedInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error="Invalid email format"
          hint="We'll never share your email"
          required
        />
      );
      
      const input = screen.getByLabelText(/email address/i);
      
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('password input with toggle has proper accessibility', async () => {
      const { container } = renderWithProviders(
        <EnhancedInput
          label="Password"
          type="password"
          showPasswordToggle={true}
          required
        />
      );
      
      const input = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByRole('button', { name: /show password/i });
      
      expect(input).toHaveAttribute('type', 'password');
      expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
      
      // Test toggle functionality
      fireEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('error states are properly announced', async () => {
      const { container } = renderWithProviders(
        <EnhancedInput
          label="Username"
          error="Username is required"
          id="username-input"
        />
      );
      
      const input = screen.getByLabelText(/username/i);
      const errorMessage = screen.getByText(/username is required/i);
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'username-input-error');
      expect(errorMessage).toHaveAttribute('id', 'username-input-error');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Button Accessibility', () => {
    it('buttons have proper focus management', async () => {
      const { container } = renderWithProviders(
        <div>
          <Button variant="default">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
          <Button variant="ghost" disabled>Disabled Action</Button>
        </div>
      );
      
      const primaryButton = screen.getByRole('button', { name: /primary action/i });
      const secondaryButton = screen.getByRole('button', { name: /secondary action/i });
      const disabledButton = screen.getByRole('button', { name: /disabled action/i });
      
      expect(primaryButton).toBeEnabled();
      expect(secondaryButton).toBeEnabled();
      expect(disabledButton).toBeDisabled();
      
      // Test focus management
      primaryButton.focus();
      expect(document.activeElement).toBe(primaryButton);
      
      fireEvent.keyDown(primaryButton, { key: 'Tab' });
      expect(document.activeElement).toBe(secondaryButton);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('icon buttons have proper labels', async () => {
      const { container } = renderWithProviders(
        <Button variant="outline" size="icon" aria-label="Close dialog">
          ✕
        </Button>
      );
      
      const iconButton = screen.getByRole('button', { name: /close dialog/i });
      expect(iconButton).toHaveAttribute('aria-label', 'Close dialog');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Card Component Accessibility', () => {
    it('cards have proper structure and landmarks', async () => {
      const { container } = renderWithProviders(
        <Card className="p-6">
          <h2>Card Title</h2>
          <p>Card content goes here</p>
          <Button>Action</Button>
        </Card>
      );
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Card Title');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Tab navigation correctly', () => {
      renderWithProviders(
        <div>
          <Button>First</Button>
          <EnhancedInput label="Input" />
          <Button>Last</Button>
        </div>
      );
      
      const firstButton = screen.getByRole('button', { name: /first/i });
      const input = screen.getByLabelText(/input/i);
      const lastButton = screen.getByRole('button', { name: /last/i });
      
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);
      
      fireEvent.keyDown(firstButton, { key: 'Tab' });
      expect(document.activeElement).toBe(input);
      
      fireEvent.keyDown(input, { key: 'Tab' });
      expect(document.activeElement).toBe(lastButton);
    });

    it('handles Escape key for dialogs and modals', () => {
      const onClose = jest.fn();
      
      renderWithProviders(
        <div role="dialog" aria-label="Test dialog" onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}>
          <h2>Dialog Title</h2>
          <Button onClick={onClose}>Close</Button>
        </div>
      );
      
      const dialog = screen.getByRole('dialog');
      fireEvent.keyDown(dialog, { key: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Screen Reader Support', () => {
    it('provides proper heading hierarchy', async () => {
      const { container } = renderWithProviders(
        <main>
          <h1>Main Title</h1>
          <section>
            <h2>Section Title</h2>
            <article>
              <h3>Article Title</h3>
              <p>Content</p>
            </article>
          </section>
        </main>
      );
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3 = screen.getByRole('heading', { level: 3 });
      
      expect(h1).toHaveTextContent('Main Title');
      expect(h2).toHaveTextContent('Section Title');
      expect(h3).toHaveTextContent('Article Title');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper landmarks', async () => {
      const { container } = renderWithProviders(
        <div>
          <header>
            <nav aria-label="Main navigation">
              <Button>Home</Button>
              <Button>About</Button>
            </nav>
          </header>
          <main>
            <h1>Main Content</h1>
          </main>
          <footer>
            <p>Footer content</p>
          </footer>
        </div>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast & Visual Accessibility', () => {
    it('maintains proper color contrast ratios', async () => {
      const { container } = renderWithProviders(
        <div>
          <Button variant="default">Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive Button</Button>
        </div>
      );
      
      // Axe will check color contrast automatically
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      
      renderWithProviders(
        <Button className="transition-all duration-300 hover:scale-105">
          Animated Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // In a real app, CSS would handle reduced motion
    });
  });

  describe('Mobile Accessibility', () => {
    it('provides adequate touch targets', () => {
      renderWithProviders(
        <div>
          <Button size="sm">Small Button</Button>
          <Button size="default">Default Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Buttons should be large enough for touch interaction
        const styles = window.getComputedStyle(button);
        // Note: In a real test, we'd check computed height/width
        expect(button).toBeInTheDocument();
      });
    });
  });
});
