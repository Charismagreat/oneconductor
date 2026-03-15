"use client";

import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertCircle, 
  FileSignature, 
  Target,
  ChevronRight,
  Zap,
  Star,
  Activity,
  Award,
  Bell,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b dark:border-slate-800 border-slate-100 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full w-fit">
            <Star className="w-3.5 h-3.5 fill-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Employee Workspace</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            안녕하세요, <br className="md:hidden" />
            <span className="text-blue-600 dark:text-blue-500">원컨덕터</span> 임직원님 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold ml-1">
            오늘 처리해야 할 주요 업무와 일정 현황을 알려드립니다.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900/50 p-1.5 rounded-2xl border dark:border-slate-800 border-slate-200 shadow-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
          <div className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center gap-2 relative z-10 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            출근 정상 (08:52)
          </div>
        </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI Widget */}
        <div className="lg:col-span-2 group dark:bg-[#0B1120] bg-white rounded-[2.5rem] border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 flex flex-col justify-between min-h-[220px] transition-all hover:scale-[1.01] hover:shadow-blue-500/5">
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <Target className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Personal KPI</span>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black">
                  전월 대비 +12%
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex items-end gap-2">
                   <h3 className="text-5xl font-black text-slate-900 dark:text-white">78%</h3>
                   <span className="text-sm font-bold text-slate-400 mb-2">/ 100%</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border dark:border-slate-700 p-0.5">
                   <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.4)]" style={{ width: "78%" }} />
                </div>
             </div>
          </div>
          <div className="flex items-center justify-between mt-4">
             <p className="text-xs font-bold text-slate-500">목표: 100건 중 78건 완수</p>
             <button className="text-[10px] font-black underline decoration-slate-300 hover:decoration-blue-500 transition-all">상세보기</button>
          </div>
        </div>

        {/* Attendance Widget */}
        <div className="dark:bg-[#0B1120] bg-white rounded-[2.5rem] border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-orange-500/5">
          <div className="space-y-4">
             <div className="p-2 bg-orange-500/10 rounded-xl w-fit">
                <Calendar className="w-5 h-5 text-orange-500" />
             </div>
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Leave</span>
                <div className="flex items-baseline gap-1">
                   <h3 className="text-4xl font-black text-slate-900 dark:text-white">4.5</h3>
                   <span className="text-sm font-bold text-slate-400">Days left</span>
                </div>
             </div>
          </div>
          <p className="text-xs font-bold text-slate-500 mt-6 pt-4 border-t dark:border-slate-800 border-slate-100">총 15일 중 10.5일 사용</p>
        </div>

        {/* Overtime Widget */}
        <div className="dark:bg-[#0B1120] bg-white rounded-[2.5rem] border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-violet-500/5">
          <div className="space-y-4">
             <div className="p-2 bg-violet-500/10 rounded-xl w-fit">
                <Clock className="w-5 h-5 text-violet-500" />
             </div>
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Overtime</span>
                <div className="flex items-baseline gap-1">
                   <h3 className="text-4xl font-black text-slate-900 dark:text-white">12</h3>
                   <span className="text-sm font-bold text-slate-400">Hours</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500 mt-6 pt-4 border-t dark:border-slate-800 border-slate-100">
             <Zap className="w-3.5 h-3.5" />
             주 52시간 준수 중
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Tasks */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-extrabold dark:text-white flex items-center gap-3">
                 <div className="w-2 h-7 bg-blue-600 rounded-full" />
                 오늘의 핵심 업무
                 <span className="text-xs bg-blue-500 text-white px-2.5 py-0.5 rounded-full">3</span>
              </h2>
              <button className="text-xs font-bold text-slate-500 hover:text-blue-500 transition-colors uppercase tracking-widest flex items-center gap-1">
                 View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
           </div>

           <div className="space-y-4">
             {[
               { title: "A설비 부품 발주 품의서 결재", desc: "생산팀 이대리 기안", type: "긴급", color: "rose", icon: FileSignature },
               { title: "외주 가공품 입고 검수 리뷰", desc: "오후 2시 물류센터 입고 건", type: "대기", color: "blue", icon: AlertCircle },
               { title: "주간 업무 보고서 작성", desc: "금요일 오후 5시 마감", type: "일반", color: "slate", icon: Calendar }
             ].map((task, idx) => (
               <div key={idx} className="group p-6 bg-white dark:bg-[#0B1120] rounded-[2rem] border dark:border-slate-800 border-slate-200 shadow-sm hover:shadow-xl transition-all flex items-center justify-between cursor-pointer active:scale-[0.99]">
                 <div className="flex items-center gap-6">
                    <div className={cn("p-4 rounded-2xl transition-colors", 
                      task.color === "rose" ? "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" : 
                      task.color === "blue" ? "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" : 
                      "bg-slate-500/10 text-slate-500 group-hover:bg-slate-500 group-hover:text-white")}>
                       <task.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{task.title}</h4>
                       <p className="text-xs font-bold text-slate-500">{task.desc}</p>
                    </div>
                 </div>
                 <div className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all group-hover:scale-110",
                   task.color === "rose" ? "bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900" :
                   task.color === "blue" ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900" :
                   "bg-slate-50 dark:bg-slate-900/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-900")}>
                    {task.type}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Notifications Sidebar */}
        <div className="space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-extrabold dark:text-white flex items-center gap-3">
                 <Bell className="w-6 h-6 text-slate-400" />
                 스마트 알림
              </h2>
           </div>

           <div className="dark:bg-[#0B1120] bg-white rounded-[2.5rem] border dark:border-slate-800 border-slate-200 shadow-xl p-8 space-y-8 relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                {[
                  { title: "품질 이상 발생", time: "10 Min ago", body: "사출 2호기 온도 편차 허용치 초과.", type: "alert" },
                  { title: "결재 완료", time: "1 Hour ago", body: "연차 신청서가 승인되었습니다.", type: "info" }
                ].map((note, idx) => (
                  <div key={idx} className="flex gap-5 group cursor-pointer">
                    <div className={cn("w-1.5 rounded-full h-auto transition-all group-hover:h-12", note.type === "alert" ? "bg-rose-500" : "bg-blue-500")} />
                    <div className="space-y-2">
                       <div className="flex items-center justify-between gap-4">
                          <span className={cn("text-[10px] font-black uppercase tracking-widest", note.type === "alert" ? "text-rose-500" : "text-blue-500")}>
                             {note.title}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{note.time}</span>
                       </div>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-500 transition-colors">
                          {note.body}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-4 mt-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border dark:border-slate-800 border-slate-100">
                Show All Notifications
              </button>
              
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                 <Bell className="w-32 h-32" />
              </div>
           </div>

           {/* Quick Link Card */}
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
              <div className="relative z-10 space-y-4">
                 <div className="p-3 bg-white/10 rounded-2xl w-fit backdrop-blur-md">
                    <Award className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-black leading-tight">
                    성과 공유회 <br />
                    우수 부서 선정 결과
                 </h3>
                 <div className="flex items-center gap-2 text-xs font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    Check Details <ArrowUpRight className="w-4 h-4" />
                 </div>
              </div>
              <Activity className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
           </div>
        </div>
      </div>
    </div>
  );
}
