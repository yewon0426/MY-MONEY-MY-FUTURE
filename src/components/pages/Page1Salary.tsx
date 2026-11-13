import React, { useState, useEffect } from 'react';
import { calculateNetSalary, formatWon } from '../../utils/finance';
import { VoteOption } from '../../types';
import { Users, Plus, Minus, CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface Page1Props {
  resetSignal: number;
}

type SalaryStep = 'step1' | 'step2';

const INITIAL_OPTIONS: VoteOption[] = [
  { id: 'opt1', label: '250만 원', amountWon: 2500000, votes: 4 },
  { id: 'opt2', label: '300만 원', amountWon: 3000000, votes: 12 },
  { id: 'opt3', label: '400만 원', amountWon: 4000000, votes: 8 },
  { id: 'opt4', label: '500만 원', amountWon: 5000000, votes: 6 },
  { id: 'opt5', label: '700만 원+', amountWon: 7000000, votes: 3 },
];

export const Page1Salary: React.FC<Page1Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<SalaryStep>('step1');
  const [options, setOptions] = useState<VoteOption[]>(INITIAL_OPTIONS);
  const [selectedGrossSalary, setSelectedGrossSalary] = useState<number>(3000000);

  useEffect(() => {
    setActiveStep('step1');
    setOptions(INITIAL_OPTIONS);
    setSelectedGrossSalary(3000000);
  }, [resetSignal]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const incrementVote = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  const decrementVote = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, votes: Math.max(0, opt.votes - 1) } : opt
      )
    );
  };

  const salaryBreakdown = calculateNetSalary(selectedGrossSalary);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 1</span>
            <span aria-hidden="true">·</span>
            <span>도입 질문과 소득의 현실</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            30살의 희망 월급과 실수령액의 비밀
          </h2>
        </div>

        <nav
          aria-label="월급과 실수령액 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 희망 월급 투표' },
            { id: 'step2' as const, label: 'STEP 2. 세전 vs 실수령액' },
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

      {/* ================= STEP 1. 희망 월급 투표 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div>
              <span className="text-[19px] font-black text-amber-300 block mb-1">
                교실 손들기 · 실시간 투표 ({totalVotes}명 참여 중)
              </span>
              <h3 className="text-[30px] xl:text-[34px] font-black text-white leading-snug">
                &ldquo;여러분은 30살이 되었을 때 한 달에 얼마를 벌고 싶나요?&rdquo;
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer shrink-0 active:scale-95"
            >
              <span>실수령액 확인하기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 flex-1">
            {options.map((opt) => {
              const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
              return (
                <div
                  key={opt.id}
                  className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-5 shadow-xs"
                >
                  <div>
                    <span className="text-[18px] font-bold text-slate-500 block">희망 월급</span>
                    <h4 className="text-[30px] xl:text-[34px] font-black text-slate-900 mt-1">
                      {opt.label}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[40px] xl:text-[44px] font-black text-slate-900 font-mono tabular-nums">
                        {opt.votes}
                        <span className="text-[22px] font-bold text-slate-500 ml-1">명</span>
                      </span>
                      <span className="text-[26px] font-black text-blue-700 font-mono tabular-nums">
                        {percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => decrementVote(opt.id)}
                      disabled={opt.votes <= 0}
                      aria-label={`${opt.label} 표 차감`}
                      className="min-h-[56px] rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-800 font-black text-[22px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Minus className="w-5 h-5" />
                      <span>-1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => incrementVote(opt.id)}
                      aria-label={`${opt.label} 표 추가`}
                      className="min-h-[56px] rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[22px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-5 h-5" />
                      <span>+1</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
            <span className="text-[22px] xl:text-[24px] font-black text-slate-900 flex items-center gap-3">
              <Users className="w-7 h-7 text-blue-700 shrink-0" />
              핵심 질문: &ldquo;월급 300만 원이면 실제 내 통장에도 300만 원이 다 들어올까요?&rdquo;
            </span>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 세전 vs 실수령액 비교 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          {/* Gross Salary Selector */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[26px] font-black text-slate-900">
              계약서상 월급(세전) 선택하기
            </span>
            <div className="flex flex-wrap gap-3">
              {[2500000, 3000000, 4000000, 5000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedGrossSalary(amt)}
                  className={`min-h-[60px] px-6 py-3 rounded-2xl text-[22px] font-black cursor-pointer transition-all tabular-nums ${
                    selectedGrossSalary === amt
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  세전 {formatWon(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Giant Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-200 flex flex-col justify-between gap-3">
              <span className="text-[22px] font-black text-slate-600">
                ① 계약서상 월급 (세전)
              </span>
              <span className="text-[40px] xl:text-[46px] font-black text-slate-900 font-mono tabular-nums">
                {formatWon(salaryBreakdown.grossWon)}
              </span>
              <span className="text-[20px] font-bold text-slate-600">
                연봉 ÷ 12개월 계약 기준 금액
              </span>
            </div>

            <div className="bg-rose-50 rounded-3xl p-7 border-2 border-rose-300 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[22px] font-black text-rose-900">
                  ② 원천징수 공제 합계
                </span>
                <span className="px-3.5 py-1 rounded-xl bg-rose-200 text-rose-950 font-black text-[20px] font-mono tabular-nums">
                  -{salaryBreakdown.deductionRate}%
                </span>
              </div>
              <span className="text-[40px] xl:text-[46px] font-black text-rose-700 font-mono tabular-nums">
                -{formatWon(salaryBreakdown.totalDeductions)}
              </span>
              <span className="text-[20px] font-bold text-rose-800">
                4대 사회보험료 + 근로·지방소득세
              </span>
            </div>

            <div className="bg-emerald-950 text-white rounded-3xl p-7 border-2 border-emerald-500 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[22px] font-black text-emerald-300">
                  ③ 실제 통장 입금액 (실수령액)
                </span>
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <span className="text-[40px] xl:text-[46px] font-black text-emerald-300 font-mono tabular-nums">
                약 {formatWon(salaryBreakdown.netWon)}
              </span>
              <span className="text-[20px] font-bold text-emerald-100">
                실제 내가 한 달 동안 쓸 수 있는 돈!
              </span>
            </div>
          </div>

          {/* 6 Detailed Deductions */}
          <div className="bg-slate-900 text-white rounded-3xl p-7 space-y-4">
            <div className="flex items-center gap-2.5 text-[22px] font-black text-amber-300">
              <Info className="w-6 h-6 shrink-0" />
              <span>월급에서 자동으로 빠져나가는 6가지 공제 항목 상세 (1인 근로자 예시)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: '국민연금 (4.5%)', val: salaryBreakdown.nationalPension },
                { name: '건강보험 (3.545%)', val: salaryBreakdown.healthInsurance },
                { name: '장기요양보험', val: salaryBreakdown.longTermCare },
                { name: '고용보험 (0.9%)', val: salaryBreakdown.employmentInsurance },
                { name: '근로소득세', val: salaryBreakdown.incomeTax },
                { name: '지방소득세 (10%)', val: salaryBreakdown.localIncomeTax },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between gap-1.5"
                >
                  <span className="text-[19px] font-bold text-slate-300">{item.name}</span>
                  <span className="text-[26px] font-mono font-black text-white tabular-nums">
                    {item.val.toLocaleString()}원
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
