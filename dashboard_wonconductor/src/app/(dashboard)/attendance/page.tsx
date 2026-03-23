"use client";

import React, { useState } from "react";
import { 
  Users, 
  Clock, 
  Flame, 
  Calendar, 
  HeartPulse,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock3,
  MapPin,
  Plane,
  XCircle,
  Building2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import { StatCard, SectionHeader } from "@/components/dashboard/DashboardUI";
import { cn } from "@/lib/utils";

// 기존 부서별 통계 데이터
const departmentHeadcounts = [
  { dept: '생산부문', present: 11, total: 11 },
  { dept: '경영지원/관리', present: 6, total: 6 },
  { dept: '연구소/MES', present: 4, total: 4 },
  { dept: '영업/마케팅', present: 2, total: 3 },
  { dept: '트레이딩/자재', present: 4, total: 4 },
  { dept: '학생/실습생', present: 4, total: 4 },
];

const overtimeStats = [
  { name: '월', hours: 42 },
  { name: '화', hours: 38 },
  { name: '수', hours: 55 },
  { name: '목', hours: 48 },
  { name: '금', hours: 25 },
];

// 직원 데이터 정의
const employees = [
  { id: 1, dept: "대표이사", team: "대표이사", rank: "대표이사", name: "지상현", status: "정상출근", time: "08:42" },
  { id: 2, dept: "이사", team: "이사", rank: "이사", name: "김태정", status: "정상출근", time: "08:50" },
  { id: 3, dept: "경영지원", team: "경영지원팀", rank: "과장", name: "박정옥", status: "정상출근", time: "08:35" },
  { id: 4, dept: "경영지원", team: "경영지원팀", rank: "과장", name: "안순애", status: "정상출근", time: "08:45" },
  { id: 5, dept: "경영지원", team: "경영지원팀", rank: "사원", name: "박덕재", status: "외근", time: "09:30" },
  { id: 6, dept: "MES/전산", team: "MES/전산팀", rank: "과장", name: "노광훈", status: "정상출근", time: "08:20" },
  { id: 7, dept: "마케팅", team: "마케팅팀", rank: "팀장", name: "정진영", status: "정상출근", time: "08:55" },
  { id: 8, dept: "연구소", team: "연구소", rank: "소장", name: "임용주", status: "정상출근", time: "08:40" },
  { id: 9, dept: "연구소", team: "연구소", rank: "연구원", name: "김승민", status: "정상출근", time: "08:48" },
  { id: 10, dept: "연구소", team: "연구소", rank: "연구원", name: "유대연", status: "정상출근", time: "08:52" },
  { id: 11, dept: "품질", team: "품질팀", rank: "팀장", name: "이준용", status: "정상출근", time: "08:30" },
  { id: 12, dept: "영업", team: "1팀 케이블팀", rank: "팀장", name: "지구영", status: "외근", time: "10:15" },
  { id: 13, dept: "영업", team: "3팀 영업지원팀", rank: "사원", name: "명지수", status: "정상출근", time: "08:58" },
  { id: 14, dept: "생산", team: "생산총괄팀", rank: "팀장", name: "정우영", status: "정상출근", time: "08:15" },
  { id: 15, dept: "생산", team: "생산1팀", rank: "부장", name: "김동완", status: "정상출근", time: "07:50" },
  { id: 16, dept: "생산", team: "생산1팀", rank: "주임", name: "강명주", status: "정상출근", time: "07:55" },
  { id: 17, dept: "생산", team: "생산1팀", rank: "사원", name: "솔리킨", status: "정상출근", time: "08:00" },
  { id: 18, dept: "생산", team: "생산1팀", rank: "사원", name: "리안또", status: "정상출근", time: "08:02" },
  { id: 19, dept: "생산", team: "생산1팀", rank: "사원", name: "레자", status: "연차", time: "-" },
  { id: 20, dept: "생산", team: "생산2팀", rank: "반장", name: "이광희", status: "정상출근", time: "08:05" },
  { id: 21, dept: "생산", team: "생산2팀", rank: "사원", name: "샤림", status: "정상출근", time: "08:08" },
  { id: 22, dept: "생산", team: "생산2팀", rank: "사원", name: "하빕", status: "정상출근", time: "08:10" },
  { id: 23, dept: "생산", team: "생산3팀", rank: "사원", name: "작완", status: "정상출근", time: "08:12" },
  { id: 24, dept: "생산", team: "생산3팀", rank: "사원", name: "김민영", status: "정상출근", time: "08:14" },
  { id: 25, dept: "일학습병행", team: "3학년", rank: "학생", name: "강지민", status: "정상출근", time: "08:40" },
  { id: 26, dept: "일학습병행", team: "3학년", rank: "학생", name: "이상찬", status: "정상출근", time: "08:42" },
  { id: 27, dept: "대학교실습생", team: "3학년", rank: "학생", name: "김민재", status: "정상출근", time: "08:45" },
  { id: 28, dept: "대학교실습생", team: "3학년", rank: "학생", name: "변민희", status: "정상출근", time: "08:47" },
  { id: 29, dept: "트레이딩", team: "경영지원팀", rank: "과장", name: "최창숙", status: "정상출근", time: "08:40" },
  { id: 30, dept: "트레이딩", team: "자재팀", rank: "팀장", name: "홍종현", status: "정상출근", time: "08:35" },
  { id: 31, dept: "트레이딩", team: "무역팀", rank: "팀장", name: "백재우", status: "출장", time: "09:00" },
  { id: 32, dept: "트레이딩", team: "무역팀", rank: "팀장", name: "이주용", status: "정상출근", time: "08:50" }
];

const statusStyles: Record<string, { color: string, icon: any }> = {
  "정상출근": { color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle2 },
  "외근": { color: "text-blue-400 bg-blue-500/10", icon: MapPin },
  "출장": { color: "text-purple-400 bg-purple-500/10", icon: Plane },
  "연차": { color: "text-rose-400 bg-rose-500/10", icon: XCircle },
  "조퇴": { color: "text-amber-400 bg-amber-500/10", icon: Clock3 },
};

export default function AttendanceStatusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("전체");

  const depts = ["전체", ...new Set(employees.map(e => e.dept))];

  const filteredEmployees = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "전체" || e.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="전사 출근율" value="96.8%" trend="+0.6%" icon={Users} delay={0.1} />
        <StatCard label="현재 근무 인원" value={`${employees.filter(e => ["정상출근", "외근", "출장"].includes(e.status)).length}명 / ${employees.length}명`} trend="실시간" icon={Flame} delay={0.2} />
        <StatCard label="외근/출장자" value={`${employees.filter(e => ["외근", "출장"].includes(e.status)).length}명`} trend="보고완료" icon={MapPin} delay={0.3} />
        <StatCard label="부재자 (휴가 등)" value={`${employees.filter(e => e.status === "연차").length}명`} trend="계획됨" icon={Clock} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 부서별 현황 차트 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xl:col-span-1 glass-card p-8 rounded-3xl flex flex-col"
        >
          <SectionHeader title="부서별 실시간 현황" description="부문별 인원 가동 상태" badge="Summary" />
          <div className="space-y-4 mt-8 flex-1">
            {departmentHeadcounts.map((dept, i) => (
              <div key={dept.dept} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3 group hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-200 text-sm">{dept.dept}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{dept.present}명 근무 중</span>
                  </div>
                  <span className="text-xl font-black font-outfit text-white">
                    {Math.round((dept.present / dept.total) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(dept.present / dept.total) * 100}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      dept.present === dept.total ? "bg-emerald-500" : "bg-blue-500"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">근태 구분 상세</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(statusStyles).map(([status, style]) => {
                const count = employees.filter(e => e.status === status).length;
                const Icon = style.icon;
                return (count > 0 && (
                  <div key={status} className={cn("p-3 rounded-xl flex items-center justify-between", style.color)}>
                    <div className="flex items-center gap-2">
                      <Icon size={14} />
                      <span className="text-[11px] font-bold">{status}</span>
                    </div>
                    <span className="text-sm font-black">{count}</span>
                  </div>
                ));
              })}
            </div>
          </div>
        </motion.div>

        {/* 직원별 리스트 섹션 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 glass-card p-8 rounded-3xl flex flex-col"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <SectionHeader title="직원별 근태 현황" description="전사 임직원 실시간 상태 조회" badge="Detail" />
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="직원명 또는 팀명 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="relative">
                <select 
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
                >
                  {depts.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto max-h-[700px] custom-scrollbar pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredEmployees.map((emp, i) => {
                  const style = statusStyles[emp.status] || { color: "text-slate-400 bg-white/5", icon: Clock };
                  const Icon = style.icon;
                  
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.02 }}
                      key={emp.id}
                      className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} className="text-slate-400" />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 border border-blue-500/10 font-black text-sm">
                          {emp.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white truncate">{emp.name}</h4>
                            <span className="text-[10px] font-black text-slate-500 bg-white/5 px-2 py-0.5 rounded uppercase">
                              {emp.rank}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                            <Building2 size={12} className="text-slate-600" />
                            {emp.dept} {emp.team}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black shadow-lg shadow-black/20", style.color)}>
                            <Icon size={12} />
                            {emp.status}
                          </div>
                          <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-bold text-slate-500">
                            <Clock3 size={10} />
                            {emp.time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
