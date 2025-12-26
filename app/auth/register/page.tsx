import { Navbar } from '@/components/navbar';
import { RegisterForm } from '@/components/auth-forms';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Sign Up - XP Store',
  description: 'Create a new XP Store account',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <RegisterForm />

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">Already have an account?</p>
          <Link href="/auth/login">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
