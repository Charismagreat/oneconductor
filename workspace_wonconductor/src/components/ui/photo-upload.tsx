"use client";

import React, { useState, useRef } from "react";
import { Camera, X, UploadCloud, ImageIcon, Plus, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  label?: string;
  maxPhotos?: number;
  className?: string;
  showOcr?: boolean;
  onPhotosChange?: (files: File[]) => void;
}

export function PhotoUpload({ 
  label = "사진 등록", 
  maxPhotos = 5, 
  className,
  showOcr = false,
  onPhotosChange 
}: PhotoUploadProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<{file: File, preview: string, scanning?: boolean, scanComplete?: boolean}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedPhotos.length + files.length > maxPhotos) {
      alert(`최대 ${maxPhotos}장까지만 등록 가능합니다.`);
      return;
    }

    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      scanning: showOcr,
      scanComplete: false
    }));

    const updatedPhotos = [...selectedPhotos, ...newPhotos];
    setSelectedPhotos(updatedPhotos);
    onPhotosChange?.(updatedPhotos.map(p => p.file));

    // Simulate OCR Scanning
    if (showOcr) {
      newPhotos.forEach((_, idx) => {
        const globalIdx = selectedPhotos.length + idx;
        setTimeout(() => {
          setSelectedPhotos(prev => prev.map((p, i) => 
            i === globalIdx ? { ...p, scanning: false, scanComplete: true } : p
          ));
        }, 2500);
      });
    }
  };

  const removePhoto = (index: number) => {
    const photoToRemove = selectedPhotos[index];
    URL.revokeObjectURL(photoToRemove.preview);
    
    const updatedPhotos = selectedPhotos.filter((_, i) => i !== index);
    setSelectedPhotos(updatedPhotos);
    onPhotosChange?.(updatedPhotos.map(p => p.file));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {label && (
        <label className="text-sm font-black dark:text-slate-300 text-slate-700 ml-1 uppercase tracking-widest flex items-center gap-2 mb-1">
          <Camera className={cn("w-4 h-4", showOcr ? "text-emerald-500" : "text-indigo-500")} />
          {label}
          {showOcr && (
            <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md ml-auto animate-pulse">
              AI OCR 지능형 추출 모드
            </span>
          )}
        </label>
      )}
      
      {/* Photo Preview Grid */}
      {selectedPhotos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-in fade-in duration-300">
          {selectedPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border dark:border-slate-800 border-slate-200 group bg-slate-100 dark:bg-slate-900"
            >
              <img 
                src={photo.preview} 
                alt={`preview-${index}`} 
                className={cn("w-full h-full object-cover transition-all duration-500", photo.scanning ? "brightness-50 blur-sm scale-110" : "group-hover:scale-110")} 
              />
              
              {/* OCR Scanning Animation Overlay */}
              {photo.scanning && (
                <div className="absolute inset-x-0 top-0 h-full overflow-hidden flex flex-col items-center justify-center gap-2">
                  <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan z-10" />
                  <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-tighter drop-shadow-md">텍스트 분석 중...</span>
                </div>
              )}

              {/* OCR Scan Complete Feedback */}
              {photo.scanComplete && (
                <div className="absolute inset-x-0 top-0 h-full flex flex-col items-center justify-center gap-1 bg-emerald-900/40 backdrop-blur-[2px] animate-in fade-in duration-500 z-10">
                  <div className="p-1.5 bg-emerald-500 rounded-lg shadow-lg scale-110">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter drop-shadow-md">데이터 추출 완료</span>
                </div>
              )}

              {!photo.scanning && (
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-2 bg-rose-500/90 hover:bg-rose-600 text-white rounded-xl backdrop-blur-md transition-all shadow-lg z-20"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {selectedPhotos.length < maxPhotos && (
            <button
              type="button"
              onClick={triggerFileInput}
              className="aspect-[4/3] flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed dark:border-slate-800 border-slate-200 bg-slate-50/50 dark:bg-slate-900/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
            >
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Plus className={cn("w-6 h-6 text-slate-400 group-hover:text-indigo-500", showOcr && "group-hover:text-emerald-500")} />
              </div>
              <span className={cn("text-[11px] font-black text-slate-400 uppercase tracking-tighter group-hover:text-indigo-500", showOcr && "group-hover:text-emerald-500")}>
                추가 등록
              </span>
            </button>
          )}
        </div>
      )}

      {/* Hero Upload Area (when no photos) */}
      {selectedPhotos.length === 0 && (
        <button
          type="button"
          onClick={triggerFileInput}
          className="w-full py-10 flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed dark:border-slate-800 border-slate-200 bg-slate-50/50 dark:bg-slate-900/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
        >
          <div className="p-5 bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border dark:border-slate-700 border-slate-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            {showOcr ? (
              <UploadCloud className="w-10 h-10 text-slate-300 group-hover:text-emerald-500" />
            ) : (
              <UploadCloud className="w-10 h-10 text-slate-300 group-hover:text-indigo-500" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-black dark:text-white text-slate-900">
              {showOcr ? "지능형 서류 촬영 및 텍스트 추출" : "현장 사진 촬영 및 파일 업로드"}
            </p>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
              {maxPhotos}장까지 등록 가능 (JPG, PNG)
            </p>
          </div>
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      <div className="text-[11px] font-bold text-slate-400/80 flex items-center justify-center gap-1.5 pt-1 leading-relaxed text-center px-4">
        {showOcr ? (
          <>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            증빙 서류에서 날짜, 금액, 품목 등의 텍스트 정보를 인공지능이 자동 추출합니다.
          </>
        ) : (
          <>
            <ImageIcon className="w-3.5 h-3.5 shrink-0" />
            현장 사진을 첨부하면 실시간 업무 현황 공유에 큰 도움이 됩니다.
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
