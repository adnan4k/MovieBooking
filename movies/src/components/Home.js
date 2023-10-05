import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box"
import { Button,Typography } from '@mui/material'
import MovieItem from './movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/apiHelpers'

function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=>{
      setMovies(data);
    }).catch((error) =>{console.log(error)})
  },[]);
  
  return (
    <Box width={"100%"} height={"100%"} margin='auto' marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box display="flex" width="80%" justifyContent={"center"} flex="wrap"> 
          {movies && movies.slice(0,4).map((movie,index) =>(
            <MovieItem
            title={movie.title}
            releaseDate={movie.releaseDate}
            posterUrl={movie.posterUrl}
            id={movie._id}
             key={index}/>
          ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          variant="outlined"
          LinkComponent={Link}
          to="/movies"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  )
}

export default Home