'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">About ModakTodo</h1>
            <p className="text-gray-300 mt-2">
              A simple, beautiful todo app to help you focus and get things
              done.
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <section className="mb-12 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            ModarTodo is built to provide a delightful, minimal way to manage
            tasks. We believe simplicity combined with powerful features helps
            people focus on what matters.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-white/6 backdrop-blur-sm border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Who we are
            </h3>
            <p className="text-gray-300">
              A small team of designers and engineers passionate about
              productivity and clean UX.
            </p>
          </div>

          <div className="rounded-xl bg-white/6 backdrop-blur-sm border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              What we value
            </h3>
            <ul className="mt-2 space-y-2 text-gray-300">
              <li>• Simplicity</li>
              <li>• Privacy and security</li>
              <li>• Fast, accessible experiences</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 p-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Get in touch
          </h3>
          <p className="text-gray-300 mb-4">
            Have feedback or a question? We'd love to hear from you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="mailto:hello@modartodo.example"
              className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-3 text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition"
            >
              Email us
            </a>
            <Link
              href="/"
              className="inline-block rounded-lg bg-white/6 px-5 py-3 text-white border border-white/10 hover:bg-white/10 transition"
            >
              Explore the app
            </Link>
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ModarTodo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
