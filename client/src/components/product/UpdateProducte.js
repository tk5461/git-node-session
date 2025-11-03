import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'; 
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material"; 
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export default function RegisterPage() { 

  const navigate = useNavigate();

  const {id} = useParams()

  const fetchDate = async () => {
    try {
      const { data } = await Axios.get(`http://localhost:1004/product/${id}`);
      setProductId(data)
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    fetchDate();
  }, [id]);
  const [prodctId,setProductId] = useState({})
  const [name, setName] = useState(prodctId.name)
  const [urlImage, setUrlImage] = useState("הכנס כתובת של תמונה חדשה");
  const [minSize, setMinSize] = useState(prodctId.minSize);
  const [maxSize, setMaxSize] = useState(prodctId.maxSize);
  const [price, setPrice] = useState(prodctId.price);
  const [category, setCategory] = useState(prodctId.category); 
  const [errorMessage, setErrorMessage] = useState("");

  const Submit = async (e) => { 
    e.preventDefault();
    setErrorMessage("");
    try {
      let imageUrlsArray = [];
      if (urlImage) { 
        imageUrlsArray = urlImage.split(',')
          .map(url => url.trim())
          .filter(url => url !== '');
      }
    const { data } = await Axios.put(`http://localhost:1004/product/${id}`, 
    { name:name?name:prodctId.name, category:category?category:prodctId.category, minSize:minSize?minSize:prodctId.minSize, maxSize:maxSize?maxSize:prodctId.maxSize, price:price?price:prodctId.price}); 
      console.log(data);
      navigate("/products"); 
    } catch (error) {
      console.error("creation failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.message) {
        setErrorMessage("שגיאת תקשורת: ");
      } else {
        setErrorMessage("אירעה שגיאה בלתי צפויה. אנא נסה שוב.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', 
      }}
    >
      <Card sx={{ minWidth: 380, maxWidth: 450, boxShadow: 3, borderRadius: 2}}> 
        <CardContent sx={{ p: 4 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>עדכן מוצר</h2> 
          <p style={{ textAlign: 'center', marginBottom: '24px', color: '#666' }}>אנא מלא/י את הפרטים לעדכון</p> 
          <Box 
            component="form"
            onSubmit={Submit}
            sx={{
              '& .MuiTextField-root, & .MuiFormControl-root': { mb: 2 }, 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              label="שם מוצר"              
              defaultValue = {prodctId.name} 
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              defaultValue = {prodctId.name}
              label="הכנס כתובת מוצר"
              variant="standard"
              fullWidth
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
              required
              placeholder="/20/1.webp,/20/2.webp"
              helperText="הזן מספר כתובות URL של תמונות, מופרדות בפסיקים"
            />
            <TextField
              defaultValue = {prodctId.minSize} 
              label="החל ממידה"
              type="number"
              variant="standard"
              fullWidth
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}

            />
            <TextField
              defaultValue = {prodctId.maxSize} 
              label="עד מידה"
              type="number"
              variant="standard"
              fullWidth
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}

            />
            <TextField
              defaultValue = {prodctId.price} 
              label="מחיר"
              type="number"
              variant="standard"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <FormControl variant="standard" fullWidth> 
              <InputLabel id="roles-select-label">קטגוריה</InputLabel>
              <Select
                defaultValue = {prodctId.category} 
                labelId="roles-select-label"
                id="roles-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="קטגוריה"
              >
                <MenuItem value="baby">
                  <em>תינוק</em>
                </MenuItem>
                <MenuItem value="boy">ילד</MenuItem>
                <MenuItem value="girl">ילדה</MenuItem>
              </Select>
            </FormControl>

            {errorMessage && (
              <p style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1rem',
                backgroundColor: 'rgb(198, 163, 142)',
                '&:hover': {
                  backgroundColor: 'rgb(0, 3, 2)',
                },
              }}
              fullWidth
            >
              עדכן מוצר
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}