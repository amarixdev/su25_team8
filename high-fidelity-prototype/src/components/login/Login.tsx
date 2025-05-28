'use client';

import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const handleLoginClick = (type: 'visitor' | 'contributor') => {
    // For prototype, set a flag in localStorage to simulate being logged in
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', type);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('userTypeChanged'));
    
    // Navigate to home page
    router.push('/');
  };

  return (
    <div className="flex-grow flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-8">
        
        <div className="flex gap-4">
          <button 
            onClick={() => handleLoginClick('visitor')}
            className="cursor-pointer w-44 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="flex flex-col items-center">
              <span>Log in as</span>
              <span className="font-bold">Visitor</span>
            </span>
          </button>
          <button 
            onClick={() => handleLoginClick('contributor')}
            className="cursor-pointer w-44 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="flex flex-col items-center">
              <span>Log in as</span>
              <span className="font-bold">Contributor</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

