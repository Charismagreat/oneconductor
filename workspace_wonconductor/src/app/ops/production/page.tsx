"use client";

import React, { useState } from "react";
import { 
  Activity,
  ClipboardCheck,
  CheckCircle2,
  Package,
  QrCode,
  Minus,
  Plus,
  Search,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductionOpsPage() {
  const [activeTab, setActiveTab] = useState("inspection"); // inspection, inventory, performance, process

  const tabs = [
    { id: "inspection", label: "설비 점검" },
    { id: "inventory", label: "자재 입출고" },
    { id: "performance", label: "생산 실적" },
    { id: "process", label: "공정 가동 현황" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            생산 및 설비
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            실시간 공정 가동 현황 모니터링 및 자재/설비 관련 현장 실무를 지원합니다.
          </p>
        </div>
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

      {/* Content Area - Equipment Inspection (설비 점검) */}
      {activeTab === "inspection" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ClipboardCheck className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  일일 설비 점검 항목
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                가동 전 사전 점검 리스트입니다. 모든 항목을 확인해 주세요.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "윤활유 잔량 확인 (정상 수위 80% 이상)",
                "비상 정지 버튼 작동 테스트",
                "컨베이어 벨트 장력 및 마모 상태 육안 검사",
                "작업장 주변 이물질 제거 청소"
              ].map((item, idx) => (
                <label 
                  key={idx} 
                  className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
                >
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-6 h-6 border-2 dark:border-slate-700 border-slate-300 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer" />
                    <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-500 transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                특이사항 (선택)
              </label>
              <textarea 
                placeholder="점검 중 발견된 특이사항을 적어주세요."
                rows={4}
                className="w-full p-6 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold resize-none"
              />
            </div>

            <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-black text-xl shadow-xl transition-all mt-4">
              점검 완료 보고
            </button>
          </div>
        </div>
      )}

      {/* Content Area - Inventory Management (자재 입출고) */}
      {activeTab === "inventory" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            {/* Form Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  자재 입출고 관리
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                자재 입고, 출고 내역 및 불량 처리를 스마트하게 기록합니다.
              </p>
            </div>

            {/* Sub-Action Buttons Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "자재입고", active: true, highlight: "text-blue-500" },
                { label: "자재출고", active: false, highlight: "text-amber-500" },
                { label: "불량처리", active: false, highlight: "text-rose-500" }
              ].map((btn, idx) => (
                <button 
                  key={idx}
                  className={cn(
                    "py-3.5 px-2 rounded-2xl text-[11px] font-black transition-all border",
                    btn.active 
                      ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white" 
                      : "bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800",
                    btn.highlight
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Main Form Area */}
            <div className="space-y-6 pt-4">
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  품목 코드 / 바코드
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 group">
                    <input 
                      type="text" 
                      placeholder="품목 코드를 입력하세요"
                      className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                    />
                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                  <button className="h-14 px-6 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 active:scale-95 transition-all">
                    <QrCode className="w-4 h-4" />
                    스캔
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  수량
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl p-1 h-14">
                  <button className="h-full w-14 flex items-center justify-center text-slate-500 hover:text-blue-500 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-black dark:text-white text-slate-900 text-lg">
                    1
                  </div>
                  <button className="h-full w-14 flex items-center justify-center text-slate-500 hover:text-blue-500 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  담당자 / 메모
                </label>
                <input 
                  type="text" 
                  placeholder="인수자 정보나 특별 메모..."
                  className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                />
              </div>

              <button className="w-full py-5 bg-[#FF6B00] hover:bg-[#E56000] active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 transition-all mt-4 border border-orange-400/20">
                내역 등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Production Performance (생산 실적) */}
      {activeTab === "performance" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  일일 생산 실적 보고
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                오늘의 생산 목표 대비 달성 실적과 불량 현황을 기록합니다.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Item Info */}
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  작업지시 / 품목 코드
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="PO-2024-001"
                      className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                    />
                  </div>
                  <button className="h-14 px-5 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
                    <QrCode className="w-4 h-4" />
                    스캔
                  </button>
                </div>
              </div>

              {/* Line Select */}
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  생산 라인
                </label>
                <select className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold appearance-none cursor-pointer">
                  <option>전력 접속재 라인 (A-1)</option>
                  <option>에폭시 금형 라인 (B-2)</option>
                  <option>T-OSK 조립 라인 (C-3)</option>
                </select>
              </div>

              {/* Target Quantity */}
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  일일 목표 수량 (EA)
                </label>
                <input 
                  type="number" 
                  defaultValue={100}
                  className="w-full h-14 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                />
              </div>

              {/* Actual Quantity */}
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  생산 실적 (EA)
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl p-1 h-14">
                  <button className="h-full w-12 flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-black dark:text-white text-slate-900 text-lg">
                    95
                  </div>
                  <button className="h-full w-12 flex items-center justify-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Defect Quantity */}
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest text-rose-500">
                  불량 수량 (EA)
                </label>
                <div className="flex items-center bg-rose-50/10 dark:bg-rose-500/5 border dark:border-rose-500/20 border-rose-100 rounded-2xl p-1 h-14">
                  <button className="h-full w-12 flex items-center justify-center text-rose-400 hover:text-rose-600 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-black text-rose-500 text-lg">
                    2
                  </div>
                  <button className="h-full w-12 flex items-center justify-center text-rose-400 hover:text-rose-600 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator (Calculated) */}
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest">
                  달성률
                </label>
                <div className="h-14 flex items-center px-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mr-4">
                    <div className="h-full bg-emerald-500 w-[95%] transition-all" />
                  </div>
                  <span className="text-sm font-black text-emerald-500">95%</span>
                </div>
              </div>
            </div>

            <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-black text-xl shadow-xl transition-all mt-4">
              생산 실적 최종 보고
            </button>
          </div>
        </div>
      )}

      {/* Content Area - Process Status (공정 가동 현황) */}
      {activeTab === "process" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  실시간 공정 가동률
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                주요 생산 라인의 현재 가동 상태를 실시간으로 확인합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "전력 접속재 라인", value: 94.2, color: "bg-emerald-500" },
                { label: "에폭시 금형 공정", value: 88.5, color: "bg-emerald-500" },
                { label: "T-OSK 모듈 조립", value: 91.0, color: "bg-blue-500" },
              ].map((process, idx) => (
                <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border dark:border-slate-800 border-slate-200 space-y-4">
                  <p className="text-xs font-black text-slate-500">{process.label}</p>
                  <p className={cn("text-3xl font-black", process.value > 90 ? "text-emerald-500" : "text-blue-500")}>
                    {process.value}%
                  </p>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", process.color)} 
                      style={{ width: `${process.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
