import React, { useState, useEffect } from 'react';
import {
  Wallet,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateInstallmentSavings,
  compareDepositAndSavings,
  calculateDemandDepositInterest,
  formatWon,
} from '../../../utils/finance';

interface Page02Props {
  resetSignal: number;
}

type StepKey = 'step1' | 'step2' | 'step3' | 'step4';

const SITUATIONS = [
  {
    id: 1,
    question: '다음 주 친구들과 떠날 여행 경비 50만 원을 언제든 꺼내 쓰려고 한다.',
    answer: '보통예금' as const,
    reason: '언제든 자유롭게 입금·출금할 수 있는 높은 유동성이 가장 중요합니다.',
  },
  {
    id: 2,
    question: '부모님께 물려받은 목돈 1,000만 원을 2년 동안 안전하게 묶어 이자를 받고 싶다.',
    answer: '정기예금' as const,
    reason: '이미 모은 목돈을 한 번에 거치하여 약정된 금리를 받는 정기예금이 유리합니다.',
  },
  {
    id: 3,
    question: '매달 알바비에서 30만 원씩 1년 동안 꾸준히 모아 졸업 여행 자금을 만들고 싶다.',
    answer: '정기적금' as const,
    reason: '매월 일정한 금액을 규칙적으로 납입해 목돈을 만들어가는 상품은 정기적금입니다.',
  },
];

export const Page02DepositSavings: React.FC<Page02Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<StepKey>('step1');

  // STEP 1: 보통예금
  const [demandBalance, setDemandBalance] = useState<number>(1000000);
  const [demandLog, setDemandLog] = useState<string>('초기 잔액 100만 원 입금 완료');

  // STEP 2: 정기예금 + 단리/복리
  const [fdPrincipal, setFdPrincipal] = useState<number>(10000000);
  const [fdRate, setFdRate] = useState<number>(4.0);
  const [fdYears, setFdYears] = useState<number>(5);
  const [fdViewMode, setFdViewMode] = useState<'calculator' | 'simpleVsCompound'>('calculator');

  // STEP 3: 정기적금 + 예금/적금 이자 차이
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(100000);
  const [savingsRate, setSavingsRate] = useState<number>(4.0);
  const [savingsMonths, setSavingsMonths] = useState<number>(12);
  const [savingsViewMode, setSavingsViewMode] = useState<'calculator' | 'whyLess'>('calculator');

  // STEP 4: 상황 비교 & 1억 원 예금자보호 퀴즈
  const [situationIndex, setSituationIndex] = useState<number>(0);
  const [situationAnswers, setSituationAnswers] = useState<Record<number, string>>({});
  const [protectionQuizChoice, setProtectionQuizChoice] = useState<number | null>(null);

  useEffect(() => {
    setActiveStep('step1');
    setDemandBalance(1000000);
    setDemandLog('초기 잔액 100만 원 입금 완료');
    setFdPrincipal(10000000);
    setFdRate(4.0);
    setFdYears(5);
    setFdViewMode('calculator');
    setMonthlyDeposit(100000);
    setSavingsRate(4.0);
    setSavingsMonths(12);
    setSavingsViewMode('calculator');
    setSituationIndex(0);
    setSituationAnswers({});
    setProtectionQuizChoice(null);
  }, [resetSignal]);

  const demandInterest = calculateDemandDepositInterest(demandBalance, 0.5, 365);
  const simpleRes = calculateSimpleInterest(fdPrincipal, fdRate, fdYears);
  const compoundRes = calculateCompoundInterest(fdPrincipal, fdRate, fdYears);

  const installmentRes = calculateInstallmentSavings(monthlyDeposit, savingsRate, savingsMonths);
  const compSameTotal = compareDepositAndSavings(monthlyDeposit * savingsMonths, savingsRate, savingsMonths);

  // SVG chart values for Simple vs Compound (up to maxYear = Math.max(fdYears, 5), show 5~10y clean)
  const chartYears = fdYears <= 5 ? [1, 2, 3, 4, 5] : Array.from({ length: fdYears }, (_, i) => i + 1);
  const maxChartVal = Math.max(
    ...chartYears.map((y) => {
      const row = compoundRes.yearlyBreakdown[y - 1];
      return row ? row.compoundTotal : fdPrincipal;
    }),
    fdPrincipal * 1.2
  );
  const minChartVal = fdPrincipal * 0.9;

  const currentSituation = SITUATIONS[situationIndex];
  const chosenForSituation = situationAnswers[currentSituation.id];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-5">
      {/* Page Header & 4-STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-emerald-800">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 2</span>
            <span aria-hidden="true">·</span>
            <span>안전한 저축 자산의 원리</span>
          </div>
          <h2 className="text-[34px] xl:text-[40px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            예금과 적금 · 단리와 복리
          </h2>
        </div>

        <nav
          aria-label="예금과 적금 학습 단계"
          className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 보통예금' },
            { id: 'step2' as const, label: 'STEP 2. 정기예금' },
            { id: 'step3' as const, label: 'STEP 3. 정기적금' },
            { id: 'step4' as const, label: 'STEP 4. 예금상품 비교' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[52px] px-3.5 py-2.5 rounded-xl text-[18px] font-black transition-all cursor-pointer whitespace-nowrap ${
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

      {/* ================= STEP 1. 보통예금 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-blue-700">
                <Wallet className="w-9 h-9 shrink-0" />
                <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                  보통예금이란? (요구불예금)
                </h3>
              </div>

              <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                은행에 돈을 맡겨두고 <strong className="text-blue-700">원할 때 언제든지 입금·출금·송금</strong>할 수 있는 가장 기본적인 통장입니다.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 space-y-3">
                <h4 className="text-[26px] font-black text-blue-950">핵심 특징 3가지</h4>
                <ul className="space-y-2.5 text-[24px] font-bold text-slate-800">
                  <li>1. 유동성 최고 — 체크카드 결제, 계좌이체 즉시 가능</li>
                  <li>2. 낮은 금리 — 보통 연 0.1% ~ 1.0% 내외의 적은 이자</li>
                  <li>3. 실생활 예시 — 용돈 통장, 알바비 월급 통장, 비상금</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5 text-[24px] font-bold text-slate-800">
              질문: &ldquo;내일 친구 생일 선물을 사야 할 돈은 정기적금과 보통예금 중 어디에 두어야 할까요?&rdquo;
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-black text-amber-300">보통예금 입출금 체험</span>
                <span className="text-[22px] font-bold text-slate-300">적용 금리 연 0.5%</span>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <span className="text-[22px] font-bold text-slate-300 block">현재 통장 잔액</span>
                <div className="text-[40px] xl:text-[48px] font-mono font-black text-emerald-400 tabular-nums mt-1">
                  {formatWon(demandBalance)}
                </div>
                <div className="mt-3 text-[22px] font-bold text-slate-300 tabular-nums">
                  1년 유지 시 예상 세후 이자: {formatWon(demandInterest.postTaxInterest)}
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 text-[22px] font-bold text-amber-200">
                최근 거래 기록: {demandLog}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setDemandBalance((b) => b + 500000);
                  setDemandLog('알바비 +50만 원 자유 입금');
                }}
                className="min-h-[68px] px-5 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[24px] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <ArrowDownLeft className="w-7 h-7" />
                <span>+50만 원 입금</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (demandBalance >= 200000) {
                    setDemandBalance((b) => b - 200000);
                    setDemandLog('생활비 -20만 원 즉시 출금');
                  } else {
                    setDemandLog('잔액이 부족해 20만 원을 출금할 수 없습니다.');
                  }
                }}
                className="min-h-[68px] px-5 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-[24px] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <ArrowUpRight className="w-7 h-7" />
                <span>-20만 원 출금</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDemandBalance((b) => b + 1000000);
                  setDemandLog('용돈·상여금 +100만 원 입금');
                }}
                className="min-h-[64px] px-5 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-black text-[22px] cursor-pointer active:scale-95"
              >
                +100만 원 입금
              </button>
              <button
                type="button"
                onClick={() => {
                  setDemandBalance(1000000);
                  setDemandLog('잔액 100만 원으로 초기화');
                }}
                className="min-h-[64px] px-5 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-black text-[22px] cursor-pointer active:scale-95"
              >
                잔액 초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 정기예금 + 단리 vs 복리 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border-2 border-slate-200">
            <div>
              <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                정기예금: 목돈을 한 번에 맡기고 약정 이자 받기
              </h3>
              <p className="text-[22px] font-bold text-slate-600 mt-1">
                목돈을 정해진 만기까지 거치하면 보통예금보다 높은 금리를 제공합니다.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setFdViewMode('calculator')}
                className={`min-h-[56px] px-6 py-2.5 rounded-xl text-[22px] font-black cursor-pointer ${
                  fdViewMode === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                목돈 예치 계산기
              </button>
              <button
                type="button"
                onClick={() => setFdViewMode('simpleVsCompound')}
                className={`min-h-[56px] px-6 py-2.5 rounded-xl text-[22px] font-black cursor-pointer ${
                  fdViewMode === 'simpleVsCompound' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                단리 vs 복리 그래프 비교
              </button>
            </div>
          </div>

          {fdViewMode === 'calculator' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
              <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
                <h4 className="text-[28px] font-black text-slate-900">정기예금 조건 설정</h4>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[24px] font-black text-slate-800 mb-3">
                      <span>예치 원금 (목돈)</span>
                      <span className="font-mono text-blue-700 tabular-nums">{formatWon(fdPrincipal)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[1000000, 5000000, 10000000, 30000000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setFdPrincipal(amt)}
                          className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer ${
                            fdPrincipal === amt ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {formatWon(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[24px] font-black text-slate-800 mb-3">
                      <span>연 이자율 (금리)</span>
                      <span className="font-mono text-emerald-700 tabular-nums">연 {fdRate.toFixed(1)}%</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[3.0, 4.0, 5.0, 7.0].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setFdRate(r)}
                          className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                            fdRate === r ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {r.toFixed(1)}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[24px] font-black text-slate-800 mb-3">
                      <span>예치 기간 (만기)</span>
                      <span className="font-mono text-indigo-700 tabular-nums">{fdYears}년</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 3, 5, 10].map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => setFdYears(y)}
                          className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                            fdYears === y ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {y}년
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
                <h4 className="text-[28px] font-black text-amber-300">만기 수령 결과 ({fdYears}년 기준)</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <span className="text-[22px] font-bold text-slate-300 block">단리 세전 이자</span>
                    <span className="text-[36px] xl:text-[40px] font-mono font-black text-blue-400 tabular-nums block mt-1">
                      +{formatWon(simpleRes.preTaxInterest)}
                    </span>
                    <span className="text-[20px] text-slate-400 font-bold block mt-1 tabular-nums">
                      이자소득세 15.4% 제외 세후 +{formatWon(simpleRes.postTaxInterest)}
                    </span>
                  </div>

                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                    <span className="text-[22px] font-bold text-slate-300 block">복리 세전 이자</span>
                    <span className="text-[36px] xl:text-[40px] font-mono font-black text-emerald-400 tabular-nums block mt-1">
                      +{formatWon(compoundRes.preTaxInterest)}
                    </span>
                    <span className="text-[20px] text-emerald-300 font-bold block mt-1 tabular-nums">
                      단리 대비 +{formatWon(compoundRes.preTaxInterest - simpleRes.preTaxInterest)} 추가
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-950/70 border-2 border-emerald-500 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <span className="text-[22px] font-bold text-emerald-200 block">단리 세후 최종 수령액</span>
                    <span className="text-[40px] xl:text-[46px] font-mono font-black text-white tabular-nums">
                      {formatWon(simpleRes.totalPostTax)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFdViewMode('simpleVsCompound')}
                    className="min-h-[60px] px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl cursor-pointer"
                  >
                    단리 vs 복리 보기 →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h4 className="text-[28px] font-black text-slate-900">
                    단리 vs 복리 자산 성장 그래프 ({formatWon(fdPrincipal)} · 연 {fdRate.toFixed(1)}%)
                  </h4>
                  <div className="flex items-center gap-5 text-[22px] font-black">
                    <span className="text-blue-700">● 단리 (원금만 이자)</span>
                    <span className="text-emerald-700">▲ 복리 (원금+이자에 이자)</span>
                  </div>
                </div>

                {/* Clear Linear SVG Comparison Graph */}
                <svg viewBox="0 0 820 340" className="w-full h-[320px] overflow-visible">
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = 270 - ratio * 220;
                    const val = Math.round(minChartVal + ratio * (maxChartVal - minChartVal));
                    return (
                      <g key={idx}>
                        <line x1={120} y1={y} x2={790} y2={y} stroke="#e2e8f0" strokeWidth={2} />
                        <text x={110} y={y + 7} textAnchor="end" fontSize={20} fontWeight={700} fill="#475569">
                          {Math.round(val / 10000).toLocaleString()}만
                        </text>
                      </g>
                    );
                  })}

                  {(() => {
                    const getX = (i: number) =>
                      150 + (i / Math.max(1, chartYears.length - 1)) * 610;
                    const getY = (val: number) =>
                      270 - ((val - minChartVal) / Math.max(1, maxChartVal - minChartVal)) * 220;

                    const simplePts = chartYears
                      .map((yr, i) => {
                        const row = compoundRes.yearlyBreakdown[yr - 1];
                        return `${getX(i)},${getY(row ? row.simpleTotal : fdPrincipal)}`;
                      })
                      .join(' ');
                    const compoundPts = chartYears
                      .map((yr, i) => {
                        const row = compoundRes.yearlyBreakdown[yr - 1];
                        return `${getX(i)},${getY(row ? row.compoundTotal : fdPrincipal)}`;
                      })
                      .join(' ');

                    return (
                      <>
                        <polyline
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth={5}
                          strokeDasharray="10 6"
                          points={simplePts}
                        />
                        <polyline
                          fill="none"
                          stroke="#059669"
                          strokeWidth={6}
                          points={compoundPts}
                        />
                        {chartYears.map((yr, i) => {
                          const row = compoundRes.yearlyBreakdown[yr - 1];
                          const x = getX(i);
                          const sy = getY(row ? row.simpleTotal : fdPrincipal);
                          const cy = getY(row ? row.compoundTotal : fdPrincipal);
                          return (
                            <g key={yr}>
                              <circle cx={x} cy={sy} r={8} fill="#2563eb" />
                              <circle cx={x} cy={cy} r={9} fill="#059669" />
                              <text x={x} y={310} textAnchor="middle" fontSize={22} fontWeight={800} fill="#1e293b">
                                {yr}년
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <h4 className="text-[28px] font-black text-amber-300">왜 시간이 갈수록 격차가 커질까요?</h4>
                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                    <span className="text-[24px] font-black text-blue-300 block">단리 (Simple Interest)</span>
                    <p className="text-[22px] text-slate-200 font-semibold leading-relaxed">
                      매년 <strong className="text-white">처음 맡긴 원금에만</strong> 일정한 이자가 붙어 직선으로 늘어납니다.
                    </p>
                  </div>
                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
                    <span className="text-[24px] font-black text-emerald-300 block">복리 (Compound Interest)</span>
                    <p className="text-[22px] text-slate-200 font-semibold leading-relaxed">
                      원금에 붙은 <strong className="text-emerald-300">이자에도 다시 이자가 붙어</strong> 시간이 길수록 눈덩이처럼 커집니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {[3, 5, 10, 20].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setFdYears(y)}
                      className={`flex-1 min-h-[58px] rounded-xl text-[22px] font-black cursor-pointer tabular-nums ${
                        fdYears === y ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {y}년
                    </button>
                  ))}
                </div>

                <div className="p-5 bg-emerald-950/70 border border-emerald-500 rounded-2xl">
                  <span className="text-[22px] text-emerald-200 font-bold block">
                    {fdYears}년 뒤 복리가 단리보다 더 받는 금액
                  </span>
                  <span className="text-[38px] font-mono font-black text-emerald-300 tabular-nums">
                    +{formatWon(compoundRes.preTaxInterest - simpleRes.preTaxInterest)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= STEP 3. 정기적금 + 왜 예금과 이자가 다를까? ================= */}
      {activeStep === 'step3' && (
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border-2 border-slate-200">
            <div>
              <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                정기적금: 매달 일정 금액을 쌓아 목돈 만들기
              </h3>
              <p className="text-[22px] font-bold text-slate-600 mt-1">
                매월 정해진 금액을 꾸준히 불입해 목표 자금을 모으는 저축 상품입니다.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setSavingsViewMode('calculator')}
                className={`min-h-[56px] px-6 py-2.5 rounded-xl text-[22px] font-black cursor-pointer ${
                  savingsViewMode === 'calculator' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                적금 만기 계산기
              </button>
              <button
                type="button"
                onClick={() => setSavingsViewMode('whyLess')}
                className={`min-h-[56px] px-6 py-2.5 rounded-xl text-[22px] font-black cursor-pointer ${
                  savingsViewMode === 'whyLess' ? 'bg-amber-500 text-slate-950' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                왜 예금과 이자가 다를까?
              </button>
            </div>
          </div>

          {savingsViewMode === 'calculator' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
              <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
                <h4 className="text-[28px] font-black text-slate-900">매달 적립 조건</h4>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[24px] font-black text-slate-800 mb-3">
                      <span>월 납입 금액</span>
                      <span className="font-mono text-emerald-700 tabular-nums">{formatWon(monthlyDeposit)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[100000, 300000, 500000, 1000000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setMonthlyDeposit(amt)}
                          className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer ${
                            monthlyDeposit === amt ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {formatWon(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[24px] font-black text-slate-800 mb-3">
                      <span>적금 연 금리</span>
                      <span className="font-mono text-blue-700 tabular-nums">연 {savingsRate.toFixed(1)}%</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[3.0, 4.0, 5.0, 6.0].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSavingsRate(r)}
                          className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                            savingsRate === r ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {r.toFixed(1)}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[24px] font-black text-slate-800 mb-3">
                      <span>적립 기간</span>
                      <span className="font-mono text-indigo-700 tabular-nums">{savingsMonths}개월</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[12, 24, 36].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setSavingsMonths(m)}
                          className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                            savingsMonths === m ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                          }`}
                        >
                          {m}개월 ({m / 12}년)
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
                <div className="flex items-center gap-3">
                  <PiggyBank className="w-9 h-9 text-emerald-400" />
                  <h4 className="text-[28px] font-black text-white">적금 만기 수령 결과</h4>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <span className="text-[24px] font-bold text-slate-300">총 납입 원금</span>
                    <span className="text-[36px] font-mono font-black text-white tabular-nums">
                      {formatWon(installmentRes.totalPrincipalWon)}
                    </span>
                  </div>
                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <span className="text-[24px] font-bold text-slate-300">세전 총 이자</span>
                    <span className="text-[36px] font-mono font-black text-emerald-400 tabular-nums">
                      +{formatWon(installmentRes.preTaxInterest)}
                    </span>
                  </div>
                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <span className="text-[24px] font-bold text-slate-300">세후 실수령 이자 (15.4% 공제)</span>
                    <span className="text-[32px] font-mono font-black text-amber-300 tabular-nums">
                      +{formatWon(installmentRes.postTaxInterest)}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-950/70 border-2 border-emerald-500 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <span className="text-[22px] font-bold text-emerald-200 block">만기 세후 총액</span>
                    <span className="text-[40px] xl:text-[46px] font-mono font-black text-white tabular-nums">
                      {formatWon(installmentRes.totalPostTax)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSavingsViewMode('whyLess')}
                    className="min-h-[60px] px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl cursor-pointer"
                  >
                    이자 원리 보기 →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-5">
                <h4 className="text-[28px] font-black text-slate-900">
                  납입 회차별 이자가 붙는 기간 비교 (12개월 기준)
                </h4>

                <p className="text-[24px] font-semibold text-slate-700 leading-relaxed">
                  적금은 매달 돈을 나누어 넣기 때문에 <strong className="text-emerald-700">1회차 돈은 12개월</strong> 이자가 붙지만,{' '}
                  <strong className="text-rose-700">마지막 12회차 돈은 1개월</strong>만 이자가 붙습니다.
                </p>

                {/* 12 Installment Duration Bars */}
                <div className="space-y-2.5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  {[1, 2, 3, 6, 9, 12].map((monthIdx) => {
                    const activeMonths = 13 - monthIdx;
                    const widthPercent = Math.round((activeMonths / 12) * 100);
                    return (
                      <div key={monthIdx} className="flex items-center gap-4">
                        <span className="w-24 text-[22px] font-black text-slate-800 shrink-0 tabular-nums">
                          {monthIdx}회차
                        </span>
                        <div className="flex-1 bg-slate-200 h-8 rounded-xl overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 flex items-center justify-end pr-3 text-white font-black text-[20px] tabular-nums"
                            style={{ width: `${widthPercent}%` }}
                          >
                            {activeMonths}개월 이자
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
                <h4 className="text-[28px] font-black text-amber-300">
                  같은 {formatWon(monthlyDeposit * savingsMonths)} · 연 {savingsRate.toFixed(1)}% · {savingsMonths}개월 비교
                </h4>

                <div className="space-y-4">
                  <div className="bg-blue-950/70 border-2 border-blue-400 p-6 rounded-2xl">
                    <span className="text-[22px] font-bold text-blue-200 block">
                      정기예금 (처음부터 전액 거치)
                    </span>
                    <span className="text-[40px] font-mono font-black text-white tabular-nums block mt-1">
                      +{formatWon(compSameTotal.fixedDeposit.preTaxInterest)}
                    </span>
                  </div>

                  <div className="bg-emerald-950/70 border-2 border-emerald-400 p-6 rounded-2xl">
                    <span className="text-[22px] font-bold text-emerald-200 block">
                      정기적금 (매월 {formatWon(monthlyDeposit)} 분할 적립)
                    </span>
                    <span className="text-[40px] font-mono font-black text-emerald-300 tabular-nums block mt-1">
                      +{formatWon(compSameTotal.installmentSavings.preTaxInterest)}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-[22px] font-bold text-slate-200 leading-relaxed">
                  세전 이자 차이: <strong className="text-amber-300 font-mono tabular-nums">{formatWon(compSameTotal.interestDifference)}</strong> (적금은 평균 약 절반 기간만 예치되기 때문!)
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= STEP 4. 예금상품 비교 & 예금자보호 1억 원 ================= */}
      {activeStep === 'step4' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          {/* Left: 상황별 알맞은 예금상품 고르기 */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[28px] xl:text-[32px] font-black text-slate-900">
                  상황별 상품 선택 ({situationIndex + 1} / {SITUATIONS.length})
                </h3>
                <div className="flex gap-2">
                  {SITUATIONS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSituationIndex(idx)}
                      className={`min-h-[48px] w-12 rounded-xl font-black text-[22px] cursor-pointer ${
                        idx === situationIndex ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <p className="text-[26px] xl:text-[28px] font-black text-slate-900 leading-snug">
                  &ldquo;{currentSituation.question}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['보통예금', '정기예금', '정기적금'] as const).map((option) => {
                  const isChosen = chosenForSituation === option;
                  const isRight = option === currentSituation.answer;
                  let style = 'bg-slate-100 hover:bg-slate-200 text-slate-900';
                  if (chosenForSituation) {
                    if (isRight) style = 'bg-emerald-600 text-white';
                    else if (isChosen) style = 'bg-rose-600 text-white';
                  }
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSituationAnswers((prev) => ({
                          ...prev,
                          [currentSituation.id]: option,
                        }))
                      }
                      className={`min-h-[68px] rounded-2xl font-black text-[24px] cursor-pointer transition-all ${style}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {chosenForSituation && (
                <div
                  className={`p-5 rounded-2xl border-2 text-[22px] font-bold flex items-start gap-3 ${
                    chosenForSituation === currentSituation.answer
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-rose-50 border-rose-400 text-rose-950'
                  }`}
                >
                  {chosenForSituation === currentSituation.answer ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-7 h-7 text-rose-600 shrink-0 mt-1" />
                  )}
                  <div>
                    <span className="font-black block">
                      {chosenForSituation === currentSituation.answer ? '정답입니다!' : `정답은 '${currentSituation.answer}'입니다.`}
                    </span>
                    <span className="font-semibold">{currentSituation.reason}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <button
                type="button"
                disabled={situationIndex === 0}
                onClick={() => setSituationIndex((i) => Math.max(0, i - 1))}
                className="min-h-[56px] px-6 rounded-2xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 font-black text-[22px] text-slate-900 cursor-pointer"
              >
                이전 상황
              </button>
              <button
                type="button"
                disabled={situationIndex === SITUATIONS.length - 1}
                onClick={() => setSituationIndex((i) => Math.min(SITUATIONS.length - 1, i + 1))}
                className="min-h-[56px] px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 font-black text-[22px] text-white cursor-pointer"
              >
                다음 상황
              </button>
            </div>
          </div>

          {/* Right: 예금자보호제도 1억 원 & 1.2억 원 퀴즈 */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="w-9 h-9 shrink-0" />
                <h3 className="text-[28px] xl:text-[32px] font-black text-white">
                  예금자보호제도: 1인당 최고 1억 원
                </h3>
              </div>

              <p className="text-[22px] xl:text-[24px] text-slate-200 font-semibold leading-relaxed">
                금융기관이 파산하더라도 <strong className="text-emerald-300">1개 금융회사당 1인당 원금 + 소정의 이자를 합쳐 최고 1억 원</strong>까지 법으로 안전하게 보호합니다. (2025년 9월 상향 적용)
              </p>

              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4">
                <p className="text-[24px] font-black text-amber-300 leading-snug">
                  퀴즈: 같은 A은행에 원금과 이자를 합쳐 1억 2,000만 원을 예금했는데 A은행이 파산했다면 얼마를 돌려받을까요?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['1억 2,000만 원 전액', '최고 1억 원까지', '5,000만 원까지'].map((label, idx) => {
                    const isPicked = protectionQuizChoice === idx;
                    const isRight = idx === 1;
                    let cls = 'bg-slate-700 hover:bg-slate-600 text-white';
                    if (protectionQuizChoice !== null) {
                      if (isRight) cls = 'bg-emerald-500 text-slate-950';
                      else if (isPicked) cls = 'bg-rose-600 text-white';
                    }
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setProtectionQuizChoice(idx)}
                        className={`min-h-[60px] px-4 py-3 rounded-xl font-black text-[22px] cursor-pointer ${cls}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {protectionQuizChoice !== null && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-[22px] font-bold text-slate-100">
                    {protectionQuizChoice === 1 ? (
                      <span className="text-emerald-300">정답! </span>
                    ) : (
                      <span className="text-rose-300">오답입니다. </span>
                    )}
                    같은 금융회사에서는 최고 1억 원까지만 보호되므로, 1억 원을 넘는 금액은 서로 다른 은행에 나누어 예치해야 안전합니다!
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-[22px] font-bold text-slate-300 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-amber-400 shrink-0" />
              <span>예적금은 원금이 안전하지만, 주식·펀드·코인은 예금자보호 대상이 아닙니다.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
