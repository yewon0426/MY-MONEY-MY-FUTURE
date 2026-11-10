import React, { useState } from 'react';
import { QuizScenario } from '../../types';
import {
  HelpCircle,
  Coins,
  CreditCard,
  PiggyBank,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface Page7Props {
  resetSignal: number;
}

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
    situation: '시험이 끝난 후 친구들과 영화관에 가서 영화 티켓을 예매하고 고소한 팝콘 세트를 사 먹었다.',
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
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  React.useEffect(() => {
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
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>경제활동 4대 핵심 개념 & 실전 상황 퀴즈</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "소득 · 지출 · 저축 · 투자"
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl font-medium">
          4가지 기본 용어를 확인하고, 아래 학생들의 실제 생활 사례가 어디에 해당하는지 맞춰보세요!
        </p>
      </div>

      {/* Top 4 Concept Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        {/* Income */}
        <div className="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-blue-900">소득 (Income)</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              근로, 사업, 재산 운용 등을 통해 경제활동으로 <strong>얻는 돈</strong>
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-blue-700">
            근로·사업·재산·이전소득
          </div>
        </div>

        {/* Expense */}
        <div className="bg-white rounded-3xl p-5 border-2 border-rose-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-2">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-rose-900">지출 (Expense)</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              생활에 필요한 상품과 서비스를 구매하기 위해 <strong>사용하는 돈</strong>
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-rose-700">
            소비지출 · 비소비지출(세금 등)
          </div>
        </div>

        {/* Savings */}
        <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
              <PiggyBank className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-indigo-900">저축 (Savings)</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              소득 중 소비하지 않고 미래의 필요를 위해 <strong>남겨 두는 것</strong>
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-indigo-700">
            원금 안전 보존 + 약정 이자
          </div>
        </div>

        {/* Investment */}
        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-emerald-900">투자 (Investment)</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              미래의 높은 수익과 성장을 기대하며 <strong>자금을 투입하는 것</strong>
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700">
            수익 추구 (원금 손실 위험 동반)
          </div>
        </div>
      </div>

      {/* Main Interactive Classroom Quiz Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 my-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiz Progress & Question */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs">
              실전 교실 퀴즈 ({currentScenarioIdx + 1} / {QUIZ_SCENARIOS.length})
            </span>
            <div className="flex items-center gap-2">
              {QUIZ_SCENARIOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentScenarioIdx(idx);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    currentScenarioIdx === idx ? 'bg-amber-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scenario Text */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 mb-6">
            <div className="text-xs font-bold text-slate-400 mb-1">
              상황 제시 [{currentQuiz.character}의 하루]
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              "{currentQuiz.situation}"
            </p>
          </div>

          {/* 4 Choices Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {(['소득', '지출', '저축', '투자'] as const).map((choice) => {
              const isSelected = selectedAnswer === choice;
              const isChoiceCorrect = choice === currentQuiz.correctAnswer;
              let btnClass = 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700';

              if (showExplanation) {
                if (isChoiceCorrect) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-500/30';
                } else if (isSelected && !isChoiceCorrect) {
                  btnClass = 'bg-rose-600 text-white border-rose-400 ring-4 ring-rose-500/30';
                }
              }

              return (
                <button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  className={`py-4 px-6 rounded-2xl border-2 font-black text-xl sm:text-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${btnClass}`}
                >
                  <span>{choice}</span>
                  {showExplanation && isChoiceCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                  {showExplanation && isSelected && !isChoiceCorrect && (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback & Rationale Reveal */}
        {showExplanation && (
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-xs font-black ${
                    isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  {isCorrect ? '정답입니다! 🎉' : '다시 생각해 볼까요? 🤔'}
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  상세 분류: {currentQuiz.subType}
                </span>
              </div>
              <p className="text-slate-200 text-base font-medium">
                {currentQuiz.explanation}
              </p>
            </div>

            <button
              onClick={nextQuiz}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>다음 문제 풀기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Callout */}
      <div className="text-center text-xs text-slate-500 font-semibold pt-1">
        💡 소득은 씨앗, 지출은 오늘 먹는 양식, 저축은 곳간에 두는 비상 곡식, 투자는 미래를 위해 밭에 뿌리는 거름입니다.
      </div>
    </div>
  );
};
