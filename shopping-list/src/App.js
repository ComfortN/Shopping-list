import { ThemeProvider, createTheme } from '@mui/material/styles';
import LandingPage from './Components/LandingPage/LandingPage';
import Navbar from './Components/Navbar/Navbar';
import React from 'react';
// import './App.css';


const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "'Edu VIC WA NT Beginner', cursive",
    },
    h6: {
      fontFamily: "'Edu VIC WA NT Beginner', cursive",
    },
    h5: {
      fontFamily: "'Edu VIC WA NT Beginner', cursive",
    },
  },
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#1de9b6',
    },
    background: {
      default: '#a7ffeb',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
