'use client';


import {  useFormStatus } from 'react-dom';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';



export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
    <form action={(formData) => {
      signIn('credentials', { redirect: true, email: formData.get('email') as string, password: formData.get('password') as string }).then(
        (response) => {
          if (response?.error) {
            setError("Email o contraseña invalidos");
          } 
        }
      ).catch((error) => {
        setError(error.message);
      });
    
    }

    } className="space-y-3 my-5">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 py-8 text-black ">
        <h1 className={`mb-3 text-2xl`}>
          Login
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500 bg-gray-200 "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500 bg-gray-200 text-black  "
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          {
            error && (
              <div className="mt-4 text-red" role="alert">
                {error}
              </div>
            )
          }

        </div>
        <LoginButton />
        
      </div>
    </form>
    <Link href="/auth/register" className=' text-sm hover:text-yellow-500'> No sos parte de la familia byte? Unete </Link>
  </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn bg-darkblue mt-2 w-full text-white " aria-disabled={pending}>
      Log in
    </button>
  );
}