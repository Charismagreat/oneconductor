"use client";

import React from "react";
import { Beaker, Lightbulb, Rocket, Globe, ClipboardList, PenTool } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend, LineChart, Line, AreaChart, Area
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const projectProgress = [
  { name: '스마트 안전 센서 2.0', progress: 85, status: '개발중' },
  { name: '차세대 에너지 고효율 인버터', progress: 42, status: '설계중' },
  { name: 'AI 기반 고장 예지 시스템', progress: 15, status: '기획중' },
  { name: '스마트 자재 관리 T-OSK', progress: 95, status: '출시준비' },
  { name: 'ESG 탄소 배출 저감 장치', progress: 60, status: '테스트중' },
];

const rndBudgetTrend = [
  { month: '10월', budget: 120, spent: 110 },
  { month: '11월', budget: 120, spent: 115 },
  { month: '12월', budget: 150, spent: 145 },
  { month: '1월', budget: 180, spent: 120 },
  { month: '2월', budget: 180, spent: 135 },
  { month: '3월', budget: 200, spent: 150 },
];

export default function RndStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="진행 프로젝트" value="12건" trend="+2건" icon={Rocket} delay={0.1} />
        <StatCard label="연구 개발 집행률" value="75.2%" trend="+4.5%" icon={Lightbulb} delay={0.2} />
        <StatCard label="지식재산권(출원)" value="24건" trend="+3건" icon={ClipboardList} delay={0.3} />
        <StatCard label="개발 성숙도 (Avg)" value="68%" trend="Progressing" icon={Beaker} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="주요 프로젝트 진행 현황" description="현재 개발 중인 핵심 과제별 공정율" />
          <div className="space-y-6 mt-8">
            {projectProgress.map((project, index) => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-200">{project.name}</span>
                  <span className="text-slate-400 font-medium">{project.status} ({project.progress}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                    className={cn(
                      "h-full rounded-full",
                      project.progress > 80 ? "bg-emerald-500" : project.progress > 40 ? "bg-blue-500" : "bg-amber-500"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="R&D 예산 집행 추이" description="월별 편성 예산 대비 실집행액 (단위: 백만원)" />
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rndBudgetTrend}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="spent" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpent)" strokeWidth={3} />
                <Line type="monotone" dataKey="budget" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" name="편성 예산" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="glass-card p-8 rounded-3xl border-l-[6px] border-blue-500">
        <div className="flex items-center gap-4 mb-6">
           <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
             <PenTool size={24} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-slate-100">연구 개발 공지 및 마일스톤</h3>
             <p className="text-sm text-slate-500 font-medium">부설연구소 주요 일정 및 공지사항</p>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { date: '2024.03.25', title: '스마트 안전 센서 2.0 시제품 1차 테스트', type: '마일스톤', color: 'blue' },
            { date: '2024.03.20', title: '산업통상자원부 국책과제 결과 보고서 마감', type: '중요', color: 'red' },
            { date: '2024.03.18', title: '차세대 배터리 인터페이스 특허 출원 완료', type: '성과', color: 'emerald' },
            { date: '2024.03.15', title: '전사 기술 세미나: AIoT 트렌드 분석', type: '세미나', color: 'purple' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex flex-col items-center justify-center min-w-[80px] py-1 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] font-bold text-slate-500">{item.date}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-[9px] font-black uppercase px-1.5 py-0.5 rounded",
                    item.color === 'blue' ? "bg-blue-500/20 text-blue-400" :
                    item.color === 'red' ? "bg-red-500/20 text-red-400" :
                    item.color === 'emerald' ? "bg-emerald-500/20 text-emerald-400" :
                    "bg-purple-500/20 text-purple-400"
                  )}>{item.type}</span>
                </div>
                <p className="text-sm font-bold text-slate-200">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
