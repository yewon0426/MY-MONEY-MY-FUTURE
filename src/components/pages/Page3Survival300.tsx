import React, { useState, useEffect } from 'react';
import { calculateMonthlySurplus, calculateSavingsProjection, formatManWon } from '../../utils/finance';
import { Wallet, AlertTriangle, Flame, Plus, Trash2, Calendar, ArrowRight, Zap } from 'lucide-react';

interface Page3Props {
  resetSignal: number;
}

type SurvivalStep = 'step1' | 'step2';

interface BudgetExpense {
  id: string;
  name: string;
  amount: number;
}

interface EmergencyEvent {
  id: string;
  title: string;
  amount: number;
  icon: string;
  applied: boolean;
}

const DEFAULT_EXPENSES: BudgetExpense[] = [
  { id: '1', name: '월세 및 관리비', amount: 65 },
  { id: '2', name: '식비 및 외식·카페', amount: 45 },
  { id: '3', name: '교통 및 통신비', amount: 20 },
  { id: '4', name: '쇼핑 및 취미·여가', amount: 35 },
  { id: '5', name: '실비보험 및 생필품', amount: 20 },
];

const INITIAL_EMERGENCIES: EmergencyEvent[] = [
  { id: 'em1', title: '응급 병원비·치료', amount: 50, icon: '🏥', applied: false },
  { id: 'em2', title: '갑작스러운 이사', amount: 100, icon: '📦', applied: false },
  { id: 'em3', title: '스마트폰 파손', amount: 30, icon: '📱', applied: false },
  { id: 'em4', title: '친구 결혼·축의금', amount: 15, icon: '💌', applied: false },
];

export const Page3Survival300: React.FC<Page3Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<SurvivalStep>('step1');
  const netSalary = 265; // 세전 300만 -> 실수령 약 265만
  const [expenses, setExpenses] = useState<BudgetExpense[]>(DEFAULT_EXPENSES);
  const [emergencies, setEmergencies] = useState<EmergencyEvent[]>(INITIAL_EMERGENCIES);
  const [newExpenseName, setNewExpenseName] = useState<string>('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('10');

  useEffect(() => {
    setActiveStep('step1');
    setExpenses(DEFAULT_EXPENSES);
    setEmergencies(INITIAL_EMERGENCIES);
    setNewExpenseName('');
    setNewExpenseAmount('10');
  }, [resetSignal]);

  const regularExpenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
  const emergencyTotal = emergencies.filter((e) => e.applied).reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = regularExpenseTotal + emergencyTotal;
  const surplus = calculateMonthlySurplus(netSalary, totalExpense);
  const projections = calculateSavingsProjection(surplus);

  const toggleEmergency = (id: string) => {
    setEmergencies((prev) =>
      prev.map((e) => (e.id === id ? { ...e, applied: !e.applied } : e))
    );
  };

  const addCustomExpense = () => {
    if (!newExpenseName.trim()) return;
    const amt = Math.max(1, parseInt(newExpenseAmount, 10) || 10);
    setExpenses((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newExpenseName.trim(), amount: amt },
    ]);
    setNewExpenseName('');
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const updateExpenseAmount = (id: string, newAmt: number) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: Math.max(0, newAmt) } : item))
    );
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 3</span>
            <span aria-hidden="true">·</span>
            <span>월급 300만 원(실수령 265만 원) 기준</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            월급 생존 &amp; 돌발 지출 시뮬레이터
          </h2>
        </div>

        <nav
          aria-label="월급 생존 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 지출 & 돌발 상황' },
            { id: 'step2' as const, label: 'STEP 2. 흑자·적자 & 저축 예측' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[60px] px-6 py-3 rounded-xl text-[20px] xl:text-[22px] font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/70 text-slate-700 hover:bg-white hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ================= STEP 1. 지출 & 돌발 상황 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          {/* Left: Regular Expenses */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 border-2 border-slate-200 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Wallet className="w-7 h-7 text-blue-700" />
                  <h3 className="text-[28px] font-black text-slate-900">
                    매달 고정·변동 지출 ({formatManWon(regularExpenseTotal)})
                  </h3>
                </div>
                <span className="px-4 py-1.5 rounded-xl bg-blue-100 text-blue-950 font-black text-[20px] font-mono tabular-nums">
                  실수령 {formatManWon(netSalary)}
                </span>
              </div>

              <div className="space-y-3">
                {expenses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200"
                  >
                    <span className="font-black text-slate-900 text-[22px]">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateExpenseAmount(item.id, item.amount - 5)}
                        disabled={item.amount < 5}
                        className="min-h-[52px] min-w-[52px] rounded-xl bg-white border border-slate-300 font-black hover:bg-slate-200 disabled:opacity-30 cursor-pointer text-[22px]"
                      >
                        -
                      </button>
                      <span className="w-28 text-center font-mono font-black text-slate-900 text-[24px] tabular-nums">
                        {formatManWon(item.amount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateExpenseAmount(item.id, item.amount + 5)}
                        className="min-h-[52px] min-w-[52px] rounded-xl bg-white border border-slate-300 font-black hover:bg-slate-200 cursor-pointer text-indigo-700 text-[22px]"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeExpense(item.id)}
                        className="min-h-[52px] min-w-[52px] text-slate-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 cursor-pointer flex items-center justify-center"
                        aria-label={`${item.name} 삭제`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
              <input
                type="text"
                placeholder="새 지출 항목 (예: 헬스장)"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className="flex-1 min-w-[200px] min-h-[56px] px-4 text-[20px] border-2 border-slate-300 rounded-2xl focus:outline-none focus:border-blue-500 font-bold"
              />
              <input
                type="number"
                min="1"
                max="500"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                className="w-24 min-h-[56px] px-3 text-[20px] border-2 border-slate-300 rounded-2xl text-center font-mono font-black"
              />
              <span className="text-[20px] font-black text-slate-700">만 원</span>
              <button
                type="button"
                onClick={addCustomExpense}
                className="min-h-[56px] px-6 bg-slate-900 hover:bg-slate-800 text-white text-[20px] font-black rounded-2xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>추가</span>
              </button>
            </div>
          </div>

          {/* Right: Sudden Events + Live Surplus Preview */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-black text-rose-300 flex items-center gap-2">
                  <Flame className="w-7 h-7 text-rose-400" />
                  돌발 지출 발생 시켜보기
                </span>
                <span className="text-[20px] font-black text-rose-300 tabular-nums">
                  {emergencyTotal > 0 ? `-${formatManWon(emergencyTotal)}` : '미발생'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {emergencies.map((em) => (
                  <button
                    key={em.id}
                    type="button"
                    onClick={() => toggleEmergency(em.id)}
                    className={`min-h-[120px] p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      em.applied
                        ? 'bg-rose-950 border-rose-400 ring-2 ring-rose-400/50'
                        : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{em.icon}</span>
                      <span
                        className={`text-[18px] font-black px-2.5 py-0.5 rounded-lg ${
                          em.applied ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {em.applied ? '발생!' : '대기'}
                      </span>
                    </div>
                    <div>
                      <div className="text-[20px] font-black text-white">{em.title}</div>
                      <div className="text-[22px] font-mono font-black text-rose-300 mt-0.5 tabular-nums">
                        -{formatManWon(em.amount)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[22px] font-bold text-slate-300">이번 달 남는 돈 (저축 여력)</span>
                <span
                  className={`px-3.5 py-1 rounded-full text-[19px] font-black ${
                    surplus > 0 ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  {surplus > 0 ? '흑자' : '적자!'}
                </span>
              </div>
              <div
                className={`text-[42px] font-mono font-black tabular-nums ${
                  surplus > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatManWon(surplus)}
              </div>
              <button
                type="button"
                onClick={() => setActiveStep('step2')}
                className="w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>1·3·5년 저축 누적 결과 보기</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 흑자·적자 & 저축 예측 ================= */}
      {activeStep === 'step2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div
            className={`lg:col-span-6 rounded-3xl p-8 border-2 flex flex-col justify-between gap-6 ${
              surplus > 0
                ? 'bg-emerald-950 text-white border-emerald-500'
                : 'bg-rose-950 text-white border-rose-500'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-black text-slate-200">
                  이번 달 최종 결산 (실수령 {formatManWon(netSalary)} − 총 지출 {formatManWon(totalExpense)})
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-[20px] font-black ${
                    surplus > 0 ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  {surplus > 0 ? '흑자 (저축 가능)' : '적자 (지출 초과!)'}
                </span>
              </div>

              <div className="text-[52px] xl:text-[60px] font-black font-mono tabular-nums">
                {formatManWon(surplus)}
              </div>

              {surplus <= 0 && (
                <div className="p-5 bg-rose-500/20 border-2 border-rose-400 rounded-2xl flex items-center gap-3 text-[22px] font-bold text-rose-100">
                  <AlertTriangle className="w-7 h-7 text-rose-300 shrink-0" />
                  <span>지출이 수입을 초과했습니다! STEP 1에서 지출을 줄여 흑자를 만들어 보세요.</span>
                </div>
              )}
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-[22px] xl:text-[24px] font-black text-white leading-snug">
                &ldquo;소득이 아무리 많아도 지출을 관리하지 않으면 미래를 준비할 수 없습니다.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-8 h-8 text-indigo-700" />
                <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                  매달 {formatManWon(Math.max(0, surplus))}씩 모은다면?
                </h3>
              </div>
              <p className="text-[22px] font-bold text-slate-600">
                이자를 제외한 순수 원금 누적 저축액 예측
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: '1년 (12개월)', value: projections.oneYear, style: 'bg-slate-50 border-slate-200 text-slate-900' },
                { label: '3년 (36개월)', value: projections.threeYears, style: 'bg-indigo-50 border-indigo-200 text-indigo-950' },
                { label: '5년 (60개월)', value: projections.fiveYears, style: 'bg-emerald-50 border-emerald-200 text-emerald-950' },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 ${row.style}`}
                >
                  <span className="text-[26px] font-black">{row.label}</span>
                  <span className="text-[36px] xl:text-[42px] font-black font-mono tabular-nums">
                    {formatManWon(Math.floor(row.value))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
