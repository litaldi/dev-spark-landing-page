
import React, { useState } from 'react';
import { 
  Container, 
  Stack,
  Typography, 
  Link, 
  Box, 
  TextField, 
  Button, 
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import LoginModal from "@/components/auth/LoginModal";
import Grid from '@mui/material/Grid';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const theme = useTheme();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Subscribing with email:', email);
    setEmail('');
    // Add actual subscription logic here
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: 1,
        borderColor: theme.palette.divider,
        py: 6,
        mt: 'auto',
      }}
      role="contentinfo"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              DevAI Companion
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Made by developers, for developers
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton 
                aria-label="GitHub"
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn"
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="Twitter"
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
              >
                <Twitter fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Navigation
            </Typography>
            <Stack>
              <Link component={RouterLink} to="/" color="textSecondary" underline="hover" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/about" color="textSecondary" underline="hover" sx={{ mb: 1 }}>
                About
              </Link>
              <Link component={RouterLink} to="/contact" color="textSecondary" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Legal
            </Typography>
            <Stack>
              <Link component={RouterLink} to="/terms" color="textSecondary" underline="hover" sx={{ mb: 1 }}>
                Terms of Use
              </Link>
              <Link component={RouterLink} to="/privacy" color="textSecondary" underline="hover" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/accessibility" color="textSecondary" underline="hover">
                Accessibility
              </Link>
            </Stack>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Newsletter
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} noValidate>
              <TextField
                fullWidth
                id="email-newsletter"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                size="small"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                sx={{ mb: 1 }}
              />
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
                fullWidth
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 4, mb: 4 }} />
        
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} DevAI Companion. All rights reserved.
            </Typography>
          </Grid>
          <Grid>
            <Button 
              variant="text" 
              size="small"
              color="inherit"
              onClick={openLoginModal}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Container>
      
      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </Box>
  );
};

export default Footer;
