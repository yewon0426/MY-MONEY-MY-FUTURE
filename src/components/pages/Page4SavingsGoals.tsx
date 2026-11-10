import React, { useState } from 'react';
import { calculateGoalDuration, formatManWon } from '../../utils/finance';
import { FinancialGoal } from '../../types';
import { Target, HelpCircle, Compass, Sparkles, Check, Clock } from 'lucide-react';

interface Page4Props {
  resetSignal: number;
}

const PRESET_GOALS: FinancialGoal[] = [
  { id: 'trip', title: '해외 배낭여행 자금', targetAmount: 200, icon: '✈️', description: '견문을 넓히는 힐링 유럽·동남아 여행' },
  { id: 'laptop', title: '고성능 노트북 구입', targetAmount: 150, icon: '💻', description: '학습과 영상 편집을 위한 필수 장비' },
  { id: 'deposit', title: '청년 독립 보증금', targetAmount: 1000, icon: '🏠', description: '부모님으로부터 독립하기 위한 전·월세 보증금' },
  { id: 'car', title: '첫 출퇴근 자동차 구입', targetAmount: 2000, icon: '🚗', description: '사회생활 첫 발을 위한 준중형/경차 마련' },
];

export const Page4SavingsGoals: React.FC<Page4Props> = ({ resetSignal }) => {
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal>(PRESET_GOALS[2]); // Default: 독립 보증금 1000만
  const [monthlySavings, setMonthlySavings] = useState<number>(50); // Default: 50만 원
  const [customTitle, setCustomTitle] = useState<string>('나만의 꿈 목표');
  const [customAmount, setCustomAmount] = useState<number>(500);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedGoal(PRESET_GOALS[2]);
    setMonthlySavings(50);
    setCustomTitle('나만의 꿈 목표');
    setCustomAmount(500);
    setIsCustomMode(false);
    setShowQuestionAnswer(false);
  }, [resetSignal]);

  const activeTargetAmount = isCustomMode ? customAmount : selectedGoal.targetAmount;
  const activeTitle = isCustomMode ? customTitle : selectedGoal.title;

  const durationResult = calculateGoalDuration(activeTargetAmount * 10000, monthlySavings * 10000);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">
          <Target className="w-4 h-4 text-emerald-600" />
          <span>재무 목표 설계 & 달성 계산기</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "돈을 모으면 무엇을 할 수 있을까?"
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl font-medium">
          이루고 싶은 재무 목표를 선택하고, 매달 저축액을 조절하여 걸리는 시간을 확인해 보세요.
        </p>
      </div>

      {/* Main Grid: Goals Selector (Top) + Interactive Duration Calculator (Bottom) */}
      <div className="space-y-6 my-4">
        {/* Goals Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {PRESET_GOALS.map((goal) => {
            const isSelected = !isCustomMode && selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => {
                  setSelectedGoal(goal);
                  setIsCustomMode(false);
                }}
                className={`p-4 sm:p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between relative shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 ring-4 ring-emerald-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-3xl mb-2">{goal.icon}</div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {goal.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xl font-black text-emerald-700 font-mono">
                    {formatManWon(goal.targetAmount)}
                  </span>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* Custom Goal Card */}
          <button
            onClick={() => setIsCustomMode(true)}
            className={`p-4 sm:p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between relative shadow-sm hover:shadow-md ${
              isCustomMode
                ? 'border-indigo-500 bg-indigo-50/60 ring-4 ring-indigo-100'
                : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div>
              <div className="text-3xl mb-2">✏️</div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                자유 목표 직접 설정
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                원하는 목표 이름과 금액을 직접 입력해 보세요.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700">직접 입력 모드</span>
              {isCustomMode && (
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Custom Input Modal Area if Custom Mode */}
        {isCustomMode && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-wrap items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-900">목표 이름:</span>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="px-3 py-1.5 bg-white border border-indigo-300 rounded-xl text-sm font-bold text-slate-900"
                placeholder="예: 닌텐도 스위치 구입"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-900">목표 금액:</span>
              <input
                type="number"
                min="10"
                step="10"
                value={customAmount}
                onChange={(e) => setCustomAmount(Math.max(1, parseInt(e.target.value, 10) || 10))}
                className="w-28 px-3 py-1.5 bg-white border border-indigo-300 rounded-xl text-sm font-bold text-slate-900 font-mono text-center"
              />
              <span className="text-xs font-bold text-indigo-900">만 원</span>
            </div>
          </div>
        )}

        {/* Interactive Duration Calculator Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6 cols: Monthly Savings Steppers */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  한 달 저축 가능 금액 선택
                </span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {formatManWon(monthlySavings)}
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {[20, 30, 50, 80, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setMonthlySavings(amt)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      monthlySavings === amt
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {amt}만 원
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <div className="pt-2">
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5만 원</span>
                  <span>100만 원</span>
                  <span>200만 원</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                ※ 초기 단순 저축 계산이며, 이자와 투자 수익률은 제외된 기본 저축 기준입니다.
              </p>
            </div>

            {/* Right 6 cols: Time required big badge */}
            <div className="lg:col-span-6 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    목표 달성 소요 기간 계산 결과
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>목표: {activeTitle} ({formatManWon(activeTargetAmount)})</span>
                  </div>
                </div>

                <div className="my-4 text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-300 font-mono tracking-tight tabular-nums">
                    {durationResult.formattedDuration}
                  </div>
                  <div className="text-sm text-slate-300 mt-2 font-medium">
                    매달 {formatManWon(monthlySavings)}씩 모으면 총 {durationResult.totalMonths}개월 뒤 달성!
                  </div>
                </div>
              </div>

              {/* Progress timeline metaphor */}
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Question & Insight Bar */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
              <HelpCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase">생각해 볼 질문</span>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                "돈을 모으는 데 가장 중요한 것은 무엇일까요?"
              </h4>
            </div>
          </div>

          <button
            onClick={() => setShowQuestionAnswer(!showQuestionAnswer)}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            {showQuestionAnswer ? '해설 닫기' : '답변 및 핵심 포인트 열기'}
          </button>
        </div>

        {showQuestionAnswer && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-fade-in">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-extrabold text-indigo-700 block mb-1">1. 명확한 목표와 금액</span>
              <p className="text-slate-600">
                "언젠가 부자 되어야지"가 아니라 "3년 안에 1,000만 원 모은다"처럼 기한과 액수가 정해져야 실천할 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-extrabold text-emerald-700 block mb-1">2. 저축의 습관화 (선저축 후지출)</span>
              <p className="text-slate-600">
                쓰고 남은 돈을 모으는 것이 아니라, 월급날 바로 자동이체로 저축액을 떼어놓는 습관이 성패를 가릅니다.
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-extrabold text-blue-700 block mb-1">3. 시간의 힘과 금융의 활용</span>
              <p className="text-slate-600">
                단순히 저금통에 모으는 것을 넘어, 이자와 투자를 돕는 '금융 시스템'을 이용해야 더 빠르게 목표에 도달합니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
