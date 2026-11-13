import React from 'react';
import { CheckCircle2, AlertTriangle, Wrench, ArrowRight } from 'lucide-react';
import type { Unit6PlanState } from '../../../types';
import { diagnoseFinancialPlan } from '../../../utils/finance';

interface Page07Props {
  plan: Unit6PlanState;
  onNavigatePage: (pageNumber: number) => void;
}

const KEY_TO_TARGET_PAGE: Record<string, number> = {
  budgetFit: 2,
  savingsCapacity: 2,
  emergencyFund: 5,
  productRationale: 4,
  riskPreparedness: 5,
  goalSpecificity: 6,
};

export const Page07ComprehensiveDiagnosis: React.FC<Page07Props> = ({
  plan,
  onNavigatePage,
}) => {
  const diagnosis = diagnoseFinancialPlan(plan);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 7</span>
            <span aria-hidden="true">·</span>
            <span>6대 균형 기준 종합 점검</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            나의 금융 생활 계획 종합 진단
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`px-5 py-2.5 rounded-2xl font-black text-[20px] ${
              diagnosis.metCount === 6
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-100 text-amber-950 border border-amber-300'
            }`}
          >
            충족 항목: <span className="font-mono">{diagnosis.metCount} / 6개</span>
          </span>
          <button
            type="button"
            onClick={() => onNavigatePage(8)}
            className="min-h-[52px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-[19px] flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>최종 설계서 보기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 6 Diagnosis Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 flex-1">
        {diagnosis.criteria.map((c) => {
          const isOk = c.status === '충족';
          const isWarn = c.status === '보완 권장';
          const targetPage = KEY_TO_TARGET_PAGE[c.key] || 2;
          return (
            <div
              key={c.key}
              className={`rounded-3xl p-5 border-2 flex flex-col justify-between gap-3 shadow-sm ${
                isOk
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : isWarn
                  ? 'bg-amber-50/80 border-amber-300'
                  : 'bg-rose-50/80 border-rose-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-[16px] font-black text-white flex items-center gap-1.5 ${
                      isOk ? 'bg-emerald-600' : isWarn ? 'bg-amber-600' : 'bg-rose-600'
                    }`}
                  >
                    {isOk ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    {c.status}
                  </span>
                  <span className="font-mono text-[17px] font-black text-slate-800">
                    {c.scoreText}
                  </span>
                </div>

                <h3 className="text-[22px] font-black text-slate-900">{c.label}</h3>
                <p className="text-[18px] font-bold text-slate-700 leading-relaxed bg-white/85 rounded-2xl p-3.5 border border-slate-200/80">
                  {c.feedback}
                </p>
              </div>

              {!isOk && (
                <button
                  type="button"
                  onClick={() => onNavigatePage(targetPage)}
                  className="min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[17px] font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>PAGE {targetPage}에서 바로 보완하기</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Takeaway */}
      <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 text-[20px] font-bold flex items-center justify-between gap-4">
        <span>
          <span className="text-emerald-300 font-black">종합 피드백:</span> {diagnosis.overallComment}
        </span>
      </div>
    </div>
  );
};
