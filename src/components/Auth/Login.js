import * as React from 'react';
import { useState, useEffect } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import users from '../../data/users'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login({userDataApp}) {
  const [userData, setUserData] = useState(localStorage.getItem("user") ?? null)

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password')
    const username = data.get('username')

      const checkUser = (password,username) => {
        const usercheck = users.find(user => (user.username === username && user.password === password));
        if(usercheck) {
               //sets user data
          setUserData(usercheck)
          // store the user in localStorage
          localStorage.setItem('user', usercheck.username)
          console.log("Login successful");
        }else {
          console.log("Wrong password or username");
        }
        // console.log(uname);
        console.log(usercheck);
     }

     checkUser(password, username)
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   console.log(loggedInUser.username)
  //   if (loggedInUser) {
  //     //const foundUser = JSON.parse(loggedInUser);
  //     setUserData(loggedInUser);
  //   }
  // }, []);
  // const checkUser = (password,username) => {
  //   const usercheck = users.find(user => (user.username === username && user.password === password));
  //   if(usercheck) {
  //     console.log("Login successful");
  //   }else {
  //     console.log("Wrong password or username");
  //   }
  //   // console.log(uname);
  //   console.log(usercheck);
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  if (userData) {
    return <div>{userData} is loggged in</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}