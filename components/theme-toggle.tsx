"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("beu-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    const updateLabel = window.setTimeout(() => setIsDark(shouldUseDark), 0);

    return () => window.clearTimeout(updateLabel);
  }, []);

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("beu-theme", nextTheme);
    setIsDark(nextTheme === "dark");
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      role="switch"
      aria-label="Toggle dark mode"
      aria-checked={isDark}
      onClick={toggleTheme}
    >
      <span className="theme-icon theme-sun"><Sun aria-hidden="true" size={14} /></span>
      <span className="theme-icon theme-moon"><Moon aria-hidden="true" size={14} /></span>
      <span className="theme-thumb" aria-hidden="true" />
    </button>
  );
}