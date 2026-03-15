"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAI } from "./AIProvider";
import { cn } from "@/lib/utils";

export function AIFloatingButton() {
  const { isOpen, setIsOpen } = useAI();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
        "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600",
        "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100",
        isOpen ? "rotate-45" : "rotate-0"
      )}
    >
      <div className="absolute inset-0 rounded-full animate-pulse bg-blue-400/20 blur-xl" />
      <Sparkles className="text-white relative z-10" size={24} />
    </motion.button>
  );
}
