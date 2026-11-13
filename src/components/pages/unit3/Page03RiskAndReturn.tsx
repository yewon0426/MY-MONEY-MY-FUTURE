import React, { useState, useEffect } from 'react';
import { formatWon } from '../../../utils/finance';
import { ArrowRight } from 'lucide-react';

interface Page03Props {
  resetSignal: number;
}

type Step3Tab = 'step1' | 'step2';
type EconomicScenario = 'boom' | 'normal' | 'recession';

interface ProductSimResult {
  returnRate: number;
  returnWon: number;
  finalWon: number;
  isProfit: boolean;
  statusText: string;
}

export const Page03RiskAndReturn: React.FC<Page03Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step3Tab>('step1');
  const [chosenProduct, setChosenProduct] = useState<'A' | 'B'>('B');
  const [selectedScenario, setSelectedScenario] = useState<EconomicScenario>('recession');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const PRINCIPAL_WON = 1000000;

  useEffect(() => {
    setActiveStep('step1');
    setChosenProduct('B');
    setSelectedScenario('recession');
    setShowAnswer(false);
  }, [resetSignal]);

  const getProductResults = (scenario: EconomicScenario): { A: ProductSimResult; B: ProductSimResult } => {
    if (scenario === 'boom') {
      return {
        A: {
          returnRate: 3.2,
          returnWon: 32000,
          finalWon: 1032000,
          isProfit: true,
          statusText: '호황기 안정적 약정이자 수령',
        },
        B: {
          returnRate: 18.0,
          returnWon: 180000,
          finalWon: 1180000,
          isProfit: true,
          statusText: '시장 급등으로 +18% 고수익 달성!',
        },
      };
    }
    if (scenario === 'normal') {
      return {
        A: {
          returnRate: 3.0,
          returnWon: 30000,
          finalWon: 1030000,
          isProfit: true,
          statusText: '정상 약정 이자 수령',
        },
        B: {
          returnRate: 8.0,
          returnWon: 80000,
          finalWon: 1080000,
          isProfit: true,
          statusText: '기대수익률(+8%) 무난히 달성',
        },
      };
    }
    return {
      A: {
        returnRate: 2.5,
        returnWon: 25000,
        finalWon: 1025000,
        isProfit: true,
        statusText: '불황에도 원금 100% 보존 및 +2.5% 이자 수령',
      },
      B: {
        returnRate: -15.0,
        returnWon: -150000,
        finalWon: 850000,
        isProfit: false,
        statusText: '불황으로 주가 급락, 원금 -15% 손실 발생!',
      },
    };
  };

  const currentResults = getProductResults(selectedScenario);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-rose-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 3</span>
            <span aria-hidden="true">·</span>
            <span>위험과 기대수익률의 관계</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            위험과 기대수익률의 실전 실험
          </h2>
        </div>

        <nav
          aria-label="위험과 수익률 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 상품 선택 & 질문' },
            { id: 'step2' as const, label: 'STEP 2. 경제 상황 실험' },
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

      {/* ================= STEP 1. 상품 선택 & 핵심 질문 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-7 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h3 className="text-[28px] xl:text-[32px] font-black text-white">
                &ldquo;기대수익률이 더 높은 상품(연 8%)이 항상 더 좋은 선택일까요?&rdquo;
              </h3>
              <button
                type="button"
                onClick={() => setShowAnswer(!showAnswer)}
                className="min-h-[56px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] rounded-2xl shrink-0 cursor-pointer"
              >
                {showAnswer ? '해설 접기' : '정답 및 해설 열기'}
              </button>
            </div>
            {showAnswer && (
              <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 text-[22px] font-bold text-amber-100 leading-relaxed">
                아닙니다! 기대수익률이 높다는 것은 <strong className="text-white">원금 손실의 위험(Risk)</strong>도 크다는 뜻입니다. 불확실한 미래의 평균치인 &lsquo;기대수익률&rsquo;과 &lsquo;확정 수익률&rsquo;은 완전히 다릅니다.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            <button
              type="button"
              onClick={() => setChosenProduct('A')}
              className={`p-8 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                chosenProduct === 'A'
                  ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-[20px] font-black">
                    저위험 · 안정추구형
                  </span>
                  <span className="text-[20px] font-black text-blue-700">원금 손실 낮음</span>
                </div>
                <h4 className="text-[32px] font-black text-slate-900">가상 상품 A (예금·국채형)</h4>
                <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                  예상 수익률 <strong className="text-blue-700 font-black">연 3%</strong> 내외. 원금이 안전하게 보존되며 경기 변동에 흔들리지 않습니다.
                </p>
              </div>
              <div className="pt-4 border-t border-blue-200 flex items-center justify-between text-[22px] font-black text-blue-950">
                <span>예치 원금: {formatWon(PRINCIPAL_WON)}</span>
                <span>{chosenProduct === 'A' ? '내가 선택한 상품 ✓' : '선택하기'}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setChosenProduct('B')}
              className={`p-8 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                chosenProduct === 'B'
                  ? 'bg-rose-50 border-rose-600 ring-4 ring-rose-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-900 text-[20px] font-black">
                    고위험 · 고수익추구형
                  </span>
                  <span className="text-[20px] font-black text-rose-700">원금 손실 위험</span>
                </div>
                <h4 className="text-[32px] font-black text-slate-900">가상 상품 B (주식·펀드형)</h4>
                <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                  기대수익률 <strong className="text-rose-700 font-black">연 8%</strong>. 호황기에는 높은 수익을 얻지만 불황 시 원금 손실이 발생합니다.
                </p>
              </div>
              <div className="pt-4 border-t border-rose-200 flex items-center justify-between text-[22px] font-black text-rose-950">
                <span>예치 원금: {formatWon(PRINCIPAL_WON)}</span>
                <span>{chosenProduct === 'B' ? '내가 선택한 상품 ✓' : '선택하기'}</span>
              </div>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer"
            >
              <span>경제 상황별 결과 실험하기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 경제 상황 실험 ================= */}
      {activeStep === 'step2' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-700">
            <div>
              <span className="text-[20px] font-bold text-slate-300 block">
                현재 내 선택: 상품 {chosenProduct} ({chosenProduct === 'A' ? '안정형' : '고수익추구형'})
              </span>
              <h3 className="text-[30px] font-black text-amber-300">
                경제 상황을 눌러 실제 수익과 손실을 비교하세요
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'boom' as const, label: '① 호황 (+18%)' },
                { id: 'normal' as const, label: '② 평상시 (+8%)' },
                { id: 'recession' as const, label: '③ 불황 (-15%)' },
              ].map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScenario(sc.id)}
                  className={`min-h-[60px] px-5 rounded-2xl font-black text-[20px] cursor-pointer transition-all ${
                    selectedScenario === sc.id
                      ? 'bg-amber-400 text-slate-950 shadow-lg'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            <div
              className={`p-7 rounded-3xl border-2 flex flex-col justify-between gap-4 ${
                chosenProduct === 'A' ? 'bg-slate-800 border-blue-400 ring-2 ring-blue-400/40' : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[26px] font-black text-blue-300">
                  상품 A 결과 {chosenProduct === 'A' ? '★ 내 선택' : ''}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[18px] font-black">
                  안전성 우수
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 my-3">
                <span className="text-[44px] xl:text-[50px] font-black font-mono text-emerald-400 tabular-nums">
                  {formatWon(currentResults.A.finalWon)}
                </span>
                <span className="text-[24px] font-black font-mono text-emerald-300 tabular-nums">
                  ▲ +{currentResults.A.returnRate}% (+{formatWon(currentResults.A.returnWon)})
                </span>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl text-[22px] font-bold text-slate-100">
                {currentResults.A.statusText}
              </div>
            </div>

            <div
              className={`p-7 rounded-3xl border-2 flex flex-col justify-between gap-4 ${
                chosenProduct === 'B' ? 'bg-slate-800 border-rose-400 ring-2 ring-rose-400/40' : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[26px] font-black text-rose-300">
                  상품 B 결과 {chosenProduct === 'B' ? '★ 내 선택' : ''}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-200 text-[18px] font-black">
                  고위험 · 변동성
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 my-3">
                <span
                  className={`text-[44px] xl:text-[50px] font-black font-mono tabular-nums ${
                    currentResults.B.isProfit ? 'text-rose-400' : 'text-blue-400'
                  }`}
                >
                  {formatWon(currentResults.B.finalWon)}
                </span>
                <span
                  className={`text-[24px] font-black font-mono tabular-nums ${
                    currentResults.B.isProfit ? 'text-rose-300' : 'text-blue-300'
                  }`}
                >
                  {currentResults.B.returnRate >= 0 ? '▲ +' : '▼ '}
                  {currentResults.B.returnRate}% ({currentResults.B.returnRate >= 0 ? '+' : ''}
                  {formatWon(currentResults.B.returnWon)})
                </span>
              </div>
              <div className="bg-slate-950 p-5 rounded-2xl text-[22px] font-bold text-slate-100">
                {currentResults.B.statusText}
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 text-[22px] font-bold text-slate-100">
            핵심 구분: <strong className="text-blue-300">확정 수익률(정기예금)</strong>은 약정 이자를 보장하지만,{' '}
            <strong className="text-rose-300">기대수익률(주식)</strong>은 불황 시 원금 손실이 날 수 있습니다.
          </div>
        </div>
      )}
    </div>
  );
};
