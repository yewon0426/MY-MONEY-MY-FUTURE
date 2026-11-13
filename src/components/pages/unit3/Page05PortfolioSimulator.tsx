import React, { useState, useEffect } from 'react';
import { Layers, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page05Props {
  resetSignal: number;
}

type Step5Tab = 'step1' | 'step2';
type MarketCondition = 'bull' | 'bear' | 'rateHike' | 'crisis';

interface AssetReturns {
  deposit: number;
  stock: number;
  bond: number;
  shortLabel: string;
  title: string;
  description: string;
}

const MARKET_CONDITIONS: Record<MarketCondition, AssetReturns> = {
  bull: {
    shortLabel: '호황 (+25%)',
    title: '주식시장 상승 (호황)',
    description: '기업 실적 호조로 주가가 크게 오르고, 예금과 채권은 안정적인 이자를 지급합니다.',
    deposit: 3.0,
    stock: 25.0,
    bond: 4.0,
  },
  bear: {
    shortLabel: '조정장 (-20%)',
    title: '주식시장 급락 (조정장)',
    description: '경기 침체 우려로 주가가 폭락하지만, 예금과 채권이 포트폴리오의 방패 역할을 합니다.',
    deposit: 3.0,
    stock: -20.0,
    bond: 5.0,
  },
  rateHike: {
    shortLabel: '금리 인상',
    title: '기준금리 인상기',
    description: '금리 인상으로 예금 금리는 뛰지만, 기존 채권 가격과 주가는 하락 압박을 받습니다.',
    deposit: 5.0,
    stock: -5.0,
    bond: -2.0,
  },
  crisis: {
    shortLabel: '복합 위기 (-30%)',
    title: '전반적 경제 위기',
    description: '글로벌 경제 불안으로 위험자산이 급락하지만, 안전자산인 예금이 원금을 지켜냅니다.',
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
  const TOTAL_INVESTMENT = 1000000;
  const [activeStep, setActiveStep] = useState<Step5Tab>('step1');
  const [depositPct, setDepositPct] = useState<number>(40);
  const [stockPct, setStockPct] = useState<number>(30);
  const [bondPct, setBondPct] = useState<number>(30);
  const [activeMarket, setActiveMarket] = useState<MarketCondition>('bear');

  useEffect(() => {
    setActiveStep('step1');
    setDepositPct(40);
    setStockPct(30);
    setBondPct(30);
    setActiveMarket('bear');
  }, [resetSignal]);

  const applyPreset = (d: number, s: number, b: number) => {
    setDepositPct(d);
    setStockPct(s);
    setBondPct(b);
  };

  const handleDepositChange = (newVal: number) => {
    const val = Math.max(0, Math.min(100, newVal));
    setDepositPct(val);
    const remainder = 100 - val;
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

  const market = MARKET_CONDITIONS[activeMarket];
  const depositWon = Math.round(TOTAL_INVESTMENT * (depositPct / 100));
  const stockWon = Math.round(TOTAL_INVESTMENT * (stockPct / 100));
  const bondWon = Math.round(TOTAL_INVESTMENT * (bondPct / 100));

  const depositProfit = Math.round(depositWon * (market.deposit / 100));
  const stockProfit = Math.round(stockWon * (market.stock / 100));
  const bondProfit = Math.round(bondWon * (market.bond / 100));

  const totalProfitWon = depositProfit + stockProfit + bondProfit;
  const totalEvaluatedWon = TOTAL_INVESTMENT + totalProfitWon;
  const totalReturnPercent = (totalProfitWon / TOTAL_INVESTMENT) * 100;

  const allInStockProfit = Math.round(TOTAL_INVESTMENT * (market.stock / 100));
  const allInStockTotal = TOTAL_INVESTMENT + allInStockProfit;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-purple-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 5</span>
            <span aria-hidden="true">·</span>
            <span>포트폴리오 비중 조절과 위험 분산</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            분산 투자(Portfolio) 시뮬레이터
          </h2>
        </div>

        <nav
          aria-label="분산 투자 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 3대 자산 비중 설정' },
            { id: 'step2' as const, label: 'STEP 2. 시장별 방어력 비교' },
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

      {/* ================= STEP 1. 자산 비중 설정 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[24px] font-black text-slate-900 flex items-center gap-2.5">
              <Layers className="w-7 h-7 text-purple-700" />
              대표 배분 모델 프리셋 (100만 원)
            </span>
            <div className="flex flex-wrap gap-3">
              {PRESETS.map((p) => {
                const isMatch = depositPct === p.deposit && stockPct === p.stock && bondPct === p.bond;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p.deposit, p.stock, p.bond)}
                    className={`min-h-[56px] px-5 rounded-2xl text-[20px] font-black cursor-pointer transition-all ${
                      isMatch
                        ? 'bg-purple-700 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 flex-1 flex flex-col justify-between gap-6">
            <div className="w-full h-10 rounded-2xl overflow-hidden flex border border-slate-200">
              <div style={{ width: `${depositPct}%` }} className="bg-blue-600 transition-all duration-300" />
              <div style={{ width: `${stockPct}%` }} className="bg-rose-600 transition-all duration-300" />
              <div style={{ width: `${bondPct}%` }} className="bg-indigo-600 transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-3xl border-2 border-blue-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[24px] font-black text-blue-950">예금 (안전형)</span>
                  <span className="text-[28px] font-mono font-black text-blue-700 tabular-nums">{depositPct}%</span>
                </div>
                <div className="text-[24px] font-mono font-bold text-slate-900 tabular-nums">
                  {formatWon(depositWon)}
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={depositPct}
                  onChange={(e) => handleDepositChange(Number(e.target.value))}
                  className="w-full h-4 accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-6 bg-rose-50 rounded-3xl border-2 border-rose-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[24px] font-black text-rose-950">주식 (성장형)</span>
                  <span className="text-[28px] font-mono font-black text-rose-700 tabular-nums">{stockPct}%</span>
                </div>
                <div className="text-[24px] font-mono font-bold text-slate-900 tabular-nums">
                  {formatWon(stockWon)}
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={stockPct}
                  onChange={(e) => handleStockChange(Number(e.target.value))}
                  className="w-full h-4 accent-rose-600 cursor-pointer"
                />
              </div>

              <div className="p-6 bg-indigo-50 rounded-3xl border-2 border-indigo-200 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[24px] font-black text-indigo-950">채권 (보완형)</span>
                  <span className="text-[28px] font-mono font-black text-indigo-700 tabular-nums">{bondPct}%</span>
                </div>
                <div className="text-[24px] font-mono font-bold text-slate-900 tabular-nums">
                  {formatWon(bondWon)}
                </div>
                <p className="text-[19px] font-bold text-indigo-900">
                  남은 비중이 자동으로 채권에 배정됩니다 (합계 100%).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <span className="text-[24px] font-black text-slate-900 font-mono tabular-nums">
                현재 배분: 예금 {depositPct}% + 주식 {stockPct}% + 채권 {bondPct}% = 100%
              </span>
              <button
                type="button"
                onClick={() => setActiveStep('step2')}
                className="min-h-[64px] px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer"
              >
                <span>경제 상황 시뮬레이션 실행</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 시장별 방어력 비교 ================= */}
      {activeStep === 'step2' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(MARKET_CONDITIONS) as MarketCondition[]).map((mKey) => {
              const item = MARKET_CONDITIONS[mKey];
              const isSelected = activeMarket === mKey;
              return (
                <button
                  key={mKey}
                  type="button"
                  onClick={() => setActiveMarket(mKey)}
                  className={`min-h-[68px] px-5 rounded-2xl text-[20px] xl:text-[22px] font-black cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-lg'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 text-[22px] font-bold text-slate-100">
            <strong className="text-amber-300 mr-2">{market.title}:</strong>
            <span>{market.description}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: `예금 (${depositPct}%)`, rate: market.deposit, profit: depositProfit, color: 'text-blue-300' },
              { label: `주식 (${stockPct}%)`, rate: market.stock, profit: stockProfit, color: 'text-rose-300' },
              { label: `채권 (${bondPct}%)`, rate: market.bond, profit: bondProfit, color: 'text-indigo-300' },
            ].map((row) => (
              <div key={row.label} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-2">
                <span className={`text-[22px] font-black block ${row.color}`}>{row.label}</span>
                <span className="text-[28px] font-mono font-black text-white block tabular-nums">
                  {row.rate >= 0 ? '▲ +' : '▼ '}
                  {row.rate}%
                </span>
                <span
                  className={`text-[24px] font-mono font-black block tabular-nums ${
                    row.profit >= 0 ? 'text-emerald-400' : 'text-blue-400'
                  }`}
                >
                  {row.profit >= 0 ? '+' : ''}
                  {formatWon(row.profit)}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-950 border-2 border-emerald-500 rounded-3xl p-6 flex items-center justify-between gap-4">
              <div>
                <span className="text-[20px] font-black text-emerald-300 block">
                  내 분산 포트폴리오 최종 평가금액
                </span>
                <span className="text-[40px] xl:text-[46px] font-mono font-black text-white tabular-nums">
                  {formatWon(totalEvaluatedWon)}
                </span>
              </div>
              <span
                className={`text-[26px] font-mono font-black tabular-nums ${
                  totalProfitWon >= 0 ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {totalProfitWon >= 0 ? '+' : ''}
                {totalReturnPercent.toFixed(1)}%
              </span>
            </div>

            <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 flex items-center justify-between gap-4">
              <div>
                <span className="text-[20px] font-black text-slate-300 block">
                  만약 주식 100% 몰빵했다면?
                </span>
                <span className="text-[40px] xl:text-[46px] font-mono font-black text-rose-300 tabular-nums">
                  {formatWon(allInStockTotal)}
                </span>
              </div>
              <span className="text-[24px] font-mono font-black text-rose-300 tabular-nums">
                {allInStockProfit >= 0 ? '+' : ''}
                {formatWon(allInStockProfit)}
              </span>
            </div>
          </div>

          <div className="bg-amber-950/70 border border-amber-500/60 rounded-2xl p-4 flex items-center gap-3 text-[20px] font-bold text-amber-100">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            <span>
              유의점: 분산 투자가 모든 손실을 0으로 만드는 것은 아니지만, 극단적 하락장에서 자산을 방어하는 데 큰 힘을 발휘합니다.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
