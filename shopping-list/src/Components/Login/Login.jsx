import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Link, Box, CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Features/Users/userActions';
import BounceLoader from 'react-spinners/BounceLoader';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!username || !password) {
            setSnackbarMessage('Please fill in all fields');
            setSnackbarOpen(true);
            return;
        }
        setLoading(true);
        const loaderTimer = setTimeout(() => setLoading(false), 2000);
        try {
        const resultAction = await dispatch(loginUser({ username, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            setSnackbarMessage('Login successful! Redirecting...');
            setSnackbarOpen(true);
            setTimeout(() => navigate('/shopping-list'), 2000);
        } else if (loginUser.rejected.match(resultAction)) {
            setSnackbarMessage(resultAction.payload || 'Error logging in. Please try again.');
            setSnackbarOpen(true);
        }
        } catch (error) {
            setSnackbarMessage('An unexpected error occured.');
        } finally {
            clearTimeout(loaderTimer);
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container className='container'>
            <Typography variant="h3" gutterBottom>
                Welcome Back!
            </Typography>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                label="Username" fullWidth margin="normal" value={username} variant="standard"
                onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                label="Password" type="password" fullWidth margin="normal"
                value={password} variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                />
                <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained" color="primary" className='button'>
                            Login
                        </Button>
                    )}
                </Box>
            </form>

            <Typography variant="body2" gutterBottom style={{ marginTop: '16px' }}>
                Don't have an account?{' '}
                <Link href="/signup" underline="hover">
                    Signup here
                </Link>.
            </Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
    );
}
