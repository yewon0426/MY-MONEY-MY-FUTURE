import React, { useState } from 'react';
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Sliders,
  DollarSign,
  Scale,
} from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page05Props {
  resetSignal: number;
}

type MarketCondition = 'bull' | 'bear' | 'rateHike' | 'crisis';

interface AssetReturns {
  deposit: number; // %
  stock: number; // %
  bond: number; // %
  title: string;
  description: string;
}

const MARKET_CONDITIONS: Record<MarketCondition, AssetReturns> = {
  bull: {
    title: '주식시장 상승 (호황 🚀)',
    description: '기업 실적 호조로 주가가 크게 오르고, 예금과 채권은 안정적인 이자를 지급합니다.',
    deposit: 3.0,
    stock: 25.0,
    bond: 4.0,
  },
  bear: {
    title: '주식시장 급락 (조정장 📉)',
    description: '경기 침체 우려로 주가가 폭락하지만, 예금과 채권이 포트폴리오의 방패 역할을 합니다.',
    deposit: 3.0,
    stock: -20.0,
    bond: 5.0,
  },
  rateHike: {
    title: '기준금리 인상기 (금리 변동 📈)',
    description: '중앙은행이 금리를 올려 예금 금리는 뛰지만, 기존 채권 가격과 주가는 압박을 받습니다.',
    deposit: 5.0,
    stock: -5.0,
    bond: -2.0,
  },
  crisis: {
    title: '전반적인 경제 위기 (복합 충격 🌪️)',
    description: '글로벌 경제 불안으로 대다수 자산이 위축되지만, 안전자산인 예금이 원금을 지켜냅니다.',
    deposit: 3.0,
    stock: -30.0,
    bond: 2.0,
  },
};

const PRESETS = [
  { label: '균형형 (40:30:30)', deposit: 40, stock: 30, bond: 30 },
  { label: '안정형 (70:10:20)', deposit: 70, stock: 10, bond: 20 },
  { label: '성장형 (20:60:20)', deposit: 20, stock: 60, bond: 20 },
  { label: '주식 100% 몰빵', deposit: 0, stock: 100, bond: 0 },
];

export const Page05PortfolioSimulator: React.FC<Page05Props> = ({ resetSignal }) => {
  const TOTAL_INVESTMENT = 1000000; // 가상 투자금 100만 원

  // Proportions in percent (Sum = 100)
  const [depositPct, setDepositPct] = useState<number>(40);
  const [stockPct, setStockPct] = useState<number>(30);
  const [bondPct, setBondPct] = useState<number>(30);

  const [activeMarket, setActiveMarket] = useState<MarketCondition>('bear'); // 기본으로 하락장을 보여주어 분산효과 체감
  const [showCautionNote, setShowCautionNote] = useState<boolean>(false);

  React.useEffect(() => {
    setDepositPct(40);
    setStockPct(30);
    setBondPct(30);
    setActiveMarket('bear');
    setShowCautionNote(false);
  }, [resetSignal]);

  const applyPreset = (d: number, s: number, b: number) => {
    setDepositPct(d);
    setStockPct(s);
    setBondPct(b);
  };

  // Adjust sliders keeping sum = 100
  const handleDepositChange = (newVal: number) => {
    const val = Math.max(0, Math.min(100, newVal));
    setDepositPct(val);
    const remainder = 100 - val;
    // Distribute remainder between stock and bond keeping their relative ratio
    const currentSum = stockPct + bondPct;
    if (currentSum === 0) {
      setStockPct(Math.floor(remainder / 2));
      setBondPct(remainder - Math.floor(remainder / 2));
    } else {
      const newStock = Math.round((stockPct / currentSum) * remainder);
      setStockPct(newStock);
      setBondPct(remainder - newStock);
    }
  };

  const handleStockChange = (newVal: number) => {
    const val = Math.max(0, Math.min(100, newVal));
    setStockPct(val);
    const remainder = 100 - val;
    const currentSum = depositPct + bondPct;
    if (currentSum === 0) {
      setDepositPct(Math.floor(remainder / 2));
      setBondPct(remainder - Math.floor(remainder / 2));
    } else {
      const newDeposit = Math.round((depositPct / currentSum) * remainder);
      setDepositPct(newDeposit);
      setBondPct(remainder - newDeposit);
    }
  };

  // Current market returns
  const market = MARKET_CONDITIONS[activeMarket];

  // Asset Calculations
  const depositWon = Math.round(TOTAL_INVESTMENT * (depositPct / 100));
  const stockWon = Math.round(TOTAL_INVESTMENT * (stockPct / 100));
  const bondWon = Math.round(TOTAL_INVESTMENT * (bondPct / 100));

  const depositProfit = Math.round(depositWon * (market.deposit / 100));
  const stockProfit = Math.round(stockWon * (market.stock / 100));
  const bondProfit = Math.round(bondWon * (market.bond / 100));

  const totalProfitWon = depositProfit + stockProfit + bondProfit;
  const totalEvaluatedWon = TOTAL_INVESTMENT + totalProfitWon;
  const totalReturnPercent = (totalProfitWon / TOTAL_INVESTMENT) * 100;

  // Comparison with 100% Stock All-In
  const allInStockProfit = Math.round(TOTAL_INVESTMENT * (market.stock / 100));
  const allInStockTotal = TOTAL_INVESTMENT + allInStockProfit;

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
          <Layers className="w-3.5 h-3.5 text-purple-600" />
          <span>UNIT 03 · 5차시 / 포트폴리오 비중 조절과 위험 분산</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "분산 투자(Portfolio) 시뮬레이터"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          가상 자금 100만 원의 예금·주식·채권 비중을 조절하고, 4대 시장 상황에 따른 포트폴리오 방어력을 관찰합니다.
        </p>
      </div>

      {/* Preset Buttons Bar */}
      <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border-2 border-slate-200 shadow-xs my-1">
        <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-purple-600" />
          <span>자산 배분 모델 프리셋:</span>
        </span>
        <div className="flex items-center gap-1.5">
          {PRESETS.map((p) => {
            const isMatch = depositPct === p.deposit && stockPct === p.stock && bondPct === p.bond;
            return (
              <button
                key={p.label}
                onClick={() => applyPreset(p.deposit, p.stock, p.bond)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isMatch
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 12-Col Stage: Left 5 cols (Sliders & Proportions) / Right 7 cols (Market Simulation & Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left Column (5 cols): 3 Asset Sliders */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                1단계: 자산별 투자 비중 설정 (합계 100%)
              </span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                원금 100만 원
              </span>
            </div>

            {/* Visual Proportion Bar */}
            <div className="w-full h-4 rounded-xl overflow-hidden flex shadow-inner">
              <div style={{ width: `${depositPct}%` }} className="bg-blue-500 transition-all duration-300" title={`예금 ${depositPct}%`} />
              <div style={{ width: `${stockPct}%` }} className="bg-rose-500 transition-all duration-300" title={`주식 ${stockPct}%`} />
              <div style={{ width: `${bondPct}%` }} className="bg-indigo-500 transition-all duration-300" title={`채권 ${bondPct}%`} />
            </div>

            {/* Slider 1: Deposit */}
            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-blue-900 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  예금성 자산 (안전형)
                </span>
                <span className="text-blue-800 font-mono text-sm">{depositPct}% ({formatWon(depositWon)})</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={depositPct}
                onChange={(e) => handleDepositChange(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Slider 2: Stock */}
            <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-rose-900 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  주식형 자산 (성장형)
                </span>
                <span className="text-rose-800 font-mono text-sm">{stockPct}% ({formatWon(stockWon)})</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={stockPct}
                onChange={(e) => handleStockChange(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Slider 3: Bond */}
            <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-indigo-900 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  채권형 자산 (수익보완형)
                </span>
                <span className="text-indigo-800 font-mono text-sm">{bondPct}% ({formatWon(bondWon)})</span>
              </div>
              <div className="text-[11px] text-slate-500">
                남은 비율이 자동으로 채권 비중으로 산정됩니다: <strong>{bondPct}% ({formatWon(bondWon)})</strong>
              </div>
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>자산 배분 비율 합계:</span>
            <span className="font-mono font-black text-slate-900">
              {depositPct} + {stockPct} + {bondPct} = {depositPct + stockPct + bondPct}%
            </span>
          </div>
        </div>

        {/* Right Column (7 cols): Market Scenarios & Live Results */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">
                2단계: 경제 상황 시나리오 선택 (결과 실시간 반영)
              </span>
              <span className="text-[10px] text-slate-400">시장을 바꿔보세요</span>
            </div>

            {/* Market buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 my-2.5">
              {(Object.keys(MARKET_CONDITIONS) as MarketCondition[]).map((mKey) => {
                const item = MARKET_CONDITIONS[mKey];
                const isSelected = activeMarket === mKey;
                return (
                  <button
                    key={mKey}
                    onClick={() => setActiveMarket(mKey)}
                    className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-200'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold'
                    }`}
                  >
                    <span className="block truncate">{item.title.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-80 block">{item.title.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-300 bg-slate-800/80 p-2 rounded-xl border border-slate-700 leading-snug">
              {market.description}
            </p>

            {/* Asset Performance Breakdown */}
            <div className="grid grid-cols-3 gap-2 my-2.5 text-xs">
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-blue-300 block font-bold">예금 ({depositPct}%)</span>
                <span className="text-sm font-mono font-bold block mt-0.5">
                  {market.deposit >= 0 ? '+' : ''}{market.deposit}%
                </span>
                <span className={`text-[11px] font-mono font-bold ${depositProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {depositProfit >= 0 ? '+' : ''}{formatWon(depositProfit)}
                </span>
              </div>

              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-rose-300 block font-bold">주식 ({stockPct}%)</span>
                <span className="text-sm font-mono font-bold block mt-0.5">
                  {market.stock >= 0 ? '+' : ''}{market.stock}%
                </span>
                <span className={`text-[11px] font-mono font-bold ${stockProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stockProfit >= 0 ? '+' : ''}{formatWon(stockProfit)}
                </span>
              </div>

              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-indigo-300 block font-bold">채권 ({bondPct}%)</span>
                <span className="text-sm font-mono font-bold block mt-0.5">
                  {market.bond >= 0 ? '+' : ''}{market.bond}%
                </span>
                <span className={`text-[11px] font-mono font-bold ${bondProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {bondProfit >= 0 ? '+' : ''}{formatWon(bondProfit)}
                </span>
              </div>
            </div>

            {/* Total Results Scoreboard */}
            <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">
                  포트폴리오 최종 평가금액 & 수익률
                </span>
                <div className="text-2xl font-black font-mono mt-0.5 text-white">
                  {formatWon(totalEvaluatedWon)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold block">합산 손익</span>
                <span className={`text-xl font-black font-mono ${totalProfitWon >= 0 ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {totalProfitWon >= 0 ? '+' : ''}{formatWon(totalProfitWon)} ({totalReturnPercent >= 0 ? '+' : ''}{totalReturnPercent.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* Contrast: All-in Stock vs Diversified */}
            <div className="mt-2.5 p-2.5 bg-slate-800/60 rounded-xl border border-slate-700 text-xs flex items-center justify-between text-slate-300">
              <span>주식 100% 몰빵 시 결과:</span>
              <span className={`font-mono font-black ${allInStockProfit >= 0 ? 'text-rose-400' : 'text-rose-300'}`}>
                {formatWon(allInStockTotal)} ({allInStockProfit >= 0 ? '+' : ''}{formatWon(allInStockProfit)})
              </span>
            </div>
          </div>

          {/* Principle Caution: Diversification Doesn't Prevent All Losses */}
          <div className="mt-2 p-2.5 bg-amber-950/60 border border-amber-500/60 rounded-xl text-xs text-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <strong>⚠️ [필수 교육] 분산 투자의 한계 명시:</strong>
              <span> 분산 투자가 모든 손실을 마법처럼 0으로 만들어 주는 것은 아닙니다. 극심한 경제 위기나 시스템 충격 시에는 전체 포트폴리오 가치가 일시적으로 하락할 수 있습니다.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-purple-700">💡 포트폴리오의 힘:</span>
          <span>주식이 -20% 폭락해도 예금과 채권이 이자를 벌어주어 내 전체 자산 손실을 <strong>-5% 이하로 방어</strong>해 냅니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">계란을 한 바구니에 담지 마라</span>
      </div>
    </div>
  );
};
