"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useAI } from "./AIProvider";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AISidePanel() {
  const { isOpen, setIsOpen, messages, addMessage, isLoading, setIsLoading } = useAI();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      // API call will be implemented later
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: userMessage,
          context: {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
          }
        }),
      });

      const data = await response.json();
      addMessage("ai", data.answer || "죄송합니다. 요청을 처리하는 중에 문제가 발생했습니다.");
    } catch (error) {
      addMessage("ai", "연결 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border-l border-white/20 dark:border-slate-800/50 shadow-2xl z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 dark:border-slate-800/50 flex items-center justify-between bg-gradient-to-r from-blue-600/10 to-purple-600/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">AIBIS Strategist</h3>
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Virtual COO Agent</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                    msg.role === "user" ? "bg-slate-200 dark:bg-slate-800" : "bg-blue-600"
                  )}>
                    {msg.role === "user" ? <User size={14} className="text-slate-600 dark:text-slate-400" /> : <Bot size={14} className="text-white" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tr-none" 
                      : "bg-white dark:bg-slate-800/50 border border-blue-100 dark:border-blue-900/30 text-slate-800 dark:text-slate-200 shadow-sm rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-800/50 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-50/50 dark:bg-black/20 border-t border-white/10 dark:border-slate-800/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="데이터 분석 또는 전략 제안을 요청하세요..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all flex items-center justify-center shadow-lg shadow-blue-500/20"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 text-slate-400">
                AIBIS는 경영 지표를 기반으로 분석을 수행합니다. 생성된 정보는 참고용으로만 사용하십시오.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
