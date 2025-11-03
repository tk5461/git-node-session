import { useState } from 'react'
import Axios from "axios"
import { useEffect } from 'react'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import singleProdacte from "./SinglProdacte"
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Productcategory = () => {
  const [prodacts, setProdact] = useState([])
  const fetchDate = async () => {
    const { data } = await Axios.get("http://localhost:1004/product/boy") 
    console.log(data);
    setProdact(data);
  }
  useEffect(() => {
    fetchDate()
  }, [])


  if (!prodacts || !prodacts.length) return <h1>no prouacts</h1>
  return (
    <>
      <ImageList sx={{ width: '99vw', height: '99vh' }} cols={4} rowHeight={164}>
        {prodacts.map((p) => {
          const imageUrl = p.images && p.images.length > 0
            ? `http://localhost:1004${p.images[0]}`
            : `http://localhost:1004${p.images[0]}`;
          return <Link to={`/product/${p._id}`}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={imageUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {p.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {p.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        })}
      </ImageList>
    </>
  )
}

export default Productcategory
