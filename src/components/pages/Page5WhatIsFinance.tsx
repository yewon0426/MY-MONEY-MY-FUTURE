import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  Users,
  Factory,
  RotateCcw,
  Play,
  Pause,
  Coins,
  CheckCircle,
} from 'lucide-react';

interface Page5Props {
  resetSignal: number;
}

export const Page5WhatIsFinance: React.FC<Page5Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [flowMode, setFlowMode] = useState<'both' | 'money' | 'interest'>('both');

  useEffect(() => {
    setActiveStep(1);
    setIsPlaying(true);
    setFlowMode('both');
  }, [resetSignal]);

  // Auto-play timer for presentation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>핵심 개념 탐구 · 자금의 순환 다이어그램</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "금융(金融)이란 무엇일까?"
        </h2>
        <div className="max-w-2xl mx-auto bg-slate-900 text-white rounded-xl px-4 py-2 shadow-sm mt-1">
          <p className="text-sm sm:text-base font-medium text-slate-200">
            <span className="text-emerald-400 font-bold">금융</span>은{' '}
            <strong className="text-white font-extrabold">자금이 필요한 사람</strong>과{' '}
            <strong className="text-white font-extrabold">여유 자금을 가진 사람</strong> 사이에서
            자금이 융통(融通)되는 경제 활동이다.
          </p>
        </div>
      </div>

      {/* Main Visual Flow Stage */}
      <div className="my-3 bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden">
        {/* Flow Mode Filter Tabs & Playback Stepper */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          {/* Flow mode filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">화살표 표시:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFlowMode('both')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  flowMode === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                전체 순환
              </button>
              <button
                onClick={() => setFlowMode('money')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  flowMode === 'money' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ① 자금(돈)의 이동
              </button>
              <button
                onClick={() => setFlowMode('interest')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  flowMode === 'interest' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ② 이자(수익)의 이동
              </button>
            </div>
          </div>

          {/* Stepper & Playback controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => {
                    setActiveStep(step);
                    setIsPlaying(false);
                  }}
                  className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    activeStep === step
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {step}단계
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title={isPlaying ? '자동 재생 일시정지' : '자동 재생'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setActiveStep(1);
                setIsPlaying(false);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="1단계로 되감기"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Pillar Diagram: Students/Households -> Bank -> Enterprises/Borrowers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 items-center relative">
          {/* Pillar 1: Household / Saver */}
          <div
            onClick={() => setActiveStep(1)}
            className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
              activeStep === 1 || activeStep === 4
                ? 'border-blue-500 bg-blue-50/70 shadow-lg ring-4 ring-blue-100'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <Users className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              자금 공급자
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">학생 · 가계 (예금자)</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              용돈이나 소득 중 쓰고 남은 여유 자금을 안전하게 보관하고 불리고자 함.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/60 w-full flex justify-around text-xs font-semibold">
              <span className="text-blue-700">① 저축(예금) 제공</span>
              <span className="text-emerald-700">④ 예금 이자 수령</span>
            </div>
          </div>

          {/* Pillar 2: Financial Intermediary (Bank) */}
          <div
            onClick={() => setActiveStep(2)}
            className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
              activeStep === 2
                ? 'border-indigo-500 bg-indigo-50/70 shadow-lg ring-4 ring-indigo-100'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
              <Building2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              금융 중개기관
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">은행 (금융기관)</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              수많은 예금자의 돈을 모아 신용을 바탕으로 필요한 기업·개인에게 중개함.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/60 w-full flex justify-around text-xs font-semibold">
              <span className="text-indigo-700">자금 중개</span>
              <span className="text-slate-600">예대마진(이익 창출)</span>
            </div>
          </div>

          {/* Pillar 3: Enterprise / Borrower */}
          <div
            onClick={() => setActiveStep(3)}
            className={`rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
              activeStep === 3
                ? 'border-emerald-500 bg-emerald-50/70 shadow-lg ring-4 ring-emerald-100'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Factory className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              자금 수요자
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">기업 · 대출자</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              공장을 짓고 연구개발을 하거나 주택을 구입하기 위해 큰 자금이 필요함.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/60 w-full flex justify-around text-xs font-semibold">
              <span className="text-blue-700">② 대출금 활용</span>
              <span className="text-emerald-700">③ 대출 이자 지급</span>
            </div>
          </div>
        </div>

        {/* Dynamic Step Detail Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs uppercase">
              현재 단계: {activeStep} / 4
            </span>
            <h4 className="text-lg font-bold text-white">
              {activeStep === 1 && '1단계: 학생과 가계가 여유 자금을 은행에 저축합니다.'}
              {activeStep === 2 && '2단계: 은행이 모인 자금을 기업이나 대출자에게 빌려줍니다.'}
              {activeStep === 3 && '3단계: 기업은 자금으로 사업을 운영하고 대출 이자를 은행에 갚습니다.'}
              {activeStep === 4 && '4단계: 은행은 받은 이자 중 약정된 예금 이자를 예금자에게 돌려줍니다.'}
            </h4>
          </div>
          <div className="mt-2 text-xs text-slate-300 flex items-center gap-4">
            <span className="flex items-center gap-1 text-blue-300">
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              <strong>파란색 화살표:</strong> 자금(돈)의 이동 (가계 → 은행 → 기업)
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <strong>초록색 화살표:</strong> 이자 및 수익의 이동 (기업 → 은행 → 가계)
            </span>
          </div>
        </div>
      </div>

      {/* Real-world Takeaway Callout */}
      <div className="text-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-2xl py-3 px-6">
        💡 금융은 단순히 통장을 만드는 일이 아니라, 우리 몸의 혈액순환처럼 돈을 필요한 곳으로 흐르게 하여 국가 경제 전체를 살리는 시스템입니다.
      </div>
    </div>
  );
};
