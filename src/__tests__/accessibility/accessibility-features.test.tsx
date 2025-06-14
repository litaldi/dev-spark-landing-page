
import React from 'react';
import { render, screen } from '../test-utils';
import { axe } from 'jest-axe';
import { a11yTests } from '../utils/a11y-test-utils';

import { AccessibilityMenu } from '@/components/a11y/AccessibilityMenu';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { WebFirstLayout } from '@/components/layout/WebFirstLayout';

// Import test setup
import './setup/a11y-test-setup';

describe('Accessibility Features', () => {
  test('SkipNav is properly implemented', async () => {
    const { container } = render(
      <>
        <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
        <header>
          <nav>Navigation</nav>
        </header>
        <SkipNavContent id="main-content">
          <main>Main content</main>
        </SkipNavContent>
      </>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Custom test for skip links
    const hasSkipLink = a11yTests.testSkipLinks(container);
    expect(hasSkipLink).toBe(true);
  });
  
  test('AccessibilityMenu provides necessary options', async () => {
    const { container } = render(
      <AccessibilityMenu />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check for accessibility button
    const button = screen.getByRole('button', { name: /accessibility options/i });
    expect(button).toBeInTheDocument();
  });
  
  test('WebFirstLayout includes proper landmarks', async () => {
    const { container } = render(
      <WebFirstLayout title="Test Page" description="Test description">
        <div>Page content</div>
      </WebFirstLayout>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Test for proper ARIA landmarks
    const landmarksCount = a11yTests.testAriaLandmarks(container);
    expect(landmarksCount).toBeGreaterThan(0);
    
    // Check for skip link
    const hasSkipLink = a11yTests.testSkipLinks(container);
    expect(hasSkipLink).toBe(true);
  });
});
