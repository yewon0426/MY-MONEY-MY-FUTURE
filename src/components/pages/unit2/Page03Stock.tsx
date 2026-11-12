import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  AlertTriangle,
  Receipt,
  Vote,
  Scale,
  DollarSign,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page03Props {
  resetSignal: number;
}

// 1-1. Educational presets based on user specifications:
const BASE_PURCHASE_PRICE = 189900; // 189,900원 (삼성전자 예시 교육용 기준가)
const DEFAULT_SHARES = 10; // 10주
const BASE_DIVIDEND_PER_SHARE = 1668; // 연간 주당 배당금 예시: 1,668원

const SCENARIO_BUTTONS = [
  { label: '주가 +10% 상승', percent: 10 },
  { label: '주가 +5% 상승', percent: 5 },
  { label: '주가 변동 없음 (0%)', percent: 0 },
  { label: '주가 -5% 하락', percent: -5 },
  { label: '주가 -10% 하락', percent: -10 },
];

interface TeacherQuestion {
  id: number;
  question: string;
  studentExpected: string;
  revealedAnswer: string;
  insight: string;
}

const TEACHER_QUESTIONS: TeacherQuestion[] = [
  {
    id: 1,
    question: '주가가 10% 하락해도 배당금을 받으면 무조건 이익일까요?',
    studentExpected: '배당금을 받아도 주가 하락 폭(평가손실)이 더 크면 전체적으로는 손실일 것 같아요!',
    revealedAnswer: '아닙니다! 배당금이 주가 하락 손실을 전부 상쇄하지 못하면 총손익은 마이너스(손실)입니다.',
    insight: '현재 시뮬레이터에서 주가 -10% 하락 시 평가손실은 -189,900원이지만 10주 배당금은 +16,680원에 불과하므로 최종 손실은 -173,220원입니다.',
  },
  {
    id: 2,
    question: '배당금이 높은 주식은 반드시 좋은 투자일까요?',
    studentExpected: '배당을 많이 주면 무조건 좋을 것 같은데, 회사에 문제가 있어서 주가가 폭락한 건 아닐까요?',
    revealedAnswer: '반드시 그렇지는 않습니다. 기업의 주가 하락이나 미래 성장 투자 부족 때문일 수 있습니다.',
    insight: '기업이 미래 성장을 위한 R&D에 재투자하지 않고 배당만 과도하게 주거나, 주가가 폭락하여 겉보기에만 배당수익률이 높아 보이는 "배당 함정(Dividend Trap)"에 주의해야 합니다.',
  },
  {
    id: 3,
    question: '주식 10주를 보유한 사람은 기업의 주주라고 할 수 있을까요?',
    studentExpected: '수량이 적어도 주식을 산 사람이니까 엄연한 주식회사의 주주(주인)가 맞아요!',
    revealedAnswer: '네, 맞습니다! 비록 소액 지분이지만 법적인 주식회사 소유권자(주주)입니다.',
    insight: '10주만 있어도 주주총회에서 10표의 의결권을 행사할 수 있으며, 이익배당청구권과 잔여재산분배청구권을 온전히 누릴 수 있습니다.',
  },
  {
    id: 4,
    question: '주식을 아직 팔지 않았는데 화면에 손실/이익이 나타나는 이유는 무엇일까요?',
    studentExpected: '아직 팔아서 돈으로 바꾼 건 아니지만 지금 시장에서 팔면 그 가격이기 때문 아닐까요?',
    revealedAnswer: '현재 시장 시세로 계산한 "평가손익(미실현 손익)"이기 때문입니다.',
    insight: '실제 매도 버튼을 눌러 통장에 돈이 들어올 때 확정되는 것이 "실현 손익(시세차익)"이고, 보유 중 시장 가격 변동으로 계산되는 것은 "평가손익"입니다.',
  },
];

export const Page03Stock: React.FC<Page03Props> = ({ resetSignal }) => {
  // 1-1. Educational state
  const [purchasePrice, setPurchasePrice] = useState<number>(BASE_PURCHASE_PRICE);
  const [shares, setShares] = useState<number>(DEFAULT_SHARES);
  const [currentPrice, setCurrentPrice] = useState<number>(BASE_PURCHASE_PRICE * 1.05); // 초기 +5%
  const [dividendPerShare, setDividendPerShare] = useState<number>(BASE_DIVIDEND_PER_SHARE);

  // Modes
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [selectedPercent, setSelectedPercent] = useState<number | null>(5);
  const [revealedStep, setRevealedStep] = useState<number>(0);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [questionRevealed, setQuestionRevealed] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    setPurchasePrice(BASE_PURCHASE_PRICE);
    setShares(DEFAULT_SHARES);
    setCurrentPrice(Math.round(BASE_PURCHASE_PRICE * 1.05));
    setDividendPerShare(BASE_DIVIDEND_PER_SHARE);
    setIsCustomMode(false);
    setSelectedPercent(5);
    setRevealedStep(0);
    setActiveQuestionId(null);
    setQuestionRevealed({});
  }, [resetSignal]);

  // Calculations
  const totalInvested = purchasePrice * shares; // ② 총매수금액 (원금)
  const currentTotalValue = currentPrice * shares; // ③ 현재 평가금액
  const capitalGain = currentTotalValue - totalInvested; // ④ 평가손익 (시세차익)
  const returnRatePercent = totalInvested > 0 ? (capitalGain / totalInvested) * 100 : 0; // ⑤ 평가수익률
  const totalDividends = dividendPerShare * shares; // ⑥ 배당금 가정액 (10주 기준)
  const netTotalReturn = capitalGain + totalDividends; // ⑦ 배당금을 포함한 총손익

  const isProfit = capitalGain > 0;
  const isTotalProfit = netTotalReturn > 0;
  const isLoss = capitalGain < 0;

  const handleApplyScenario = (pct: number) => {
    setSelectedPercent(pct);
    setIsCustomMode(false);
    const newPrice = Math.round(purchasePrice * (1 + pct / 100));
    setCurrentPrice(newPrice);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 3차시 / 실제 기업 기반 수익·손실 시나리오 분석</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "주식(Stock)의 수익 구조 — 시세차익과 배당금"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          삼성전자 보통주(005930) 교육용 사례로 주가 변동과 배당금이 자산 가치에 미치는 영향을 탐구합니다.
        </p>
      </div>

      {/* Classroom Big Question: Step-by-Step 4-Stage Disclosure */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-blue-800/60 my-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              Q
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                수업 도입 생각 열기 (단계별 주주 권리 탐구)
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                "삼성전자 주식 10주를 보유한 사람은 기업의 주주라고 할 수 있을까요?"
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRevealedStep((prev) => (prev < 4 ? prev + 1 : 0))}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>{revealedStep === 4 ? '다시 접기 ↺' : `다음 단계 공개 (${revealedStep}/4) ▶`}</span>
            </button>
            {revealedStep > 0 && (
              <button
                onClick={() => setRevealedStep(4)}
                className="px-2.5 py-1.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                전체 공개
              </button>
            )}
          </div>
        </div>

        {revealedStep > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-fade-in text-xs">
            {/* Step 1 */}
            <div className={`p-2.5 rounded-xl border transition-all ${revealedStep >= 1 ? 'bg-white/10 border-amber-400/50' : 'opacity-30'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">1</span>
                <strong className="text-amber-300 font-bold">정답: "네, 맞습니다!"</strong>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                비록 10주일지라도 주식회사의 소유권을 쪼갠 <strong>지분(Equity)</strong>을 보유한 어엿한 주주입니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-2.5 rounded-xl border transition-all ${revealedStep >= 2 ? 'bg-white/10 border-blue-400/50' : 'opacity-30'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-blue-400 text-slate-950 font-black text-[10px] flex items-center justify-center">2</span>
                <strong className="text-blue-300 font-bold flex items-center gap-1">
                  <Vote className="w-3 h-3" />
                  경영 참여권 (의결권)
                </strong>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                매년 3월 정기 주주총회에 참석하여 1주당 1표(총 10표)의 <strong>의결권(투표권)</strong>을 행사합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-2.5 rounded-xl border transition-all ${revealedStep >= 3 ? 'bg-white/10 border-emerald-400/50' : 'opacity-30'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] flex items-center justify-center">3</span>
                <strong className="text-emerald-300 font-bold flex items-center gap-1">
                  <Receipt className="w-3 h-3" />
                  이익 배분권 (배당금)
                </strong>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                회사가 남긴 순이익의 일부를 주식 수에 비례해 현금으로 받는 <strong>이익배당청구권</strong>을 갖습니다.
              </p>
            </div>

            {/* Step 4 */}
            <div className={`p-2.5 rounded-xl border transition-all ${revealedStep >= 4 ? 'bg-white/10 border-purple-400/50' : 'opacity-30'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-4 rounded-full bg-purple-400 text-slate-950 font-black text-[10px] flex items-center justify-center">4</span>
                <strong className="text-purple-300 font-bold flex items-center gap-1">
                  <Scale className="w-3 h-3" />
                  잔여재산 분배청구권
                </strong>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                회사가 청산될 경우 모든 빚을 갚고 남은 순자산을 지분 비율에 따라 나누어 돌려받을 권리입니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main 12-Column Grid: Left Controller & Scenario Buttons, Right Scoreboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left Column (5 cols): Presets, Scenario Buttons, Direct Input Mode */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header info */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  삼성전자 보통주 (005930) 시뮬레이터
                </span>
              </div>
              <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                교육용 가상 모델
              </span>
            </div>

            {/* Educational Base Parameters Box */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>교육용 기준 매수가:</span>
                <span className="font-bold text-slate-900 font-mono">{formatWon(purchasePrice)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>보유 수량:</span>
                <span className="font-bold text-slate-900 font-mono">{shares}주</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>② 총매수금액 (원금):</span>
                <span className="font-black text-indigo-700 font-mono text-sm">{formatWon(totalInvested)}</span>
              </div>
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                <span>연간 주당 배당금 예시:</span>
                <span className="font-bold text-emerald-700 font-mono">
                  주당 {formatWon(dividendPerShare)} (10주 총 {formatWon(totalDividends)})
                </span>
              </div>
              <div className="text-[10px] text-slate-400 pt-1 leading-tight">
                ※ 위 수치는 과거 기준 시점의 교육용 예시값이며 실시간 주가나 미래 확정 배당금이 아닙니다. (세금 및 수수료 제외)
              </div>
            </div>

            {/* 1-2. 주가 변화 시나리오 선택 버튼 */}
            <div>
              <div className="flex items-center justify-between mb-1 text-xs font-bold">
                <span className="text-slate-700">1-2. 주가 변화 시나리오 선택:</span>
                <button
                  onClick={() => {
                    setIsCustomMode(!isCustomMode);
                    setSelectedPercent(null);
                  }}
                  className={`text-[11px] px-2 py-0.5 rounded-lg font-bold cursor-pointer transition-all ${
                    isCustomMode ? 'bg-indigo-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  {isCustomMode ? '시나리오 모드로 전환' : '직접 입력 ✏️'}
                </button>
              </div>

              {isCustomMode ? (
                <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-2 text-xs animate-fade-in">
                  <div>
                    <div className="flex justify-between mb-1 font-bold">
                      <span className="text-slate-700">현재 주가 직접 조절:</span>
                      <span className="font-mono font-black text-indigo-700">{formatWon(currentPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={250000}
                      step={1000}
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>10만 원 (-47%)</span>
                      <span>189,900원 (본전)</span>
                      <span>25만 원 (+32%)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {SCENARIO_BUTTONS.map((btn) => {
                    const isSelected = selectedPercent === btn.percent;
                    return (
                      <button
                        key={btn.percent}
                        onClick={() => handleApplyScenario(btn.percent)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? btn.percent > 0
                              ? 'bg-rose-500 text-white shadow-md ring-2 ring-rose-200'
                              : btn.percent === 0
                              ? 'bg-slate-900 text-white shadow-md'
                              : 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{btn.label}</span>
                        <span className="text-[10px] opacity-80 font-mono">
                          {formatWon(Math.round(purchasePrice * (1 + btn.percent / 100)))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 1-3. 시세차익과 배당금 구분 교육 카드 */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-[11px] text-amber-950 space-y-1">
              <strong className="text-amber-900 font-bold block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                1-3. 시세차익 vs 배당금 본질 구분:
              </strong>
              <div className="grid grid-cols-2 gap-2 text-[10px] mt-1">
                <div className="bg-white p-2 rounded-lg border border-amber-100">
                  <span className="font-bold text-slate-900 block">평가이익 vs 실현 시세차익</span>
                  <span className="text-slate-600">주가 상승은 미실현 평가이익이며, 주식을 매도해야 확정 시세차익이 됩니다.</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-100">
                  <span className="font-bold text-slate-900 block">배당금 가정액 주의</span>
                  <span className="text-slate-600">배당금은 기업이 결정하며, 배당금이 나온다고 주가 하락 손실이 없어지는 것은 아닙니다.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-1.5">
            <span>※ 거래 수수료 및 증권거래세, 배당소득세(15.4%) 제외 단순 계산</span>
            <span className="font-bold text-slate-600">고1 통합사회 교과 표준</span>
          </div>
        </div>

        {/* Right Column (7 cols): Result Dashboard (7 Required Outputs) & Teacher Questions */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            {/* Top Bar: Item 1 & 5 */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  ① 현재 주가 및 주가 변동 상태
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white font-mono">
                  주당 {formatWon(currentPrice)} ({isProfit ? '상승 ▲' : isLoss ? '하락 ▼' : '보합 ━'})
                </span>
              </div>

              {/* Text label with color to avoid relying solely on red/blue */}
              <div
                className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                  isProfit
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : isLoss
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {isProfit ? <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> : <TrendingDown className="w-3.5 h-3.5 text-blue-400" />}
                <span>
                  ⑤ 평가수익률: {returnRatePercent >= 0 ? '+' : ''}{returnRatePercent.toFixed(1)}% ({isProfit ? '수익 상태 (상승)' : isLoss ? '손실 상태 (하락)' : '본전'})
                </span>
              </div>
            </div>

            {/* 7 Output Scoreboard Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 text-xs">
              {/* Item 2 */}
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">② 총매수금액 (원금)</span>
                <span className="text-base font-mono font-black text-slate-200 mt-0.5 block">{formatWon(totalInvested)}</span>
                <span className="text-[10px] text-slate-500">189,900원 × 10주</span>
              </div>

              {/* Item 3 */}
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">③ 현재 평가금액</span>
                <span className="text-base font-mono font-black text-white mt-0.5 block">{formatWon(currentTotalValue)}</span>
                <span className="text-[10px] text-slate-500">{formatWon(currentPrice)} × 10주</span>
              </div>

              {/* Item 4 */}
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">④ 평가손익 (시세차익)</span>
                <span className={`text-base font-mono font-black mt-0.5 block ${isProfit ? 'text-rose-400' : isLoss ? 'text-blue-400' : 'text-slate-300'}`}>
                  {capitalGain >= 0 ? '+' : ''}{formatWon(capitalGain)}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isProfit ? '상승 평가이익' : isLoss ? '하락 평가손실' : '변동 없음'}
                </span>
              </div>

              {/* Item 6 */}
              <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">⑥ 배당금 가정액 (10주)</span>
                <span className="text-base font-mono font-black text-emerald-400 mt-0.5 block">+{formatWon(totalDividends)}</span>
                <span className="text-[10px] text-slate-500">주당 1,668원 가정</span>
              </div>
            </div>

            {/* Big Card: Item 7 — Total Net Return including Dividend */}
            <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 font-bold block">
                  ⑦ 배당금을 포함한 총손익 (평가손익 + 배당금 가정액 합산)
                </span>
                <div className={`text-2xl sm:text-3xl font-black font-mono mt-0.5 ${isTotalProfit ? 'text-rose-400' : 'text-blue-400'}`}>
                  {netTotalReturn >= 0 ? '+' : ''}{formatWon(netTotalReturn)}
                  <span className="text-xs font-bold ml-2">
                    ({isTotalProfit ? '최종 순이익 [상승]' : '최종 순손실 [하락]'})
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-bold block">최종 회수 가능 총액</span>
                <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                  {formatWon(currentTotalValue + totalDividends)}
                </div>
              </div>
            </div>

            {/* 1-4. 교사용 4대 발문 아코디언 */}
            <div className="mt-3 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>1-4. 교사용 탐구 질문 4문항 (질문 → 학생 예상 → 시뮬레이터 조작 → 해설):</span>
              </span>

              <div className="grid grid-cols-2 gap-1.5">
                {TEACHER_QUESTIONS.map((q) => {
                  const isOpened = activeQuestionId === q.id;
                  const isRevealed = !!questionRevealed[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-2 rounded-xl border text-xs transition-all ${
                        isOpened ? 'bg-slate-800 border-amber-400/80 ring-1 ring-amber-400/30' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <button
                        onClick={() => setActiveQuestionId(isOpened ? null : q.id)}
                        className="w-full text-left font-bold text-slate-200 flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">Q{q.id}. {q.question}</span>
                        <span className="text-[10px] text-amber-300 ml-1 shrink-0">{isOpened ? '▲' : '▼'}</span>
                      </button>

                      {isOpened && (
                        <div className="mt-2 pt-2 border-t border-slate-700 space-y-1.5 text-[11px] animate-fade-in">
                          <div className="p-1.5 bg-slate-900 rounded-lg text-slate-300">
                            <span className="text-amber-300 font-bold block">[학생 예상 답변]:</span>
                            {q.studentExpected}
                          </div>

                          {!isRevealed ? (
                            <button
                              onClick={() => setQuestionRevealed((prev) => ({ ...prev, [q.id]: true }))}
                              className="w-full py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-xs cursor-pointer shadow-xs"
                            >
                              교사용 정답 & 해설 공개 ▶
                            </button>
                          ) : (
                            <div className="p-1.5 bg-emerald-950/60 border border-emerald-500/50 rounded-lg space-y-1 animate-fade-in">
                              <strong className="text-emerald-300 font-bold block">✓ {q.revealedAnswer}</strong>
                              <p className="text-slate-300 leading-tight">{q.insight}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Principle Loss Warning */}
          <div className="mt-2.5 p-2.5 bg-rose-950/70 border border-rose-500/60 rounded-xl flex items-start gap-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[11px] leading-tight text-slate-300">
              <strong className="text-rose-200 font-bold">⚠️ 주식의 원금 손실 위험 명시:</strong>
              <span> 주식은 예금자보호법 대상이 아니며, 기업 실적 악화나 시장 충격 시 원금 전액 손실이 발생할 수 있는 고위험·고수익 직접 투자 상품입니다.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 학습 핵심:</span>
          <span>주식은 <strong>시세차익(평가손익)</strong>과 <strong>배당금</strong>의 두 가지 원천이 결합된 자산이며, 배당을 받아도 주가가 하락하면 전체 손실이 될 수 있습니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400 font-mono">High Risk, High Return</span>
      </div>
    </div>
  );
};
