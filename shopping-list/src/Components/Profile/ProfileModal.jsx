import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, CircularProgress, Avatar, Snackbar } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser , fetchUserDetails} from '../../Features/Users/userActions';


export default function ProfileModal({ open, handleClose }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState('');
    const [updatedUser, setUpdatedUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (open && user) {
            setLoading(true);
            dispatch(fetchUserDetails(user.id))
                .unwrap()
                .then(data => {
                    setImage(data.image || '');
                    setUpdatedUser(data);
                })
                .catch(error => {
                    setSnackbarMessage('Error fetching profile details.');
                    setSnackbarOpen(true);
                })
                .finally(() => setLoading(false));
        }
    }, [open, user, dispatch]);


    const handleEditClick = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await dispatch(updateUser(updatedUser, image)); // Update user info
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarOpen(true);
      setIsEditing(false);
    } catch (error) {
      setSnackbarMessage('Error updating profile.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


const handleImageChange = (imageURL) => {
    setImage(imageURL);
  };


  if (loading) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: 400, margin: 'auto', padding: 2, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        </Modal>
    );
}

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: 400, margin: 'auto', padding: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" gutterBottom>
                {isEditing ? 'Edit Profile' : 'Profile Details'}
                </Typography>
                <Avatar src={image || updatedUser.image} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                {isEditing ? (
                <Box>
                    <TextField
                    label="Username" value={updatedUser.username || ''}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                    fullWidth margin="normal"
                    />
                    <TextField
                    label="Name" value={updatedUser.name || ''}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                    fullWidth  margin="normal"
                    />
                    <TextField
                    label="Email" type="email" value={updatedUser.email || ''}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    fullWidth margin="normal"
                    />
                    <TextField
                    label="Password" type="password" value={updatedUser.password || ''}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                    fullWidth margin="normal"
                    />
                    <TextField
                        label="Image URL" variant="outlined" fullWidth
                        margin="normal" value={image}
                        onChange={(e) => handleImageChange(e.target.value)}
                        required
                        />
                </Box>
                ) : (
                <Box>
                    <Typography variant="body1">Username: {updatedUser.username}</Typography>
                    <Typography variant="body1">Name: {updatedUser.name}</Typography>
                    <Typography variant="body1">Email: {updatedUser.email}</Typography>
                    <Typography variant="body1">Password: (hidden)</Typography>
                </Box>
                )}
                <Box mt={2} display="flex" justifyContent="space-between">
                {isEditing ? (
                    <>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <Button onClick={handleEditClick} variant="contained" color="primary" startIcon={<Edit />}>
                    Edit
                    </Button>
                )}
                </Box>
                <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                />
            </Box>
        </Modal>
    )
}
