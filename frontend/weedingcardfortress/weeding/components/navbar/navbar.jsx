import React from 'react'
import "./navbar.css"
export const navbar = () => {
  return (
    <div>navbar
    <div className='navContainer'>
        <span className="logo">Fortress-WeedingCard</span>
        <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
        </div>
    </div>
    </div>
  )
}
