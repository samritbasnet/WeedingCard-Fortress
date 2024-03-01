import React from 'react';
import {Toaster} from 'react-hot-toast'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar'; // Import the Navbar component
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from '../pages/home/home';
import Footer from '../components/footer/footer';

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
      <Footer/>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 5000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}
export default App;
