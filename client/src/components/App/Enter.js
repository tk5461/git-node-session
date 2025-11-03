import { useState, useEffect } from 'react'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import baby from '../assets/baby.jpg';
import gifcard from '../assets/gif-kard-368120.webp';
import boys from '../assets/boys.webp';
import teen from '../assets/teen.jpg';
import oo from '../assets/500423753_18353377744155381_8111087124175837242_n (1).jpg';
import oo1 from '../assets/צילום מסך 2025-06-17 175249.png';
import { useNavigate } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link'; 


const itemData = [
  {
    img: "http://localhost:1004/2/1.webp",
    title: ' תינוקות',
    author: '@bkristastucchio',
    
  },
  {
    img: "http://localhost:1004/2/2.webp",
    title: 'כרטיסי מתנה',
    author: '@rollelfd_gf',
  },
  {
    img: "http://localhost:1004/2/3.webp",
    title: 'sale',
    author: '@helloimnik',
  },
  {
    img: "http://localhost:1004/2/4.webp",
    title: 'outlet',
    author: '@nolanissac',
  }];


const images = [
  { url: baby, title: 'BABY', width: '30%', navigate: 'baby' },
  { url: gifcard, title: 'ALL', width: '40%', navigate: '' },
  { url: boys, title: 'BOY', width: '30%', navigate: 'boy' },

];


const ImageButton = styled(ButtonBase)(({ theme }) => ({

  position: 'relative',
  height: 600,
  [theme.breakpoints.down('sm')]: {
    width: '100%', 
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  color: theme.palette.common.white,
}));


export default function ButtonBaseDemo() {
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setOpenPopup(true);
    
  }, []);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClosePopup(); 
  };


  const p = (e) => {
    if (e)
      navigate("/products");
  }
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '700px',
          backgroundImage: `url("http://localhost:1004/2/1.webp")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 2,
        }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image onClick={() => { navigate(`/products/${image.navigate}`) }}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={(theme) => ({
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: `calc(${theme.spacing(1)} + 6px)`,
                })}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
      {<Grid container spacing={2}>
        <Grid size={{ xs: 4, md: 2 }}>
          <Box component="img" src={teen} alt="baby" sx={{ width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 2, md: 4 }}>
          <Box component="img" src={oo1} alt="baby" sx={{ width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 2, md: 4 }}>
          <Box component="img" src={oo} alt="baby" sx={{ width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 4, md: 2 }}>
          <Box component="img" src={baby} alt="baby" sx={{ width: '100%' }} />
        </Grid>

      </Grid>}
      <Box sx={{ width: '100%', overflowY: 'scroll', p: 2 }}> {/* עוטף Box עם ריווח */}
        <ImageList variant="quilted" cols={4} rowHeight={521}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: '8px' }} 
                onClick={() => { navigate("/products") }}
              />
              <ImageListItemBar
                title={item.title}
                // subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle sx={{ textAlign: 'center', direction: 'rtl' }}>
          {"הצטרפו למשפחת הדס מינילאבס"}
        </DialogTitle>
        <DialogContent sx={{ direction: 'rtl' }}>
            <Box
                component="img"
                src={"http://localhost:1004/2/6.webp"} 
                alt="הצטרפו להדס מינילאבס"
                sx={{
                    width: '100%',
                    height: 'auto', 
                    display: 'block',
                    mb: 2,
                    borderRadius: '8px 8px 0 0' 
                }}
            />
          <DialogContentText sx={{ mb: 4, textAlign: 'center' }}>
            אתם הראשונים לקבל את העדכונים הכי שווים!
            <br />
            5% הנחה על הקנייה הראשונה
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="דואר אלקטרוני"
              type="email"
              fullWidth
              variant="outlined"
              required
              sx={{ direction: 'rtl', '& input': { textAlign: 'center' } }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="מאשר/ת קבלת מסרים פרסומיים"
              sx={{ mt: 1, textAlign: 'right', '& .MuiFormControlLabel-label': { textAlign: 'right' } }}
            />
            <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
              <Button onClick={handleClosePopup} color="#black">
                ביטול
              </Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: 'rgb(198, 163, 142)', color: '#FFFFFF', '&:hover': { bgcolor: '#E91E63' } }}>
                הרשמה
              </Button>
            </DialogActions>
            <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center', color: '#555' }}>
              בהרשמתך הנך מאשר/ת את <Link href="#" sx={{ color: '#555', textDecoration: 'underline' }}>תנאי השימוש והתקנון</Link>
            </Typography>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
