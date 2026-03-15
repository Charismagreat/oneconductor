"use client";

import React, { useState } from "react";
import { 
  Search, 
  FileText, 
  MessageSquare, 
  MoreHorizontal,
  ChevronDown,
  Plus,
  ArrowRight,
  User,
  Layout,
  Layers,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollabAppPage() {
  const [activeTab, setActiveTab] = useState("board"); // board, docs

  const tabs = [
    { id: "board", label: "프로젝트 보드" },
    { id: "docs", label: "문거 라이브러리" },
  ];

  // Dummy Kanban Data
  const columns = [
    { title: "To Do", count: 3, color: "bg-slate-500", items: [
      { id: 1, title: "1분기 생산 계획서 초안 작성", assignee: "김대리", tags: ["기획", "긴급"] },
      { id: 2, title: "B라인 부품 불량 원인 분석", assignee: "박주임", tags: ["품질"] },
      { id: 3, title: "새 안전 규정 매뉴얼 배포", assignee: "최사원", tags: ["안전"] },
    ]},
    { title: "In Progress", count: 2, color: "bg-blue-500", items: [
      { id: 4, title: "A설비 정기 유지보수 진행", assignee: "이반장", tags: ["유지보수"] },
      { id: 5, title: "협력사에 발주 요청서 송부", assignee: "정대리", tags: ["구매"] },
    ]},
    { title: "Done", count: 1, color: "bg-emerald-500", items: [
      { id: 6, title: "주간 영업 실적 취합 보고", assignee: "오차장", tags: ["영업"] },
    ]}
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 min-h-[calc(100vh-120px)] flex flex-col pb-10">
      {/* Header Section */}
      <div className="space-y-2 shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          팀 워크스페이스
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold">
          프로젝트 진행 상황을 공유하고 사내 문서를 검색하세요.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border dark:border-slate-800 border-slate-200 w-fit shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "py-3 px-8 rounded-xl text-sm font-black transition-all duration-200",
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area - Project Board (프로젝트 보드) */}
      {activeTab === "board" && (
        <div className="flex-1 flex gap-8 overflow-x-auto pb-6 hidden-scrollbar snap-x snap-mandatory min-h-0 pt-4">
          {columns.map((col, idx) => (
            <div key={idx} className="flex-shrink-0 w-96 flex flex-col gap-5 snap-center">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-6 rounded-full", col.color)} />
                  <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {col.title}
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{col.count}</span>
                  </h3>
                </div>
                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                  <MoreHorizontal className="w-5 h-5"/>
                </button>
              </div>
              
              <div className="flex flex-col gap-4 flex-1 overflow-y-auto hidden-scrollbar pr-2">
                {col.items.map(item => (
                  <div 
                    key={item.id} 
                    className="group bg-white dark:bg-[#0B1120] rounded-[2rem] border dark:border-slate-800 border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all p-6 space-y-4 cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className={cn(
                          "text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider",
                          tag === "긴급" ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" : "bg-slate-100 dark:bg-slate-800 dark:text-slate-400 text-slate-600"
                        )}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[15px] font-black leading-snug dark:text-white text-slate-900 group-hover:text-blue-500 transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between pt-4 mt-2 border-t dark:border-slate-800 border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <span className="text-[11px] font-black text-blue-500">{item.assignee[0]}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500">{item.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-[11px] font-bold">2</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Task Button */}
                <button className="group w-full py-5 flex items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed dark:border-slate-800 border-slate-200 text-slate-400 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-500 transition-all">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span className="text-sm font-black">새 업무 추가</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content Area - Doc Library (문서 라이브러리) */}
      {activeTab === "docs" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8 pt-4 flex-1 flex flex-col min-h-0">
          <div className="relative group shrink-0">
            <input 
              type="text" 
              placeholder="매뉴얼, 규약, 서식 등을 검색하세요..."
              className="w-full h-18 pl-16 pr-8 bg-white dark:bg-[#0B1120] border-2 border dark:border-slate-800 border-slate-200 text-slate-900 dark:text-white rounded-3xl outline-none transition-all shadow-xl shadow-blue-500/5 group-focus-within:border-blue-500/50 font-bold"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto hidden-scrollbar pb-8">
            {[
              { title: "안전수칙 및 재난대응 매뉴얼 (2025 개정)", body: "PDF • 관리팀 • 2.4MB", color: "blue", icon: FileText },
              { title: "연차 신청서 및 결재선 가이드", body: "DOCX • 인사팀 • 500KB", color: "emerald", icon: FileText },
              { title: "A설비 작업 표준 지침서 (SOP)", body: "PDF • 생산팀 • 1.2MB", color: "amber", icon: FileText },
              { title: "품질 관리 사내 규정 (v2.1)", body: "PDF • 품질팀 • 3.1MB", color: "rose", icon: Layers },
              { title: "금형 설계 표준 부품 데이터", body: "XLSX • 연구소 • 8.2MB", color: "violet", icon: Target }
            ].map((doc, idx) => (
              <div 
                key={idx} 
                className="group bg-white dark:bg-[#0B1120] rounded-[2.5rem] border dark:border-slate-800 border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all p-8 flex flex-col justify-between min-h-[180px] cursor-pointer"
              >
                <div className="space-y-4">
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-sm", 
                     doc.color === "blue" ? "bg-blue-500/10 text-blue-500" : 
                     doc.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" : 
                     doc.color === "amber" ? "bg-amber-500/10 text-amber-500" : 
                     doc.color === "rose" ? "bg-rose-500/10 text-rose-500" : 
                     "bg-violet-500/10 text-violet-500")}>
                      <doc.icon className="w-7 h-7" />
                   </div>
                   <h3 className="text-[16px] font-black dark:text-white text-slate-900 leading-tight group-hover:text-blue-500 transition-colors">{doc.title}</h3>
                </div>
                <div className="flex items-center justify-between pt-6 mt-4 border-t dark:border-slate-800/50 border-slate-100/50">
                   <span className="text-[11px] font-bold text-slate-400">{doc.body}</span>
                   <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
