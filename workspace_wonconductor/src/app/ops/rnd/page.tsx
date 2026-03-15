"use client";

import React, { useState } from "react";
import { 
  FileCode2, 
  FlaskConical, 
  Library,
  ChevronDown,
  Search,
  Box,
  Layout,
  Cpu,
  BookOpen,
  Sparkles,
  Plus,
  Upload,
  Calendar,
  Layers,
  CheckCircle2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RndOpsPage() {
  const [activeTab, setActiveTab] = useState("project"); // project, docs

  const tabs = [
    { id: "project", label: "프로젝트 현황" },
    { id: "docs", label: "기술 자료실" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          연구 개발
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          신차종 개발 프로젝트 진행 현황 및 사내 핵심 기술 자료를 통합 관리합니다.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border dark:border-slate-800 border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200",
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area - Project Status (프로젝트 현황) */}
      {activeTab === "project" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* Project Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "전체 프로젝트", count: 8, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "진행중", count: 5, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { label: "검토/대기", count: 3, color: "text-amber-500", bg: "bg-amber-500/10" },
            ].map((stat, idx) => (
              <div key={idx} className="dark:bg-[#0B1120] bg-white p-6 rounded-3xl border dark:border-slate-800 border-slate-200 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className={cn("text-3xl font-black", stat.color)}>{stat.count}</p>
                </div>
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <Layers className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
            ))}
          </div>

          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 border-b dark:border-slate-800 border-slate-100 flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-xl font-black dark:text-white text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  프로젝트 진행 관리
                </h2>
                <p className="text-xs font-bold text-slate-500">각 프로젝트별 마일스톤 및 이슈 사항을 업데이트합니다.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                <Plus className="w-4 h-4" />
                새 프로젝트 등록
              </button>
            </div>

            <div className="p-8 space-y-6">
              {[
                { name: "차세대 전기차 배터리 하우징 개발", progress: 75, status: "진행중", date: "2024.08 완료 목표", tags: ["EV", "Housing"] },
                { name: "고효율 방열 핀 금형 설계 고도화", progress: 40, status: "설계중", date: "2024.12 완료 목표", tags: ["Mold", "Cooling"] },
                { name: "차종 GN7 윈도우 프레임 경량화", progress: 90, status: "최종검토", date: "2024.04 완료 목표", tags: ["GN7", "L-Weight"] },
              ].map((project, idx) => (
                <div key={idx} className="group p-6 dark:bg-slate-900/30 bg-slate-50 border dark:border-slate-800 border-slate-100 rounded-3xl hover:border-blue-500/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-lg font-black">{project.status}</span>
                        <div className="flex gap-1">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-md font-bold">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{project.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-500 flex items-center justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {project.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-slate-500">진척률</span>
                      <span className="text-sm font-black text-blue-500">{project.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border dark:border-slate-700">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-8 pb-8">
              <button className="w-full py-4 border-2 border-dashed dark:border-slate-800 border-slate-200 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:border-blue-500/50 rounded-2xl text-sm font-black transition-all">
                상세 프로젝트 로그 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Tech Library (기술 자료실) */}
      {activeTab === "docs" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* Registration Form (Collapsible/Conditional) */}
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/10 rounded-lg">
                    <Library className="w-5 h-5 text-teal-500" />
                  </div>
                  <h2 className="text-xl font-black dark:text-white text-slate-900">
                    기술 지식 베이스
                  </h2>
                </div>
                <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                  핵심 기술 특허 및 설계 노하우를 검색하고 신규 자료를 등록합니다.
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-teal-600/20 active:scale-95">
                <Upload className="w-4 h-4" />
                신규 자료 등록
              </button>
            </div>

            {/* Quick Registration Form Overlay-like card */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/30 border dark:border-slate-800 border-slate-100 rounded-3xl space-y-6">
              <h3 className="text-sm font-black dark:text-slate-300 text-slate-700 uppercase tracking-widest px-1">기술자료 요약 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1">자료 명칭</label>
                  <input type="text" placeholder="제목을 입력하세요" className="w-full h-13 px-4 bg-white dark:bg-slate-800 border dark:border-slate-700 border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-teal-500/20 outline-none" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1">기술 카테고리</label>
                  <select className="w-full h-13 px-4 bg-white dark:bg-slate-800 border dark:border-slate-700 border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-teal-500/20 outline-none appearance-none">
                    <option>선행 연구</option>
                    <option>설계 품질 규정</option>
                    <option>특허/지식재산권</option>
                    <option>공정 노하우</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1">중요 파일 첨부</label>
                <div className="border-2 border-dashed dark:border-slate-700 border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-800/50 hover:border-teal-500/50 transition-all cursor-pointer group">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-teal-500/10 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-teal-500" />
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">PDF, CAD, DOCX 등 파일을 드래그하여 업로드하세요 (최대 50MB)</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-black hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">취소</button>
                <button className="px-8 py-3 bg-teal-600 text-white rounded-xl text-sm font-black shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all active:scale-95">자료 최종 저장</button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  기술 자료 검색 (사내 규정/논문)
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <input 
                      type="text" 
                      placeholder="예: '고강도 합금 클리어런스 설계 가이드'"
                      className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all font-bold"
                    />
                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-teal-500" />
                  </div>
                  <button className="h-14 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-teal-600/20 active:scale-95">
                    검색
                  </button>
                </div>
              </div>

              <div className="p-6 bg-teal-500/5 border border-teal-500/10 rounded-3xl flex gap-4">
                <div className="p-2 bg-teal-500/10 rounded-xl h-fit">
                   <Sparkles className="w-5 h-5 text-teal-500" />
                </div>
                <p className="text-sm text-teal-800 dark:text-teal-300 leading-relaxed font-bold">
                  사내 AI 어시스턴트를 활용하면 수만 건의 기술 문서에서 필요한 정보를 즉시 요약해서 제공받을 수 있습니다.
                  <span className="text-teal-500 ml-1 cursor-pointer hover:underline underline-offset-4">[AIBIS 호출하기]</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "특허: 파인블랭킹 정밀 다이 구조", date: "2023.11.20", type: "PDF" },
                  { title: "규정: 2024년 설계 품질 표준", date: "2024.01.05", type: "DOCX" },
                  { title: "노하우: 알루미늄 하우징 열변형 방지", date: "2023.09.12", type: "VIDEO" },
                  { title: "보고서: 신소재 인장 강도 테스트 결과", date: "2023.12.15", type: "PPTX" },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <BookOpen className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{doc.title}</p>
                        <p className="text-[10px] font-bold text-slate-500">{doc.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 border dark:border-slate-700 border-slate-200 px-2 py-1 rounded-md uppercase">{doc.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
