import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <Link to="/" className="logo text-lg font-bold">Fortress-WeedingCard</Link> {/* Use Link instead of span for navigation */}
        <nav className="navItems flex">
          <button className="navButton mr-4">Register</button>
          <Link to="/login" className="navButton">Login</Link> {/* Use Link instead of button for navigation */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
