"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  FileText, 
  Settings2,
  Mic,
  Paperclip,
  ChevronDown,
  Layout,
  MessageSquare,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIAppPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "안녕하세요. 주식회사 원컨덕터 AI 어시스턴트입니다. 생산현장 안전 관리, 영업마케팅 전략, 경영지원 실무 등 모든 업무 분야에 대해 궁금한 점을 물어보세요."
    }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = () => {
    if (!inputVal.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: inputVal }]);
    setInputVal("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant", 
        content: "네, 해당 요청사항을 분석 중입니다... 데모 버전에서는 자동 응답이 제공되지 않습니다. 특정 정보나 작업이 필요하시다면 개발팀에 문의해 주세요."
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col pb-6">
      {/* Header Section */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI 어시스턴트
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium ml-13">
          생산, 영업, 마케팅, 경영지원 전반의 업무를 돕는 원컨덕터 지능형 비서입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 flex-1 min-h-0">
        {/* Quick Actions Sidebar */}
        <div className="hidden md:flex flex-col gap-4 shrink-0">
          <h3 className="text-xs font-black text-slate-500 px-2 flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3 text-amber-500" />
            QUICK ACTIONS
          </h3>
          {[
            { 
              title: "규정/매뉴얼 질의", 
              desc: "연차 결재선 안내", 
              icon: FileText, 
              color: "text-blue-500", 
              bg: "bg-blue-500/10" 
            },
            { 
              title: "보고서 초안 작성", 
              desc: "일일 점검 보고서", 
              icon: Sparkles, 
              color: "text-emerald-500", 
              bg: "bg-emerald-500/10" 
            },
            { 
              title: "시스템 가이드", 
              desc: "비밀번호 변경 방법", 
              icon: Settings2, 
              color: "text-violet-500", 
              bg: "bg-violet-500/10" 
            }
          ].map((action, idx) => (
            <button 
              key={idx}
              className="group p-5 bg-white dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-[2rem] text-left hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-xl hover:dark:bg-slate-800"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6", action.bg)}>
                <action.icon className={cn("w-5 h-5", action.color)} />
              </div>
              <h4 className="text-sm font-black dark:text-white text-slate-900 mb-1">{action.title}</h4>
              <p className="text-[11px] font-bold text-slate-500 italic">"{action.desc}"</p>
            </button>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="md:col-span-3 flex flex-col h-full bg-white dark:bg-[#0B1120] rounded-[2.5rem] border dark:border-slate-800 border-slate-200 shadow-2xl shadow-blue-500/5 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800/50">
          {/* Chat Header */}
          <div className="px-8 py-5 border-b dark:border-slate-800 border-slate-100 flex items-center justify-between bg-white dark:bg-slate-900/20 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full rounded-[0.9rem] bg-white dark:bg-slate-900 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0B1120] rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></div>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-black dark:text-white text-slate-900">WONCONDUCTOR AI</h3>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Now</p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Settings2 className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 hidden-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                  msg.role === "user" 
                    ? "bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 border-slate-200" 
                    : "bg-blue-500/10 border border-blue-500/20"
                )}>
                  {msg.role === "user" ? <User className="w-5 h-5 text-slate-500" /> : <Bot className="w-5 h-5 text-blue-500" />}
                </div>
                <div className={cn(
                  "max-w-[75%] p-5 rounded-[1.5rem] text-[14px] font-medium leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-slate-100 dark:bg-slate-900/50 dark:text-slate-300 text-slate-800 rounded-tl-sm border dark:border-slate-800 border-slate-200"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-8 border-t dark:border-slate-800 border-slate-100 bg-white/50 dark:bg-slate-900/20">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="어시스턴트에게 무엇이든 물어보세요..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="w-full h-16 pl-14 pr-32 bg-slate-100 dark:bg-slate-900 border-2 border-transparent dark:focus:border-blue-500/50 focus:border-blue-500/20 rounded-2xl outline-none transition-all dark:text-white text-slate-900 font-bold placeholder:text-slate-400"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <MessageSquare className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <button className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all mr-1">
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Powered by Gemini 1.5 Pro
              </p>
              <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Safe & Private
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
