import React, { useState } from 'react';
import {
  Wallet,
  Building2,
  TrendingUp,
  FileText,
  PieChart,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page01Props {
  resetSignal: number;
}

interface ProductOption {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  safety: string;
  returnRate: string;
  liquidity: string;
  bgColor: string;
  borderColor: string;
}

const PRODUCTS: ProductOption[] = [
  {
    id: 'demand',
    name: '보통예금 (수시입출금)',
    category: '요구불예금',
    icon: '💳',
    description: '언제든지 수수료 없이 찾을 수 있는 통장. 급여 이체, 체크카드 결제에 최적.',
    safety: '최상 (예금자보호 1억 원)',
    returnRate: '매우 낮음 (연 0.1~1%)',
    liquidity: '최상 (언제든 인출)',
    bgColor: 'bg-blue-50/80',
    borderColor: 'border-blue-300',
  },
  {
    id: 'time',
    name: '정기예금',
    category: '저축성예금',
    icon: '🏦',
    description: '목돈을 일정 기간 묶어두고 약정된 높은 이자를 수령. 중도 해지 시 이자 감소.',
    safety: '최상 (예금자보호 1억 원)',
    returnRate: '안정적 (연 3~4%)',
    liquidity: '낮음 (만기까지 거치)',
    bgColor: 'bg-emerald-50/80',
    borderColor: 'border-emerald-300',
  },
  {
    id: 'stock',
    name: '주식 (Stock)',
    category: '직접 투자',
    icon: '📈',
    description: '기업의 지분을 사서 주주가 됨. 주가 상승 시 시세차익과 배당금 기대.',
    safety: '낮음 (원금 손실 가능, 비보호)',
    returnRate: '고수익 추구 가능',
    liquidity: '높음 (영업일 실시간 매매)',
    bgColor: 'bg-rose-50/80',
    borderColor: 'border-rose-300',
  },
  {
    id: 'bond',
    name: '채권 (Bond)',
    category: '직접 대여',
    icon: '📜',
    description: '정부나 기업에 자금을 빌려주고 약정된 표면이자(쿠폰)와 만기 원금을 수령.',
    safety: '국채(최상) / 회사채(신용위험)',
    returnRate: '중간 (연 3~6%)',
    liquidity: '보통 (유통시장 매매)',
    bgColor: 'bg-indigo-50/80',
    borderColor: 'border-indigo-300',
  },
  {
    id: 'fund',
    name: '펀드 / ETF',
    category: '간접 분산투자',
    icon: '🧺',
    description: '다수 투자자의 돈을 모아 전문가가 주식·채권 수십 종목에 분산 투자.',
    safety: '중간 (원금 손실 가능, 비보호)',
    returnRate: '실적 배당 (시장 연동)',
    liquidity: 'ETF(최상) / 펀드(보통)',
    bgColor: 'bg-purple-50/80',
    borderColor: 'border-purple-300',
  },
];

interface Condition {
  id: 'A' | 'B' | 'C';
  title: string;
  desc: string;
  badgeColor: string;
  bestFitId: string;
  fitReason: string;
}

const CONDITIONS: Condition[] = [
  {
    id: 'A',
    title: '상황 A: 2개월 뒤 반드시 사용할 돈',
    desc: '예: 친구들과의 방학 여행 경비, 학비 납부금. 원금이 보존되어야 하며 곧바로 찾아 써야 함.',
    badgeColor: 'bg-blue-600 text-white',
    bestFitId: 'demand',
    fitReason: '2개월 뒤 즉시 사용해야 하므로 유동성이 최고이고 원금 손실이 없는 보통예금(파킹통장)이 가장 적합합니다. 주식에 넣으면 2개월 뒤 폭락 시 여행을 갈 수 없습니다.',
  },
  {
    id: 'B',
    title: '상황 B: 5년 이상 사용하지 않아도 되는 여유자금',
    desc: '예: 성인이 된 후 독립 종잣돈. 단기적 가격 변동을 견딜 수 있고 장기적인 자산 증식을 희망함.',
    badgeColor: 'bg-purple-600 text-white',
    bestFitId: 'fund',
    fitReason: '5년 이상의 장기 투자가 가능하므로 단기 등락 위험을 견디며 인플레이션을 이기는 펀드/ETF나 우량 주식에 분산 투자하는 것이 수익성 관점에서 유리합니다.',
  },
  {
    id: 'C',
    title: '상황 C: 원금 손실을 조금도 감당하기 어려운 돈',
    desc: '예: 아르바이트로 피땀 흘려 모은 소중한 첫 종잣돈. 절대 손실이 나면 안 되는 안전 최우선 자금.',
    badgeColor: 'bg-emerald-600 text-white',
    bestFitId: 'time',
    fitReason: '원금 손실을 전혀 원하지 않으므로 예금자보호법이 적용되는 정기예금이나 국가가 보증하는 국채가 가장 적합합니다.',
  },
];

export const Page01WhereToPut: React.FC<Page01Props> = ({ resetSignal }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('time');
  const [activeConditionId, setActiveConditionId] = useState<'A' | 'B' | 'C' | null>(null);
  const [showCoreMessage, setShowCoreMessage] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedProductId('time');
    setActiveConditionId(null);
    setShowCoreMessage(false);
  }, [resetSignal]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const activeCondition = CONDITIONS.find((c) => c.id === activeConditionId);

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
          <Wallet className="w-3.5 h-3.5 text-indigo-600" />
          <span>UNIT 03 · 1차시 / 합리적 의사결정의 첫걸음</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "100만 원, 어디에 둘까?"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          내 손에 100만 원이 있을 때, 어떤 금융상품을 골라야 할지 자금의 목적과 상황에 따라 고민해 봅니다.
        </p>
      </div>

      {/* Classroom Starting Question Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-slate-700/80 my-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              Q
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                수업 도입 생각 열기
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                "여러분에게 지금 100만 원이 생겼습니다. 이 돈을 어디에 두겠습니까?"
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCoreMessage(!showCoreMessage)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showCoreMessage ? '핵심 결론 닫기 ▲' : '단원의 핵심 통찰 열기 ▼'}</span>
            </button>
          </div>
        </div>

        {showCoreMessage && (
          <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-amber-200 animate-fade-in p-3 bg-white/10 rounded-xl leading-relaxed">
            <strong className="text-white block font-black text-sm mb-1">
              🎯 UNIT 03의 핵심 대전제:
            </strong>
            "세상에 무조건 좋은 1등 금융상품이 하나로 정해져 있는 것이 아닙니다. <strong>자신의 자금 목적, 사용 시점, 위험 감수 능력</strong>에 딱 맞는 상품을 선택하는 것이 바로 합리적인 자산 관리입니다."
          </div>
        )}
      </div>

      {/* Product Selection Options (5 Cards) */}
      <div className="my-1">
        <span className="text-xs font-bold text-slate-700 block mb-1">
          1단계: 5가지 선택지 중 하나를 눌러 기본 특징을 살펴보세요 (정답은 정해져 있지 않습니다):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRODUCTS.map((p) => {
            const isSelected = selectedProductId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-200'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{p.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.category}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs sm:text-sm leading-tight mt-1">{p.name}</h4>
                </div>
                <div className={`mt-2 pt-2 border-t text-[10px] space-y-0.5 ${isSelected ? 'border-indigo-500/60 text-indigo-100' : 'border-slate-100 text-slate-500'}`}>
                  <div>안전성: {p.safety.split(' ')[0]}</div>
                  <div>수익성: {p.returnRate.split(' ')[0]}</div>
                  <div>유동성: {p.liquidity.split(' ')[0]}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Product Deep Details & Condition Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left Column (5 cols): Selected Product Overview */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedProduct.icon}</span>
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase block">{selectedProduct.category}</span>
                  <h3 className="font-black text-base text-slate-900">{selectedProduct.name}</h3>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400">선택된 상품</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                <span className="text-[10px] text-blue-700 font-bold block">안전성</span>
                <strong className="text-slate-900 text-xs block mt-0.5">{selectedProduct.safety}</strong>
              </div>
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-emerald-700 font-bold block">수익성</span>
                <strong className="text-slate-900 text-xs block mt-0.5">{selectedProduct.returnRate}</strong>
              </div>
              <div className="p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl">
                <span className="text-[10px] text-purple-700 font-bold block">유동성</span>
                <strong className="text-slate-900 text-xs block mt-0.5">{selectedProduct.liquidity}</strong>
              </div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>💡 100만 원 원금 유지 여부:</span>
            <span className="font-bold">{selectedProduct.safety.includes('예금자보호') ? '100% 원금 안전' : '원금 손실 가능'}</span>
          </div>
        </div>

        {/* Right Column (7 cols): 3 Real-Life Conditional Scenarios */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">
                2단계: 상황 조건 추가하기 (조건에 따라 선택이 어떻게 바뀔까?)
              </span>
              <span className="text-[11px] text-slate-400">조건 카드를 클릭해 보세요</span>
            </div>

            {/* Condition Cards */}
            <div className="space-y-2.5 my-2.5">
              {CONDITIONS.map((cond) => {
                const isActive = activeConditionId === cond.id;
                return (
                  <button
                    key={cond.id}
                    onClick={() => setActiveConditionId(isActive ? null : cond.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400/50'
                        : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${cond.badgeColor}`}>
                          {cond.id}
                        </span>
                        {cond.title}
                      </span>
                      <span className="text-xs text-amber-400 font-bold">{isActive ? '접기 ▲' : '자세히 보기 ▼'}</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1">{cond.desc}</p>

                    {isActive && (
                      <div className="mt-2.5 pt-2.5 border-t border-slate-700 text-xs space-y-1.5 animate-fade-in">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>추천 금융상품: {PRODUCTS.find((p) => p.id === cond.bestFitId)?.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/90 p-2 rounded-xl border border-slate-700/80">
                          {cond.fitReason}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
            <span>💡 질문: "조건이 바뀌면 내가 골랐던 금융상품도 바뀌어야 할까요?"</span>
            <span className="text-emerald-400 font-bold">👉 "네, 당연합니다!"</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-indigo-700">💡 합리적 자산 관리의 기본 원리:</span>
          <span>금융상품의 좋고 나쁨은 상품 자체가 아니라, <strong>'내가 그 돈을 언제, 왜 쓸 것인가'</strong>라는 나의 목적에 의해 결정됩니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">목적 부합성(Goal Fit)</span>
      </div>
    </div>
  );
};
