'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import '../app/Login.css';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.refresh();
      router.push('/home');
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <div className="login">
      <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
      {error && <div className="text-lg text-red-500">{error}</div>}
      <div className="login-container">
        <form onSubmit={onSubmit}>
          <div className="form-labels">
            <label htmlFor="email">Email Address</label>
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="email"
              name="email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="password"
              name="password"
              required
            />
          </div>

          <div className="button-wrapper">
            <button
              type="submit"
              className="bg-red-700 text-white rounded px-4 py-2 mt-2 hover:bg-red-800 transition"
            >
              Login
            </button>
          </div>

          <div className="divider">
            <div className="line"></div>
            <span className="text">OR</span>
            <div className="line"></div>
          </div>
        </form>

        <div className="signup-redirect">
          Don't have an account?{' '}
          <Link href="/signup" className="signup-link">
            SIGNUP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
