import React from 'react';
import { useState,useEffect } from 'react'
import { Box,Typography } from '@mui/material'
import { getAllMovies } from '../../api-helpers/apiHelpers';
import MovieItem from './MovieItem';

function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=>{
      setMovies(data);
    }).catch((error) =>{console.log(error)})
  },[]);
  console.log(movies)
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
     margin={"auto"}
     variant="h4"
     padding={2}
     width="40%"
     bgcolor={"#900C3F"}
     color="white"
     textAlign={"center"}
        > All Movies
      </Typography>
      <Box
       width={"100%"}
       margin="auto"
       marginTop={5}
       display={"flex"}
       justifyContent="flex-start"
       flexWrap={"wrap"}
      >
        {movies && movies.map((movie,index)=><MovieItem 
          key={index} 
          id={movie._id} 
    
          title={movie.title}
          releaseDate={movie.releaseDate}
           />
           
        )}
        
      </Box>
    </Box>
  )
  
}

export default Movies