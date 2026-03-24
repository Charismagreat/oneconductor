import { Bell, Search, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSidebar } from "@/components/layout/SidebarContext";

export function Header() {
  const { toggle, isOpen } = useSidebar();

  return (
    <header className="h-[80px] dark:bg-[#020617] bg-slate-50 flex items-center justify-between px-8 shrink-0 relative z-10 w-full pt-4">
      <div className="flex-1 flex items-center gap-4">
        <button 
          onClick={toggle}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 md:hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {/* Mobile Title */}
        <h1 className="text-xl font-bold dark:text-white text-slate-800 md:hidden">WONCONDUCTOR</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="검색어를 입력하세요..." 
            className="dark:bg-[#0f172a] bg-white border dark:border-[#1e293b] border-slate-200 text-sm dark:text-slate-200 text-slate-800 rounded-full pl-10 pr-4 py-2 w-[280px] focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="p-2.5 text-slate-400 dark:hover:text-white hover:text-slate-600 dark:bg-[#0f172a] bg-white dark:hover:bg-[#1e293b] hover:bg-slate-100 rounded-full transition-colors relative flex items-center justify-center border dark:border-transparent border-slate-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border dark:border-[#0f172a] border-white"></span>
          </button>
          <button className="p-2.5 text-slate-400 dark:hover:text-white hover:text-slate-600 dark:bg-[#0f172a] bg-white dark:hover:bg-[#1e293b] hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center border dark:border-transparent border-slate-200">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
