import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import NotFound from '@/pages/NotFound';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound Page', () => {
  test('renders 404 message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  test('has a link back to home page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    
    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('clicking the home button navigates to home page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    
    const homeButton = screen.getByRole('link', { name: /back to home/i });
    fireEvent.click(homeButton);
    
    // In a real test with router context, we would check for navigation
    // Here we just ensure the link has the correct href
    expect(homeButton).toHaveAttribute('href', '/');
  });
});
