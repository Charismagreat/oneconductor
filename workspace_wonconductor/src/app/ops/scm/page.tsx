"use client";

import React, { useState } from "react";
import { 
  Package, 
  Truck, 
  ShoppingCart,
  ChevronDown,
  AlertTriangle,
  Search,
  Box,
  Layout,
  Cpu,
  BookOpen,
  Sparkles,
  BarChart3,
  CalendarCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScmOpsPage() {
  const [activeTab, setActiveTab] = useState("inventory"); // inventory, purchase

  const tabs = [
    { id: "inventory", label: "안전 재고" },
    { id: "purchase", label: "원자재 발주" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          자재 관리
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          안전 재고 대시보드 및 원부자재 발주 현황을 실시간으로 관리합니다.
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

      {/* Content Area - Inventory (안전 재고) */}
      {activeTab === "inventory" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  창고별 실시간 재고 현황
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                원자재(코일철판 등), 반제품, 출하 대기 완제품의 재고 파악입니다.
              </p>
            </div>

            <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-3xl flex gap-4">
              <div className="p-2 bg-rose-500/10 rounded-xl h-fit">
                 <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-rose-500 text-sm">안전 재고 미달 알림</h4>
                <p className="text-xs font-bold text-rose-500/80 leading-relaxed">
                  SPHC 4.0t 열연코일 재고가 안전재고(50톤) 미만으로 하락했습니다. (현재: 12톤) 조기 발주가 필요합니다.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  품번 스캔 및 조회
                </label>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="바코드/품번 스캔으로 위치 및 수량 조회"
                    className="w-full h-13 px-12 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "원자재 창고", value: "45%", color: "text-blue-500" },
                  { label: "1공장 반제품", value: "82%", color: "text-amber-500" },
                  { label: "출하 대기장", value: "20%", color: "text-emerald-500" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border dark:border-slate-800 border-slate-100 flex flex-col items-center justify-center space-y-1">
                    <span className="text-[10px] font-black text-slate-500">{item.label}</span>
                    <span className={cn("text-lg font-black", item.color)}>{item.value} 적재</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Content Area - Purchase (원자재 발주) */}
      {activeTab === "purchase" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  협력사(외주/부자재) 발주 관리
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                도금/열처리 외주 공정 및 포장 박스, 부자재 발주를 관리합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    외주/발주처
                  </label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="업체명 검색"
                      className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    품목 분류
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium">
                      <option>열처리 / 도금 (아연, 전착 등)</option>
                      <option>포장재 (비닐, 박스)</option>
                      <option>기타 소모성 자재</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20 transition-all mt-4">
                발주서 (PO) 작성 및 전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
