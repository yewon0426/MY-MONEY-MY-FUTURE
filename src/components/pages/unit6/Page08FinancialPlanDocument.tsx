import React, { useState } from 'react';
import { FileDown, Printer, CheckCircle2 } from 'lucide-react';
import type { Unit6PlanState } from '../../../types';
import {
  diagnoseFinancialPlan,
  evaluateEconomicShock,
  evaluateGoalFeasibility,
  evaluateMonthlyBudget,
} from '../../../utils/finance';
import { exportUnit6PlanToPdf } from '../../../utils/pdfExport';

interface Page08Props {
  plan: Unit6PlanState;
}

export const Page08FinancialPlanDocument: React.FC<Page08Props> = ({ plan }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'done' | 'error'>('idle');

  const budgetEval = evaluateMonthlyBudget(plan.monthlyIncomeMan, plan.budget);
  const shockImpact = evaluateEconomicShock(
    plan.monthlyIncomeMan,
    plan.budget,
    plan.emergencyFundMan,
    plan.activeShockId
  );
  const goalEval = evaluateGoalFeasibility(
    plan.goalTargetMan,
    plan.goalMonths,
    budgetEval.savingsAndInvestMan,
    0
  );
  const diagnosis = diagnoseFinancialPlan(plan);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setExportStatus('idle');
    try {
      await exportUnit6PlanToPdf(plan);
      setExportStatus('done');
    } catch {
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-3 print-document">
      {/* Header + Action Buttons (hidden on print) */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-3 no-print">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 8</span>
            <span aria-hidden="true">·</span>
            <span>최종 산출물 완성 (개인정보 미수집)</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            나의 첫 금융 생활 설계서
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {exportStatus === 'done' && (
            <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-black text-[17px] flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" />
              PDF 저장 완료!
            </span>
          )}
          {exportStatus === 'error' && (
            <span className="px-4 py-2 rounded-xl bg-rose-100 text-rose-900 font-black text-[17px]">
              PDF 생성 오류 — 다시 시도해 주세요
            </span>
          )}

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="min-h-[54px] px-6 py-2.5 bg-indigo-700 hover:bg-indigo-600 disabled:opacity-60 text-white rounded-2xl font-black text-[19px] flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
          >
            <FileDown className="w-6 h-6" />
            <span>{isExporting ? 'PDF 생성 중...' : 'PDF로 저장'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-[54px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-[19px] flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-5 h-5" />
            <span>인쇄하기</span>
          </button>
        </div>
      </div>

      {/* Formatted Single-View A4 Document Card */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-5 shadow-sm flex-1 flex flex-col justify-between gap-3">
        {/* Document Top Banner */}
        <div className="bg-slate-900 text-white rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[15px] font-bold text-indigo-300">
              고등학교 통합사회2 · 자산 관리와 금융 생활 설계 · 교육용 가상 설계서
            </div>
            <div className="text-[26px] font-black">나의 첫 금융 생활 설계서 요약</div>
          </div>
          <div className="text-right text-[16px] font-bold text-slate-300">
            <div>기준 월 소득: {plan.monthlyIncomeMan}만 원</div>
            <div>종합 진단 충족: {diagnosis.metCount} / 6개</div>
          </div>
        </div>

        {/* 4 Summary Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5">
            <div className="text-[15px] font-bold text-slate-600">월 소득 / 총 배분</div>
            <div className="font-mono text-[26px] font-black text-blue-800">
              {plan.monthlyIncomeMan}만 / {budgetEval.totalAllocatedMan}만
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
            <div className="text-[15px] font-bold text-slate-600">월 지출 (생활+보험)</div>
            <div className="font-mono text-[26px] font-black text-slate-900">
              {budgetEval.livingExpenseMan + budgetEval.insuranceMan}만 원
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5">
            <div className="text-[15px] font-bold text-slate-600">월 저축·투자 금액</div>
            <div className="font-mono text-[26px] font-black text-emerald-700">
              {budgetEval.savingsAndInvestMan}만 원 ({budgetEval.savingsRatePercent}%)
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
            <div className="text-[15px] font-bold text-slate-600">비상자금 확보</div>
            <div className="font-mono text-[26px] font-black text-amber-800">
              {plan.emergencyFundMan}만 원
            </div>
          </div>
        </div>

        {/* Middle 3-Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 items-stretch">
          {/* Col 1: 9-Item Expense/Saving Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
            <div className="text-[20px] font-black text-slate-900 border-b border-slate-200 pb-2">
              1. 항목별 월간 배분표
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[18px] font-bold flex-1 content-start">
              <div className="flex justify-between bg-white px-3 py-2 rounded-xl border border-slate-200"><span>주거비</span><span className="font-mono font-black">{plan.budget.housing}만</span></div>
              <div className="flex justify-between bg-white px-3 py-2 rounded-xl border border-slate-200"><span>식비</span><span className="font-mono font-black">{plan.budget.food}만</span></div>
              <div className="flex justify-between bg-white px-3 py-2 rounded-xl border border-slate-200"><span>교통비</span><span className="font-mono font-black">{plan.budget.transport}만</span></div>
              <div className="flex justify-between bg-white px-3 py-2 rounded-xl border border-slate-200"><span>통신비</span><span className="font-mono font-black">{plan.budget.telecom}만</span></div>
              <div className="flex justify-between bg-white px-3 py-2 rounded-xl border border-slate-200"><span>여가비</span><span className="font-mono font-black">{plan.budget.leisure}만</span></div>
              <div className="flex justify-between bg-white px-3 py-2 rounded-xl border border-slate-200"><span>기타 지출</span><span className="font-mono font-black">{plan.budget.other}만</span></div>
              <div className="flex justify-between bg-blue-50 px-3 py-2 rounded-xl border border-blue-200 text-blue-900"><span>저축</span><span className="font-mono font-black">{plan.budget.savings}만</span></div>
              <div className="flex justify-between bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-200 text-indigo-900"><span>투자</span><span className="font-mono font-black">{plan.budget.investment}만</span></div>
              <div className="flex justify-between bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 text-emerald-900 col-span-2">
                <span>보험료 (위험 대비 보장)</span><span className="font-mono font-black">{plan.budget.insurance}만 원</span>
              </div>
            </div>
          </div>

          {/* Col 2: Portfolio + Choice Reason */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
            <div className="text-[20px] font-black text-slate-900 border-b border-slate-200 pb-2">
              2. 선택 금융상품 & 배분 이유
            </div>
            <div className="grid grid-cols-2 gap-2 text-[17px] font-black">
              <span className="bg-white px-3 py-2.5 rounded-xl border border-slate-200 flex justify-between">
                <span>예·적금</span><span className="font-mono text-blue-700">{plan.portfolio.depositPercent}%</span>
              </span>
              <span className="bg-white px-3 py-2.5 rounded-xl border border-slate-200 flex justify-between">
                <span>채권</span><span className="font-mono text-emerald-700">{plan.portfolio.bondPercent}%</span>
              </span>
              <span className="bg-white px-3 py-2.5 rounded-xl border border-slate-200 flex justify-between">
                <span>펀드·ETF</span><span className="font-mono text-indigo-700">{plan.portfolio.fundEtfPercent}%</span>
              </span>
              <span className="bg-white px-3 py-2.5 rounded-xl border border-slate-200 flex justify-between">
                <span>주식</span><span className="font-mono text-amber-700">{plan.portfolio.stockPercent}%</span>
              </span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 flex-1 flex flex-col gap-1.5">
              <span className="text-[15px] font-black text-indigo-700">나의 상품 선택 근거</span>
              <p className="text-[18px] font-bold text-slate-800 leading-relaxed">
                {plan.portfolioReason}
              </p>
            </div>
          </div>

          {/* Col 3: Goal & Risk/Shock Plan */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
            <div className="text-[20px] font-black text-slate-900 border-b border-slate-200 pb-2">
              3. 재무 목표 & 위험 대비
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-[18px] font-bold space-y-1.5">
              <span className="text-[15px] font-black text-indigo-700 block">설정 재무 목표</span>
              <div className="text-[20px] font-black text-slate-900">{plan.goalTitle}</div>
              <div className="text-slate-700">
                목표 {plan.goalTargetMan.toLocaleString('ko-KR')}만 원 · {plan.goalMonths}개월 (달성률{' '}
                <span className="text-emerald-700 font-black">{goalEval.achievementPercent}%</span>)
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-[17px] font-bold text-slate-700 space-y-1.5 flex-1">
              <div className="text-[16px] font-black text-rose-800">
                점검 시나리오: {shockImpact.title}
              </div>
              <p className="leading-relaxed text-slate-800">{plan.riskResponsePlan}</p>
            </div>
          </div>
        </div>

        {/* Footer Educational Notice */}
        <div className="text-[15px] font-bold text-slate-600 border-t border-slate-200 pt-2 flex flex-wrap justify-between gap-2">
          <span>※ 본 설계서는 수업용 가상 시뮬레이션이며 실제 금융상품 권유·수익 보장이 아닙니다.</span>
          <span>학번·이름 등 개인정보 없이 안전하게 PDF로 저장할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
};
