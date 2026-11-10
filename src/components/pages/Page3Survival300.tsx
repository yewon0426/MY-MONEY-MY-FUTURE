import React, { useState } from 'react';
import { calculateMonthlySurplus, calculateSavingsProjection, formatManWon } from '../../utils/finance';
import {
  Wallet,
  AlertTriangle,
  Flame,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';

interface Page3Props {
  resetSignal: number;
}

interface BudgetExpense {
  id: string;
  name: string;
  amount: number; // in 만원
}

interface EmergencyEvent {
  id: string;
  title: string;
  amount: number; // in 만원
  icon: string;
  applied: boolean;
}

const DEFAULT_EXPENSES: BudgetExpense[] = [
  { id: '1', name: '월세 및 관리비', amount: 65 },
  { id: '2', name: '식비 및 외식·카페', amount: 45 },
  { id: '3', name: '지하철·버스 및 통신비', amount: 20 },
  { id: '4', name: '쇼핑 및 취미·문화', amount: 35 },
  { id: '5', name: '실비보험 및 생필품', amount: 20 },
];

const INITIAL_EMERGENCIES: EmergencyEvent[] = [
  { id: 'em1', title: '응급 병원비·치료', amount: 50, icon: '🏥', applied: false },
  { id: 'em2', title: '갑작스러운 이사·보증금', amount: 100, icon: '📦', applied: false },
  { id: 'em3', title: '스마트폰 액정 파손', amount: 30, icon: '📱', applied: false },
  { id: 'em4', title: '친구 결혼식·축의금', amount: 15, icon: '💌', applied: false },
];

export const Page3Survival300: React.FC<Page3Props> = ({ resetSignal }) => {
  const [netSalary, setNetSalary] = useState<number>(265); // 세전 300만 -> 실수령 약 265만
  const [expenses, setExpenses] = useState<BudgetExpense[]>(DEFAULT_EXPENSES);
  const [emergencies, setEmergencies] = useState<EmergencyEvent[]>(INITIAL_EMERGENCIES);
  const [newExpenseName, setNewExpenseName] = useState<string>('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('10');

  React.useEffect(() => {
    setNetSalary(265);
    setExpenses(DEFAULT_EXPENSES);
    setEmergencies(INITIAL_EMERGENCIES);
    setNewExpenseName('');
    setNewExpenseAmount('10');
  }, [resetSignal]);

  const regularExpenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
  const emergencyTotal = emergencies
    .filter((e) => e.applied)
    .reduce((sum, e) => sum + e.amount, 0);

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
    const amt = parseInt(newExpenseAmount, 10) || 10;
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
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Wallet className="w-3.5 h-3.5 text-blue-600" />
          <span>월급 생존 & 저축 시뮬레이터</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "월급 300만 원으로 살아남기"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          세전 월급 300만 원(실수령액 <span className="font-bold text-blue-700">265만 원</span>)에서 지출을 빼고 남은 돈으로 저축해 보세요.
        </p>
      </div>

      {/* Main Two-Zone Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 flex-1">
        {/* Left Column (7 cols): Income & Expense Builder */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            {/* Net Income Header Banner */}
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-4">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase">한 달 가용 소득 (실수령액)</span>
                <div className="text-2xl sm:text-3xl font-black text-blue-900 font-mono">
                  {formatManWon(netSalary)}
                </div>
              </div>
              <div className="text-right text-xs text-blue-600">
                세전 300만 원 <br /> (세금·4대보험 공제 완료)
              </div>
            </div>

            {/* Expenses List */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-700">매달 나가는 지출 항목</span>
              <span className="text-xs text-slate-500 font-medium">
                총 {expenses.length}개 항목 ({formatManWon(regularExpenseTotal)})
              </span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm"
                >
                  <span className="font-bold text-slate-800">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateExpenseAmount(item.id, item.amount - 5)}
                      disabled={item.amount < 5}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-20 text-center font-mono font-bold text-slate-900">
                      {formatManWon(item.amount)}
                    </span>
                    <button
                      onClick={() => updateExpenseAmount(item.id, item.amount + 5)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-200 cursor-pointer text-indigo-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeExpense(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="항목 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Expense Input */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
              <input
                type="text"
                placeholder="새 지출 추가 (예: 헬스장, OTT 구독)"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  className="w-16 px-2 py-2 text-xs border border-slate-300 rounded-xl text-center font-mono"
                />
                <span className="text-xs text-slate-500 font-bold">만</span>
              </div>
              <button
                onClick={addCustomExpense}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> 추가
              </button>
            </div>
          </div>

          {/* Unexpected Sudden Event Section */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-rose-700 font-extrabold text-sm">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>🚨 예상하지 못한 돌발 지출 이벤트 (클릭해 보세요!)</span>
              </div>
              <span className="text-xs text-rose-600 font-bold">
                {emergencyTotal > 0 ? `+${formatManWon(emergencyTotal)} 발생` : '미발생'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {emergencies.map((em) => (
                <button
                  key={em.id}
                  onClick={() => toggleEmergency(em.id)}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    em.applied
                      ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">{em.icon}</span>
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        em.applied ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {em.applied ? '발생' : '대기'}
                    </span>
                  </div>
                  <div className="text-xs font-bold truncate">{em.title}</div>
                  <div className="text-xs font-mono font-extrabold text-rose-600 mt-1">
                    -{formatManWon(em.amount)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Remaining Balance & Savings Projection */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Monthly Surplus Card */}
          <div
            className={`rounded-3xl p-6 border-2 shadow-sm transition-all ${
              surplus > 0
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white border-emerald-500/50'
                : 'bg-gradient-to-br from-rose-950 via-slate-900 to-red-950 text-white border-rose-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                이번 달 남는 돈 (저축 여력)
              </span>
              <span
                className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  surplus > 0 ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}
              >
                {surplus > 0 ? '흑자 (저축 가능)' : '적자 발생! 지출 조정 필요'}
              </span>
            </div>

            <div className="my-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums">
                {formatManWon(surplus)}
              </span>
              <span className="text-slate-400 text-sm">
                / 월 (수입 {formatManWon(netSalary)} - 지출 {formatManWon(totalExpense)})
              </span>
            </div>

            {surplus <= 0 && (
              <div className="mt-3 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  지출이 수입을 초과했습니다! 왼쪽에서 불필요한 지출을 줄이거나 돌발 지출을 조정해 보세요.
                </span>
              </div>
            )}
          </div>

          {/* Future Savings Projection Cards */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-1">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>매달 {formatManWon(Math.max(0, surplus))}씩 꼬박꼬박 모은다면?</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                이자를 제외한 단순 원금 저축 누적액 계산
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                      1년
                    </span>
                    <span className="text-xs font-semibold text-slate-700">12개월 누적</span>
                  </div>
                  <span className="text-xl font-black text-slate-900 font-mono">
                    {formatManWon(Math.floor(projections.oneYear))}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      3년
                    </span>
                    <span className="text-xs font-semibold text-indigo-900">36개월 누적</span>
                  </div>
                  <span className="text-xl font-black text-indigo-950 font-mono">
                    {formatManWon(Math.floor(projections.threeYears))}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                      5년
                    </span>
                    <span className="text-xs font-semibold text-emerald-900">60개월 누적</span>
                  </div>
                  <span className="text-xl font-black text-emerald-900 font-mono">
                    {formatManWon(Math.floor(projections.fiveYears))}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>작은 돈이라도 꾸준히 모으면 큰 종잣돈(시드머니)이 됩니다.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Key Message Callout Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-slate-800 shadow-md">
        <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
            교사용 핵심 메시지
          </span>
          <p className="text-base sm:text-lg font-bold text-slate-100">
            "소득이 많아도 지출을 관리하지 않으면 미래를 준비하기 어렵습니다."
          </p>
        </div>
      </div>
    </div>
  );
};
