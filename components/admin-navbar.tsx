'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold text-accent">
          XP Admin
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-foreground hover:text-accent gap-2">
              <Home className="w-4 h-4" />
              Store
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10 gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
