import { ThemeProvider, createTheme } from '@mui/material/styles';
import LandingPage from './Components/LandingPage/LandingPage';
import Navbar from './Components/Navbar/Navbar';
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import ShopingList from './Components/ShoppingList/ShopingList';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Features/Users/userSlice';
import './App.css';


const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "'Edu VIC WA NT Beginner', cursive",
    },
    h6: {
      fontFamily: "'Edu VIC WA NT Beginner', cursive",
    },
    h4: {
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUser(JSON.parse(token)));
    }
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/shopping-list' element={user ? <ShopingList/> : <Navigate to='/' />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
