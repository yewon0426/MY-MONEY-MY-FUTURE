import React, { useState, useEffect } from 'react';
import {
  Umbrella,
  HeartPulse,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface Page06Props {
  resetSignal: number;
}

export const Page06InsurancePension: React.FC<Page06Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<'intro' | 'insurance' | 'pension'>('intro');
  const [showIntroAnswer, setShowIntroAnswer] = useState<boolean>(false);
  const [showBeltNote, setShowBeltNote] = useState<boolean>(false);
  const [selectedLayer, setSelectedLayer] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    setActiveStep('intro');
    setShowIntroAnswer(false);
    setShowBeltNote(false);
    setSelectedLayer(2);
  }, [resetSignal]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & Step Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-rose-800">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 6</span>
            <span aria-hidden="true">·</span>
            <span>인생의 위험 대비와 노후 보장</span>
          </div>
          <h2 className="text-[38px] xl:text-[44px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            보험(Insurance)과 연금(Pension)
          </h2>
        </div>

        <nav className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-2 rounded-2xl shrink-0">
          {[
            { id: 'intro' as const, label: 'STEP 1. 생각 열기' },
            { id: 'insurance' as const, label: 'STEP 2. 보험의 원리' },
            { id: 'pension' as const, label: 'STEP 3. 3층 연금 체계' },
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

      {/* STEP 1: Intro Big Question */}
      {activeStep === 'intro' && (
        <div className="bg-slate-900 text-white rounded-3xl p-10 flex-1 flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-amber-300 text-[24px] font-black">
              <Umbrella className="w-8 h-8" />
              <span>생애 위험 관리 질문</span>
            </div>
            <h3 className="text-[34px] xl:text-[42px] font-black text-white leading-snug">
              &ldquo;갑자기 큰 병에 걸려 치료비 3,000만 원이 나오거나, 은퇴해서 월급이 끊기면 어떻게 살아야 할까요?&rdquo;
            </h3>

            <button
              type="button"
              onClick={() => setShowIntroAnswer(!showIntroAnswer)}
              className="min-h-[68px] px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[24px] rounded-2xl cursor-pointer"
            >
              {showIntroAnswer ? '해설 접기' : '핵심 정답 공개하기'}
            </button>

            {showIntroAnswer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-800 border-2 border-rose-400 rounded-3xl p-7 space-y-3">
                  <h4 className="text-[30px] font-black text-rose-300">위험에 대한 방패: 보험</h4>
                  <p className="text-[24px] font-semibold text-slate-200 leading-relaxed">
                    질병·상해·화재 등 불의의 사고 시 목돈의 치료비를 보장받아 가계 파산을 막아줍니다.
                  </p>
                </div>
                <div className="bg-slate-800 border-2 border-emerald-400 rounded-3xl p-7 space-y-3">
                  <h4 className="text-[30px] font-black text-emerald-300">노후의 평생 월급: 연금</h4>
                  <p className="text-[24px] font-semibold text-slate-200 leading-relaxed">
                    은퇴 후 근로소득이 끊겨도 사망할 때까지 매달 생활비가 나오도록 준비하는 제도입니다.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-[22px] font-bold text-slate-300 border-t border-slate-800 pt-5">
            보험은 &lsquo;예상치 못한 사고 위험&rsquo;에, 연금은 &lsquo;오래 사는 장수 위험&rsquo;에 대비합니다.
          </div>
        </div>
      )}

      {/* STEP 2: Insurance */}
      {activeStep === 'insurance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="flex items-center gap-3 text-rose-700">
              <HeartPulse className="w-9 h-9 shrink-0" />
              <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                보험의 원리: 상부상조(품앗이)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 space-y-2">
                <span className="text-[20px] font-black text-blue-700 block">내가 내는 돈</span>
                <h4 className="text-[28px] font-black text-slate-900">보험료 (Premium)</h4>
                <p className="text-[22px] font-semibold text-slate-700">
                  위험 보장을 위해 계약자가 보험회사에 매달 정기적으로 내는 돈
                </p>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 space-y-2">
                <span className="text-[20px] font-black text-emerald-700 block">사고 시 받는 돈</span>
                <h4 className="text-[28px] font-black text-slate-900">보험금 (Benefit)</h4>
                <p className="text-[22px] font-semibold text-slate-700">
                  약정된 질병·사고가 발생했을 때 보험회사로부터 받는 치료·보상금
                </p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 grid grid-cols-3 gap-4 text-center items-center">
              <div>
                <span className="text-[26px] font-black text-blue-800 block">1만 명 가입자</span>
                <span className="text-[20px] font-bold text-slate-600">월 1만 원씩 납부</span>
              </div>
              <div className="bg-amber-100 border border-amber-300 rounded-2xl p-4">
                <span className="text-[26px] font-black text-amber-950 block">1억 원 공동 기금</span>
                <span className="text-[20px] font-bold text-amber-800">위험 준비금</span>
              </div>
              <div>
                <span className="text-[26px] font-black text-rose-700 block">사고 난 1명 지원</span>
                <span className="text-[20px] font-bold text-slate-600">1억 원 치료비 지급</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-amber-300">
                <Sparkles className="w-8 h-8" />
                <h3 className="text-[28px] xl:text-[32px] font-black text-white">
                  &ldquo;안 아프면 보험료가 아까울까요?&rdquo;
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowBeltNote(!showBeltNote)}
                className="min-h-[64px] w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[24px] rounded-2xl cursor-pointer"
              >
                {showBeltNote ? '비유 접기' : '자동차 안전벨트 비유 보기'}
              </button>

              {showBeltNote && (
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-[24px] font-semibold text-slate-200 leading-relaxed">
                  교통사고가 안 났다고 해서 &ldquo;안전벨트 괜히 맸네&rdquo;라고 후회하지 않듯, 보험은 큰 수익을 내는 투자가 아니라 <strong className="text-amber-300">내 삶을 지키는 안전 비용</strong>입니다.
                </div>
              )}
            </div>

            <div className="bg-rose-950/70 border border-rose-500 rounded-2xl p-5 text-[22px] font-bold text-rose-200">
              주의: 보험은 중도 해지 시 돌려받는 해약환급금이 낸 원금보다 적을 수 있습니다.
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: 3-Tier Pension */}
      {activeStep === 'pension' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-5">
            <h3 className="text-[30px] xl:text-[34px] font-black text-emerald-300">
              노후를 지키는 3층 연금 체계
            </h3>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {[
                { layer: 3 as const, title: '3층 · 개인연금 (연금저축·IRP)', sub: '개인이 여유 노후를 위해 자율 가입', color: 'border-amber-400 bg-amber-400/20' },
                { layer: 2 as const, title: '2층 · 퇴직연금 (기업 적립)', sub: '직장 생활 동안 회사가 의무 적립', color: 'border-blue-400 bg-blue-500/25' },
                { layer: 1 as const, title: '1층 · 국민연금 (국가 공적연금)', sub: '국가가 보장하는 기초 생활 연금', color: 'border-emerald-400 bg-emerald-500/25' },
              ].map((item) => (
                <button
                  key={item.layer}
                  type="button"
                  onClick={() => setSelectedLayer(item.layer)}
                  className={`min-h-[84px] w-full p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedLayer === item.layer
                      ? item.color
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[26px] font-black text-white block">{item.title}</span>
                    <span className="text-[20px] font-bold text-slate-300">{item.sub}</span>
                  </div>
                  <CheckCircle2 className={`w-7 h-7 ${selectedLayer === item.layer ? 'text-white' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[22px] font-black text-indigo-700 block">
                선택한 {selectedLayer}층 연금 상세 설명
              </span>
              {selectedLayer === 1 && (
                <>
                  <h4 className="text-[32px] font-black text-emerald-800">1층: 국민연금 (국가 차원)</h4>
                  <p className="text-[26px] font-semibold text-slate-800 leading-relaxed">
                    모든 국민이 의무적으로 가입해 최소한의 노후 생계를 지키는 사회보장제도입니다. 물가 상승률이 반영되어 화폐 가치 하락을 막아주는 장점이 있습니다.
                  </p>
                </>
              )}
              {selectedLayer === 2 && (
                <>
                  <h4 className="text-[32px] font-black text-blue-800">2층: 퇴직연금 (기업 차원)</h4>
                  <p className="text-[26px] font-semibold text-slate-800 leading-relaxed">
                    회사가 근로자의 퇴직금을 외부 금융기관에 쌓아두고, 은퇴 후 일시금이나 매월 연금으로 지급하여 안정적인 중산층 생활을 돕습니다.
                  </p>
                </>
              )}
              {selectedLayer === 3 && (
                <>
                  <h4 className="text-[32px] font-black text-amber-800">3층: 개인연금 (개인 차원)</h4>
                  <p className="text-[26px] font-semibold text-slate-800 leading-relaxed">
                    여행·취미 등 풍요로운 노후를 위해 개인이 자발적으로 가입하는 사적 연금입니다. 연말정산 세액공제 혜택도 받을 수 있습니다.
                  </p>
                </>
              )}
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-[24px] font-black text-emerald-950">
              1층 + 2층 + 3층 연금을 고루 쌓을수록 튼튼한 노후 안전망이 완성됩니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
