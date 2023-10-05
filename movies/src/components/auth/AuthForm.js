import { Box, Button, Dialog,FormLabel,IconButton,TextField,Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Link } from 'react-router-dom';

function AuthForm({onSubmit,isAdmin}) {
    

    const labelStyle = {mt:1,mb:1};
    const [isSignup,setIsSignup] = useState(false);
    const [inputs,SetInputs] = useState({
        name:"",
        password:"",
        email:""
    });
    const handleChange = (e) =>{
        SetInputs((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs)
        onSubmit({inputs,signup: isAdmin ? false :isSignup});
    }
  return (
    <Dialog open={true} PaperProps={{ style: { borderRadius: 20 } }}>
        <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
        <Typography variant='h4' textAlign={"center"}>
        {isSignup ? "Signup":"Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={350}
          height={200}
          margin="auto"
          alignContent={"center"}>
            {!isAdmin && isSignup && <>
                <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField margin='normal' 
              variant='standard' 
              type={'text'}
               name='name'
               value={inputs.name} 
               onChange={handleChange}></TextField>
            </>}
              
              <FormLabel sx={labelStyle}>Email</FormLabel>
              <TextField margin='normal' variant='standard' type={'email'} name='email'
            
              value={inputs.email}
              onChange={handleChange} 
              ></TextField>
              <FormLabel sx={labelStyle}>Password</FormLabel>
              <TextField margin='normal' variant='standard' type={'password'} name='password'
              value={inputs.password}
              onChange={handleChange}
              ></TextField>
              <Button
              sx={{mt:2,borderRadius:10,bgcolor:"#2b2d24"}}
              type='submit'
              fullWidth
              variant='contained'
              >
                {isSignup ? "Signup":"Login"}
              </Button>
              { !isAdmin && <Button onClick={()=>setIsSignup(!isSignup)}
              sx={{mt:2,borderRadius:10}}
             fullWidth
              
              >
             Switch {isSignup ?"Login":"Signup"}
              </Button>}
          </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm