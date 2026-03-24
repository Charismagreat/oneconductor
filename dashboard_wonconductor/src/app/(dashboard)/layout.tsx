"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Factory,
  Package,
  ShieldCheck,
  Users,
  Menu,
  X,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Beaker
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { AIProvider } from "@/components/ai/AIProvider";
import { AISidePanel } from "@/components/ai/AISidePanel";
import { AIFloatingButton } from "@/components/ai/AIFloatingButton";

const menuItems = [
  { id: "overview", label: "종합 개요", icon: LayoutDashboard, href: "/" },
  { id: "cash", label: "자금현황", icon: Wallet, href: "/cash" },
  { id: "sales", label: "영업현황", icon: TrendingUp, href: "/sales" },
  { id: "production", label: "생산현황", icon: Factory, href: "/production" },
  { id: "inventory", label: "재고현황", icon: Package, href: "/inventory" },
  { id: "quality", label: "품질현황", icon: ShieldCheck, href: "/quality" },
  { id: "rnd", label: "연구 개발 현황", icon: Beaker, href: "/rnd" },
  { id: "attendance", label: "근태현황", icon: Users, href: "/attendance" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getActiveItemLabel = () => {
    const activeItem = menuItems.find(item => 
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );
    return activeItem?.label || "종합 개요";
  };

  return (
    <AIProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 overflow-hidden transition-colors duration-300">
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 84 }}
          className="relative z-50 flex flex-col bg-white/70 dark:bg-[#060B18]/80 backdrop-blur-xl border-r border-black/5 dark:border-slate-800 transition-all duration-300"
        >
          {/* Logo Area */}
          <div className={cn(
            "flex items-center min-h-[80px] transition-all duration-300",
            isSidebarOpen ? "p-6" : "justify-center p-6"
          )}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 min-w-[40px] bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 font-bold text-white text-xl">
                W
              </div>
              {isSidebarOpen && (
                <span className="font-extrabold text-lg tracking-wider text-slate-900 dark:text-white whitespace-nowrap animate-in fade-in duration-500">
                  WONCONDUCTOR
                </span>
              )}
            </div>
          </div>

          {/* Floating Handle Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white dark:bg-[#0F172A] border dark:border-slate-800 border-slate-200 rounded-full shadow-lg flex items-center justify-center group z-50 transition-all hover:scale-110",
              !isSidebarOpen && "translate-x-1"
            )}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
            )}
          </button>

          <nav className={cn(
            "flex-1 py-6 space-y-2 overflow-y-auto no-scrollbar",
            isSidebarOpen ? "px-4" : "px-3"
          )}>
            {menuItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center transition-all group overflow-hidden relative",
                    isSidebarOpen 
                      ? "gap-4 px-4 py-3.5 rounded-xl text-[14px] font-semibold h-12" 
                      : "justify-center w-[54px] h-[54px] rounded-2xl mx-auto",
                    isActive 
                      ? "dark:bg-[#0F172A] bg-blue-50 text-blue-600 dark:text-blue-500 font-medium" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-600 dark:bg-blue-500 rounded-r-md transition-all" />
                  )}

                  <item.icon className={cn(
                    "shrink-0 transition-transform duration-300", 
                    isSidebarOpen ? "w-5 h-5" : "w-6 h-6",
                    isActive ? "text-blue-600 dark:text-blue-500 scale-110" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 group-hover:scale-110"
                  )} />
                  
                  {isSidebarOpen && (
                    <span className="text-sm whitespace-nowrap transition-opacity duration-300">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={cn(
            "p-4 border-t border-black/5 dark:border-slate-800/50 transition-all duration-300",
            !isSidebarOpen && "items-center justify-center flex"
          )}>
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 min-w-[40px] rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-black/5 dark:border-slate-600 overflow-hidden shadow-inner flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                 CEO
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate text-slate-900 dark:text-white">지상현 대표님</span>
                  <span className="text-[10px] text-slate-500 font-medium tracking-tight">관리자 계정</span>
                </div>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4 px-8 flex items-center justify-between flex-shrink-0 transition-colors duration-300">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-outfit tracking-tight text-slate-900 dark:text-white">
                {getActiveItemLabel()}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">2026년 3월 13일 (금) 실시간 업데이트</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative group hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="검색어를 입력하세요..." 
                  className="bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <ModeToggle />
                <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <Bell size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#020617]"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Dynamic Content */}
          <main className="flex-1 overflow-y-auto relative p-8 custom-scrollbar bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>

          {/* AI Components */}
          <AIFloatingButton />
          <AISidePanel />
        </div>
      </div>
    </AIProvider>
  );
}
