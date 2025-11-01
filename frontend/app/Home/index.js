// NOTE: If you see a hydration mismatch warning (e.g. cz-shortcut-listen="true" on <body>),
// it's likely caused by a browser extension (LastPass, Grammarly, accessibility tools, etc.)
// injecting attributes before React hydrates. Your code is SSR-safe and does not cause this.
'use client';

import React from 'react';
import { NavbarDemo } from '../components/NavbarDemo.js';
import NavLink from '../components/NavLink';
import { motion } from 'framer-motion';

export default function Index() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
      <NavbarDemo />

      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20"
            >
              <span className="text-sm font-medium text-purple-300">
                ✨ Modern Task Management
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Organize Your Life with{' '}
              <span className="bg-linear-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                ModakTodo
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-gray-300 sm:text-xl"
            >
              A beautiful, intuitive task management app that helps you stay
              organized, focused, and productive. Manage your todos with style.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <NavLink
                href="/signup"
                className="w-full sm:w-auto rounded-lg bg-linear-to-r from-purple-600 to-violet-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-violet-700 transition duration-300 transform hover:scale-105"
              >
                Get Started Free
              </NavLink>
              <NavLink
                href="/Todo"
                className="w-full sm:w-auto rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm px-8 py-4 text-center text-lg font-semibold text-white hover:bg-white/20 transition duration-300"
              >
                Todo
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-gray-300 text-lg">
              Powerful features to help you manage your tasks effectively
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/50">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Easy Task Creation
              </h3>
              <p className="text-gray-300">
                Quickly add, edit, and organize your tasks with our intuitive
                interface.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/50">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Smart Organization
              </h3>
              <p className="text-gray-300">
                Organize your tasks by priority, category, or deadline to stay
                on top of everything.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/50">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Secure & Private
              </h3>
              <p className="text-gray-300">
                Your data is encrypted and secure. Only you have access to your
                tasks.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/50">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Lightning Fast
              </h3>
              <p className="text-gray-300">
                Experience blazing fast performance with instant updates and
                seamless sync.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/50">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Cross-Platform
              </h3>
              <p className="text-gray-300">
                Access your tasks from any device - desktop, tablet, or mobile.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/50">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Beautiful Design
              </h3>
              <p className="text-gray-300">
                Enjoy a clean, modern interface that makes task management a
                pleasure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="rounded-3xl bg-linear-to-r from-purple-600/20 to-violet-600/20 backdrop-blur-sm border border-white/20 p-12">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to boost your productivity?
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              Join thousands of users who have already transformed the way they
              manage tasks.
            </p>
            <NavLink
              href="/signup"
              className="inline-block rounded-lg bg-linear-to-r from-purple-600 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-violet-700 transition duration-300 transform hover:scale-105"
            >
              Start For Free
            </NavLink>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 ModakTodo. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
