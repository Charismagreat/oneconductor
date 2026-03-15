"use client";

import React from "react";
import { Factory, Zap, Timer, Settings, Activity } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ComposedChart, Line, Area
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const lineEfficiency = [
  { name: '사출 1호기', actual: 850, target: 1000, efficiency: 85 },
  { name: '사출 2호기', actual: 920, target: 1000, efficiency: 92 },
  { name: '사출 3호기', actual: 780, target: 1000, efficiency: 78 },
  { name: '조립 라인', actual: 1100, target: 1200, efficiency: 91 },
  { name: '기밀 테스트', actual: 950, target: 1000, efficiency: 95 },
];

const hourlyProduction = [
  { time: '09:00', count: 120 },
  { time: '10:00', count: 150 },
  { time: '11:00', count: 180 },
  { time: '12:00', count: 110 },
  { time: '13:00', count: 140 },
  { time: '14:00', count: 210 },
  { time: '15:00', count: 195 },
];

export default function ProductionStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="실시간 전사 가동률" value="88.4%" trend="+2.1%" icon={Activity} delay={0.1} />
        <StatCard label="총 생산량 (금일)" value="1,245개" trend="+5.8%" icon={Factory} delay={0.2} />
        <StatCard label="가동 시간" value="7h 24m" trend="+0.5h" icon={Timer} delay={0.3} />
        <StatCard label="에너지 소모량" value="482 kWh" trend="-3.2%" icon={Zap} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="라인별 생산 달성률" description="계획 대비 실적 실시간 트래킹" badge="Live" />
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineEfficiency} margin={{ bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} 
                />
                <Bar dataKey="actual" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} name="실적" />
                <Bar dataKey="target" fill="#1e293b" radius={[6, 6, 0, 0]} barSize={40} name="목표" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="시간당 생산 추이" description="피크 타임 및 병목 구간 분석" />
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={hourlyProduction}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '10px' }} />
                <Area type="monotone" dataKey="count" fill="#3b82f6" fillOpacity={0.1} stroke="none" />
                <Bar dataKey="count" barSize={12} fill="#8b5cf6" radius={[10, 10, 0, 0]} />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {lineEfficiency.map((line, idx) => (
          <motion.div 
            key={line.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-slate-200">{line.name}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter",
                line.efficiency >= 90 ? "bg-emerald-500/20 text-emerald-400" : 
                line.efficiency >= 80 ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"
              )}>
                {line.efficiency}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${line.efficiency}%` }}
                className={cn(
                  "h-full rounded-full",
                  line.efficiency >= 90 ? "bg-emerald-500" : 
                  line.efficiency >= 80 ? "bg-blue-500" : "bg-red-500"
                )}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>계획: {line.target}</span>
              <span>실적: {line.actual}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
