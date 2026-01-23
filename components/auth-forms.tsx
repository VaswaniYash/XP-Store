'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data));
        setSuccess('Logged in successfully!');
        setTimeout(() => {
          router.push('/');
          onSuccess?.();
        }, 1000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 text-base font-medium bg-white text-black hover:bg-gray-200 rounded-xl transition-all shadow-lg hover:shadow-white/20 mt-2"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, confirmPassword }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data));
        setSuccess('Account created successfully!');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join XP Store today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
          <input
            type="text"
            name="username"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="your_username"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 text-base font-medium bg-white text-black hover:bg-gray-200 rounded-xl transition-all shadow-lg hover:shadow-white/20 mt-2"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full py-6 bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white rounded-xl transition-all"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <svg className="mr-3 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
