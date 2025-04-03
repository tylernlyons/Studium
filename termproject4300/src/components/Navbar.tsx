'use client';

import "./Navbar.modules.css"
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(prev => !prev);
  };

  return (
    <nav>
        <div className='name-login-container'>
          <div className="nav-items">
            <img className="size-10" src="../images/logobg_studium.png" alt="Studium logo" />
            <span className='text-white text-xl font-bold'>Studium</span>
            <Link href="/pages/about">
            <button className='nav-items'>
              <span className="span">About</span>
            </button>
            </Link>
          </div>
          
          <div className='nav-items'>
            {!isLoggedIn ? (
              <Link href="/pages/home">
                <button 
                  onClick={handleLogin} 
                  className='nav-items'
                >
                  <span className="span">Login | Register</span>
                </button>
              </Link>
            ) : (
              <Link href="/">
                <button 
                  onClick={handleLogin} 
                  className='nav-items'
                >
                  <span className="span">Logout</span>
                </button>
              </Link>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;