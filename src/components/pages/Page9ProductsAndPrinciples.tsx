import React, { useState, useEffect } from 'react';
import { FinancialProductInfo } from '../../types';
import { ChevronRight } from 'lucide-react';

interface Page9Props {
  resetSignal: number;
}

type Step9 = 'step1' | 'step2' | 'step3';

const PRODUCTS: FinancialProductInfo[] = [
  { id: '1', name: '정기예금', category: '저축성', safety: '매우 높음', profitability: '낮음', liquidity: '보통', purpose: '목돈을 일정 기간 안전하게 묶어두고 약정 이자를 수령', features: '예금자보호 1억 원, 원금 보장' },
  { id: '2', name: '정기적금', category: '저축성', safety: '매우 높음', profitability: '낮음', liquidity: '보통', purpose: '매달 일정 금액을 꾸준히 부어 목돈을 만드는 대표 저축', features: '종잣돈 마련의 기본, 원금 보장' },
  { id: '3', name: '주식', category: '투자성', safety: '낮음', profitability: '매우 높음', liquidity: '매우 높음', purpose: '기업의 지분을 소유하여 시세 차익과 배당금 획득 추구', features: '원금 손실 가능, 변동성 큼' },
  { id: '4', name: '채권', category: '투자성', safety: '높음', profitability: '보통', liquidity: '높음', purpose: '정부나 기업에 돈을 빌려주고 정기적 이자와 원금 상환 받음', features: '국채는 안전성 높음, 회사채는 신용위험' },
  { id: '5', name: '펀드', category: '투자성', safety: '보통', profitability: '높음', liquidity: '높음', purpose: '전문 운용사가 여러 주식·채권에 분산 투자', features: '간접 투자, 분산 효과, 수수료 발생' },
  { id: '6', name: '보험', category: '보장성', safety: '매우 높음', profitability: '낮음', liquidity: '낮음', purpose: '질병, 상해, 사망 등 미래의 돌발 위험을 보장받음', features: '저축 목적이 아닌 위험 대비 안전망' },
  { id: '7', name: '연금', category: '저축성', safety: '높음', profitability: '보통', liquidity: '낮음', purpose: '은퇴 후 노후 생활비를 매달 정기적으로 지급받는 상품', features: '국민·퇴직·개인연금, 장기 유지 필수' },
];

export const Page9ProductsAndPrinciples: React.FC<Page9Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step9>('step1');
  const [selectedProduct, setSelectedProduct] = useState<FinancialProductInfo>(PRODUCTS[0]);
  const [discussionStage, setDiscussionStage] = useState<number>(1);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedProduct(PRODUCTS[0]);
    setDiscussionStage(1);
  }, [resetSignal]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 9</span>
            <span aria-hidden="true">·</span>
            <span>자산 관리의 기준과 금융상품 선택</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            금융상품과 자산 관리의 3대 원칙
          </h2>
        </div>

        <nav
          aria-label="금융상품과 원칙 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 3대 원칙' },
            { id: 'step2' as const, label: 'STEP 2. 7대 금융상품' },
            { id: 'step3' as const, label: 'STEP 3. 등록금 토론' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black transition-all cursor-pointer whitespace-nowrap ${
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

      {/* ================= STEP 1. 자산 관리 3대 원칙 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-4">
            <div>
              <div className="text-4xl mb-4">🛡️</div>
              <span className="text-[20px] font-black text-blue-700 block">원칙 1</span>
              <h3 className="text-[32px] font-black text-slate-900 mt-1 mb-4">안전성 (Safety)</h3>
              <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                원금 손실의 위험이 얼마나 낮은가? 내 돈을 잃지 않고 지킬 수 있는 정도입니다.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 text-[20px] font-black text-blue-900">
              대표 상품: 정기예금, 정기적금, 국공채
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 flex flex-col justify-between gap-4">
            <div>
              <div className="text-4xl mb-4">📈</div>
              <span className="text-[20px] font-black text-amber-700 block">원칙 2</span>
              <h3 className="text-[32px] font-black text-slate-900 mt-1 mb-4">수익성 (Profitability)</h3>
              <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                투입한 자금에 비해 얼마나 많은 이익과 높은 수익률을 기대할 수 있는가?
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-5 text-[20px] font-black text-amber-900">
              대표 상품: 주식, 성장형 주식 펀드
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 flex flex-col justify-between gap-4">
            <div>
              <div className="text-4xl mb-4">💧</div>
              <span className="text-[20px] font-black text-emerald-700 block">원칙 3</span>
              <h3 className="text-[32px] font-black text-slate-900 mt-1 mb-4">유동성 · 환금성</h3>
              <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                현금이 필요할 때 큰 손실 없이 얼마나 쉽고 빠르게 돈으로 바꿀 수 있는가?
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 text-[20px] font-black text-emerald-900">
              대표 상품: 보통예금, 상장 주식
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 7대 금융상품 비교 ================= */}
      {activeStep === 'step2' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedProduct(prod)}
                className={`min-h-[64px] px-4 rounded-2xl text-[22px] font-black cursor-pointer transition-all ${
                  selectedProduct.id === prod.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {prod.name}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-700">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-[20px]">
                  {selectedProduct.category}
                </span>
                <h3 className="text-[36px] xl:text-[42px] font-black text-white">
                  {selectedProduct.name}
                </h3>
              </div>
              <span className="text-[22px] font-bold text-emerald-300">
                {selectedProduct.features}
              </span>
            </div>

            <p className="text-[28px] xl:text-[32px] font-bold text-slate-100 leading-relaxed">
              {selectedProduct.purpose}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
                <span className="text-[20px] font-bold text-slate-400 block mb-2">안전성</span>
                <span className="text-[32px] font-black text-blue-300">{selectedProduct.safety}</span>
              </div>
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
                <span className="text-[20px] font-bold text-slate-400 block mb-2">수익성</span>
                <span className="text-[32px] font-black text-amber-300">{selectedProduct.profitability}</span>
              </div>
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
                <span className="text-[20px] font-bold text-slate-400 block mb-2">유동성(환금성)</span>
                <span className="text-[32px] font-black text-emerald-300">{selectedProduct.liquidity}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3. 등록금 투자 토론 ================= */}
      {activeStep === 'step3' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-700">
            <div>
              <span className="text-[20px] font-black text-amber-300 block mb-1">
                상황 질문 토론 (1단계 → 3단계 순차 공개)
              </span>
              <h3 className="text-[28px] xl:text-[34px] font-black text-white leading-snug">
                &ldquo;1년 뒤 꼭 필요한 대학교 등록금 500만 원을 주식에 전부 투자해도 괜찮을까요?&rdquo;
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setDiscussionStage((prev) => (prev >= 3 ? 1 : prev + 1))}
              className="min-h-[64px] px-7 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-[22px] flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>
                {discussionStage < 3 ? `${discussionStage + 1}단계 해설 보기` : '1단계로 돌아가기'}
              </span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            <div
              className={`p-7 rounded-3xl border-2 flex flex-col justify-between gap-3 transition-all ${
                discussionStage >= 1 ? 'bg-slate-800 border-amber-400' : 'bg-slate-800/30 border-slate-700 opacity-40'
              }`}
            >
              <span className="text-[24px] font-black text-amber-300">1단계: 학생들의 예상 의견</span>
              <p className="text-[22px] font-semibold text-slate-100 leading-relaxed">
                &ldquo;주가가 30% 폭락하면 등록금을 못 내서 휴학해야 해요!&rdquo; vs &ldquo;오르면 용돈도 남지 않나요?&rdquo;
              </p>
            </div>

            <div
              className={`p-7 rounded-3xl border-2 flex flex-col justify-between gap-3 transition-all ${
                discussionStage >= 2 ? 'bg-slate-800 border-blue-400' : 'bg-slate-800/30 border-slate-700 opacity-40'
              }`}
            >
              <span className="text-[24px] font-black text-blue-300">2단계: 자금 성격 분석</span>
              <p className="text-[22px] font-semibold text-slate-100 leading-relaxed">
                등록금은 1년 뒤라는 <strong>기한이 정해진 필수 자금</strong>입니다. 주가 회복을 기다릴 여유가 없으므로 <strong>안전성</strong>이 최우선입니다.
              </p>
            </div>

            <div
              className={`p-7 rounded-3xl border-2 flex flex-col justify-between gap-3 transition-all ${
                discussionStage >= 3 ? 'bg-emerald-950 border-emerald-400' : 'bg-slate-800/30 border-slate-700 opacity-40'
              }`}
            >
              <span className="text-[24px] font-black text-emerald-300">3단계: 교사 핵심 결론</span>
              <p className="text-[22px] font-semibold text-white leading-relaxed">
                원금이 100% 보장되는 <strong>1년제 정기예금·적금</strong>이 정답입니다. 주식 투자는 장기 여유자금으로 해야 합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
