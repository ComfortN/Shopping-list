import React, {useState} from 'react';
import './LandingPage.css';
import ShoppingListImage from '../../shoppinglist.jpeg';
import { Container, Typography, Button, Box, AppBar, Toolbar, CircularProgress } from '@mui/material';

export default function LandingPage() {
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/signup"; // Redirect after loader
        }, 2000); // Simulate loading delay (e.g., 2 seconds)
      };


  return (
    <Box className="landing-root">

    <Container>
        <Box className="flex-container">
            <Box className="textContainer">
                <Typography variant="h3" gutterBottom>
                    Manage Your Shopping Lists with Ease
                </Typography>
                <Typography variant="h6" paragraph>
                    Save time and stay organised by keeping track of all your shopping lists in one place.
                </Typography>
                 {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                className="signUpButton"
                onClick={handleButtonClick}
              >
                Try It Now
              </Button>
            )}
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
