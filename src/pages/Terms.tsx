
import React from "react";
import { Container, Typography, Box, Breadcrumbs, Link as MuiLink, Paper, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </MuiLink>
          <Typography color="text.primary">Terms of Use</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Terms of Use
        </Typography>
        
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Last Updated: May 15, 2025
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing or using DevAI services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              2. Description of Service
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI provides tools and resources for developers to practice coding, build portfolios, and prepare for job interviews. Our services include AI-powered feedback, guided learning paths, and community resources.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              3. User Accounts
            </Typography>
            <Typography variant="body1" paragraph>
              You may need to create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              4. User Content
            </Typography>
            <Typography variant="body1" paragraph>
              You retain all rights to any content you submit through our services. By posting content, you grant DevAI a worldwide, non-exclusive license to use, reproduce, and display your content in connection with providing our services.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              5. Prohibited Activities
            </Typography>
            <Typography variant="body1" paragraph>
              Users may not engage in any activity that interferes with or disrupts our services, attempts to gain unauthorized access to our systems, or violates any applicable laws or regulations.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              6. Modification of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our website or sending an email.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              7. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              8. Disclaimer of Warranties
            </Typography>
            <Typography variant="body1" paragraph>
              Our services are provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              9. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              10. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms shall be governed by the laws of the jurisdiction in which DevAI operates, without regard to its conflict of law provisions.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Terms;
