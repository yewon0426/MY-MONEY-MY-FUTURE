import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  HeartPulse,
  TrendingDown,
  Building,
  Calendar,
  Flame,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface Page06Props {
  resetSignal: number;
}

interface RiskCardItem {
  id: number;
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
  badgeColor: string;
}

const RISK_CARDS: RiskCardItem[] = [
  {
    id: 1,
    title: '상황 1. 갑작스러운 병원비',
    situation: '퇴근길에 불의의 사고를 당해 응급실 치료비 및 수술비로 당장 80만 원의 결제가 필요해졌습니다.',
    question: '필요한 돈을 오늘 즉시 마련하려면 금융상품의 어떤 특징이 가장 중요할까요?',
    keyConcepts: ['유동성', '비상자금', '실손보험'],
    options: ['수익성 (높은 주식 배당)', '유동성 (즉시 인출 가능한 보통예금/비상금)', '안전성 (10년 만기 국채)', '복리 효과 (장기 적금)'],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"당장 오늘 병원에서 카드 긁거나 계좌이체해야 하니까 바로 뺄 수 있는 통장이 최고예요!"',
    revealedResult: '유동성(환금성)이 가장 중요합니다! 평소 월급의 3~6개월 치를 비상자금(보통예금/파킹통장)으로 마련해 두거나 실손의료보험에 가입해 두어야 합니다.',
    teacherInsight: '수익률이 아무리 높은 부동산이나 3년 적금에 돈이 있어도, 당장 오늘 밤 병원비를 낼 수 없다면 금융 위기에 빠집니다. 이것이 바로 비상금의 유동성이 필요한 이유입니다.',
    icon: '🏥',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    id: 2,
    title: '상황 2. 주식시장 급락',
    situation: '10년 뒤 내 집 마련을 목표로 매수한 우량 기업 주식의 가격이 글로벌 경기 불안으로 -20% 하락했습니다.',
    question: '주가가 20% 하락했다는 이유만으로 반드시 지금 즉시 손절 매도해야 할까요?',
    keyConcepts: ['위험', '투자 기간', '손실 감수 능력'],
    options: ['무조건 공포에 질려 즉시 전액 매도해야 한다.', '당장 쓸 돈이 아니고 기업의 본질 가치가 건전하다면, 장기적 관점에서 보유하거나 분할 매수를 고려한다.', '은행에 가서 주식 손실액을 물어내라고 요구한다.', '채권을 발행하여 메꾼다.'],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"더 떨어질까 봐 무섭긴 하지만, 10년 뒤에 쓸 돈이고 회사가 망한 게 아니라면 기다려야 하지 않을까요?"',
    revealedResult: '반드시 즉시 매도할 필요는 없습니다. 주식은 단기 변동성이 크지만, 장기 투자 자금이고 기업의 펀더멘털이 튼튼하다면 회복을 기다리는 인내심이 필요합니다.',
    teacherInsight: '단기 자금으로 주식을 사면 폭락 시 버티지 못하고 바닥에서 손절하게 됩니다. 주식은 단기 등락을 견딜 수 있는 여유자금과 긴 투자 기간으로 접근해야 합리적입니다.',
    icon: '📉',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    id: 3,
    title: '상황 3. 기업의 채무불이행 (부도 위험)',
    situation: '연 7% 고금리를 준다고 해서 매수한 모 건설회사의 회사채가, 해당 기업의 경영 악화로 이자를 제때 지급하지 못하게 되었습니다.',
    question: '채권은 원금과 이자를 법적으로 약속한 차용증이므로 무조건 100% 안전할까요?',
    keyConcepts: ['신용위험', '채무불이행(디폴트)', '회사채 vs 국채'],
    options: ['국가가 1억 원까지 무조건 대신 갚아주므로 안전하다.', '돈을 빌려간 기업이 파산하면 원금과 이자를 떼일 수 있는 "신용위험"이 존재한다.', '채권은 예금과 완전히 똑같으므로 절대 손실이 안 난다.', '주식으로 자동 교환되어 2배로 번다.'],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"돈 빌려간 회사가 망하면 돈을 못 돌려받으니까 당연히 원금을 날릴 수도 있어요!"',
    revealedResult: '아닙니다! 채권은 "신용위험(채무불이행 위험)"이 존재합니다. 정부가 발행한 국채는 안전하지만, 민간 기업의 회사채는 회사가 부도나면 원금을 잃을 수 있습니다.',
    teacherInsight: '학생들이 흔히 "채권은 이자를 약속했으니 무조건 안전하다"고 오해합니다. 약속을 했더라도 돈을 갚을 회사의 재무 능력이 없으면 휴지조각이 된다는 점을 꼭 강조해 주세요.',
    icon: '🏢',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 4,
    title: '상황 4. 단기간에 사용할 돈',
    situation: '3개월 뒤 대학교에 반드시 납부해야 하는 필수 등록금 350만 원이 있습니다.',
    question: '수익률이 20% 날 수도 있다는 소문을 듣고 주식이나 가상자산에 투자해도 될까요?',
    keyConcepts: ['안전성', '유동성', '투자 기간과 자금 성격'],
    options: ['대박이 날 수 있으니 무조건 고수익 주식에 올인한다.', '3개월 뒤 반드시 써야 할 필수 자금은 원금 손실이 없는 정기예금이나 보통예금에 두어야 한다.', '단기 자금일수록 위험성이 높은 상품에 넣어야 한다.', '보험에 일시납으로 넣는다.'],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"절대 안 돼요! 만약 3개월 뒤에 -30% 되면 등록금을 못 내서 대학을 못 가잖아요!"',
    revealedResult: '단기 필수 자금은 절대 고수익/고위험 상품에 넣어서는 안 됩니다. 3개월 뒤 무조건 써야 하는 돈은 "안전성"과 "유동성"이 최우선입니다.',
    teacherInsight: '돈의 "사용 예정 시점(투자 시계)"이 짧을수록 안전성의 가치는 무한대로 커집니다. 단기 자금으로 도박성 고수익을 노리는 것은 가장 비합리적인 금융 행위입니다.',
    icon: '🎓',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 5,
    title: '상황 5. 물가 상승 (인플레이션)',
    situation: '1년 동안 은행 정기예금에 넣어두어 연 3% 이자를 받았습니다. 그런데 1년 동안 햄버거, 교통비, 학원비 등 물가가 연 5% 뛰었습니다.',
    question: '통장에 찍힌 원금과 이자는 늘어났는데, 나의 "실제 구매력(실질 가치)"은 어떻게 되었을까요?',
    keyConcepts: ['명목수익률', '실질수익률', '구매력', '인플레이션 위험'],
    options: ['통장에 돈이 늘었으니 무조건 부자가 된 것이다.', '물가 상승률(5%)이 예금 이자율(3%)보다 높아, 실제로 물건을 살 수 있는 "실질 구매력"은 오히려 감소했다.', '물가와 예금 이자는 아무 상관이 없다.', '한국은행이 물가 차액을 보상해 준다.'],
    correctOptionIndex: 1,
    studentExpectedAnswers: '"통장에 돈은 늘었지만 물가가 더 많이 올랐으면 작년보다 물건을 덜 살 수 있는 거 아니에요?"',
    revealedResult: '실질 구매력은 오히려 감소했습니다! [실질수익률 ≈ 명목이자율(3%) - 물가상승률(5%) = -2%]. 통장의 숫자는 늘었지만 실제 살 수 있는 물건의 양은 줄어든 것입니다.',
    teacherInsight: '안전한 예금만 고집하면 원금은 안전할지언정 인플레이션에 의해 돈의 가치가 서서히 녹아내리는 "실질 가치 손실 위험"을 겪게 됩니다. (UNIT 04 경제환경 변화에서 심화 학습 예정)',
    icon: '🔥',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
];

export const Page06RiskCards: React.FC<Page06Props> = ({ resetSignal }) => {
  const [selectedCardId, setSelectedCardId] = useState<number>(1);
  const [studentChoice, setStudentChoice] = useState<Record<number, number>>({});
  const [revealedStatus, setRevealedStatus] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    setSelectedCardId(1);
    setStudentChoice({});
    setRevealedStatus({});
  }, [resetSignal]);

  const currentCard = RISK_CARDS.find((c) => c.id === selectedCardId) || RISK_CARDS[0];
  const userChoiceIdx = studentChoice[currentCard.id];
  const isRevealed = !!revealedStatus[currentCard.id];

  const handleSelectOption = (optIdx: number) => {
    setStudentChoice((prev) => ({
      ...prev,
      [currentCard.id]: optIdx,
    }));
  };

  const toggleReveal = () => {
    setRevealedStatus((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id],
    }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>UNIT 03 · 6차시 / 실생활 5대 금융 위험 상황 대응</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "금융상품 위험 상황 카드 — 학생 예상 → 선택 → 결과 해설"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          살아가면서 마주치는 예기치 못한 5대 금융 위기 상황에서 어떻게 현명하게 대처해야 할지 탐구합니다.
        </p>
      </div>

      {/* 5 Scenario Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-1">
        {RISK_CARDS.map((card) => {
          const isSelected = selectedCardId === card.id;
          const isAnswered = studentChoice[card.id] !== undefined;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{card.icon}</span>
                {isAnswered && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                    완료
                  </span>
                )}
              </div>
              <div className="mt-1">
                <span className="text-[10px] opacity-80 block font-bold">상황 0{card.id}</span>
                <h4 className="font-extrabold text-xs leading-snug truncate">{card.title.split('. ')[1]}</h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage for Selected Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left (5 cols): Situation, Key Concepts, Expected Answer */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCard.icon}</span>
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase">위기 시나리오</span>
                  <h3 className="font-black text-base text-slate-900">{currentCard.title}</h3>
                </div>
              </div>
              <div className="flex gap-1">
                {currentCard.keyConcepts.map((kc) => (
                  <span key={kc} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">
                    {kc}
                  </span>
                ))}
              </div>
            </div>

            {/* Situation box */}
            <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-1">
              <span className="text-[10px] font-bold text-rose-700 uppercase block">실제 발생 상황:</span>
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                "{currentCard.situation}"
              </p>
            </div>

            {/* Student expected answer prompt */}
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 text-xs">
              <strong className="text-amber-900 font-bold block flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                학생 예상 반응 및 직관:
              </strong>
              <p className="text-[11px] text-slate-700 italic leading-relaxed">
                {currentCard.studentExpectedAnswers}
              </p>
            </div>
          </div>

          <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>핵심 탐구 포인트: {currentCard.keyConcepts[0]}</span>
            <span className="font-bold text-slate-700">고1 실전 금융 역량</span>
          </div>
        </div>

        {/* Right (7 cols): Question, 4 Options, and Step-by-Step Revealed Solution */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">
                질문: {currentCard.question}
              </span>
              <button
                onClick={toggleReveal}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                {isRevealed ? '해설 닫기 ▲' : '정답 및 교사용 해설 공개 ▶'}
              </button>
            </div>

            {/* 4 Multiple-Choice Options */}
            <div className="space-y-1.5 my-3">
              {currentCard.options.map((opt, idx) => {
                const isChosen = userChoiceIdx === idx;
                const isCorrect = idx === currentCard.correctOptionIndex;

                let optStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700';
                if (isRevealed) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-600/90 text-white border-emerald-400 ring-2 ring-emerald-400/50 font-bold';
                  } else if (isChosen && !isCorrect) {
                    optStyle = 'bg-rose-900/60 text-slate-300 border-rose-500 line-through';
                  }
                } else if (isChosen) {
                  optStyle = 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-300 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${optStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Revealed Solution & Teacher Pedagogical Insight */}
            {isRevealed && (
              <div className="space-y-2 mt-3 pt-2.5 border-t border-slate-800 animate-fade-in text-xs">
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xl space-y-1">
                  <strong className="text-emerald-300 font-bold block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    올바른 선택 및 결과 분석:
                  </strong>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {currentCard.revealedResult}
                  </p>
                </div>

                <div className="p-2.5 bg-indigo-950/60 border border-indigo-500/50 rounded-xl space-y-1">
                  <strong className="text-indigo-300 font-bold block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    교사용 심화 지도 포인트:
                  </strong>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {currentCard.teacherInsight}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
            <span>위험 관리의 핵심: "상황이 닥치기 전에 미리 금융 방패를 준비한다."</span>
            <span className="text-amber-400 font-bold">Risk Preparedness</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-rose-700">💡 위기 대응 원칙:</span>
          <span>금융 위험은 언제든 발생할 수 있습니다. <strong>유동성(비상금), 보험, 분산 투자, 투자 시계(기간)</strong>가 나의 자산을 지켜주는 4대 방패입니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">자산 보호의 지혜</span>
      </div>
    </div>
  );
};
