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
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='name-login-container'>
          <div className="nav-items">
            <span className='text-white text-xl font-bold'>Studium</span>
          </div>
          <div className='nav-items'>
            {!isLoggedIn ? (
              <Link href="./pages/home">
                <button 
                  onClick={handleLogin} 
                  className='nav-items'
                >
                  <span>Login | Register</span>
                </button>
              </Link>
            ) : (
              <Link href="/">
                <button 
                  onClick={handleLogin} 
                  className='nav-items'
                >
                  <span>Logout</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;