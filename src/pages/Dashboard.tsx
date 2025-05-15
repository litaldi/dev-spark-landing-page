
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { CheckCircle, Assignment, Code, School } from '@mui/icons-material';
import Layout from '../components/layout/Layout';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box sx={{ py: 4, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          {/* Welcome section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome back, Developer!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Continue your learning journey and track your progress.
            </Typography>
          </Box>

          {/* Progress overview */}
          <Grid container spacing={4}>
            <Grid sx={{ width: { xs: '100%', md: '66.666667%' } }}>
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your Progress
                </Typography>
                <Grid container spacing={2}>
                  <Grid sx={{ width: '100%' }}>
                    <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">JavaScript Fundamentals</Typography>
                      <Typography variant="body2">75%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={75} 
                      color="primary"
                      sx={{ height: 8, borderRadius: 2, mb: 2 }}
                    />
                  </Grid>
                  <Grid sx={{ width: '100%' }}>
                    <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">React Components</Typography>
                      <Typography variant="body2">45%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={45} 
                      color="secondary"
                      sx={{ height: 8, borderRadius: 2, mb: 2 }}
                    />
                  </Grid>
                  <Grid sx={{ width: '100%' }}>
                    <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Interview Preparation</Typography>
                      <Typography variant="body2">30%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={30} 
                      color="info"
                      sx={{ height: 8, borderRadius: 2 }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Recent activities */}
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Code color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Completed: Array Manipulation Challenge" 
                      secondary="JavaScript Practice – 2 days ago" 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <School color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Watched: Advanced React Hooks Tutorial" 
                      secondary="React Learning Path – 3 days ago" 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <Assignment color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Updated: Your Developer Resume" 
                      secondary="Career Tools – 5 days ago" 
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid sx={{ width: { xs: '100%', md: '33.333333%' } }}>
              {/* Next steps card */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recommended Next Steps
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Complete React Router challenge" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Practice API integration" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Review common interview questions" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Learning Path
                  </Button>
                </CardActions>
              </Card>

              {/* Stats card */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Your Stats
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Challenges Completed
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      24
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Hours Practiced
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      37
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Streak
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      5 days
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Full Stats
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Dashboard;
