import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import {
  calculateBondCashflow,
  calculateBondTradingResult,
  calculateBondPresentValue,
  generateBondPriceCurve,
  formatWon,
} from '../../../utils/finance';

interface Page04Props {
  resetSignal: number;
}

type BondStep = 'step1' | 'step2' | 'step3' | 'step4';

const BOND_TYPES = [
  { id: 'national', name: '국채', issuer: '대한민국 정부 (기획재정부)', safety: '최고 안전', desc: '국가가 세금·예산·인프라 투자 자금을 빌리기 위해 발행합니다.' },
  { id: 'municipal', name: '지방채', issuer: '서울시·경기도 등 지방자치단체', safety: '매우 안전', desc: '지역 도로, 지하철 건설 등 공공사업 자금을 마련할 때 발행합니다.' },
  { id: 'special', name: '특수채', issuer: '한국전력·한국도로공사 등 공기업', safety: '높은 안전', desc: '특별법에 의해 설립된 공기업이 대규모 시설 투자 시 발행합니다.' },
  { id: 'corporate', name: '회사채', issuer: '삼성전자·일반 주식회사 등 기업', safety: '신용등급별 상이', desc: '기업이 공장 증설·신사업 자금을 모으려고 발행하며, 부도 위험(신용위험)에 따라 금리가 높습니다.' },
] as const;

export const Page04Bond: React.FC<Page04Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<BondStep>('step1');

  // STEP 1: 채권 종류 선택
  const [selectedBondType, setSelectedBondType] = useState<string>('national');

  // STEP 2: 채권 이자수익 실험
  const [faceValue, setFaceValue] = useState<number>(1000000);
  const [couponRate, setCouponRate] = useState<number>(3.0);
  const [maturityYears, setMaturityYears] = useState<number>(3);

  // STEP 3: 채권 매매차익 실험
  const [buyPrice, setBuyPrice] = useState<number>(1000000);
  const [sellPrice, setSellPrice] = useState<number>(1050000);
  const [holdingYears, setHoldingYears] = useState<number>(1);

  // STEP 4: 시장 금리와 채권 가격 역관계
  const [marketRate, setMarketRate] = useState<number>(3.0);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedBondType('national');
    setFaceValue(1000000);
    setCouponRate(3.0);
    setMaturityYears(3);
    setBuyPrice(1000000);
    setSellPrice(1050000);
    setHoldingYears(1);
    setMarketRate(3.0);
  }, [resetSignal]);

  const bondCashflow = calculateBondCashflow(faceValue, couponRate, maturityYears);
  const bondTrading = calculateBondTradingResult(1000000, 3.0, buyPrice, sellPrice, holdingYears);

  // Fixed reference bond in STEP 4: Face 1,000,000, Coupon 3%, Remaining 3 years
  const pvRates = [1, 2, 3, 4, 5, 6, 7];
  const pvCurve = generateBondPriceCurve(1000000, 3.0, 3, pvRates);
  const currentPv = calculateBondPresentValue(1000000, 3.0, marketRate, 3);
  const pvDiff = currentPv - 1000000;

  const activeTypeObj = BOND_TYPES.find((b) => b.id === selectedBondType) || BOND_TYPES[0];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header & 4-STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-800">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 4</span>
            <span aria-hidden="true">·</span>
            <span>약속된 이자와 시장 가격의 원리</span>
          </div>
          <h2 className="text-[34px] xl:text-[40px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            채권(Bond)과 이자 · 금리 시뮬레이터
          </h2>
        </div>

        <nav
          aria-label="채권 학습 단계"
          className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 채권의 이해' },
            { id: 'step2' as const, label: 'STEP 2. 이자수익' },
            { id: 'step3' as const, label: 'STEP 3. 매매차익' },
            { id: 'step4' as const, label: 'STEP 4. 금리와 채권 가격' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[52px] px-3.5 py-2.5 rounded-xl text-[18px] font-black transition-all cursor-pointer whitespace-nowrap ${
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

      {/* ================= STEP 1. 채권의 이해 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-indigo-700">
                <FileText className="w-9 h-9 shrink-0" />
                <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                  채권이란? 돈을 빌리고 써준 차용증서
                </h3>
              </div>

              <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                정부·공공기관·기업이 대규모 자금을 빌리기 위해 발행하는 <strong className="text-indigo-700">공식 빚 문서(채무 증서)</strong>입니다.
              </p>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[22px] font-black text-indigo-800 block">발행자 (돈 빌리는 측)</span>
                  <p className="text-[22px] font-semibold text-slate-700 mt-1">
                    국가·기업이 자금을 조달하고 약속된 이자와 만기 원금을 갚을 의무를 집니다.
                  </p>
                </div>
                <div>
                  <span className="text-[22px] font-black text-emerald-800 block">투자자 (채권자)</span>
                  <p className="text-[22px] font-semibold text-slate-700 mt-1">
                    채권을 사서 돈을 빌려주고, 매년 정해진 이자와 만기 원금을 받을 권리를 가집니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-amber-700 shrink-0 mt-1" />
              <div className="text-[22px] font-bold text-slate-900 leading-snug">
                <strong className="text-amber-950 block mb-1">국공채 vs 회사채 &amp; 신용위험</strong>
                국채·지방채는 국가·지자체가 보증해 안전하지만, <strong className="text-rose-800">회사채</strong>는 발행 기업이 부도날 경우 원금을 못 돌려받을 수 있는 <strong className="text-rose-800">신용위험</strong>이 있어 이자가 더 높습니다.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <h3 className="text-[30px] xl:text-[34px] font-black text-amber-300">
                발행 주체에 따른 채권 4가지
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BOND_TYPES.map((bt) => (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => setSelectedBondType(bt.id)}
                    className={`min-h-[64px] rounded-2xl font-black text-[24px] cursor-pointer transition-all ${
                      selectedBondType === bt.id
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {bt.name}
                  </button>
                ))}
              </div>

              <div className="bg-slate-800 rounded-2xl p-7 border border-slate-700 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-[32px] font-black text-white">{activeTypeObj.name}</h4>
                  <span className="text-[22px] font-black text-emerald-300">{activeTypeObj.safety}</span>
                </div>
                <p className="text-[22px] font-bold text-amber-300">발행 주체: {activeTypeObj.issuer}</p>
                <p className="text-[24px] font-semibold text-slate-200 leading-relaxed">{activeTypeObj.desc}</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-[22px] font-bold text-slate-200">
              주식과의 차이: 주주는 회사 주인(의결권 있음, 배당 불확정), 채권자는 돈 빌려준 사람(의결권 없음, 이자 약정).
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 채권의 이자수익 ================= */}
      {activeStep === 'step2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <h3 className="text-[28px] xl:text-[32px] font-black text-slate-900">
              채권 만기 보유 시 확정 이자 계산
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[24px] font-black text-slate-800 mb-2">
                  <span>액면가 (만기 원금)</span>
                  <span className="font-mono text-indigo-700 tabular-nums">{formatWon(faceValue)}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1000000, 5000000, 10000000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setFaceValue(v)}
                      className={`min-h-[58px] rounded-xl font-black text-[22px] cursor-pointer ${
                        faceValue === v ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {formatWon(v)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[24px] font-black text-slate-800 mb-2">
                  <span>연 표면금리 (쿠폰 이율)</span>
                  <span className="font-mono text-emerald-700 tabular-nums">연 {couponRate.toFixed(1)}%</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {[2.0, 3.0, 4.0, 5.0].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setCouponRate(r)}
                      className={`min-h-[58px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                        couponRate === r ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {r.toFixed(0)}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[24px] font-black text-slate-800 mb-2">
                  <span>만기 기간</span>
                  <span className="font-mono text-blue-700 tabular-nums">{maturityYears}년</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[2, 3, 5].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setMaturityYears(y)}
                      className={`min-h-[58px] rounded-xl font-black text-[22px] cursor-pointer tabular-nums ${
                        maturityYears === y ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {y}년 만기
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200 text-[22px] font-bold text-indigo-950">
              매년 약정 이자를 받고, 마지막 {maturityYears}년 차 만기일에 빌려준 원금 {formatWon(faceValue)}을 돌려받습니다.
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <h3 className="text-[28px] xl:text-[32px] font-black text-amber-300">
              연도별 이자 및 원금 상환 타임라인
            </h3>

            <div className="space-y-3">
              {bondCashflow.schedule.map((row) => (
                <div
                  key={row.year}
                  className={`p-5 rounded-2xl border flex items-center justify-between ${
                    row.principalReturn > 0
                      ? 'bg-emerald-950/70 border-emerald-500'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[24px] font-black text-white block">
                      {row.year}년 차 {row.principalReturn > 0 ? '(만기 상환일)' : '(이자 지급일)'}
                    </span>
                    <span className="text-[20px] font-bold text-slate-300 tabular-nums">
                      이자 {formatWon(row.coupon)} {row.principalReturn > 0 ? `+ 원금 상환 ${formatWon(row.principalReturn)}` : ''}
                    </span>
                  </div>
                  <span className="text-[32px] font-mono font-black text-amber-300 tabular-nums">
                    +{formatWon(row.totalCashflow)}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-[20px] font-bold text-slate-300 block">매년 받는 이자</span>
                <span className="text-[32px] font-mono font-black text-white tabular-nums">
                  {formatWon(bondCashflow.yearlyCoupon)}
                </span>
              </div>
              <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <span className="text-[20px] font-bold text-slate-300 block">총 누적 이자</span>
                <span className="text-[32px] font-mono font-black text-emerald-400 tabular-nums">
                  {formatWon(bondCashflow.totalCoupons)}
                </span>
              </div>
              <div className="bg-emerald-600 p-5 rounded-2xl text-white">
                <span className="text-[20px] font-bold text-emerald-100 block">총 수령 금액</span>
                <span className="text-[32px] font-mono font-black tabular-nums">
                  {formatWon(bondCashflow.totalReceived)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3. 채권의 매매차익 ================= */}
      {activeStep === 'step3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                중도 매매 시 발생하는 채권 매매차익
              </h3>
              <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                채권은 만기까지 기다리지 않고 시장에서 중간에 사고팔 수 있습니다. 이때{' '}
                <strong className="text-rose-700">산 가격과 판 가격의 차이(매매차익)</strong>가 추가 수익(또는 손실)이 됩니다.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[24px] font-black text-slate-800 mb-2">
                  <span>매수 가격 (산 가격)</span>
                  <span className="font-mono text-blue-700 tabular-nums">{formatWon(buyPrice)}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[950000, 1000000, 1030000].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setBuyPrice(p)}
                      className={`min-h-[58px] rounded-xl font-black text-[22px] cursor-pointer ${
                        buyPrice === p ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {formatWon(p)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[24px] font-black text-slate-800 mb-2">
                  <span>매도 가격 (판 가격)</span>
                  <span className="font-mono text-rose-700 tabular-nums">{formatWon(sellPrice)}</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {[950000, 1000000, 1050000, 1080000].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSellPrice(p)}
                      className={`min-h-[58px] rounded-xl font-black text-[22px] cursor-pointer ${
                        sellPrice === p ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {formatWon(p)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[24px] font-black text-slate-800 mb-2">
                  <span>보유 기간 (연 3% 이자 기준)</span>
                  <span className="font-mono text-emerald-700 tabular-nums">{holdingYears}년 보유</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {[0, 1, 2, 3].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setHoldingYears(y)}
                      className={`min-h-[58px] rounded-xl font-black text-[22px] cursor-pointer ${
                        holdingYears === y ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {y}년
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <h3 className="text-[28px] xl:text-[32px] font-black text-amber-300">
              채권 중도 매도 총수익 분석 (액면가 100만 · 연 3%)
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[24px] font-black text-white block">1. 매매차익 (판 가격 - 산 가격)</span>
                  <span className="text-[20px] text-slate-300 font-bold">
                    {formatWon(sellPrice)} - {formatWon(buyPrice)}
                  </span>
                </div>
                <span
                  className={`text-[36px] font-mono font-black tabular-nums ${
                    bondTrading.capitalGainWon >= 0 ? 'text-rose-400' : 'text-blue-400'
                  }`}
                >
                  {bondTrading.capitalGainWon >= 0 ? '+' : ''}
                  {formatWon(bondTrading.capitalGainWon)}
                </span>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[24px] font-black text-white block">2. 보유 기간 받은 이자</span>
                  <span className="text-[20px] text-slate-300 font-bold">
                    매년 3만 원 × {holdingYears}년
                  </span>
                </div>
                <span className="text-[36px] font-mono font-black text-emerald-400 tabular-nums">
                  +{formatWon(bondTrading.holdingCouponsWon)}
                </span>
              </div>
            </div>

            <div
              className={`p-7 rounded-2xl border-2 flex items-center justify-between ${
                bondTrading.isProfit
                  ? 'bg-emerald-950/70 border-emerald-400'
                  : 'bg-rose-950/70 border-rose-400'
              }`}
            >
              <div>
                <span className="text-[24px] font-black text-amber-300 block">총 투자 손익 (차익 + 이자)</span>
                <span className="text-[22px] font-bold text-slate-200 tabular-nums">
                  수익률 {bondTrading.returnRatePercent >= 0 ? '+' : ''}
                  {bondTrading.returnRatePercent}%
                </span>
              </div>
              <span className="text-[44px] font-mono font-black text-white tabular-nums">
                {bondTrading.totalReturnWon >= 0 ? '+' : ''}
                {formatWon(bondTrading.totalReturnWon)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4. 금리와 채권 가격 ================= */}
      {activeStep === 'step4' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
          {/* Left: Large Linear Rate-vs-Price SVG Graph */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 flex flex-col justify-between gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-[28px] xl:text-[32px] font-black text-slate-900">
                  시장 금리 변화에 따른 채권 가격 곡선
                </h3>
                <p className="text-[20px] xl:text-[22px] font-bold text-slate-600">
                  기준 채권: 액면가 100만 원 · 표면금리 연 3.0% · 잔존만기 3년
                </p>
              </div>
            </div>

            <svg viewBox="0 0 820 310" className="w-full h-[255px] overflow-visible">
              {(() => {
                const minP = 880000;
                const maxP = 1070000;
                const getX = (rate: number) => 120 + ((rate - 1) / 6) * 650;
                const getY = (price: number) => 245 - ((price - minP) / (maxP - minP)) * 195;

                const curvePoints = pvCurve.map((pt) => `${getX(pt.ratePercent)},${getY(pt.bondPriceWon)}`).join(' ');
                const activeX = getX(marketRate);
                const activeY = getY(currentPv);

                return (
                  <>
                    {[900000, 950000, 1000000, 1050000].map((tick) => {
                      const y = getY(tick);
                      return (
                        <g key={tick}>
                          <line
                            x1={110}
                            y1={y}
                            x2={790}
                            y2={y}
                            stroke={tick === 1000000 ? '#94a3b8' : '#e2e8f0'}
                            strokeWidth={tick === 1000000 ? 3 : 2}
                            strokeDasharray={tick === 1000000 ? '8 6' : undefined}
                          />
                          <text x={100} y={y + 7} textAnchor="end" fontSize={20} fontWeight={800} fill="#475569">
                            {(tick / 10000).toFixed(0)}만
                          </text>
                        </g>
                      );
                    })}

                    <polyline fill="none" stroke="#4f46e5" strokeWidth={6} points={curvePoints} />

                    {pvCurve.map((pt) => {
                      const x = getX(pt.ratePercent);
                      const y = getY(pt.bondPriceWon);
                      const isSelected = Math.abs(pt.ratePercent - marketRate) < 0.05;
                      return (
                        <g key={pt.ratePercent}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? 13 : 8}
                            fill={isSelected ? '#e11d48' : '#4f46e5'}
                            stroke="#fff"
                            strokeWidth={3}
                          />
                          <text x={x} y={288} textAnchor="middle" fontSize={21} fontWeight={800} fill="#1e293b">
                            {pt.ratePercent}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Active Market Rate Callout */}
                    <circle cx={activeX} cy={activeY} r={14} fill="#e11d48" stroke="#fff" strokeWidth={4} />
                    <text
                      x={activeX}
                      y={activeY - 22}
                      textAnchor="middle"
                      fontSize={22}
                      fontWeight={900}
                      fill="#be123c"
                    >
                      {formatWon(currentPv)}
                    </text>
                  </>
                );
              })()}
            </svg>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-[22px] font-black text-indigo-950 flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-blue-800">
                <TrendingUp className="w-6 h-6" /> 시장 금리 ↑ → 기존 채권 가격 ↓
              </span>
              <span className="flex items-center gap-2 text-rose-700">
                <TrendingDown className="w-6 h-6" /> 시장 금리 ↓ → 기존 채권 가격 ↑
              </span>
            </div>
          </div>

          {/* Right: Rate Control & Inverse Explanation */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[22px] font-black text-amber-300">현재 시장 금리 조절</span>
                <span className="text-[34px] font-mono font-black text-white tabular-nums">
                  연 {marketRate.toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMarketRate((r) => Math.max(1.0, Math.round((r - 1.0) * 10) / 10))}
                  className="min-h-[54px] flex-1 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[22px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Minus className="w-6 h-6" />
                  <span>금리 1% 인하</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMarketRate((r) => Math.min(7.0, Math.round((r + 1.0) * 10) / 10))}
                  className="min-h-[54px] flex-1 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-[22px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-6 h-6" />
                  <span>금리 1% 인상</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 7].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMarketRate(r)}
                    className={`min-h-[50px] rounded-xl font-black text-[20px] cursor-pointer tabular-nums ${
                      marketRate === r ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>

              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-1.5">
                <span className="text-[20px] font-bold text-slate-300 block">현재 내 3% 채권의 시장 가격</span>
                <div className="text-[38px] font-mono font-black text-white tabular-nums">
                  {formatWon(currentPv)}
                </div>
                <span
                  className={`text-[22px] font-black block tabular-nums ${
                    pvDiff > 0 ? 'text-emerald-400' : pvDiff < 0 ? 'text-rose-400' : 'text-amber-300'
                  }`}
                >
                  액면가 대비 {pvDiff > 0 ? '▲ +' : pvDiff < 0 ? '▼ ' : ''}
                  {formatWon(pvDiff)}
                </span>
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 text-[20px] font-bold text-slate-200 leading-relaxed flex items-start gap-3">
              <CheckCircle2 className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" />
              <div>
                {marketRate > 3
                  ? `새 채권이 연 ${marketRate}%를 주는데 기존 채권은 연 3%만 주므로, 할인된 가격(${formatWon(currentPv)})에 팔아야 거래됩니다.`
                  : marketRate < 3
                  ? `새 채권이 연 ${marketRate}%밖에 안 주는데 기존 채권은 연 3%를 주므로, 웃돈이 붙어 비싼 가격(${formatWon(currentPv)})에 거래됩니다.`
                  : '시장 금리와 채권 표면금리가 연 3%로 같아서 채권 가격이 액면가(100만 원) 그대로 유지됩니다.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
