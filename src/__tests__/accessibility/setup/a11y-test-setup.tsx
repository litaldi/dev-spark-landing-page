
import React from 'react';

// Create a mock for the useForm hook result
export const mockFormReturn = {
  register: jest.fn(),
  handleSubmit: jest.fn(),
  control: { 
    _formState: {} 
  },
  formState: { errors: {} },
  watch: jest.fn(),
  setValue: jest.fn(),
  getValues: jest.fn(),
  getFieldState: jest.fn(),
  reset: jest.fn(),
  resetField: jest.fn(),
  setError: jest.fn(),
  clearErrors: jest.fn(),
  unregister: jest.fn(),
  trigger: jest.fn(),
};

// Mock components that are unavailable in the test environment
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

jest.mock('@/components/ui/form', () => ({
  Form: ({ children, ...props }) => {
    // Use React.createElement to properly handle function children
    if (typeof children === 'function') {
      const formContent = children(mockFormReturn);
      return React.createElement('form', props, formContent);
    }
    return <form {...props}>{children}</form>;
  },
  FormField: ({ name, render }) => render({
    field: { name, value: '', onChange: jest.fn() },
    fieldState: { error: null },
    formState: { errors: {} }
  }),
  FormItem: ({ children, ...props }) => <div {...props}>{children}</div>,
  FormLabel: ({ children, ...props }) => <label {...props}>{children}</label>,
  FormControl: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props) => <input {...props} />,
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }) => <label {...props}>{children}</label>,
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children, ...props }) => <div {...props}>{children}</div>,
  DropdownMenuTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
  DropdownMenuContent: ({ children, ...props }) => <div role="menu" {...props}>{children}</div>,
  DropdownMenuItem: ({ children, ...props }) => <div role="menuitem" tabIndex={0} {...props}>{children}</div>,
}));

jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children, ...props }) => <div {...props}>{children}</div>,
  PopoverTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
  PopoverContent: ({ children, ...props }) => <div role="dialog" {...props}>{children}</div>,
}));

jest.mock('@/components/ui/drawer', () => ({
  Drawer: ({ children, ...props }) => <div {...props}>{children}</div>,
  DrawerTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
  DrawerContent: ({ children, ...props }) => <div role="dialog" {...props}>{children}</div>,
}));

jest.mock('@/components/ui/alert-dialog', () => ({
  AlertDialog: ({ children, ...props }) => <div {...props}>{children}</div>,
  AlertDialogTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
  AlertDialogContent: ({ children, ...props }) => <div role="alertdialog" {...props}>{children}</div>,
  AlertDialogTitle: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
  AlertDialogDescription: ({ children, ...props }) => <p {...props}>{children}</p>,
  AlertDialogFooter: ({ children, ...props }) => <div {...props}>{children}</div>,
  AlertDialogAction: ({ children, ...props }) => <button {...props}>{children}</button>,
  AlertDialogCancel: ({ children, ...props }) => <button {...props}>{children}</button>,
}));
