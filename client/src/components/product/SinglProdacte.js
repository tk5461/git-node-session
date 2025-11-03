import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import { useState, useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../user/useAuth"
import { useSelector, useDispatch } from "react-redux"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';


const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  position: 'relative',

  '& .MuiRadio-root': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0, 
    zIndex: 2, 
    cursor: 'pointer', 
  },

  '& .MuiTypography-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '40px', 
    minHeight: '40px', 
    borderRadius: '50%', 
    border: '1px solid black',
    backgroundColor: 'white',
    color: 'black',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    boxSizing: 'border-box', 
    zIndex: 1, 
    pointerEvents: 'none', 
  },
  '&.Mui-checked .MuiTypography-root': {
    backgroundColor: 'black',
    color: 'white',
    borderColor: 'black',
  },
}));


const SingleProdact = () => {

  const authData = useAuth();
  const userId = authData ? authData._id : null;
  const navigate = useNavigate();

  const addProducToCart = async () => {
    try {
      if (!userId) {
        console.error("User not logged in. No user ID found from useAuth.");
        alert("אנא התחבר כדי להוסיף מוצרים לסל.");
        navigate("/user/login")
        return;
      }
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error("Access token not found in localStorage.");
        alert("אנא התחבר כדי להוסיף מוצרים לסל.");
        return;
      }
      const response = await Axios.post("http://localhost:1004/ShoppingCart",
        { userId: userId, productId: id, amount: 1},
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      navigate("/ShoppingCart/cart") 
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (Axios.isAxiosError(error) && error.response) {
        alert(`שגיאה בהוספה לסל נסה שוב מאוחר יותר."}`);
      }
    }
  };

  const { id } = useParams();
  const [prodactsId, setProdactId] = useState({});
  const [currentMainImage, setCurrentMainImage] = useState('');


  const fetchDate = async () => {
    try {
      const { data } = await Axios.get(`http://localhost:1004/product/${id}`);
      setProdactId(data);
        setCurrentMainImage(`http://localhost:1004${data.images[0]}`);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, [id]);

  const handleThumbnailClick = (imageUrl) => {
    setCurrentMainImage(imageUrl);
  };

  const theme = useTheme();

  const additionalImages = prodactsId.images && Array.isArray(prodactsId.images) && prodactsId.images.length > 0
    ? prodactsId.images.map(img => `http://localhost:1004${img}`)
    : [];

  const range = (start, end) => {
    if (typeof start !== 'number' || typeof end !== 'number' || isNaN(start) || isNaN(end) || start > end) {
      return [];
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const availableSizes = range(Number(prodactsId.minSize), Number(prodactsId.maxSize));
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '3%',
        margin: '2%',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        borderRadius: '8px',
        gap: '20px',
      }}
    >
      <Box
        sx={{
          flex: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            maxWidth: 400,
            height: 'auto',
            minHeight: 250,
            maxHeight: 350,
            borderRadius: '4px',
            objectFit: 'cover',
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 2px 8px',
          }}
          image={currentMainImage}
          alt={prodactsId.name || "Product image"}
        />

        {additionalImages.length > 0 && (
          <ImageList
            sx={{
              width: '100%',
              maxWidth: 400,
              height: 'auto',
              maxHeight: 100,
              overflowX: 'auto',
              overflowY: 'hidden',
              flexWrap: 'nowrap',
              transform: 'translateZ(0)',
            }}
            cols={additionalImages.length}
            rowHeight={80}
            gap={8}
          >
            {additionalImages.map((item, index) => (
              <ImageListItem
                key={item}
                onClick={() => handleThumbnailClick(item)}
                sx={{
                  cursor: 'pointer',
                  border: item === currentMainImage ? '2px solid rgb(198, 163, 142)' : '2px solid transparent',
                  borderRadius: '4px',
                  transition: 'border 0.2s ease-in-out',
                }}
              >
                <img
                  srcSet={`${item}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item}?w=80&h=80&fit=crop&auto=format`}
                  alt={`Product thumbnail ${index + 1}`}
                  loading="lazy"
                  style={{ borderRadius: '4px', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: { xs: '0', md: '0 20px' } }}>
        <CardContent sx={{ flex: '1 0 auto', padding: '0 !important' }}>
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(198, 163, 142)' }}>
            {prodactsId.name}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            ₪ {prodactsId.price} :מחיר <br />
            <a href='./' >נהלי החלפה והחזרה</a><br />
            <a href='./' >טבלת מידות</a><br />
            <a href='./' >הוראות כביסה</a><br />
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary, lineHeight: 1.6, mt: 2 }}>

            <FormControl component="fieldset">
              <FormLabel id="size-radio-buttons-group-label" sx={{ display: 'flex', alignItems: 'center', fontSize: '1rem', mb: 1, color: 'black' }}>
                Size
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="size-radio-buttons-group-label"
                name="size-radio-buttons-group"
                sx={{ gap: '10px' }}
              >
                {availableSizes.length > 0 ? (
                  availableSizes.map((size) => (
                    <StyledFormControlLabel
                      key={size}
                      value={String(size)}
                      control={<Radio sx={{ display: 'none' }} />} 
                      label={String(size)}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    אין מידות זמינות למוצר זה.
                  </Typography>
                )}
              </RadioGroup>
              <Stack direction="row"  spacing={2}sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Button
              onClick={addProducToCart}
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              sx={{
                backgroundColor: 'rgb(198, 163, 142)',
                '&:hover': {
                  backgroundColor: 'rgb(198, 163, 142)',
                },
                alignItems: 'center',
                color: 'white',
                padding: '10px 20px',
                fontSize: '1rem',
              }}
            >
              הוסף לסל
            </Button>
          </Stack>
            </FormControl>

          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
export default SingleProdact;