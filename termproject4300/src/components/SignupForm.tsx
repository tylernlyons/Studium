"use client";

import { FormEvent } from 'react';
import { useRouter } from "next/navigation";
import "../app/Signup.css";
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name") as string | null;
      const username = formData.get("username") as string | null;
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!username || !email || !password) {
        throw new Error("All fields are required.");
      }

      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/login");
      } else {
        console.log(`Failed to register: ${response.statusText}`);
      }
    } catch (e: any) {
      console.log(e.message || "An error occurred during registration.");
    }
  }



  return (

    <div className="signup">
      <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
      <div className='signup-container'>
        <form onSubmit={handleSubmit}>


          <div className='form-labels'>
            <label htmlFor="name">Name</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              id="name"
              required
            />

            <label htmlFor="username"> Create Username</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
              type="text"
              name="username"
              id="username"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
              type="email"
              name="email"
              id="email"
              required
            />

            <label htmlFor="password"> Create Password</label>
            <input
              className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>

          <div className="button-wrapper">
            <button type="submit">Sign Up</button>
          </div>

        </form>
        <div className="divider">
          <div className="line"></div>
          <span className="text">OR</span>
          <div className="line"></div>

        </div>
        <div className="login-redirect">
          Already have an account? <Link href="/login" className="login-link"> LOGIN </Link> </div>
      </div>
    </div>
  );

}

