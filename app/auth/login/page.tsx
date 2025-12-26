"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        
        // Show success message
        alert("Login successful!");
        
        // Redirect to home page
        window.location.href = "/";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground mb-2">Don't have an account?</p>
          <Link href="/auth/register">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
