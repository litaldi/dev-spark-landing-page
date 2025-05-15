
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormHelperText,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Mail, Phone, LocationOn } from '@mui/icons-material';
import Layout from '../components/layout/Layout';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to your API here
      console.log('Form submitted:', formData);
      
      // Simulate API call
      setTimeout(() => {
        // Simulate success
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 12,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            Have questions, feedback, or need assistance? We're here to help.
            Fill out the form below, and we'll get back to you as soon as possible.
          </Typography>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid sx={{ width: { xs: '100%', md: '58.33%' } }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, sm: 5 },
                borderRadius: 2,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
                Send us a message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid sx={{ width: { xs: '100%', sm: '50%' } }}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name || ' '}
                      aria-describedby="name-helper-text"
                    />
                  </Grid>
                  <Grid sx={{ width: { xs: '100%', sm: '50%' } }}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email || ' '}
                      aria-describedby="email-helper-text"
                    />
                  </Grid>
                  <Grid sx={{ width: '100%' }}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject || ' '}
                      aria-describedby="subject-helper-text"
                    />
                  </Grid>
                  <Grid sx={{ width: '100%' }}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={6}
                      id="message"
                      name="message"
                      label="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message || 'Minimum 20 characters'}
                      aria-describedby="message-helper-text"
                    />
                  </Grid>
                  <Grid sx={{ width: '100%' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ px: 5, py: 1.5 }}
                    >
                      Send Message
                    </Button>
                    <FormHelperText>
                      We'll respond to your inquiry within 24-48 hours.
                    </FormHelperText>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', md: '41.67%' } }}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%', 
                borderRadius: 2,
                bgcolor: 'background.paper'
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 5 }, height: '100%' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  You can reach out to us through the contact form or use the information below.
                </Typography>
                
                <Divider sx={{ my: 4 }} />
                
                <Stack spacing={4}>
                  <Box display="flex" alignItems="flex-start">
                    <Mail color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Email
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <a href="mailto:info@devai.example.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                          info@devai.example.com
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="flex-start">
                    <Phone color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Phone
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <a href="tel:+1-800-123-4567" style={{ color: 'inherit', textDecoration: 'none' }}>
                          +1 (800) 123-4567
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="flex-start">
                    <LocationOn color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Office
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        123 Innovation Way<br />
                        San Francisco, CA 94107<br />
                        United States
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Success/Error notifications */}
      <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully! We'll be in touch soon.
        </Alert>
      </Snackbar>
      
      <Snackbar open={submitError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          There was an error sending your message. Please try again later.
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Contact;
