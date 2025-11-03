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


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setErrorMessage("");

    try {
      let imageUrlsArray = [];
      if (urlImage) { 
        imageUrlsArray = urlImage.split(',')
          .map(url => url.trim())
          .filter(url => url !== '');
      }
      const { data } = await Axios.post("http://localhost:1004/product", { name, category, images:imageUrlsArray, minSize, maxSize, price }); // הוספת roles לשליחה
      alert(data.message || 'ההוספה בוצעה בהצלחה!'); 
      navigate("/product"); 
    } catch (error) {
      console.error("creation failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.message) {
        setErrorMessage("שגיאת תקשורת: " + error.message);
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
      <Card sx={{ minWidth: 380, maxWidth: 450, boxShadow: 3, borderRadius: 2 }}> 
        <CardContent sx={{ p: 4 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>הוסף מוצר</h2> 
          <p style={{ textAlign: 'center', marginBottom: '24px', color: '#666' }}>אנא מלא/י את הפרטים להוספה</p> 
          <Box
            component="form"
            onSubmit={handleSubmit}
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
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
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
              label="החל ממידה"
              type="number"
              defaultValue={0}
              variant="standard"
              fullWidth
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}

            />
            <TextField
              label="עד מידה"
              type="number"
              defaultValue={0}
              variant="standard"
              fullWidth
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}

            />
            <TextField
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
              הוסף מוצר
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}