"use client";

import React, { useState } from "react";
import { 
  Home, 
  CalendarClock,
  ChevronDown,
  Building2,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HrOpsPage() {
  const [activeTab, setActiveTab] = useState("dorm"); // dorm, attendance

  const tabs = [
    { id: "dorm", label: "기숙사/시설 현황" },
    { id: "attendance", label: "근태 관리" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          인사 총무
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          임직원 근태 및 기숙사 시설 접수를 효율적으로 관리합니다.
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

      {/* Content Area - Dorm/Facilities (기숙사/시설 현황) */}
      {activeTab === "dorm" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  기숙사 시설물 불편 접수
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                기숙사 및 사내 편의시설 관련 고장 수리를 총무팀에 접수합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    건물 / 호실
                  </label>
                  <input 
                    type="text" 
                    placeholder="예: 신관 기숙사 302호"
                    className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                    분류
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium">
                      <option>전기 / 조명</option>
                      <option>수도 / 배관 (누수 등)</option>
                      <option>냉난방기</option>
                      <option>기타 시설물</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  상세를 기재해주세요
                </label>
                <textarea 
                  placeholder="고장 부위와 증상을 상세히 기재해주세요."
                  rows={6}
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium resize-none"
                />
              </div>

              <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-indigo-500/20 transition-all mt-4">
                관리팀 접수
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Attendance (근태 관리) */}
      {activeTab === "attendance" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CalendarClock className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold dark:text-white text-slate-900">
                  근태/연차 모바일 기안
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium ml-13">
                부서별 인력 현황 및 개인 연차 사용을 등록합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  구분
                </label>
                <div className="relative group">
                  <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium">
                    <option>연차 / 반차</option>
                    <option>특근 / 야근 신청</option>
                    <option>조퇴 및 외출</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-bold dark:text-slate-300 text-slate-700 ml-1">
                  일시 및 사유
                </label>
                <input 
                  type="text" 
                  placeholder="일정 및 간략한 사유 기재"
                  className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                />
              </div>

              <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/20 transition-all mt-4">
                근태 기안하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
