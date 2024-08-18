import React from 'react';
import './LandingPage.css';
import ShoppingListImage from '../../images.jpg';
import { Container, Typography, Button, Box, AppBar, Toolbar } from '@mui/material';

export default function LandingPage() {
  return (
    <Box className="landing-root">

    <Container>
        <Box className="flex-container">
            <Box className="textContainer">
                <Typography variant="h3" gutterBottom>
                    Manage Your Shopping Lists with Ease
                </Typography>
                <Typography variant="h6" paragraph>
                    Save time and stay organized by keeping track of all your shopping lists in one place.
                </Typography>
                <Button
                    variant="contained"
                    className="signUpButton"
                    href="/signup"
                >
                    Try It Now
                </Button>
            </Box>

            <Box className="imageContainer">
                <img
                    src={ShoppingListImage}
                    alt="Shopping List"
                    className="image"
                />
            </Box>
        </Box>
    </Container>
    </Box>
    )
}
