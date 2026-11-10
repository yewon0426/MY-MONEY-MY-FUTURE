import React, { useState } from 'react';
import {
  PieChart,
  Users,
  Briefcase,
  Layers,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface Page05Props {
  resetSignal: number;
}

export const Page05FundEtf: React.FC<Page05Props> = ({ resetSignal }) => {
  const [basketState, setBasketState] = useState<'normal' | 'dropped'>('normal');
  const [activeTab, setActiveTab] = useState<'fund' | 'etf'>('fund');
  const [showFeeNote, setShowFeeNote] = useState<boolean>(false);

  React.useEffect(() => {
    setBasketState('normal');
    setActiveTab('fund');
    setShowFeeNote(false);
  }, [resetSignal]);

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <PieChart className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 5차시 / 간접 투자와 분산 투자의 지혜</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "펀드(Fund)와 ETF(상장지수펀드)"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          전문가가 돈을 모아 대신 굴려주는 펀드와 주식처럼 실시간 거래되는 ETF의 구조를 배웁니다.
        </p>
      </div>

      {/* Top Fund Architecture: Pooling Diagram */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm my-2">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
              간접 투자의 핵심 메커니즘
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              펀드(집합투자증권)의 자금 모으기(Pooling) 도식
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold hidden md:inline">
            소액으로도 수백 개 우량 기업에 분산 투자 가능
          </span>
        </div>

        {/* 3 Step Horizontal Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Step 1: Investors */}
          <div className="p-3.5 bg-blue-50/70 border-2 border-blue-200 rounded-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase block">1단계: 다수 투자자</span>
              <h4 className="font-extrabold text-sm text-slate-900">수많은 소액 투자자</h4>
              <p className="text-xs text-slate-600 mt-1">
                개인들이 1만 원, 10만 원씩 자금을 모아 거대한 <strong>투자 기금(Fund)</strong>을 만듭니다.
              </p>
            </div>
          </div>

          {/* Step 2: Fund Manager */}
          <div className="p-3.5 bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase block">2단계: 자산운용사</span>
              <h4 className="font-extrabold text-sm text-slate-900">전문가 (펀드매니저)</h4>
              <p className="text-xs text-slate-600 mt-1">
                금융 전문가들이 철저한 시장 분석을 바탕으로 최적의 투자 포트폴리오를 구성·운용합니다.
              </p>
            </div>
          </div>

          {/* Step 3: Diversified Assets & Returns */}
          <div className="p-3.5 bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase block">3단계: 분산 투자 및 배분</span>
              <h4 className="font-extrabold text-sm text-slate-900">다양한 자산 매수 & 배당</h4>
              <p className="text-xs text-slate-600 mt-1">
                주식 100종목, 채권 50종목 등에 분산 매수 후 발생한 실적 수익을 투자자 지분대로 배분합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Egg Basket & ETF Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 flex-1 items-stretch">
        {/* Left (6 cols): "Don't Put All Eggs in One Basket" Interactive Simulator */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  투자의 불멸의 격언
                </span>
                <h4 className="text-lg font-black text-white">
                  "계란을 한 바구니에 담지 마라" (분산 투자 체험)
                </h4>
              </div>
              <button
                onClick={() => setBasketState(basketState === 'normal' ? 'dropped' : 'normal')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                  basketState === 'dropped'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-rose-500 hover:bg-rose-400 text-white animate-pulse'
                }`}
              >
                {basketState === 'dropped' ? '상황 리셋하기 ↺' : '충격 주기 (바구니 떨구기) 💥'}
              </button>
            </div>

            {/* Visual Comparison: Single Basket vs 4 Baskets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              {/* Scenario A: Single Basket (Concentrated) */}
              <div className={`p-4 rounded-2xl border transition-all ${
                basketState === 'dropped'
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-300">A. 몰빵 집중 투자</span>
                  {basketState === 'dropped' ? (
                    <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded">
                      전액 손실!
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">1개 종목에 올인</span>
                  )}
                </div>

                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center min-h-[110px]">
                  {basketState === 'dropped' ? (
                    <div className="text-center space-y-1 animate-bounce">
                      <span className="text-4xl">🍳💥🥚</span>
                      <p className="text-xs font-black text-rose-400 mt-1">바구니가 깨져 계란 10개 완파!</p>
                      <span className="text-[10px] text-slate-400">투자 원금 100% 손실 (-100%)</span>
                    </div>
                  ) : (
                    <div className="text-center space-y-1">
                      <span className="text-4xl">🧺🥚🥚🥚🥚</span>
                      <p className="text-xs font-bold text-slate-300 mt-1">1개 바구니에 계란 10개 보관</p>
                      <span className="text-[10px] text-slate-500">한 번 넘어지면 회복 불가</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Scenario B: 4 Baskets (Diversified Fund) */}
              <div className={`p-4 rounded-2xl border transition-all ${
                basketState === 'dropped'
                  ? 'bg-emerald-950/60 border-emerald-500'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-300">B. 펀드 분산 투자</span>
                  {basketState === 'dropped' ? (
                    <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black">
                      75% 안전 보존!
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">4개 자산에 분산</span>
                  )}
                </div>

                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-center min-h-[110px]">
                  {basketState === 'dropped' ? (
                    <div className="text-center space-y-1 animate-fade-in">
                      <span className="text-2xl">🍳(1번 깨짐) + 🧺🥚 + 🧺🥚 + 🧺🥚</span>
                      <p className="text-xs font-black text-emerald-300 mt-1">1개만 깨지고 3개 바구니는 안전!</p>
                      <span className="text-[10px] text-emerald-400 font-bold">손실 극소화 (-25% 방어)</span>
                    </div>
                  ) : (
                    <div className="text-center space-y-1">
                      <span className="text-2xl">🧺🥚 + 🧺🥚 + 🧺🥚 + 🧺🥚</span>
                      <p className="text-xs font-bold text-slate-300 mt-1">주식·채권·금·예금 4곳 분산</p>
                      <span className="text-[10px] text-slate-500">위험 분산의 황금률</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 text-xs text-slate-300">
            <strong className="text-amber-400 block mb-0.5 font-bold">
              💡 분산 투자(Diversification)의 경제학적 의의:
            </strong>
            한 기업이 부도나거나 주가가 폭락하더라도, 다른 우량 기업이나 안전 자산(채권)의 가치가 유지되어 전체 자산이 파산하는 치명적 위험을 효과적으로 방어합니다.
          </div>
        </div>

        {/* Right (6 cols): What is ETF? & Fee / Loss Warning */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="font-extrabold text-base text-slate-900">
                  현대 금융의 대세: ETF (상장지수펀드)
                </span>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                Exchange Traded Fund
              </span>
            </div>

            {/* ETF Concept Card: Fund + Stock hybrid */}
            <div className="p-3.5 bg-gradient-to-br from-amber-50/50 to-blue-50/50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-sm font-black text-slate-900">
                "펀드의 편리한 분산 투자 + 주식의 실시간 간편 매매"
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                일반 펀드는 가입하고 해지하는 데 며칠씩 걸리고 창구에 가야 하지만, <strong>ETF</strong>는 펀드를 주식시장에 상장(Listing)시켜놓은 상품입니다.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-700 block mb-0.5">실시간 매매 가능</span>
                  <span className="text-slate-500 text-[11px]">스마트폰 증권 앱에서 1주 단위로 즉시 매수·매도</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-emerald-700 block mb-0.5">낮은 운용 보수</span>
                  <span className="text-slate-500 text-[11px]">지수를 추종하므로 일반 액티브 펀드보다 수수료 저렴</span>
                </div>
              </div>
            </div>

            {/* Popular ETF Examples */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                대표적인 고교생 맞춤 ETF 사례:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block font-bold">KOSPI 200 ETF</strong>
                  <span className="text-[11px] text-slate-500">
                    단 1주(약 3만 원)만 사도 삼성전자, 현대차 등 한국 대표 200대 기업에 골고루 투자
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block font-bold">미국 S&P 500 ETF</strong>
                  <span className="text-[11px] text-slate-500">
                    애플, 마이크로소프트, 구글, 엔비디아 등 미국 500대 혁신 기업에 동시 투자
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vital Warning: Principle Loss Risk & Fees */}
          <div className="mt-4 p-3.5 bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <strong className="text-rose-900 font-extrabold block">
                ⚠️ [중요 유의점] 펀드와 ETF도 원금 손실 위험이 있습니다!
              </strong>
              <p className="text-rose-800 leading-relaxed text-[11px]">
                전문가가 운용하거나 수십 개 종목에 분산하더라도, <strong>시장 전체가 폭락하면 원금 손실이 발생</strong>하며 예금자보호법이 적용되지 않습니다. 또한 자산운용사에 매년 일정 비율의 <strong>운용 보수(수수료)</strong>를 지불해야 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 직접 투자 vs 간접 투자:</span>
          <span>내가 직접 개별 주식을 고르면 <strong>직접 투자</strong>, 펀드나 ETF를 통해 전문가의 포트폴리오를 사면 <strong>간접 투자</strong>입니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">포트폴리오 분산의 기본</span>
      </div>
    </div>
  );
};
