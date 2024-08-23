import React, { useState } from 'react';
import './Signup.css'
import { TextField, Button, Typography, Container, Snackbar, Link, Box, FormControlLabel, Checkbox  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const { status, error } = userState || {};

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

        if (!acceptedTerms) {  // Check if terms are accepted
            setSnackbarMessage('You must accept the terms and conditions before signing up');
            setSnackbarOpen(true);
            return;
        }

        const resultAction = await dispatch(signupUser({ username, password }));

        if (signupUser.fulfilled.match(resultAction)) {
            setSnackbarMessage('Signup successful! Redirecting to login...');
            setSnackbarOpen(true);
            setTimeout(() => navigate('/login'), 2000);
        } else if (signupUser.rejected.match(resultAction)) {
            setSnackbarMessage(resultAction.payload || 'Error signing up. Please try again.');
            setSnackbarOpen(true);
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
                    {status === 'loading' ? (
                        <BounceLoader size={60} color={"#36D7B7"} />
                    ) : (
                        <Button type="submit" variant="contained" color="primary" className='button'>
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
                open={termsOpen} nAccept={handleAcceptTerms} onClose={() => setTermsOpen(false)} />
        </Container>
  );
}
