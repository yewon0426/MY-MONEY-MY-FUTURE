import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Layers,
  AlertTriangle,
  Zap,
  RotateCcw,
} from 'lucide-react';

interface Page05Props {
  resetSignal: number;
}

export const Page05FundEtf: React.FC<Page05Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<'pooling' | 'basket' | 'etf'>('pooling');
  const [basketState, setBasketState] = useState<'normal' | 'dropped'>('normal');

  useEffect(() => {
    setActiveStep('pooling');
    setBasketState('normal');
  }, [resetSignal]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & Step Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-800">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 5</span>
            <span aria-hidden="true">·</span>
            <span>간접 투자와 분산 투자</span>
          </div>
          <h2 className="text-[38px] xl:text-[44px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            펀드(Fund)와 ETF(상장지수펀드)
          </h2>
        </div>

        <nav className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-2 rounded-2xl shrink-0">
          {[
            { id: 'pooling' as const, label: 'STEP 1. 펀드의 구조' },
            { id: 'basket' as const, label: 'STEP 2. 바구니 분산 실험' },
            { id: 'etf' as const, label: 'STEP 3. ETF와 원금 위험' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStep(tab.id)}
              className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black cursor-pointer whitespace-nowrap ${
                activeStep === tab.id ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* STEP 1: Pooling */}
      {activeStep === 'pooling' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 space-y-6 flex-1 flex flex-col justify-center">
            <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
              펀드(집합투자증권): 여러 사람의 돈을 모아 전문가가 대신 투자
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-7 bg-blue-50 border-2 border-blue-200 rounded-3xl space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
                <span className="text-[20px] font-black text-blue-700 block">1단계 · 자금 모으기</span>
                <h4 className="text-[28px] font-black text-slate-900">수많은 소액 투자자</h4>
                <p className="text-[24px] font-semibold text-slate-700 leading-relaxed">
                  개인이 1만 원·10만 원씩 돈을 모아 거대한 투자 기금을 만듭니다.
                </p>
              </div>

              <div className="p-7 bg-indigo-50 border-2 border-indigo-200 rounded-3xl space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                  <Briefcase className="w-8 h-8" />
                </div>
                <span className="text-[20px] font-black text-indigo-700 block">2단계 · 전문가 운용</span>
                <h4 className="text-[28px] font-black text-slate-900">펀드매니저 (자산운용사)</h4>
                <p className="text-[24px] font-semibold text-slate-700 leading-relaxed">
                  금융 전문가가 시장과 기업을 분석해 최적의 종목 조합을 고릅니다.
                </p>
              </div>

              <div className="p-7 bg-emerald-50 border-2 border-emerald-200 rounded-3xl space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Layers className="w-8 h-8" />
                </div>
                <span className="text-[20px] font-black text-emerald-700 block">3단계 · 분산 및 배분</span>
                <h4 className="text-[28px] font-black text-slate-900">수십~수백 종목 투자</h4>
                <p className="text-[24px] font-semibold text-slate-700 leading-relaxed">
                  주식·채권 등에 나누어 투자한 뒤 실적에 따라 수익을 돌려줍니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 text-[24px] font-bold flex items-center justify-between gap-4">
            <span>직접 투자(내 손으로 주식 1종목 선택) vs 간접 투자(펀드로 전문가에게 맡기기)</span>
            <button
              type="button"
              onClick={() => setActiveStep('basket')}
              className="min-h-[58px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl cursor-pointer shrink-0"
            >
              분산 실험하기 →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Egg Basket Simulation */}
      {activeStep === 'basket' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[20px] font-black text-amber-300 block">투자의 핵심 격언</span>
              <h3 className="text-[32px] xl:text-[36px] font-black text-white">
                &ldquo;계란을 한 바구니에 담지 마라&rdquo;
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setBasketState(basketState === 'normal' ? 'dropped' : 'normal')}
              className={`min-h-[68px] px-8 py-3 rounded-2xl font-black text-[24px] cursor-pointer flex items-center gap-2 ${
                basketState === 'dropped'
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {basketState === 'dropped' ? (
                <>
                  <RotateCcw className="w-6 h-6" />
                  <span>상황 초기화</span>
                </>
              ) : (
                <span>시장 충격 주기 (바구니 떨어뜨리기)</span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 items-stretch">
            <div
              className={`rounded-3xl p-8 border-2 flex flex-col justify-between ${
                basketState === 'dropped'
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[28px] font-black text-rose-300">A. 1개 기업에 전액 집중 투자</h4>
                <span className="text-[22px] font-black text-white">
                  {basketState === 'dropped' ? '전액 손실 (-100%)' : '바구니 1개'}
                </span>
              </div>

              <div className="py-8 text-center space-y-4">
                <div className="text-[64px] leading-none">
                  {basketState === 'dropped' ? '🍳 💥' : '🧺 🥚🥚🥚🥚'}
                </div>
                <p className="text-[26px] font-black text-white">
                  {basketState === 'dropped'
                    ? '한 바구니가 깨져 모든 계란이 파손되었습니다!'
                    : '계란 10개를 한 바구니에 모두 담은 상태'}
                </p>
              </div>

              <p className="text-[22px] font-bold text-slate-300">
                해당 기업이 부도나면 내 자산 전체가 치명적 타격을 입습니다.
              </p>
            </div>

            <div
              className={`rounded-3xl p-8 border-2 flex flex-col justify-between ${
                basketState === 'dropped'
                  ? 'bg-emerald-950/70 border-emerald-400'
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[28px] font-black text-emerald-300">B. 펀드 4개 바구니 분산 투자</h4>
                <span className="text-[22px] font-black text-white">
                  {basketState === 'dropped' ? '75% 안전 보존!' : '바구니 4개'}
                </span>
              </div>

              <div className="py-8 text-center space-y-4">
                <div className="text-[52px] leading-none">
                  {basketState === 'dropped' ? '🍳 + 🧺🥚 + 🧺🥚 + 🧺🥚' : '🧺🥚 + 🧺🥚 + 🧺🥚 + 🧺🥚'}
                </div>
                <p className="text-[26px] font-black text-white">
                  {basketState === 'dropped'
                    ? '1개만 깨지고 나머지 3개 바구니는 무사합니다!'
                    : '주식·채권·해외자산 등 4곳에 나누어 담은 상태'}
                </p>
              </div>

              <p className="text-[22px] font-bold text-emerald-200">
                개별 기업의 위기를 다른 자산의 수익으로 방어할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: ETF & Principal Loss Warning */}
      {activeStep === 'etf' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-600">
                <Zap className="w-9 h-9 shrink-0" />
                <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                  ETF (상장지수펀드)란?
                </h3>
              </div>

              <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                <strong className="text-blue-700">펀드(분산 투자)</strong>를 주식시장에 상장시켜,{' '}
                <strong className="text-emerald-700">주식처럼 실시간으로 간편하게 사고팔 수 있게</strong> 만든 상품입니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[24px] font-black text-blue-900 block">KOSPI 200 ETF</span>
                  <p className="text-[22px] font-semibold text-slate-700">
                    단 1주만 사도 한국 대표 200개 기업에 동시에 투자하는 효과
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[24px] font-black text-emerald-900 block">미국 S&amp;P 500 ETF</span>
                  <p className="text-[22px] font-semibold text-slate-700">
                    애플·마이크로소프트·구글 등 미국 500대 기업에 소액 분산 투자
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 text-[22px] font-bold text-blue-950">
              일반 펀드보다 수수료(운용 보수)가 저렴하고, 스마트폰으로 즉시 매매할 수 있습니다.
            </div>
          </div>

          <div className="lg:col-span-5 bg-rose-950 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-300">
                <AlertTriangle className="w-10 h-10 shrink-0" />
                <h3 className="text-[30px] font-black text-white">반드시 기억할 유의점</h3>
              </div>
              <p className="text-[24px] font-bold text-rose-100 leading-relaxed">
                전문가가 굴려주고 분산 투자를 하더라도, <strong className="text-amber-300">시장 전체가 하락하면 원금 손실이 발생</strong>합니다!
              </p>
              <ul className="space-y-3 text-[22px] font-semibold text-rose-100 bg-rose-900/50 p-6 rounded-2xl border border-rose-700">
                <li>• 예금자보호법 1억 원 보호 대상이 아닙니다.</li>
                <li>• 펀드와 ETF 모두 매년 소정의 운용 보수(수수료)가 차감됩니다.</li>
              </ul>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl text-[22px] font-black text-amber-200">
              질문: &ldquo;분산 투자를 하면 손실 확률이 0%가 될까요?&rdquo; → 아니요! 시장 전체 위기는 남습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
