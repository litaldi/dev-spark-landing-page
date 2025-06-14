
import React from 'react';
import { ConsolidatedLayout } from '@/components/layout/ConsolidatedLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AccessibilityStatement() {
  return (
    <ConsolidatedLayout 
      title="Accessibility Statement" 
      description="Our commitment to creating an accessible website for all users"
    >
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
        
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-lg mb-4">
            We are committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone and applying the 
            relevant accessibility standards.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Conformance status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers 
            and developers to improve accessibility for people with disabilities. It defines 
            three levels of conformance: Level A, Level AA, and Level AAA. Our website is 
            partially conformant with WCAG 2.1 level AA standards. Partially conformant means 
            that some parts of the content do not fully conform to the accessibility standard.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Accessibility Features</h2>
          <p>Our website includes the following accessibility features:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>High contrast mode for improved readability</li>
            <li>Keyboard navigation mode with visible focus indicators</li>
            <li>Text resizing options</li>
            <li>Reduced motion settings</li>
            <li>Skip navigation links</li>
            <li>ARIA landmarks for screen reader navigation</li>
            <li>Alt text for images</li>
            <li>Keyboard-accessible controls</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Accessibility Menu</h2>
          <p>
            Our accessibility menu allows you to customize your experience. Look for the 
            accessibility icon <span className="inline-flex items-center" aria-hidden="true">(♿)</span> in the site navigation.
            The menu provides options to:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Change text size</li>
            <li>Enable high contrast mode</li>
            <li>Enable keyboard navigation mode</li>
            <li>Reduce motion/animations</li>
            <li>Use a larger pointer</li>
            <li>Adjust letter spacing</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Keyboard Navigation</h2>
          <p>
            All interactive elements on our website can be accessed using a keyboard. 
            Common keyboard controls include:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li><strong>Tab</strong>: Navigate to the next focusable element</li>
            <li><strong>Shift + Tab</strong>: Navigate to the previous focusable element</li>
            <li><strong>Enter/Space</strong>: Activate buttons, links, or other controls</li>
            <li><strong>Escape</strong>: Close dialogs, menus, or other overlays</li>
            <li><strong>Arrow Keys</strong>: Navigate within components like menus or sliders</li>
          </ul>
          
          <Separator className="my-8" />
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of our website. Please let us know if 
            you encounter accessibility barriers:
          </p>
          <div className="mt-4 mb-8">
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:accessibility@example.com" className="text-primary hover:underline">accessibility@example.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a></li>
              <li>
                <Button variant="outline" className="mt-2" onClick={() => window.location.href = '/contact'}>
                  Contact Form
                </Button>
              </li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Compatible Technologies</h2>
          <p>
            Our website has been tested with the following assistive technologies:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>NVDA screen reader with Firefox and Chrome</li>
            <li>VoiceOver with Safari on macOS</li>
            <li>TalkBack with Chrome on Android</li>
            <li>Windows High Contrast Mode</li>
            <li>Keyboard-only navigation</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Technical Specifications</h2>
          <p>
            Accessibility of our website relies on the following technologies to work with the 
            particular combination of web browser and any assistive technologies or plugins 
            installed on your computer:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          
          <p>These technologies are relied upon for conformance with the accessibility standards used.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Assessment Approach</h2>
          <p>
            We assessed the accessibility of our website using the following approaches:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
            <li>Self-evaluation</li>
            <li>Automated testing tools</li>
            <li>User testing with assistive technologies</li>
            <li>Manual keyboard testing</li>
          </ul>
          
          <p className="mt-8 text-sm text-muted-foreground">
            This statement was last updated on May 19, 2025.
          </p>
        </div>
      </div>
    </ConsolidatedLayout>
  );
}
