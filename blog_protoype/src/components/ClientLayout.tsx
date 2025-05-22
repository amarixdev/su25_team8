'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <div>
      <Header />
      <div className="flex">
      <Sidebar />
      <main className={`pt-14 flex-1 ${!isLoginPage ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
    </div>

  );
};

export default ClientLayout; 