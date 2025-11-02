import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './styles/performance.css';
import ReduxProvider from './providers/ReduxProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Use font-display: swap for better performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'ModakTodo - Modern Task Management',
  description: 'A beautiful, intuitive task management app that helps you stay organized, focused, and productive.',
  keywords: 'todo, task management, productivity, organize',
  authors: [{ name: 'ModakTodo Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#8b5cf6',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch for faster external resource loading */}
        <link rel="dns-prefetch" href="https://assets.aceternity.com" />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
