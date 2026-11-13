import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Plus,
  Minus,
  RotateCcw,
  Coins,
  ArrowRight,
} from 'lucide-react';
import {
  calculateStockReturn,
  createInitialStockPortfolio,
  executeStockBuy,
  executeStockSell,
  computeStockPortfolioMetrics,
  formatWon,
  StockPortfolioState,
} from '../../../utils/finance';

interface Page03Props {
  resetSignal: number;
}

type StockStep = 'step1' | 'step2' | 'step3';

interface MarketTurn {
  turn: number;
  label: string;
  news: string;
  priceWon: number;
}

const MARKET_TURNS: MarketTurn[] = [
  { turn: 1, label: '1턴 · 상장 출발', news: '미래테크가 안정적 실적으로 주식 시장에 거래를 시작했습니다.', priceWon: 50000 },
  { turn: 2, label: '2턴 · 신제품 호황', news: 'AI 반도체 신제품 수주가 급증하여 주가가 크게 상승했습니다!', priceWon: 65000 },
  { turn: 3, label: '3턴 · 일시 조정', news: '원자재 가격 상승 우려로 차익 실현 매물이 나오며 하락했습니다.', priceWon: 55000 },
  { turn: 4, label: '4턴 · 글로벌 계약', news: '해외 완성차 기업과 대규모 장기 공급 계약을 체결했습니다!', priceWon: 75000 },
  { turn: 5, label: '5턴 · 경기 둔화 우려', news: '글로벌 소비 둔화 전망에 시장 전체가 약세로 돌아섰습니다.', priceWon: 60000 },
  { turn: 6, label: '6턴 · 흑자 전환 결산', news: '사상 최대 영업이익을 달성하며 주가가 다시 강세를 보입니다!', priceWon: 80000 },
];

export const Page03Stock: React.FC<Page03Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<StockStep>('step1');

  // STEP 1 interactive right inspector
  const [selectedRight, setSelectedRight] = useState<'vote' | 'dividend' | 'residual'>('vote');

  // STEP 2: 주가 조절 실험 + 별도 배당금 실험
  const [expBuyPrice, setExpBuyPrice] = useState<number>(50000);
  const [expCurrentPrice, setExpCurrentPrice] = useState<number>(65000);
  const [expShares, setExpShares] = useState<number>(10);
  const [expDividendPerShare, setExpDividendPerShare] = useState<number>(2000);
  const [showDividendExp, setShowDividendExp] = useState<boolean>(false);

  // STEP 3: 가상 매수·매도 체험 (초기 현금 100만 원)
  const [portfolio, setPortfolio] = useState<StockPortfolioState>(() => createInitialStockPortfolio(1000000));
  const [turnIndex, setTurnIndex] = useState<number>(0);
  const [priceHistory, setPriceHistory] = useState<number[]>([MARKET_TURNS[0].priceWon]);
  const [tradeQty, setTradeQty] = useState<number>(2);
  const [tradeFeedback, setTradeFeedback] = useState<string>('초기 현금 100만 원으로 가상 투자를 시작해 보세요!');
  const [tradeFeedbackType, setTradeFeedbackType] = useState<'neutral' | 'success' | 'error'>('neutral');

  useEffect(() => {
    setActiveStep('step1');
    setSelectedRight('vote');
    setExpBuyPrice(50000);
    setExpCurrentPrice(65000);
    setExpShares(10);
    setExpDividendPerShare(2000);
    setShowDividendExp(false);
    setPortfolio(createInitialStockPortfolio(1000000));
    setTurnIndex(0);
    setPriceHistory([MARKET_TURNS[0].priceWon]);
    setTradeQty(2);
    setTradeFeedback('초기 현금 100만 원으로 가상 투자를 시작해 보세요!');
    setTradeFeedbackType('neutral');
  }, [resetSignal]);

  const expResult = calculateStockReturn(expBuyPrice, expCurrentPrice, expShares, showDividendExp ? expDividendPerShare : 0);

  const currentMarketPrice = priceHistory[priceHistory.length - 1];
  const currentTurnMeta = MARKET_TURNS[turnIndex];
  const metrics = computeStockPortfolioMetrics(portfolio, currentMarketPrice, 1000000);

  const handleBuy = () => {
    const res = executeStockBuy(portfolio, currentMarketPrice, tradeQty);
    if (!res.ok) {
      setTradeFeedback(res.error || '매수에 실패했습니다.');
      setTradeFeedbackType('error');
      return;
    }
    setPortfolio(res.state);
    setTradeFeedback(
      `${formatWon(currentMarketPrice)}에 ${tradeQty}주 매수 완료! (총 ${formatWon(res.tradeAmountWon)} 지출)`
    );
    setTradeFeedbackType('success');
  };

  const handleSell = () => {
    const res = executeStockSell(portfolio, currentMarketPrice, tradeQty);
    if (!res.ok) {
      setTradeFeedback(res.error || '매도에 실패했습니다.');
      setTradeFeedbackType('error');
      return;
    }
    setPortfolio(res.state);
    const pnlSign = res.tradePnL >= 0 ? '+' : '';
    setTradeFeedback(
      `${formatWon(currentMarketPrice)}에 ${tradeQty}주 매도 완료! (이번 매매 손익 ${pnlSign}${formatWon(res.tradePnL)})`
    );
    setTradeFeedbackType('success');
  };

  const handleNextTurn = () => {
    if (turnIndex >= MARKET_TURNS.length - 1) return;
    const nextIdx = turnIndex + 1;
    setTurnIndex(nextIdx);
    setPriceHistory((prev) => [...prev, MARKET_TURNS[nextIdx].priceWon]);
    setTradeFeedback(`${MARKET_TURNS[nextIdx].label}: 주가가 ${formatWon(MARKET_TURNS[nextIdx].priceWon)}으로 변동했습니다.`);
    setTradeFeedbackType('neutral');
  };

  const handleNudgePrice = (delta: number) => {
    const nextPrice = Math.max(10000, Math.min(120000, currentMarketPrice + delta));
    setPriceHistory((prev) => [...prev.slice(0, -1), nextPrice]);
    setTradeFeedback(`시장 주가를 ${formatWon(nextPrice)}으로 직접 조정했습니다.`);
    setTradeFeedbackType('neutral');
  };

  const handleResetTrading = () => {
    setPortfolio(createInitialStockPortfolio(1000000));
    setTurnIndex(0);
    setPriceHistory([MARKET_TURNS[0].priceWon]);
    setTradeQty(2);
    setTradeFeedback('가상 계좌를 초기 현금 100만 원 상태로 리셋했습니다.');
    setTradeFeedbackType('neutral');
  };

  // Helper to render crisp linear SVG chart for STEP 2
  const expChartPoints = [
    expBuyPrice,
    Math.round(expBuyPrice + (expCurrentPrice - expBuyPrice) * 0.25),
    Math.round(expBuyPrice + (expCurrentPrice - expBuyPrice) * 0.55),
    Math.round(expBuyPrice + (expCurrentPrice - expBuyPrice) * 0.8),
    expCurrentPrice,
  ];
  const expMin = Math.min(...expChartPoints, 20000) - 10000;
  const expMax = Math.max(...expChartPoints, 100000) + 10000;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header & 3-STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-rose-700">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 3</span>
            <span aria-hidden="true">·</span>
            <span>기업의 소유 지분과 직접 투자</span>
          </div>
          <h2 className="text-[38px] xl:text-[44px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            주식(Stock)과 가상 투자 체험
          </h2>
        </div>

        <nav
          aria-label="주식 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 주식의 이해' },
            { id: 'step2' as const, label: 'STEP 2. 주가 조절 실험' },
            { id: 'step3' as const, label: 'STEP 3. 가상 매수·매도 체험' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black transition-all cursor-pointer whitespace-nowrap ${
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

      {/* ================= STEP 1. 주식의 이해 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                주식이란? 기업의 주인이 되는 증서
              </h3>
              <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                주식회사의 자본금을 똑같이 나눈 지분으로, 주식을 1주만 사도 나는 그 회사의 공동 주인(<strong className="text-blue-700">주주</strong>)이 됩니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                  <span className="text-[24px] font-black text-rose-900 block">1. 시세차익</span>
                  <p className="text-[22px] font-semibold text-slate-800 mt-1">
                    주가가 샀을 때보다 올랐을 때 팔아 얻는 가격 차이
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <span className="text-[24px] font-black text-emerald-900 block">2. 배당수익 (배당금)</span>
                  <p className="text-[22px] font-semibold text-slate-800 mt-1">
                    기업이 1년 동안 번 순이익의 일부를 주주에게 나누어 주는 돈
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-rose-950 text-white rounded-2xl p-6 flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
              <div className="text-[22px] xl:text-[24px] font-bold leading-snug">
                주의: 주식은 예금자보호가 되지 않으며, 기업 실적 악화나 시장 하락 시 <strong className="text-amber-300">원금 손실 위험</strong>이 큽니다!
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Award className="w-9 h-9 text-amber-400" />
                <h3 className="text-[30px] xl:text-[34px] font-black text-white">
                  주주가 가지는 3대 권리
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'vote' as const, label: '의결권' },
                  { id: 'dividend' as const, label: '배당청구권' },
                  { id: 'residual' as const, label: '잔여재산분배' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRight(r.id)}
                    className={`min-h-[64px] px-4 rounded-2xl font-black text-[22px] cursor-pointer transition-all ${
                      selectedRight === r.id
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="bg-slate-800 rounded-2xl p-7 border border-slate-700 min-h-[200px] flex flex-col justify-center gap-3">
                {selectedRight === 'vote' && (
                  <>
                    <h4 className="text-[28px] font-black text-amber-300">1. 경영 참여 의결권</h4>
                    <p className="text-[24px] font-semibold text-slate-200 leading-relaxed">
                      주주총회에 참석하여 대표이사 선임 등 회사의 중요한 의사결정에 보유 주식 수만큼 투표할 수 있는 권리입니다.
                    </p>
                  </>
                )}
                {selectedRight === 'dividend' && (
                  <>
                    <h4 className="text-[28px] font-black text-emerald-300">2. 이익 배당 청구권</h4>
                    <p className="text-[24px] font-semibold text-slate-200 leading-relaxed">
                      기업이 열심히 일해 이익을 남겼을 때, 내가 가진 지분 비율에 따라 배당금을 청구할 수 있는 권리입니다.
                    </p>
                  </>
                )}
                {selectedRight === 'residual' && (
                  <>
                    <h4 className="text-[28px] font-black text-blue-300">3. 잔여재산 분배 청구권</h4>
                    <p className="text-[24px] font-semibold text-slate-200 leading-relaxed">
                      기업이 해산하고 모든 빚(채무)을 다 갚고도 남은 재산이 있다면 주주 지분대로 나누어 받을 권리입니다.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex items-center justify-between gap-4">
              <span className="text-[22px] font-bold text-slate-200">
                생활 예시: 내가 자주 마시는 음료수 회사의 주식을 사면 나도 그 회사의 공동 주인!
              </span>
              <button
                type="button"
                onClick={() => setActiveStep('step2')}
                className="min-h-[56px] px-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-[22px] rounded-xl cursor-pointer shrink-0 flex items-center gap-2"
              >
                <span>실험하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 주가 조절 실험 ================= */}
      {activeStep === 'step2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          {/* Left: Large Linear SVG Stock Chart & Dividend Experiment */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-[28px] xl:text-[32px] font-black text-slate-900">
                  주가 변동 선형 그래프 ({expShares}주 보유 기준)
                </h3>
                <p className="text-[22px] font-bold text-slate-600">
                  매수가 {formatWon(expBuyPrice)} → 현재가 {formatWon(expCurrentPrice)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDividendExp(!showDividendExp)}
                className={`min-h-[56px] px-5 py-2.5 rounded-2xl text-[22px] font-black cursor-pointer flex items-center gap-2 ${
                  showDividendExp
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Coins className="w-6 h-6" />
                <span>{showDividendExp ? '배당 실험 켜짐' : '배당금 실험 추가'}</span>
              </button>
            </div>

            {/* Linear SVG Stock Chart */}
            <svg viewBox="0 0 820 320" className="w-full h-[300px] overflow-visible">
              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const y = 260 - r * 210;
                const priceLabel = Math.round(expMin + r * (expMax - expMin));
                return (
                  <g key={i}>
                    <line x1={120} y1={y} x2={790} y2={y} stroke="#e2e8f0" strokeWidth={2} />
                    <text x={110} y={y + 7} textAnchor="end" fontSize={20} fontWeight={700} fill="#475569">
                      {(priceLabel / 10000).toFixed(1)}만
                    </text>
                  </g>
                );
              })}

              {(() => {
                const getX = (idx: number) => 150 + (idx / 4) * 610;
                const getY = (val: number) => 260 - ((val - expMin) / Math.max(1, expMax - expMin)) * 210;
                const buyY = getY(expBuyPrice);
                const lineColor = expCurrentPrice >= expBuyPrice ? '#e11d48' : '#2563eb';
                const pointsStr = expChartPoints.map((p, i) => `${getX(i)},${getY(p)}`).join(' ');

                return (
                  <>
                    {/* Average Buy Price Reference Dashed Line */}
                    <line x1={120} y1={buyY} x2={790} y2={buyY} stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 6" />
                    <text x={785} y={buyY - 10} textAnchor="end" fontSize={20} fontWeight={800} fill="#b45309">
                      매수가 기준선 ({formatWon(expBuyPrice)})
                    </text>

                    <polyline fill="none" stroke={lineColor} strokeWidth={6} points={pointsStr} />

                    {expChartPoints.map((p, i) => {
                      const cx = getX(i);
                      const cy = getY(p);
                      const labels = ['매수 시점', '1분기', '2분기', '3분기', '현재 주가'];
                      return (
                        <g key={i}>
                          <circle cx={cx} cy={cy} r={10} fill={lineColor} stroke="#fff" strokeWidth={3} />
                          <text x={cx} y={300} textAnchor="middle" fontSize={20} fontWeight={800} fill="#1e293b">
                            {labels[i]}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>

            {/* Optional Separate Dividend Panel */}
            {showDividendExp && (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[22px] font-black text-emerald-950 block">
                    배당금 실험: 1주당 연간 배당금
                  </span>
                  <span className="text-[20px] font-bold text-emerald-800 tabular-nums">
                    {expShares}주 × {formatWon(expDividendPerShare)} = 총 배당 {formatWon(expResult.totalDividends)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[0, 1000, 2000, 5000].map((div) => (
                    <button
                      key={div}
                      type="button"
                      onClick={() => setExpDividendPerShare(div)}
                      className={`min-h-[56px] px-4 rounded-xl text-[20px] font-black cursor-pointer ${
                        expDividendPerShare === div
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-800 border border-emerald-200'
                      }`}
                    >
                      {div === 0 ? '무배당' : `${div.toLocaleString()}원`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Controls & Output */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-5">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[22px] font-black mb-2">
                  <span className="text-slate-300">1주당 매수 가격</span>
                  <span className="font-mono text-amber-300 tabular-nums">{formatWon(expBuyPrice)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[30000, 50000, 70000].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setExpBuyPrice(p)}
                      className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer ${
                        expBuyPrice === p ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {formatWon(p)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[22px] font-black mb-2">
                  <span className="text-slate-300">현재 주가 조절</span>
                  <span className="font-mono text-white tabular-nums">{formatWon(expCurrentPrice)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setExpCurrentPrice((p) => Math.max(10000, p - 5000))}
                    className="min-h-[60px] flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[22px] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Minus className="w-6 h-6" />
                    <span>5,000원 ▼</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpCurrentPrice((p) => Math.min(120000, p + 5000))}
                    className="min-h-[60px] flex-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-[22px] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-6 h-6" />
                    <span>5,000원 ▲</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[22px] font-black mb-2">
                  <span className="text-slate-300">보유 수량</span>
                  <span className="font-mono text-emerald-300 tabular-nums">{expShares}주</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {[5, 10, 20, 50].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setExpShares(q)}
                      className={`min-h-[56px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                        expShares === q ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {q}주
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-3">
              <div className="flex justify-between text-[22px] font-bold text-slate-300">
                <span>총 매수 원금</span>
                <span className="font-mono text-white tabular-nums">{formatWon(expResult.totalInvested)}</span>
              </div>
              <div className="flex justify-between text-[22px] font-bold text-slate-300">
                <span>시세 차익</span>
                <span
                  className={`font-mono font-black tabular-nums ${
                    expResult.capitalGain >= 0 ? 'text-rose-400' : 'text-blue-400'
                  }`}
                >
                  {expResult.capitalGain >= 0 ? '▲ +' : '▼ '}
                  {formatWon(expResult.capitalGain)}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                <span className="text-[24px] font-black text-amber-300">총 평가 손익</span>
                <div className="text-right">
                  <span
                    className={`text-[36px] xl:text-[42px] font-mono font-black tabular-nums block ${
                      expResult.totalReturn >= 0 ? 'text-rose-400' : 'text-blue-400'
                    }`}
                  >
                    {expResult.totalReturn >= 0 ? '+' : ''}
                    {formatWon(expResult.totalReturn)}
                  </span>
                  <span className="text-[22px] font-mono font-bold text-slate-200 tabular-nums">
                    수익률 {expResult.returnRatePercent >= 0 ? '+' : ''}
                    {expResult.returnRatePercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3. 가상 매수·매도 체험 ================= */}
      {activeStep === 'step3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
          {/* Left: Large Linear Price Chart + Market Turn Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 flex flex-col justify-between gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[19px] font-black text-blue-700 block">
                  {currentTurnMeta.label}
                </span>
                <h3 className="text-[28px] xl:text-[32px] font-black text-slate-900 flex items-center gap-3">
                  <span>미래테크 현재 주가:</span>
                  <span className="font-mono text-rose-700 tabular-nums">{formatWon(currentMarketPrice)}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={handleResetTrading}
                className="min-h-[50px] px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-[19px] flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>체험 초기화</span>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 text-[20px] font-bold text-slate-800">
              시장 소식: {currentTurnMeta.news}
            </div>

            {/* Large Linear Stock Chart with Avg Buy Price Line */}
            <svg viewBox="0 0 820 280" className="w-full h-[230px] overflow-visible">
              {(() => {
                const minP = 20000;
                const maxP = 100000;
                const getX = (idx: number) => 120 + (idx / Math.max(1, MARKET_TURNS.length - 1)) * 650;
                const getY = (val: number) => 225 - ((val - minP) / (maxP - minP)) * 185;

                return (
                  <>
                    {[20000, 40000, 60000, 80000, 100000].map((tick) => {
                      const y = getY(tick);
                      return (
                        <g key={tick}>
                          <line x1={110} y1={y} x2={790} y2={y} stroke="#e2e8f0" strokeWidth={2} />
                          <text x={100} y={y + 7} textAnchor="end" fontSize={20} fontWeight={700} fill="#475569">
                            {tick / 10000}만
                          </text>
                        </g>
                      );
                    })}

                    {/* Average Buy Price Horizontal Line if holding shares */}
                    {portfolio.sharesHeld > 0 && (
                      <>
                        <line
                          x1={110}
                          y1={getY(portfolio.avgBuyPrice)}
                          x2={790}
                          y2={getY(portfolio.avgBuyPrice)}
                          stroke="#f59e0b"
                          strokeWidth={3}
                          strokeDasharray="8 6"
                        />
                        <text
                          x={785}
                          y={getY(portfolio.avgBuyPrice) - 10}
                          textAnchor="end"
                          fontSize={20}
                          fontWeight={800}
                          fill="#b45309"
                        >
                          내 평균 매수가 ({formatWon(portfolio.avgBuyPrice)})
                        </text>
                      </>
                    )}

                    {/* Price History Polyline */}
                    {priceHistory.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth={6}
                        points={priceHistory.map((p, i) => `${getX(i)},${getY(p)}`).join(' ')}
                      />
                    )}

                    {MARKET_TURNS.map((t, i) => {
                      const cx = getX(i);
                      const hasReached = i < priceHistory.length;
                      const pVal = hasReached ? priceHistory[i] : t.priceWon;
                      const cy = getY(pVal);
                      return (
                        <g key={t.turn}>
                          {hasReached && (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={i === priceHistory.length - 1 ? 12 : 8}
                              fill={i === priceHistory.length - 1 ? '#e11d48' : '#0f172a'}
                              stroke="#fff"
                              strokeWidth={3}
                            />
                          )}
                          <text x={cx} y={266} textAnchor="middle" fontSize={20} fontWeight={800} fill="#334155">
                            {t.turn}턴
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>

            {/* Turn Advance & Price Nudge Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleNudgePrice(-5000)}
                  className="min-h-[52px] px-4 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 font-black text-[20px] cursor-pointer"
                >
                  주가 -5천 ▼
                </button>
                <button
                  type="button"
                  onClick={() => handleNudgePrice(5000)}
                  className="min-h-[52px] px-4 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-black text-[20px] cursor-pointer"
                >
                  주가 +5천 ▲
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextTurn}
                disabled={turnIndex >= MARKET_TURNS.length - 1}
                className="min-h-[56px] px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-black text-[21px] flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {turnIndex >= MARKET_TURNS.length - 1 ? '모든 시장 턴 완료' : `다음 시장 상황 (${turnIndex + 2}턴) →`}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Virtual Portfolio & Buy/Sell Desk */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between gap-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[22px] font-black text-amber-300">내 가상 계좌 (초기 100만 원)</span>
                <span className="text-[19px] font-bold text-slate-300 tabular-nums">
                  총수익 {metrics.totalNetReturnWon >= 0 ? '+' : ''}{formatWon(metrics.totalNetReturnWon)} ({metrics.totalNetReturnPercent >= 0 ? '+' : ''}{metrics.totalNetReturnPercent}%)
                </span>
              </div>

              {/* 6 Key Portfolio Metrics */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[17px] font-bold text-slate-400 block">보유 현금</span>
                  <span className="text-[25px] xl:text-[28px] font-mono font-black text-white tabular-nums">
                    {formatWon(portfolio.cashWon)}
                  </span>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[17px] font-bold text-slate-400 block">보유 수량</span>
                  <span className="text-[25px] xl:text-[28px] font-mono font-black text-amber-300 tabular-nums">
                    {portfolio.sharesHeld}주
                  </span>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[17px] font-bold text-slate-400 block">평균 매수가</span>
                  <span className="text-[25px] xl:text-[28px] font-mono font-black text-slate-100 tabular-nums">
                    {portfolio.sharesHeld > 0 ? formatWon(portfolio.avgBuyPrice) : '0원'}
                  </span>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[17px] font-bold text-slate-400 block">총자산 (현금+주식)</span>
                  <span className="text-[25px] xl:text-[28px] font-mono font-black text-emerald-300 tabular-nums">
                    {formatWon(metrics.totalAssetsWon)}
                  </span>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[17px] font-bold text-slate-400 block">평가손익 (보유 중)</span>
                  <span
                    className={`text-[25px] xl:text-[27px] font-mono font-black tabular-nums ${
                      metrics.unrealizedPnL > 0
                        ? 'text-rose-400'
                        : metrics.unrealizedPnL < 0
                        ? 'text-blue-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {metrics.unrealizedPnL > 0 ? '+' : ''}
                    {formatWon(metrics.unrealizedPnL)}
                  </span>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-[17px] font-bold text-slate-400 block">실현손익 (매도 확정)</span>
                  <span
                    className={`text-[25px] xl:text-[27px] font-mono font-black tabular-nums ${
                      portfolio.realizedPnL > 0
                        ? 'text-emerald-400'
                        : portfolio.realizedPnL < 0
                        ? 'text-blue-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {portfolio.realizedPnL > 0 ? '+' : ''}
                    {formatWon(portfolio.realizedPnL)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Controls */}
            <div className="space-y-3">
              <div>
                <span className="text-[19px] font-bold text-slate-300 block mb-1.5">
                  주문 수량 선택 (1회 거래: {formatWon(currentMarketPrice * tradeQty)})
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 5, 10].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setTradeQty(qty)}
                      className={`min-h-[48px] rounded-xl font-black text-[20px] cursor-pointer tabular-nums ${
                        tradeQty === qty
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {qty}주
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleBuy}
                  className="min-h-[58px] rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-[24px] cursor-pointer active:scale-95"
                >
                  매수 (사기)
                </button>
                <button
                  type="button"
                  onClick={handleSell}
                  className="min-h-[58px] rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[24px] cursor-pointer active:scale-95"
                >
                  매도 (팔기)
                </button>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-[19px] font-bold ${
                  tradeFeedbackType === 'error'
                    ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                    : tradeFeedbackType === 'success'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                {tradeFeedback}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
