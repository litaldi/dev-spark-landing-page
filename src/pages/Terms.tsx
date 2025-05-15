
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Container, Typography, Box, Breadcrumbs, Link } from "@mui/material";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" className="mb-6">
            <Link href="/" color="inherit" underline="hover">Home</Link>
            <Typography color="text.primary">Terms of Use</Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" component="h1" className="font-bold text-3xl md:text-4xl mb-8 text-brand-800">
            Terms of Use
          </Typography>
          
          <Box className="prose max-w-none">
            <Typography variant="body1" paragraph>
              Last Updated: May 15, 2025
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing or using DevAI services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              2. Description of Service
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI provides tools and resources for developers to practice coding, build portfolios, and prepare for job interviews. Our services include AI-powered feedback, guided learning paths, and community resources.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              3. User Accounts
            </Typography>
            <Typography variant="body1" paragraph>
              You may need to create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              4. User Content
            </Typography>
            <Typography variant="body1" paragraph>
              You retain all rights to any content you submit through our services. By posting content, you grant DevAI a worldwide, non-exclusive license to use, reproduce, and display your content in connection with providing our services.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              5. Prohibited Activities
            </Typography>
            <Typography variant="body1" paragraph>
              Users may not engage in any activity that interferes with or disrupts our services, attempts to gain unauthorized access to our systems, or violates any applicable laws or regulations.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              6. Modification of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our website or sending an email.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              7. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              8. Disclaimer of Warranties
            </Typography>
            <Typography variant="body1" paragraph>
              Our services are provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              9. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </Typography>
            
            <Typography variant="h5" component="h2" className="font-medium mt-8 mb-4">
              10. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms shall be governed by the laws of the jurisdiction in which DevAI operates, without regard to its conflict of law provisions.
            </Typography>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
