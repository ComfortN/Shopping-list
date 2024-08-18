import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!username || !password) {
            setSnackbarMessage('Please fill in all fields');
            setSnackbarOpen(true);
            return;
        }

        try {
            
            const response = await axios.get('http://localhost:8888/users');
            const users = response.data;

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                // Store user id in localStorage as token
                localStorage.setItem('token', JSON.stringify({ id: user.id }));
                setSnackbarMessage('Login successful! Redirecting...');
                setSnackbarOpen(true);
                setTimeout(() => navigate('/shopping-list'), 2000);
            } else {
                setSnackbarMessage('Invalid username or password');
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage('Error logging in. Please try again.');
            setSnackbarOpen(true);
            console.error('Error logging in:', error);
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
                <Button type="submit" variant="contained" color="primary" className='button'>
                Login
                </Button>
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
