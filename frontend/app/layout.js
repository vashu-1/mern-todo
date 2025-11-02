import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReduxProvider from './providers/ReduxProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'Todo App - Manage Your Tasks',
  description: 'A modern todo application built with Next.js and MongoDB',
  keywords: 'todo, tasks, productivity, task management',
  authors: [{ name: 'Vijay' }],
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://mern-todo-1-krwi.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mern-todo-1-krwi.onrender.com" />
        
        {/* Critical inline styles to prevent render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              margin: 0; 
              background: #000; 
              color: #fff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            * { box-sizing: border-box; }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
