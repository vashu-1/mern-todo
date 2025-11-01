'use client';
import React, { useState } from 'react';
import NavLink from '../components/NavLink';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoader } from '../providers/LoaderProvider';

import { signup } from '../store/userslice.js';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { show: showLoader } = useLoader();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

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
        'https://mern-todo-1-krwi.onrender.com/api/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      const toastDuration = 1500; // ms

      if (response.data.success) {
        toast.success('Registration successful!', { autoClose: toastDuration });

        // dispatch safe user data only on success (no password)
        dispatch(
          signup({
            name: response.data.user.name,
            email: response.data.user.email,
            loggedIn: false,
          })
        );

        showLoader();
        setTimeout(() => router.push('/login'), toastDuration);
      } else {
        toast.error(response.data.message || 'Registration failed', {
          autoClose: toastDuration,
        });
      }

      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Registration failed');
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-600 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-600 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-200"
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
              minLength={6}
              className="w-full rounded-lg border border-gray-600 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-3 font-semibold text-white transition duration-200 hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <NavLink
            href="/login"
            className="font-semibold text-purple-400 hover:text-purple-300"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
