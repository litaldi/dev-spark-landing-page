
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Container, Typography, Box, Breadcrumbs, Link } from "@mui/material";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" className="mb-6">
            <Link href="/" color="inherit" underline="hover">Home</Link>
            <Typography color="text.primary">Privacy Policy</Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" component="h1" className="font-bold text-3xl md:text-4xl mb-8 text-brand-800">
            Privacy Policy
          </Typography>
          
          <Box className="prose max-w-none">
            <Typography variant="body1" paragraph>
              Last Updated: May 15, 2025
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              1. Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              At DevAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              2. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect personal information that you voluntarily provide to us, such as your name, email address, and profile information when you register for an account. We also automatically collect certain information about your device and how you interact with our services.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              3. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and monitor and analyze usage patterns to enhance user experience.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              4. Information Sharing
            </Typography>
            <Typography variant="body1" paragraph>
              We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service. We may also disclose your information if required by law or to protect our rights, privacy, safety, or property.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              5. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              6. Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              7. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              8. Third-Party Links
            </Typography>
            <Typography variant="body1" paragraph>
              Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              9. Children's Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              10. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              11. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions or concerns about this Privacy Policy, please contact us at privacy@devai.example.com.
            </Typography>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
