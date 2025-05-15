
import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Layout from '../components/layout/Layout';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SupportIcon from '@mui/icons-material/Support';

const About = () => {
  const theme = useTheme();
  
  // Sample team members data
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Alex has over 10 years of experience in ML and AI development.'
    },
    {
      name: 'Morgan Smith',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Morgan specializes in building scalable AI infrastructure.'
    },
    {
      name: 'Jamie Davis',
      role: 'Head of Design',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Jamie brings 8 years of UX/UI experience focused on accessibility.'
    },
    {
      name: 'Taylor Wilson',
      role: 'Lead Engineer',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: 'Taylor is an expert in ML optimization and deployment.'
    },
  ];
  
  // Company values
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly explore new technology frontiers to improve developer productivity and learning.',
      icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: 'Quality',
      description: 'We are committed to delivering well-tested, reliable tools that developers can depend on.',
      icon: <LaptopMacIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: 'Security',
      description: 'We prioritize the protection of user data and code with industry-leading security practices.',
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      title: 'Support',
      description: 'We provide responsive support and actively engage with our community of developers.',
      icon: <SupportIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8, 
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            About DevAI
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
          >
            We're building the next generation of AI-powered tools for developers
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid sx={{ width: '100%' }}>
              <Typography variant="h4" component="h2" gutterBottom color="primary">
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                At DevAI, we believe that artificial intelligence can revolutionize how developers learn, code, and build. Our mission is to create tools that enhance developer productivity while making complex technical concepts more accessible.
              </Typography>
              <Typography variant="body1" paragraph>
                We're focused on building AI companions that understand code context, provide meaningful feedback, and help developers grow their skills through practice and guided learning.
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform combines cutting-edge machine learning with educational expertise to create personalized learning experiences that adapt to each developer's skill level, goals, and learning style.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            color="primary"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Our Team
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid key={member.name} sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2, 
                    boxShadow: theme.shadows[2],
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '100%',
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: 0
                      }}
                    />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary" 
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            color="primary"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Our Values
          </Typography>

          <Grid container spacing={4}>
            {values.map((value) => (
              <Grid key={value.title} sx={{ width: { xs: '100%', sm: '50%' } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" component="h3" align="center" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid sx={{ width: { xs: '100%', sm: '33.33%' } }}>
              <Box textAlign="center">
                <Typography variant="h2" component="p" color="primary" fontWeight="bold">
                  5,000+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Active Users
                </Typography>
              </Box>
            </Grid>
            <Grid sx={{ width: { xs: '100%', sm: '33.33%' } }}>
              <Box textAlign="center">
                <Typography variant="h2" component="p" color="primary" fontWeight="bold">
                  50,000+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Practice Problems
                </Typography>
              </Box>
            </Grid>
            <Grid sx={{ width: { xs: '100%', sm: '33.33%' } }}>
              <Box textAlign="center">
                <Typography variant="h2" component="p" color="primary" fontWeight="bold">
                  1,200+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Companies Using DevAI
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default About;
