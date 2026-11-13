import React from 'react';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Unit6PlanState } from '../../../types';
import { evaluateGoalFeasibility, evaluateMonthlyBudget } from '../../../utils/finance';

interface Page06Props {
  plan: Unit6PlanState;
  onUpdatePlan: React.Dispatch<React.SetStateAction<Unit6PlanState>>;
}

const GOAL_OPTIONS = [
  { id: 'goal-travel', title: '1년 뒤 해외·졸업 여행 자금', targetMan: 250, months: 12 },
  { id: 'goal-independence', title: '3년 뒤 독립·전세 보증금 마련', targetMan: 3000, months: 36 },
  { id: 'goal-seed', title: '5년 뒤 종잣돈 5,000만 원 만들기', targetMan: 5000, months: 60 },
  { id: 'goal-retire', title: '장기 노후 연금 기초 자산 1억 원', targetMan: 10000, months: 120 },
];

export const Page06GoalAchievementPlan: React.FC<Page06Props> = ({ plan, onUpdatePlan }) => {
  const budgetEval = evaluateMonthlyBudget(plan.monthlyIncomeMan, plan.budget);
  const goalEval = evaluateGoalFeasibility(
    plan.goalTargetMan,
    plan.goalMonths,
    budgetEval.savingsAndInvestMan,
    0
  );

  const selectGoal = (g: (typeof GOAL_OPTIONS)[number]) => {
    onUpdatePlan((prev) => ({
      ...prev,
      goalId: g.id,
      goalTitle: g.title,
      goalTargetMan: g.targetMan,
      goalMonths: g.months,
    }));
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 6</span>
            <span aria-hidden="true">·</span>
            <span>목표와 저축 계획 검증</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            재무 목표 설정과 달성 가능성 점검
          </h2>
        </div>

        <div className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[19px] font-black shrink-0">
          현재 나의 월 저축·투자 여력:{' '}
          <span className="font-mono text-emerald-300">{budgetEval.savingsAndInvestMan}만 원 / 월</span>
        </div>
      </div>

      {/* 4 Goal Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {GOAL_OPTIONS.map((g) => {
          const active = plan.goalId === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => selectGoal(g)}
              className={`min-h-[82px] p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                active
                  ? 'bg-indigo-700 text-white border-indigo-700 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-400'
              }`}
            >
              <span className={`text-[16px] font-black ${active ? 'text-indigo-200' : 'text-indigo-700'}`}>
                {g.months}개월 · {g.targetMan.toLocaleString('ko-KR')}만 원
              </span>
              <span className="text-[19px] font-black leading-snug mt-1">{g.title}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Target & Months Adjust */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="u6-p6-title" className="block text-[19px] font-black text-slate-900 mb-1.5">
                목표 제목 (직접 수정 가능)
              </label>
              <input
                id="u6-p6-title"
                type="text"
                value={plan.goalTitle}
                onChange={(e) =>
                  onUpdatePlan((prev) => ({ ...prev, goalTitle: e.target.value }))
                }
                className="w-full rounded-xl border-2 border-slate-300 focus:border-indigo-600 px-4 py-3 text-[19px] font-black text-slate-900 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                <label htmlFor="u6-p6-target">목표 금액</label>
                <span className="font-mono text-indigo-700">{plan.goalTargetMan.toLocaleString('ko-KR')}만 원</span>
              </div>
              <input
                id="u6-p6-target"
                type="range"
                min={100}
                max={12000}
                step={100}
                value={plan.goalTargetMan}
                onChange={(e) =>
                  onUpdatePlan((prev) => ({ ...prev, goalTargetMan: Number(e.target.value) }))
                }
                className="w-full h-3 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                <label htmlFor="u6-p6-months">목표 달성 기간</label>
                <span className="font-mono text-blue-700">
                  {plan.goalMonths}개월 ({Math.round((plan.goalMonths / 12) * 10) / 10}년)
                </span>
              </div>
              <input
                id="u6-p6-months"
                type="range"
                min={6}
                max={180}
                step={6}
                value={plan.goalMonths}
                onChange={(e) =>
                  onUpdatePlan((prev) => ({ ...prev, goalMonths: Number(e.target.value) }))
                }
                className="w-full h-3 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-4 text-[18px] font-bold text-slate-800">
            목표 달성을 위해 매월 필요한 원금 저축액:{' '}
            <span className="font-mono font-black text-indigo-800">
              월 {goalEval.requiredMonthlyMan}만 원
            </span>
          </div>
        </div>

        {/* Right: Feasibility Result */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {goalEval.isAchievable ? (
                <CheckCircle2 className="w-9 h-9 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-9 h-9 text-amber-600 shrink-0" />
              )}
              <div>
                <div className="text-[18px] font-bold text-slate-600">현재 저축 계획 기준 판정</div>
                <h3
                  className={`text-[28px] font-black ${
                    goalEval.isAchievable ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {goalEval.isAchievable
                    ? `기한 내 달성 가능! (+${goalEval.surplusMan.toLocaleString('ko-KR')}만 원 여유)`
                    : `목표보다 ${goalEval.shortfallMan.toLocaleString('ko-KR')}만 원 부족 (기간 또는 저축 조정 필요)`}
                </h3>
              </div>
            </div>
            <span className="font-mono text-[32px] font-black text-indigo-700 tabular-nums">
              {goalEval.achievementPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            <div className="flex justify-between text-[20px] font-black text-slate-800">
              <span>{plan.goalMonths}개월 동안 예상 적립 원금</span>
              <span className="font-mono text-indigo-700">
                {goalEval.projectedTotalMan.toLocaleString('ko-KR')}만 원 /{' '}
                {plan.goalTargetMan.toLocaleString('ko-KR')}만 원
              </span>
            </div>
            <div className="h-9 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  goalEval.isAchievable ? 'bg-emerald-600' : 'bg-amber-500'
                }`}
                style={{ width: `${goalEval.achievementPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-[19px] font-bold leading-relaxed flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-300 shrink-0" />
              <span>
                {goalEval.isAchievable
                  ? '고수익을 무리하게 기대하지 않고도 나의 실제 월 저축 능력만으로 목표를 달성할 수 있습니다.'
                  : `달성을 위해 목표 기간을 약 ${Math.max(
                      12,
                      Math.ceil(plan.goalTargetMan / Math.max(1, budgetEval.savingsAndInvestMan))
                    )}개월로 늘리거나 소비를 조정해 보세요.`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
