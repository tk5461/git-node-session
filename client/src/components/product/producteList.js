import { useState, useEffect } from 'react';
import Axios from "axios";
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, IconButton, Grid, Container, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; 
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../user/useAuth';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 280,
  width: '250px',
  borderRadius: '16px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  transition: 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.03)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const ProdactList = () => {
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();
  const dispatch = useDispatch(); 
  const authData= useAuth();
  const userId = authData ? authData._id : null
  const { isUserLoggedIn, countProductInBasket, setCountProduct ,isAdmin} = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken") 
  const isManager = isAdmin;
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    let url = "http://localhost:1004/product";
    if (category) {
      url += `?category=${category}`;
    }
    try {
      const { data } = await Axios.get(url);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("אירעה שגיאה בטעינת המוצרים. אנא נסה שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  };
  const fetchProductsInCart = async () => {
    try {
      const { data } = await Axios.get(`http://localhost:1004/ShoppingCart/${userId}`,{
        headers:{
          "Authorization" : `Bearer ${accessToken}` 
        }
      });
      const validProducts = data.filter(item => item.productId && item.productId._id);
      setProductsInCart(validProducts);
      const totalItemsInBasket = validProducts.reduce((total, item) => total + item.amount, 0);
      dispatch(setCountProduct(totalItemsInBasket)); 
    } catch (error) {
      console.error("Error fetching product data:", error);
      setProducts([]);
      dispatch(setCountProduct(0));
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [category]);

  const deleteItem = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) {
      return;
    }
    try {
      await Axios.delete(`http://localhost:1004/product/${id}`);
      setProducts(prevProducts => prevProducts.filter(item => item._id !== id));
      setProductsInCart(prevProducts => prevProducts.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("אירעה שגיאה במחיקת המוצר. אנא נסה שוב.");
    }
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error("User not logged in. No access token found.");
        alert("אנא התחבר כדי להוסיף מוצרים לסל.");
        navigate("/user/login")
        return;
      }
      const response = await Axios.post("http://localhost:1004/ShoppingCart", {  productId: productId, amount: 1 },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      console.log("Product added to cart:", response.data);
      alert("המוצר נוסף לסל בהצלחה!");
      navigate("/ShoppingCart/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (Axios.isAxiosError(error) && error.response) {
        alert(`שגיאה בהוספה לסל: ${error.response.data.message || "נסה שוב מאוחר יותר."}`);
      } else {
        alert("אירעה שגיאה בלתי צפויה. אנא נסה שוב.");
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ ml: 2, mt: 2, color: 'text.secondary' }}>טוען מוצרים...</Typography>
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', p: 3 }}>
        <Typography variant="h4" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          אין מוצרים להצגה בקטגוריה זו.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          נסה לבחור קטגוריה אחרת או לבדוק שוב מאוחר יותר.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ maxWidth: '1240px', py: 6, backgroundColor: '#white' }}>
      <Typography
        variant="h5"
        component="h5"
        align="center"
        gutterBottom
        sx={{
          mb: 5,
          fontWeight: 'bold',
          color: '#black',
          font:"inherit"
        }}
      >
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map((p) => {
          const imageUrl =  `http://localhost:1004${p.images[0]}`
          return (
            <Grid
              item
              key={p._id}
              xs={12}
              sm={6}
              md={3}
              lg={3}
              xl={3}
              display="flex"
              justifyContent="center"
            >
              <StyledCard>
                <Link to={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    width="100%"
                    image={imageUrl}
                    alt={p.name || 'Product Image'}
                    sx={{
                      objectFit: 'cover',
                      borderBottom: '1px solid #ddd',
                      minHeight: '200px',
                      maxHeight: '200px',
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        lineHeight: 1.3,
                        minHeight: '2.6em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {p.name}
                    </Typography>

                    {(p.minSize || p.maxSize || p.dimensions) && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 'normal' }}>
                        <Box component="span" sx={{ fontWeight: 'bold' }}>מידות:</Box>{' '}
                        {p.dimensions ? p.dimensions : (p.minSize && p.maxSize ? `${p.minSize}-${p.maxSize}` : p.minSize || p.maxSize)}
                      </Typography>
                    )}

                    <Typography
                      variant="h5"
                      color='rgb(198, 163, 142)'
                      sx={{ mt: 1.5, fontWeight: 'bold', color: 'rgb(198, 163, 142)' }}
                    >{p.price!==undefined && p.price!==null && typeof p.price==='number'?
                      `₪${p.price.toLocaleString('he-IL')}`:"₪---"}
                    </Typography>
                  </CardContent>
                </Link>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee' }}>
                  <IconButton 
                    onClick={(e) => addToCart(p._id, e)} 
                    aria-label="הוסף לעגלה" 
                    color='rgb(198, 163, 142)'
                    size="large"
                    sx={{
                      color: 'rgb(198, 163, 142)',
                      '&:hover': {
                        backgroundColor: 'rgb(198, 163, 142)', 
                        transform: 'scale(1.1)',
                      },
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                  {isManager && ( 
          <> 
        <IconButton
            onClick={(e) => deleteItem(p._id, e)}
            aria-label="מחק"
            color='rgb(198, 163, 142)'
            size="large"
            sx={{
                '&:hover': {
                    transform: 'scale(1.1)',
                },
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            <DeleteIcon />
        </IconButton>
        <IconButton
            onClick={() => { navigate(`/UpdateProducte/${p._id}`) }}
            aria-label="ערוך" 
            color='rgb(198, 163, 142)'
            size="large"
            sx={{
                '&:hover': {
                    transform: 'scale(1.1)',
                },
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            <EditIcon />
        </IconButton>
    </>
)} 
                   </Box> 
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProdactList;