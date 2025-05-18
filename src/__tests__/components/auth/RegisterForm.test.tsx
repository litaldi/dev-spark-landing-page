
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';
import * as useAuthHook from '@/hooks/auth';

// Mock the useAuth hook
jest.mock('@/hooks/auth', () => ({
  useAuth: jest.fn(),
}));

describe('RegisterForm Component', () => {
  beforeEach(() => {
    // Default mock implementation for useAuth
    (useAuthHook.useAuth as jest.Mock).mockReturnValue({
      register: jest.fn().mockResolvedValue(true),
      isLoading: false,
      errorMessage: null,
      clearError: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form elements correctly', () => {
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={jest.fn()} />
      </BrowserRouter>
    );

    // Check for form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
  });

  test('validates form fields correctly', async () => {
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={jest.fn()} />
      </BrowserRouter>
    );
    
    // Submit without filling in required fields
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Fill in invalid data
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'weak' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'different' } });
    
    fireEvent.click(submitButton);
    
    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockRegister = jest.fn().mockResolvedValue(true);
    (useAuthHook.useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      errorMessage: null,
      clearError: jest.fn(),
    });
    
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={jest.fn()} />
      </BrowserRouter>
    );
    
    // Fill in valid data
    fireEvent.input(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'StrongPassword123!' } });
    fireEvent.input(screen.getByLabelText(/confirm password/i), { target: { value: 'StrongPassword123!' } });
    
    // Accept terms
    const termsCheckbox = screen.getByLabelText(/i agree to the terms/i);
    fireEvent.click(termsCheckbox);
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    // Check if register function was called with correct data
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'StrongPassword123!',
      });
    });
  });

  test('shows loading state when submitting', async () => {
    (useAuthHook.useAuth as jest.Mock).mockReturnValue({
      register: jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100))),
      isLoading: true,
      errorMessage: null,
      clearError: jest.fn(),
    });
    
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={jest.fn()} />
      </BrowserRouter>
    );
    
    // Check for loading state
    expect(screen.getByRole('button', { name: /creating account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
  });
});
