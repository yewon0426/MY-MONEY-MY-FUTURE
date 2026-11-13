import React from 'react';
import { AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import type { Unit6PlanState, Unit6ShockId } from '../../../types';
import { evaluateEconomicShock, evaluateMonthlyBudget } from '../../../utils/finance';

interface Page05Props {
  plan: Unit6PlanState;
  onUpdatePlan: React.Dispatch<React.SetStateAction<Unit6PlanState>>;
}

const SHOCK_LIST: { id: Unit6ShockId; shortLabel: string; costBadge: string }[] = [
  { id: 'medical', shortLabel: '갑작스러운 병원비', costBadge: '-120만 (일시)' },
  { id: 'appliance', shortLabel: '가전제품 고장', costBadge: '-90만 (일시)' },
  { id: 'incomeDrop', shortLabel: '월 소득 30만 감소', costBadge: '-30만/월' },
  { id: 'familyEvent', shortLabel: '예상치 못한 경조사비', costBadge: '-40만 (일시)' },
  { id: 'inflation', shortLabel: '생활물가 +20만 상승', costBadge: '+20만/월' },
];

export const Page05UnexpectedEvent: React.FC<Page05Props> = ({ plan, onUpdatePlan }) => {
  const effectiveShock: Unit6ShockId =
    plan.activeShockId === 'none' ? 'medical' : plan.activeShockId;
  const impact = evaluateEconomicShock(
    plan.monthlyIncomeMan,
    plan.budget,
    plan.emergencyFundMan,
    effectiveShock
  );
  const budgetEval = evaluateMonthlyBudget(plan.monthlyIncomeMan, plan.budget);

  const selectShock = (id: Unit6ShockId) => {
    onUpdatePlan((prev) => ({
      ...prev,
      activeShockId: id,
    }));
  };

  const applyEmergencySpendCut = () => {
    onUpdatePlan((prev) => ({
      ...prev,
      budget: {
        ...prev.budget,
        leisure: Math.max(5, prev.budget.leisure - 12),
        other: Math.max(0, prev.budget.other - 8),
        savings: Math.max(10, prev.budget.savings - 10),
      },
      shockResolvedNote: '여가·기타 지출 20만 원과 저축 일부(10만 원)를 일시 조정해 적자를 방어함.',
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
            <span>PAGE 5</span>
            <span aria-hidden="true">·</span>
            <span>경제 충격 · 돌발 이벤트 테스트</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            예상치 못한 상황이 닥치면 내 계획은 버틸 수 있을까?
          </h2>
        </div>

        <button
          type="button"
          onClick={() => selectShock('none')}
          className="min-h-[48px] px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-[17px] cursor-pointer whitespace-nowrap shrink-0"
        >
          평상시 기준으로 기록
        </button>
      </div>

      {/* 5 Shock Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {SHOCK_LIST.map((item) => {
          const active = effectiveShock === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectShock(item.id)}
              className={`min-h-[78px] p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                active
                  ? 'bg-rose-700 text-white border-rose-700 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-rose-300'
              }`}
            >
              <span className={`text-[15px] font-black ${active ? 'text-rose-200' : 'text-rose-700'}`}>
                {item.costBadge}
              </span>
              <span className="text-[19px] font-black leading-snug">{item.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Impact & Mitigation Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Shock Result */}
        <div className="xl:col-span-6 bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-2">
            <div className="text-[22px] font-black text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <span>{impact.title}</span>
            </div>
            <p className="text-[20px] font-bold text-slate-800 leading-relaxed bg-rose-50 border border-rose-200 rounded-2xl p-4">
              {impact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`rounded-2xl p-4 border-2 ${
                impact.isEmergencyCovered
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-rose-50 border-rose-300'
              }`}
            >
              <div className="text-[17px] font-bold text-slate-700">충격 후 남은 비상자금</div>
              <div
                className={`font-mono text-[32px] font-black mt-1 ${
                  impact.isEmergencyCovered ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {impact.remainingEmergencyFundMan}만 원
              </div>
              <div className="text-[16px] font-black text-slate-700 mt-1">
                {impact.isEmergencyCovered
                  ? '비상자금으로 일시 비용 방어 가능'
                  : '비상자금 부족! 추가 현금 필요'}
              </div>
            </div>

            <div
              className={`rounded-2xl p-4 border-2 ${
                impact.adjustedMonthlyBalanceMan >= 0
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-rose-50 border-rose-300'
              }`}
            >
              <div className="text-[17px] font-bold text-slate-700">충격 후 월간 수지</div>
              <div
                className={`font-mono text-[32px] font-black mt-1 ${
                  impact.adjustedMonthlyBalanceMan >= 0 ? 'text-blue-700' : 'text-rose-700'
                }`}
              >
                {impact.adjustedMonthlyBalanceMan >= 0 ? '+' : ''}
                {impact.adjustedMonthlyBalanceMan}만 원
              </div>
              <div className="text-[16px] font-black text-slate-700 mt-1">
                기존 월 배분 합계 {budgetEval.totalAllocatedMan}만 원 기준
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 text-[18px] font-bold">
            <span className="text-amber-300 font-black">권장 대응:</span> {impact.recommendedAction}
          </div>
        </div>

        {/* Right: Adjust Emergency Fund & Response Plan */}
        <div className="xl:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[20px] font-black text-slate-900 mb-2">
                <label htmlFor="u6-p5-ef">보유 비상자금 목표액 조정</label>
                <span className="font-mono text-indigo-700">{plan.emergencyFundMan}만 원</span>
              </div>
              <input
                id="u6-p5-ef"
                type="range"
                min={0}
                max={600}
                step={50}
                value={plan.emergencyFundMan}
                onChange={(e) =>
                  onUpdatePlan((prev) => ({
                    ...prev,
                    emergencyFundMan: Number(e.target.value),
                  }))
                }
                className="w-full h-3 accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[15px] font-bold text-slate-500 mt-1">
                <span>0만 원</span>
                <span>권장: 월 생활비({budgetEval.livingExpenseMan}만) × 2~3개월 이상</span>
                <span>600만 원</span>
              </div>
            </div>

            <div>
              <div className="text-[20px] font-black text-slate-900 flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                나의 위험 대비 계획 (설계서에 자동 반영)
              </div>
              <textarea
                aria-label="위험 대비 계획"
                rows={3}
                value={plan.riskResponsePlan}
                onChange={(e) =>
                  onUpdatePlan((prev) => ({ ...prev, riskResponsePlan: e.target.value }))
                }
                className="w-full rounded-2xl border-2 border-slate-300 focus:border-indigo-600 p-4 text-[18px] font-bold text-slate-900 outline-none resize-none"
              />
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-[17px] font-bold text-indigo-950">
              {impact.adjustedMonthlyBalanceMan < 0
                ? '월 수지가 적자입니다! 선택 지출을 줄여 즉석에서 예산을 재편성할 수 있습니다.'
                : '필요시 비상 지출 조정 버튼으로 여가·기타 지출을 완화해 볼 수 있습니다.'}
            </div>
            <button
              type="button"
              onClick={applyEmergencySpendCut}
              className="min-h-[48px] px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl font-black text-[17px] flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <RefreshCw className="w-5 h-5" />
              <span>비상 지출 조정 적용</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
