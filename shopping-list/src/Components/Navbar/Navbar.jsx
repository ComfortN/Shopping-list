import React from 'react'
import { Container, Typography, Button, Box, AppBar, Toolbar } from '@mui/material';
import './Navbar.css'


export default function Navbar() {
  return (
    <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography variant="h5" className="title">
            Shopping List App
          </Typography>
          <Button color="inherit" className="loginButton">Login</Button>
        </Toolbar>
      </AppBar>
  )
}
