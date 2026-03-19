"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  MapPin, 
  TrendingUp,
  MessageCircle,
  AlertCircle,
  Search,
  UserSquare,
  ChevronDown,
  Contact2,
  Receipt
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoUpload } from "@/components/ui/photo-upload";

export default function SalesOpsPage() {
  const [activeTab, setActiveTab] = useState("report"); // report, voc

  const tabs = [
    { id: "report", label: "영업 현장 보고서" },
    { id: "voc", label: "고객 VoC / 피드백" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          영업 마케팅
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold">
          현장 영업 일지, 거래처 VoC 접수 및 실시간 수주/발주 트래킹을 수행합니다.
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

      {/* Content Area - Sales Field Report (영업 현장 보고서) */}
      {activeTab === "report" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Form Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                    영업 상담 보고서 작성
                  </h2>
                </div>
                <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                  외근 다녀온 후 거래처 정보를 즉각 공유하세요.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                    거래처명 (고객사)
                  </label>
                  <input 
                    type="text" 
                    placeholder="거래처 이름을 입력하세요."
                    className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                    상담장소
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="주소를 입력하세요"
                        className="w-full h-13 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                      />
                    </div>
                    <button className="h-13 px-6 bg-slate-100 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all group">
                      <MapPin className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors">현위치</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                    상담내용 (Next Step 포함)
                  </label>
                  <textarea 
                    placeholder="미팅 전개 과정과 합의된 다음 단계를 적어주세요."
                    rows={6}
                    className="w-full p-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold resize-none"
                  />
                </div>
              </div>

              {/* Photo & Receipt Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Contact2 className="w-4 h-4" />
                    명함 스마트 등록 (OCR)
                  </span>
                  <PhotoUpload label="명함 촬영 및 자동 추출" maxPhotos={5} showOcr={true} />
                </div>
                <div className="space-y-4">
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    경비 영수증 스캔 (OCR)
                  </span>
                  <PhotoUpload label="영수증 촬영 및 내역 추출" maxPhotos={5} showOcr={true} />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full py-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-xl shadow-xl shadow-blue-500/20 transition-all mt-4">
                영업 보고서 등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area - Customer VoC (고객 VoC / 피드백) */}
      {activeTab === "voc" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 space-y-8">
              {/* Form Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <UserSquare className="w-5 h-5 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                    거래처 VoC 리포팅
                  </h2>
                </div>
                <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                  불만 사항이나 특별 요청을 관련 부서로 즉시 전달합니다.
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                    요청 유형
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold">
                      <option>품질 관련 불만</option>
                      <option>납기 지연 요청</option>
                      <option>단가 조정 협의</option>
                      <option>신규 제품 문의</option>
                      <option>기타 요청사항</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                    관련 부서 알림
                  </label>
                  <div className="relative group">
                    <select className="w-full h-13 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold">
                      <option>생산/품질팀 메일 전송</option>
                      <option>구매/자재팀 메일 전송</option>
                      <option>연구소(R&D) 메일 전송</option>
                      <option>경영지원팀 메일 전송</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2.5">
                  <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                    VoC 상세 내용
                  </label>
                  <textarea 
                    placeholder="고객 요청사항 또는 클레임 내용을 입력하세요."
                    rows={8}
                    className="w-full p-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full py-5 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 transition-all mt-4">
                VoC 리포트 발행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
