
import React from "react";
import { Container, Typography, Box, Breadcrumbs, Link as MuiLink, Paper, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </MuiLink>
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Privacy Policy
        </Typography>
        
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Last Updated: May 15, 2025
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              At DevAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              2. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect personal information that you voluntarily provide to us, such as your name, email address, and profile information when you register for an account. We also automatically collect certain information about your device and how you interact with our services.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              3. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and monitor and analyze usage patterns to enhance user experience.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              4. Information Sharing
            </Typography>
            <Typography variant="body1" paragraph>
              We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service. We may also disclose your information if required by law or to protect our rights, privacy, safety, or property.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              5. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              6. Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              7. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              8. Third-Party Links
            </Typography>
            <Typography variant="body1" paragraph>
              Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              9. Children's Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              10. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              11. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions or concerns about this Privacy Policy, please contact us at privacy@devai.example.com.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Privacy;
