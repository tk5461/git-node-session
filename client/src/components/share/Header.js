import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { useSelector, useDispatch } from "react-redux"
import { setCountProduct } from '../user/userSlice';
import useAuth from '../user/useAuth';
import { clearToken } from '../user/userSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const uthData = useAuth();
  const roles = uthData ? uthData.roles : []

  const isManager = roles.includes("Admin")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [selectAnchorEl, setSelectAnchorEl] = React.useState(null);
  const { isUserLoggedIn, countProductInBasket } = useSelector((state) => state.auth)
  const isSelectMenuOpen = Boolean(selectAnchorEl);

  const createP = () => {
    navigate('/product/Crud')
  }
  const createC = () => {
    navigate("ShoppingCart/cart")
  }
  const navigate = useNavigate()

  const handleSelectMenuOpen = (event) => {
    setSelectAnchorEl(event.currentTarget);
  };

  const handleSelectMenuClose = () => {
    setSelectAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const Aregister = (e) => {
    navigate('/user/register')

  }
  const Alogin = (e) => {
    navigate('/user/login')
  }
  const Aexit = (e) => {
    localStorage.removeItem('accessToken');
    dispatch(clearToken());
    alert("התנתקת בהצלחה מהאתר שלנו  , שתרצה לקנות פריטים מייד תוכל להתחבר שוב")
    navigate("/")
  }
  const all = (e) => {
    handleSelectMenuClose()
    navigate('/products')
  }
  const boy = (e) => {
    handleMenuClose()
    navigate('/products/boy')
  }
  const girl = (e) => {
    handleMenuClose()
    navigate('/products/girl')

  }
  const baby = (e) => {
    handleMenuClose()
    navigate('/products/baby')
  }

  const about = (e) => {
    navigate("/about")
  }
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
      <MenuItem onClick={Alogin}>כניסה</MenuItem>
      <MenuItem onClick={Aregister}>הרשמה</MenuItem>
      <MenuItem onClick={Aexit}>התנתקות</MenuItem>

    </Menu>
  );

  const select = (
    <Menu
      anchorEl={selectAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      id="select-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isSelectMenuOpen}
      onClose={handleSelectMenuClose}
    >
      <MenuItem onClick={all}>צפה בהכל</MenuItem>
      <MenuItem onClick={boy}>בנים</MenuItem>
      <MenuItem onClick={girl}>בנות</MenuItem>
      <MenuItem onClick={baby}>תינוקות</MenuItem>
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
      <MenuItem onClick={all}>צפה בהכל</MenuItem>
      <MenuItem onClick={boy}>בנים</MenuItem>
      <MenuItem onClick={girl}>בנות</MenuItem>
      <MenuItem onClick={baby}>תינוקות</MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(255, 255, 255)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleSelectMenuOpen}
            sx={{ mr: 2, color: 'rgb(0, 0, 0)' }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper sx={{ color: 'rgb(0, 0, 0)' }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ display: { xs: 'none', sm: 'block', color: 'rgb(0, 0, 0)' } }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexShrink: 0, 
              textAlign: 'center',
              fontFamily: 'Josefin Sans Light',
              color: 'rgb(0, 0, 0)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img style={{ width: '300px' }} src="http://localhost:1004/1.png" alt="Logo"></img>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="טלפון" color='rgb(0, 0, 0)'>
                <PhoneIcon onClick={about} />
              </IconButton>
              <IconButton onClick={createP} size="large" aria-label="הוסף מוצר" color='rgb(0, 0, 0)'>
                {isManager && <DataSaverOnIcon />}
              </IconButton>
              <IconButton onClick={createC}
                size="large"
                aria-label={`הצג ${countProductInBasket} פריטים חדשים בסל`}
                color='rgb(0, 0, 0)'
              >
                <Badge badgeContent={countProductInBasket} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="חשבון משתמש נוכחי"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color='rgb(0, 0, 0)'
              >
                <PersonIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="הצג עוד"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color='rgb(0, 0, 0)'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {select}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}