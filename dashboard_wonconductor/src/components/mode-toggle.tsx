"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5" />
    );
  }

  return (
    <button
      onClick={() => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        console.log("Switching theme to:", nextTheme);
        setTheme(nextTheme);
      }}
      className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group overflow-hidden"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : 40,
          opacity: theme === "dark" ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-amber-400"
      >
        <Moon size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === "light" ? 0 : -40,
          opacity: theme === "light" ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center text-amber-500"
      >
        <Sun size={18} />
      </motion.div>
    </button>
  );
}
