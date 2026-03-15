"use client";

import React from "react";
import { TrendingUp, Globe, ShoppingCart, Target, Award } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const salesByRegion = [
  { region: '수도권', sales: 420 },
  { region: '영남권', sales: 380 },
  { region: '호남권', sales: 210 },
  { region: '중부권', sales: 150 },
  { region: '해외수출', sales: 550 },
];

const dailySales = [
  { day: '01', amount: 45 },
  { day: '03', amount: 52 },
  { day: '05', amount: 38 },
  { day: '07', amount: 65 },
  { day: '09', amount: 48 },
  { day: '11', amount: 72 },
  { day: '13', amount: 84 },
];

export default function SalesStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="당월 누적 매출" value="₩8.74억" trend="+12.8%" icon={TrendingUp} delay={0.1} />
        <StatCard label="해외 수출액" value="₩3.21억" trend="+24.5%" icon={Globe} delay={0.2} />
        <StatCard label="신규 수주 건수" value="42건" trend="+15.0%" icon={ShoppingCart} delay={0.3} />
        <StatCard label="목표 달성률" value="82.4%" trend="+4.2%" icon={Target} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="권역별/수출 매출 현황" description="원컨덕터의 글로벌 및 국내 시장 분포" />
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByRegion} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                <XAxis type="number" hide />
                <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} width={80} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '10px' }} />
                <Bar dataKey="sales" fill="#3b82f6" radius={[0, 10, 10, 0]} barSize={32}>
                  {salesByRegion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#8b5cf6' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="일자별 매출 추이 (3월)" description="당월 실시간 매출 발생 현황" />
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(v) => `₩${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="amount" stroke="#ec4899" strokeWidth={4} dot={{ r: 6, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <SectionHeader title="주요 신규 거래처 현황" />
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <th className="pb-4 pt-2 px-2">거래처명</th>
                <th className="pb-4 pt-2 px-2">계약 품목</th>
                <th className="pb-4 pt-2 px-2">계약 금액</th>
                <th className="pb-4 pt-2 px-2">진행 단계</th>
                <th className="pb-4 pt-2 px-2">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Vietnam Gas Corp', item: 'PE 볼밸브 100A', value: '₩4.2억', stage: '계약완료', color: 'emerald' },
                { name: '대한수도건설', item: 'EF 이음관 세트', value: '₩1.2억', stage: '출고대기', color: 'blue' },
                { name: '대구도시가스', item: '특수 밸브 200A', value: '₩0.8억', stage: '협상중', color: 'amber' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 px-2 font-medium text-slate-200">{row.name}</td>
                  <td className="py-4 px-2 text-slate-400 text-sm">{row.item}</td>
                  <td className="py-4 px-2 font-bold text-white">{row.value}</td>
                  <td className="py-4 px-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold",
                      row.color === 'emerald' && "bg-emerald-500/10 text-emerald-400",
                      row.color === 'blue' && "bg-blue-500/10 text-blue-400",
                      row.color === 'amber' && "bg-amber-500/10 text-amber-400",
                    )}>
                      {row.stage}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-slate-500 text-xs italic">신규 라인 증설분</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
