'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleSignin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:3000/dashboard' },
    });
    if (error) alert(error.message);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Welcome Back 👋</h1>
        
        <div className="flex flex-col space-y-4">
          <input
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-purple-500 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-purple-500 transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold transition"
            onClick={handleSignin}
          >
            Sign In
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          <button
            className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 py-3 rounded transition"
            onClick={handleGoogleSignin}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-3"
            />
            <span className="font-medium text-gray-700">Sign in with Google</span>
          </button>

          <button
            className="text-purple-600 hover:text-purple-800 font-medium text-center mt-4"
            onClick={() => router.push('/signup')}
          >
            Don’t have an account? <span className="underline">Sign up</span>
          </button>
        </div>
      </div>
    </main>
  );
}
