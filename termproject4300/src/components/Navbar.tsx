'use client';

import "./Navbar.modules.css";
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav>
      <div className='name-login-container'>
        <div className="nav-items">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90">
            <div className="flex items-center bg-gray-800 p-2 rounded-md shadow-md">
              <Image
                className="logo"
                src="/images/logobg_studium.png"
                alt="Studium logo"
                width={75}
                height={75}
              />
            </div>
          </Link>

          <Link href="/about">
            <button className='nav-items'>
              <span className="span">About</span>
            </button>
          </Link>
        </div>

        <div className='nav-items'>
          {status === "loading" ? (
            <span>Loading...</span>
          ) : session?.user ? (
            <>
              <span>Welcome, {session.user.name}</span>
              <button onClick={handleLogout} className='nav-items'>
                Logout
              </button>
            </>
          ) : (
            <span className='span'>
              <Link href='/login' className='mr-1'>Login</Link> | <Link href='/signup' className='ml-1'>Register</Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
