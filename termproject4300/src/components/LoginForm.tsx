"use client";
import Link from "next/link";
//import { doCredentialLogin } from "../app/actions";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "../app/Login.css"


const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      //const response = await doCredentialLogin(formData);

      if (response?.error) {
        console.error(response.error);
        setError(response.error.message || "An error occurred");
      } else {
        router.push("/");
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className="login">
    
   
       <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
      {error && <div className="text-lg text-red-500">{error}</div>}
  <div className="login-container">
      <form
  onSubmit={onSubmit}
  className=""
>
<div className='form-labels'>

    <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
      Email Address
    </label>
    <input
      className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      required
    />
 

  <div className="flex flex-col">
    <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
      Password
    </label>
    <input
      className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      required
    />
  </div>

</div>
{error && <p className="text-red-500 text-sm">{error}</p>}
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

      <p className="my-3 text-center">
        Don't have an account?
        <Link href="signup" className="mx-2 underline">SIGNUP</Link>
      </p>
     
   </div>
    
    </div>
 
  
  );
};

export default LoginForm;
