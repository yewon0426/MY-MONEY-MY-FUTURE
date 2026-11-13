import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Users,
  Factory,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react';

interface Page5Props {
  resetSignal: number;
}

type FinanceStep = 'step1' | 'step2';

export const Page5WhatIsFinance: React.FC<Page5Props> = ({ resetSignal }) => {
  const [activeTab, setActiveTab] = useState<FinanceStep>('step1');
  const [flowStep, setFlowStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [flowMode, setFlowMode] = useState<'both' | 'money' | 'interest'>('both');

  useEffect(() => {
    setActiveTab('step1');
    setFlowStep(1);
    setIsPlaying(true);
    setFlowMode('both');
  }, [resetSignal]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFlowStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 5</span>
            <span aria-hidden="true">·</span>
            <span>금융(金融)의 본질과 자금 순환</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            &ldquo;금융(金融)이란 무엇일까?&rdquo;
          </h2>
        </div>

        <nav
          aria-label="금융의 개념 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 자금 순환 다이어그램' },
            { id: 'step2' as const, label: 'STEP 2. 금융의 의미와 역할' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
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

      {/* ================= STEP 1. 자금 순환 다이어그램 ================= */}
      {activeTab === 'step1' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 flex-1 flex flex-col justify-between gap-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setFlowMode('both')}
                className={`min-h-[56px] px-5 rounded-2xl text-[20px] font-black cursor-pointer ${
                  flowMode === 'both' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                전체 순환 보기
              </button>
              <button
                type="button"
                onClick={() => setFlowMode('money')}
                className={`min-h-[56px] px-5 rounded-2xl text-[20px] font-black cursor-pointer ${
                  flowMode === 'money' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ① 자금(돈)의 이동
              </button>
              <button
                type="button"
                onClick={() => setFlowMode('interest')}
                className={`min-h-[56px] px-5 rounded-2xl text-[20px] font-black cursor-pointer ${
                  flowMode === 'interest' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ② 이자(수익)의 이동
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => {
                    setFlowStep(step);
                    setIsPlaying(false);
                  }}
                  className={`min-h-[56px] px-4 rounded-2xl font-black text-[20px] cursor-pointer ${
                    flowStep === step
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {step}단계
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? '자동 재생 일시정지' : '자동 재생'}
                className="min-h-[56px] min-w-[56px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFlowStep(1);
                  setIsPlaying(false);
                }}
                aria-label="처음 단계로"
                className="min-h-[56px] min-w-[56px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center cursor-pointer"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* 3 Interactive Pillar Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <button
              type="button"
              onClick={() => {
                setFlowStep(1);
                setIsPlaying(false);
              }}
              className={`rounded-3xl p-7 border-2 text-left cursor-pointer flex flex-col justify-between gap-4 transition-all ${
                flowStep === 1 || flowStep === 4
                  ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Users className="w-9 h-9" />
                </div>
                <span className="text-[19px] font-black text-blue-700">자금 공급자</span>
                <h3 className="text-[30px] font-black text-slate-900 mt-1">학생 · 가계 (예금자)</h3>
                <p className="text-[22px] font-medium text-slate-700 mt-2 leading-relaxed">
                  소득 중 쓰고 남은 여유 자금을 안전하게 보관하고 불리고자 함.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between text-[20px] font-black">
                <span className="text-blue-700">① 저축 제공</span>
                <span className="text-emerald-700">④ 이자 수령</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setFlowStep(2);
                setIsPlaying(false);
              }}
              className={`rounded-3xl p-7 border-2 text-left cursor-pointer flex flex-col justify-between gap-4 transition-all ${
                flowStep === 2
                  ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <Building2 className="w-9 h-9" />
                </div>
                <span className="text-[19px] font-black text-indigo-700">금융 중개기관</span>
                <h3 className="text-[30px] font-black text-slate-900 mt-1">은행 (금융기관)</h3>
                <p className="text-[22px] font-medium text-slate-700 mt-2 leading-relaxed">
                  예금자의 돈을 모아 신용을 바탕으로 필요한 기업·개인에게 중개함.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between text-[20px] font-black">
                <span className="text-indigo-700">자금 중개</span>
                <span className="text-slate-700">예대마진</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setFlowStep(3);
                setIsPlaying(false);
              }}
              className={`rounded-3xl p-7 border-2 text-left cursor-pointer flex flex-col justify-between gap-4 transition-all ${
                flowStep === 3
                  ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Factory className="w-9 h-9" />
                </div>
                <span className="text-[19px] font-black text-emerald-700">자금 수요자</span>
                <h3 className="text-[30px] font-black text-slate-900 mt-1">기업 · 대출자</h3>
                <p className="text-[22px] font-medium text-slate-700 mt-2 leading-relaxed">
                  공장을 짓고 연구개발을 하거나 주택을 구입하기 위해 큰 자금이 필요함.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between text-[20px] font-black">
                <span className="text-blue-700">② 대출금 활용</span>
                <span className="text-emerald-700">③ 대출 이자</span>
              </div>
            </button>
          </div>

          {/* Dynamic Step Explanation */}
          <div className="bg-slate-900 text-white rounded-3xl p-7 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-1.5 rounded-xl bg-emerald-400 text-slate-950 font-black text-[20px]">
                현재 단계: {flowStep} / 4
              </span>
              <h4 className="text-[26px] xl:text-[30px] font-black text-white">
                {flowStep === 1 && '1단계: 학생과 가계가 여유 자금을 은행에 저축(예금)합니다.'}
                {flowStep === 2 && '2단계: 은행이 모인 자금을 공장과 기술 개발이 필요한 기업에 대출해 줍니다.'}
                {flowStep === 3 && '3단계: 기업은 사업으로 이익을 내고 대출 이자와 원금을 은행에 갚습니다.'}
                {flowStep === 4 && '4단계: 은행은 받은 이자 중 약정된 예금 이자를 예금자에게 지급합니다.'}
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[20px] font-bold text-slate-200 pt-2 border-t border-slate-800">
              {(flowMode === 'both' || flowMode === 'money') && (
                <span className="flex items-center gap-2 text-blue-300">
                  <ArrowRight className="w-5 h-5" />
                  자금(돈)의 이동: 가계 → 은행 → 기업
                </span>
              )}
              {(flowMode === 'both' || flowMode === 'interest') && (
                <span className="flex items-center gap-2 text-emerald-300">
                  <ArrowLeft className="w-5 h-5" />
                  이자·수익의 이동: 기업 → 은행 → 가계
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 금융의 의미와 역할 ================= */}
      {activeTab === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4">
            <span className="text-[20px] font-black text-emerald-400 block">
              금융(Finance, 金融)의 정확한 뜻
            </span>
            <h3 className="text-[32px] xl:text-[38px] font-black text-white leading-snug">
              자금이 필요한 사람과 여유 자금을 가진 사람 사이에서
              <span className="text-amber-300"> 돈이 융통(融通)되는 모든 경제 활동</span>입니다.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[22px] font-black text-blue-700 block mb-2">역할 01</span>
                <h4 className="text-[30px] font-black text-slate-900 mb-3">
                  경제의 혈액순환
                </h4>
                <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                  우리 몸에 피가 돌아야 건강하듯, 돈이 서랍 속에 잠자지 않고 필요한 기업과 가정으로 흘러가야 경제가 살아납니다.
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5 text-[22px] font-bold text-blue-950">
                청년의 창업 자금, 기업의 R&amp;D 투자, 일자리 창출로 이어집니다.
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[22px] font-black text-emerald-700 block mb-2">역할 02</span>
                <h4 className="text-[30px] font-black text-slate-900 mb-3">
                  시간을 넘나드는 소비와 저축
                </h4>
                <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                  지금 남는 돈을 미래로 보내 불리거나(저축·투자), 미래의 소득을 당겨 오늘 집·학비를 해결(대출)할 수 있게 돕습니다.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-5 text-[22px] font-bold text-emerald-950">
                금융 덕분에 개인과 사회 모두 미래를 계획할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
