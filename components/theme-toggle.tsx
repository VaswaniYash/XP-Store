"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground">
        <i className="ri-sun-line text-lg"></i>
      </button>
    );
  }

  const currentTheme = resolvedTheme;

  const handleToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-primary group relative"
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      {currentTheme === "dark" ? (
        <i className="ri-sun-line text-lg transition-transform group-hover:rotate-45"></i>
      ) : (
        <i className="ri-moon-line text-lg transition-transform group-hover:-rotate-12"></i>
      )}
    </button>
  );
}
