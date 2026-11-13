import React, { useState, useEffect } from 'react';
import { calculateGoalDuration, formatManWon } from '../../utils/finance';
import { FinancialGoal } from '../../types';
import { Check, Clock, HelpCircle, ArrowRight } from 'lucide-react';

interface Page4Props {
  resetSignal: number;
}

type GoalStep = 'step1' | 'step2';

const PRESET_GOALS: FinancialGoal[] = [
  { id: 'trip', title: '해외 배낭여행 자금', targetAmount: 200, icon: '✈️', description: '견문을 넓히는 해외 여행' },
  { id: 'laptop', title: '고성능 노트북 구입', targetAmount: 150, icon: '💻', description: '학습과 작업을 위한 필수 장비' },
  { id: 'deposit', title: '청년 독립 보증금', targetAmount: 1000, icon: '🏠', description: '독립을 위한 전·월세 보증금' },
  { id: 'car', title: '첫 출퇴근 자동차', targetAmount: 2000, icon: '🚗', description: '사회생활을 위한 첫 차량 마련' },
];

export const Page4SavingsGoals: React.FC<Page4Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<GoalStep>('step1');
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal>(PRESET_GOALS[2]);
  const [monthlySavings, setMonthlySavings] = useState<number>(50);
  const [customTitle, setCustomTitle] = useState<string>('나만의 꿈 목표');
  const [customAmount, setCustomAmount] = useState<number>(500);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedGoal(PRESET_GOALS[2]);
    setMonthlySavings(50);
    setCustomTitle('나만의 꿈 목표');
    setCustomAmount(500);
    setIsCustomMode(false);
  }, [resetSignal]);

  const activeTargetAmount = isCustomMode ? customAmount : selectedGoal.targetAmount;
  const activeTitle = isCustomMode ? customTitle : selectedGoal.title;
  const durationResult = calculateGoalDuration(activeTargetAmount * 10000, monthlySavings * 10000);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-emerald-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 4</span>
            <span aria-hidden="true">·</span>
            <span>재무 목표 설계와 달성 기간</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            &ldquo;돈을 모으면 무엇을 할 수 있을까?&rdquo;
          </h2>
        </div>

        <nav
          aria-label="재무 목표 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 목표 달성 계산기' },
            { id: 'step2' as const, label: 'STEP 2. 돈 모으는 3가지 비결' },
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

      {/* ================= STEP 1. 목표 달성 계산기 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          {/* 5 Goal Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRESET_GOALS.map((goal) => {
              const isSelected = !isCustomMode && selectedGoal.id === goal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => {
                    setSelectedGoal(goal);
                    setIsCustomMode(false);
                  }}
                  className={`min-h-[190px] p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-4xl mb-2">{goal.icon}</div>
                    <h3 className="font-black text-slate-900 text-[24px] leading-snug">
                      {goal.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[26px] font-black text-emerald-700 font-mono tabular-nums">
                      {formatManWon(goal.targetAmount)}
                    </span>
                    {isSelected && <Check className="w-6 h-6 text-emerald-700" />}
                  </div>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsCustomMode(true)}
              className={`min-h-[190px] p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isCustomMode
                  ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-200'
                  : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="text-4xl mb-2">✏️</div>
                <h3 className="font-black text-slate-900 text-[24px]">직접 목표 입력</h3>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[20px] font-black text-indigo-700">자유 설정 모드</span>
                {isCustomMode && <Check className="w-6 h-6 text-indigo-700" />}
              </div>
            </button>
          </div>

          {isCustomMode && (
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-5 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <span className="text-[22px] font-black text-indigo-950">목표 이름:</span>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="min-h-[56px] px-4 bg-white border-2 border-indigo-300 rounded-2xl text-[22px] font-black text-slate-900"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[22px] font-black text-indigo-950">목표 금액:</span>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Math.max(10, parseInt(e.target.value, 10) || 10))}
                  className="w-32 min-h-[56px] px-4 bg-white border-2 border-indigo-300 rounded-2xl text-[22px] font-black text-slate-900 font-mono text-center"
                />
                <span className="text-[22px] font-black text-indigo-950">만 원</span>
              </div>
            </div>
          )}

          {/* Calculator Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-black text-slate-200">
                  한 달 저축 가능 금액
                </span>
                <span className="text-[36px] font-black text-amber-300 font-mono tabular-nums">
                  {formatManWon(monthlySavings)}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {[20, 30, 50, 80, 100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMonthlySavings(amt)}
                    className={`min-h-[56px] rounded-2xl text-[20px] font-black cursor-pointer transition-all tabular-nums ${
                      monthlySavings === amt
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {amt}만
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer h-4 bg-slate-700 rounded-lg"
              />
            </div>

            <div className="lg:col-span-6 bg-slate-800 rounded-3xl p-7 border border-slate-700 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[22px] font-black text-emerald-300 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  목표: {activeTitle} ({formatManWon(activeTargetAmount)})
                </span>
              </div>

              <div className="text-[44px] xl:text-[54px] font-black text-emerald-300 font-mono tabular-nums">
                {durationResult.formattedDuration}
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[22px] font-bold text-slate-200">
                  매달 {formatManWon(monthlySavings)}씩 모으면 {durationResult.totalMonths}개월 뒤 달성!
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStep('step2')}
                  className="min-h-[56px] px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[20px] rounded-2xl flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>3대 비결</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 돈 모으는 3가지 비결 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <HelpCircle className="w-9 h-9" />
            </div>
            <div>
              <span className="text-[20px] font-black text-amber-300 block">
                교실 생각 열기
              </span>
              <h3 className="text-[32px] xl:text-[36px] font-black text-white">
                &ldquo;돈을 모으는 데 가장 중요한 3가지 비결은 무엇일까요?&rdquo;
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            <div className="bg-white rounded-3xl p-8 border-2 border-indigo-200 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[22px] font-black text-indigo-700 block mb-2">비결 01</span>
                <h4 className="text-[30px] font-black text-slate-900 mb-4">
                  명확한 목표와 기한
                </h4>
                <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                  &ldquo;언젠가 부자 되어야지&rdquo;가 아니라 &ldquo;3년 안에 1,000만 원 모은다&rdquo;처럼 기한과 액수가 정해져야 실천할 수 있습니다.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-4 text-[20px] font-bold text-indigo-900">
                목표가 보이면 소비의 유혹을 참을 수 있습니다.
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[22px] font-black text-emerald-700 block mb-2">비결 02</span>
                <h4 className="text-[30px] font-black text-slate-900 mb-4">
                  선저축 후지출 습관
                </h4>
                <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                  쓰고 남은 돈을 모으는 것이 아니라, 월급날 바로 자동이체로 저축액을 먼저 떼어놓는 습관이 성패를 가릅니다.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4 text-[20px] font-bold text-emerald-900">
                강제 저축 시스템을 만들면 저절로 돈이 모입니다.
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[22px] font-black text-blue-700 block mb-2">비결 03</span>
                <h4 className="text-[30px] font-black text-slate-900 mb-4">
                  시간의 힘과 금융 활용
                </h4>
                <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                  단순히 저금통에 모으는 것을 넘어, 이자와 투자를 돕는 &lsquo;금융 시스템&rsquo;을 이용해야 더 빠르게 목표에 도달합니다.
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 text-[20px] font-bold text-blue-900">
                복리와 자산 운용이 시간의 가치를 키워줍니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
