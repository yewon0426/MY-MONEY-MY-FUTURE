import React, { useState } from 'react';
import { calculateNetSalary, formatWon } from '../../utils/finance';
import { VoteOption } from '../../types';
import { Users, HelpCircle, CheckCircle2, Plus, Minus, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface Page1Props {
  resetSignal: number;
}

const INITIAL_OPTIONS: VoteOption[] = [
  { id: 'opt1', label: '250만 원', amountWon: 2500000, votes: 4 },
  { id: 'opt2', label: '300만 원', amountWon: 3000000, votes: 12 },
  { id: 'opt3', label: '400만 원', amountWon: 4000000, votes: 8 },
  { id: 'opt4', label: '500만 원', amountWon: 5000000, votes: 6 },
  { id: 'opt5', label: '700만 원 이상', amountWon: 7000000, votes: 3 },
];

export const Page1Salary: React.FC<Page1Props> = ({ resetSignal }) => {
  const [options, setOptions] = useState<VoteOption[]>(INITIAL_OPTIONS);
  const [showDeductionModal, setShowDeductionModal] = useState<boolean>(false);
  const [selectedGrossSalary, setSelectedGrossSalary] = useState<number>(3000000);

  // Sync with reset signal
  React.useEffect(() => {
    setOptions(INITIAL_OPTIONS);
    setShowDeductionModal(false);
    setSelectedGrossSalary(3000000);
  }, [resetSignal]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const incrementVote = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  const decrementVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, votes: Math.max(0, opt.votes - 1) } : opt
      )
    );
  };

  const salaryBreakdown = calculateNetSalary(selectedGrossSalary);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[1700px] mx-auto animate-fade-in">
      {/* Question Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-sm font-bold tracking-wide">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>도입 질문 · 교실 실시간 투표</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
          "여러분은 30살이 되었을 때 한 달에 얼마를 벌고 싶나요?"
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl font-medium">
          화면의 선택지를 터치하면 학생들의 응답 수가 실시간으로 집계됩니다.
        </p>
      </div>

      {/* Main Voting Grid & Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 my-6">
        {options.map((opt) => {
          const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          return (
            <div
              key={opt.id}
              onClick={() => incrementVote(opt.id)}
              className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top: Label and Counter controls */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    선택지
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {opt.label}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => decrementVote(opt.id, e)}
                    disabled={opt.votes <= 0}
                    aria-label={`${opt.label} 표 차감`}
                    className="p-1 rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => incrementVote(opt.id)}
                    aria-label={`${opt.label} 표 증가`}
                    className="p-1 rounded-lg text-blue-600 hover:bg-white hover:text-blue-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center: Vote count and Bar Graph */}
              <div className="my-6 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                    {opt.votes}
                    <span className="text-base font-normal text-slate-500 ml-1">명</span>
                  </span>
                  <span className="text-lg font-bold text-blue-600 font-mono">
                    {percentage}%
                  </span>
                </div>

                {/* Vertical Bar gauge */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Bottom Touch hint */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  터치하여 투표 추가
                </span>
                <span className="font-semibold text-blue-600 group-hover:underline">
                  +1표
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action: Net Salary vs Gross Salary Difference */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider">
                핵심 질문
              </span>
              <span className="text-slate-300 text-sm font-medium">
                총 {totalVotes}명의 응답 집계됨
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              "월급 300만 원이면, 실제 통장에도 300만 원이 다 들어올까요?"
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">
              세금과 4대 사회보험료가 공제된 실제 '실수령액'을 확인해 보세요.
            </p>
          </div>

          <button
            onClick={() => setShowDeductionModal(!showDeductionModal)}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>세전 월급 vs 실수령액 차이 알아보기</span>
            {showDeductionModal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Expandable Breakdown Drawer */}
        {showDeductionModal && (
          <div className="mt-6 pt-6 border-t border-slate-800 animate-fade-in space-y-6">
            {/* Quick Gross Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-400 text-sm font-semibold">예시 월급 선택:</span>
              {[2500000, 3000000, 4000000, 5000000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedGrossSalary(amt)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    selectedGrossSalary === amt
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  세전 {formatWon(amt)}
                </button>
              ))}
            </div>

            {/* Net Salary Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gross */}
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-bold uppercase">
                  계약서상 월급 (세전)
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono my-2 tabular-nums">
                  {formatWon(salaryBreakdown.grossWon)}
                </span>
                <span className="text-xs text-slate-400">
                  회사와 계약한 연봉 ÷ 12개월 기준
                </span>
              </div>

              {/* Deductions */}
              <div className="bg-rose-950/40 rounded-2xl p-5 border border-rose-800/60 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 text-xs font-bold uppercase">
                    원천징수 공제액 합계
                  </span>
                  <span className="text-xs font-bold text-rose-400 bg-rose-900/60 px-2 py-0.5 rounded-md">
                    -{salaryBreakdown.deductionRate}%
                  </span>
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-rose-300 font-mono my-2 tabular-nums">
                  -{formatWon(salaryBreakdown.totalDeductions)}
                </span>
                <span className="text-xs text-rose-300/80">
                  4대 사회보험료 + 근로소득세 등
                </span>
              </div>

              {/* Net Take-home */}
              <div className="bg-emerald-950/40 rounded-2xl p-5 border border-emerald-500/60 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300 text-xs font-bold uppercase">
                    실제 내 통장 입금액 (실수령액)
                  </span>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    입금 완료
                  </span>
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono my-2 tabular-nums">
                  약 {formatWon(salaryBreakdown.netWon)}
                </span>
                <span className="text-xs text-emerald-300/80">
                  실제 내가 사용할 수 있는 한 달 소득!
                </span>
              </div>
            </div>

            {/* Detailed Deduction Items Pill Box */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/80">
              <div className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                <span>공제 내역 상세 (세전 {formatWon(salaryBreakdown.grossWon)} 기준):</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">국민연금 (4.5%)</div>
                  <div className="text-white font-mono font-bold mt-1">
                    {salaryBreakdown.nationalPension.toLocaleString()}원
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">건강보험 (3.545%)</div>
                  <div className="text-white font-mono font-bold mt-1">
                    {salaryBreakdown.healthInsurance.toLocaleString()}원
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">장기요양보험</div>
                  <div className="text-white font-mono font-bold mt-1">
                    {salaryBreakdown.longTermCare.toLocaleString()}원
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">고용보험 (0.9%)</div>
                  <div className="text-white font-mono font-bold mt-1">
                    {salaryBreakdown.employmentInsurance.toLocaleString()}원
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">근로소득세</div>
                  <div className="text-white font-mono font-bold mt-1">
                    {salaryBreakdown.incomeTax.toLocaleString()}원
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-400">지방소득세 (10%)</div>
                  <div className="text-white font-mono font-bold mt-1">
                    {salaryBreakdown.localIncomeTax.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <p className="text-xs text-slate-400 text-center">
              ※ 위 실수령액은 1인 단신 근로자 기준 교육용 예시이며, 실제 공제액은 개인의 비과세 수당(식대 등), 부양가족 수 등에 따라 다소 차이가 있을 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
