"use client";

import React from "react";
import { Wallet, TrendingUp, Landmark, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";

const monthlyCashData = [
  { name: '10월', cash: 1200, debt: 450 },
  { name: '11월', cash: 1350, debt: 420 },
  { name: '12월', cash: 1100, debt: 400 },
  { name: '1월', cash: 1580, debt: 380 },
  { name: '2월', cash: 1420, debt: 350 },
  { name: '3월', cash: 1840, debt: 320 },
];

const bankBalances = [
  { bank: '신한은행', balance: 450, color: '#0046ff' },
  { bank: '국민은행', balance: 380, color: '#ffbc00' },
  { bank: '하나은행', balance: 520, color: '#009490' },
  { bank: '기업은행', balance: 490, color: '#0069af' },
];

export default function CashStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="총 가용 자금" value="₩18.4억" trend="+15.2%" icon={Wallet} delay={0.1} />
        <StatCard label="당월 입금액" value="₩7.2억" trend="+8.4%" icon={ArrowUpCircle} delay={0.2} />
        <StatCard label="당월 출금액" value="₩5.1억" trend="-2.1%" icon={ArrowDownCircle} delay={0.3} />
        <StatCard label="차입금 상환액" value="₩0.8억" trend="-12.5%" icon={Landmark} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="자산 및 부채 관리 추이" description="원자재 매입 자금 및 차입금 상환 일정 모니터링" />
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyCashData}>
                <defs>
                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(v) => `₩${v}M`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="cash" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCash)" name="가용 자금" />
                <Area type="monotone" dataKey="debt" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" name="부채 현황" />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="주요 은행별 잔액" badge="Live" />
          <div className="space-y-6 mt-8">
            {bankBalances.map((item) => (
              <div key={item.bank} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{item.bank}</span>
                  <span className="text-sm font-bold text-white">₩{item.balance}M</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.balance / 600) * 100}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">자금 단기 변동 알림</h4>
            <p className="text-sm text-slate-400">내일(14일) 원자재(Resin) 매입 자금 ₩1.2억 집행 예정입니다.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
