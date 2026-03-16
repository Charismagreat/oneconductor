"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  comparison?: string;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ label, value, trend, comparison = "vs 전월", icon: Icon, delay = 0 }: StatCardProps) {
  const isPositive = trend?.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div className="absolute top-0 right-0 p-3 opacity-[0.03] dark:opacity-5 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-15 transition-all text-slate-900 dark:text-white">
        <Icon size={70} />
      </div>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</span>
          <div className="flex flex-col">
            <span className="text-3xl font-bold font-outfit text-slate-900 dark:text-slate-100 tracking-tight">{value}</span>
            {trend && (
              <span className={cn(
                "text-[11px] font-bold mt-1.5 inline-flex items-center whitespace-nowrap",
                isPositive ? "text-emerald-500 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
              )}>
                 {trend} <span className="text-slate-400 dark:text-slate-600 font-medium ml-1">{comparison}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SectionHeader({ 
  title, 
  description, 
  badge, 
  action 
}: { 
  title: string; 
  description?: string; 
  badge?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h3>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
            {badge}
          </span>
        )}
        {action}
      </div>
    </div>
  );
}
