import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useState, useEffect } from 'react';
import useAuth from '../user/useAuth';
import { useSelector, useDispatch } from "react-redux";
import { setCountProduct } from '../user/userSlice';
import {  useNavigate, useLocation } from 'react-router-dom';

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const authData= useAuth();
  const userId = authData ? authData._id : null
  const {  countProductInBasket } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); 
  const accessToken = localStorage.getItem("accessToken")
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      console.log("Fetching cart for user ID:", userId);
      fetchDate();
    }
  }, [userId]);

  const fetchDate = async () => {
    if(!userId || !accessToken)
      {
        alert("עליך להרשם \ להכנס לאתר שלנו כדי להכנס סל שלך") 
        navigate("/user/login")
        setProducts([])
        dispatch(setCountProduct(0));
        return;
      }
    try {
      const { data } = await Axios.get(`http://localhost:1004/ShoppingCart/${userId}`,{
        headers:{
          "Authorization" : `Bearer ${accessToken}` 
        }
      });
      const validProducts = data.filter(item => item.productId && item.productId._id);
      setProducts(validProducts);
      const totalItemsInBasket = validProducts.reduce((total, item) => total + item.amount, 0);
      dispatch(setCountProduct(totalItemsInBasket)); 
    } catch (error) {
      console.error("Error fetching product data:", error);
      setProducts([]);
      dispatch(setCountProduct(0));
    }
  };

  const QuantityChange = async (productId, num) => {
    const updatedProducts = products.map((item) =>
      item.productId && item.productId._id === productId
        ? { ...item, amount: Math.max(1, item.amount + num) } 
        : item 
    );
    setProducts(updatedProducts);
    try {
      const newAmount = updatedProducts.find(p => p.productId && p.productId._id === productId)?.amount;
      if (newAmount !== undefined) { 
        await Axios.put(`http://localhost:1004/ShoppingCart`, {
          amount: newAmount, userId : userId,productId : productId  },{
            headers:{
              "Authorization" : `Bearer ${accessToken}` 
            }
          })
        }
      dispatch(setCountProduct(countProductInBasket + num));
    } catch (error) {
      console.error("Error updating product quantity on server:", error);
      fetchDate();
    }
  };

  const deletProduct = async (cartItemId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה?")) {
        return;
    }
    try {
        const itemToDelete = products.find(item => item._id === cartItemId);
        if (!itemToDelete) {
            console.warn("Item to delete not found in local state:", cartItemId);
            fetchDate(); 
            return;
        }
        await Axios.delete(`http://localhost:1004/ShoppingCart/${cartItemId}`);
        const updatedProducts = products.filter(item => item._id !== cartItemId);
        setProducts(updatedProducts);
        dispatch(setCountProduct(countProductInBasket - itemToDelete.amount));
        console.log(`Product ${cartItemId} deleted. Updated basket count.`);
    } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("אירעה שגיאה בהסרת המוצר מהעגלה. אנא נסה שוב.");
        fetchDate(); 
    }
};
  const calculateTotalPrice = () => {
    return products.reduce((total, item) => {
      if (item.productId && typeof item.productId.price === 'number' && typeof item.amount === 'number') {
        return total + (item.productId.price * item.amount);
      }
      return total;
    }, 0);
  };

  const theme = useTheme();
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto', backgroundColor: '#ffffff' }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          עגלת קניות
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ביטול בחירת כל הפריטים
        </Typography>
      </Box>
      {products.length > 0 ? (
        products.map((productItem) => (
          productItem.productId && productItem.productId._id ? (
            <Card key={productItem._id} sx={{ display: 'flex', mb: 2 }}> 
              <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 2, flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 100, objectFit: 'contain', mr: 2 }} 
                  image={`http://localhost:1004${productItem.productId.images[0]}`}
                  alt={productItem.productId.name || 'Product Image'}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Typography component="div" variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {productItem.productId.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {productItem.shippingInfo}
                  </Typography>
                  {productItem.additionalInfoLink && (
                    <Link href="#" variant="caption" sx={{ mt: 0.5 }}>
                      {productItem.additionalInfoLink}
                    </Link>
                  )}
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <span style={{ fontWeight: 'bold' }}>מידות :</span> {productItem.productId.maxSize} - {productItem.productId.minSize}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', flexShrink: 0 }}>
                      <Link href="#" color="inherit" underline="hover">שיתוף</Link> | <Link href="#" color="inherit" underline="hover">שמור מאוחר יותר</Link> | <Link href="#" color="inherit" underline="hover">השווה עם פריטים דומים</Link>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', borderRadius: 1 }}>
                      <IconButton size="small" onClick={() => QuantityChange(productItem.productId._id, -1)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 1 }}>{productItem.amount}</Typography>
                      <IconButton size="small" onClick={() => QuantityChange(productItem.productId._id, 1)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => deletProduct(productItem._id, e)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', p: 2, pl: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ₪ {productItem.productId.price}
                </Typography>
              </Box>
            </Card>
          ) : (
            <Typography key={`error-${Math.random()}`} color="error" sx={{ my: 1 }}>
              שגיאה: פרטי מוצר חסרים עבור פריט בעגלה.
            </Typography>
          )
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
          עגלת הקניות ריקה.
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          סכום ביניים ({countProductInBasket} פריטים):
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#B12704' }}>
          ₪ {calculateTotalPrice().toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ backgroundColor: 'rgb(198, 163, 142)', color: '#0F1111', '&:hover': { backgroundColor: 'rgb(198, 163, 142)' } }}>
          המשך לקופה
        </Button>
      </Box>
    </Box>
  );
}
