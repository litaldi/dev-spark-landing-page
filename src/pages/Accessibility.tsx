
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Container, Typography, Box, Breadcrumbs, Link } from "@mui/material";

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" className="mb-6">
            <Link href="/" color="inherit" underline="hover">Home</Link>
            <Typography color="text.primary">Accessibility Statement</Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" component="h1" className="font-bold text-3xl md:text-4xl mb-8 text-brand-800">
            Accessibility Statement
          </Typography>
          
          <Box className="prose max-w-none">
            <Typography variant="body1" paragraph>
              Last Updated: May 15, 2025
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Our Commitment
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to achieve this.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Conformance Status
            </Typography>
            <Typography variant="body1" paragraph>
              The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. DevAI is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Accessibility Features
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI includes the following accessibility features:
            </Typography>
            <ul className="list-disc pl-8 mb-6">
              <li>Semantic HTML structure</li>
              <li>Keyboard navigation support</li>
              <li>ARIA attributes where appropriate</li>
              <li>Alternative text for images</li>
              <li>Color contrast that meets WCAG 2.1 AA standards</li>
              <li>Resizable text without loss of functionality</li>
              <li>Focus indicators for keyboard navigation</li>
            </ul>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Compatible Browsers and Assistive Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is designed to be compatible with the following browsers and assistive technologies:
            </Typography>
            <ul className="list-disc pl-8 mb-6">
              <li>Latest versions of Chrome, Firefox, Safari, and Edge</li>
              <li>Screen readers including NVDA, JAWS, and VoiceOver</li>
              <li>Zoom capabilities up to 200% without loss of content or functionality</li>
            </ul>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Known Limitations
            </Typography>
            <Typography variant="body1" paragraph>
              Despite our best efforts, there may be some aspects of our website that are not fully accessible:
            </Typography>
            <ul className="list-disc pl-8 mb-6">
              <li>Some older PDF documents may not be fully accessible to screen readers</li>
              <li>Some interactive code examples may have limited accessibility features</li>
              <li>Some third-party content may not be fully accessible</li>
            </ul>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Feedback
            </Typography>
            <Typography variant="body1" paragraph>
              We welcome your feedback on the accessibility of DevAI. Please let us know if you encounter accessibility barriers:
            </Typography>
            <ul className="list-disc pl-8 mb-6">
              <li>Email: accessibility@devai.example.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Feedback form: [Link to form]</li>
            </ul>
            <Typography variant="body1" paragraph>
              We try to respond to feedback within 2 business days.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Assessment Methods
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI assesses the accessibility of our website using the following methods:
            </Typography>
            <ul className="list-disc pl-8 mb-6">
              <li>Self-evaluation</li>
              <li>External evaluation by accessibility experts</li>
              <li>User testing with assistive technologies</li>
              <li>Automated testing tools</li>
            </ul>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              Formal Approval
            </Typography>
            <Typography variant="body1" paragraph>
              This accessibility statement was created on May 15, 2025, and was last updated on May 15, 2025.
            </Typography>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
