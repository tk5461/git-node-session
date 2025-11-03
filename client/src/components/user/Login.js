import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setToken, setAdmin } from '../user/userSlice';
import { jwtDecode } from 'jwt-decode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';

const providers = [
  { id: 'credentials', name: ' ' },
];

export default function SignInAndRegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const register = () => {
    navigate('/user/register');
  };

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100vw',
          direction: 'rtl',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            maxWidth: { xs: '90%', sm: '80%', md: '1300px' },
            width: '100%',
            height: { xs: 'auto', md: '500px' },
            backgroundColor: '#ffffff',
            transform: 'translateY(-30px)',
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: { xs: '40px 50px', md: '50px 60px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: { xs: '8px 8px 0 0', md: '0 8px 8px 0' },
            }}
          >
            <Typography variant="h5" component="h3" sx={{ mb: 3, color: '#333', textAlign: 'center' }}>
              Welcome user, please sign in to continue
            </Typography>
            <SignInPage
              signIn={(provider, formData) => {
                if (provider.id === 'credentials') {
                  const username = formData.get('username');
                  const password = formData.get('password');
                  return Axios.post('http://localhost:1004/user/login', { username, password })
                    .then(response => {
                      const { data } = response;
                      if (data && data.accessToken) {
                        const accessToken = data.accessToken;
                        localStorage.setItem('accessToken', accessToken);
                        dispatch(setToken({ token: accessToken }));
                        const decodedToken = jwtDecode(accessToken);
                        const userRoles = decodedToken.roles || [];
                        const isUserAdmin = userRoles.includes('Admin');
                        dispatch(setAdmin(isUserAdmin));
                        navigate('/products');
                        return { data };
                      } else {
                        console.warn('Access token לא נמצא בתגובה מהשרת.');
                        return { error: 'התחברות נכשלה: טוקן לא התקבל.' };
                      }
                    })
                    .catch(error => {
                      console.error('Login failed:', error);
                      navigate("/user/register")
                      return { error: error.response?.data?.message || 'שגיאה בהתחברות' };
                    });
                }
              }}
              slotProps={{
                form: {
                  noValidate: true,
                  sx: {
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                  }
                },
                emailField: {
                  variant: 'outlined',
                  autoFocus: false,
                  label: '* שם משתמש',
                  name: 'username',
                  sx: {
                    width: '90%',
                    maxWidth: '400px',
                    mb: 2,
                    backgroundColor: 'rgb(198, 163, 142)',
                    borderRadius: '4px',
                    '& .MuiInputBase-input': {
                      textAlign: 'right',
                      fontSize: '1.0em',
                      height: '1.0em',
                      padding: '10px 12px',
                      color: 'black', 
                    },
                    '& .MuiInputLabel-root': {
                      right: 12,
                      left: 'unset',
                      transformOrigin: 'top right',
                      fontSize: '1.0em',
                      '&.Mui-focused': { transform: 'translate(0, -0.8em) scale(0.8)' },
                      '&.MuiFormLabel-filled': { transform: 'translate(0, -0.8em) scale(0.8)' },
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(198, 163, 142)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(198, 163, 142)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(198, 163, 142)',
                    },
                  }
                },
                passwordField: {
                  variant: 'outlined',
                  label: '* Password',
                  sx: {
                    width: '90%',
                    maxWidth: '400px',
                    mb: 3,
                    backgroundColor: 'rgb(198, 163, 142)', 
                    borderRadius: '4px',
                    '& .MuiInputBase-input': {
                      textAlign: 'right',
                      fontSize: '1.0em',
                      height: '1.0em',
                      padding: '10px 12px',
                      color: 'black',
                    },
                    '& .MuiInputLabel-root': {
                      right: 12,
                      left: 'unset',
                      transformOrigin: 'top right',
                      fontSize: '1.0em',
                      '&.Mui-focused': { transform: 'translate(0, -0.8em) scale(0.8)' },
                      '&.MuiFormLabel-filled': { transform: 'translate(0, -0.8em) scale(0.8)' },
                      color: 'black', 
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(198, 163, 142)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(198, 163, 142)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(198, 163, 142)',
                    },
                  }
                },
                submitButton: {
                  variant: 'contained',
                  children: (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      כנסו לאתר שלנו
                    </Box>
                  ),
                  sx: {
                    backgroundColor: 'rgb(198, 163, 142)', 
                    color: 'black', 
                    border: '1px solid #ccc',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'translateY(-0.5px)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.15s ease',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontSize: '1.1em',
                    fontWeight: 'normal',
                    width: '90%',
                    maxWidth: '300px',
                    height: '50px',
                    mt: 2,
                  }
                },
                oAuthContainer: { sx: { display: 'none' } },
                description: { sx: { display: 'none' } },
                title: { sx: { display: 'none' } },
              }}
              providers={providers}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', md: '1px' },
              height: { xs: '1px', md: '100%' },
              backgroundColor: 'black',
              position: 'relative',
              my: { xs: 3, md: 0 },
              mx: { xs: 0, md: 3 },
            }}
          >
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: { xs: '40px 50px', md: '50px 60px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: { xs: '0 0 8px 8px', md: '8px 0 0 8px' },
            }}
          >
            <Typography variant="h3" component="h2" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
              עדיין לא רשומים?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666', textAlign: 'center', fontSize: '1.1em' }}>
              הצטרפו אלינו עכשיו וקבלו גישה למגוון מוצרים ושירותים בלעדיים!
            </Typography>
            <Button
              variant="contained"
              onClick={register}
              sx={{
                backgroundColor: 'rgb(198, 163, 142)',
                color: 'black',
                padding: '8px 16px',
                borderRadius: '5px',
                fontSize: '0.9em',
                fontWeight: 'normal',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'translateY(-0.5px)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                },
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                minWidth: '90px',
                height: '40px',
              }}
            >
              <PersonIcon sx={{ ml: 0.5, fontSize: '1.0em' }} />
              הרשמה בקלות
            </Button>
          </Box>
        </Box>
      </Box>
    </AppProvider>
  );
}