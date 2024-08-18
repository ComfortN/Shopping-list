import React, { useState } from 'react';
import './Signup.css'
import { TextField, Button, Typography, Container, Snackbar, Link  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!username || !password || !confirmPassword) {
            setSnackbarMessage('Please fill in all fields');
            setSnackbarOpen(true);
            return;
        }
        if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8888/users', {
                username,
                password,
        });

        localStorage.setItem('token', JSON.stringify({ id: response.data.id }));

            setSnackbarMessage('Signup successful! Redirecting to login...');
            setSnackbarOpen(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setSnackbarMessage('Error signing up. Please try again.');
            setSnackbarOpen(true);
            console.error('Error signing up:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container className="container">
            <Typography variant="h3" gutterBottom>
                Welcome! Please create an account.
            </Typography>

            <Typography variant="h4" gutterBottom>
                Signup
            </Typography>
            <form onSubmit={handleSignup}>
                <TextField
                label="Username" fullWidth margin="normal"
                value={username} variant="standard"
                onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                label="Password" type="password" fullWidth
                margin="normal" value={password} variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                label="Confirm Password" type="password" fullWidth
                margin="normal" value={confirmPassword} variant="standard"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" className='button'>
                Signup
                </Button>
            </form>

            <Typography variant="body2" gutterBottom style={{ marginTop: '16px' }}>
                Already have an account?{' '}
                <Link href="/login" underline="hover">
                    Login here
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
