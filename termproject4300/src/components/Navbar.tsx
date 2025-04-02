'use client';
// This is from my Nextjs resources, Navbar_basic
import Image from 'next/image';
import {useState} from 'react';
import Link from 'next/link';


const Navbar = () => {


  const [isLoggedIn,setIsLoggedIn ] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(prev => !prev);
  }

  return (
    <nav className='bg-green-700 border-b-1 border-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20'>

         { 
          !isLoggedIn && (
                <div className='hidden md:block md:ml-6'>
                  <div className='flex items-center'>
                    <Link href={"./pages/home"}>
                    <button onClick = {handleLogin} className='flex items-center text-white bg-gray-400 hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'>
                      <span>Login | Register</span>
                    </button>
                    </Link>
                  </div>
                </div>
          )
        }
        { isLoggedIn && (
                <div className='hidden md:block md:ml-6'>
                  <div className='flex items-center'>
                  <Link href={"/"}>
                    <button onClick = {handleLogin} className='flex items-center text-white bg-gray-400 hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'>
                      <span>Logout</span>
                    </button>
                    </Link>
                  </div>
                </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;