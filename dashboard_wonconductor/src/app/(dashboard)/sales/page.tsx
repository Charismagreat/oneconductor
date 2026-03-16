"use client";

import React from "react";
import { TrendingUp, Globe, ShoppingCart, Target, Award, Download, FileSpreadsheet, Activity, Lightbulb, MessageSquare } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend, LineChart, Line, LabelList, AreaChart, Area
} from 'recharts';
import { motion } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

const customerAchievement = [
  { name: '대한전선', target: 36.0, achieved: 20.7, rate: 57.5 },
  { name: '현대일렉트릭', target: 10.0, achieved: 0, rate: 0 },
  { name: '일진전기', target: 5.0, achieved: 2.0, rate: 40.0 },
  { name: '광명전기', target: 5.0, achieved: 0, rate: 0 },
  { name: '선도전기', target: 0.1, achieved: 3.7, rate: 100 }, // 목표 0은 계산 위해 최소값 설정
  { name: 'LS전선', target: 2.5, achieved: 0.6, rate: 24.0 },
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard label="당월 누적 매출" value="₩8.74억" trend="+12.8%" icon={TrendingUp} delay={0.1} />
        <StatCard label="올해 누적 매출" value="₩104.5억" trend="+18.2%" icon={Award} delay={0.2} />
        <StatCard label="올해 매출 목표" value="₩126.8억" trend="+15.5%" comparison="vs 전년 매출" icon={Target} delay={0.3} />
        <StatCard label="목표 달성률" value="82.4%" trend="+4.2%" icon={TrendingUp} delay={0.4} />
        <StatCard label="신규 수주(건수/금액)" value="42건 / ₩1.8억" trend="+15.0%" icon={ShoppingCart} delay={0.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl"
        >
          <SectionHeader title="주요 업체별 매출 목표 달성 현황" description="대형 고객사별 연간 목표 대비 실적 분석 (단위: 억원)" />
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerAchievement} layout="vertical" margin={{ left: 30, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} width={100} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                <Bar dataKey="target" name="매출목표" fill="#1e293b" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="achieved" name="달성액" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12}>
                  {customerAchievement.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate >= 50 ? '#10b981' : entry.rate > 0 ? '#3b82f6' : '#ef4444'} />
                  ))}
                  <LabelList 
                    dataKey="rate" 
                    position="right" 
                    formatter={(val: any) => `${val === 100 && customerAchievement.find(c => c.rate === val)?.target === 0.1 ? '초과달성' : val + '%'}`}
                    style={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} 
                  />
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

      <div className="glass-card p-8 rounded-3xl">
        <SectionHeader 
          title="주요 거래처 연도별 매출 현황" 
          description="업체별/연도별 월간 매출 추이 및 연간 합계 분석 (단위: 천원)" 
          action={
            <button 
              onClick={() => {
                const header = "업체명,연도,연간합계,1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월\n";
                const rows = yearlySalesData.map(r => 
                  `${r.name},${r.year},${r.total},${r.monthly.join(",")}`
                ).join("\n");
                const blob = new Blob(["\ufeff" + header + rows], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", `주요_거래처_매출_현황_${new Date().toLocaleDateString()}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              <FileSpreadsheet size={16} />
              엑셀 다운로드
            </button>
          }
        />

        {/* 차트 시각화 영역 */}
        <div className="space-y-10">
          {/* 상단 메인 차트 2개 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Seasonality Chart */}
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 shadow-inner">
              <h4 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-400" />
                주요 업체별 평균 매출 추이 (최근 5년 평균, 단위: 백만원)
              </h4>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={averageTrendData}>
                    <defs>
                      <linearGradient id="colorDH" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorIJ" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorLS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorLSE" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorSD" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorGM" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 10 }} 
                      tickFormatter={(v) => `${(v/1000).toLocaleString()}`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '11px' }}
                      formatter={(v: any) => [`${(Number(v)/1000).toFixed(1)} 백만원`, ""]}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '15px' }} />
                    <Area type="monotone" name="대한전선" dataKey="대한전선" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDH)" strokeWidth={2} />
                    <Area type="monotone" name="일진전기" dataKey="일진전기" stroke="#10b981" fillOpacity={1} fill="url(#colorIJ)" strokeWidth={2} />
                    <Area type="monotone" name="LS전선" dataKey="LS전선" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorLS)" strokeWidth={2} />
                    <Area type="monotone" name="LSEVK" dataKey="LSEVK" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLSE)" strokeWidth={2} />
                    <Area type="monotone" name="선도전기" dataKey="선도전기" stroke="#f43f5e" fillOpacity={1} fill="url(#colorSD)" strokeWidth={2} />
                    <Area type="monotone" name="광명전기" dataKey="광명전기" stroke="#06b6d4" fillOpacity={1} fill="url(#colorGM)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total 2025 Compare Chart */}
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 shadow-inner border-emerald-500/10">
              <h4 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500" />
                주요 업체 전체 2025년도 월별 매출 추이 (목표 vs 실적)
              </h4>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sales2025CompareData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={(v) => `${(v/10000).toFixed(0)}억`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                      formatter={(value: any) => [Number(value).toLocaleString() + "천원", ""]}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" name="전체 실적 합계" dataKey="actual" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} />
                    <Line type="monotone" name="전체 목표 합계" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#10b981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 업체별 개별 2025 차트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {individualCompanyData.map((company) => (
              <div key={company.name} className="p-5 bg-slate-900/30 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h5 className="text-xs font-bold text-slate-400 mb-4 flex items-center justify-between">
                  <span>{company.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">2025 목표 vs 실적</span>
                </h5>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={company.data}>
                      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="month" hide />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                        formatter={(v: any) => [Number(v).toLocaleString(), ""]}
                      />
                      <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} dot={false} name="실적" />
                      <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="3 3" dot={false} name="목표" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-[11px] border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-tighter">
                <th className="py-3 px-2 sticky left-0 bg-[#0F172A] z-10 w-24">업체명</th>
                <th className="py-3 px-2 w-16">연도</th>
                <th className="py-3 px-2 text-right text-blue-400 w-24">연간합계</th>
                {Array.from({ length: 12 }).map((_, i) => (
                  <th key={i} className="py-3 px-1 text-right w-16">{i + 1}월</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {yearlySalesData.map((row, i) => {
                const isAverage = row.year === "평균매출";
                const isNewCustomer = i > 0 && yearlySalesData[i-1].name !== row.name;
                
                return (
                  <tr 
                    key={`${row.name}-${row.year}`} 
                    className={cn(
                      "hover:bg-white/5 transition-colors",
                      isAverage ? "bg-blue-500/5 font-bold" : "",
                      isNewCustomer ? "border-t-2 border-white/10" : ""
                    )}
                  >
                    <td className={cn(
                      "py-2.5 px-2 sticky left-0 z-10 font-bold",
                      isAverage ? "text-blue-400 bg-blue-900/20" : "text-slate-300 bg-[#0F172A]",
                      i > 0 && yearlySalesData[i-1].name === row.name ? "text-transparent opacity-0" : ""
                    )}>
                      {row.name}
                    </td>
                    <td className={cn(
                      "py-2.5 px-2",
                      isAverage ? "text-blue-400" : "text-slate-500"
                    )}>{row.year}</td>
                    <td className={cn(
                      "py-2.5 px-2 text-right font-black",
                      isAverage ? "text-blue-400" : "text-slate-200"
                    )}>
                      {row.total.toLocaleString()}
                    </td>
                    {row.monthly.map((val, idx) => (
                      <td 
                        key={idx} 
                        className={cn(
                          "py-2.5 px-1 text-right",
                          isAverage ? "text-blue-400/80" : "text-slate-400",
                          val === 0 ? "opacity-20" : ""
                        )}
                      >
                        {val === 0 ? "-" : val.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 고객사별 동향 및 대응 방안 섹션 */}
        <div className="mt-16 space-y-8">
          <SectionHeader 
            title="고객사별 주요 동향 및 전략적 대응 방안" 
            description="주요 고객사의 발주 추이 분석 및 실무 대응 프로세스"
          />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {customerInsights.map((insight) => (
              <div key={insight.name} className="flex flex-col bg-slate-950/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-xl">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-transparent border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                      <MessageSquare size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{insight.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-6 flex-1 text-[11px]">
                  {/* 동향 (Trends) */}
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">
                      <Activity size={14} /> 주요 동향
                    </h4>
                    <ul className="space-y-3">
                      {insight.trends.map((item, idx) => (
                        <li key={idx} className={cn(
                          "leading-relaxed",
                          item.startsWith("※") ? "text-slate-500 italic" : "text-slate-300"
                        )}>
                          <span className="inline-block w-1 h-1 bg-blue-500/40 rounded-full mr-2 mb-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 대응방안 (Countermeasures) */}
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4">
                      <Lightbulb size={14} /> 대응 방안
                    </h4>
                    <ul className="space-y-3">
                      {insight.countermeasures.map((item, idx) => (
                        <li key={idx} className={cn(
                          "leading-relaxed",
                          item.startsWith("->") ? "text-slate-400 pl-3 border-l-2 border-white/5 ml-1" : "text-slate-200"
                        )}>
                          {!item.startsWith("->") && <span className="inline-block w-1 h-1 bg-emerald-500/40 rounded-full mr-2 mb-0.5" />}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const averageTrendData = [
  { month: '1월', '대한전선': 138745, '일진전기': 25309, 'LS전선': 20085, 'LSEVK': 14700, '선도전기': 2217, '광명전기': 2937 },
  { month: '2월', '대한전선': 220663, '일진전기': 33401, 'LS전선': 1655, 'LSEVK': 17951, '선도전기': 8586, '광명전기': 15086 },
  { month: '3월', '대한전선': 276197, '일진전기': 28815, 'LS전선': 7306, 'LSEVK': 14567, '선도전기': 1606, '광명전기': 273 },
  { month: '4월', '대한전선': 237871, '일진전기': 59540, 'LS전선': 3896, 'LSEVK': 20370, '선도전기': 1819, '광명전기': 3803 },
  { month: '5월', '대한전선': 182103, '일진전기': 27786, 'LS전선': 2899, 'LSEVK': 24256, '선도전기': 4981, '광명전기': 66349 },
  { month: '6월', '대한전선': 158514, '일진전기': 50436, 'LS전선': 7759, 'LSEVK': 46536, '선도전기': 24038, '광명전기': 10500 },
  { month: '7월', '대한전선': 229684, '일진전기': 25486, 'LS전선': 1143, 'LSEVK': 21967, '선도전기': 917, '광명전기': 10822 },
  { month: '8월', '대한전선': 219317, '일진전기': 19413, 'LS전선': 7560, 'LSEVK': 8048, '선도전기': 18053, '광명전기': 1290 },
  { month: '9월', '대한전선': 174352, '일진전기': 32514, 'LS전선': 7088, 'LSEVK': 10175, '선도전기': 16478, '광명전기': 12955 },
  { month: '10월', '대한전선': 172594, '일진전기': 17698, 'LS전선': 3526, 'LSEVK': 8202, '선도전기': 5974, '광명전기': 3331 },
  { month: '11월', '대한전선': 139827, '일진전기': 19307, 'LS전선': 1138, 'LSEVK': 19745, '선도전기': 195, '광명전기': 31076 },
  { month: '12월', '대한전선': 148754, '일진전기': 16106, 'LS전선': 4504, 'LSEVK': 21587, '선도전기': 0, '광명전기': 0 },
];

const sales2025CompareData = [
  { month: '1월', actual: 213878, target: 209000 },
  { month: '2월', actual: 388092, target: 389000 },
  { month: '3월', actual: 319660, target: 444000 },
  { month: '4월', actual: 495013, target: 544000 },
  { month: '5월', actual: 382870, target: 514000 },
  { month: '6월', actual: 340413, target: 594000 },
  { month: '7월', actual: 265895, target: 585000 },
  { month: '8월', actual: 263502, target: 465000 },
  { month: '9월', actual: 242300, target: 439000 },
  { month: '10월', actual: 21967, target: 429000 },
  { month: '11월', actual: 0, target: 429000 },
  { month: '12월', actual: 0, target: 259000 },
];

const individualCompanyData = [
  {
    name: "대한전선",
    data: [
      { month: '1월', actual: 160932, target: 150000 }, { month: '2월', actual: 316609, target: 300000 }, { month: '3월', actual: 241776, target: 300000 },
      { month: '4월', actual: 437356, target: 400000 }, { month: '5월', actual: 326354, target: 300000 }, { month: '6월', actual: 67070, target: 400000 },
      { month: '7월', actual: 255126, target: 400000 }, { month: '8월', actual: 150067, target: 300000 }, { month: '9월', actual: 117677, target: 300000 },
      { month: '10월', actual: 0, target: 300000 }, { month: '11월', actual: 0, target: 300000 }, { month: '12월', actual: 0, target: 150000 },
    ]
  },
  {
    name: "일진전기",
    data: [
      { month: '1월', actual: 52946, target: 10000 }, { month: '2월', actual: 29299, target: 30000 }, { month: '3월', actual: 50982, target: 50000 },
      { month: '4월', actual: 57657, target: 50000 }, { month: '5월', actual: 56516, target: 50000 }, { month: '6월', actual: 132581, target: 50000 },
      { month: '7월', actual: 9809, target: 50000 }, { month: '8월', actual: 15209, target: 50000 }, { month: '9월', actual: 27456, target: 50000 },
      { month: '10월', actual: 0, target: 40000 }, { month: '11월', actual:0, target: 40000 }, { month: '12월', actual: 0, target: 30000 },
    ]
  },
  {
    name: "LS전선",
    data: [
      { month: '1월', actual: 0, target: 10000 }, { month: '2월', actual: 513, target: 10000 }, { month: '3월', actual: 26902, target: 20000 },
      { month: '4월', actual: 0, target: 20000 }, { month: '5월', actual: 0, target: 20000 }, { month: '6월', actual: 6514, target: 30000 },
      { month: '7월', actual: 450, target: 30000 }, { month: '8월', actual: 3906, target: 30000 }, { month: '9월', actual: 25500, target: 20000 },
      { month: '10월', actual: 0, target: 20000 }, { month: '11월', actual: 0, target: 20000 }, { month: '12월', actual: 0, target: 20000 },
    ]
  },
  {
    name: "LSEVK(한성)",
    data: [
      { month: '1월', actual: 0, target: 4000 }, { month: '2월', actual: 0, target: 4000 }, { month: '3월', actual: 0, target: 4000 },
      { month: '4월', actual: 0, target: 4000 }, { month: '5월', actual: 0, target: 4000 }, { month: '6월', actual: 0, target: 4000 },
      { month: '7월', actual: 0, target: 5000 }, { month: '8월', actual: 0, target: 5000 }, { month: '9월', actual: 0, target: 4000 },
      { month: '10월', actual: 0, target: 4000 }, { month: '11월', actual: 0, target: 4000 }, { month: '12월', actual: 0, target: 4000 },
    ]
  },
  {
    name: "광명전기",
    data: [
      { month: '1월', actual: 0, target: 25000 }, { month: '2월', actual: 0, target: 25000 }, { month: '3월', actual: 0, target: 50000 },
      { month: '4월', actual: 0, target: 50000 }, { month: '5월', actual: 0, target: 100000 }, { month: '6월', actual: 0, target: 70000 },
      { month: '7월', actual: 510, target: 50000 }, { month: '8월', actual: 0, target: 30000 }, { month: '9월', actual: 0, target: 25000 },
      { month: '10월', actual: 0, target: 25000 }, { month: '11월', actual: 0, target: 25000 }, { month: '12월', actual: 0, target: 25000 },
    ]
  },
  {
    name: "선도전기",
    data: [
      { month: '1월', actual: 0, target: 10000 }, { month: '2월', actual: 41671, target: 20000 }, { month: '3월', actual: 0, target: 20000 },
      { month: '4월', actual: 0, target: 20000 }, { month: '5월', actual: 0, target: 40000 }, { month: '6월', actual: 134248, target: 40000 },
      { month: '7월', actual: 0, target: 50000 }, { month: '8월', actual: 94320, target: 50000 }, { month: '9월', actual: 71667, target: 40000 },
      { month: '10월', actual: 21967, target: 40000 }, { month: '11월', actual: 0, target: 40000 }, { month: '12월', actual: 0, target: 30000 },
    ]
  }
];

const yearlySalesData = [
  // 대한전선
  { name: "대한전선", year: "2020년도", total: 909748, monthly: [23068, 174184, 79388, 60740, 67977, 76733, 53535, 76742, 73963, 103212, 73709, 46497] },
  { name: "대한전선", year: "2021년도", total: 1948238, monthly: [65036, 208862, 229540, 117009, 48277, 83785, 152170, 256428, 103049, 218453, 174428, 291201] },
  { name: "대한전선", year: "2022년도", total: 2328296, monthly: [184838, 164649, 281207, 303833, 173809, 91308, 119290, 269936, 104459, 195046, 188357, 251564] },
  { name: "대한전선", year: "2023년도", total: 2640856, monthly: [238711, 208018, 334561, 185872, 179520, 89470, 347043, 252112, 292356, 180480, 136999, 195714] },
  { name: "대한전선", year: "2024년도", total: 3891609, monthly: [159882, 251653, 490711, 322416, 296681, 542718, 450937, 310619, 354605, 338371, 265470, 107546] },
  { name: "대한전선", year: "2025년도", total: 2072967, monthly: [160932, 316609, 241776, 437356, 326354, 67070, 255126, 150067, 117677, 0, 0, 0] },
  { name: "대한전선", year: "2025년도 목표", total: 3600000, monthly: [150000, 300000, 300000, 400000, 300000, 400000, 400000, 300000, 300000, 300000, 300000, 150000] },
  { name: "대한전선", year: "평균매출", total: 2298619, monthly: [138745, 220663, 276197, 237871, 182103, 158514, 229684, 219317, 174352, 172594, 139827, 148754] },

  // 일진전기
  { name: "일진전기", year: "2020년도", total: 380149, monthly: [10719, 34600, 42072, 65779, 26492, 69518, 10709, 28684, 34472, 26984, 5873, 24247] },
  { name: "일진전기", year: "2021년도", total: 245396, monthly: [14735, 24075, 23331, 30761, 34591, 30413, 25631, 8385, 17764, 5377, 8984, 21349] },
  { name: "일진전기", year: "2022년도", total: 342688, monthly: [23634, 33523, 31252, 27816, 16892, 29522, 58579, 12148, 36367, 19076, 36832, 17047] },
  { name: "일진전기", year: "2023년도", total: 321815, monthly: [5636, 21845, 8652, 156723, 20724, 9155, 20852, 4901, 13413, 32513, 20770, 6631] },
  { name: "일진전기", year: "2024년도", total: 412349, monthly: [44184, 57063, 16598, 18506, 11501, 31424, 27335, 47149, 65610, 22238, 43380, 27361] },
  { name: "일진전기", year: "2025년도", total: 432455, monthly: [52946, 29299, 50982, 57657, 56516, 132581, 9809, 15209, 27456, 0, 0, 0] },
  { name: "일진전기", year: "2025년도 목표", total: 500000, monthly: [10000, 30000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 40000, 40000, 30000] },
  { name: "일진전기", year: "평균매출", total: 355809, monthly: [25309, 33401, 28815, 59540, 27786, 50436, 25486, 19413, 32514, 17698, 19307, 16106] },

  // LS전선
  { name: "LS전선", year: "2020년도", total: 52955, monthly: [24060, 2490, 0, 0, 0, 438, 0, 4857, 9702, 2190, 4402, 4816] },
  { name: "LS전선", year: "2021년도", total: 90008, monthly: [22500, 1947, 2149, 13115, 7916, 4104, 2846, 5783, 7326, 9592, 0, 12730] },
  { name: "LS전선", year: "2022년도", total: 106050, monthly: [48450, 0, 4980, 786, 0, 35496, 0, 0, 0, 6863, 0, 9475] },
  { name: "LS전선", year: "2023년도", total: 63961, monthly: [0, 4980, 9807, 9475, 9475, 0, 0, 27800, 0, 0, 2424, 0] },
  { name: "LS전선", year: "2024년도", total: 34586, monthly: [25500, 0, 0, 0, 0, 0, 3562, 3014, 0, 2510, 0, 0] },
  { name: "LS전선", year: "2025년도", total: 63785, monthly: [0, 513, 26902, 0, 0, 6514, 450, 3906, 25500, 0, 0, 0] },
  { name: "LS전선", year: "2025년도 목표", total: 250000, monthly: [10000, 10000, 20000, 20000, 20000, 30000, 30000, 30000, 20000, 20000, 20000, 20000] },
  { name: "LS전선", year: "평균매출", total: 68558, monthly: [20085, 1655, 7306, 3896, 2899, 7759, 1143, 7560, 7088, 3526, 1138, 4504] },

  // LSEVK(한성)
  { name: "LSEVK(한성)", year: "2020년도", total: 571883, monthly: [37254, 27772, 19235, 41249, 77413, 124999, 57384, 10149, 14397, 15544, 37225, 109262] },
  { name: "LSEVK(한성)", year: "2021년도", total: 253111, monthly: [17106, 31517, 10298, 28113, 20929, 31545, 23726, 15439, 3247, 28399, 29927, 12865] },
  { name: "LSEVK(한성)", year: "2022년도", total: 290713, monthly: [22440, 36173, 43976, 31419, 25180, 63198, 23014, 7332, 27580, 0, 10401, 0] },
  { name: "LSEVK(한성)", year: "2023년도", total: 110621, monthly: [3376, 12244, 12773, 21439, 9874, 26697, 0, 14562, 0, 5267, 3174, 1215] },
  { name: "LSEVK(한성)", year: "2024년도", total: 142294, monthly: [8023, 0, 1122, 0, 12137, 32779, 27679, 804, 15828, 0, 37744, 6178] },
  { name: "LSEVK(한성)", year: "2025년도", total: 0, monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "LSEVK(한성)", year: "2025년도 목표", total: 50000, monthly: [4000, 4000, 4000, 4000, 4000, 4000, 5000, 5000, 4000, 4000, 4000, 4000] },
  { name: "LSEVK(한성)", year: "평균매출", total: 228104, monthly: [14700, 17951, 14567, 20370, 24256, 46536, 21967, 8048, 10175, 8202, 19745, 21587] },

  // 광명전기
  { name: "광명전기", year: "2025년도 실적", total: 510, monthly: [0, 0, 0, 0, 0, 0, 510, 0, 0, 0, 0, 0] },
  { name: "광명전기", year: "2020년도", total: 185218, monthly: [0, 0, 0, 0, 99323, 0, 52282, 530, 6617, 3087, 23379, 0] },
  { name: "광명전기", year: "2021년도", total: 21047, monthly: [16887, 1145, 1637, 0, 0, 1360, 0, 0, 0, 112, 0, 0] },
  { name: "광명전기", year: "2022년도", total: 62125, monthly: [0, 2149, 0, 2277, 116543, 2022, 12142, 3390, 70560, 2986, 53600, 0] },
  { name: "광명전기", year: "2023년도", total: 345373, monthly: [735, 0, 0, 0, 0, 0, 0, 0, 0, 13800, 127294, 0] },
  { name: "광명전기", year: "2024년도", total: 336259, monthly: [0, 73521, 0, 20543, 182227, 59416, 0, 0, 552, 0, 0, 0] },
  { name: "광명전기", year: "2025년도", total: 510, monthly: [0, 0, 0, 0, 0, 0, 510, 0, 0, 0, 0, 0] },
  { name: "광명전기", year: "2025년도 목표", total: 300000, monthly: [25000, 25000, 50000, 50000, 100000, 70000, 50000, 30000, 25000, 25000, 25000, 25000] },
  { name: "광명전기", year: "평균매출", total: 158422, monthly: [2937, 15086, 273, 3803, 66349, 10500, 10822, 1290, 12955, 3331, 31076, 0] },

  // 선도전기
  { name: "선도전기", year: "2020년도", total: 21170, monthly: [4255, 9846, 0, 330, 0, 0, 330, 315, 6094, 0, 0, 0] },
  { name: "선도전기", year: "2021년도", total: 15393, monthly: [0, 0, 3379, 0, 0, 9977, 0, 0, 0, 867, 1170, 0] },
  { name: "선도전기", year: "2022년도", total: 10389, monthly: [0, 0, 0, 1334, 0, 0, 5174, 3881, 0, 0, 0, 0] },
  { name: "선도전기", year: "2023년도", total: 50538, monthly: [916, 0, 6255, 9249, 0, 0, 0, 0, 21109, 13009, 0, 0] },
  { name: "선도전기", year: "2024년도", total: 39898, monthly: [8128, 0, 0, 0, 29886, 0, 0, 1884, 0, 0, 0, 0] },
  { name: "선도전기", year: "2025년도", total: 371792, monthly: [0, 41671, 0, 0, 0, 134248, 0, 94320, 71667, 21967, 0, 0] },
  { name: "선도전기", year: "2025년도 목표", total: 400000, monthly: [10000, 20000, 20000, 20000, 40000, 40000, 50000, 50000, 40000, 40000, 40000, 30000] },
  { name: "선도전기", year: "평균매출", total: 84863, monthly: [2217, 8586, 1606, 1819, 4981, 24038, 917, 18053, 16478, 5974, 195, 0] },
];

const customerInsights = [
  {
    name: "대한전선",
    trends: [
      "2025년도 발주예상품목 미 발주 (사우디법인 슬리브, OUTER CASE 등)",
      "07~09월 간 9월 납기분(58건) 중 소량 다품종(10EA 미만)이 79% 점유 → 매출 효율 저하",
      "※ 발주형태 : 업체별 견격 비교 후 최저가 업체 낙찰",
      "※ 24년 미출하분 25년 출사로 고객사 매출 달성 시도, 협력사 실매출은 감소",
      "※ HVDC 해저케이블 개발 투자 확대 (케이블 공장 내 전용 설비 구축)",
      "※ 특정 제품 외 원자재/납품가 인상 불가 방침 고수",
      "※ 미국 출하분 원산지증명 및 전 품목 중량 데이터 요구 강화"
    ],
    countermeasures: [
      "HVDC 해저케이블용 신규 가공 품목 수주 확대 (TF팀 협의 완료/일부 진행 중)",
      "소량 다품종 발주 직렬 대응을 위한 생산 체계 고도화",
      "Benchmarking을 통한 원가 절감 및 단가 경쟁력 확보",
      "OUTER CASE 대응: 기존 금형 변형 사용 협의 (정연 ENG) 및 자재 MOQ 축소 협의 (안성메탈)",
      "품질 및 납기 준수 관리 체계 철저 유지 (주기적 모니터링)",
      "경쟁사 동향 실시간 파악 및 영업 데이터베이스(DB)화"
    ]
  },
  {
    name: "일진전기",
    trends: [
      "매출 목표 대비 극심한 수주 접수 부진 상태",
      "25년 주요 발주 예상(362KV 1P 100세트) 미발주",
      "SPACER 금구류 발주량 감소 및 단가 문제로 공급처 이원화 가속",
      "현재 매출이 과기 평균 수준의 약 25%에 불과함",
      "도체슬리브 항목만은 예년 대비 130% 수준으로 소폭 강세"
    ],
    countermeasures: [
      "구매/생산 핵심 담당자 미팅을 통한 신규 수주 품목 발굴 적극 요청",
      "고객사 인력난 대응: 에폭시 경화 후 후가공 당사 직접 수행 제안 (심훈택 주임)",
      "신규 개발 품목 견적 참여 기회 선점 및 당사 진행 품목 확대 요청",
      "362KV 1P 관련 AL RING 자재 선확보 및 물량 증량 협의",
      "170KV 3P 관련 납품 단가 인상 공식 요청 및 협의 진행"
    ]
  },
  {
    name: "LS전선",
    trends: [
      "구미: 현재 영업 활동 부재 상태, 초전도도체 상반기 테스트 중",
      "인동: CLAMP 사업부 수익성 문제로 사업 종결 확정 (재고 통보 완료)",
      "동해: 아모팟 10세트 납품 완료 및 안정적 유지"
    ],
    countermeasures: [
      "구미: 회사소개서 등 신규 자료 전달 및 부서별 담당자 네트워크 재구축",
      "인동: CLAMP 재고 협의 및 유휴 금형 반납 프로세스 완료 후 신규 품목 제안",
      "동해: 아모팟 규격 다변화 및 자기융착테이프 등 소모성 자재 추가 영업"
    ]
  }
];
