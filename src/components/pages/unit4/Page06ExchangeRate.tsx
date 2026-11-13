import React, { useState, useEffect } from 'react';
import { Globe, ArrowLeftRight, Plane, ShoppingBag, Coins } from 'lucide-react';
import { calculateExchangeConversion, formatWon } from '../../../utils/finance';

interface Page06Props {
  resetSignal: number;
}

type Step6Tab = 'concept' | 'simulator';
type FxScenario = 'travel' | 'overseasShop' | 'fxAsset';

const SCENARIOS: Record<
  FxScenario,
  { label: string; title: string; defaultUsd: number; impactUp: string; impactDown: string }
> = {
  travel: {
    label: '해외여행 · 어학연수',
    title: '미국 여행 경비 1,000달러 환전',
    defaultUsd: 1000,
    impactUp: '환율이 오르면 똑같은 여행·학비에 더 많은 원화가 필요해 부담이 커집니다.',
    impactDown: '환율이 내리면 더 적은 원화로 1,000달러를 바꿀 수 있어 여행 경비가 줄어듭니다.',
  },
  overseasShop: {
    label: '해외 직구 · 수입 물품',
    title: '해외 직구 전자기기 500달러 결제',
    defaultUsd: 500,
    impactUp: '수입품 가격과 해외 직구 결제 원화 금액이 올라 소비자 부담이 커집니다.',
    impactDown: '수입 물가와 해외 직구 원화 결제 부담이 내려갑니다.',
  },
  fxAsset: {
    label: '달러 · 해외 자산 보유',
    title: '보유 중인 2,000달러 자산의 원화 환산 가치',
    defaultUsd: 2000,
    impactUp: '환율이 오르면 보유 달러·미국 자산의 원화 환산 가치가 올라갑니다(환차익 가능).',
    impactDown: '환율이 내리면 외화 자산의 달러 가격은 같아도 원화 환산 금액은 줄어듭니다(환차손 위험).',
  },
};

export const Page06ExchangeRate: React.FC<Page06Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step6Tab>('concept');
  const [scenario, setScenario] = useState<FxScenario>('travel');
  const [usdAmount, setUsdAmount] = useState<number>(1000);
  const [rateKrw, setRateKrw] = useState<number>(1350);

  useEffect(() => {
    setActiveStep('concept');
    setScenario('travel');
    setUsdAmount(1000);
    setRateKrw(1350);
  }, [resetSignal]);

  const conversion = calculateExchangeConversion(usdAmount, rateKrw, 1300);
  const activeScen = SCENARIOS[scenario];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 6</span>
            <span aria-hidden="true">·</span>
            <span>환율 변동과 글로벌 금융</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            환율 상승·하락은 내 돈에 어떤 영향을 줄까?
          </h2>
        </div>

        <nav
          aria-label="환율 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 'concept' as const, label: 'STEP 1. 환율 상승과 원화 가치' },
            { id: 'simulator' as const, label: 'STEP 2. 환전 · 자산 영향 시뮬레이터' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStep(tab.id)}
              className={`min-h-[52px] px-4 py-2 rounded-xl text-[18px] font-black transition-all cursor-pointer whitespace-nowrap ${
                activeStep === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeStep === 'concept' ? (
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          <div className="bg-slate-900 text-white rounded-3xl p-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[20px] font-black text-amber-300 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                환율(Exchange Rate)의 정확한 뜻
              </div>
              <p className="text-[24px] font-black mt-1">
                우리 돈(원화)과 외국 돈(달러 등)의 교환 비율 — 보통 &ldquo;1달러를 사는 데 필요한 원화 가격&rdquo;으로 표시합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[28px] font-black text-rose-950">환율 상승 (예: 1,200원 → 1,450원)</span>
                <span className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-black text-[18px]">
                  원화 가치 하락
                </span>
              </div>
              <p className="text-[21px] font-bold text-slate-800 leading-relaxed">
                똑같은 1달러를 바꾸기 위해 원화를 250원 더 내야 하므로,{' '}
                <span className="text-rose-800 font-black">달러 가치는 오르고 원화 가치는 떨어집니다.</span>
              </p>
              <div className="bg-white rounded-2xl p-4 border border-rose-200 space-y-2 text-[19px] font-bold">
                <div className="text-rose-800">• 불리해지는 쪽: 해외여행객, 유학생, 해외 직구, 수입 기업</div>
                <div className="text-emerald-800">• 유리해지는 쪽: 수출 기업, 외화(달러) 예금·해외자산 보유자</div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[28px] font-black text-blue-950">환율 하락 (예: 1,450원 → 1,200원)</span>
                <span className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-black text-[18px]">
                  원화 가치 상승
                </span>
              </div>
              <p className="text-[21px] font-bold text-slate-800 leading-relaxed">
                1달러를 더 적은 원화로 살 수 있으므로,{' '}
                <span className="text-blue-800 font-black">원화의 힘이 강해지고 달러 가치는 내려갑니다.</span>
              </p>
              <div className="bg-white rounded-2xl p-4 border border-blue-200 space-y-2 text-[19px] font-bold">
                <div className="text-emerald-800">• 유리해지는 쪽: 해외여행객, 해외 직구 소비자, 수입 물가 안정</div>
                <div className="text-rose-800">• 주의할 점: 달러 자산 보유 시 원화 환산 금액 감소(환차손)</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-[20px] font-black text-amber-950 flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-amber-700 shrink-0" />
            <span>
              핵심 암기 금지 포인트: 숫자가 올라간다고 원화가 세지는 것이 아니라, &ldquo;1달러의 원화 가격이 비싸졌으니 원화 가치는 하락!&rdquo;으로 이해하세요.
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
          {/* Left: Scenario & Sliders */}
          <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div className="space-y-4">
              <div className="text-[20px] font-black text-slate-900">1. 활동 상황 선택</div>
              <div className="grid grid-cols-1 gap-2.5">
                {(
                  [
                    { id: 'travel' as const, icon: Plane },
                    { id: 'overseasShop' as const, icon: ShoppingBag },
                    { id: 'fxAsset' as const, icon: Coins },
                  ] as const
                ).map(({ id, icon: Icon }) => {
                  const cfg = SCENARIOS[id];
                  const active = scenario === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setScenario(id);
                        setUsdAmount(cfg.defaultUsd);
                      }}
                      className={`min-h-[54px] px-4 py-2.5 rounded-xl flex items-center gap-3 font-black text-[19px] cursor-pointer border-2 transition-all ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{cfg.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 space-y-4">
                <div>
                  <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                    <label htmlFor="u4-p6-usd">달러 금액 (USD)</label>
                    <span className="font-mono text-blue-700">${usdAmount.toLocaleString('ko-KR')}</span>
                  </div>
                  <input
                    id="u4-p6-usd"
                    type="range"
                    min={100}
                    max={5000}
                    step={100}
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(Number(e.target.value))}
                    className="w-full h-3 accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                    <label htmlFor="u4-p6-fx">원/달러 환율 (기준 1,300원 대비)</label>
                    <span className="font-mono text-amber-700">{rateKrw.toLocaleString('ko-KR')}원</span>
                  </div>
                  <input
                    id="u4-p6-fx"
                    type="range"
                    min={1100}
                    max={1600}
                    step={50}
                    value={rateKrw}
                    onChange={(e) => setRateKrw(Number(e.target.value))}
                    className="w-full h-3 accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {[1150, 1300, 1500].map((presetFx) => (
                <button
                  key={presetFx}
                  type="button"
                  onClick={() => setRateKrw(presetFx)}
                  className={`flex-1 min-h-[46px] rounded-xl font-black text-[18px] cursor-pointer ${
                    rateKrw === presetFx
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {presetFx.toLocaleString('ko-KR')}원
                </button>
              ))}
            </div>
          </div>

          {/* Right: Impact Output */}
          <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div>
              <div className="text-[20px] font-black text-amber-700">{activeScen.title}</div>
              <div className="flex flex-wrap items-baseline gap-4 mt-2">
                <span className="font-mono text-[44px] font-black text-slate-900 tabular-nums">
                  {formatWon(conversion.krwAmount)}
                </span>
                <span
                  className={`px-4 py-1.5 rounded-xl font-mono text-[20px] font-black ${
                    conversion.krwValueStatus === 'weaker'
                      ? 'bg-rose-100 text-rose-800'
                      : conversion.krwValueStatus === 'stronger'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  기준(1,300원) 대비{' '}
                  {conversion.differenceKrw >= 0
                    ? `+${formatWon(conversion.differenceKrw)}`
                    : formatWon(conversion.differenceKrw)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="text-[19px] font-bold text-slate-600">현재 원화 가치 상태</div>
                <div className="text-[26px] font-black text-slate-900 mt-1">
                  {conversion.krwValueStatus === 'weaker'
                    ? '환율 상승 · 원화 가치 하락'
                    : conversion.krwValueStatus === 'stronger'
                    ? '환율 하락 · 원화 가치 상승'
                    : '기준 환율 (1,300원/달러)'}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="text-[19px] font-bold text-slate-600">기준 시점(1,300원) 원화 금액</div>
                <div className="font-mono text-[28px] font-black text-slate-800 mt-1">
                  {formatWon(conversion.baselineKrwAmount)}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2">
              <div className="text-[20px] font-black text-amber-300">상황별 경제적 영향 해석</div>
              <p className="text-[20px] font-bold text-slate-100 leading-relaxed">
                {conversion.krwValueStatus === 'stronger' ? activeScen.impactDown : activeScen.impactUp}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
