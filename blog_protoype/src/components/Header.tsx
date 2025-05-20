import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer font-bold text-xl">Blog Title</Link>
          </div>
          <nav className="flex space-x-8">
            <Link 
              href="/leaderboards" 
              className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
            >
              Leaderboards
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 