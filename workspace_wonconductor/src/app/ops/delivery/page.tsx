"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ChevronRight,
  Plus,
  Search,
  Box,
  Layout,
  Clock,
  QrCode
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoUpload } from "@/components/ui/photo-upload";

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
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          납품 관리
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold">
          출하 지시 확인 및 현장 납품 결과를 실시간으로 보고합니다.
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

      {/* Content Area - Calendar (납품 캘린더) */}
      {activeTab === "calendar" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="p-8 dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  주간 납품 지시 현황
                </h2>
                <p className="text-xs font-bold text-slate-500">배정된 납품 일정을 확인하고 상차/하차 처리를 진행하세요.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { time: "09:00", customer: "현대자동차 남양연구소", item: "Assy-Brake Pedal", qty: 250, status: "상차완료", location: "울산 출하장" },
                { time: "11:30", customer: "기아자동차 화성공장", item: "Housing-Battery", qty: 120, status: "지시", location: "평택 제2공장" },
                { time: "14:00", customer: "모비스 아산공장", item: "Frame-Window", qty: 400, status: "지시", location: "평택 제1공장" },
              ].map((item, idx) => (
                <div key={idx} className="group p-5 dark:bg-slate-900/30 bg-slate-50 border dark:border-slate-800 border-slate-100 rounded-3xl hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-blue-500">{item.time}</span>
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-md font-black",
                        item.status === "상차완료" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                      )}>{item.status}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">{item.customer}</h3>
                    <p className="text-xs font-bold text-slate-500">{item.item} · {item.qty} EA</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <PhotoUpload label="현장 납품 사진 및 하차 증빙" maxPhotos={5} />
            </div>

            <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-500/20 transition-all mt-4 flex items-center justify-center gap-3">
              <QrCode className="w-5 h-5" />
              PDA 바코드 상차 처리
            </button>
          </div>
        </div>
      )}

      {/* Content Area - Registration (납품 확인서 등록) */}
      {activeTab === "registration" && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="dark:bg-[#0B1120] bg-white rounded-3xl border dark:border-slate-800 border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-extrabold dark:text-white text-slate-900">
                  납품 확인서(출하 증빙) 등록
                </h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-bold ml-13">
                고객사 날인본 및 인수증을 촬영하여 기성 청구 근거 자료로 활용합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  지시 번호 / 거래처 선택
                </label>
                <div className="relative group">
                  <select className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-200 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold">
                    <option>DI-2024-0312-01 (현대차)</option>
                    <option>DI-2024-0312-02 (기아차)</option>
                    <option>DI-2024-0312-03 (모비스)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-200 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1">
                  특이 사항 (파손, 결품 등)
                </label>
                <textarea 
                  placeholder="특이 사항이 있는 경우에만 작성하세요."
                  rows={4}
                  className="w-full h-40 px-5 bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 border-slate-100 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold resize-none p-5"
                />
              </div>

              <div className="pt-4">
                <PhotoUpload 
                  label="납품 확인서(출하 증빙) 스마트 스캔" 
                  maxPhotos={2} 
                  showOcr={true} 
                />
              </div>

              <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-500/20 transition-all mt-4">
                기판력 증빙 전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
