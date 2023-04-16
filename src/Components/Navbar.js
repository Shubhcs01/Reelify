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
import logoDark from '../Assets/logoDark.png';
import logoLight from '../Assets/logoLight.png';
import { makeStyles } from '@mui/styles';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';


export default function NavBar({theme, setTheme, userData }) {

  console.log("navbar");
  console.log(userData);

  function toggleTheme(){
    const newTheme = theme === 'light'? 'dark':'light';
    setTheme(newTheme);
  }

  const useStyles = makeStyles({
    navfa:{
      color: theme==='light'? "black":"white"
    }
})
const classes = useStyles();

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
    history.push(`/profile/${userData.userId}`)
  };
  const handelLogout = async () => {
    if(window.confirm("Do you really want to Exit? ☹")){
      await logout();
      history.push('/login');
    }
  
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
    <Box sx={{ flexGrow: 1}} >
      <AppBar sx={{background: theme==='light'? "white":"#282828"}}>
        <Toolbar>
          
          <img style={{cursor:"pointer",marginLeft:"1rem"}} onClick={handelLogoClick} src={theme==='light'? logoDark : logoLight} alt="logo" width={103} height={29} />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, color:"black",alignItems:"center",marginRight:"4rem" }}>

          <HomeIcon className={classes.navfa} onClick={handelLogoClick} sx={{marginRight:'1.5rem',cursor:'pointer'}}/>
          <ExploreIcon className={classes.navfa} sx={{marginRight:'1.5rem',cursor:'pointer'}}/>

            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="blue"
            > */}

              {/* TODO -> Add profileUrl to DB */}

             <Avatar className={classes.navfa} onClick={handleProfileMenuOpen} sx={{marginRight:'1.5rem',height:"1.5rem",width:"1.5rem",cursor:'pointer'}} />
             │ &nbsp;&nbsp;
            {/* </IconButton> */}
            <MdDarkMode className={classes.navfa} size={26} style={{marginRight:'0.3rem'}}/>

            {theme==='light'? <FaToggleOff onClick={toggleTheme} style={{cursor:'pointer'}} size={30}/> : <FaToggleOn className={classes.navfa} onClick={toggleTheme} style={{cursor:'pointer'}} size={30}/>}

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="blue"
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
