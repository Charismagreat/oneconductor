"use client";

import React from "react";
import { ShieldCheck, Crosshair, ThumbsUp, AlertCircle, FileCheck } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const defectCauses = [
  { cause: '기밀 불량', count: 42 },
  { cause: '외관 스크래치', count: 28 },
  { cause: '치수 오차', count: 15 },
  { cause: '사출 미성형', count: 8 },
  { cause: '기타', count: 7 },
];

const qualityTrend = [
  { month: '10월', rate: 99.2 },
  { month: '11월', rate: 99.4 },
  { month: '12월', rate: 99.1 },
  { month: '1월', rate: 99.5 },
  { month: '2월', rate: 99.7 },
  { month: '3월', rate: 99.8 },
];

export default function QualityStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="최종 합격률" value="99.8%" trend="+0.1%" icon={ShieldCheck} delay={0.1} />
        <StatCard label="직행율 (FPY)" value="98.2%" trend="+0.5%" icon={Crosshair} delay={0.2} />
        <StatCard label="고객 클레임" value="2건" trend="-1건" icon={ThumbsUp} delay={0.3} />
        <StatCard label="인증 갱신" value="D-12" trend="KS" icon={FileCheck} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="불량 원인 분석 (Pareto)" description="기밀 테스트 및 외관 검사 불량 데이터" />
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defectCauses}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="cause" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(239, 68, 68, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} 
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={45}>
                  {defectCauses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="월별 품질 합격률 추이" description="전사 품질 목표 달성 현황 (목표: 99.5%)" />
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis domain={[98.5, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', stroke: '#fff' }} />
                <Line type="monotone" dataKey={() => 99.5} stroke="#ef4444" strokeWidth={1} strokeDasharray="10 10" name="목표선" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="glass-card p-8 rounded-3xl border-l-[6px] border-amber-500 shadow-[20px_0_40px_rgba(245,158,11,0.05)]">
        <div className="flex items-center gap-4 mb-6">
           <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
             <AlertCircle size={24} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-slate-100">최근 품질 이슈 모니터링</h3>
             <p className="text-sm text-slate-500 font-medium">관리자 확인이 필요한 실시간 품질 알람</p>
           </div>
        </div>
        <div className="space-y-4">
          {[
            { id: '#QC-20240313-01', location: '조립 2라인', msg: '기밀 테스트 연속 3회 불량 발생 (볼밸브 100A)', time: '14분 전', status: 'inspecting' },
            { id: '#QC-20240312-04', location: '사출 1호기', msg: '금형 온도 편차 발생 (사출물 변형 위험)', time: '2시간 전', status: 'resolved' },
          ].map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{issue.id}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <span className="text-xs font-bold text-slate-300">{issue.location}</span>
                </div>
                <p className="text-sm font-medium text-slate-100">{issue.msg}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] text-slate-500">{issue.time}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                  issue.status === 'inspecting' ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-400"
                )}>
                  {issue.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
