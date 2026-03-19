"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Settings, 
  Clock, 
  Camera, 
  ChevronDown, 
  DollarSign,
  AlertCircle,
  Monitor,
  Send,
  CalendarOff,
  AlertTriangle,
  CheckCircle2,
  Receipt,
  FileSignature
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoUpload } from "@/components/ui/photo-upload";

export default function AdminOpsPage() {
  const [activeTab, setActiveTab] = useState("expense"); // expense, facility, attendance

  const tabs = [
    { id: "expense", label: "지출결의" },
    { id: "facility", label: "시설/비품 신청" },
    { id: "attendance", label: "간편 근태" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          경영 지원
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold">
          경비 청구, 시설물 A/S 접수 및 간편 근태를 모바일에서 간편하게 처리하세요.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border dark:border-slate-800 border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all duration-200",
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area - Expense Report (지출결의) */}
      {activeTab === "expense" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            {/* Form Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  지출결의 작성 (법인카드/경비)
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                종이 영수증을 스마트폰으로 즉석에서 찍고 내역을 정리하세요.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-4">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  지출 항목 세분화
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 대분류 */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-black text-slate-500 ml-1">대분류</span>
                    <div className="relative group">
                      <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-xl text-xs font-bold appearance-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                        <option>판매비와관리비</option>
                        <option>제조원가</option>
                        <option>영업외비용</option>
                        <option>법인세</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* 중분류 */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-black text-slate-500 ml-1">중분류</span>
                    <div className="relative group">
                      <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-xl text-xs font-bold appearance-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                        <option>복리후생비</option>
                        <option>여비교통비</option>
                        <option>접대비</option>
                        <option>소모품비</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* 세분류 */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-black text-slate-500 ml-1">세분류</span>
                    <div className="relative group">
                      <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-xl text-xs font-bold appearance-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                        <option>식대</option>
                        <option>직원회식비</option>
                        <option>유류대</option>
                        <option>박람회참가비</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  지출 방법
                </label>
                <div className="relative group">
                  <select className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold">
                    <option>법인카드</option>
                    <option>개인카드 (사후 청구)</option>
                    <option>현금 (영수증 첨부)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-6 h-6 border-2 dark:border-slate-700 border-slate-300 rounded-lg checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer" />
                      <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">
                      증빙이 세금계산서인 경우 체크하세요
                    </span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  사용 내역 / 가맹점명
                </label>
                <input 
                  type="text" 
                  placeholder="어디서 무엇을 구매했나요?"
                  className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                />
              </div>

              <div className="md:col-span-2 space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  총 지출 금액 (원)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full h-14 px-8 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-black text-right pr-12 text-xl"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₩</span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">원</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <span className="text-xs font-black text-emerald-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                스마트 증빙 스캔 (OCR)
              </span>
              <PhotoUpload 
                label="영수증/전표 스마트 증빙 스캔" 
                maxPhotos={5} 
                showOcr={true} 
              />
            </div>

            {/* Submit Button */}
            <button className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/30 transition-all mt-4 flex items-center justify-center gap-3">
              <FileSignature className="w-6 h-6" />
              지출 결의서 상신
            </button>
          </div>
        </div>
      )}

      {/* Content Area - Facility Request (시설/비품 신청) */}
      {activeTab === "facility" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Monitor className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  비품 신청 및 고장 수리
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                사무실의 형광등, 프린터 고장 등을 총무팀에 즉시 알립니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  문제 위치 / 부서
                </label>
                <input 
                  type="text" 
                  placeholder="예: 2층 영업지원팀 앞 복합기"
                  className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  고장 증상 또는 신청 물품
                </label>
                <textarea 
                  placeholder="증상을 자세하게 적어주시면 수리에 도움이 됩니다."
                  rows={6}
                  className="w-full p-6 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold resize-none"
                />
              </div>

              <div className="pt-2">
                <PhotoUpload label="현장 사진 첨부" maxPhotos={5} />
              </div>

              <button className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-2xl font-black text-xl shadow-xl shadow-indigo-500/30 transition-all mt-4 flex items-center justify-center gap-3">
                <Send className="w-6 h-6" />
                관리팀에 전송
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Attendance (간편 근태) */}
      {activeTab === "attendance" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg">
                  <CalendarOff className="w-5 h-5 text-rose-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  모바일 간편 근태 신고
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                반차나 조퇴 등을 팀원들과 담당자에게 빠르게 보고하세요.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  근태 구분
                </label>
                <div className="relative group">
                  <select className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-bold">
                    <option>연차 휴가</option>
                    <option>반차 (오전)</option>
                    <option>반차 (오후)</option>
                    <option>조퇴</option>
                    <option>외출</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  사유
                </label>
                <input 
                  type="text" 
                  placeholder="병원 진료, 개인 사정 등 간략하게 작성"
                  className="w-full h-14 px-6 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-bold"
                />
              </div>

              <div className="pt-2">
                <PhotoUpload label="증빙 사진 (선택)" maxPhotos={5} />
              </div>

              {/* Warning Alert */}
              <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-[2rem] flex items-start gap-5">
                <div className="p-2 bg-rose-500/10 rounded-xl shrink-0">
                   <AlertTriangle className="w-5 h-5 text-rose-500" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-black text-rose-500">보고 주의사항</p>
                   <p className="text-xs font-bold text-rose-500/80 leading-relaxed">
                     긴급 연차더라도 반드시 승인자의 결재(사전 혹은 사후)가 완료되어야 최종 반영됩니다.
                   </p>
                </div>
              </div>

              <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-black text-xl shadow-xl transition-all mt-4 flex items-center justify-center gap-3">
                <Clock className="w-6 h-6" />
                근태 기안하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
