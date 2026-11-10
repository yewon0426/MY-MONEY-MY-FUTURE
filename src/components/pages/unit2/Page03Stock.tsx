import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Vote,
  Receipt,
  Scale,
  DollarSign,
  ChevronRight,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { calculateStockReturn, formatWon } from '../../../utils/finance';

interface Page03Props {
  resetSignal: number;
}

const PRICE_PRESETS = [
  { label: '-30% 급락', percent: -30, price: 49000 },
  { label: '-10% 하락', percent: -10, price: 63000 },
  { label: '0% 본전', percent: 0, price: 70000 },
  { label: '+15% 상승', percent: 15, price: 80500 },
  { label: '+30% 급등', percent: 30, price: 91000 },
  { label: '+50% 대박', percent: 50, price: 105000 },
];

export const Page03Stock: React.FC<Page03Props> = ({ resetSignal }) => {
  // Simulator State: Samsung Electronics Example
  const [purchasePrice, setPurchasePrice] = useState<number>(70000); // 70,000원 (삼성전자 1주 기준)
  const [shares, setShares] = useState<number>(10); // 10주
  const [currentPrice, setCurrentPrice] = useState<number>(80500); // 현재 주가 (기본 +15%)
  const [dividendPerShare, setDividendPerShare] = useState<number>(2000); // 주당 배당금 2,000원
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Step-by-step disclosure state for classroom big question
  const [revealedStep, setRevealedStep] = useState<number>(0);

  React.useEffect(() => {
    setPurchasePrice(70000);
    setShares(10);
    setCurrentPrice(80500);
    setDividendPerShare(2000);
    setIsCustomMode(false);
    setRevealedStep(0);
  }, [resetSignal]);

  const stockResult = calculateStockReturn(purchasePrice, currentPrice, shares, dividendPerShare);
  const isProfit = stockResult.isProfit;

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 3차시 / 지분 투자와 기업 성장 공유</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "주식(Stock)과 주주의 권리"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          기업의 주인이 되는 소유권 증서인 주식의 본질과 시세차익·배당금 수익 구조를 알아봅니다.
        </p>
      </div>

      {/* Classroom Big Question: Step-by-Step Disclosure */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-blue-800/60 my-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              Q
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                수업 도입 생각 열기 (단계별 공개)
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                "삼성전자 주식 1주를 사면, 나도 500조 원짜리 대기업의 주인이 되는 걸까?"
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRevealedStep((prev) => (prev < 4 ? prev + 1 : 0))}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>{revealedStep === 4 ? '처음부터 다시 보기 ↺' : `다음 단계 열기 (${revealedStep}/4) ▶`}</span>
            </button>
            {revealedStep > 0 && (
              <button
                onClick={() => setRevealedStep(4)}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                전체 공개
              </button>
            )}
          </div>
        </div>

        {/* 4-Step Progressive Disclosure Cards */}
        {revealedStep > 0 && (
          <div className="mt-4 pt-3.5 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in text-xs">
            {/* Step 1 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              revealedStep >= 1 ? 'bg-white/10 border-amber-400/50 shadow-md' : 'opacity-40 bg-white/5 border-white/5'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] flex items-center justify-center">1</span>
                <strong className="text-amber-300 font-bold text-xs sm:text-sm">정답: "네, 맞습니다!"</strong>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                비록 지분율은 0.0000001%일지라도, 주식(Stock)은 회사의 소유권을 잘게 쪼갠 <strong>지분(Equity) 증서</strong>입니다. 1주만 사도 엄연한 주식회사의 주인(주주)입니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              revealedStep >= 2 ? 'bg-white/10 border-blue-400/50 shadow-md' : 'opacity-40 bg-white/5 border-white/5'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-400 text-slate-950 font-black text-[11px] flex items-center justify-center">2</span>
                <strong className="text-blue-300 font-bold text-xs sm:text-sm flex items-center gap-1">
                  <Vote className="w-3.5 h-3.5" />
                  경영 참여권 (의결권)
                </strong>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                매년 3월 열리는 <strong>주주총회에 참석하여 1주당 1표의 의결권(투표권)</strong>을 행사합니다. 대표이사 선임, 이사회 안건 승인 등 기업 중요 결정에 주권을 행사할 수 있습니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              revealedStep >= 3 ? 'bg-white/10 border-emerald-400/50 shadow-md' : 'opacity-40 bg-white/5 border-white/5'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 font-black text-[11px] flex items-center justify-center">3</span>
                <strong className="text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5" />
                  이익 배분권 (배당금)
                </strong>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                회사가 1년간 열심히 사업을 해 남긴 순이익의 일부를 주주들에게 현금으로 나누어주는 <strong>이익배당청구권</strong>을 행사하여 배당금을 지급받습니다.
              </p>
            </div>

            {/* Step 4 */}
            <div className={`p-3 rounded-2xl border transition-all ${
              revealedStep >= 4 ? 'bg-white/10 border-purple-400/50 shadow-md' : 'opacity-40 bg-white/5 border-white/5'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-400 text-slate-950 font-black text-[11px] flex items-center justify-center">4</span>
                <strong className="text-purple-300 font-bold text-xs sm:text-sm flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" />
                  잔여재산 분배청구권
                </strong>
              </div>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                만약 기업이 해산하거나 청산하게 될 경우, 빚(부채)을 모두 갚고 남은 순자산을 보유 주식 수에 비례하여 나누어 돌려받을 권리를 가집니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2 Core Revenue Drivers: Dedicated Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-2">
        {/* Card 1: Capital Gain */}
        <div className="bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200 rounded-3xl p-4 shadow-sm flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0 shadow-md">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-black uppercase">
                수익원 ①
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                시세차익 (Capital Gain)
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>"쌀 때 사서 비쌀 때 판다!"</strong> 기업 가치가 오르거나 실적이 좋아져 주가가 내가 매수한 가격보다 상승했을 때, 주식을 시장에 매도하여 얻는 가격 차익입니다. (주가가 떨어지면 시세차손 손실 발생)
            </p>
          </div>
        </div>

        {/* Card 2: Dividend */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-4 shadow-sm flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 shadow-md">
            <Receipt className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
                수익원 ②
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                배당금 (Dividend)
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>"기업의 성과를 보너스로 받는다!"</strong> 기업이 1년 동안 벌어들인 영업이익(순이익)의 일부를 주주들에게 보유 주식 수에 비례하여 현금으로 분배해 주는 결실입니다. (기업 실적이 적자면 배당이 없을 수도 있음)
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Trading Simulator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 flex-1 items-stretch">
        {/* Left Panel (5 cols): Controller & Stock Configuration */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  삼성전자(005930) 모의 투자 실험실
                </span>
              </div>
              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  isCustomMode
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isCustomMode ? '간편 시나리오 모드로 전환' : '직접 입력 모드 ✏️'}
              </button>
            </div>

            {/* Portfolio Summary Card */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>모의 투자 종목:</span>
                <span className="font-bold text-slate-900">삼성전자 보통주 (코스피 1등 대형주)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>매수 단가 / 보유 수량:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {formatWon(purchasePrice)} / {shares}주
                </span>
              </div>
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                <span className="font-extrabold text-slate-900">총 매수 원금 (지출):</span>
                <span className="font-black text-indigo-700 text-base font-mono">
                  {formatWon(stockResult.totalInvested)}
                </span>
              </div>
            </div>

            {/* Custom Mode vs Preset Mode */}
            {isCustomMode ? (
              <div className="space-y-3 bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-200 text-xs animate-fade-in">
                <div>
                  <div className="flex justify-between mb-1 font-bold">
                    <span className="text-slate-700">보유 수량:</span>
                    <span className="text-indigo-700 font-mono font-black">{shares}주</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={shares}
                    onChange={(e) => setShares(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>1주</span>
                    <span>50주</span>
                    <span>100주</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-bold">
                    <span className="text-slate-700">현재 시장 주가:</span>
                    <span className={`font-mono font-black ${currentPrice >= purchasePrice ? 'text-rose-600' : 'text-blue-600'}`}>
                      {formatWon(currentPrice)} ({(((currentPrice - purchasePrice) / purchasePrice) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="35000"
                    max="120000"
                    step="1000"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>35,000원 (-50%)</span>
                    <span>70,000원 (본전)</span>
                    <span>120,000원 (+71%)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-bold">
                    <span className="text-slate-700">주당 연간 배당금:</span>
                    <span className="text-emerald-700 font-mono font-black">{formatWon(dividendPerShare)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="500"
                    value={dividendPerShare}
                    onChange={(e) => setDividendPerShare(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>0원</span>
                    <span>2,000원</span>
                    <span>5,000원</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Price Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                    <span className="text-slate-600">주가 변동 시나리오 선택:</span>
                    <span className={`font-mono text-sm font-extrabold ${isProfit ? 'text-rose-600' : 'text-blue-600'}`}>
                      현재가: {formatWon(currentPrice)} ({stockResult.returnRatePercent >= 0 ? '+' : ''}{stockResult.returnRatePercent.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {PRICE_PRESETS.map((p) => {
                      const isSelected = currentPrice === p.price;
                      const isPositive = p.percent > 0;
                      return (
                        <button
                          key={p.percent}
                          onClick={() => setCurrentPrice(p.price)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                            isSelected
                              ? isPositive
                                ? 'bg-rose-500 text-white shadow-md ring-2 ring-rose-200'
                                : p.percent === 0
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{p.label}</span>
                          <span className="text-[10px] opacity-80 font-mono">{formatWon(p.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dividend Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                    <span className="text-slate-600">주당 연간 배당금 설정:</span>
                    <span className="text-emerald-700 font-mono font-extrabold">
                      주당 {formatWon(dividendPerShare)} (총 {formatWon(stockResult.totalDividends)})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1500, 2000].map((divAmt) => (
                      <button
                        key={divAmt}
                        onClick={() => setDividendPerShare(divAmt)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          dividendPerShare === divAmt
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {divAmt === 0 ? '배당금 없음' : `주당 ${divAmt.toLocaleString()}원`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Principle Note */}
          <div className="mt-3 p-3 bg-blue-50/70 rounded-2xl border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
            <span className="font-bold">보유 {shares}주 총액 분석</span>
            <span className="text-[11px] text-blue-800">배당금은 주가와 관계없이 지급 확정!</span>
          </div>
        </div>

        {/* Right Panel (7 cols): Result Dashboard & Profit/Loss Breakdown */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  실시간 평가 결과 분석 ({shares}주 기준)
                </span>
                <span className="text-sm text-slate-200 font-bold">
                  원금 {formatWon(stockResult.totalInvested)} → 현재 주식 평가액 {formatWon(stockResult.currentValue)}
                </span>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 ${
                  isProfit ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}
              >
                {isProfit ? <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> : <TrendingDown className="w-3.5 h-3.5 text-blue-400" />}
                {stockResult.returnRatePercent >= 0 ? '+' : ''}{stockResult.returnRatePercent.toFixed(1)}% 총수익률
              </span>
            </div>

            {/* Big Total Return Display */}
            <div className="my-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold block">
                  총 손익 (시세차익 + 배당금 합산)
                </span>
                <div className={`text-3xl sm:text-4xl font-black font-mono mt-1 ${isProfit ? 'text-rose-400' : 'text-blue-400'}`}>
                  {isProfit ? '+' : ''}{formatWon(stockResult.totalReturn)}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">최종 회수 가능 총액</span>
                <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                  {formatWon(stockResult.currentValue + stockResult.totalDividends)}
                </div>
              </div>
            </div>

            {/* Return Breakdown Components */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-bold mb-1">① 시세차익 손익</span>
                <span className={`text-xl font-mono font-black ${stockResult.capitalGain >= 0 ? 'text-rose-400' : 'text-blue-400'}`}>
                  {stockResult.capitalGain >= 0 ? '+' : ''}{formatWon(stockResult.capitalGain)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  ({formatWon(currentPrice)} - {formatWon(purchasePrice)}) × {shares}주
                </span>
              </div>

              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-bold mb-1">② 배당금 수익 (이익 배분)</span>
                <span className="text-xl font-mono font-black text-emerald-400">
                  +{formatWon(stockResult.totalDividends)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  주당 {formatWon(dividendPerShare)} × {shares}주
                </span>
              </div>
            </div>
          </div>

          {/* Vital Risk Warning: Stocks Have Principle Loss Risk */}
          <div className="mt-4 p-3.5 bg-rose-950/60 border border-rose-500/60 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <strong className="text-rose-200 font-bold block">
                ⚠️ [필수 교육] 주식의 원금 손실 위험 및 비예금자보호
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                주식은 은행 예금과 달리 <strong>원금이 보장되지 않으며(원금 손실 가능), 예금자보호법 대상이 아닙니다</strong>. 기업의 경영 부진이나 글로벌 경제 위기 시 주가가 -50%, -70%까지 급락하거나 최악의 경우 상장폐지·부도로 원금을 전부 날릴 수 있는 <strong>고위험·고수익(High Risk, High Return)</strong> 직접 투자 상품입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Comparison Note */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 고1 통합사회 핵심:</span>
          <span>주식은 <strong>직접 지분 투자 상품</strong>으로 기업 성장의 과실(배당+시세차익)을 누리지만, 위험(손실) 또한 투자자가 전적으로 부담합니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">투자의 대원칙: High Risk, High Return</span>
      </div>
    </div>
  );
};
