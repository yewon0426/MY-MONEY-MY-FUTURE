import React, { useState, useEffect } from 'react';
import { QuizScenario } from '../../types';
import {
  Coins,
  CreditCard,
  PiggyBank,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface Page7Props {
  resetSignal: number;
}

type ConceptsStep = 'step1' | 'step2';

const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 1,
    character: '민수',
    situation: '고깃집에서 주말 아르바이트를 열심히 하고, 월말에 통장으로 80만 원을 입금받았다.',
    correctAnswer: '소득',
    subType: '근로소득',
    explanation: '자신의 노동과 시간을 제공한 대가로 얻은 정당한 돈이므로 "소득(근로소득)"에 해당합니다.',
  },
  {
    id: 2,
    character: '서연',
    situation: '시험이 끝난 후 친구들과 영화관에 가서 영화 티켓을 예매하고 팝콘 세트를 사 먹었다.',
    correctAnswer: '지출',
    subType: '소비지출',
    explanation: '문화생활 서비스와 음식 상품을 구매하기 위해 돈을 대가로 지급했으므로 "지출(소비지출)"에 해당합니다.',
  },
  {
    id: 3,
    character: '지호',
    situation: '부모님께 받은 명절 용돈을 쓰지 않고, 매달 5만 원씩 연 3.5% 금리의 청소년 정기적금 통장에 넣고 있다.',
    correctAnswer: '저축',
    subType: '정기적금',
    explanation: '현재의 소비를 미래로 미루고, 원금을 안전하게 보존하며 정해진 이자를 받기 위해 모아두는 것이므로 "저축"입니다.',
  },
  {
    id: 4,
    character: '유진',
    situation: '미래에 유망할 것이라 기대되는 국내 2차전지 배터리 기업의 주식을 3주 매수하였다.',
    correctAnswer: '투자',
    subType: '주식 투자',
    explanation: '기업의 미래 성장과 높은 시세 차익(배당)을 기대하고 원금 손실 위험을 감수하며 자금을 투입했으므로 "투자"입니다.',
  },
  {
    id: 5,
    character: '현우',
    situation: '등하교를 위해 편의점에서 청소년 교통카드를 3만 원 충전하여 버스와 지하철을 탔다.',
    correctAnswer: '지출',
    subType: '소비지출(교통비)',
    explanation: '이동이라는 필수적인 교통 서비스를 이용하기 위해 대가를 지불했으므로 "지출"에 해당합니다.',
  },
];

export const Page7FourConceptsQuiz: React.FC<Page7Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<ConceptsStep>('step1');
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setCurrentScenarioIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [resetSignal]);

  const currentQuiz = QUIZ_SCENARIOS[currentScenarioIdx];

  const handleSelect = (choice: '소득' | '지출' | '저축' | '투자') => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  const nextQuiz = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentScenarioIdx((prev) => (prev + 1) % QUIZ_SCENARIOS.length);
  };

  const isCorrect = selectedAnswer === currentQuiz.correctAnswer;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-emerald-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 7</span>
            <span aria-hidden="true">·</span>
            <span>경제활동 4대 개념과 실전 퀴즈</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            소득 · 지출 · 저축 · 투자
          </h2>
        </div>

        <nav
          aria-label="4대 개념 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 4대 핵심 개념' },
            { id: 'step2' as const, label: 'STEP 2. 실전 상황 퀴즈' },
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

      {/* ================= STEP 1. 4대 핵심 개념 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-stretch">
            <div className="bg-white rounded-3xl p-7 border-2 border-blue-200 flex flex-col justify-between gap-4">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Coins className="w-9 h-9" />
                </div>
                <h3 className="text-[30px] font-black text-blue-950 mb-3">소득 (Income)</h3>
                <p className="text-[22px] xl:text-[24px] font-medium text-slate-800 leading-relaxed">
                  근로, 사업, 재산 운용 등을 통해 경제활동으로 <strong className="text-blue-800 font-black">얻는 돈</strong>
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 text-[19px] font-black text-blue-900">
                근로소득 · 사업소득 · 재산소득
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border-2 border-rose-200 flex flex-col justify-between gap-4">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                  <CreditCard className="w-9 h-9" />
                </div>
                <h3 className="text-[30px] font-black text-rose-950 mb-3">지출 (Expense)</h3>
                <p className="text-[22px] xl:text-[24px] font-medium text-slate-800 leading-relaxed">
                  생활에 필요한 상품과 서비스를 구매하기 위해 <strong className="text-rose-800 font-black">사용하는 돈</strong>
                </p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-4 text-[19px] font-black text-rose-900">
                소비지출 · 비소비지출(세금·보험)
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border-2 border-indigo-200 flex flex-col justify-between gap-4">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <PiggyBank className="w-9 h-9" />
                </div>
                <h3 className="text-[30px] font-black text-indigo-950 mb-3">저축 (Savings)</h3>
                <p className="text-[22px] xl:text-[24px] font-medium text-slate-800 leading-relaxed">
                  소득 중 소비하지 않고 미래의 필요를 위해 <strong className="text-indigo-800 font-black">안전하게 모아 두는 것</strong>
                </p>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-4 text-[19px] font-black text-indigo-900">
                원금 안전 보존 + 약정 확정 이자
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border-2 border-emerald-200 flex flex-col justify-between gap-4">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <TrendingUp className="w-9 h-9" />
                </div>
                <h3 className="text-[30px] font-black text-emerald-950 mb-3">투자 (Investment)</h3>
                <p className="text-[22px] xl:text-[24px] font-medium text-slate-800 leading-relaxed">
                  미래의 높은 수익과 성장을 기대하며 <strong className="text-emerald-800 font-black">자금을 투입하는 것</strong>
                </p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4 text-[19px] font-black text-emerald-900">
                높은 수익 기대 + 원금 손실 위험
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <span className="text-[24px] font-bold text-slate-100">
              소득은 씨앗, 지출은 오늘 먹는 양식, 저축은 비상 곡식, 투자는 미래를 위해 밭에 뿌리는 거름입니다.
            </span>
            <button
              type="button"
              onClick={() => setActiveStep('step2')}
              className="min-h-[64px] px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <span>실전 상황 퀴즈 풀기</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 실전 상황 퀴즈 ================= */}
      {activeStep === 'step2' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          {/* Progress & Scenario Number Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-5 py-2 rounded-full bg-amber-400 text-slate-950 font-black text-[22px]">
              문제 {currentScenarioIdx + 1} / {QUIZ_SCENARIOS.length} · {currentQuiz.character}의 사례
            </span>

            <div className="flex items-center gap-2.5">
              {QUIZ_SCENARIOS.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    setCurrentScenarioIdx(idx);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  aria-label={`${idx + 1}번 문제로 이동`}
                  className={`min-h-[52px] min-w-[52px] rounded-xl font-black text-[20px] cursor-pointer transition-all ${
                    currentScenarioIdx === idx
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Text */}
          <div className="bg-slate-800 rounded-3xl p-8 border-2 border-slate-700">
            <p className="text-[30px] xl:text-[36px] font-black text-white leading-relaxed">
              &ldquo;{currentQuiz.situation}&rdquo;
            </p>
          </div>

          {/* 4 Large Choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['소득', '지출', '저축', '투자'] as const).map((choice) => {
              const isSelected = selectedAnswer === choice;
              const isChoiceCorrect = choice === currentQuiz.correctAnswer;
              let btnClass = 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700';

              if (showExplanation) {
                if (isChoiceCorrect) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-400/50';
                } else if (isSelected && !isChoiceCorrect) {
                  btnClass = 'bg-rose-600 text-white border-rose-400 ring-4 ring-rose-400/50';
                }
              }

              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleSelect(choice)}
                  className={`min-h-[84px] px-6 rounded-2xl border-2 font-black text-[30px] transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-95 ${btnClass}`}
                >
                  <span>{choice}</span>
                  {showExplanation && isChoiceCorrect && <CheckCircle2 className="w-8 h-8" />}
                  {showExplanation && isSelected && !isChoiceCorrect && <XCircle className="w-8 h-8" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Reveal */}
          {showExplanation ? (
            <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-xl text-[20px] font-black ${
                      isCorrect ? 'bg-emerald-400 text-slate-950' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {isCorrect ? '정답입니다!' : '오답 — 다시 확인해 보세요!'}
                  </span>
                  <span className="text-[22px] font-black text-amber-300">
                    상세 분류: {currentQuiz.subType}
                  </span>
                </div>
                <p className="text-[24px] font-bold text-slate-100 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
              </div>

              <button
                type="button"
                onClick={nextQuiz}
                className="min-h-[64px] px-7 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-[22px] flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>다음 문제</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="p-5 bg-slate-800/50 rounded-2xl text-center text-[22px] font-bold text-slate-300">
              위 4가지 개념 중 하나를 선택하면 정답과 해설이 공개됩니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
