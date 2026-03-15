"use client";

import React, { useState } from "react";
import { 
  Truck, 
  ChevronDown, 
  Calendar,
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Upload,
  QrCode
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DeliveryOpsPage() {
  const [activeTab, setActiveTab] = useState("calendar"); // calendar, registration

  const tabs = [
    { id: "calendar", label: "납품 캘린더" },
    { id: "registration", label: "납품 확인서 등록" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          납품 관리
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          고객사별 납품 스케줄 확인 및 납품 확인서(출하 증빙)를 등록합니다.
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

      {/* Content Area - Delivery Calendar (납품 캘린더) */}
      {activeTab === "calendar" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  주간 납품 지시 현황
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                주요 완성차 및 1차 파트너사별 실시간 납품 스케줄입니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1 uppercase tracking-widest">납품처 필터</label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                      <option>HL만도 (제동 부문)</option>
                      <option>현대모비스 (조향 부문)</option>
                      <option>기아 오토랜드</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1 uppercase tracking-widest">날짜 선택</label>
                  <div className="relative group">
                    <input type="date" className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" defaultValue="2024-03-15" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { time: "09:00", customer: "HL만도", item: "Brake Pedal (DN8)", qty: "5,000 EA", status: "출하 완료", statusColor: "bg-emerald-500" },
                  { time: "13:30", customer: "현대모비스", item: "Steering Shaft Brkt", qty: "2,000 EA", status: "상차 대기", statusColor: "bg-blue-500" },
                  { time: "16:00", customer: "기아", item: "Caliper Housing", qty: "1,500 EA", status: "검사 완료", statusColor: "bg-amber-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-3xl hover:border-blue-500/50 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <Clock className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-xs font-black text-slate-900 dark:text-white">{item.time}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-blue-500">{item.customer}</span>
                          <span className={cn("text-[10px] px-2 py-0.5 text-white rounded-md font-black", item.statusColor)}>{item.status}</span>
                        </div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white">{item.item}</h3>
                        <p className="text-xs font-bold text-slate-500">{item.qty}</p>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all">상세보기</button>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-500/20 transition-all mt-4 flex items-center justify-center gap-3">
                <QrCode className="w-5 h-5" />
                PDA 바코드 상차 처리
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Delivery Registration (납품 확인서 등록) */}
      {activeTab === "registration" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileText className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  납품 확인서(출하 증빙) 등록
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                납품 완료 후 고객사 날인이 포함된 확인서를 스캔하여 업로드하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1 uppercase tracking-widest">출하 번호 (PO)</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="SH-2024-0315" className="flex-1 h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                  <button className="px-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-xs">조회</button>
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1 uppercase tracking-widest">납품 완료 일시</label>
                <input type="datetime-local" className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black dark:text-slate-400 text-slate-500 ml-1 uppercase tracking-widest">확인서 파일 업로드 (날인본)</label>
              <div className="border-2 border-dashed dark:border-slate-700 border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-slate-900/20 hover:border-emerald-500/50 transition-all group cursor-pointer">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black dark:text-white text-slate-900">클릭하거나 파일을 여기로 드래그하세요</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">PDF, JPG, PNG 형식 지원 (최대 10MB)</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
               <p className="text-xs font-bold text-emerald-600 leading-relaxed">
                 ※ 납품 확인서가 등록되면 영업팀과 경영지원팀 시스템으로 즉시 전산 공유되어 거래명세서 및 인수증 처리가 자동화됩니다.
               </p>
            </div>

            <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-black text-xl shadow-xl transition-all mt-4">
              증빙 서류 최종 등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
