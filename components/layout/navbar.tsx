'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/cart/cart-icon';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          setUsername(userData.name || userData.username);
          setUserImage(userData.image || '');
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else if (session?.user) {
        setIsLoggedIn(true);
        setUsername(session.user.name || session.user.email || 'User');
        setUserImage(session.user.image || '');
      } else {
        setIsLoggedIn(false);
        setUsername('');
        setUserImage('');
      }
    };

    checkUser();

    window.addEventListener('user-updated', checkUser);
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('user-updated', checkUser);
      window.removeEventListener('storage', checkUser);
    };
  }, [session]);

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
            <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs text-muted-foreground">View Profile</p>
              </div>
              <Avatar className="h-9 w-9 border border-accent/20">
                <AvatarImage src={userImage} alt={username} />
                <AvatarFallback className="bg-primary/10 text-primary">
                    {username?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
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
