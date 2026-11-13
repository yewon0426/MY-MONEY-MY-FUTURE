import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Page01Props {
  resetSignal: number;
}

type Step1Tab = 'step1' | 'step2';

interface ProductOption {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  safety: string;
  returnRate: string;
  liquidity: string;
}

const PRODUCTS: ProductOption[] = [
  {
    id: 'demand',
    name: '보통예금',
    category: '수시입출금',
    icon: '💳',
    description: '언제든지 수수료 없이 찾을 수 있는 통장. 급여 이체와 체크카드 결제에 최적.',
    safety: '최상 (예금자보호 1억 원)',
    returnRate: '매우 낮음 (연 0.1~1%)',
    liquidity: '최상 (언제든 인출)',
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
  },
  {
    id: 'stock',
    name: '주식 (Stock)',
    category: '직접 투자',
    icon: '📈',
    description: '기업의 지분을 사서 주주가 됨. 주가 상승 시 시세차익과 배당금을 기대.',
    safety: '낮음 (원금 손실 가능)',
    returnRate: '고수익 추구 가능',
    liquidity: '높음 (영업일 실시간 매매)',
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
  },
  {
    id: 'fund',
    name: '펀드 / ETF',
    category: '간접 분산투자',
    icon: '🧺',
    description: '다수 투자자의 돈을 모아 전문가가 주식·채권 여러 종목에 분산 투자.',
    safety: '중간 (원금 손실 가능)',
    returnRate: '실적 배당 (시장 연동)',
    liquidity: 'ETF(최상) / 펀드(보통)',
  },
];

interface Condition {
  id: 'A' | 'B' | 'C';
  title: string;
  desc: string;
  bestFitId: string;
  fitReason: string;
}

const CONDITIONS: Condition[] = [
  {
    id: 'A',
    title: '상황 A · 2개월 뒤 반드시 사용할 돈',
    desc: '방학 여행 경비, 학비 납부금 등 원금이 보존되어야 하며 곧바로 찾아 써야 하는 자금.',
    bestFitId: 'demand',
    fitReason: '2개월 뒤 즉시 사용해야 하므로 유동성이 최고이고 원금 손실이 없는 보통예금(파킹통장)이 가장 적합합니다. 주식에 넣으면 폭락 시 여행을 갈 수 없습니다.',
  },
  {
    id: 'B',
    title: '상황 B · 5년 이상 쓰지 않을 여유자금',
    desc: '성인이 된 후 독립 종잣돈. 단기 가격 변동을 견딜 수 있고 장기 자산 증식을 희망함.',
    bestFitId: 'fund',
    fitReason: '5년 이상 장기 투자가 가능하므로 단기 등락 위험을 견디며 인플레이션을 이기는 펀드/ETF나 우량 주식에 분산 투자하는 것이 유리합니다.',
  },
  {
    id: 'C',
    title: '상황 C · 원금 손실을 절대 감당하기 어려운 돈',
    desc: '아르바이트로 힘들게 모은 첫 종잣돈. 절대 손실이 나면 안 되는 안전 최우선 자금.',
    bestFitId: 'time',
    fitReason: '원금 손실을 전혀 원하지 않으므로 예금자보호법(1억 원 한도)이 적용되는 정기예금이나 국가 보증 국채가 가장 적합합니다.',
  },
];

export const Page01WhereToPut: React.FC<Page01Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step1Tab>('step1');
  const [selectedProductId, setSelectedProductId] = useState<string>('time');
  const [activeConditionId, setActiveConditionId] = useState<'A' | 'B' | 'C'>('A');
  const [showCoreMessage, setShowCoreMessage] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedProductId('time');
    setActiveConditionId('A');
    setShowCoreMessage(false);
  }, [resetSignal]);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const activeCondition = CONDITIONS.find((c) => c.id === activeConditionId) || CONDITIONS[0];
  const recommendedProduct = PRODUCTS.find((p) => p.id === activeCondition.bestFitId) || PRODUCTS[0];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 1</span>
            <span aria-hidden="true">·</span>
            <span>합리적 의사결정의 첫걸음</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            &ldquo;100만 원, 어디에 둘까?&rdquo;
          </h2>
        </div>

        <nav
          aria-label="100만 원 배분 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 5가지 선택지 탐색' },
            { id: 'step2' as const, label: 'STEP 2. 상황 조건별 맞춤 선택' },
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

      {/* ================= STEP 1. 5가지 선택지 탐색 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-7 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h3 className="text-[28px] xl:text-[32px] font-black text-white">
                &ldquo;여러분에게 지금 100만 원이 생겼습니다. 이 돈을 어디에 두겠습니까?&rdquo;
              </h3>
              <button
                type="button"
                onClick={() => setShowCoreMessage(!showCoreMessage)}
                className="min-h-[56px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] rounded-2xl flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>{showCoreMessage ? '핵심 통찰 접기' : '핵심 통찰 열기'}</span>
              </button>
            </div>

            {showCoreMessage && (
              <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 text-[22px] font-bold text-amber-100 leading-relaxed">
                무조건 좋은 1등 상품은 없습니다.{' '}
                <strong className="text-white underline decoration-amber-400">
                  자신의 자금 목적, 사용 시점, 위험 감수 능력
                </strong>
                에 맞는 상품을 고르는 것이 합리적인 자산 관리입니다.
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {PRODUCTS.map((p) => {
              const isSelected = selectedProductId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProductId(p.id)}
                  className={`min-h-[150px] p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-200'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{p.icon}</span>
                    <span
                      className={`text-[18px] font-black px-3 py-1 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.category}
                    </span>
                  </div>
                  <h4 className="font-black text-[26px] mt-3">{p.name}</h4>
                </button>
              );
            })}
          </div>

          {/* Focused Selected Product Detail */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 flex-1 flex flex-col justify-between gap-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedProduct.icon}</span>
                <div>
                  <span className="text-[19px] font-black text-indigo-700 block">{selectedProduct.category}</span>
                  <h3 className="text-[34px] font-black text-slate-900">{selectedProduct.name}</h3>
                </div>
              </div>
              <span
                className={`px-5 py-2 rounded-2xl text-[20px] font-black ${
                  selectedProduct.safety.includes('예금자보호')
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                {selectedProduct.safety.includes('예금자보호') ? '원금 100% 안전 (1억 한도)' : '원금 손실 가능'}
              </span>
            </div>

            <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl">
                <span className="text-[19px] font-black text-blue-700 block">안전성</span>
                <strong className="text-[24px] font-black text-slate-900 block mt-1">{selectedProduct.safety}</strong>
              </div>
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-[19px] font-black text-emerald-700 block">수익성</span>
                <strong className="text-[24px] font-black text-slate-900 block mt-1">{selectedProduct.returnRate}</strong>
              </div>
              <div className="p-5 bg-purple-50 border border-purple-200 rounded-2xl">
                <span className="text-[19px] font-black text-purple-700 block">유동성</span>
                <strong className="text-[24px] font-black text-slate-900 block mt-1">{selectedProduct.liquidity}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 상황 조건별 맞춤 선택 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONDITIONS.map((cond) => {
              const isSelected = activeConditionId === cond.id;
              return (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setActiveConditionId(cond.id)}
                  className={`min-h-[96px] p-6 rounded-3xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <span className={`text-[19px] font-black block mb-1 ${isSelected ? 'text-amber-300' : 'text-indigo-700'}`}>
                    상황 {cond.id}
                  </span>
                  <span className="text-[24px] font-black block leading-snug">
                    {cond.title.replace(`상황 ${cond.id} · `, '')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-[20px] inline-block">
                {activeCondition.title}
              </span>
              <p className="text-[28px] xl:text-[32px] font-black text-white leading-relaxed">
                {activeCondition.desc}
              </p>
            </div>

            <div className="bg-slate-800 rounded-3xl p-7 border-2 border-emerald-500/60 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-emerald-300 font-black text-[28px]">
                <CheckCircle2 className="w-8 h-8 shrink-0" />
                <span>가장 알맞은 추천 상품: {recommendedProduct.icon} {recommendedProduct.name}</span>
              </div>
              <p className="text-[24px] font-medium text-slate-100 leading-relaxed">
                {activeCondition.fitReason}
              </p>
            </div>

            <div className="flex items-center justify-between text-[22px] font-bold text-slate-300 pt-2 border-t border-slate-800">
              <span>조건이 바뀌면 내가 고른 금융상품도 달라져야 합리적입니다!</span>
              <button
                type="button"
                onClick={() =>
                  setActiveConditionId(
                    activeConditionId === 'A' ? 'B' : activeConditionId === 'B' ? 'C' : 'A'
                  )
                }
                className="min-h-[56px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl flex items-center gap-2 cursor-pointer"
              >
                <span>다음 상황 보기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
