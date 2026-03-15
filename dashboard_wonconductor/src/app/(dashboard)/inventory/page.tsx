"use client";

import React from "react";
import { Package, Inbox, AlertTriangle, Truck, Layers } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const inventoryByProduct = [
  { item: '볼밸브 50A', stock: 1200, min: 200, status: 'safe' },
  { item: '볼밸브 100A', stock: 150, min: 300, status: 'warning' },
  { item: 'EF 이음관 25A', stock: 4500, min: 800, status: 'safe' },
  { item: 'EF 이음관 63A', stock: 2100, min: 500, status: 'safe' },
  { item: 'HF 이음관 (Full)', stock: 500, min: 1000, status: 'danger' },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'];

export default function InventoryStatusPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="총 재고 가치" value="₩24.8억" trend="+2.4%" icon={Package} delay={0.1} />
        <StatCard label="부족 품목 수" value="12건" trend="+3건" icon={AlertTriangle} delay={0.2} />
        <StatCard label="완제품 재고" value="18,420개" trend="+4.5%" icon={Inbox} delay={0.3} />
        <StatCard label="원자재 잔량" value="48.2톤" trend="-1.2%" icon={Layers} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="주요 품목별 재고 현황" description="실시간 재고량 및 적정 재고 비교" />
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryByProduct} margin={{ bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="item" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} 
                />
                <Bar dataKey="stock" barSize={35}>
                  {inventoryByProduct.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.status === 'danger' ? '#ef4444' : entry.status === 'warning' ? '#f59e0b' : '#3b82f6'} />
                  ))}
                </Bar>
                <Bar dataKey="min" barSize={10} fill="#1e293b" name="적정 재고" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="입출고 예정 현황" icon={Truck} />
          <div className="space-y-5 mt-8">
            {[
              { type: 'IN', title: 'PE Resin (HDPE)', amount: '12.0톤', time: '오늘 16:00', status: 'ready' },
              { type: 'OUT', title: '수출 선적 (베트남)', amount: '3,500개', time: '내일 09:00', status: 'pending' },
              { type: 'IN', title: 'EF 이음관 사출용 금형', amount: '2SET', time: '3월 15일', status: 'pending' },
              { type: 'OUT', title: '내수 출하 (강원도시가스)', amount: '820개', time: '3월 16일', status: 'pending' },
            ].map((ship, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-lg",
                  ship.type === 'IN' ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                )}>
                  {ship.type}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-200 truncate">{ship.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500 font-medium">{ship.time}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="text-[10px] text-blue-400 font-bold">{ship.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="glass-card p-8 rounded-3xl mb-12">
        <SectionHeader title="장기 미출고 재고 (Slow-moving)" badge="Alert" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            { name: '볼밸브 200A (구형)', stock: 45, value: '₩1.2억', period: '180일+', risk: 'High' },
            { name: 'HF 특수 이음관', stock: 120, value: '₩0.4억', period: '120일+', risk: 'Medium' },
            { name: '수출 취소분 (A사)', stock: 320, value: '₩0.9억', period: '90일+', risk: 'Medium' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-slate-200">{item.name}</span>
                <span className="text-[10px] font-black text-red-500 uppercase">{item.risk} Risk</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500">재고 수량</span>
                  <span className="text-white font-bold">{item.stock}개</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500">자산 가치</span>
                  <span className="text-white font-bold">{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
