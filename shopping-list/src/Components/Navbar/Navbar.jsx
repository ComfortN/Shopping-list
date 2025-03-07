import React, {useState} from 'react'
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {logoutUser} from '../../Features/Users/userSlice'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../Profile/ProfileModal';




export default function Navbar() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  };


  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <>
    <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography variant="h5" className="title">
            Shopping List App
          </Typography>
          
          {user ? (
            <Box display="flex" alignItems="center" ml="auto">
              <IconButton color="inherit" onClick={handleOpenProfileModal}>
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            </Box>
          ) : (
            <Button color="inherit" className="loginButton" href="/login">Login</Button>
          )}
        
        </Toolbar>
      </AppBar>
      <ProfileModal open={profileModalOpen} handleClose={handleCloseProfileModal} />
      </>
  )
}
