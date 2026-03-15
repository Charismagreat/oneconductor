"use client";

import React from "react";
import { useSidebar } from "@/components/layout/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className={cn(
        "flex-1 flex flex-col relative min-h-screen transition-all duration-300",
        isOpen ? "md:ml-[280px]" : "md:ml-[84px]"
      )}>
        <Header />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 p-4 md:p-8">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
