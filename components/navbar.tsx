'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartIcon } from './cart-icon';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUsername(userData.name || userData.username);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent">
          XP Store
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/shop">
            <Button variant="ghost" className="text-foreground hover:text-accent">
              Shop
            </Button>
          </Link>

          <CartIcon />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {username}</span>
              <Link href="/profile">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  Profile
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
