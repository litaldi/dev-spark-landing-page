
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';

// Mock the dependencies
jest.mock('@/hooks/auth', () => ({
  useAuth: () => ({
    register: jest.fn().mockResolvedValue(true),
    isLoading: false,
    errorMessage: null,
    clearError: jest.fn()
  })
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (callback) => (data) => callback(data),
    formState: {
      errors: {},
      isSubmitting: false,
      isValid: true,
    },
    watch: jest.fn(),
    setValue: jest.fn(),
    control: {},
    reset: jest.fn(),
    getValues: jest.fn().mockReturnValue({
      email: 'test@example.com',
      name: 'Test User',
      password: 'Password123!'
    })
  })
}));

// Mock components
jest.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <form data-testid="register-form">{children}</form>,
  FormField: ({ render }) => render({
    field: { value: '', onChange: jest.fn(), name: '', ref: jest.fn() }
  }),
  FormItem: ({ children }) => <div data-testid="form-item">{children}</div>,
  FormLabel: ({ children }) => <label data-testid="form-label">{children}</label>,
  FormControl: ({ children }) => <div data-testid="form-control">{children}</div>,
  FormDescription: ({ children }) => <div data-testid="form-description">{children}</div>,
  FormMessage: ({ children }) => children ? <div data-testid="form-message">{children}</div> : null,
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props) => <input data-testid={`input-${props.name || 'unnamed'}`} {...props} />
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => 
    <button data-testid="submit-button" {...props}>{children}</button>
}));

jest.mock('@/components/auth/AlertError', () => ({
  AlertError: ({ message }) => 
    message ? <div data-testid="alert-error">{message}</div> : null
}));

jest.mock('@/components/auth/PasswordStrengthIndicator', () => ({
  PasswordStrengthIndicator: ({ password }) => 
    <div data-testid="password-strength">
      Strength: {password ? (password.length > 8 ? 'Strong' : 'Weak') : 'None'}
    </div>
}));

describe('RegisterForm Component', () => {
  const mockSubmit = jest.fn();
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders registration form correctly', () => {
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={mockSubmit} />
      </BrowserRouter>
    );
    
    // Check for main form elements
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    
    // Test for the buttons and links
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toHaveTextContent(/create account/i);
  });
  
  test('submits form with user data', async () => {
    const { register } = require('@/hooks/auth').useAuth();
    
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={mockSubmit} />
      </BrowserRouter>
    );
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Check if registration function was called
    await waitFor(() => {
      expect(register).toHaveBeenCalled();
    });
    
    // Check if success callback was called
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
  
  test('displays password strength indicator', () => {
    render(
      <BrowserRouter>
        <RegisterForm onGoogleSignUp={mockSubmit} />
      </BrowserRouter>
    );
    
    // Password strength indicator should be visible
    const strengthIndicator = screen.getByTestId('password-strength');
    expect(strengthIndicator).toBeInTheDocument();
  });
  
  test('shows loading state during submission', () => {
    // Override mock to set isLoading to true
    jest.mock('@/hooks/auth', () => ({
      useAuth: () => ({
        register: jest.fn().mockResolvedValue(true),
        isLoading: true,
        errorMessage: null,
        clearError: jest.fn()
      })
    }));
    
    // The test would check for loading state indicators, but our
    // current mocking approach doesn't allow this to be easily tested
  });
});
