"use client";

import React, { useState, useEffect } from "react";
import {
    Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import {
    LayoutDashboard, Users, DollarSign, TrendingUp,
    Settings, Bell, Search, ChevronDown, ArrowUpRight, ArrowDownRight,
    Database, RefreshCcw, Landmark, Wallet, ArrowUpCircle, ArrowDownCircle, CreditCard, MessageSquare
} from "lucide-react";
import { SheetTransaction, SalesData, PurchaseData, CardUsageData } from "@/lib/googleSheets";
import ChatInterface from "./ChatInterface";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

// Date & Time formatting helpers
const formatDate = (val: string) => {
    if (!val) return "";
    const date = new Date(val);
    if (isNaN(date.getTime())) return val;
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
};

const formatTime = (val: string) => {
    if (!val) return "";
    const date = new Date(val);
    if (isNaN(date.getTime())) return val;
    return date.toLocaleTimeString('en-GB', { hour12: false }); // HH:mm:ss
};

const formatCurrency = (amount: number) => {
    return (
        <span className="inline-flex items-baseline">
            <span className="font-extralight mr-0.5">₩</span>
            <span>{Math.round(amount).toLocaleString()}</span>
        </span>
    );
};

interface DashboardClientProps {
    initialData: SheetTransaction[] | null;
    initialSalesData: SalesData[] | null;
    initialPurchaseData: PurchaseData[] | null;
    initialCardData: CardUsageData[] | null;
}

export default function DashboardClient({ initialData, initialSalesData, initialPurchaseData, initialCardData }: DashboardClientProps) {
    const [data, setData] = useState<SheetTransaction[] | null>(initialData);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [currentView, setCurrentView] = useState<"dashboard" | "sales" | "card" | "settings" | "chat">("dashboard");
    const [limits, setLimits] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(435); // 7분 15초 = 435초
    const [salesData, setSalesData] = useState<SalesData[] | null>(initialSalesData);
    const [purchaseData, setPurchaseData] = useState<PurchaseData[] | null>(initialPurchaseData);
    const [cardData, setCardData] = useState<CardUsageData[] | null>(initialCardData);

    useEffect(() => {
        setMounted(true);
        const savedLimits = localStorage.getItem('accountLimits');
        if (savedLimits) {
            try {
                setLimits(JSON.parse(savedLimits));
            } catch (e) {
                console.error("Failed to parse limits", e);
            }
        }

        // 1초마다 카운트다운
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // AI 채팅 분석 뷰인 경우에는 자동 새로고침 방지
                    if (currentView === "chat") {
                        console.log("Chat in progress, skipping auto-refresh.");
                        return 435; // 타이머 초기화만 하고 새로고침은 안함
                    }
                    window.location.reload();
                    return 435;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Sales & Purchase Statistics Calculation
    const salesPurchaseStats = (() => {
        const now = new Date();
        const thisYear = now.getFullYear();
        const thisMonth = now.getMonth();

        const sData = salesData || [];
        const pData = purchaseData || [];
        const cData = cardData || [];

        const thisMonthSales = sData.filter(d => {
            const date = new Date(d.작성일자);
            return !isNaN(date.getTime()) && date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        }).reduce((acc, curr) => acc + (Number(curr.합계금액) || 0), 0);

        const thisYearSales = sData.filter(d => {
            const date = new Date(d.작성일자);
            return !isNaN(date.getTime()) && date.getFullYear() === thisYear;
        }).reduce((acc, curr) => acc + (Number(curr.합계금액) || 0), 0);

        const thisMonthPurchase = pData.filter(d => {
            const date = new Date(d.작성일자);
            return !isNaN(date.getTime()) && date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        }).reduce((acc, curr) => acc + (Number(curr.합계금액) || 0), 0);

        const thisYearPurchase = pData.filter(d => {
            const date = new Date(d.작성일자);
            return !isNaN(date.getTime()) && date.getFullYear() === thisYear;
        }).reduce((acc, curr) => acc + (Number(curr.합계금액) || 0), 0);

        const thisMonthCard = cData.filter(d => {
            const date = new Date(d["접수일자/(승인일자)"]);
            return !isNaN(date.getTime()) && date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        }).reduce((acc, curr) => acc + (Number(curr.이용금액) || 0), 0);

        const thisYearCard = cData.filter(d => {
            const date = new Date(d["접수일자/(승인일자)"]);
            return !isNaN(date.getTime()) && date.getFullYear() === thisYear;
        }).reduce((acc, curr) => acc + (Number(curr.이용금액) || 0), 0);

        return { thisMonthSales, thisYearSales, thisMonthPurchase, thisYearPurchase, thisMonthCard, thisYearCard };
    })();

    // 남은 시간 포맷팅 (M분 S초)
    const formatTimeLeft = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}분 ${s}초`;
    };

    const handleSaveLimit = (accountNumber: string, limit: number) => {
        const newLimits = { ...limits, [accountNumber]: limit };
        setLimits(newLimits);
        localStorage.setItem('accountLimits', JSON.stringify(newLimits));
    };

    const handleRefresh = () => {
        setLoading(true);
        window.location.reload();
    };

    if (!mounted) return null;

    // 1. 통계 계산 (기존 로직 유지하며 가용 자금에 한도 포함)
    const currentBalanceCalc = (() => {
        const latestBalances: Record<string, number> = {};
        const reversedData = [...(data || [])].reverse();
        reversedData.forEach(item => {
            if (item.계좌번호 && latestBalances[item.계좌번호] === undefined) {
                latestBalances[item.계좌번호] = Number(item.잔액) || 0;
            }
        });
        return Object.values(latestBalances).reduce((a, b) => a + b, 0);
    })();

    const totalLimit = Object.values(limits).reduce((a, b) => a + b, 0);

    const stats = {
        monthlyDeposit: data?.reduce((acc, curr) => {
            const date = new Date(curr.거래일자);
            const now = new Date();
            if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                return acc + (Number(curr.입금) || 0);
            }
            return acc;
        }, 0) || 0,
        monthlyWithdraw: data?.reduce((acc, curr) => {
            const date = new Date(curr.거래일자);
            const now = new Date();
            if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                return acc + (Number(curr.출금) || 0);
            }
            return acc;
        }, 0) || 0,
        currentBalance: currentBalanceCalc,
        availableLiquidity: currentBalanceCalc + totalLimit
    };

    // 2. 계좌별 잔액 비중 계산 (최신 계좌 목록 추출)
    const accountList = (() => {
        const accs: Record<string, { bank: string, alias: string, number: string, balance: number }> = {};
        [...(data || [])].reverse().forEach(item => {
            if (item.계좌번호 && !accs[item.계좌번호]) {
                accs[item.계좌번호] = {
                    bank: item.은행,
                    alias: item.계좌별칭,
                    number: item.계좌번호,
                    balance: Number(item.잔액) || 0
                };
            }
        });
        return Object.values(accs).sort((a, b) => b.balance - a.balance);
    })();

    const pieData = accountList.map(acc => ({
        name: acc.alias || `${acc.bank} (${acc.number.slice(-4)})`,
        value: acc.balance,
        alias: acc.alias,
        number: acc.number,
        bank: acc.bank
    }));


    // 3. 입출금 내역 그룹화 (오늘, 어제, 2일전...)
    const groupTransactions = (items: SheetTransaction[]) => {
        const groups: Record<string, { items: SheetTransaction[], subTotal: number }> = {};

        items.forEach(item => {
            const date = formatDate(item.거래일자);
            if (!groups[date]) {
                groups[date] = { items: [], subTotal: 0 };
            }
            groups[date].items.push(item);
            groups[date].subTotal += (Number(item.입금) || 0) + (Number(item.출금) || 0);
        });

        return Object.entries(groups)
            .sort((a, b) => b[0].localeCompare(a[0])) // 최신 날짜순
            .slice(0, 5); // 최근 5일치만 표시
    };

    const deposits = data?.filter(item => (Number(item.입금) || 0) > 0) || [];
    const withdrawals = data?.filter(item => (Number(item.출금) || 0) > 0) || [];

    const depositGroups = groupTransactions(deposits);
    const withdrawalGroups = groupTransactions(withdrawals);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">CEO 대시보드</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <button onClick={() => setCurrentView("dashboard")} className="w-full text-left">
                        <NavItem icon={<Wallet size={20} />} label="자금 현황" active={currentView === "dashboard"} />
                    </button>
                    <button onClick={() => setCurrentView("sales")} className="w-full text-left">
                        <NavItem icon={<TrendingUp size={20} />} label="매입/매출 현황" active={currentView === "sales"} />
                    </button>
                    <button onClick={() => setCurrentView("card")} className="w-full text-left">
                        <NavItem icon={<CreditCard size={20} />} label="법인카드 사용현황" active={currentView === "card"} />
                    </button>
                    <button onClick={() => setCurrentView("chat")} className="w-full text-left">
                        <NavItem icon={<MessageSquare size={20} />} label="AI 채팅 분석" active={currentView === "chat"} />
                    </button>
                    <button onClick={() => setCurrentView("settings")} className="w-full text-left">
                        <NavItem icon={<Settings size={20} />} label="설정" active={currentView === "settings"} />
                    </button>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col min-w-0">

                <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                    <div className={currentView === "dashboard" ? "block" : "hidden"}>
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">자금 현황</h2>
                            </div>
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-70"
                            >
                                <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                                {loading ? "업데이트 중..." : `${formatTimeLeft(timeLeft)} 후 업데이트`}
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                label="가용 자금"
                                value={formatCurrency(stats.availableLiquidity)}
                                icon={<Landmark className="text-blue-500" />}
                                color="blue"
                            />
                            <StatCard
                                label="이번 달 입금액"
                                value={formatCurrency(stats.monthlyDeposit)}
                                icon={<ArrowUpCircle className="text-emerald-500" />}
                                color="emerald"
                            />
                            <StatCard
                                label="이번 달 출금액"
                                value={formatCurrency(stats.monthlyWithdraw)}
                                icon={<ArrowDownCircle className="text-rose-500" />}
                                color="rose"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-8 rounded-2xl shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold text-xl">계좌별 잔액 비중</h3>
                                    <div className="flex gap-2 shrink-0 overflow-x-auto pb-2">
                                        {pieData.map((item, i) => (
                                            <div key={item.number} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 whitespace-nowrap">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                                <span className="text-[11px] font-bold text-slate-500 tracking-tight">{item.alias || item.bank}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                                    <div className="h-[350px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={100}
                                                    outerRadius={140}
                                                    paddingAngle={8}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    label={({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, percent = 0, index = 0 }) => {
                                                        const RADIAN = Math.PI / 180;
                                                        const radius = outerRadius + 30;
                                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                                        return (
                                                            <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[11px] font-bold">
                                                                {`${pieData[index].name}: ₩${pieData[index].value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`}
                                                            </text>
                                                        );
                                                    }}
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', padding: '12px' }}
                                                    itemStyle={{ color: '#F8FAFC', fontWeight: 'bold' }}
                                                    labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontSize: '12px' }}
                                                    formatter={(val: number | string | undefined) => val !== undefined ? `₩${Number(val).toLocaleString()}` : ""}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-4">
                                        {pieData.map((item, i) => {
                                            const percentage = (item.value / stats.currentBalance) * 100;
                                            return (
                                                <div key={item.number} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                                            <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{item.bank} <span className="text-slate-400 font-medium ml-1">{item.number}</span></span>
                                                        </div>
                                                        <span className="text-sm font-bold text-blue-600">{percentage.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.alias || "별칭 없음"}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold">{formatCurrency(item.value)}</p>
                                                            {limits[item.number] > 0 && (
                                                                <p className="text-[10px] text-rose-500 font-bold">한도: {formatCurrency(limits[item.number])}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <ArrowUpCircle className="text-emerald-500" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold">입금 내역</h3>
                                </div>
                                {depositGroups.map(([date, group]) => (
                                    <div key={date} className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                            <span className="font-bold text-blue-600">{date}</span>
                                            <div className="text-right">
                                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mr-2">입금 소계</span>
                                                <span className="font-bold text-emerald-600">{formatCurrency(group.subTotal)}</span>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {group.items.map((row, idx) => (
                                                <TransactionRow key={idx} row={row} type="deposit" />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-rose-500/10 rounded-lg">
                                        <ArrowDownCircle className="text-rose-500" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold">출금 내역</h3>
                                </div>
                                {withdrawalGroups.map(([date, group]) => (
                                    <div key={date} className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                            <span className="font-bold text-blue-600">{date}</span>
                                            <div className="text-right">
                                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mr-2">출금 소계</span>
                                                <span className="font-bold text-rose-600">{formatCurrency(group.subTotal)}</span>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {group.items.map((row, idx) => (
                                                <TransactionRow key={idx} row={row} type="withdrawal" />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={currentView === "sales" ? "block" : "hidden"}>
                        <div className="max-w-6xl">
                            <h2 className="text-3xl font-bold mb-8">매출/매입 현황</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard label="이번 달 매출" value={formatCurrency(salesPurchaseStats.thisMonthSales)} icon={<TrendingUp className="text-blue-500" />} color="blue" />
                                <StatCard label="올해 매출" value={formatCurrency(salesPurchaseStats.thisYearSales)} icon={<TrendingUp className="text-emerald-500" />} color="emerald" />
                                <StatCard label="이번 달 매입" value={formatCurrency(salesPurchaseStats.thisMonthPurchase)} icon={<ArrowDownCircle className="text-rose-500" />} color="rose" />
                                <StatCard label="올해 매입" value={formatCurrency(salesPurchaseStats.thisYearPurchase)} icon={<ArrowDownCircle className="text-amber-500" />} color="amber" />
                            </div>

                            {(!salesData || !purchaseData) ? (
                                <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[400px] mb-8">
                                    <Database className="text-slate-200 dark:text-slate-800 mb-4" size={64} />
                                    <h3 className="text-xl font-bold mb-2">데이터 연동 대기 중</h3>
                                    <p className="text-slate-500 text-center max-w-md">
                                        스프레드시트에서 데이터를 불러오기 위해 매출 및 매입용 GAS URL 설정이 필요합니다.
                                    </p>
                                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-400 max-w-lg">
                                        .env.local 파일에 SALES 및 PURCHASE 전용 GAS URL을 모두 등록했는지 확인해주세요.
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    {/* Sales Table */}
                                    <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-blue-50/30 dark:bg-blue-900/10">
                                            <h3 className="font-bold text-lg flex items-center gap-2">
                                                <TrendingUp size={20} className="text-blue-500" />
                                                최근 매출 내역
                                            </h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">날짜</th>
                                                        <th className="px-6 py-4">거래처</th>
                                                        <th className="px-6 py-4 text-right">금액</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                    {salesData.slice(0, 15).map((row, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                                                            <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">{formatDate(row.작성일자)}</td>
                                                            <td className="px-6 py-4 font-medium truncate max-w-[150px]">{row.공급받는자상호}</td>
                                                            <td className="px-6 py-4 text-right font-bold text-blue-600">{formatCurrency(row.합계금액)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Purchase Table */}
                                    <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-rose-50/30 dark:bg-rose-900/10">
                                            <h3 className="font-bold text-lg flex items-center gap-2">
                                                <ArrowDownCircle size={20} className="text-rose-500" />
                                                최근 매입 내역
                                            </h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 font-bold">
                                                    <tr>
                                                        <th className="px-6 py-4">날짜</th>
                                                        <th className="px-6 py-4">공급자</th>
                                                        <th className="px-6 py-4 text-right">금액</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                    {purchaseData.slice(0, 15).map((row, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                                                            <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">{formatDate(row.작성일자)}</td>
                                                            <td className="px-6 py-4 font-medium truncate max-w-[150px]">{row.공급자상호}</td>
                                                            <td className="px-6 py-4 text-right font-bold text-rose-600">{formatCurrency(row.합계금액)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={currentView === "card" ? "block" : "hidden"}>
                        <div className="max-w-6xl">
                            <h2 className="text-3xl font-bold mb-8">법인카드 사용현황</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <StatCard label="이번 달 카드 사용" value={formatCurrency(salesPurchaseStats.thisMonthCard)} icon={<CreditCard className="text-blue-500" />} color="blue" />
                                <StatCard label="올해 카드 사용" value={formatCurrency(salesPurchaseStats.thisYearCard)} icon={<CreditCard className="text-indigo-500" />} color="indigo" />
                            </div>

                            {(!cardData) ? (
                                <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-8 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[400px] mb-8">
                                    <Database className="text-slate-200 dark:text-slate-800 mb-4" size={64} />
                                    <h3 className="text-xl font-bold mb-2">카드 데이터 연동 대기 중</h3>
                                    <p className="text-slate-500 text-center max-w-md">
                                        스프레드시트에서 데이터를 불러오기 위해 법인카드용 GAS URL 설정이 필요합니다.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-blue-50/30 dark:bg-blue-900/10">
                                        <h3 className="font-bold text-lg flex items-center gap-2">
                                            <CreditCard size={20} className="text-blue-500" />
                                            최근 카드 사용 내역
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 font-bold">
                                                <tr>
                                                    <th className="px-6 py-4">승인일자</th>
                                                    <th className="px-6 py-4">가맹점명</th>
                                                    <th className="px-6 py-4 text-center">사용자</th>
                                                    <th className="px-6 py-4 text-right">이용금액</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {cardData.slice(0, 50).map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                                                        <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">{formatDate(row["접수일자/(승인일자)"])}</td>
                                                        <td className="px-6 py-4 font-medium truncate max-w-[200px]">{row["가맹점명/국가명(도시명)"]}</td>
                                                        <td className="px-6 py-4 text-center">{row.카드소지자}</td>
                                                        <td className="px-6 py-4 text-right font-bold text-blue-600">{formatCurrency(row.이용금액)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={currentView === "chat" ? "block" : "hidden"}>
                        <div className="max-w-6xl">
                            <h2 className="text-3xl font-bold mb-8">AI 채팅 분석</h2>
                            <ChatInterface data={data} salesData={salesData} purchaseData={purchaseData} cardData={cardData} />
                        </div>
                    </div>

                    <div className={currentView === "settings" ? "block" : "hidden"}>
                        <div className="max-w-4xl">
                            <h2 className="text-3xl font-bold mb-8">계좌별 한도 설정</h2>
                            <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                    <h3 className="font-bold text-lg">마이너스 한도 설정</h3>
                                    <p className="text-slate-500 text-sm mt-1">계좌별 마이너스 통장 한도를 입력하면 가용 자금에 합산되어 표시됩니다.</p>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {accountList.map((acc) => (
                                        <div key={acc.number} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{acc.bank}</span>
                                                    <span className="text-xs text-slate-400 font-medium">{acc.number}</span>
                                                </div>
                                                <p className="text-sm font-bold text-blue-600 mt-0.5">{acc.alias || "별칭 없음"}</p>
                                                <p className="text-xs text-slate-400 mt-1">현재 잔액: ₩{acc.balance.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="text-xs font-bold text-slate-500 whitespace-nowrap">한도액 (₩)</label>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={limits[acc.number] || ""}
                                                    onChange={(e) => handleSaveLimit(acc.number, Number(e.target.value))}
                                                    className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-sm font-bold w-40 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setCurrentView("dashboard")}
                                    className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                                >
                                    자금현황으로 돌아가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function TransactionRow({ row, type }: { row: SheetTransaction, type: "deposit" | "withdrawal" }) {
    return (
        <div className="px-6 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                    <p className="text-[10px] text-slate-400 font-bold">{formatTime(row.거래시간)}</p>
                </div>
                <div>
                    <p className="font-bold text-sm">{row.적요1}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{row.은행} | {row.계좌별칭 || row.계좌번호}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold text-base ${type === "deposit" ? "text-emerald-600" : "text-rose-600"}`}>
                    {type === "deposit" ? `+₩${Number(row.입금).toLocaleString()}` : `-₩${Number(row.출금).toLocaleString()}`}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">잔액 ₩{Number(row.잔액).toLocaleString()}</p>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${active
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"}
    `}>
            {icon}
            <span className="font-semibold text-sm">{label}</span>
        </div>
    );
}

function StatCard({ label, value, icon, color }: {
    label: string, value: React.ReactNode, icon: React.ReactNode, color: string
}) {
    const colorMap: Record<string, string> = {
        emerald: "bg-emerald-500/10 text-emerald-500",
        rose: "bg-rose-500/10 text-rose-500",
        blue: "bg-blue-500/10 text-blue-500",
        amber: "bg-amber-500/10 text-amber-500"
    };

    return (
        <div className="bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-3 w-fit rounded-xl ${colorMap[color]} mb-4`}>
                {icon}
            </div>
            <p className="text-slate-500 text-sm font-medium">{label}</p>
            <h4 className="text-2xl font-bold mt-1 tracking-tight">{value}</h4>
        </div>
    );
}
