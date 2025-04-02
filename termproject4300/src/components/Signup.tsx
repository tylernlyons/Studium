"use client";
import { useState } from 'react';
import Card from './Card';

export default function Signup({ onSubmit }: { onSubmit: (user: { name: string, username: string, email: string, password: string }) => void }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and Password are required');
      return;
    }

    setError('');
    onSubmit({ name, username, email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 py-3">
      <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
