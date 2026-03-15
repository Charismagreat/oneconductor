"use client";

import React from "react";
import { 
  TrendingUp, 
  Factory, 
  Package, 
  ShieldCheck, 
  Wallet,
  ChevronRight
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data
const cashFlowData = [
  { name: '10월', income: 4500, expense: 3800 },
  { name: '11월', income: 5200, expense: 4100 },
  { name: '12월', income: 4800, expense: 4500 },
  { name: '1월', income: 6100, expense: 4200 },
  { name: '2월', income: 5900, expense: 4800 },
  { name: '3월', income: 7200, expense: 5100 },
];

const salesByProduct = [
  { name: 'PE 볼밸브', value: 45 },
  { name: 'EF 이음관', value: 35 },
  { name: 'HF 이음관', value: 20 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];

const productionData = [
  { name: '사출1호', volume: 85 },
  { name: '사출2호', volume: 92 },
  { name: '조립라인', volume: 78 },
  { name: '기밀테스트', volume: 95 },
];

export default function OverviewPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "당월 가용 자금", value: "₩12.4억", trend: "+5.2%", color: "blue", icon: Wallet },
          { label: "실시간 매출액", value: "₩8.7억", trend: "+12.8%", color: "emerald", icon: TrendingUp },
          { label: "평균 가동률", value: "88.4%", trend: "+2.1%", color: "purple", icon: Factory },
          { label: "품질 합격률", value: "99.8%", trend: "+0.1%", color: "pink", icon: ShieldCheck },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 rounded-3xl relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all`}>
              <kpi.icon size={80} />
            </div>
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-outfit">{kpi.value}</span>
                  <span className={cn(
                    "text-xs font-bold mt-1 inline-flex items-center",
                    kpi.trend.startsWith('+') ? "text-emerald-400" : "text-red-400"
                  )}>
                     {kpi.trend} <span className="text-slate-500 font-medium ml-1">vs 전월</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-8 rounded-3xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight">자금 흐름 추이</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">최근 6개월 수입/지출 모니터링</p>
            </div>
            <select className="bg-slate-900/50 border border-white/10 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>2026년 상반기</option>
              <option>2025년 하반기</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(val) => `₩${val}M`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" name="수입" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" name="지출" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl flex flex-col"
        >
          <h3 className="text-xl font-bold tracking-tight mb-8">제품군별 매출 비중</h3>
          <div className="h-[250px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByProduct}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesByProduct.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {salesByProduct.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                   <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-8 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">실시간 생산 현황</h3>
            <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 uppercase tracking-widest">Live</span>
          </div>
          <div className="space-y-6">
            {productionData.map((line) => (
              <div key={line.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300 font-medium">{line.name}</span>
                  <span className="font-bold text-blue-400">{line.volume}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${line.volume}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-8 rounded-3xl"
        >
          <h3 className="text-xl font-bold tracking-tight mb-6">주요 이슈 실시간 알림</h3>
          <div className="space-y-4">
            {[
              { type: "warning", msg: "사출 2호기 필터 교체 주기 3일 전", time: "12분 전" },
              { type: "danger", msg: "수출용 볼밸브 50A 재고 부족 경고", time: "45분 전" },
              { type: "success", msg: "베트남 신규 바이어 계약 완료 (₩4.2억)", time: "1시간 전" },
              { type: "info", msg: "품질보증팀 주간 정기 보고서 업로드됨", time: "3시간 전" },
            ].map((notice, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 border border-white/5 hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <div className={cn(
                  "mt-1 w-2 h-2 rounded-full ring-4",
                  notice.type === "warning" && "bg-amber-500 ring-amber-500/10",
                  notice.type === "danger" && "bg-red-500 ring-red-500/10",
                  notice.type === "success" && "bg-emerald-500 ring-emerald-500/10",
                  notice.type === "info" && "bg-blue-500 ring-blue-500/10",
                )}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">{notice.msg}</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">{notice.time}</span>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
