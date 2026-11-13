import React, { useState, useEffect } from 'react';
import { calculateTotalExpense, formatManWon } from '../../utils/finance';
import { HelpCircle, Plus, Minus, Home, Utensils, Smartphone, ShoppingBag, ShieldAlert, ArrowRight } from 'lucide-react';

interface Page2Props {
  resetSignal: number;
}

type LivingCostStep = 'step1' | 'step2';

interface ExpenseCategory {
  key: string;
  name: string;
  amount: number;
  icon: React.ReactNode;
  type: 'fixed' | 'variable';
  typeLabel: '고정지출' | '변동지출';
  detail: string;
}

const INITIAL_EXPENSES: ExpenseCategory[] = [
  {
    key: 'rent',
    name: '월세·관리비',
    amount: 65,
    icon: <Home className="w-7 h-7 text-indigo-700" />,
    type: 'fixed',
    typeLabel: '고정지출',
    detail: '원룸 월세 55만 + 공과금·인터넷 10만',
  },
  {
    key: 'food',
    name: '식비·카페',
    amount: 45,
    icon: <Utensils className="w-7 h-7 text-amber-700" />,
    type: 'variable',
    typeLabel: '변동지출',
    detail: '하루 두 끼 밥값 + 커피·배달음식',
  },
  {
    key: 'transport',
    name: '교통·통신',
    amount: 20,
    icon: <Smartphone className="w-7 h-7 text-blue-700" />,
    type: 'fixed',
    typeLabel: '고정지출',
    detail: '지하철·버스 요금 + 스마트폰 요금제',
  },
  {
    key: 'leisure',
    name: '쇼핑·여가',
    amount: 35,
    icon: <ShoppingBag className="w-7 h-7 text-emerald-700" />,
    type: 'variable',
    typeLabel: '변동지출',
    detail: '의류 구입, OTT 구독, 취미 생활',
  },
  {
    key: 'insurance',
    name: '보험·의료',
    amount: 20,
    icon: <ShieldAlert className="w-7 h-7 text-rose-700" />,
    type: 'fixed',
    typeLabel: '고정지출',
    detail: '실손의료보험 7만 + 병원·생필품',
  },
];

export const Page2LivingCost: React.FC<Page2Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<LivingCostStep>('step1');
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(INITIAL_EXPENSES);
  const [selectedHardestCut, setSelectedHardestCut] = useState<string>('rent');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setExpenses(INITIAL_EXPENSES);
    setSelectedHardestCut('rent');
    setShowAnswer(false);
  }, [resetSignal]);

  const updateAmount = (key: string, delta: number) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, amount: Math.max(0, item.amount + delta) } : item
      )
    );
  };

  const expenseRecord = expenses.reduce((acc, cur) => {
    acc[cur.key] = cur.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalExpense = calculateTotalExpense(expenseRecord);
  const fixedTotal = expenses.filter((e) => e.type === 'fixed').reduce((sum, e) => sum + e.amount, 0);
  const variableTotal = expenses.filter((e) => e.type === 'variable').reduce((sum, e) => sum + e.amount, 0);
  const votedCategory = expenses.find((e) => e.key === selectedHardestCut) || expenses[0];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 2</span>
            <span aria-hidden="true">·</span>
            <span>청년 1인 가구 독립 생활비</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            &ldquo;혼자 살려면 한 달에 얼마가 필요할까?&rdquo;
          </h2>
        </div>

        <nav
          aria-label="생활비 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 생활비 시뮬레이터' },
            { id: 'step2' as const, label: 'STEP 2. 고정 vs 변동지출' },
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

      {/* ================= STEP 1. 생활비 시뮬레이터 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 flex-1">
            {expenses.map((item) => {
              const isHardest = selectedHardestCut === item.key;
              return (
                <div
                  key={item.key}
                  className={`bg-white rounded-3xl p-6 border-2 flex flex-col justify-between gap-4 transition-all ${
                    isHardest ? 'border-amber-500 ring-4 ring-amber-100' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        {item.icon}
                      </div>
                      <span
                        className={`text-[18px] font-black px-3 py-1 rounded-full ${
                          item.type === 'fixed'
                            ? 'bg-rose-100 text-rose-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {item.typeLabel}
                      </span>
                    </div>
                    <h3 className="text-[28px] font-black text-slate-900">{item.name}</h3>
                    <p className="text-[20px] font-medium text-slate-600 mt-1.5 leading-snug">
                      {item.detail}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                      <span className="text-[36px] xl:text-[40px] font-black font-mono text-slate-900 tabular-nums">
                        {formatManWon(item.amount)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => updateAmount(item.key, -5)}
                        disabled={item.amount < 5}
                        className="min-h-[56px] rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-800 font-black text-[20px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Minus className="w-5 h-5" />
                        <span>5만</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAmount(item.key, 5)}
                        className="min-h-[56px] rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-black text-[20px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                        <span>5만</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedHardestCut(item.key)}
                    className={`min-h-[56px] rounded-2xl text-[19px] font-black cursor-pointer transition-all ${
                      isHardest
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-950'
                    }`}
                  >
                    {isHardest ? '가장 줄이기 어려움 ✓' : '줄이기 어렵다 선택'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[20px] font-bold text-slate-300 block">
                가상 1인 가구 월 생활비 합계 (고정 {formatManWon(fixedTotal)} + 변동 {formatManWon(variableTotal)})
              </span>
              <span className="text-[44px] xl:text-[50px] font-black font-mono text-emerald-400 tabular-nums mt-1 block">
                {formatManWon(totalExpense)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer shrink-0 active:scale-95"
            >
              <span>고정지출 vs 변동지출 토론하기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 고정 vs 변동지출 토론 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[20px] font-black text-amber-300 block mb-1">
                교실 선택 결과: &lsquo;{votedCategory.name}&rsquo; ({votedCategory.typeLabel})
              </span>
              <h3 className="text-[30px] xl:text-[34px] font-black text-white">
                질문: 돈이 부족할 때 가장 줄이기 어려운 지출은 무엇일까요?
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAnswer(!showAnswer)}
              className="min-h-[64px] px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <HelpCircle className="w-6 h-6" />
              <span>{showAnswer ? '핵심 정답 접기' : '핵심 정답 공개하기'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            <div className="bg-white rounded-3xl p-8 border-2 border-rose-300 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-900 text-[20px] font-black">
                    고정지출 ({formatManWon(fixedTotal)})
                  </span>
                  {showAnswer && (
                    <span className="px-4 py-1.5 rounded-full bg-rose-600 text-white text-[20px] font-black">
                      줄이기 가장 어려움!
                    </span>
                  )}
                </div>
                <h4 className="text-[32px] font-black text-rose-950">
                  1. 계약으로 묶인 고정지출
                </h4>
                <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                  월세, 관리비, 통신비, 보험료처럼 매달 일정 금액이 계약이나 약정으로 자동 지출되는 돈입니다.
                </p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-5 text-[22px] font-bold text-rose-900">
                돈이 없다고 당장 다음 달부터 줄일 수 없으며, 연체 시 주거 불안과 신용점수 하락이 발생합니다.
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-300 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-[20px] font-black">
                    변동지출 ({formatManWon(variableTotal)})
                  </span>
                </div>
                <h4 className="text-[32px] font-black text-emerald-950">
                  2. 의지로 줄일 수 있는 변동지출
                </h4>
                <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                  식비, 카페, 배달음식, 쇼핑, 문화생활처럼 나의 선택과 절약 습관에 따라 매달 금액이 달라지는 돈입니다.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-5 text-[22px] font-bold text-emerald-900">
                절약을 통해 바로 줄일 수 있지만, 무리하게 줄이면 삶의 질과 만족도가 떨어질 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
