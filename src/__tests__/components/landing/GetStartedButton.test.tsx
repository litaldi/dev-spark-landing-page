
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GetStartedButton from '@/components/landing/GetStartedButton';

// Mock the GetStartedModal component
jest.mock('@/components/landing/GetStartedModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose }) => (
    isOpen ? (
      <div data-testid="modal-content">
        <button onClick={onClose} data-testid="close-modal">Close</button>
      </div>
    ) : null
  )
}));

describe('GetStartedButton Component', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <GetStartedButton />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /get started for free/i });
    expect(button).toBeInTheDocument();
  });

  test('opens modal when clicked', () => {
    render(
      <BrowserRouter>
        <GetStartedButton />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /get started for free/i });
    fireEvent.click(button);
    
    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toBeInTheDocument();
  });

  test('closes modal when close button is clicked', () => {
    render(
      <BrowserRouter>
        <GetStartedButton />
      </BrowserRouter>
    );
    
    // Open modal
    const button = screen.getByRole('button', { name: /get started for free/i });
    fireEvent.click(button);
    
    // Close modal
    const closeButton = screen.getByTestId('close-modal');
    fireEvent.click(closeButton);
    
    // Check that modal is closed
    const modalContent = screen.queryByTestId('modal-content');
    expect(modalContent).not.toBeInTheDocument();
  });

  test('applies mobile styling when isMobile is true', () => {
    render(
      <BrowserRouter>
        <GetStartedButton isMobile={true} />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /get started for free/i });
    expect(button).toHaveClass('justify-start w-full');
  });

  test('calls onMenuClose when clicked in mobile mode', () => {
    const onMenuCloseMock = jest.fn();
    
    render(
      <BrowserRouter>
        <GetStartedButton isMobile={true} onMenuClose={onMenuCloseMock} />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /get started for free/i });
    fireEvent.click(button);
    
    expect(onMenuCloseMock).toHaveBeenCalled();
  });
});
