'use client';
import React from 'react';
import Login from '../../components/Login';
// import Header from '@/components/Header'; // Assuming Header might be used later

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">SpartanParadigm</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Sign in to access your account.
          </p>
        </div>
        <Login />
      </div>
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SpartanParadigm. All rights reserved.</p>
        <p className="mt-1">
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a> | <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
} 