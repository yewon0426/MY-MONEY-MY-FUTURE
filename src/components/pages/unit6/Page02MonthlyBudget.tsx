import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Unit6BudgetAllocation, Unit6PlanState } from '../../../types';
import { evaluateMonthlyBudget } from '../../../utils/finance';

interface Page02Props {
  plan: Unit6PlanState;
  onUpdatePlan: React.Dispatch<React.SetStateAction<Unit6PlanState>>;
}

interface BudgetFieldMeta {
  key: keyof Unit6BudgetAllocation;
  label: string;
  group: '고정/필수' | '선택/생활' | '미래/보장';
  max: number;
  accent: string;
}

const BUDGET_FIELDS: BudgetFieldMeta[] = [
  { key: 'housing', label: '주거비 (월세·관리)', group: '고정/필수', max: 120, accent: 'accent-slate-800' },
  { key: 'food', label: '식비', group: '고정/필수', max: 100, accent: 'accent-slate-800' },
  { key: 'transport', label: '교통비', group: '고정/필수', max: 50, accent: 'accent-slate-800' },
  { key: 'telecom', label: '통신비 (폰·인터넷)', group: '고정/필수', max: 30, accent: 'accent-slate-800' },
  { key: 'leisure', label: '여가비 (취미·카페)', group: '선택/생활', max: 80, accent: 'accent-amber-600' },
  { key: 'other', label: '기타 지출', group: '선택/생활', max: 60, accent: 'accent-amber-600' },
  { key: 'savings', label: '저축 (예·적금)', group: '미래/보장', max: 140, accent: 'accent-blue-600' },
  { key: 'investment', label: '투자 (채권·ETF·주식)', group: '미래/보장', max: 120, accent: 'accent-indigo-600' },
  { key: 'insurance', label: '보험료', group: '미래/보장', max: 40, accent: 'accent-emerald-600' },
];

export const Page02MonthlyBudget: React.FC<Page02Props> = ({ plan, onUpdatePlan }) => {
  const evalRes = evaluateMonthlyBudget(plan.monthlyIncomeMan, plan.budget);

  const updateBudgetItem = (key: keyof Unit6BudgetAllocation, val: number) => {
    onUpdatePlan((prev) => ({
      ...prev,
      budget: {
        ...prev.budget,
        [key]: Math.max(0, val),
      },
    }));
  };

  const applyPreset = (preset: 'balanced' | 'overspend' | 'frugal') => {
    const map: Record<typeof preset, Unit6BudgetAllocation> = {
      balanced: {
        housing: 55,
        food: 45,
        transport: 15,
        telecom: 8,
        leisure: 22,
        savings: 55,
        investment: 30,
        insurance: 10,
        other: 10,
      },
      overspend: {
        housing: 75,
        food: 65,
        transport: 20,
        telecom: 12,
        leisure: 55,
        savings: 25,
        investment: 10,
        insurance: 8,
        other: 15,
      },
      frugal: {
        housing: 50,
        food: 35,
        transport: 12,
        telecom: 6,
        leisure: 12,
        savings: 70,
        investment: 45,
        insurance: 12,
        other: 8,
      },
    };
    onUpdatePlan((prev) => ({ ...prev, budget: map[preset] }));
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 2</span>
            <span aria-hidden="true">·</span>
            <span>9개 항목 월간 예산 배분</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            월간 소득 · 지출 예산 설계 (월 250만 원)
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => applyPreset('balanced')}
            className="min-h-[48px] px-4 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-black text-[17px] cursor-pointer whitespace-nowrap"
          >
            균형 설계형 (250만)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('frugal')}
            className="min-h-[48px] px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-black text-[17px] cursor-pointer whitespace-nowrap"
          >
            알뜰 저축형 (250만)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('overspend')}
            className="min-h-[48px] px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-950 font-black text-[17px] cursor-pointer whitespace-nowrap"
          >
            예산 초과 체험 (285만)
          </button>
        </div>
      </div>

      {/* Status Bar / Over-Budget Warning */}
      {evalRes.isOverBudget ? (
        <div
          role="alert"
          className="bg-rose-600 text-white rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md"
        >
          <div className="flex items-center gap-3 text-[21px] font-black">
            <AlertTriangle className="w-7 h-7 text-amber-300 shrink-0" />
            <span>
              예산 초과 경고! 월 소득(250만 원)보다 {evalRes.overAmountMan}만 원 더 배분했습니다. 지출이나 항목을 줄여 주세요.
            </span>
          </div>
          <span className="font-mono text-[24px] font-black bg-rose-800 px-4 py-1 rounded-xl">
            총 배분 {evalRes.totalAllocatedMan}만 원
          </span>
        </div>
      ) : (
        <div className="bg-slate-900 text-white rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[20px] font-black">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>
              총 배분: <span className="font-mono text-amber-300">{evalRes.totalAllocatedMan}만 원</span> / {plan.monthlyIncomeMan}만 원 · 남은 예비 금액:{' '}
              <span className="font-mono text-emerald-300">{evalRes.remainingMan}만 원</span>
            </span>
          </div>
          <div className="flex items-center gap-5 text-[19px] font-black">
            <span>생활 지출: {evalRes.livingExpenseMan}만 원</span>
            <span className="text-emerald-300">
              저축·투자: {evalRes.savingsAndInvestMan}만 원 ({evalRes.savingsRatePercent}%)
            </span>
          </div>
        </div>
      )}

      {/* 9-Item Grid (3x3 fits comfortably in 1920x1080) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1">
        {BUDGET_FIELDS.map((field) => {
          const val = plan.budget[field.key];
          return (
            <div
              key={field.key}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-2 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[14px] font-black text-slate-500 block">{field.group}</span>
                  <label
                    htmlFor={`budget-${field.key}`}
                    className="text-[21px] font-black text-slate-900"
                  >
                    {field.label}
                  </label>
                </div>
                <span className="font-mono text-[28px] font-black text-indigo-700 tabular-nums">
                  {val}만 원
                </span>
              </div>

              <input
                id={`budget-${field.key}`}
                type="range"
                min={0}
                max={field.max}
                step={1}
                value={val}
                onChange={(e) => updateBudgetItem(field.key, Number(e.target.value))}
                className={`w-full h-3 cursor-pointer ${field.accent}`}
              />

              <div className="flex justify-between items-center text-[15px] font-bold text-slate-500">
                <span>0만</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateBudgetItem(field.key, val - 5)}
                    className="min-h-[34px] px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black cursor-pointer"
                  >
                    -5
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBudgetItem(field.key, val + 5)}
                    className="min-h-[34px] px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black cursor-pointer"
                  >
                    +5
                  </button>
                </div>
                <span>{field.max}만</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
