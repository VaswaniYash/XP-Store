import { RegisterForm } from '@/components/auth-forms';
import Link from 'next/link';

export const metadata = {
  title: 'Sign Up - XP Store',
  description: 'Create a new XP Store account',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Logo / Header */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-white/10 transition-transform group-hover:scale-105">
            XP
          </div>
          <span className="font-bold text-2xl tracking-tighter text-white">STORE</span>
        </Link>
      </div>

      <div className="w-full max-w-[420px] px-4 relative z-10 my-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <RegisterForm />

          <div className="text-center mt-8 pt-4 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-white font-medium hover:underline decoration-purple-500 decoration-2 underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
