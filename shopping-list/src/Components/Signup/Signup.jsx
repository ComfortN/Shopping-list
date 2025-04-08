import React, { useState } from 'react';
import './Signup.css';
import { TextField, Button, Typography, Container, Snackbar, Link, Box, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../Features/Users/userActions';
import BounceLoader from 'react-spinners/BounceLoader';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [termsOpen, setTermsOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        if (!acceptedTerms) {
            setSnackbarMessage('You must accept the terms and conditions before signing up');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true); // Show loader before dispatch
        const loaderTimer = setTimeout(() => setLoading(false), 2000);

        try {
            // Check if username already exists
            const response = await axios.get(`http://localhost:8888/users?username=${username}`);
            if (response.data.length > 0) {
                setSnackbarMessage('Username already taken. Please choose a different one.');
                setSnackbarOpen(true);
                setLoading(false);
                return;
            }

            // const resultAction = await dispatch(signupUser({ username, password }));

            // if (signupUser.fulfilled.match(resultAction)) {
            //     setSnackbarMessage('Signup successful! Redirecting to login...');
            //     setSnackbarOpen(true);
            //     setTimeout(() => navigate('/login'), 2000);
            // } else {
            //     setSnackbarMessage(resultAction.payload || 'Error signing up. Please try again.');
            // }
            await dispatch(signupUser({ username, password }));
            setSnackbarMessage('Signup successful! Please log in.');
            setSnackbarOpen(true);
            
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setSnackbarMessage('An unexpected error occurred.');
        } finally {
            clearTimeout(loaderTimer)
            setLoading(false); // Hide loader after request completes
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleAcceptTerms = () => {
        setAcceptedTerms(true);
        setTermsOpen(false);
        localStorage.setItem('termsAccepted', 'true');
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
            <FormControlLabel
            control={
                <Checkbox
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    color="primary"
                />
            }
            label="I agree to the T's & C's"
            />
            <Button variant="outlined" color="primary" onClick={() => setTermsOpen(true)}>
                Read T's & C's
            </Button>
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <Button type="submit" variant="contained" color="primary" className="button">
                        Sign Up
                    </Button>
                )}
            </Box>
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

        <TermsAndConditions
            open={termsOpen} onAccept={handleAcceptTerms}
            onClose={() => setTermsOpen(false)}
        />
        </Container>
    );
}
