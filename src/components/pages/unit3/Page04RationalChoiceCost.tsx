import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';

interface Page04Props {
  resetSignal: number;
}

type Step4Tab = 'step1' | 'step2';

export const Page04RationalChoiceCost: React.FC<Page04Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step4Tab>('step1');
  const [selectedChoice, setSelectedChoice] = useState<'deposit' | 'stock'>('deposit');
  const [showTeacherInsight, setShowTeacherInsight] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedChoice('deposit');
    setShowTeacherInsight(false);
  }, [resetSignal]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 4</span>
            <span aria-hidden="true">·</span>
            <span>경제 핵심 원리와 합리적 선택</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            합리적 선택과 기회비용
          </h2>
        </div>

        <nav
          aria-label="기회비용 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 대안 선택 비교' },
            { id: 'step2' as const, label: 'STEP 2. 기회비용 & 해설' },
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

      {/* ================= STEP 1. 대안 선택 비교 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            <button
              type="button"
              onClick={() => setSelectedChoice('deposit')}
              className={`p-7 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                selectedChoice === 'deposit'
                  ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-200 shadow-lg'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                  <span className="font-black text-[28px] text-blue-950 flex items-center gap-2.5">
                    <ShieldCheck className="w-7 h-7 text-blue-600" />
                    대안 A. 정기예금 (연 3.5%)
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-[18px] font-black">
                    안전성 최우선
                  </span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-blue-100">
                  <span className="font-black text-emerald-700 text-[20px] block">① 금전적 편익</span>
                  <span className="text-[22px] font-bold text-slate-900">1년 확정 이자 +35,000원 (원금 보장)</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-blue-100">
                  <span className="font-black text-blue-700 text-[20px] block">② 비용 · 제약</span>
                  <span className="text-[22px] font-bold text-slate-900">1년간 중도 인출 시 약정 이자 손실</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-blue-100">
                  <span className="font-black text-rose-700 text-[20px] block">③ 기회비용 (포기한 가치)</span>
                  <span className="text-[22px] font-bold text-slate-900">주식 상승 시 고수익 기회 포기</span>
                </div>
              </div>
              <span className="text-[22px] font-black text-blue-700">
                {selectedChoice === 'deposit' ? '현재 선택됨 ✓' : '터치하여 선택'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedChoice('stock')}
              className={`p-7 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                selectedChoice === 'stock'
                  ? 'bg-rose-50 border-rose-600 ring-4 ring-rose-200 shadow-lg'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                  <span className="font-black text-[28px] text-rose-950 flex items-center gap-2.5">
                    <TrendingUp className="w-7 h-7 text-rose-600" />
                    대안 B. 주식 투자 (우량주)
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-900 text-[18px] font-black">
                    수익성 추구
                  </span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-rose-100">
                  <span className="font-black text-rose-700 text-[20px] block">① 금전적 편익</span>
                  <span className="text-[22px] font-bold text-slate-900">기업 성장 시 시세차익 + 배당금</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-rose-100">
                  <span className="font-black text-rose-700 text-[20px] block">② 비용 · 위험</span>
                  <span className="text-[22px] font-bold text-slate-900">주가 하락 시 원금 손실 및 불안감</span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-rose-100">
                  <span className="font-black text-blue-700 text-[20px] block">③ 기회비용 (포기한 가치)</span>
                  <span className="text-[22px] font-bold text-slate-900">예금 확정 이자(+35,000원)와 안전성 포기</span>
                </div>
              </div>
              <span className="text-[22px] font-black text-rose-700">
                {selectedChoice === 'stock' ? '현재 선택됨 ✓' : '터치하여 선택'}
              </span>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer"
            >
              <span>선택한 대안의 기회비용 분석 보기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 기회비용 & 해설 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-5 flex-1 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700">
              <h3 className="text-[30px] font-black text-amber-300">
                내가 선택한 &lsquo;{selectedChoice === 'deposit' ? '대안 A 정기예금' : '대안 B 주식'}&rsquo; 기회비용 분석
              </h3>
              <span className="font-mono font-black text-[24px] text-emerald-300">
                순편익 = 편익 − 기회비용
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 bg-slate-800 rounded-3xl border border-slate-700 space-y-3">
                <span className="text-[20px] font-black text-emerald-300 block">선택으로 얻은 편익</span>
                <h4 className="text-[28px] font-black text-white">
                  {selectedChoice === 'deposit'
                    ? '원금 안전성 100% + 확정 이자 3.5만 원'
                    : '기업 성장의 결실 + 고수익 기회'}
                </h4>
                <p className="text-[22px] font-medium text-slate-200 leading-relaxed">
                  {selectedChoice === 'deposit'
                    ? '밤에 편히 잘 수 있는 안정감과 1년 뒤 정확히 1,035,000원을 돌려받는 확실성을 얻었습니다.'
                    : '우량 기업의 주주가 되어 물가 상승을 뛰어넘는 자산 증식의 가능성을 얻었습니다.'}
                </p>
              </div>

              <div className="p-7 bg-slate-800 rounded-3xl border border-slate-700 space-y-3">
                <span className="text-[20px] font-black text-rose-300 block">
                  포기한 대안의 가치 (기회비용)
                </span>
                <h4 className="text-[28px] font-black text-amber-300">
                  {selectedChoice === 'deposit'
                    ? '주식 시장의 높은 성장 잠재력 포기'
                    : '원금 안전 보장과 확정 이자 포기'}
                </h4>
                <p className="text-[22px] font-medium text-slate-200 leading-relaxed">
                  {selectedChoice === 'deposit'
                    ? '주식이 크게 올랐을 때 누렸을 시세차익 기회가 정기예금을 고르면서 치른 대가입니다.'
                    : '손실 걱정 없이 받을 수 있었던 예금 이자 35,000원이 주식을 선택하며 포기한 대가입니다.'}
                </p>
              </div>
            </div>

            {/* Teacher Question Drawer */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <span className="text-[24px] font-black text-white">
                  발문: 주식이 나중에 20% 올랐다면, 정기예금을 고른 선택은 무조건 비합리적일까요?
                </span>
                <button
                  type="button"
                  onClick={() => setShowTeacherInsight(!showTeacherInsight)}
                  className="min-h-[56px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] rounded-xl shrink-0 cursor-pointer"
                >
                  {showTeacherInsight ? '해설 접기' : '핵심 해설 열기'}
                </button>
              </div>
              {showTeacherInsight && (
                <p className="text-[22px] font-bold text-amber-100 leading-relaxed pt-3 border-t border-slate-700">
                  아닙니다! 합리적 선택은 사후 결과만으로 판단하지 않습니다. 선택 당시 주어진 정보·자금 사용 시점·위험 감수 능력을 신중히 따졌다면 그것이 가장 합리적인 선택입니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
