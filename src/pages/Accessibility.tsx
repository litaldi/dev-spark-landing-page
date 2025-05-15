
import React from "react";
import { Container, Typography, Box, Breadcrumbs, Link as MuiLink, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import Layout from "../components/layout/Layout";

const Accessibility = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </MuiLink>
          <Typography color="text.primary">Accessibility</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Accessibility Statement
        </Typography>
        
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Last Updated: May 15, 2025
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Our Commitment
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Conformance Status
            </Typography>
            <Typography variant="body1" paragraph>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Accessibility Features
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI includes the following accessibility features:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Semantic HTML" secondary="We use appropriate HTML elements to ensure content structure is available to assistive technology." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Keyboard Navigation" secondary="All functionality is available using only a keyboard." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Color Contrast" secondary="Text and interactive elements have sufficient color contrast." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Alt Text" secondary="Images include alternative text descriptions." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Resizable Text" secondary="Text can be resized without loss of functionality." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="ARIA Attributes" secondary="ARIA landmarks and attributes are used to enhance navigation and description." />
              </ListItem>
            </List>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Known Limitations
            </Typography>
            <Typography variant="body1" paragraph>
              Despite our efforts to ensure accessibility of DevAI, there may be some limitations:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Some older PDF documents may not be fully accessible." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Some video content may not have captions or audio descriptions." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Some interactive coding challenges might have limitations in terms of screen reader compatibility." />
              </ListItem>
            </List>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Feedback
            </Typography>
            <Typography variant="body1" paragraph>
              We welcome your feedback on the accessibility of DevAI. Please let us know if you encounter accessibility barriers:
            </Typography>
            <Typography variant="body1" component="div">
              <ul>
                <li>Phone: +1 (800) 123-4567</li>
                <li>Email: accessibility@devai.example.com</li>
                <li>Visitor Address: 123 Innovation Way, San Francisco, CA 94107</li>
              </ul>
            </Typography>
            <Typography variant="body1" paragraph>
              We try to respond to feedback within 5 business days.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Compatibility with Browsers and Assistive Technology
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is designed to be compatible with the following assistive technologies:
            </Typography>
            <Typography variant="body1" component="div">
              <ul>
                <li>JAWS and NVDA screen readers with Firefox, Chrome, and Edge</li>
                <li>VoiceOver with Safari on macOS</li>
                <li>TalkBack with Chrome on Android</li>
                <li>VoiceOver with Safari on iOS</li>
              </ul>
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is designed to be compatible with the latest versions of all major browsers and operating systems, including Chrome, Firefox, Safari, Edge, and their mobile equivalents.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Assessment Approach
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI assessed the accessibility of our platform by the following approaches:
            </Typography>
            <Typography variant="body1" component="div">
              <ul>
                <li>Self-evaluation</li>
                <li>External evaluation using automated tools</li>
                <li>User testing with people who use assistive technology</li>
              </ul>
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
              Continuous Improvement
            </Typography>
            <Typography variant="body1" paragraph>
              DevAI is committed to a program of continuous monitoring and improvement of our platform to ensure ongoing compliance with accessibility standards. We perform regular audits of our platform and implement necessary changes to maintain and improve accessibility.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Accessibility;
