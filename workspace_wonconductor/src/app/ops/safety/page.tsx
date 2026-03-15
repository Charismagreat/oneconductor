"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  HeartPulse, 
  UserCheck, 
  Construction, 
  BookOpen,
  Award,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SafetyOpsPage() {
  const [activeTab, setActiveTab] = useState("safety"); // safety, env_check, training

  const tabs = [
    { id: "safety", label: "스마트 안전 (T-OSK)" },
    { id: "env_check", label: "안전/환경 점검" },
    { id: "training", label: "안전 교육 및 공지" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            안전 관리
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            T-OSK 연동 스마트 안전 및 현장 환경/보건 점검을 통합 관리합니다.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20 text-sm font-bold shadow-sm shadow-emerald-500/5">
          <ShieldAlert className="w-4 h-4" />
          <span>안전 지수: 100% (매우 양호)</span>
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

      {/* Content Area - Smart Safety (스마트 안전) */}
      {activeTab === "safety" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Health Check Card */}
            <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <HeartPulse className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-bold dark:text-white text-slate-900">
                    T-OSK 건강 상태 확인
                  </h2>
                </div>
                <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                  오늘 오전 출근 시 키오스크 태깅 결과
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "체온", value: "36.5℃", status: "정상", color: "text-emerald-500" },
                  { label: "혈압", value: "120/80", status: "정상", color: "text-emerald-500" },
                  { label: "음주 측정", value: "0.00%", status: "패스", color: "text-emerald-500" },
                  { label: "심박수", value: "72 bpm", status: "정상", color: "text-emerald-500" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border dark:border-slate-800 border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 mb-1">{item.label}</p>
                    <div className="flex items-end gap-2">
                       <span className="text-lg font-black text-slate-900 dark:text-white">{item.value}</span>
                       <span className={cn("text-[10px] font-bold mb-1", item.color)}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-sm font-bold text-blue-500 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                <UserCheck className="w-5 h-5" />
                <span>NFC/생체인증 본인 확인 완료</span>
              </div>
            </div>

            {/* High-risk Work Card */}
            <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Construction className="w-5 h-5 text-amber-500" />
                  </div>
                  <h2 className="text-xl font-bold dark:text-white text-slate-900">
                    고위험 작업 관리
                  </h2>
                </div>
                <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                  배정된 위험 작업 현황 및 안전 수칙
                </p>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-black text-slate-900 dark:text-white">초고압 GIS 스페이서 조립</span>
                  <span className="text-[10px] px-2 py-1 bg-amber-500 text-white rounded-lg font-black">위험도: 상</span>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-500">위치: A동 3번 라인 작업장</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      절연 보호 장구 필히 착용
                    </div>
                    <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      2인 1조 작업 원칙 준수
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-2xl font-bold text-sm transition-all border dark:border-slate-700 border-slate-200">
                안전 작업 허가서 (PTW) 확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Environmental/Safety Check (안전/환경 점검) */}
      {activeTab === "env_check" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  현장 환경/안전 점검 (ISO 14001)
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                공정별 유해 요인 점검 및 보호구 착용 상태를 기록합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    점검 구역
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium">
                      <option>프레스 1라인</option>
                      <option>조립 2공장</option>
                      <option>도장 / 용접 라인</option>
                      <option>폐기물 보관장</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    안전보호구 착용 상태
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium">
                      <option>양호 (전원 착용)</option>
                      <option>미흡 (일부 미착용)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  특이사항 (위험/지적 내용)
                </label>
                <textarea 
                  placeholder="소음 발생, 오일 누유 등 특이사항 기재"
                  rows={4}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium resize-none"
                />
              </div>

              <button className="w-full py-5 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-500/20 transition-all mt-4">
                점검 일지 등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Training (안전 교육 및 공지) */}
      {activeTab === "training" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-teal-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  스마트 안전 교육 이수 현황
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                법정 의무 교육 및 사내 안전 수칙 교육 이수 상태입니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                <div className="space-y-1">
                  <p className="font-black text-slate-900 dark:text-white">정기 산업안전 교육 (11월)</p>
                  <p className="text-xs font-bold text-slate-500">이수 완료 (2024.11.05)</p>
                </div>
                <div className="p-2 bg-emerald-500/10 rounded-full">
                  <Award className="w-6 h-6 text-emerald-500" />
                </div>
              </div>

              <div className="flex justify-between items-center p-6 bg-rose-500/5 border border-rose-500/10 rounded-3xl">
                <div className="space-y-1">
                  <p className="font-black text-slate-900 dark:text-white">신규 T-OSK 조작 안전 교육</p>
                  <p className="text-xs font-bold text-rose-500">미이수 (마감 D-2)</p>
                </div>
                <button className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-rose-500/20">
                  교육 수강
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
