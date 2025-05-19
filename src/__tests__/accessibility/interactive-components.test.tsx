
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { a11yTests } from '../utils/a11y-test-utils';

import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent 
} from '@/components/ui/drawer';
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogAction, 
  AlertDialogCancel 
} from '@/components/ui/alert-dialog';

// Import test setup
import './setup/a11y-test-setup';

describe('Interactive Components Accessibility', () => {
  test('DropdownMenu is keyboard accessible', async () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Open menu">Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Custom test for keyboard accessibility
    const interactiveElements = await a11yTests.testKeyboardAccessibility(container);
    expect(interactiveElements).toBeGreaterThan(0);
  });
  
  test('Popover is accessible', async () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger aria-label="Open popover">Open</PopoverTrigger>
        <PopoverContent>
          <h3>Popover Title</h3>
          <p>Popover content</p>
        </PopoverContent>
      </Popover>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Dialog (Alert Dialog) is accessible', async () => {
    const { container } = render(
      <AlertDialog>
        <AlertDialogTrigger aria-label="Open dialog">Open Dialog</AlertDialogTrigger>
        <AlertDialogContent aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <AlertDialogTitle id="dialog-title">Alert Title</AlertDialogTitle>
          <AlertDialogDescription id="dialog-description">
            This is an alert dialog description.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Drawer is accessible', async () => {
    const { container } = render(
      <Drawer>
        <DrawerTrigger aria-label="Open drawer">Open Drawer</DrawerTrigger>
        <DrawerContent aria-label="Drawer content">
          <h3>Drawer Title</h3>
          <p>Drawer content</p>
        </DrawerContent>
      </Drawer>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
