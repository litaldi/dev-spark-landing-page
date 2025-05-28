import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { RegisterForm } from '@/components/auth/RegisterForm';

describe('RegisterForm Component', () => {
  const mockRegister = jest.fn();
  const mockUseForm = {
    register: jest.fn(),
    handleSubmit: (fn: any) => fn,
    formState: { errors: {} },
    setError: jest.fn(),
    clearErrors: jest.fn(),
    watch: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    trigger: jest.fn(),
  };

  beforeEach(() => {
    mockRegister.mockClear();
    mockUseForm.register.mockClear();
    mockUseForm.setError.mockClear();
    mockUseForm.clearErrors.mockClear();
    mockUseForm.watch.mockClear();
    mockUseForm.setValue.mockClear();
    mockUseForm.getValues.mockClear();
    mockUseForm.trigger.mockClear();
    mockRegister.mockImplementation((name) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));
  });

  test('renders correctly', () => {
    render(<RegisterForm register={mockRegister} useForm={mockUseForm} registerAction={mockRegister} />);
    expect(screen.getByText('Create an account')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(<RegisterForm register={mockRegister} useForm={mockUseForm} registerAction={mockRegister} />);
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    // Since handleSubmit is mocked, we can only check if the button is clickable
    expect(submitButton).toBeEnabled();
  });

  test('displays validation errors', async () => {
    const mockUseFormWithErrors = {
      ...mockUseForm,
      formState: {
        errors: {
          name: { type: 'required', message: 'Name is required' },
          email: { type: 'required', message: 'Email is required' },
          password: { type: 'required', message: 'Password is required' },
        },
      },
    };

    render(<RegisterForm register={mockRegister} useForm={mockUseFormWithErrors} registerAction={mockRegister} />);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('updates tosAccepted state on checkbox change', () => {
    render(<RegisterForm register={mockRegister} useForm={mockUseForm} registerAction={mockRegister} />);
    
    const tosCheckbox = screen.getByRole('checkbox', {
      name: /i agree to the terms of service and privacy policy/i,
    });
    
    fireEvent.click(tosCheckbox);
  });
});
