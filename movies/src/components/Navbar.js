import React, { useEffect, useState } from 'react'
import {AppBar,Tab,Toolbar} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import {Box} from "@mui/system"
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import { Color } from '@mui/material/colors'
import { getAllMovies } from '../api-helpers/apiHelpers'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminAction, userAction } from '../store'

function Navbar() {
 const dispatch = useDispatch();
   const [value,setValue]  = useState(0);
   const [movies,setMovies] = useState([]);
   useEffect(()=>{
   getAllMovies()
   .then(data => setMovies(data))
   .catch(err =>console.log(err))
   },[]);
  
   const isAdminLoggedIn = useSelector((state) =>state.admin.isLoggedin);
   const isUserLoggedIn = useSelector((state) =>state.user.isLoggedin);
 const logout = (isAdmin) =>{
    dispatch(isAdmin ? adminAction.logout() : userAction.logout())
 }
  return (
   <AppBar position='sticky' sx={{bgcolor:"#2b2d24"}}>
    <Toolbar>
        <Box width={"20%"}>
            <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
        <Autocomplete
        freeSolo
        options={movies.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} 
         variant='standard'
          label="search through the bars" 
          sx={{input:{color:"white" }}} />}
      />
      
        </Box>
        <Box display={"flex"}>
         <Tabs textColor='inherit' 
         indicatorColor='secondary'
         value={value} 
         onChange={(e,val) => setValue(val)}>
          <Tab  label="Movies" LinkComponent={Link} to='movies'/>
            <Box>
          {!isAdminLoggedIn && !isUserLoggedIn && (
  <>
    <Tab  label="Admin" LinkComponent={Link} to='admin'/>
    <Tab  label="Auth" LinkComponent={Link} to='auth'/>
  </>
)}
           {isUserLoggedIn && (
  <>
    <Tab  label="profile" LinkComponent={Link} to='user'/>
    <Tab 
      onClick={() => logout(false)} // Use a function to call logout
      label="Logout" 
      LinkComponent={Link} to='/'/>
  </>
)}
           {isAdminLoggedIn && (<>
            <Tab  label="Add Movie" LinkComponent={Link} to='add'/>
            <Tab  label="Profile" LinkComponent={Link} to='admin'/>
          <Tab 
          onClick={logout(true)}
           label="Logout"
           LinkComponent={Link} to='/'/>
           </>)}
           </Box>
         </Tabs>
        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Navbar