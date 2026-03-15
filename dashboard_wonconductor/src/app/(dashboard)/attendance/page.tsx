"use client";

import React from "react";
import { Users, Clock, Flame, Calendar, HeartPulse } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const departmentHeadcounts = [
  { dept: '생산1팀', present: 24, total: 25 },
  { dept: '생산2팀', present: 22, total: 22 },
  { dept: '품질팀', present: 8, total: 8 },
  { dept: '연구소', present: 12, total: 12 },
  { dept: '관리팀', present: 10, total: 10 },
  { dept: '영업팀', present: 6, total: 8 },
];

const overtimeStats = [
  { name: '월', hours: 42 },
  { name: '화', hours: 38 },
  { name: '수', hours: 55 },
  { name: '목', hours: 48 },
  { name: '금', hours: 25 },
];

export default function AttendanceStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="전사 출근율" value="96.2%" trend="+1.2%" icon={Users} delay={0.1} />
        <StatCard label="총 현재 근무자" value="104명" trend="정상" icon={Flame} delay={0.2} />
        <StatCard label="평균 잔업 시간" value="1.8h" trend="-0.4h" icon={Clock} delay={0.3} />
        <StatCard label="무재해 기록" value="482일" trend="+1일" icon={HeartPulse} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="부서별 출근 현황" description="실시간 부서원 근무 상태 모니터링" badge="Live" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {departmentHeadcounts.map((dept, i) => (
              <div key={dept.dept} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4 group hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{dept.dept}</span>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                    dept.present === dept.total ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {dept.present === dept.total ? '전원출근' : `${dept.total - dept.present}명 부재`}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold font-outfit text-white">{dept.present}</span>
                  <span className="text-sm text-slate-500 mb-1 font-medium">/ {dept.total}명</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(dept.present / dept.total) * 100}%` }}
                     className={cn(
                       "h-full rounded-full",
                       dept.present === dept.total ? "bg-emerald-500" : "bg-amber-500"
                     )}
                   />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="주간 잔업 시간 통계" description="주차별 연장 근로 관리" />
          <div className="h-[300px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overtimeStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} unit="h" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={16} className="text-purple-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">사내 주요 일정</h4>
            </div>
            <ul className="space-y-3 mt-4">
              <li className="text-sm flex items-center justify-between">
                <span className="text-slate-400">사내 보건 교육</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 rounded text-slate-400">금일</span>
              </li>
              <li className="text-sm flex items-center justify-between">
                <span className="text-slate-400">상반기 정기 건강검진</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 rounded text-slate-500">3/15</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
