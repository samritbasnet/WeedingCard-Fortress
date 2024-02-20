import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar'; // Import the Navbar component
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from '../pages/home/home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} /> 
        <Route path= "/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
