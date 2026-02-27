"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Archive, X, Calendar, CheckCircle2, AlertCircle, Trash2, PlusCircle, History, MessageSquare, ChevronRight } from "lucide-react";

interface Message {
    role: "user" | "bot";
    content: string;
}

interface Insight {
    id: string;
    date: string;
    question: string;
    cause: string;
    action: string;
}

interface ChatHistoryItem {
    id: string;
    date: string;
    firstQuestion: string;
    messages: Message[];
}

const WELCOME_MESSAGE = "반갑습니다, CEO님. 원컨덕터의 경영 의사결정을 지원하는 전략 AI 비서입니다. 자금 현황부터 매입매출, 카드 지출 내역까지 모든 금융 데이터를 심층 분석하여 성장을 위한 핵심 통찰과 리스크 조치 사항을 보고해 드립니다. 어떤 부분을 먼저 검토해 볼까요?";

export default function ChatInterface({ data, salesData, purchaseData, cardData }: any) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [insights, setInsights] = useState<Insight[]>([]);
    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 서버에 히스토리 저장
    const saveToServer = async (msgs: Message[], hist: ChatHistoryItem[], ins: Insight[]) => {
        try {
            await fetch("/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: msgs, history: hist, insights: ins })
            });
        } catch (e) {
            console.error("Failed to save history to server", e);
        }
    };

    // Initial Load from Server (Fall back to localStorage if server fails/empty)
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await fetch("/api/history");
                const serverData = await response.json();

                if (serverData.messages && serverData.messages.length > 0) {
                    setMessages(serverData.messages as Message[]);
                    setHistory(serverData.history || []);
                    setInsights(serverData.insights || []);
                } else {
                    // 서버 데이터가 없으면 localStorage 시도
                    const savedInsights = localStorage.getItem("ceo_insights_v4");
                    if (savedInsights) {
                        try { setInsights(JSON.parse(savedInsights)); } catch (e) { console.error(e); }
                    }

                    const savedHistory = localStorage.getItem("ceo_chat_history_list_v1");
                    if (savedHistory) {
                        try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
                    }

                    const savedChat = localStorage.getItem("ceo_chat_history_v1");
                    if (savedChat) {
                        try {
                            const parsedChat = JSON.parse(savedChat);
                            setMessages(parsedChat.length > 0 ? parsedChat : [{ role: "bot", content: WELCOME_MESSAGE }]);
                        } catch (e) {
                            setMessages([{ role: "bot", content: WELCOME_MESSAGE }]);
                        }
                    } else {
                        setMessages([{ role: "bot", content: WELCOME_MESSAGE }]);
                    }
                }
            } catch (error) {
                console.error("Failed to load history from server, using localStorage fallback", error);
                // 에러 시 localStorage 로드 (기존 로직)
                const savedChat = localStorage.getItem("ceo_chat_history_v1");
                if (savedChat) {
                    try {
                        const parsedChat = JSON.parse(savedChat);
                        setMessages(parsedChat.length > 0 ? parsedChat : [{ role: "bot", content: WELCOME_MESSAGE }]);
                    } catch (e) { setMessages([{ role: "bot", content: WELCOME_MESSAGE }]); }
                } else {
                    setMessages([{ role: "bot", content: WELCOME_MESSAGE }]);
                }
            } finally {
                setHasLoaded(true);
            }
        };

        loadHistory();
    }, []);

    // Periodic & State change Save to Server & LocalStorage
    useEffect(() => {
        if (hasLoaded) {
            // LocalStorage (브라우저 캐시용)
            localStorage.setItem("ceo_insights_v4", JSON.stringify(insights));
            localStorage.setItem("ceo_chat_history_list_v1", JSON.stringify(history));
            localStorage.setItem("ceo_chat_history_v1", JSON.stringify(messages));

            // 서버 저장 (디바운스 처리하여 잦은 요청 방지)
            const timer = setTimeout(() => {
                saveToServer(messages, history, insights);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [insights, history, messages, hasLoaded]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleNewChat = () => {
        if (messages.length > 1) {
            // 현재 대화를 히스토리에 먼저 저장
            const firstUserMsg = messages.find(m => m.role === "user")?.content || "새로운 대화";
            const newHistoryItem: ChatHistoryItem = {
                id: Date.now().toString(),
                date: new Date().toLocaleString("ko-KR"),
                firstQuestion: firstUserMsg,
                messages: [...messages]
            };
            setHistory(prev => [newHistoryItem, ...prev]);
        }

        const initialSet: Message[] = [{ role: "bot", content: WELCOME_MESSAGE }];
        setMessages(initialSet);
    };

    const loadFromHistory = (item: ChatHistoryItem) => {
        if (messages.length > 1) {
            // 현재 대화 저장
            const firstUserMsg = messages.find(m => m.role === "user")?.content || "이전 대화";
            const currentAsHistory: ChatHistoryItem = {
                id: Date.now().toString(),
                date: new Date().toLocaleString("ko-KR"),
                firstQuestion: firstUserMsg,
                messages: [...messages]
            };
            setHistory(prev => [currentAsHistory, ...prev]);
        }
        setMessages(item.messages);
        setHistory(prev => prev.filter(h => h.id !== item.id));
        setShowHistory(false);
    };

    const deleteHistoryItem = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm("이 대화 기록을 삭제하시겠습니까?")) {
            setHistory(prev => prev.filter(h => h.id !== id));
        }
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    context: {
                        cashFlow: data ? [...data].sort((a, b) => new Date(b.거래일자).getTime() - new Date(a.거래일자).getTime()).slice(0, 100) : [],
                        sales: salesData ? [...salesData].sort((a, b) => new Date(b.작성일자).getTime() - new Date(a.작성일자).getTime()).slice(0, 100) : [],
                        purchases: purchaseData ? [...purchaseData].sort((a, b) => new Date(b.작성일자).getTime() - new Date(a.작성일자).getTime()).slice(0, 100) : [],
                        cards: cardData ? [...cardData].sort((a, b) => new Date(b["접수일자/(승인일자)"]).getTime() - new Date(a["접수일자/(승인일자)"]).getTime()).slice(0, 100) : []
                    }
                })
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let botContent = "";

            if (reader) {
                setMessages(prev => [...prev, { role: "bot", content: "" }]);
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    botContent += chunk;
                    setMessages(prev => {
                        const next = [...prev];
                        next[next.length - 1].content = botContent;
                        return next;
                    });
                }

                const jsonRegex = /\[INSIGHT_JSON\]\s*(\{[\s\S]*?\})\s*\[\/INSIGHT_JSON\]/i;
                const match = botContent.match(jsonRegex);
                if (match && match[1]) {
                    try {
                        const parsed = JSON.parse(match[1].trim());
                        const newEntry: Insight = {
                            id: Date.now().toString(),
                            date: new Date().toLocaleString("ko-KR"),
                            question: userMsg,
                            cause: parsed.cause || "분석된 원인이 없습니다.",
                            action: parsed.action || "권장 조치 사항이 없습니다."
                        };
                        setInsights(prev => [newEntry, ...prev]);
                    } catch (e) { console.error(e); }
                }
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: "bot", content: "분석 중 오류가 발생했습니다." }]);
        } finally {
            setLoading(false);
        }
    };

    const cleanDisplay = (text: string) => text.replace(/\[INSIGHT_JSON\][\s\S]*?\[\/INSIGHT_JSON\]/g, "").trim();

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            {/* 상단 바 */}
            <div className="bg-white dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                        <Bot className="text-white" size={20} />
                    </div>
                    <div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-100 block leading-tight">CEO 전략 자문 AI</span>
                        <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">Conductor Insight Engine</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm group"
                    >
                        <History size={14} className="text-slate-500 group-hover:rotate-[-45deg] transition-transform" />
                        기록 ({history.length})
                    </button>
                    <button
                        onClick={handleNewChat}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm group"
                    >
                        <PlusCircle size={14} className="text-emerald-600 group-hover:rotate-90 transition-transform" />
                        새 채팅
                    </button>
                    <button
                        onClick={() => setShowArchive(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm group"
                    >
                        <Archive size={14} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        보관함 ({insights.length})
                    </button>
                </div>
            </div>

            {/* 채팅창 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-4 rounded-2xl text-[13px] max-w-[85%] border shadow-sm ${m.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-none font-bold border-blue-500 shadow-blue-500/20"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border-slate-100 dark:border-slate-700 shadow-slate-200/50"
                            }`}>
                            <div className="whitespace-pre-wrap leading-relaxed prose prose-slate dark:prose-invert max-w-none text-inherit">{cleanDisplay(m.content)}</div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-2 items-center text-slate-500 text-[11px] font-black animate-pulse bg-white/50 dark:bg-slate-800/50 w-fit px-4 py-2 rounded-full border border-slate-100 dark:border-slate-700">
                        <Loader2 className="animate-spin" size={12} />
                        분석 엔진 가동 중...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* 입력창 */}
            <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-3 max-w-4xl mx-auto">
                    <input
                        className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 font-bold transition-all text-sm shadow-inner"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSend()}
                        placeholder="전략적 자문이 필요한 경영 지표를 입력하세요..."
                    />
                    <button onClick={handleSend} className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all">
                        <Send size={20} />
                    </button>
                </div>
            </div>

            {/* 대화 히스토리 패널 */}
            {showHistory && (
                <div className="absolute inset-0 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl z-[60] flex flex-col p-6 animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl"><History className="text-slate-600" size={24} /></div>
                            <h2 className="text-xl font-black">대화 히스토리</h2>
                        </div>
                        <button onClick={() => setShowHistory(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border border-transparent hover:border-slate-200"><X /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 px-2">
                        {history.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-slate-400 opacity-40">
                                <History size={64} className="mb-4" />
                                <p className="text-xl font-black italic">저장된 이전 대화가 없습니다.</p>
                            </div>
                        ) : (
                            history.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => loadFromHistory(item)}
                                    className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer flex justify-between items-center"
                                >
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 mb-1 tracking-wider uppercase">
                                            <Calendar size={12} className="text-blue-500" /> {item.date}
                                        </div>
                                        <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 truncate flex items-center gap-2">
                                            <MessageSquare size={14} className="text-emerald-500 shrink-0" />
                                            {item.firstQuestion}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => deleteHistoryItem(e, item.id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        <ChevronRight size={16} className="text-slate-300" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* 인사이트 보관함 패널 */}
            {showArchive && (
                <div className="absolute inset-0 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl z-50 flex flex-col p-6 animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl"><Archive className="text-blue-600" size={24} /></div>
                            <h2 className="text-xl font-black">인사이트 보관함</h2>
                        </div>
                        <button onClick={() => setShowArchive(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border border-transparent hover:border-slate-200"><X /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-6 px-2">
                        {insights.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-slate-400 opacity-40">
                                <Archive size={64} className="mb-4" />
                                <p className="text-xl font-black italic">저장된 데이터 엔진 통찰이 없습니다.</p>
                            </div>
                        ) : (
                            insights.map(item => (
                                <div key={item.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setInsights(prev => prev.filter(i => i.id !== item.id))} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 mb-4 tracking-widest uppercase">
                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-blue-500" /> {item.date}</span>
                                        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded">Insight Report</span>
                                    </div>
                                    <h3 className="text-lg font-black mb-6 text-slate-800 dark:text-slate-100 leading-snug pr-8">{item.question}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-orange-50/50 dark:bg-orange-900/10 p-5 rounded-3xl border border-orange-100/50 dark:border-orange-800/30">
                                            <p className="text-[10px] font-black text-orange-600 mb-2 flex items-center gap-1.5 uppercase tracking-tighter"><AlertCircle size={14} /> Critical Cause</p>
                                            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{item.cause}</p>
                                        </div>
                                        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-5 rounded-3xl border border-emerald-100/50 dark:border-emerald-800/30">
                                            <p className="text-[10px] font-black text-emerald-600 mb-2 flex items-center gap-1.5 uppercase tracking-tighter"><CheckCircle2 size={14} /> Action Plan</p>
                                            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{item.action}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
