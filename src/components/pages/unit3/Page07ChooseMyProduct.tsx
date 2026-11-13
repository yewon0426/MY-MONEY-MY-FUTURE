import React, { useState, useEffect } from 'react';
import { CheckCircle2, Info, ShieldCheck, Clock, Coins, ArrowRight } from 'lucide-react';

interface Page07Props {
  resetSignal: number;
}

type Step7Tab = 'step1' | 'step2';

interface StudentPersona {
  id: 'A' | 'B' | 'C';
  name: string;
  avatar: string;
  goal: string;
  timeHorizon: string;
  riskTolerance: string;
  emergencyNeed: string;
  recommendedOptions: string[];
  rationale: string;
  caution: string;
}

const PERSONAS: StudentPersona[] = [
  {
    id: 'A',
    name: '학생 A (민우)',
    avatar: '🎒',
    goal: '6개월 뒤 방학 친구들과 해외여행 경비 120만 원 마련',
    timeHorizon: '단기 (6개월 뒤 즉시 사용)',
    riskTolerance: '원금 손실 절대 불가 (안전 최우선)',
    emergencyNeed: '여행 출발 전 전액 인출 필요',
    recommendedOptions: ['정기적금 (6개월)', '보통예금 (파킹통장)'],
    rationale: '여행 경비는 사용 시점이 매우 가깝고 줄어들어선 안 되므로 예금자보호가 되는 6개월 적금이나 파킹통장이 가장 합리적입니다.',
    caution: '주식에 넣었다가 6개월 뒤 -20% 손실이 나면 비행기 표를 취소해야 합니다.',
  },
  {
    id: 'B',
    name: '학생 B (서연)',
    avatar: '🌱',
    goal: '10년 뒤 독립할 때 쓸 종잣돈 1,000만 원 형성',
    timeHorizon: '초장기 (10년 이상 미사용 가능)',
    riskTolerance: '일정한 손실 위험 감수 가능',
    emergencyNeed: '긴급 인출 불필요 (여유 자금)',
    recommendedOptions: ['주식형 ETF (S&P500 / KOSPI200)', '우량 배당주', '적립식 펀드'],
    rationale: '투자 시계가 10년으로 길어 단기 등락을 이겨낼 수 있습니다. 물가 상승을 이기기 위해 지수 추종 ETF나 펀드에 장기 분산 적립하는 것이 현명합니다.',
    caution: '장기 투자라도 단일 테마주 몰빵은 상장폐지 위험이 있으므로 ETF 등으로 분산해야 합니다.',
  },
  {
    id: 'C',
    name: '학생 C (준호)',
    avatar: '⚡',
    goal: '갑작스러운 자취 생활비 및 비상 지출 대비 100만 원 보관',
    timeHorizon: '수시 (오늘 밤 당장 쓸 수도 있음)',
    riskTolerance: '손실 위험 극도로 기피',
    emergencyNeed: '수시 체크카드 결제·이체 필수',
    recommendedOptions: ['보통예금 (수시입출금)', '파킹통장 (CMA / MMF)'],
    rationale: '오늘 밤이라도 당장 병원비나 생활비 이체가 필요하므로 이자율보다 "언제든 뺄 수 있는 유동성"이 절대적으로 중요합니다.',
    caution: '이자를 조금 더 받겠다고 1년 정기예금에 묶으면 급할 때 해약해 이자를 손해 봅니다.',
  },
];

const AVAILABLE_PRODUCTS = [
  '보통예금 (수시입출금)',
  '정기적금 (6~12개월)',
  '정기예금 (1~3년)',
  '국채 (3년 만기)',
  '주식형 ETF / 펀드',
  '개별 주식 (대형주)',
  '개인연금저축',
  '실손의료보험',
];

export const Page07ChooseMyProduct: React.FC<Page07Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step7Tab>('step1');
  const [activePersonaId, setActivePersonaId] = useState<'A' | 'B' | 'C'>('A');
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string[]>>({});
  const [revealedAnalysis, setRevealedAnalysis] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveStep('step1');
    setActivePersonaId('A');
    setSelectedChoices({});
    setRevealedAnalysis({});
  }, [resetSignal]);

  const currentPersona = PERSONAS.find((p) => p.id === activePersonaId) || PERSONAS[0];
  const userSelected = selectedChoices[currentPersona.id] || [];
  const isRevealed = !!revealedAnalysis[currentPersona.id];

  const handleToggleProduct = (prod: string) => {
    setSelectedChoices((prev) => {
      const current = prev[currentPersona.id] || [];
      if (current.includes(prod)) {
        return { ...prev, [currentPersona.id]: current.filter((p) => p !== prod) };
      }
      return { ...prev, [currentPersona.id]: [...current, prod] };
    });
  };

  const toggleReveal = () => {
    setRevealedAnalysis((prev) => ({
      ...prev,
      [currentPersona.id]: !prev[currentPersona.id],
    }));
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 7</span>
            <span aria-hidden="true">·</span>
            <span>재무 목표와 상황별 맞춤 설계</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            나에게 맞는 금융상품 선택하기
          </h2>
        </div>

        <nav
          aria-label="맞춤 상품 선택 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 학생 사례 & 조건' },
            { id: 'step2' as const, label: 'STEP 2. 상품 선택 & 해설' },
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

      {/* Shared 3 Persona Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PERSONAS.map((p) => {
          const isSelected = activePersonaId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePersonaId(p.id)}
              className={`min-h-[84px] px-6 py-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-4xl">{p.avatar}</span>
                <div>
                  <span className={`text-[18px] font-black block ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    사례 {p.id}
                  </span>
                  <span className="text-[24px] font-black">{p.name}</span>
                </div>
              </div>
              {isSelected && <span className="text-[20px] font-black text-amber-300">선택됨</span>}
            </button>
          );
        })}
      </div>

      {/* ================= STEP 1. 학생 사례 & 조건 ================= */}
      {activeStep === 'step1' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 flex-1 flex flex-col justify-between gap-6">
          <div className="p-7 bg-indigo-50 rounded-3xl border-2 border-indigo-200 space-y-2">
            <span className="text-[20px] font-black text-indigo-700 block">
              {currentPersona.name}의 핵심 재무 목표
            </span>
            <h3 className="text-[32px] xl:text-[38px] font-black text-indigo-950 leading-snug">
              &ldquo;{currentPersona.goal}&rdquo;
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-blue-700 font-black text-[22px]">
                <Clock className="w-6 h-6" />
                <span>사용 예정 시점</span>
              </div>
              <p className="text-[26px] font-black text-slate-900">{currentPersona.timeHorizon}</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700 font-black text-[22px]">
                <ShieldCheck className="w-6 h-6" />
                <span>손실 감수 능력</span>
              </div>
              <p className="text-[26px] font-black text-slate-900">{currentPersona.riskTolerance}</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-700 font-black text-[22px]">
                <Coins className="w-6 h-6" />
                <span>긴급 인출 필요성</span>
              </div>
              <p className="text-[26px] font-black text-slate-900">{currentPersona.emergencyNeed}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <span className="text-[22px] font-bold text-slate-700">
              상황에 따라 복수의 조합(예: 보통예금 30% + 적금 70%)도 훌륭한 선택이 됩니다.
            </span>
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-8 bg-slate-900 hover:bg-slate-800 text-white font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer"
            >
              <span>어울리는 금융상품 고르기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 상품 선택 & 해설 ================= */}
      {activeStep === 'step2' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700">
            <h3 className="text-[28px] font-black text-amber-300">
              {currentPersona.name}에게 알맞은 금융상품을 선택하세요 (복수 선택 가능)
            </h3>
            <button
              type="button"
              onClick={toggleReveal}
              className="min-h-[60px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] rounded-2xl cursor-pointer"
            >
              {isRevealed ? '추천 해설 닫기' : '교사용 추천 해설 보기'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AVAILABLE_PRODUCTS.map((prod) => {
              const isSelected = userSelected.includes(prod);
              return (
                <button
                  key={prod}
                  type="button"
                  onClick={() => handleToggleProduct(prod)}
                  className={`min-h-[88px] p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 ring-4 ring-indigo-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                  }`}
                >
                  <span className="text-[22px] font-black">{prod}</span>
                  {isSelected && <span className="text-[18px] text-amber-300 font-black">선택됨 ✓</span>}
                </button>
              );
            })}
          </div>

          {isRevealed ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-slate-700">
              <div className="p-6 bg-emerald-950 border-2 border-emerald-500 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-[22px]">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>추천 금융상품 및 근거</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPersona.recommendedOptions.map((rec) => (
                    <span key={rec} className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-[20px] font-black">
                      {rec}
                    </span>
                  ))}
                </div>
                <p className="text-[22px] font-medium text-slate-100 leading-relaxed">
                  {currentPersona.rationale}
                </p>
              </div>

              <div className="p-6 bg-rose-950/70 border-2 border-rose-500 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-rose-300 font-black text-[22px]">
                  <Info className="w-6 h-6" />
                  <span>주의할 점 및 피해야 할 선택</span>
                </div>
                <p className="text-[22px] font-medium text-slate-100 leading-relaxed">
                  {currentPersona.caution}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-800/60 rounded-2xl text-center text-[22px] font-bold text-slate-300">
              학생들과 왜 그 상품을 골랐는지 이유를 나눈 뒤 &lsquo;교사용 추천 해설 보기&rsquo;를 눌러 주세요.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
