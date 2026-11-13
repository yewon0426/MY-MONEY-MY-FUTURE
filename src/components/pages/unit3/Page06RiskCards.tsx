import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface Page06Props {
  resetSignal: number;
}

type Step6Tab = 'step1' | 'step2';

interface RiskCardItem {
  id: number;
  shortTitle: string;
  title: string;
  situation: string;
  question: string;
  keyConcepts: string[];
  options: string[];
  correctOptionIndex: number;
  studentExpectedAnswers: string;
  revealedResult: string;
  teacherInsight: string;
  icon: string;
}

const RISK_CARDS: RiskCardItem[] = [
  {
    id: 1,
    shortTitle: '갑작스러운 병원비',
    title: '상황 1 · 갑작스러운 병원비',
    situation: '퇴근길 불의의 사고를 당해 응급실 치료비 80만 원을 오늘 당장 결제해야 합니다.',
    question: '필요한 돈을 오늘 즉시 마련하려면 금융상품의 어떤 특징이 가장 중요할까요?',
    keyConcepts: ['유동성', '비상자금', '실손보험'],
    options: [
      '수익성 (높은 주식 배당)',
      '유동성 (즉시 인출 가능한 보통예금/비상금)',
      '안전성 (10년 만기 국채)',
      '복리 효과 (장기 적금)',
    ],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"당장 오늘 병원에서 이체해야 하니까 바로 뺄 수 있는 통장이 최고예요!"',
    revealedResult: '유동성(환금성)이 가장 중요합니다! 평소 월급 3~6개월 치 비상금(보통예금/파킹통장)이나 실손보험을 준비해야 합니다.',
    teacherInsight: '수익률이 아무리 높은 부동산이나 3년 적금이 있어도 오늘 병원비를 낼 수 없다면 위기에 빠집니다.',
    icon: '🏥',
  },
  {
    id: 2,
    shortTitle: '주식시장 급락',
    title: '상황 2 · 주식시장 급락 (-20%)',
    situation: '10년 뒤 내 집 마련을 목표로 매수한 우량 기업 주식 가격이 경기 불안으로 -20% 하락했습니다.',
    question: '주가가 20% 하락했다는 이유만으로 반드시 지금 즉시 손절 매도해야 할까요?',
    keyConcepts: ['투자 기간', '위험 감수', '분할 매수'],
    options: [
      '무조건 공포에 질려 즉시 전액 매도해야 한다.',
      '당장 쓸 돈이 아니고 기업 가치가 건전하다면, 장기 관점에서 보유하거나 분할 매수를 고려한다.',
      '은행에 가서 주식 손실액을 물어내라고 요구한다.',
      '채권을 발행하여 메꾼다.',
    ],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"무섭긴 하지만 10년 뒤에 쓸 돈이고 회사가 탄탄하다면 기다려야 하지 않을까요?"',
    revealedResult: '즉시 매도할 필요는 없습니다. 장기 투자 자금이고 기업의 본질 가치가 튼튼하다면 회복을 기다릴 수 있습니다.',
    teacherInsight: '단기 자금으로 주식을 사면 폭락 시 버티지 못하고 바닥에서 손절하게 됩니다.',
    icon: '📉',
  },
  {
    id: 3,
    shortTitle: '기업 채무불이행',
    title: '상황 3 · 기업의 채무불이행',
    situation: '연 7% 고금리를 준다고 해서 산 모 건설회사 회사채가 기업 경영 악화로 이자를 지급하지 못하게 되었습니다.',
    question: '채권은 원금과 이자를 약속한 증서이므로 무조건 100% 안전할까요?',
    keyConcepts: ['신용위험', '디폴트', '회사채 vs 국채'],
    options: [
      '국가가 1억 원까지 무조건 대신 갚아주므로 안전하다.',
      '돈을 빌려간 기업이 파산하면 원금과 이자를 못 받을 수 있는 "신용위험"이 존재한다.',
      '채권은 예금과 같으므로 절대 손실이 안 난다.',
      '주식으로 자동 교환되어 2배로 번다.',
    ],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"돈 빌려간 회사가 망하면 돈을 못 돌려받으니까 원금을 잃을 수 있어요!"',
    revealedResult: '아닙니다! 채권에는 "신용위험(부도 위험)"이 있습니다. 국채는 안전하지만 회사채는 기업 파산 시 원금을 잃을 수 있습니다.',
    teacherInsight: '약속을 했더라도 돈을 갚을 기업의 재무 능력이 없으면 원금을 회수할 수 없습니다.',
    icon: '🏢',
  },
  {
    id: 4,
    shortTitle: '단기 등록금 자금',
    title: '상황 4 · 3개월 뒤 등록금',
    situation: '3개월 뒤 대학교에 반드시 납부해야 하는 필수 등록금 350만 원이 있습니다.',
    question: '수익률이 높다는 소문을 듣고 주식이나 가상자산에 투자해도 될까요?',
    keyConcepts: ['안전성', '투자 기간', '목적 자금'],
    options: [
      '대박이 날 수 있으니 고수익 주식에 올인한다.',
      '3개월 뒤 반드시 쓸 필수 자금은 원금 손실이 없는 정기예금이나 보통예금에 두어야 한다.',
      '단기 자금일수록 위험성이 높은 상품에 넣는다.',
      '10년 만기 연금보험에 넣는다.',
    ],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"절대 안 돼요! 3개월 뒤에 -30% 나면 등록금을 못 내잖아요!"',
    revealedResult: '단기 필수 자금은 절대 고위험 상품에 넣으면 안 됩니다. 사용 기한이 짧을수록 "안전성"과 "유동성"이 최우선입니다.',
    teacherInsight: '자금 사용 시점이 가까울수록 원금 보존의 가치가 절대적입니다.',
    icon: '🎓',
  },
  {
    id: 5,
    shortTitle: '물가 상승 위험',
    title: '상황 5 · 인플레이션 (물가 5%)',
    situation: '1년간 은행 정기예금에서 연 3% 이자를 받았지만, 같은 기간 생활 물가가 연 5% 올랐습니다.',
    question: '통장 금액은 늘었는데, 나의 실제 구매력(실질 가치)은 어떻게 되었을까요?',
    keyConcepts: ['명목수익률', '실질수익률', '인플레이션'],
    options: [
      '통장에 돈이 늘었으니 무조건 부자가 되었다.',
      '물가 상승률(5%)이 예금 이자율(3%)보다 높아, 실제 구매력은 오히려 감소했다.',
      '물가와 예금 이자는 전혀 무관하다.',
      '은행이 물가 상승분 2%를 추가로 준다.',
    ],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"돈은 늘었지만 물가가 더 많이 올랐으니 실제로는 살 수 있는 게 줄어든 거 아닌가요?"',
    revealedResult: '실질 구매력은 감소했습니다! [실질수익률 ≈ 명목이자(3%) - 물가상승률(5%) = -2%]입니다.',
    teacherInsight: '안전한 예금만 고집하면 인플레이션에 의해 돈의 실질 가치가 줄어들 위험이 있습니다.',
    icon: '🔥',
  },
];

export const Page06RiskCards: React.FC<Page06Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<Step6Tab>('step1');
  const [selectedCardId, setSelectedCardId] = useState<number>(1);
  const [studentChoice, setStudentChoice] = useState<Record<number, number>>({});
  const [revealedStatus, setRevealedStatus] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveStep('step1');
    setSelectedCardId(1);
    setStudentChoice({});
    setRevealedStatus({});
  }, [resetSignal]);

  const currentCard = RISK_CARDS.find((c) => c.id === selectedCardId) || RISK_CARDS[0];
  const userChoiceIdx = studentChoice[currentCard.id];
  const isRevealed = !!revealedStatus[currentCard.id];

  const handleSelectOption = (optIdx: number) => {
    setStudentChoice((prev) => ({ ...prev, [currentCard.id]: optIdx }));
    setRevealedStatus((prev) => ({ ...prev, [currentCard.id]: true }));
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-rose-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 6</span>
            <span aria-hidden="true">·</span>
            <span>실생활 5대 금융 위험 대응</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            금융상품 위험 상황 카드
          </h2>
        </div>

        <nav
          aria-label="위험 상황 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 위기 상황 & 퀴즈' },
            { id: 'step2' as const, label: 'STEP 2. 반응 & 교사 해설' },
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

      {/* Shared 5 Card Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {RISK_CARDS.map((card) => {
          const isSelected = selectedCardId === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedCardId(card.id)}
              className={`min-h-[76px] px-4 py-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <span className="text-3xl shrink-0">{card.icon}</span>
              <div className="min-w-0">
                <span className={`text-[16px] font-black block ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                  상황 {card.id}
                </span>
                <span className="text-[20px] font-black block truncate">{card.shortTitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= STEP 1. 위기 상황 & 퀴즈 ================= */}
      {activeStep === 'step1' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[24px] font-black text-amber-300 flex items-center gap-2.5">
                <span className="text-3xl">{currentCard.icon}</span>
                <span>{currentCard.title}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {currentCard.keyConcepts.map((kc) => (
                  <span key={kc} className="px-3.5 py-1 bg-slate-800 border border-slate-700 rounded-xl text-[18px] font-black text-slate-200">
                    #{kc}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
              <p className="text-[24px] xl:text-[26px] font-bold text-slate-100 leading-relaxed">
                {currentCard.situation}
              </p>
              <h3 className="text-[28px] xl:text-[32px] font-black text-amber-300 pt-2">
                Q. {currentCard.question}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCard.options.map((opt, idx) => {
              const isChosen = userChoiceIdx === idx;
              const isCorrect = idx === currentCard.correctOptionIndex;

              let optStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
              if (isRevealed) {
                if (isCorrect) {
                  optStyle = 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-400/50';
                } else if (isChosen && !isCorrect) {
                  optStyle = 'bg-rose-800 text-slate-200 border-rose-400';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`min-h-[84px] p-5 rounded-2xl border-2 text-left text-[22px] font-black transition-all cursor-pointer flex items-center gap-3.5 ${optStyle}`}
                >
                  <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
            <span className="text-[20px] font-bold text-slate-300">
              {isRevealed ? '정답이 공개되었습니다! 상세 해설을 확인하세요.' : '보기를 누르면 바로 정답이 공개됩니다.'}
            </span>
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[56px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] rounded-2xl flex items-center gap-2 cursor-pointer"
            >
              <span>예상 반응 &amp; 심화 해설 보기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 학생 반응 & 교사 해설 ================= */}
      {activeStep === 'step2' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          <div className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-300 flex flex-col justify-between gap-4">
            <div>
              <span className="text-[20px] font-black text-amber-800 block mb-2">학생들의 직관적 반응</span>
              <h3 className="text-[28px] font-black text-slate-900 mb-4">{currentCard.shortTitle}</h3>
              <p className="text-[24px] font-bold text-slate-800 leading-relaxed">
                {currentCard.studentExpectedAnswers}
              </p>
            </div>
            <span className="text-[20px] font-black text-amber-800">상식으로 먼저 생각해 보기</span>
          </div>

          <div className="bg-emerald-950 text-white rounded-3xl p-8 border-2 border-emerald-500 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 text-emerald-300 font-black text-[22px] mb-3">
                <CheckCircle2 className="w-7 h-7" />
                <span>올바른 선택과 결과 분석</span>
              </div>
              <p className="text-[24px] font-bold text-white leading-relaxed">
                {currentCard.revealedResult}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-indigo-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 text-indigo-800 font-black text-[22px] mb-3">
                <Sparkles className="w-7 h-7 text-amber-500" />
                <span>교사용 심화 지도 포인트</span>
              </div>
              <p className="text-[24px] font-semibold text-slate-800 leading-relaxed">
                {currentCard.teacherInsight}
              </p>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-4 text-[20px] font-black text-indigo-950">
              비상금 · 보험 · 분산투자 · 투자기간이 4대 방패!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
