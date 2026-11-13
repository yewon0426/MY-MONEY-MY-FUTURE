import React, { useState, useEffect } from 'react';
import { Scale, ShieldAlert } from 'lucide-react';

interface Page03Props {
  resetSignal: number;
}

type Step3Tab = 'distinguish' | 'balance';

const EXPENSE_EXAMPLES = [
  { id: 'rent', name: '원룸 월세 · 관리비', type: 'essential' as const },
  { id: 'grocery', name: '식재료 · 기본 식사', type: 'essential' as const },
  { id: 'commute', name: '출퇴근 대중교통비', type: 'essential' as const },
  { id: 'cafe', name: '매일 습관 카페·디저트', type: 'discretionary' as const },
  { id: 'ott', name: '잘 안 보는 OTT 구독 여러 개', type: 'discretionary' as const },
  { id: 'impulse', name: '할인 유혹 충동 쇼핑', type: 'discretionary' as const },
];

export const Page03ConsumptionVsSavings: React.FC<Page03Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step3Tab>('balance');
  const [revealedClassify, setRevealedClassify] = useState<boolean>(false);
  const [discretionaryMan, setDiscretionaryMan] = useState<number>(35);

  useEffect(() => {
    setActiveStep('balance');
    setRevealedClassify(false);
    setDiscretionaryMan(35);
  }, [resetSignal]);

  const monthlyIncomeMan = 250;
  const essentialFixedMan = 135; // 주거+필수식비+교통+통신+보험 예시
  const monthlySavingsMan = Math.max(0, monthlyIncomeMan - essentialFixedMan - discretionaryMan);
  const acc1y = monthlySavingsMan * 12;
  const acc3y = monthlySavingsMan * 36;
  const acc5y = monthlySavingsMan * 60;
  const emergencyTargetMan = 350;
  const monthsToEmergency = monthlySavingsMan > 0 ? Math.ceil(emergencyTargetMan / monthlySavingsMan) : null;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 3</span>
            <span aria-hidden="true">·</span>
            <span>소비 조절과 종잣돈 · 비상자금</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            소비와 저축의 균형 & 비상자금의 힘
          </h2>
        </div>

        <nav
          aria-label="소비와 저축 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 'balance' as const, label: 'STEP 1. 소비-저축 균형 시뮬레이터' },
            { id: 'distinguish' as const, label: 'STEP 2. 필수 소비 vs 선택 소비' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStep(tab.id)}
              className={`min-h-[52px] px-4 py-2 rounded-xl text-[18px] font-black cursor-pointer transition-all whitespace-nowrap ${
                activeStep === tab.id
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeStep === 'distinguish' ? (
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[22px] font-black">
              교실 활동: 아래 6가지 지출 중 줄이기 어려운 &lsquo;필수 소비&rsquo;와 줄일 수 있는 &lsquo;선택 소비&rsquo;를 구별해 봅시다.
            </span>
            <button
              type="button"
              onClick={() => setRevealedClassify((p) => !p)}
              className="min-h-[48px] px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-[18px] cursor-pointer"
            >
              {revealedClassify ? '구분 가리기' : '정답 구분 공개하기'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {EXPENSE_EXAMPLES.map((item) => {
              const isEss = item.type === 'essential';
              return (
                <div
                  key={item.id}
                  className={`rounded-3xl p-6 border-2 flex flex-col justify-between gap-3 ${
                    !revealedClassify
                      ? 'bg-white border-slate-200'
                      : isEss
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-amber-50 border-amber-300'
                  }`}
                >
                  <div className="text-[24px] font-black text-slate-900">{item.name}</div>
                  {revealedClassify ? (
                    <span
                      className={`px-4 py-2 rounded-xl font-black text-[19px] self-start ${
                        isEss ? 'bg-blue-700 text-white' : 'bg-amber-600 text-white'
                      }`}
                    >
                      {isEss ? '필수 소비 (생활 유지 기본)' : '선택 소비 (조절로 저축 확대 가능)'}
                    </span>
                  ) : (
                    <span className="text-[19px] font-bold text-slate-500">
                      학생 답변 후 상단 &lsquo;정답 구분 공개하기&rsquo; 클릭
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
          {/* Left Slider Control */}
          <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div className="space-y-4">
              <div className="text-[22px] font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-6 h-6 text-indigo-700" />
                월 실수령 250만 원 중 소비 수준 조절
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-[19px] font-bold">
                <div className="flex justify-between">
                  <span className="text-slate-600">고정·필수 지출 (월세·식비·교통·보험)</span>
                  <span className="font-mono font-black text-slate-900">{essentialFixedMan}만 원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-800">선택 소비 (여가·쇼핑·외식)</span>
                  <span className="font-mono font-black text-amber-700">{discretionaryMan}만 원</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-[22px]">
                  <span className="text-indigo-900 font-black">매달 저축·투자 가능 금액</span>
                  <span className="font-mono font-black text-indigo-700">{monthlySavingsMan}만 원</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[20px] font-black text-slate-900 mb-2">
                  <label htmlFor="u6-p3-disc">월 선택 소비 금액 조정</label>
                  <span className="font-mono text-amber-700">{discretionaryMan}만 원</span>
                </div>
                <input
                  id="u6-p3-disc"
                  type="range"
                  min={10}
                  max={115}
                  step={5}
                  value={discretionaryMan}
                  onChange={(e) => setDiscretionaryMan(Number(e.target.value))}
                  className="w-full h-3 accent-amber-600 cursor-pointer"
                />
                <div className="flex gap-2 mt-3">
                  {[
                    { label: '절약형 (15만)', v: 15 },
                    { label: '균형형 (35만)', v: 35 },
                    { label: '여가중시 (75만)', v: 75 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setDiscretionaryMan(p.v)}
                      className={`flex-1 min-h-[46px] rounded-xl text-[17px] font-black cursor-pointer ${
                        discretionaryMan === p.v
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[18px] font-bold text-amber-950 leading-relaxed">
                월 생활비의 2~3개월치(약 350만 원) 비상자금을 입출금이 자유로운 통장에 먼저 모아야 돌발 상황에도 적금을 깨지 않습니다.
              </p>
            </div>
          </div>

          {/* Right Cumulative Wealth Bars */}
          <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-[24px] font-black text-slate-900">
                소비 선택에 따른 저축 누적 & 비상자금 달성 속도
              </div>
              <span className="px-4 py-1.5 rounded-xl bg-indigo-100 text-indigo-900 font-black text-[18px]">
                {monthsToEmergency !== null
                  ? `비상금 350만 달성: 약 ${monthsToEmergency}개월 소요`
                  : '저축 여력 없음 (비상금 적립 불가)'}
              </span>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {[
                { label: '1년 뒤 누적 원금 (12개월)', val: acc1y, max: 6300, color: 'bg-blue-500' },
                { label: '3년 뒤 누적 원금 (36개월)', val: acc3y, max: 6300, color: 'bg-indigo-600' },
                { label: '5년 뒤 누적 원금 (60개월)', val: acc5y, max: 6300, color: 'bg-emerald-600' },
              ].map((bar) => (
                <div key={bar.label} className="space-y-1.5">
                  <div className="flex justify-between text-[20px] font-black text-slate-800">
                    <span>{bar.label}</span>
                    <span className="font-mono text-indigo-800">{bar.val.toLocaleString('ko-KR')}만 원</span>
                  </div>
                  <div className="h-9 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${bar.color}`}
                      style={{ width: `${Math.min(100, Math.max(4, (bar.val / bar.max) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-4 text-[19px] font-bold">
              소비를 무조건 줄이는 것보다, 나의 만족도가 높은 항목은 남기고 습관성 지출만 줄여{' '}
              <span className="text-amber-300 font-black">지속 가능한 저축 비율</span>을 찾는 것이 핵심입니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
