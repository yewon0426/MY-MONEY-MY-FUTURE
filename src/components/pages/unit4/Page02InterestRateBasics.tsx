import React, { useState, useEffect } from 'react';
import { Percent, ArrowDownRight, ArrowUpRight, Info } from 'lucide-react';
import { calculateLoanVsDepositImpact, formatWon } from '../../../utils/finance';

interface Page02Props {
  resetSignal: number;
}

type Step2Tab = 'concept' | 'simulator';

export const Page02InterestRateBasics: React.FC<Page02Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step2Tab>('concept');
  const [principalMan, setPrincipalMan] = useState<number>(100);
  const [years, setYears] = useState<number>(1);
  const [depositRate, setDepositRate] = useState<number>(3.5);
  const [loanRate, setLoanRate] = useState<number>(5.5);

  useEffect(() => {
    setActiveStep('concept');
    setPrincipalMan(100);
    setYears(1);
    setDepositRate(3.5);
    setLoanRate(5.5);
  }, [resetSignal]);

  const impact = calculateLoanVsDepositImpact(
    principalMan * 10000,
    depositRate,
    loanRate,
    years
  );
  const preTaxTotal = principalMan * 10000 + impact.depositInterestPreTaxWon;
  const postTaxTotal = principalMan * 10000 + impact.depositInterestPostTaxWon;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 2</span>
            <span aria-hidden="true">·</span>
            <span>금리의 기본 원리</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            금리란 무엇일까? (예금 금리 vs 대출 금리)
          </h2>
        </div>

        <nav
          aria-label="금리 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 'concept' as const, label: 'STEP 1. 예금 금리 vs 대출 금리' },
            { id: 'simulator' as const, label: 'STEP 2. 금리 변동 이자 시뮬레이터' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[52px] px-4 py-2 rounded-xl text-[18px] font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {activeStep === 'concept' ? (
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          {/* Core definition */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-[20px] font-black text-amber-300 flex items-center gap-2">
                <Percent className="w-6 h-6" />
                금리(이자율)의 핵심 의미
              </div>
              <p className="text-[24px] font-black leading-snug">
                금리는 &ldquo;돈을 일정 기간 빌려 쓰거나 맡긴 대가(돈의 가격)&rdquo;입니다.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl text-[19px] font-bold text-slate-200 shrink-0">
              단리·복리 원리 복습 → UNIT 02 PAGE 2
            </div>
          </div>

          {/* Deposit vs Loan Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[28px] font-black text-blue-950">예금 금리 (맡길 때 받는 비율)</span>
                <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <ArrowUpRight className="w-7 h-7" />
                </span>
              </div>
              <p className="text-[22px] font-bold text-slate-800 leading-relaxed">
                우리가 은행에 돈을 맡기면, 은행이 그 돈을 운용한 대가로 예금자에게 주는 이자 비율입니다.
              </p>
              <div className="bg-white border border-blue-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[19px] font-bold text-blue-900">금리가 올라갈 때 예금자의 입장</div>
                <div className="text-[21px] font-black text-blue-700">
                  이자 수입이 늘어나 저축 유인이 커집니다 (+유리)
                </div>
              </div>
            </div>

            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[28px] font-black text-rose-950">대출 금리 (빌릴 때 내는 비율)</span>
                <span className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center">
                  <ArrowDownRight className="w-7 h-7" />
                </span>
              </div>
              <p className="text-[22px] font-bold text-slate-800 leading-relaxed">
                개인이나 기업이 은행에서 돈을 빌릴 때, 원금과 함께 갚아야 하는 사용 대가 비율입니다.
              </p>
              <div className="bg-white border border-rose-200 rounded-2xl p-4 space-y-1.5">
                <div className="text-[19px] font-bold text-rose-900">금리가 올라갈 때 대출자의 입장</div>
                <div className="text-[21px] font-black text-rose-700">
                  갚아야 할 이자 비용이 커져 소비·투자 여력이 줄어듭니다 (-부담)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 flex items-center gap-3 text-[20px] font-bold text-amber-950">
            <Info className="w-6 h-6 text-amber-700 shrink-0" />
            <span>
              은행은 보통 예금 금리보다 대출 금리를 더 높게 책정하며(예대금리차), 그 차이로 운영 비용과 대출 부실 위험을 감당합니다. STEP 2에서 직접 계산해 봅시다!
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
          {/* Controls */}
          <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[20px] font-black text-slate-800 mb-2">
                  <span>기준 금액 (원금)</span>
                  <span className="font-mono text-blue-700">{principalMan.toLocaleString('ko-KR')}만 원</span>
                </div>
                <div className="flex gap-2">
                  {[100, 300, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPrincipalMan(amt)}
                      className={`flex-1 min-h-[48px] rounded-xl font-black text-[18px] cursor-pointer transition-all ${
                        principalMan === amt
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {amt}만
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[20px] font-black text-slate-800 mb-2">
                  <span>기간</span>
                  <span className="font-mono text-slate-900">{years}년</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 5].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYears(y)}
                      className={`flex-1 min-h-[48px] rounded-xl font-black text-[18px] cursor-pointer transition-all ${
                        years === y
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {y}년
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[20px] font-black text-blue-900 mb-1.5">
                  <label htmlFor="u4-p2-dep">연 예금 금리 (단리 기준 비교)</label>
                  <span className="font-mono text-blue-700">{depositRate.toFixed(1)}%</span>
                </div>
                <input
                  id="u4-p2-dep"
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={depositRate}
                  onChange={(e) => setDepositRate(Number(e.target.value))}
                  className="w-full h-3 accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[20px] font-black text-rose-900 mb-1.5">
                  <label htmlFor="u4-p2-loan">연 대출 금리</label>
                  <span className="font-mono text-rose-700">{loanRate.toFixed(1)}%</span>
                </div>
                <input
                  id="u4-p2-loan"
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full h-3 accent-rose-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-4 text-[18px] font-bold text-slate-700">
              금리 격차(예대마진):{' '}
              <span className="font-mono font-black text-slate-900">
                {impact.spreadPercent > 0 ? `+${impact.spreadPercent}` : impact.spreadPercent}%p
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[20px] font-black text-blue-800">예금자 (돈을 맡긴 경우)</span>
                <div className="text-[22px] font-bold text-slate-700 mt-2">
                  만기 수령액 (세후 15.4% 공제 후)
                </div>
                <div className="font-mono text-[40px] font-black text-blue-700 tabular-nums mt-2">
                  {formatWon(postTaxTotal)}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-blue-200 space-y-2 text-[19px] font-bold">
                <div className="flex justify-between">
                  <span className="text-slate-600">세전 이자</span>
                  <span className="font-mono text-slate-900">+{formatWon(impact.depositInterestPreTaxWon)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">세후 이자</span>
                  <span className="font-mono text-blue-700">+{formatWon(impact.depositInterestPostTaxWon)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2">
                  <span className="text-slate-600">세전 만기 금액</span>
                  <span className="font-mono text-slate-900">{formatWon(preTaxTotal)}</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[20px] font-black text-rose-800">대출자 (돈을 빌린 경우)</span>
                <div className="text-[22px] font-bold text-slate-700 mt-2">
                  {years}년간 부담해야 할 총 이자
                </div>
                <div className="font-mono text-[40px] font-black text-rose-700 tabular-nums mt-2">
                  -{formatWon(impact.loanInterestCostWon)}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-rose-200 space-y-2 text-[19px] font-bold">
                <div className="flex justify-between">
                  <span className="text-slate-600">원금 + 이자 총 상환액</span>
                  <span className="font-mono text-slate-900">
                    {formatWon(principalMan * 10000 + impact.loanInterestCostWon)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">매달 평균 이자 부담</span>
                  <span className="font-mono text-rose-700">
                    약 {formatWon(Math.round(impact.loanInterestCostWon / (years * 12)))}
                  </span>
                </div>
                <div className="text-[17px] text-slate-600 pt-1 border-t border-slate-100">
                  * 원금 만기 일시상환 단순 비교 기준
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
