import React, { useState } from 'react';
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateInstallmentSavings,
  compareDepositAndSavings,
  calculateDemandDepositInterest,
  formatWon,
  formatManWon,
} from '../../../utils/finance';
import {
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Sparkles,
  RotateCcw,
  PlusCircle,
  MinusCircle,
  History,
  Scale,
  CheckCircle2,
  AlertCircle,
  Building2,
  HelpCircle,
} from 'lucide-react';

interface Page02Props {
  resetSignal: number;
}

interface TransactionLog {
  id: number;
  type: 'deposit' | 'withdraw';
  amountWon: number;
  balanceWon: number;
  description: string;
  timeText: string;
}

export const Page02DepositSavings: React.FC<Page02Props> = ({ resetSignal }) => {
  // Main simulator mode: demand (보통예금), time (정기예금), installment (정기적금), compare (정기예금 vs 정기적금)
  const [activeTab, setActiveTab] = useState<'demand' | 'time' | 'installment' | 'compare'>('demand');

  // --- A. 보통예금 State ---
  const [demandBalance, setDemandBalance] = useState<number>(1000000); // 초기 잔액 100만 원
  const [demandRate, setDemandRate] = useState<number>(0.5); // 연 0.5%
  const [demandDays, setDemandDays] = useState<number>(30); // 30일 거치 기준
  const [transactions, setTransactions] = useState<TransactionLog[]>([
    {
      id: 1,
      type: 'deposit',
      amountWon: 1000000,
      balanceWon: 1000000,
      description: '초기 급여/용돈 입금',
      timeText: '09:00',
    },
  ]);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  // --- B. 정기예금 State ---
  const [timePrincipalMan, setTimePrincipalMan] = useState<number>(100); // 100만 원
  const [timeAnnualRate, setTimeAnnualRate] = useState<number>(5.0); // 5.0%
  const [timeDurationYears, setTimeDurationYears] = useState<number>(1); // 1년
  const [timeTaxMode, setTimeTaxMode] = useState<'preTax' | 'postTax'>('preTax');

  // --- C. 정기적금 State ---
  const [instMonthlyMan, setInstMonthlyMan] = useState<number>(10); // 월 10만 원
  const [instAnnualRate, setInstAnnualRate] = useState<number>(4.0); // 연 4.0%
  const [instMonths, setInstMonths] = useState<number>(12); // 12개월
  const [instTaxMode, setInstTaxMode] = useState<'preTax' | 'postTax'>('preTax');

  // --- D. 비교 State ---
  const [compareTotalMan, setCompareTotalMan] = useState<number>(120); // 총 120만 원
  const [compareRate, setCompareRate] = useState<number>(4.0); // 연 4.0%
  const [compareMonths, setCompareMonths] = useState<number>(12); // 12개월

  // --- Bottom Protection & Quiz State ---
  const [showProtectionInfo, setShowProtectionInfo] = useState<boolean>(false);
  const [showSameBankQuiz, setShowSameBankQuiz] = useState<boolean>(false);

  React.useEffect(() => {
    setActiveTab('demand');
    setDemandBalance(1000000);
    setDemandRate(0.5);
    setDemandDays(30);
    setTransactions([
      {
        id: 1,
        type: 'deposit',
        amountWon: 1000000,
        balanceWon: 1000000,
        description: '초기 급여/용돈 입금',
        timeText: '09:00',
      },
    ]);
    setWithdrawError(null);

    setTimePrincipalMan(100);
    setTimeAnnualRate(5.0);
    setTimeDurationYears(1);
    setTimeTaxMode('preTax');

    setInstMonthlyMan(10);
    setInstAnnualRate(4.0);
    setInstMonths(12);
    setInstTaxMode('preTax');

    setCompareTotalMan(120);
    setCompareRate(4.0);
    setCompareMonths(12);

    setShowProtectionInfo(false);
    setShowSameBankQuiz(false);
  }, [resetSignal]);

  // A. 보통예금 입출금 핸들러
  const handleDeposit = (amountWon: number, desc: string) => {
    const newBalance = demandBalance + amountWon;
    setDemandBalance(newBalance);
    setWithdrawError(null);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: 'deposit',
        amountWon,
        balanceWon: newBalance,
        description: desc,
        timeText: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleWithdraw = (amountWon: number, desc: string) => {
    if (amountWon > demandBalance) {
      setWithdrawError(`잔액 부족: 현재 잔액(${formatWon(demandBalance)})보다 큰 금액(${formatWon(amountWon)})은 출금할 수 없습니다!`);
      return;
    }
    const newBalance = demandBalance - amountWon;
    setDemandBalance(newBalance);
    setWithdrawError(null);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: 'withdraw',
        amountWon,
        balanceWon: newBalance,
        description: desc,
        timeText: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      },
      ...prev.slice(0, 9),
    ]);
  };

  // Calculations
  const demandInterest = calculateDemandDepositInterest(demandBalance, demandRate, demandDays);
  const timePrincipalWon = timePrincipalMan * 10000;
  const simpleTimeResult = calculateSimpleInterest(timePrincipalWon, timeAnnualRate, timeDurationYears);
  const compoundTimeResult = calculateCompoundInterest(timePrincipalWon, timeAnnualRate, timeDurationYears);

  const instMonthlyWon = instMonthlyMan * 10000;
  const instResult = calculateInstallmentSavings(instMonthlyWon, instAnnualRate, instMonths);

  const compareResult = compareDepositAndSavings(compareTotalMan * 10000, compareRate, compareMonths);

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <PiggyBank className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 2차시 / 은행 예금의 본질과 분류</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "예금의 종류 — 요구불예금과 저축성예금"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          수시로 입출금하는 요구불예금과 이자를 목적으로 돈을 묶어두는 저축성예금의 구조를 체험해 봅시다.
        </p>
      </div>

      {/* Visual Classification Hierarchy Tree Banner */}
      <div className="bg-white rounded-2xl p-3 border-2 border-slate-200 shadow-xs my-1">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-600" />
            예금의 2대 분류 체계 (고1 교과서 표준)
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            ※ 요구불예금도 소액 이자가 발생할 수 있으며, 실제 금리는 상품별로 다릅니다.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* 1. 요구불예금 (Demand Deposit) */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-blue-900 text-sm">① 요구불예금 (Demand Deposit)</span>
              <span className="px-2 py-0.5 bg-blue-200/80 text-blue-800 rounded text-[10px] font-bold">
                언제든 자유 입출금
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
              예금자가 원할 때 언제든지 찾아 쓸 수 있는 결제성 예금입니다. (유동성 최고, 금리 연 0.1~1.0% 수준)
            </p>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              <div className="bg-white p-1.5 rounded-lg border border-blue-100">
                <strong className="text-blue-800 block text-[11px]">보통예금 (대표)</strong>
                <span className="text-[10px] text-slate-500">월급 통장, 체크카드 결제, 계좌이체</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-blue-100">
                <strong className="text-slate-800 block text-[11px]">당좌예금</strong>
                <span className="text-[10px] text-slate-500">주로 사업자의 수표·어음 지급 결제</span>
              </div>
            </div>
          </div>

          {/* 2. 저축성예금 (Time & Savings Deposit) */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-emerald-900 text-sm">② 저축성예금 (Time Deposit)</span>
              <span className="px-2 py-0.5 bg-emerald-200/80 text-emerald-800 rounded text-[10px] font-bold">
                목돈 형성 및 이자 수익
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
              일정 기간 돈을 맡겨두고 약정된 높은 이자를 받는 목적이 강한 예금입니다. (중도 해지 시 약정금리 감소)
            </p>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                <strong className="text-emerald-800 block text-[11px]">정기예금 (목돈 굴리기)</strong>
                <span className="text-[10px] text-slate-500">목돈을 한 번에 맡겨두고 만기에 수령</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                <strong className="text-indigo-800 block text-[11px]">정기적금 (목돈 만들기)</strong>
                <span className="text-[10px] text-slate-500">매달 정해진 날에 일정액을 나누어 불입</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Mode Tabs */}
      <div className="flex items-center justify-center gap-2 my-1">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 shadow-inner text-xs font-bold">
          <button
            onClick={() => setActiveTab('demand')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'demand' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ① 보통예금 (자유 입출금 실습)
          </button>
          <button
            onClick={() => setActiveTab('time')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'time' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ② 정기예금 (목돈 굴리기)
          </button>
          <button
            onClick={() => setActiveTab('installment')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'installment' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ③ 정기적금 (매달 모으기)
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'compare' ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>정기예금 vs 정기적금 비교</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage for Selected Simulator */}
      <div className="flex-1 my-1">
        {/* ================= TAB 1: 보통예금 시뮬레이터 ================= */}
        {activeTab === 'demand' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full items-stretch">
            {/* Left 6 cols: Operations (Deposit / Withdraw buttons) */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-600" />
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      보통예금 통장 조작기 (월급 통장 가상 체험)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    수시 입출금
                  </span>
                </div>

                {/* Big Balance Card */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-xs text-blue-200 font-bold block">현재 통장 잔액 (Current Balance)</span>
                    <div className="text-3xl font-black font-mono mt-0.5">{formatWon(demandBalance)}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-blue-300 block">적용 금리 (교육용)</span>
                    <span className="text-sm font-black text-amber-300 font-mono">연 {demandRate}%</span>
                  </div>
                </div>

                {withdrawError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                {/* Deposit Controls */}
                <div>
                  <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <PlusCircle className="w-4 h-4 text-emerald-600" />
                    <span>통장에 입금하기 (Deposit):</span>
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleDeposit(50000, '알바비/용돈')}
                      className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      +5만 원
                    </button>
                    <button
                      onClick={() => handleDeposit(100000, '중고물품 판매')}
                      className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      +10만 원
                    </button>
                    <button
                      onClick={() => handleDeposit(300000, '성과급 보너스')}
                      className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      +30만 원
                    </button>
                    <button
                      onClick={() => handleDeposit(500000, '월급 수령 입금')}
                      className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      +50만 원
                    </button>
                  </div>
                </div>

                {/* Withdraw Controls */}
                <div>
                  <span className="text-xs font-extrabold text-rose-800 flex items-center gap-1 mb-1.5">
                    <MinusCircle className="w-4 h-4 text-rose-600" />
                    <span>통장에서 출금/결제하기 (Withdraw):</span>
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleWithdraw(30000, '편의점/식비 결제')}
                      className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      -3만 원
                    </button>
                    <button
                      onClick={() => handleWithdraw(100000, '친구 계좌이체/쇼핑')}
                      className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      -10만 원
                    </button>
                    <button
                      onClick={() => handleWithdraw(300000, '자취방 월세 이체')}
                      className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      -30만 원
                    </button>
                    <button
                      onClick={() => handleWithdraw(500000, '등록금/비상금 출금')}
                      className="py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      -50만 원
                    </button>
                  </div>
                </div>
              </div>

              {/* Classroom Teaching Prompt */}
              <div className="mt-3 p-3 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1">
                <strong className="text-blue-900 font-bold block flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  교사용 발문 질문:
                </strong>
                <p className="leading-relaxed">
                  "왜 우리는 월급 통장이나 생활비 통장으로 정기예금이 아니라 <strong>보통예금</strong>을 사용할까요?"
                </p>
                <p className="text-[11px] text-slate-600">
                  👉 <strong>정답:</strong> 편의점에서 결제하거나 친구에게 이체할 때 수시로 돈을 빼 쓸 수 있는 '유동성'이 가장 중요하기 때문입니다.
                </p>
              </div>
            </div>

            {/* Right 6 cols: Live Transaction History & Interest Calc */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300">실시간 통장 거래 내역 (최근 10건)</span>
                  <span className="text-[10px] text-slate-400">총 {transactions.length}회 거래</span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 my-2.5 pr-1">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${tx.type === 'deposit' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        <div>
                          <span className="font-bold text-slate-200 block">{tx.description}</span>
                          <span className="text-[10px] text-slate-400">{tx.timeText}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-bold ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tx.type === 'deposit' ? '+' : '-'}{formatWon(tx.amountWon)}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">잔액 {formatWon(tx.balanceWon)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estimated Interest Info */}
                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>현재 잔액 기준 30일간 유지 시 예상 세전 이자:</span>
                    <span className="text-amber-300 font-mono font-bold text-sm">+{formatWon(demandInterest.preTaxInterest)}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    ※ 교육용 단순 계산입니다. 실제 은행은 매일의 최종 잔액에 대해 일할 계산하여 정해진 결산일에 지급합니다.
                  </p>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                <span>보통예금 특징: 자유 입출금 보장</span>
                <span className="text-blue-400 font-bold">수익성보다 유동성 중심</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: 정기예금 시뮬레이터 ================= */}
        {activeTab === 'time' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full items-stretch">
            {/* Left 6 cols: Parameters */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      정기예금 시뮬레이터 (목돈 일시 거치)
                    </span>
                  </div>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                    <button
                      onClick={() => setTimeTaxMode('preTax')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${timeTaxMode === 'preTax' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                    >
                      세전 이자
                    </button>
                    <button
                      onClick={() => setTimeTaxMode('postTax')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${timeTaxMode === 'postTax' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'}`}
                    >
                      세후 (15.4% 공제)
                    </button>
                  </div>
                </div>

                {/* Principal */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs font-bold">
                    <span className="text-slate-600">예금 원금 (Principal):</span>
                    <span className="text-indigo-700 font-mono text-base font-extrabold">{formatManWon(timePrincipalMan)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[100, 300, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setTimePrincipalMan(amt)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          timePrincipalMan === amt ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {amt}만 원
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs font-bold">
                    <span className="text-slate-600">연 금리 (Interest Rate):</span>
                    <span className="text-amber-700 font-mono text-base font-extrabold">연 {timeAnnualRate.toFixed(1)}%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[3.0, 4.0, 5.0, 7.0].map((r) => (
                      <button
                        key={r}
                        onClick={() => setTimeAnnualRate(r)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          timeAnnualRate === r ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        연 {r}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs font-bold">
                    <span className="text-slate-600">예치 기간 (Maturity Period):</span>
                    <span className="text-emerald-700 font-mono text-base font-extrabold">{timeDurationYears}년 만기</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 5, 10].map((y) => (
                      <button
                        key={y}
                        onClick={() => setTimeDurationYears(y)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          timeDurationYears === y ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {y}년
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                <strong className="text-slate-800 font-bold block mb-0.5">💡 단리 vs 복리 공식:</strong>
                단리 = 원금 × 연이율 × 기간 / 연복리 = 원금 × (1 + 연이율)^기간
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ※ 복리는 교육용 가정이며, 모든 정기예금이 복리로 지급되는 것은 아닙니다.
                </span>
              </div>
            </div>

            {/* Right 6 cols: Scorecards */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-emerald-400">
                    단리 vs 복리 수령액 ({timeDurationYears}년 후 만기)
                  </span>
                  <span className="text-[10px] text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded font-bold">
                    {timeTaxMode === 'preTax' ? '세전' : '세후(15.4% 공제)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700">
                    <span className="text-[11px] text-slate-400 font-bold block">단리 (Simple Interest)</span>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono my-1">
                      {formatWon(timeTaxMode === 'preTax' ? simpleTimeResult.totalPreTax : simpleTimeResult.totalPostTax)}
                    </div>
                    <span className="text-[11px] text-blue-400 font-semibold block">
                      총 이자: +{formatWon(timeTaxMode === 'preTax' ? simpleTimeResult.preTaxInterest : simpleTimeResult.postTaxInterest)}
                    </span>
                  </div>

                  <div className="bg-emerald-950/50 rounded-2xl p-3 border border-emerald-500/50">
                    <span className="text-[11px] text-emerald-300 font-bold block">연복리 (Compound Interest)</span>
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono my-1">
                      {formatWon(timeTaxMode === 'preTax' ? compoundTimeResult.totalPreTax : Math.floor(timePrincipalWon + compoundTimeResult.preTaxInterest * 0.846))}
                    </div>
                    <span className="text-[11px] text-emerald-300 font-semibold block">
                      총 이자: +{formatWon(timeTaxMode === 'preTax' ? compoundTimeResult.preTaxInterest : Math.floor(compoundTimeResult.preTaxInterest * 0.846))}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 text-xs flex items-center justify-between">
                  <span className="text-slate-300">{timeDurationYears}년 후 복리가 주는 추가 이익:</span>
                  <span className="text-amber-400 font-bold font-mono">
                    +{formatWon(compoundTimeResult.totalPreTax - simpleTimeResult.totalPreTax)} 차이
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">연도별 복리 격차 추이:</span>
                  <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
                    {compoundTimeResult.yearlyBreakdown.slice(0, 5).map((yd) => (
                      <div key={yd.year} className="bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                        <span className="text-slate-400 block">{yd.year}년차</span>
                        <span className="text-emerald-400 font-mono font-bold block mt-0.5">+{formatWon(yd.difference)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                <span>정기예금: 목돈 거치용 (중도 해지 시 약정이자 감소)</span>
                <span className="text-emerald-400 font-bold">목돈 굴리기 최적</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: 정기적금 시뮬레이터 ================= */}
        {activeTab === 'installment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full items-stretch">
            {/* Left 6 cols: Installment Parameters */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-indigo-600" />
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      정기적금 시뮬레이터 (매달 일정액 납입)
                    </span>
                  </div>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                    <button
                      onClick={() => setInstTaxMode('preTax')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${instTaxMode === 'preTax' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                    >
                      세전
                    </button>
                    <button
                      onClick={() => setInstTaxMode('postTax')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${instTaxMode === 'postTax' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'}`}
                    >
                      세후 (15.4%)
                    </button>
                  </div>
                </div>

                {/* Monthly Deposit */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs font-bold">
                    <span className="text-slate-600">월 납입액 (Monthly Deposit):</span>
                    <span className="text-indigo-700 font-mono text-base font-extrabold">{formatManWon(instMonthlyMan)}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[5, 10, 20, 30, 50].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setInstMonthlyMan(amt)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          instMonthlyMan === amt ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {amt}만 원
                      </button>
                    ))}
                  </div>
                </div>

                {/* Annual Rate */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs font-bold">
                    <span className="text-slate-600">연 금리 (Interest Rate):</span>
                    <span className="text-amber-700 font-mono text-base font-extrabold">연 {instAnnualRate.toFixed(1)}%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[3.0, 4.0, 5.0, 7.0].map((r) => (
                      <button
                        key={r}
                        onClick={() => setInstAnnualRate(r)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          instAnnualRate === r ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        연 {r}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Months */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-xs font-bold">
                    <span className="text-slate-600">적립 기간 (Months):</span>
                    <span className="text-blue-700 font-mono text-base font-extrabold">{instMonths}개월 만기</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 12, 24, 36].map((m) => (
                      <button
                        key={m}
                        onClick={() => setInstMonths(m)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          instMonths === m ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {m}개월
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                <strong className="text-slate-800 font-bold block mb-0.5">💡 적금 이자 계산의 핵심:</strong>
                첫 달에 넣은 돈은 {instMonths}개월간 머물지만, 마지막 달에 넣은 돈은 1개월만 머뭅니다.
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  따라서 모든 원금에 전체 기간 이자가 붙는 것이 아니라, 입금 시기별 잔여 기간만큼만 이자가 붙습니다.
                </span>
              </div>
            </div>

            {/* Right 6 cols: Installment Result Dashboard */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300">
                    만기 수령액 분석 (월 {formatManWon(instMonthlyMan)} × {instMonths}개월)
                  </span>
                  <span className="text-[10px] text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded font-bold">
                    연 {instAnnualRate}% 단리
                  </span>
                </div>

                {/* Big Result Display */}
                <div className="my-3 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">총 만기 수령액 (원금 + 이자)</span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5">
                      {formatWon(instTaxMode === 'preTax' ? instResult.totalPreTax : instResult.totalPostTax)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold block">순수 이자 수익</span>
                    <div className="text-lg font-black text-amber-300 font-mono mt-0.5">
                      +{formatWon(instTaxMode === 'preTax' ? instResult.preTaxInterest : instResult.postTaxInterest)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">총 납입 원금</span>
                    <span className="text-base font-mono font-bold text-white mt-0.5 block">
                      {formatWon(instResult.totalPrincipalWon)}
                    </span>
                    <span className="text-[10px] text-slate-500">{instMonthlyMan}만 원 × {instMonths}회</span>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[11px]">세금 (15.4% 원천징수)</span>
                    <span className="text-base font-mono font-bold text-rose-300 mt-0.5 block">
                      -{formatWon(instResult.interestTax)}
                    </span>
                    <span className="text-[10px] text-slate-500">이자소득세+지방소득세</span>
                  </div>
                </div>

                {/* Progress Visual: Monthly Cumulative Principal */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>월별 원금 적립 누적 과정 ({instMonths}개월 완료 시):</span>
                    <span className="text-emerald-400 font-mono font-bold">{formatWon(instResult.totalPrincipalWon)} 목표 달성!</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-full" />
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                <span>정기적금: 종잣돈(목돈) 만들기 첫걸음</span>
                <span className="text-indigo-400 font-bold">사회초년생 필수 저축</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: 정기예금 vs 정기적금 비교하기 ================= */}
        {activeTab === 'compare' && (
          <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <span className="font-extrabold text-base text-white">
                    정기예금 vs 정기적금 이자 차이 끝장 비교
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  동일한 총원금 {formatWon(compareResult.totalPrincipalWon)} · 연 {compareRate}% · {compareMonths}개월 기준
                </span>
              </div>

              {/* Side by Side Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                {/* Fixed Deposit Card */}
                <div className="bg-slate-800/90 rounded-2xl p-4 border-2 border-emerald-500/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-black text-xs rounded">
                      정기예금 (Fixed Deposit)
                    </span>
                    <span className="text-xs text-emerald-300 font-bold">목돈 한 번에 예치</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    처음에 <strong>{formatWon(compareResult.totalPrincipalWon)}</strong>을 한 번에 넣고 {compareMonths}개월간 그대로 묶어둠.
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">세전 이자:</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      +{formatWon(compareResult.fixedDeposit.preTaxInterest)}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      계산: {formatWon(compareResult.totalPrincipalWon)} × {compareRate}% × ({compareMonths}/12)
                    </span>
                  </div>
                </div>

                {/* Installment Savings Card */}
                <div className="bg-slate-800/90 rounded-2xl p-4 border-2 border-indigo-500/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-indigo-500 text-white font-black text-xs rounded">
                      정기적금 (Installment Savings)
                    </span>
                    <span className="text-xs text-indigo-300 font-bold">매달 나누어 납입</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    매달 <strong>{formatWon(compareResult.installmentSavings.monthlyDepositWon)}</strong>씩 {compareMonths}번에 걸쳐 나누어 넣음.
                  </p>
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">세전 이자:</span>
                    <div className="text-2xl font-black text-indigo-300 font-mono">
                      +{formatWon(compareResult.installmentSavings.preTaxInterest)}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      계산: 매월 입금액마다 잔여 기간별 단리 적용
                    </span>
                  </div>
                </div>
              </div>

              {/* Difference Banner */}
              <div className="p-3 bg-amber-400/20 border border-amber-400/50 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-200 font-medium">
                    {compareResult.explanation}
                  </span>
                </div>
                <span className="text-amber-300 font-black font-mono text-sm shrink-0">
                  예금 이자가 +{formatWon(compareResult.interestDifference)} 더 많음!
                </span>
              </div>
            </div>

            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>교사용 지도 팁: 이미 모은 목돈은 정기예금, 앞으로 모을 돈은 정기적금</span>
              <span className="text-amber-400 font-bold">자금의 보유 시점 차이</span>
            </div>
          </div>
        )}
      </div>

      {/* 예금자보호제도 1억 원 상향 수정 배너 (2025.09.01 개정 반영) */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black bg-emerald-700 text-white px-2 py-0.5 rounded">
                2025년 9월 1일 개정 시행
              </span>
              <span className="text-xs font-bold text-emerald-900">
                예금자보호한도 상향: 금융회사별 1인당 <strong>최고 1억 원(원금+소정 이자)</strong>까지 보호
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              은행이 부도나더라도 예금보험공사가 동일 금융회사 내 모든 보호 대상 예금을 합산하여 최대 1억 원까지 지급합니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowSameBankQuiz(!showSameBankQuiz)}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition-all cursor-pointer shadow-xs"
          >
            {showSameBankQuiz ? '퀴즈 닫기 ▲' : '교실 퀴즈: 같은 은행에 1.2억 있으면? ▼'}
          </button>
          <button
            onClick={() => setShowProtectionInfo(!showProtectionInfo)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            {showProtectionInfo ? '안내 닫기' : '보호 대상 안내'}
          </button>
        </div>
      </div>

      {/* Same Bank 1.2 Billion Won Quiz Modal / Toast */}
      {showSameBankQuiz && (
        <div className="bg-white border-2 border-amber-300 rounded-2xl p-3.5 text-xs text-slate-800 space-y-1.5 shadow-lg animate-fade-in">
          <strong className="text-amber-900 font-extrabold text-sm block flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            학생 참여 퀴즈: "같은 은행에 정기예금 7,000만 원과 적금 5,000만 원이 있다면 전부 보호될까요?"
          </strong>
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-slate-700 space-y-1">
            <p>
              👉 <strong>정답:</strong> 아닙니다! 같은 금융회사 내 여러 예금은 원금과 이자를 <strong>모두 합산하여 1인당 최대 1억 원까지만</strong> 보호됩니다.
            </p>
            <p className="text-[11px] text-slate-600">
              따라서 총 1억 2,000만 원 중 1억 원은 안전하게 돌려받지만, 초과된 2,000만 원은 전액 보호받지 못할 수 있습니다. 1억 원이 넘는 자산은 <strong>서로 다른 은행(A은행 1억, B은행 1억)에 분산 예치</strong>해야 각각 1억 원씩 완벽하게 보호받을 수 있습니다!
            </p>
          </div>
        </div>
      )}

      {/* Protection Scope Info */}
      {showProtectionInfo && (
        <div className="bg-white border border-emerald-300 rounded-2xl p-3 text-xs text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in shadow-md">
          <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
            <strong className="text-emerald-900 font-bold block mb-1">
              ✅ 예금자보호 대상 상품 (원금+이자 1억 원 한도)
            </strong>
            <p className="leading-relaxed text-[11px]">
              은행의 보통예금, 정기예금, 정기적금, 개인퇴직연금(IRP 등 일부). 은행 파산 시 예금보험공사가 1인당 최고 1억 원까지 지급합니다.
            </p>
          </div>
          <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
            <strong className="text-rose-900 font-bold block mb-1">
              ❌ 예금자보호 비대상 상품 (보호 불가)
            </strong>
            <p className="leading-relaxed text-[11px]">
              주식, 일반 펀드, ETF, 채권, 수익증권 등. 투자성 상품은 시장 가격 변동에 따른 손실 위험을 투자자가 직접 부담하므로 보호되지 않습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
