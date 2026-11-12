import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Scale,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page03Props {
  resetSignal: number;
}

type EconomicScenario = 'boom' | 'normal' | 'recession';

interface ProductSimResult {
  returnRate: number;
  returnWon: number;
  finalWon: number;
  isProfit: boolean;
  statusText: string;
}

export const Page03RiskAndReturn: React.FC<Page03Props> = ({ resetSignal }) => {
  const [chosenProduct, setChosenProduct] = useState<'A' | 'B'>('B');
  const [selectedScenario, setSelectedScenario] = useState<EconomicScenario | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const PRINCIPAL_WON = 1000000; // 100만 원

  React.useEffect(() => {
    setChosenProduct('B');
    setSelectedScenario(null);
    setShowAnswer(false);
  }, [resetSignal]);

  // Economic scenarios outcome for Product A vs Product B
  // Product A: Expected 3%, low risk. Boom: +3.2%, Normal: +3.0%, Recession: +2.5%
  // Product B: Expected 8%, high risk. Boom: +18.0%, Normal: +8.0%, Recession: -15.0%
  const getProductResults = (scenario: EconomicScenario): { A: ProductSimResult; B: ProductSimResult } => {
    if (scenario === 'boom') {
      const aRate = 3.2;
      const bRate = 18.0;
      return {
        A: {
          returnRate: aRate,
          returnWon: Math.round(PRINCIPAL_WON * (aRate / 100)),
          finalWon: Math.round(PRINCIPAL_WON * (1 + aRate / 100)),
          isProfit: true,
          statusText: '호황기 안정적 약정이자 수령',
        },
        B: {
          returnRate: bRate,
          returnWon: Math.round(PRINCIPAL_WON * (bRate / 100)),
          finalWon: Math.round(PRINCIPAL_WON * (1 + bRate / 100)),
          isProfit: true,
          statusText: '시장 급등으로 +18% 대박 수익 달성!',
        },
      };
    } else if (scenario === 'normal') {
      const aRate = 3.0;
      const bRate = 8.0;
      return {
        A: {
          returnRate: aRate,
          returnWon: Math.round(PRINCIPAL_WON * (aRate / 100)),
          finalWon: Math.round(PRINCIPAL_WON * (1 + aRate / 100)),
          isProfit: true,
          statusText: '정상 약정 이자 수령',
        },
        B: {
          returnRate: bRate,
          returnWon: Math.round(PRINCIPAL_WON * (bRate / 100)),
          finalWon: Math.round(PRINCIPAL_WON * (1 + bRate / 100)),
          isProfit: true,
          statusText: '예상 기대수익률(+8%) 무난히 달성',
        },
      };
    } else {
      // recession
      const aRate = 2.5;
      const bRate = -15.0;
      return {
        A: {
          returnRate: aRate,
          returnWon: Math.round(PRINCIPAL_WON * (aRate / 100)),
          finalWon: Math.round(PRINCIPAL_WON * (1 + aRate / 100)),
          isProfit: true,
          statusText: '불황에도 원금 100% 보존 및 +2.5% 이자 수령',
        },
        B: {
          returnRate: bRate,
          returnWon: Math.round(PRINCIPAL_WON * (bRate / 100)),
          finalWon: Math.round(PRINCIPAL_WON * (1 + bRate / 100)),
          isProfit: false,
          statusText: '불황으로 주가 급락, 원금 -15% 손실 발생!',
        },
      };
    }
  };

  const currentResults = selectedScenario ? getProductResults(selectedScenario) : null;

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <Scale className="w-3.5 h-3.5 text-rose-600" />
          <span>UNIT 03 · 3차시 / 위험과 기대수익률의 실전 실험</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "금융상품의 위험과 기대수익률"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          확정 수익률과 기대수익률의 차이를 배우고, 가상 경제 상황에 따른 극적인 결과 변화를 실험합니다.
        </p>
      </div>

      {/* Classroom Big Question Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-slate-700/80 my-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              Q
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                핵심 탐구 질문
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                "수익률이 높을 것으로 예상되는 상품(기대수익률 8%)이 항상 더 좋은 선택일까요?"
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            {showAnswer ? '해설 닫기 ▲' : '정답 및 해설 열기 ▼'}
          </button>
        </div>

        {showAnswer && (
          <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-amber-200 animate-fade-in p-3 bg-white/10 rounded-xl leading-relaxed">
            <strong className="text-white block font-black text-sm mb-1">
              정답: "절대 그렇지 않습니다!"
            </strong>
            "기대수익률이 높다는 것은 그만큼 <strong>원금 손실의 위험(Risk)도 크다</strong>는 뜻입니다. 경제가 호황일 때는 큰돈을 벌지만, 불황이 닥치면 원금을 크게 잃을 수 있습니다. 또한 '확정 수익률'과 '미래의 불확실한 기대수익률'은 완전히 다릅니다."
          </div>
        )}
      </div>

      {/* Interactive Experiment: Choose Product A vs Product B */}
      <div className="my-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-700">
            1단계: 가상 투자금 100만 원으로 가입할 상품을 선택하세요:
          </span>
          <span className="text-[11px] text-slate-500 font-medium">※ 상품 A, B는 교육용 가상 모델입니다</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Product A */}
          <button
            onClick={() => setChosenProduct('A')}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
              chosenProduct === 'A'
                ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-200 shadow-md'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  저위험 · 안정추구형
                </span>
                <span className="text-xs font-black font-mono text-blue-700">원금 손실 가능성 낮음</span>
              </div>
              <h3 className="text-base font-black text-slate-900 mt-1">가상 상품 A (예금/국채형)</h3>
              <p className="text-xs text-slate-600 mt-1 leading-snug">
                예상 수익률 <strong>연 3%</strong> 내외. 원금이 안전하게 보존되며 시장 상황에 크게 흔들리지 않음.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs font-bold">
              <span className="text-blue-800">예치 원금: {formatWon(PRINCIPAL_WON)}</span>
              <span className={chosenProduct === 'A' ? 'text-blue-700' : 'text-slate-400'}>
                {chosenProduct === 'A' ? '선택됨 (내가 선택한 상품) ✓' : '클릭하여 선택'}
              </span>
            </div>
          </button>

          {/* Product B */}
          <button
            onClick={() => setChosenProduct('B')}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
              chosenProduct === 'B'
                ? 'bg-rose-50/90 border-rose-600 ring-2 ring-rose-200 shadow-md'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                  고위험 · 고수익추구형
                </span>
                <span className="text-xs font-black font-mono text-rose-600">원금 손실 위험 높음</span>
              </div>
              <h3 className="text-base font-black text-slate-900 mt-1">가상 상품 B (주식/펀드형)</h3>
              <p className="text-xs text-slate-600 mt-1 leading-snug">
                기대수익률 <strong>연 8%</strong>. 호황기에는 고수익을 기대할 수 있으나 불황 시 원금 손실 발생 가능.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs font-bold">
              <span className="text-rose-800">예치 원금: {formatWon(PRINCIPAL_WON)}</span>
              <span className={chosenProduct === 'B' ? 'text-rose-700' : 'text-slate-400'}>
                {chosenProduct === 'B' ? '선택됨 (내가 선택한 상품) ✓' : '클릭하여 선택'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Step 2: Economic Scenario Revelation & Comparison */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl my-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs font-bold text-amber-300 block">
                2단계: 가상 경제 상황을 공개하고 결과를 확인하세요!
              </span>
              <span className="text-[11px] text-slate-400">
                현재 선택: 상품 {chosenProduct} ({chosenProduct === 'A' ? '연 3% 저위험' : '연 8% 고위험'})
              </span>
            </div>

            {/* Scenario buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedScenario('boom')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === 'boom'
                    ? 'bg-rose-500 text-white shadow-md ring-2 ring-rose-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ① 경제 호조 (호황 🚀)
              </button>
              <button
                onClick={() => setSelectedScenario('normal')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === 'normal'
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ② 경제 보통 (평상시 ⚖️)
              </button>
              <button
                onClick={() => setSelectedScenario('recession')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === 'recession'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ③ 경제 악화 (불황 📉)
              </button>
            </div>
          </div>

          {/* Results Comparison Grid */}
          {currentResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 animate-fade-in text-xs">
              {/* Outcome A */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  chosenProduct === 'A'
                    ? 'bg-slate-800/90 border-blue-400 ring-2 ring-blue-400/40'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-blue-300 text-xs sm:text-sm">
                    가상 상품 A 결과 {chosenProduct === 'A' && '★ (내 선택)'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                    안전성 우수
                  </span>
                </div>
                <div className="flex items-baseline justify-between my-2">
                  <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                    {formatWon(currentResults.A.finalWon)}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    +{currentResults.A.returnRate}% (+{formatWon(currentResults.A.returnWon)})
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded-xl border border-slate-700">
                  {currentResults.A.statusText}
                </p>
              </div>

              {/* Outcome B */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  chosenProduct === 'B'
                    ? 'bg-slate-800/90 border-rose-400 ring-2 ring-rose-400/40'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-rose-300 text-xs sm:text-sm">
                    가상 상품 B 결과 {chosenProduct === 'B' && '★ (내 선택)'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    수익성/변동성
                  </span>
                </div>
                <div className="flex items-baseline justify-between my-2">
                  <span className={`text-xl sm:text-2xl font-black font-mono ${currentResults.B.isProfit ? 'text-rose-400' : 'text-blue-400'}`}>
                    {formatWon(currentResults.B.finalWon)}
                  </span>
                  <span className={`text-xs font-bold font-mono ${currentResults.B.isProfit ? 'text-rose-400' : 'text-blue-400'}`}>
                    {currentResults.B.returnRate >= 0 ? '+' : ''}{currentResults.B.returnRate}% ({currentResults.B.returnRate >= 0 ? '+' : ''}{formatWon(currentResults.B.returnWon)})
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 bg-slate-900/80 p-2 rounded-xl border border-slate-700">
                  {currentResults.B.statusText}
                </p>
              </div>
            </div>
          ) : (
            <div className="my-6 p-6 text-center text-slate-400 text-xs">
              위의 버튼에서 경제 상황(호황, 평상시, 불황) 중 하나를 선택하면 각 상품의 실제 수익/손실 결과가 공개됩니다.
            </div>
          )}
        </div>

        {/* Essential Concept: Guaranteed vs Expected Return */}
        <div className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black rounded text-[10px]">
              핵심 구분
            </span>
            <span>
              <strong>확정 수익률(정기예금 등)</strong>은 시장이 악화되어도 약정 이자를 보장하지만, <strong>기대수익률(주식 등)</strong>은 미래의 가상 평균치일 뿐 손실이 날 수 있습니다.
            </span>
          </div>
          <span className="text-amber-300 font-mono font-bold shrink-0">High Risk, High Return</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 의사결정 원칙:</span>
          <span>내 손실 감수 능력을 벗어난 고수익 상품에 무리하게 투자하면, 경제 불황 한 번에 평생 모은 원금을 잃을 수 있습니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">위험 관리(Risk Management)</span>
      </div>
    </div>
  );
};
