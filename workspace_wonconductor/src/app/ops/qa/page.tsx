"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  FileSearch, 
  ChartLine,
  ChevronDown,
  AlertTriangle,
  ClipboardCheck,
  CheckCircle2,
  FileText,
  ScanLine,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function QaOpsPage() {
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, ncr, inspect

  const tabs = [
    { id: "dashboard", label: "품질 지표 (PPM)" },
    { id: "ncr", label: "부적합(CAPA) 관리" },
    { id: "inspect", label: "검사 성적서" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          품질 관리
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          IATF 16949 글로벌 품질 표준 대응, 부적합 관리 및 검사 성적서 등록을 관리합니다.
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

      {/* Content Area - Quality Dashboard (품질 지표) */}
      {activeTab === "dashboard" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ChartLine className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  제동/조향 공정 품질 지표
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                실시간 공정별 불량률 및 주요 품질 현황 분석 데이터입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border dark:border-slate-800 border-slate-200 flex flex-col items-center justify-center space-y-2">
                <span className="text-xs font-black text-slate-500">프레스 조향 부품 불량률</span>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-rose-500">1.2%</span>
                  <span className="text-xs font-bold text-rose-500 mb-1.5">(▼ 0.3%)</span>
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border dark:border-slate-800 border-slate-200 flex flex-col items-center justify-center space-y-2">
                <span className="text-xs font-black text-slate-500">고객 반품 (PPM)</span>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-emerald-500">12</span>
                  <span className="text-xs font-bold text-slate-500 mb-1.5">PPM (목표 15 이하)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border dark:border-slate-800 border-slate-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-black text-slate-900 dark:text-white">월별 누적 불량률 추이</span>
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-500">실시간 실적</span>
                </div>
              </div>
              <div className="h-48 w-full flex flex-col items-center justify-center border-2 border-dashed dark:border-slate-800 border-slate-200 rounded-2xl">
                <ScanLine className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-500">차트 데이터 로드 중...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - CAPA Management (부적합 관리) */}
      {activeTab === "ncr" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  부적합 보고서 발생 및 조치
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                고객사 클레임 또는 사내 부적합 발생 내용을 기록하고 대책을 수립합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  품목 (부품명)
                </label>
                <input 
                  type="text" 
                  placeholder="예: Brake Pedal Assy"
                  className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    발생 공정 / 출처
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium">
                      <option>고객사 클레임 (현대차)</option>
                      <option>조립 공정 검사</option>
                      <option>프레스 공정 검사</option>
                      <option>수입 검사</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    원인 범주
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium">
                      <option>가공 치수 불량</option>
                      <option>용접 크랙/기포</option>
                      <option>도장 까짐</option>
                      <option>조립 누락</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  부적합 상세 내용
                </label>
                <textarea 
                  placeholder="불량 현상 및 발생 상황을 구체적으로 기재하세요."
                  rows={4}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium resize-none text-sm"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-black text-rose-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  현장 사진 첨부
                </span>
                <button className="w-full py-8 flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed dark:border-rose-500/30 border-rose-200 rounded-[2rem] hover:bg-rose-500/5 hover:border-rose-500/50 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-rose-500/20 text-rose-500">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-rose-500">부적합 현장 사진 촬영/첨부</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">최대 3장까지 등록 가능</p>
                  </div>
                </button>
              </div>

              <button className="w-full py-5 bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-rose-500/20 transition-all mt-4">
                부적합 보고서 (NCR) 발행
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Inspection (검사 성적서) */}
      {activeTab === "inspect" && (activeTab === "inspect" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <FileSearch className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  모바일 검사 성적서 등록
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                초물/중물/종물 검사 및 출하 검사 결과를 등록합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  검사 대상 (LOT / 지시번호)
                </label>
                <input 
                  type="text" 
                  placeholder="PO번호 또는 LOT번호 스캔"
                  className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-4 pt-4">
                <span className="text-sm font-bold text-indigo-500 ml-1">검사 성적서 문서 스캔</span>
                <button className="w-full py-12 flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed dark:border-indigo-500/50 border-indigo-200 rounded-[2rem] hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all group">
                  <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ScanLine className="w-7 h-7 text-indigo-500" />
                  </div>
                  <span className="text-sm font-bold text-indigo-500">카메라로 성적서 촬영</span>
                </button>
              </div>

              <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-500/20 transition-all mt-4">
                성적서 데이터 저장
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
