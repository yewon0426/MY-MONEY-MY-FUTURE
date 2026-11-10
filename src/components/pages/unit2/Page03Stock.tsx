import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  AlertTriangle,
  HelpCircle,
  Coins,
  Sparkles,
  RotateCcw,
  Vote,
  Receipt,
  DollarSign,
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
  const [purchasePrice] = useState<number>(70000); // 70,000원 (삼성전자 예시)
  const [shares] = useState<number>(10); // 10주 매수
  const [currentPrice, setCurrentPrice] = useState<number>(80500); // 초기 +15%
  const [dividendPerShare, setDividendPerShare] = useState<number>(2000); // 주당 배당금 2,000원
  const [showOwnerAnswer, setShowOwnerAnswer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'concepts' | 'simulator'>('simulator');

  React.useEffect(() => {
    setCurrentPrice(80500);
    setDividendPerShare(2000);
    setShowOwnerAnswer(false);
    setActiveTab('simulator');
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

      {/* Classroom Big Question Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-blue-800/60 my-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0">
              Q
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                수업 도입 생각 열기
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                "삼성전자 주식 1주를 사면, 나도 500조 원짜리 대기업의 주인이 되는 걸까?"
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowOwnerAnswer(!showOwnerAnswer)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
          >
            {showOwnerAnswer ? '해설 닫기 ▲' : '정답 및 핵심 해설 열기 ▼'}
          </button>
        </div>

        {showOwnerAnswer && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <strong className="text-amber-300 font-bold block mb-1 flex items-center gap-1.5">
                <Vote className="w-4 h-4 text-amber-400" />
                정답: "네, 맞습니다! 엄연한 주식회사의 주인(주주)입니다."
              </strong>
              <p className="text-slate-200 leading-relaxed">
                비록 지분율은 0.0000001%일지라도, 주식(Stock)은 회사의 소유권을 쪼갠 지분(Equity) 증서입니다. 1주만 보유해도 매년 3월 주주총회에 참석하여 대표이사 선임 등 주요 경영 사안에 투표할 법적 <strong>의결권(투표권)</strong>을 갖습니다.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <strong className="text-emerald-300 font-bold block mb-1 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-400" />
                이익 배분권: 배당금을 받을 권리
              </strong>
              <p className="text-slate-200 leading-relaxed">
                회사가 열심히 사업을 해서 이익(순이익)을 내면, 주주는 보유한 주식 수에 비례하여 이익의 일부를 현금으로 지급받는 <strong>이익배당청구권</strong>을 행사할 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Trading Simulator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 flex-1 items-stretch">
        {/* Left Panel (5 cols): 10-Share Purchase Overview & Controller */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  가상 기업 주식 매수 (10주 포트폴리오)
                </span>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                매수가: 주당 70,000원
              </span>
            </div>

            {/* Portfolio Summary Card */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>매수 종목:</span>
                <span className="font-bold text-slate-800">미래반도체(주) (우량 대형주)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>보유 수량:</span>
                <span className="font-bold text-slate-800">{shares}주</span>
              </div>
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                <span className="font-extrabold text-slate-900">총 매수 금액 (원금):</span>
                <span className="font-black text-indigo-700 text-sm font-mono">
                  {formatWon(stockResult.totalInvested)} (70만 원)
                </span>
              </div>
            </div>

            {/* Price Preset Fluctuation Buttons */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">주가 변동 시나리오 선택:</span>
                <span className={`font-mono text-sm font-extrabold ${isProfit ? 'text-rose-600' : 'text-blue-600'}`}>
                  현재 주가: {formatWon(currentPrice)} ({stockResult.returnRatePercent >= 0 ? '+' : ''}{stockResult.returnRatePercent.toFixed(1)}%)
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

            {/* Dividend Toggle / Setting */}
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

          {/* Capital Gain vs Dividend Key Distinction */}
          <div className="mt-3 p-3 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 text-xs text-indigo-950 space-y-1">
            <strong className="text-indigo-900 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              주식의 2가지 핵심 수익원
            </strong>
            <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
              <div className="bg-white p-2 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-900 block">① 시세차익 (Capital Gain)</span>
                <span className="text-slate-600">주가가 매수가보다 오를 때 매도하여 얻는 가격 차익</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-900 block">② 배당금 (Dividend)</span>
                <span className="text-slate-600">기업의 영업 이익 중 주주에게 현금으로 분배되는 몫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (7 cols): Result Dashboard & Profit/Loss Breakdown */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  실시간 평가 결과 분석 (10주 기준)
                </span>
                <span className="text-sm text-slate-200 font-bold">
                  원금 {formatWon(stockResult.totalInvested)} → 현재 평가액 {formatWon(stockResult.currentValue)}
                </span>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 ${
                  isProfit ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}
              >
                {isProfit ? <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> : <TrendingDown className="w-3.5 h-3.5 text-blue-400" />}
                {stockResult.returnRatePercent >= 0 ? '+' : ''}{stockResult.returnRatePercent.toFixed(1)}% 수익률
              </span>
            </div>

            {/* Big Total Return Display */}
            <div className="my-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold block">
                  총 손익 (시세차익 + 배당금)
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
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-bold mb-1">시세차익 손익</span>
                <span className={`text-lg font-mono font-black ${stockResult.capitalGain >= 0 ? 'text-rose-400' : 'text-blue-400'}`}>
                  {stockResult.capitalGain >= 0 ? '+' : ''}{formatWon(stockResult.capitalGain)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  ({formatWon(currentPrice)} - {formatWon(purchasePrice)}) × 10주
                </span>
              </div>

              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-bold mb-1">배당금 수익</span>
                <span className="text-lg font-mono font-black text-emerald-400">
                  +{formatWon(stockResult.totalDividends)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  주당 {formatWon(dividendPerShare)} × 10주 (확정 수령)
                </span>
              </div>
            </div>
          </div>

          {/* Vital Risk Warning: Stocks Have Principle Loss Risk */}
          <div className="mt-4 p-3.5 bg-rose-950/60 border border-rose-500/60 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <strong className="text-rose-200 font-bold block">
                ⚠️ [필수 교육] 주식의 원금 손실 가능성 명시
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                주식은 은행 예금과 달리 <strong>원금이 보장되지 않으며(원금 손실 가능), 예금자보호 대상이 아닙니다</strong>. 기업의 경영 악화나 경기 침체 시 주가가 -50%, -70%까지 폭락하거나 회사가 부도날 경우 원금을 전부 잃을 수도 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Comparison Note */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 고1 통합사회 핵심:</span>
          <span>주식은 <strong>직접 투자 상품</strong>으로 높은 수익성(고수익)을 추구하지만, 그에 비례하여 높은 위험성(고위험)을 감수해야 합니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">자산 관리의 원칙: High Risk, High Return</span>
      </div>
    </div>
  );
};
