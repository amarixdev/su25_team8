'use client';
import React from 'react';
import Login from '../../components/Login';
import Header from '@/components/Header';

export default function LoginPage() {
  return (
    <div>
      {/* <Header /> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

   <div className="max-w-md w-full p-8">
     <div className="text-center mb-8">
       <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
       <p className="mt-2 text-gray-600">Please sign in to continue</p>
     </div>
     <Login />
   </div>
 </div>
    </div>
  



  );
} 