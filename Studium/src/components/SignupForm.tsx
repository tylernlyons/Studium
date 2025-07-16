'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import './Signup.css';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [emailError, setEmailError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get('name') as string | null;
      const email = formData.get('email') as string | null;
      const password = formData.get('password') as string | null;

      if (!name || !email || !password) {
        setEmailError('All fields are required.');
        return;
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201) {
        setEmailError('');
        router.push('/login');
      } else if (response.status === 409) {
        setEmailError('An account with that email address already exists. Please log in to continue.');
      } else {
        setEmailError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setEmailError('Unexpected error. Please try again.');
    }
  }

  return (
    <div className="signup">
      <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>

      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div className="form-labels">
            {/* Name input */}
            <label htmlFor="name">Name</label>
            <input className="p-2 border border-gray-300 rounded-md" type="text" name="name" id="name" required />

            {/* Email input */}
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="email"
              name="email"
              id="email"
              required
              onChange={() => setEmailError('')}
            />
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}

            {/* Password input */}
            <label htmlFor="password">Create Password</label>
            <input className="p-2 border border-gray-300 rounded-md" type="password" name="password" id="password" required />
          </div>

          {/* Submit button */}
          <div className="button-wrapper">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        {/* Divider */}
        <div className="divider">
          <div className="line"></div>
          <span className="text">OR</span>
          <div className="line"></div>
        </div>

        {/* Redirect to login */}
        <div className="login-redirect">
          Already have an account?{' '}
          <Link href="/login" className="login-link">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
