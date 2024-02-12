import React from 'react';
import Navbar from '../../components/navbar/navbar';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Fortress App</h1>
        <p className="text-lg text-center mb-8">Welcome to our WeedingCard image generation application.</p>
       
      </div>
    </div>
  );
};

export default Home;
