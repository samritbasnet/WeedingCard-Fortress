import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar'; // Import the Navbar component
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
