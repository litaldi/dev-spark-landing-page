
import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Button, 
  MenuItem,
  useMediaQuery,
  useTheme as useMuiTheme,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' }
];

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { mode, toggleMode } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 2,
              alignItems: 'center',
            }}
          >
            <Box 
              sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9b87f5, #7e69ab)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                mr: 1
              }}
            >
              D
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              DevAI
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.title} 
                  onClick={handleCloseNavMenu} 
                  component={RouterLink} 
                  to={page.path}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
            }}
          >
            <Box 
              sx={{ 
                width: 36, 
                height: 36, 
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #9b87f5, #7e69ab)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                mr: 1
              }}
            >
              D
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              DevAI
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ mx: 1, color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main } }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Theme toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit" aria-label="toggle light/dark theme">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            
            {!isMobile && (
              <Button 
                variant="contained" 
                color="primary"
                component={RouterLink}
                to="/dashboard"
                sx={{ ml: 2 }}
              >
                Dashboard
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
