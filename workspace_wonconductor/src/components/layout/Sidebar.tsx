"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  ClipboardList,
  PenTool,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Settings,
  Factory,
  ShieldCheck,
  ShieldAlert,
  Package,
  Users,
  Truck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useSidebar();
  const navItems = [
    { label: "홈 (My Desk)", icon: Home, href: "/" },
    { label: "안전 관리", icon: ShieldAlert, href: "/ops/safety" },
    { label: "생산 및 설비", icon: Factory, href: "/ops/production" },
    { label: "품질 관리", icon: ShieldCheck, href: "/ops/qa" },
    { label: "연구 개발", icon: PenTool, href: "/ops/rnd" },
    { label: "자재 관리", icon: Package, href: "/ops/scm" },
    { label: "납품 관리", icon: Truck, href: "/ops/delivery" },
    { label: "인사 총무", icon: Users, href: "/ops/hr" },
    { label: "경영 지원", icon: Briefcase, href: "/ops/admin" },
    { label: "영업 마케팅", icon: TrendingUp, href: "/ops/sales" },
    { label: "AI 어시스턴트", icon: MessageSquare, href: "/ai" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={close}
        />
      )}

      <aside className={cn(
        "flex flex-col h-screen dark:bg-[#060B18] bg-white border-r dark:border-slate-800/40 border-slate-200 shrink-0 fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out",
        isOpen ? "md:w-[280px]" : "md:w-[84px]",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className={cn(
          "flex items-center min-h-[80px] transition-all duration-300",
          isOpen ? "p-6" : "justify-center p-6"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 min-w-[40px] bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-xl leading-none">O</span>
            </div>
            {isOpen && (
              <span className="dark:text-white text-slate-800 font-extrabold text-lg tracking-wider whitespace-nowrap animate-in fade-in duration-500">
                ONECONDUCTOR
              </span>
            )}
          </div>
        </div>

        {/* Floating Handle Toggle (Desktop Only) */}
        <button
          onClick={toggle}
          className={cn(
            "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white dark:bg-[#0F172A] border dark:border-slate-800 border-slate-200 rounded-full shadow-lg flex items-center justify-center group z-50 transition-all hover:scale-110 hidden md:flex",
            !isOpen && "translate-x-1"
          )}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
          )}
        </button>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 space-y-3 overflow-y-auto no-scrollbar py-4",
          isOpen ? "px-4" : "px-0"
        )}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center transition-all group overflow-hidden relative",
                  isOpen 
                    ? "gap-4 px-4 py-3.5 rounded-xl text-[14px] font-semibold h-12" 
                    : "justify-center w-[54px] h-[54px] rounded-2xl mx-auto",
                  isActive
                    ? "dark:bg-[#0F172A] bg-blue-50 text-blue-600 dark:text-blue-500"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/30"
                )}
              >
                {/* Active Indicator Bar (Screenshot-like) */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-600 dark:bg-blue-500 rounded-r-md" />
                )}
                
                <item.icon className={cn(
                  "shrink-0 transition-transform duration-300", 
                  isOpen ? "w-5 h-5" : "w-6 h-6",
                  isActive ? "text-blue-600 dark:text-blue-500 scale-110" : "text-slate-500 group-hover:scale-110"
                )} />
                
                {isOpen && (
                  <span className="whitespace-nowrap transition-opacity duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings at the bottom */}
        <div className={cn(
          "mt-auto pb-6 transition-all duration-300",
          isOpen ? "px-4" : "px-3"
        )}>
          <Link
            href="/settings"
            className={cn(
              "flex items-center transition-all group overflow-hidden h-12",
              isOpen 
                ? "gap-4 px-4 py-3.5 rounded-xl text-[15px] font-medium" 
                : "justify-center px-0 rounded-2xl mx-auto w-12",
              pathname?.startsWith("/settings")
                ? "dark:bg-[#0F172A] bg-blue-50 text-blue-600 dark:text-blue-500 relative"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            {pathname?.startsWith("/settings") && (
              <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-600 dark:bg-blue-500 rounded-r-md transition-all" />
            )}
            <Settings className={cn(
              "shrink-0 transition-colors",
              isOpen ? "w-[22px] h-[22px]" : "w-[24px] h-[24px]",
              pathname?.startsWith("/settings") ? "text-blue-600 dark:text-blue-500" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200"
            )} />
            {isOpen && <span className="whitespace-nowrap">설정</span>}
          </Link>
        </div>
      </aside>
    </>

  );
}
