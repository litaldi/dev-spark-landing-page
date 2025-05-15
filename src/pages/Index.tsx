
import React from "react";
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardActions, Stack, Paper, Divider } from "@mui/material";
import Layout from "../components/layout/Layout";
import HeroSection from "@/components/landing/HeroSection";
import FaqAccordion from "@/components/landing/FaqAccordion";
import FeatureComparisonTable from "@/components/landing/FeatureComparisonTable";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyItWorks from "@/components/landing/WhyItWorks";
import CommunityStats from "@/components/landing/CommunityStats";
import AppPreview from "@/components/landing/AppPreview";
import { Link as RouterLink } from "react-router-dom";

const features = [
  {
    title: "AI-Powered Practice",
    description: "Get instant feedback on your code with our AI assistant that helps identify issues and suggests improvements in real-time."
  },
  {
    title: "Interview Preparation",
    description: "Practice with real interview questions from top tech companies and receive personalized feedback on your responses."
  },
  {
    title: "Portfolio Builder",
    description: "Create impressive projects with guided challenges that help you demonstrate your skills to potential employers."
  },
  {
    title: "Resume Optimization",
    description: "Our AI analyzes your resume against industry standards and job descriptions to help you stand out to recruiters."
  },
  {
    title: "Personalized Learning",
    description: "Adaptive learning paths that adjust based on your strengths and areas for improvement."
  },
  {
    title: "Community Support",
    description: "Connect with fellow developers, share resources, and learn from others in our supportive community."
  }
];

const testimonials = [
  {
    name: "Emily Chen",
    role: "Frontend Developer",
    company: "TechCorp",
    quote: "DevAI helped me prepare for technical interviews in a way that books and videos couldn't. The personalized feedback on my coding challenges was invaluable."
  },
  {
    name: "Marcus Johnson",
    role: "Full-Stack Engineer",
    company: "StartupLabs",
    quote: "After using DevAI for three months, I landed my dream job. The interview practice and portfolio projects made all the difference in showcasing my skills."
  },
  {
    name: "Sophia Williams",
    role: "Recent CS Graduate",
    company: "Now at BigTech Inc.",
    quote: "As a new grad with limited experience, DevAI helped me bridge the gap between academic knowledge and industry expectations. I'm now working at my top-choice company!"
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-500 text-white px-4 py-2 z-50 focus:outline-none rounded-md"
      >
        Skip to content
      </a>

      <Box component="main" id="main-content">
        {/* Hero Section */}
        <Box 
          sx={{ 
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'hidden',
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 }
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h1" 
                  component="h1"
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Your First Dev Job Starts Here
                </Typography>
                <Typography 
                  variant="h5" 
                  component="p" 
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Practice code, build your portfolio, and get interview-ready — all powered by AI.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button 
                    component={RouterLink} 
                    to="/dashboard" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    sx={{ px: 4 }}
                  >
                    Get Started
                  </Button>
                  <Button 
                    component="a" 
                    href="#demo"
                    variant="outlined" 
                    color="primary"
                    size="large"
                    sx={{ px: 4 }}
                  >
                    Try Demo
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box 
                  component="img"
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt="Developer coding on a computer"
                  sx={{ 
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Why It Works */}
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Why It Works
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                Our platform combines advanced AI technology with proven learning methodologies to help you succeed.
              </Typography>
            </Box>
            <WhyItWorks />
          </Container>
        </Box>

        {/* How It Works */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                How It Works
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                A simple three-step process to jumpstart your development career.
              </Typography>
            </Box>
            <HowItWorksSection />
          </Container>
        </Box>

        {/* App Preview */}
        <Box id="demo" sx={{ py: 8, bgcolor: 'background.default', scrollMarginTop: 64 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                See DevAI in Action
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                Experience our intuitive interface and powerful features.
              </Typography>
            </Box>
            <AppPreview />
          </Container>
        </Box>
        
        {/* Community Stats */}
        <CommunityStats />

        {/* Features */}
        <Box id="features" sx={{ py: 8, bgcolor: 'background.default', scrollMarginTop: 64 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Features
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                Everything you need to accelerate your developer career.
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials */}
        <Box id="testimonials" sx={{ py: 8, bgcolor: 'background.paper', scrollMarginTop: 64 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Success Stories
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                Hear from developers who have transformed their careers with DevAI.
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Pricing */}
        <Box id="pricing" sx={{ py: 8, bgcolor: 'background.default', scrollMarginTop: 64 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Pricing
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                Choose the perfect plan for your development journey.
              </Typography>
            </Box>
            <FeatureComparisonTable />
          </Container>
        </Box>
        
        {/* FAQ */}
        <Box id="faq" sx={{ py: 8, bgcolor: 'background.paper', scrollMarginTop: 64 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Frequently Asked Questions
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                Get answers to common questions about DevAI.
              </Typography>
            </Box>
            <FaqAccordion />
          </Container>
        </Box>

        {/* Call to Action */}
        <Box sx={{ py: 12, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
          <Container maxWidth="md">
            <Box textAlign="center">
              <Typography variant="h3" component="h2" gutterBottom>
                Ready to Launch Your Dev Career?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Join thousands of developers who have accelerated their careers with DevAI.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/dashboard" 
                variant="contained" 
                color="secondary" 
                size="large" 
                sx={{ px: 6, py: 1.5 }}
              >
                Get Started Now
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;
