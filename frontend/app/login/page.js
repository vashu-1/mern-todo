'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/userslice.js';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://mern-todo-1-krwi.onrender.com/api/user/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      let duration = 1000;
      if (response.data.success) {
        toast.success('Login successful!');
        // dispatch safe user data (no password)
        dispatch(
          login({
            email: response.data.user.email,
            id: response.data.user.id,
            name: response.data.user.name ?? null,
            loggedIn: true,
          })
        );

        setTimeout(() => router.push('/Todo'), duration);
      } else {
        toast.error(
          'Login failed: ' + (response.data.message || 'Unknown error')
        );
      }
      console.log(response);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-12">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-md font-semibold px-6 py-3 rounded-md bg-white hover:-translate-y-1.5 text-black transition duration-150"
          >
            Home
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          {/* Login Form */}
          {/* Home button (go to landing) */}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-violet-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-purple-300 hover:text-purple-200 font-semibold transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-gray-400">
          By signing in, you agree to our{' '}
          <a
            href="#"
            className="text-purple-300 hover:text-purple-200 transition duration-200"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="text-purple-300 hover:text-purple-200 transition duration-200"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
