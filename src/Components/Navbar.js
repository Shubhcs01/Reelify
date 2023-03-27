import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
//own imports
import { useHistory } from 'react-router-dom';
import AuthContext from '../AuthContext'
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import logo4 from '../Assets/logo4.png';


export default function NavBar({ userData }) {

  console.log(userData)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();
  const { logout } = React.useContext(AuthContext);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //own code--------------------------
  const handelLogoClick = () => {
    history.push(`/feed`)
  };
  const handelProfile = () => {
    history.push(`/profile`)
  };
  const handelLogout = async () => {
    await logout();
    history.push('/login');
  };
  // -------------------------------------------
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handelProfile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handelLogout}><LogoutIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handelProfile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handelLogout}><LogoutIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{background:"white"}}>
        <Toolbar>
          
          <img style={{cursor:"pointer"}} onClick={handelLogoClick} src={logo4} alt="logo" width={103} height={29} />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, color:"black",alignItems:"center",marginRight:"4rem" }}>

          <HomeIcon onClick={handelLogoClick} sx={{marginRight:'1.5rem',cursor:'pointer'}}/>
          <ExploreIcon sx={{marginRight:'1.5rem',cursor:'pointer'}}/>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* TODO -> Add profileUrl to DB */}
             <Avatar sx={{height:"1.5rem",width:"1.5rem"}} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
