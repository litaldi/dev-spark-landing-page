
import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar, 
  Divider, 
  Stack,
  Paper
} from '@mui/material';
import Layout from '../components/layout/Layout';

// Team member data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'With over 15 years in developer education and AI, Sarah leads our mission to make coding education accessible to everyone.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Former senior engineer at Google, Michael oversees our technical infrastructure and ensures DevAI uses cutting-edge AI technology.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Product',
    bio: 'Priya combines her background in education and UX design to create learning experiences that truly help developers grow.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'James Wilson',
    role: 'Lead Engineer',
    bio: 'James specializes in machine learning and natural language processing, helping our AI provide meaningful feedback to users.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  }
];

// Company values data
const values = [
  {
    title: 'Accessibility',
    description: 'We believe coding education should be accessible to everyone, regardless of background or experience level.'
  },
  {
    title: 'Innovation',
    description: 'We continuously explore new technologies and methods to improve how developers learn and grow.'
  },
  {
    title: 'Empowerment',
    description: 'We empower developers to take control of their learning journey and career development.'
  },
  {
    title: 'Community',
    description: 'We foster a supportive community where developers can learn from each other and grow together.'
  }
];

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 12,
          pb: 6,
          position: 'relative',
          overflow: 'hidden',
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
            About DevAI
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            We're on a mission to revolutionize how developers learn, practice, and prepare 
            for their careers through AI-powered education.
          </Typography>
        </Container>
      </Box>

      {/* Mission Statement Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" gutterBottom color="primary">
                Our Mission
              </Typography>
              <Divider sx={{ mb: 4, width: 80 }} />
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                DevAI was founded in 2023 with a simple yet powerful vision: to make high-quality 
                coding education accessible to everyone. We recognize the challenges that aspiring 
                developers face when learning to code and preparing for job interviews.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                Our AI-powered platform provides personalized feedback, guided learning paths, 
                and practical challenges that help developers build real-world skills. We believe 
                that with the right tools and support, anyone can become a successful developer.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                At DevAI, we're not just building tools – we're building a community where 
                developers can learn, grow, and thrive together.
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
            align="center"
            color="primary"
            gutterBottom
          >
            Our Team
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
          >
            DevAI is built by a team of passionate educators, engineers, and designers who 
            believe in the power of technology to transform education.
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item key={member.name} xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                  elevation={1}
                >
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ width: 120, height: 120 }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
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
            align="center"
            color="primary"
            gutterBottom
          >
            Our Values
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
          >
            These core values guide everything we do at DevAI, from product development to customer support.
          </Typography>

          <Grid container spacing={4}>
            {values.map((value) => (
              <Grid item key={value.title} xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                  }}
                >
                  <Typography variant="h5" component="h3" gutterBottom color="primary">
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
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
            <Grid item xs={12} sm={4} md={4}>
              <Box textAlign="center">
                <Typography variant="h2" component="p" color="primary" fontWeight="bold">
                  5,000+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Developers Using DevAI
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box textAlign="center">
                <Typography variant="h2" component="p" color="primary" fontWeight="bold">
                  50,000+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Practice Challenges Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box textAlign="center">
                <Typography variant="h2" component="p" color="primary" fontWeight="bold">
                  1,200+
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Resumes Optimized
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
