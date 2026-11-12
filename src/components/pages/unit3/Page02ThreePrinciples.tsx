import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Coins,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';

interface Page02Props {
  resetSignal: number;
}

interface PrincipleDetail {
  id: 'safety' | 'profitability' | 'liquidity';
  name: string;
  nameEn: string;
  definition: string;
  color: string;
  badgeBg: string;
  borderColor: string;
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
    color: 'from-blue-600 to-indigo-700',
    badgeBg: 'bg-blue-100 text-blue-800',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-600',
    icon: '🛡️',
    realLifeExampleTitle: '생활 속 사례: "가까운 시일 내 사용할 대학교 등록금"',
    realLifeExampleDesc: '6개월 뒤 대학에 입학할 때 내야 할 등록금 400만 원은 절대 1원도 잃어버려선 안 됩니다. 주식이나 코인에 넣었다가 등록금을 날리면 입학이 취소되므로 무조건 안전성 최우선인 은행 예적금이나 국채를 선택해야 합니다.',
    representativeProducts: ['보통예금', '정기예금', '정기적금', '국채(국고채)'],
    caution: '안전성이 높을수록 금융기관이 주는 이자(수익률)는 낮아집니다.',
  },
  {
    id: 'profitability',
    name: '수익성',
    nameEn: 'Profitability',
    definition: '투자한 자금으로부터 이자, 배당금, 시세차익 등 금전적 이익을 많이 얻을 수 있는 정도',
    color: 'from-rose-600 to-orange-600',
    badgeBg: 'bg-rose-100 text-rose-800',
    borderColor: 'border-rose-400',
    textColor: 'text-rose-600',
    icon: '📈',
    realLifeExampleTitle: '생활 속 사례: "10년 이상 모으는 미래 내 집 마련 종잣돈"',
    realLifeExampleDesc: '물가는 매년 3~4%씩 뛰는데 은행 금리가 연 2%라면 내 돈의 실질 구매력은 오히려 줄어듭니다. 오랜 시간 동안 물가 상승을 뛰어넘는 자산 증식을 하려면 일정한 원금 손실 위험을 감수하고 수익성이 높은 주식이나 펀드/ETF를 담아야 합니다.',
    representativeProducts: ['개별 주식 (Stock)', '주식형 펀드 / ETF', '회사채'],
    caution: '높은 수익성을 기대할수록 원금 손실의 위험(Risk)도 비례하여 커집니다 (High Risk, High Return).',
  },
  {
    id: 'liquidity',
    name: '유동성 (환금성)',
    nameEn: 'Liquidity',
    definition: '자산을 필요할 때 언제든지 손실 없이 현금으로 쉽게 바꾸어 사용할 수 있는 정도',
    color: 'from-emerald-600 to-teal-700',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-600',
    icon: '💧',
    realLifeExampleTitle: '생활 속 사례: "갑작스러운 교통사고나 응급실 병원비 지출"',
    realLifeExampleDesc: '오늘 밤 갑자기 응급실에 가서 치료비 100만 원을 결제해야 하는데, 돈이 3년 만기 적금이나 부동산(아파트)에만 묶여 있다면 당장 현금으로 결제할 수 없습니다. 따라서 언제든 뺄 수 있는 보통예금(비상금 통장)이 필수적입니다.',
    representativeProducts: ['현금', '보통예금 (수시입출금)', 'MMF / 파킹통장', 'ETF'],
    caution: '부동산이나 만기가 긴 정기예금은 돈이 필요할 때 급하게 팔면 제값을 못 받거나 약정 이자를 손해 봅니다.',
  },
];

export const Page02ThreePrinciples: React.FC<Page02Props> = ({ resetSignal }) => {
  const [selectedPrincipleId, setSelectedPrincipleId] = useState<'safety' | 'profitability' | 'liquidity'>('safety');
  const [showTrilemmaNote, setShowTrilemmaNote] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedPrincipleId('safety');
    setShowTrilemmaNote(false);
  }, [resetSignal]);

  const activePrinciple = PRINCIPLES.find((p) => p.id === selectedPrincipleId) || PRINCIPLES[0];

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 03 · 2차시 / 자산 관리의 황금 삼각형</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "자산 관리의 세 가지 원칙 — 안전성 · 수익성 · 유동성"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          돈을 관리할 때 고려해야 하는 3대 핵심 기준을 이해하고, 실생활 사례와 상충 관계를 알아봅니다.
        </p>
      </div>

      {/* 3 Principles Interactive Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-1">
        {PRINCIPLES.map((p) => {
          const isSelected = selectedPrincipleId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPrincipleId(p.id)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-200'
                  : 'bg-white/80 hover:bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl">{p.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${p.badgeBg}`}>
                    {p.nameEn}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">{p.definition}</p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={p.textColor}>사례 살펴보기</span>
                <span className="text-slate-400">{isSelected ? '선택됨 ●' : '클릭 ▶'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: Triangle Diagram (Left) & Real-Life Deep Case (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left Column (5 cols): Triangle Visualization */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">자산 관리 삼각형 시각화</span>
              <span className="text-[10px] text-slate-400">각 꼭짓점을 터치해 보세요</span>
            </div>

            {/* Triangle Visual Mockup */}
            <div className="relative w-full aspect-4/3 max-h-56 mx-auto flex items-center justify-center p-2">
              <svg viewBox="0 0 300 240" className="w-full h-full max-w-[280px]">
                {/* Connecting Triangle lines */}
                <polygon
                  points="150,25 35,210 265,210"
                  fill="rgba(99, 102, 241, 0.15)"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* Inner center text */}
                <circle cx="150" cy="140" r="30" fill="rgba(15, 23, 42, 0.8)" stroke="#fbbf24" strokeWidth="2" />
                <text x="150" y="136" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">자산관리</text>
                <text x="150" y="149" textAnchor="middle" fill="#ffffff" fontSize="9">3대 원칙</text>

                {/* Vertex 1: Safety (Top) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedPrincipleId('safety')}
                >
                  <circle
                    cx="150"
                    cy="25"
                    r={selectedPrincipleId === 'safety' ? '22' : '18'}
                    fill={selectedPrincipleId === 'safety' ? '#3b82f6' : '#1e293b'}
                    stroke="#60a5fa"
                    strokeWidth="2.5"
                  />
                  <text x="150" y="29" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">안전성</text>
                </g>

                {/* Vertex 2: Profitability (Bottom Right) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedPrincipleId('profitability')}
                >
                  <circle
                    cx="265"
                    cy="210"
                    r={selectedPrincipleId === 'profitability' ? '22' : '18'}
                    fill={selectedPrincipleId === 'profitability' ? '#f43f5e' : '#1e293b'}
                    stroke="#fb7185"
                    strokeWidth="2.5"
                  />
                  <text x="265" y="214" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">수익성</text>
                </g>

                {/* Vertex 3: Liquidity (Bottom Left) */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedPrincipleId('liquidity')}
                >
                  <circle
                    cx="35"
                    cy="210"
                    r={selectedPrincipleId === 'liquidity' ? '22' : '18'}
                    fill={selectedPrincipleId === 'liquidity' ? '#10b981' : '#1e293b'}
                    stroke="#34d399"
                    strokeWidth="2.5"
                  />
                  <text x="35" y="214" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">유동성</text>
                </g>
              </svg>
            </div>

            <p className="text-[11px] text-slate-300 text-center leading-relaxed">
              "세 꼭짓점을 모두 극대화하는 완벽한 단 하나의 금융상품은 존재하지 않습니다."
            </p>
          </div>

          {/* Trilemma Alert Toggle */}
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                "세 마리 토끼(트릴레마)"의 의미
              </span>
              <button
                onClick={() => setShowTrilemmaNote(!showTrilemmaNote)}
                className="text-amber-400 font-bold hover:underline cursor-pointer text-[11px]"
              >
                {showTrilemmaNote ? '접기 ▲' : '주의사항 보기 ▼'}
              </button>
            </div>
            {showTrilemmaNote && (
              <p className="mt-1.5 text-[10px] text-slate-300 leading-relaxed pt-1.5 border-t border-slate-700 animate-fade-in">
                ⚠️ <strong>교과서 중요 유의점:</strong> 세 원칙은 항상 기계적으로 완벽한 반비례 관계인 것만은 아닙니다. 시장 금리, 만기 조건, 경제 상황에 따라 일부 절충이 가능하며 포트폴리오를 통해 균형을 맞춥니다.
              </p>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Selected Principle Deep Case & Representative Products */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activePrinciple.icon}</span>
                <div>
                  <h3 className="font-black text-lg text-slate-900">{activePrinciple.name} 상세 탐구</h3>
                  <span className="text-xs text-slate-500">{activePrinciple.definition}</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${activePrinciple.badgeBg}`}>
                {activePrinciple.nameEn}
              </span>
            </div>

            {/* Real-Life Story Card */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {activePrinciple.realLifeExampleTitle}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activePrinciple.realLifeExampleDesc}
              </p>
            </div>

            {/* Representative Products */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                대표적인 {activePrinciple.name} 우수 금융상품군:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activePrinciple.representativeProducts.map((prod) => (
                  <div
                    key={prod}
                    className="p-2 bg-white rounded-xl border border-slate-200 text-center text-xs font-bold text-slate-800 shadow-2xs"
                  >
                    {prod}
                  </div>
                ))}
              </div>
            </div>

            {/* Caution box */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-0.5">
              <strong className="font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                선택 시 반드시 감수해야 할 대가:
              </strong>
              <p className="text-[11px] text-amber-800">{activePrinciple.caution}</p>
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>자산 관리 = 3가지 원칙 사이의 현명한 균형 찾기</span>
            <span className="font-bold text-indigo-700">Portfolio Balance</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 고1 통합사회 핵심:</span>
          <span>"원금이 안전하면서도, 수익률이 수십 % 나오고, 언제든 뺄 수 있는 만능 금융상품은 존재하지 않는다(사기 주의!)."</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">Trade-off 원리</span>
      </div>
    </div>
  );
};
