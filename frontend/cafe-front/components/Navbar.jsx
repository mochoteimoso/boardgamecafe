import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import cafeLogo from '../assets/logo1.png';

const pages = [
  { name: 'Games', path: '/games' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Events', path: '/events' },
  { name: 'Booking', path: '/bookings' },
  { name: 'Service', path: '/service' },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated, isCheckingAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const updateLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isCheckingAuth) return null; // or loading spinner

  const settings = isAuthenticated
    ? [
        { name: 'Profile', path: '/profile' },
        { name: 'My bookings', path: '/account' },
        { name: 'Logout', action: handleLogout }
      ]
    : [{ name: 'SignIn', path: '/sign-in' }];

  return (
    <AppBar position="static" color="white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
			<Link to="/" style={{ textDecoration: 'none' }}>
				<Typography
					variant="h6"
					noWrap
					sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: "Fontdiner Swanky",
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'black',
					}}
				>
					<img src={cafeLogo} alt="Cafe Boardgame Logo" style={{ paddingBottom: '1rem' }} />
				</Typography>
			</Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.path}>{t(`navbar.${page.name}`)}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: "Fontdiner Swanky",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 6 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', mr: 6, fontFamily: 'Fontdiner Swanky', ":hover": { bgcolor: 'white' } }}
                component={Link}
                to={page.path}
              >
                {t(`navbar.${page.name}`)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <i className="fa-solid fa-globe"></i>
            <select value={language} onChange={(e) => updateLanguage(e.target.value)} style={{ marginLeft: '10px', marginRight: '20px', border: 'none', outline: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              <option value="en">EN</option>
              <option value="fi">FI</option>
            </select>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={setting.action || handleCloseUserMenu}>
                  <Typography textAlign="center" fontFamily={'Fontdiner Swanky'}>
                    {setting.path ? <Link to={setting.path}>{t(`navbar.${setting.name}`)}</Link> : t(`navbar.${setting.name}`)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
