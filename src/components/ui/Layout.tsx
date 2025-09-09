import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-background text-foreground ${className}`}>
      <main className="page-transition">
        {children}
      </main>
    </div>
  );
};