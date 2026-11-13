import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, Info, ArrowRight } from 'lucide-react';

interface Page02Props {
  resetSignal: number;
}

type Step2Tab = 'step1' | 'step2';

interface PrincipleDetail {
  id: 'safety' | 'profitability' | 'liquidity';
  name: string;
  nameEn: string;
  definition: string;
  badgeBg: string;
  textColor: string;
  icon: string;
  realLifeExampleTitle: string;
  realLifeExampleDesc: string;
  representativeProducts: string[];
  caution: string;
}

const PRINCIPLES: PrincipleDetail[] = [
  {
    id: 'safety',
    name: '안전성',
    nameEn: 'Safety',
    definition: '투자한 원금이 손실되지 않고 온전하게 회수될 가능성이 높은 정도',
    badgeBg: 'bg-blue-100 text-blue-900',
    textColor: 'text-blue-700',
    icon: '🛡️',
    realLifeExampleTitle: '생활 사례: "가까운 시일 내 사용할 대학교 등록금"',
    realLifeExampleDesc: '6개월 뒤 내야 할 등록금 400만 원은 절대 1원도 잃어버려선 안 됩니다. 주식에 넣었다가 폭락하면 입학이 어려워지므로 무조건 안전성 최우선인 은행 예적금이나 국채를 선택해야 합니다.',
    representativeProducts: ['보통예금', '정기예금', '정기적금', '국채(국고채)'],
    caution: '안전성이 높을수록 금융기관이 주는 이자(수익률)는 낮아지는 경향이 있습니다.',
  },
  {
    id: 'profitability',
    name: '수익성',
    nameEn: 'Profitability',
    definition: '투자한 자금으로부터 이자, 배당금, 시세차익 등 이익을 많이 얻을 수 있는 정도',
    badgeBg: 'bg-rose-100 text-rose-900',
    textColor: 'text-rose-700',
    icon: '📈',
    realLifeExampleTitle: '생활 사례: "10년 이상 모으는 미래 내 집 마련 종잣돈"',
    realLifeExampleDesc: '물가는 매년 오르는데 은행 금리만으로는 실질 구매력이 줄어들 수 있습니다. 오랜 기간 동안 물가 상승을 뛰어넘어 자산을 증식하려면 일정 위험을 감수하고 수익성이 높은 주식·ETF를 담아야 합니다.',
    representativeProducts: ['개별 주식', '주식형 펀드', 'ETF', '회사채'],
    caution: '높은 수익성을 기대할수록 원금 손실의 위험(Risk)도 비례하여 커집니다.',
  },
  {
    id: 'liquidity',
    name: '유동성 (환금성)',
    nameEn: 'Liquidity',
    definition: '자산을 필요할 때 언제든지 큰 손실 없이 현금으로 쉽게 바꿀 수 있는 정도',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    textColor: 'text-emerald-700',
    icon: '💧',
    realLifeExampleTitle: '생활 사례: "갑작스러운 사고나 응급실 병원비 지출"',
    realLifeExampleDesc: '오늘 밤 갑자기 병원비 100만 원을 결제해야 하는데 돈이 장기 적금이나 아파트에만 묶여 있다면 바로 쓸 수 없습니다. 따라서 언제든 뺄 수 있는 보통예금(비상금)이 꼭 필요합니다.',
    representativeProducts: ['현금', '보통예금', '파킹통장 / MMF', '상장 ETF'],
    caution: '부동산이나 만기가 긴 예금은 급히 현금화할 때 제값을 못 받거나 약정 이자를 손해 봅니다.',
  },
];

export const Page02ThreePrinciples: React.FC<Page02Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step2Tab>('step1');
  const [selectedPrincipleId, setSelectedPrincipleId] = useState<'safety' | 'profitability' | 'liquidity'>('safety');
  const [showTrilemmaNote, setShowTrilemmaNote] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedPrincipleId('safety');
    setShowTrilemmaNote(false);
  }, [resetSignal]);

  const activePrinciple = PRINCIPLES.find((p) => p.id === selectedPrincipleId) || PRINCIPLES[0];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 2</span>
            <span aria-hidden="true">·</span>
            <span>자산 관리의 황금 삼각형</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            안전성 · 수익성 · 유동성
          </h2>
        </div>

        <nav
          aria-label="자산 관리 3대 원칙 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 3대 원칙 & 삼각형' },
            { id: 'step2' as const, label: 'STEP 2. 실생활 사례 & 상품' },
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

      {/* ================= STEP 1. 3대 원칙 & 삼각형 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          {/* Left: 3 Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {PRINCIPLES.map((p) => {
              const isSelected = selectedPrincipleId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPrincipleId(p.id)}
                  className={`flex-1 p-6 rounded-3xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-indigo-600 ring-4 ring-indigo-200 shadow-lg'
                      : 'bg-white/90 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <h3 className="text-[28px] font-black text-slate-900">{p.name}</h3>
                      <span className={`text-[18px] font-black px-3 py-0.5 rounded-full ${p.badgeBg}`}>
                        {p.nameEn}
                      </span>
                    </div>
                    <p className="text-[22px] font-medium text-slate-700 leading-snug">
                      {p.definition}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Triangle Visualization */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-5">
            <div className="flex items-center justify-between">
              <span className="text-[26px] font-black text-amber-300">자산 관리 삼각형 (꼭짓점 터치)</span>
              <button
                type="button"
                onClick={() => setActiveStep('step2')}
                className="min-h-[56px] px-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] rounded-2xl flex items-center gap-2 cursor-pointer"
              >
                <span>사례 탐구</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <svg viewBox="0 0 460 320" className="w-full max-w-[460px] mx-auto overflow-visible">
              <polygon
                points="230,48 75,268 385,268"
                fill="rgba(99, 102, 241, 0.18)"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="3"
                strokeDasharray="8 6"
              />
              <circle cx="230" cy="185" r="52" fill="#0f172a" stroke="#fbbf24" strokeWidth="3" />
              <text x="230" y="180" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="900">
                자산관리
              </text>
              <text x="230" y="206" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900">
                3대 원칙
              </text>

              <g className="cursor-pointer" onClick={() => setSelectedPrincipleId('safety')}>
                <circle
                  cx="230"
                  cy="48"
                  r={selectedPrincipleId === 'safety' ? 42 : 34}
                  fill={selectedPrincipleId === 'safety' ? '#2563eb' : '#1e293b'}
                  stroke="#60a5fa"
                  strokeWidth="3"
                />
                <text x="230" y="55" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900">
                  안전성
                </text>
              </g>

              <g className="cursor-pointer" onClick={() => setSelectedPrincipleId('profitability')}>
                <circle
                  cx="385"
                  cy="268"
                  r={selectedPrincipleId === 'profitability' ? 42 : 34}
                  fill={selectedPrincipleId === 'profitability' ? '#e11d48' : '#1e293b'}
                  stroke="#fb7185"
                  strokeWidth="3"
                />
                <text x="385" y="275" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900">
                  수익성
                </text>
              </g>

              <g className="cursor-pointer" onClick={() => setSelectedPrincipleId('liquidity')}>
                <circle
                  cx="75"
                  cy="268"
                  r={selectedPrincipleId === 'liquidity' ? 42 : 34}
                  fill={selectedPrincipleId === 'liquidity' ? '#059669' : '#1e293b'}
                  stroke="#34d399"
                  strokeWidth="3"
                />
                <text x="75" y="275" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900">
                  유동성
                </text>
              </g>
            </svg>

            <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black text-amber-300 flex items-center gap-2 text-[22px]">
                  <AlertTriangle className="w-6 h-6" />
                  세 마리 토끼(상충 관계)의 의미
                </span>
                <button
                  type="button"
                  onClick={() => setShowTrilemmaNote(!showTrilemmaNote)}
                  className="min-h-[48px] px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-[19px] cursor-pointer"
                >
                  {showTrilemmaNote ? '접기' : '주의사항 열기'}
                </button>
              </div>
              {showTrilemmaNote ? (
                <p className="text-[20px] font-medium text-slate-200 leading-relaxed pt-2 border-t border-slate-700">
                  원금이 안전하고, 수익률도 아주 높고, 언제든 뺄 수 있는 만능 상품은 없습니다. 세 원칙이 항상 기계적 반비례인 것은 아니므로 분산 투자로 균형을 맞춥니다.
                </p>
              ) : (
                <p className="text-[20px] font-bold text-slate-300">
                  세 꼭짓점을 모두 극대화하는 단 하나의 완벽한 금융상품은 존재하지 않습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 실생활 사례 & 대표 상품 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-3 gap-4">
            {PRINCIPLES.map((p) => {
              const isSelected = selectedPrincipleId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPrincipleId(p.id)}
                  className={`min-h-[68px] px-6 rounded-2xl border-2 font-black text-[24px] flex items-center justify-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-3xl">{p.icon}</span>
                  <span>{p.name} 사례</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{activePrinciple.icon}</span>
                  <div>
                    <h3 className="text-[34px] font-black text-slate-900">{activePrinciple.name} 상세 탐구</h3>
                    <p className="text-[22px] font-bold text-slate-600">{activePrinciple.definition}</p>
                  </div>
                </div>
                <span className={`px-5 py-2 rounded-full font-black text-[20px] ${activePrinciple.badgeBg}`}>
                  {activePrinciple.nameEn}
                </span>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-black text-[26px] text-slate-900 flex items-center gap-2.5">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  {activePrinciple.realLifeExampleTitle}
                </h4>
                <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                  {activePrinciple.realLifeExampleDesc}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[22px] font-black text-slate-900 block">
                대표적인 {activePrinciple.name} 우수 금융상품
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activePrinciple.representativeProducts.map((prod) => (
                  <div
                    key={prod}
                    className="p-5 bg-slate-900 text-white rounded-2xl text-center text-[22px] font-black"
                  >
                    {prod}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl flex items-center gap-3 text-[22px] font-bold text-amber-950">
              <Info className="w-6 h-6 text-amber-700 shrink-0" />
              <span>선택 시 대가: {activePrinciple.caution}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
