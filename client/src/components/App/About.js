import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

const About = () => {
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        mb: 4,
        backgroundColor: '#FFFFFF', 
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        direction: 'rtl' 
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#000000' }} 
      >
        נשמח לעמוד לשירותכם
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: '#000000' }}>
        בכל נושא הקשור לאתר.
      </Typography>

      <Typography variant="body1" sx={{ mb: 1, color: '#000000' }}>
        בימים **א-ה** בין השעות **09:00 עד 14:00**.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#000000' }} // טקסט שחור
      >
        צרו קשר
      </Typography>

      <Typography variant="body1" sx={{ mb: 1, color: '#000000' }}>
        **במייל:**
        <br />
        <Link href="mailto:CS@HADASMINILOVES.CO.IL" sx={{ color: '#000000', fontWeight: 'bold' }}>
          CS@HADASMINILOVES.CO.IL
        </Link>
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: '#000000' }}>
        **בטלפון או בוואטסאפ:**
        <br />
        <Link href="tel:+972549644824" sx={{ color: '#000000', fontWeight: 'bold' }}>
          054-9644824
        </Link>
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" sx={{ mb: 1, color: '#000000' }}>
        יש להקפיד לציין **פרטים מלאים** ליצירת קשר ו**מספר הזמנה**.
      </Typography>

      <Typography variant="body2" sx={{ color: '#000000' }}>
        לגבי פניות לסניפים - יש לפנות אל הסניף **ישירות**.
      </Typography>
    </Box>
  );
};

export default About;
