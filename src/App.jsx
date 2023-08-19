import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import StickyNavbar from './components/StickyNavbar';
import Lesson from './pages/Lesson';
import Results from './pages/Results';
import './App.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      
      <Router>
      <StickyNavbar/>
        <Routes>
          
          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/lesson" element = {<Lesson/>}/>
          <Route path="/results" element = {<Results/>}/>
        </Routes>
      </Router>
      <Footer/>
    </ChakraProvider>
  )
}

export default App;
