import React, { useState, useEffect } from 'react';
import { formatManWon } from '../../utils/finance';
import { HelpCircle, Calculator, ArrowRight } from 'lucide-react';

interface Page8Props {
  resetSignal: number;
}

type NetWorthStep = 'step1' | 'step2';

export const Page8AssetsLiabilities: React.FC<Page8Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<NetWorthStep>('step1');
  const [showCalculation, setShowCalculation] = useState<boolean>(false);
  const [predictedAmount, setPredictedAmount] = useState<number | null>(null);

  useEffect(() => {
    setActiveStep('step1');
    setShowCalculation(false);
    setPredictedAmount(null);
  }, [resetSignal]);

  const assets = [
    { name: '은행 예금', amount: 1000, desc: '비상금 통장 및 적금' },
    { name: '보유 주식', amount: 500, desc: '국내외 우량주 평가액' },
    { name: '자동차', amount: 1500, desc: '현재 중고 시세 평가액' },
  ];

  const liabilities = [
    { name: '자동차 할부 대출', amount: 800, desc: '차량 구매 시 발생한 대출 잔액' },
    { name: '대학 학자금 대출', amount: 500, desc: '한국장학재단 학자금 대출' },
  ];

  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0);
  const netWorthMan = totalAssets - totalLiabilities;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 8</span>
            <span aria-hidden="true">·</span>
            <span>30세 직장인 민우의 재무 상태표</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            자산 · 부채 · 순자산
          </h2>
        </div>

        <nav
          aria-label="순자산 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 민우의 자산과 부채' },
            { id: 'step2' as const, label: 'STEP 2. 순자산 계산 & 비율' },
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

      {/* ================= STEP 1. 자산과 부채 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            {/* Assets */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-blue-100">
                  <div>
                    <span className="text-[20px] font-black text-blue-700 block">내가 가진 모든 것</span>
                    <h3 className="text-[32px] font-black text-slate-900">자산 (+)</h3>
                  </div>
                  <span className="text-[38px] xl:text-[44px] font-black text-blue-700 font-mono tabular-nums">
                    {formatManWon(totalAssets)}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {assets.map((item) => (
                    <div
                      key={item.name}
                      className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-black text-slate-900 text-[24px] block">{item.name}</span>
                        <span className="text-[19px] font-medium text-slate-600">{item.desc}</span>
                      </div>
                      <span className="text-[28px] font-black text-blue-950 font-mono tabular-nums shrink-0">
                        {formatManWon(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[20px] font-bold text-slate-600">
                자동차나 집처럼 내 명의로 소유한 재산과 통장의 돈은 모두 &lsquo;자산&rsquo;입니다.
              </p>
            </div>

            {/* Liabilities */}
            <div className="bg-white rounded-3xl p-8 border-2 border-rose-200 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                  <div>
                    <span className="text-[20px] font-black text-rose-700 block">남에게 갚아야 할 빚</span>
                    <h3 className="text-[32px] font-black text-slate-900">부채 (−)</h3>
                  </div>
                  <span className="text-[38px] xl:text-[44px] font-black text-rose-600 font-mono tabular-nums">
                    {formatManWon(totalLiabilities)}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {liabilities.map((item) => (
                    <div
                      key={item.name}
                      className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-black text-slate-900 text-[24px] block">{item.name}</span>
                        <span className="text-[19px] font-medium text-slate-600">{item.desc}</span>
                      </div>
                      <span className="text-[28px] font-black text-rose-700 font-mono tabular-nums shrink-0">
                        {formatManWon(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[20px] font-bold text-slate-600">
                대출금이나 할부 잔액처럼 미래에 반드시 갚아야 할 상환 의무입니다.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <span className="text-[26px] font-black text-white">
              &ldquo;자산 3,000만 원에서 빚 1,300만 원을 빼면, 민우의 진짜 재산은 얼마일까요?&rdquo;
            </span>
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-7 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <span>순자산 계산하기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 순자산 계산 공식 & 비율 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-700">
              <div className="space-y-2">
                <span className="text-[20px] font-black text-amber-300 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6" />
                  학생 예상 답안 선택 후 공식을 공개하세요
                </span>
                <h3 className="text-[30px] xl:text-[36px] font-black text-white">
                  민우의 진짜 재산(순자산)은 얼마일까요?
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[1300, 1700, 3000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPredictedAmount(amt)}
                    className={`min-h-[60px] px-6 rounded-2xl font-mono font-black text-[22px] cursor-pointer tabular-nums ${
                      predictedAmount === amt
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {formatManWon(amt)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowCalculation(!showCalculation)}
                  className="min-h-[60px] px-7 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-[22px] flex items-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-6 h-6" />
                  <span>{showCalculation ? '공식 접기' : '공식 공개하기'}</span>
                </button>
              </div>
            </div>

            {showCalculation ? (
              <div className="space-y-6 my-auto">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-800 rounded-3xl p-7 border border-slate-700">
                  <div>
                    <span className="text-[20px] font-black text-emerald-300 block mb-1">
                      재무 회계 기본 등식
                    </span>
                    <div className="text-[32px] xl:text-[40px] font-black text-white tabular-nums">
                      자산 {formatManWon(totalAssets)} − 부채 {formatManWon(totalLiabilities)} ={' '}
                      <span className="text-emerald-300">순자산 {formatManWon(netWorthMan)}</span>
                    </div>
                  </div>
                  <div className="bg-emerald-950 border-2 border-emerald-400 rounded-2xl px-8 py-4 text-center shrink-0">
                    <span className="text-[20px] font-bold text-emerald-200 block">진짜 내 재산</span>
                    <span className="text-[42px] font-mono font-black text-emerald-300 tabular-nums">
                      {formatManWon(netWorthMan)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[22px] font-black tabular-nums">
                    <span className="text-rose-400">남의 돈(부채): 43.3% ({formatManWon(totalLiabilities)})</span>
                    <span className="text-emerald-400">진짜 내 돈(순자산): 56.7% ({formatManWon(netWorthMan)})</span>
                  </div>
                  <div className="w-full h-8 bg-slate-800 rounded-full overflow-hidden flex">
                    <div style={{ width: '43.3%' }} className="bg-rose-500 h-full" />
                    <div style={{ width: '56.7%' }} className="bg-emerald-500 h-full" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-auto py-12 text-center text-[26px] font-bold text-slate-300 bg-slate-800/50 rounded-3xl border border-slate-700">
                위에서 학생들의 예상 금액을 먼저 고른 뒤, &lsquo;공식 공개하기&rsquo; 버튼을 눌러 주세요!
              </div>
            )}
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-7 py-5 text-[22px] font-black text-amber-950">
            교사 핵심 정리: 자산이 많아 보여도 빚을 빼고 남은 &lsquo;순자산&rsquo;이 튼튼해야 진짜 경제적으로 안정된 사람입니다.
          </div>
        </div>
      )}
    </div>
  );
};
