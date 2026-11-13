import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

interface Page07Props {
  resetSignal: number;
}

interface ProductInfo {
  name: string;
  category: string;
  purpose: string;
  revenueSource: string;
  lossRisk: string;
  liquidity: string;
  riskLevel: string;
}

const PRODUCTS_MATRIX: ProductInfo[] = [
  {
    name: '보통예금',
    category: '예금 (요구불)',
    purpose: '일상 생활비 관리 및 비상금 보관, 급여 이체',
    revenueSource: '이자 (연 0.1~1.0% 내외)',
    lossRisk: '없음 (예금자보호 1억 원)',
    liquidity: '매우 높음',
    riskLevel: '최저',
  },
  {
    name: '정기적금',
    category: '예금 (저축성)',
    purpose: '매달 일정액 저축하여 종잣돈(목돈) 만들기',
    revenueSource: '약정 이자 (연 3~4%)',
    lossRisk: '없음 (예금자보호 1억 원)',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '최저',
  },
  {
    name: '정기예금',
    category: '예금 (저축성)',
    purpose: '이미 모은 목돈을 안전하게 굴리기',
    revenueSource: '약정 이자 (연 3~4%)',
    lossRisk: '없음 (예금자보호 1억 원)',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '최저',
  },
  {
    name: '주식 (Stock)',
    category: '투자 (직접)',
    purpose: '기업 지분 취득 및 고수익 추구',
    revenueSource: '시세차익 + 배당금',
    lossRisk: '있음 (원금 손실 가능)',
    liquidity: '매우 높음',
    riskLevel: '매우 높음',
  },
  {
    name: '채권 (Bond)',
    category: '투자 (직접)',
    purpose: '정부·기업 대여 및 안정적 고정이자 수취',
    revenueSource: '약정 표면이자(쿠폰) + 매매차익',
    lossRisk: '신용위험·금리변동 시 존재',
    liquidity: '보통',
    riskLevel: '낮음',
  },
  {
    name: '펀드 / ETF',
    category: '투자 (간접)',
    purpose: '소액 분산 투자 및 전문가 간접 운용',
    revenueSource: '운용 실적 배당 + 시세차익',
    lossRisk: '있음 (원금 손실 가능)',
    liquidity: '매우 높음 (ETF 기준)',
    riskLevel: '중간',
  },
  {
    name: '보험 (Insurance)',
    category: '보장 (위험대비)',
    purpose: '질병·사고 발생 시 치명적 경제 파산 방지',
    revenueSource: '보험금 (사고 시 지급)',
    lossRisk: '중도 해약 시 원금 손실 가능',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '낮음',
  },
  {
    name: '연금 (Pension)',
    category: '노후 (소득보장)',
    purpose: '은퇴 후 평생 생활비(노후 소득) 보장',
    revenueSource: '매달 연금액 (은퇴 후 수령)',
    lossRisk: '중도 해약 시 원금 손실 가능',
    liquidity: '매우 낮음 (만기/은퇴 시)',
    riskLevel: '낮음',
  },
];

const SCENARIOS = [
  {
    id: 1,
    person: '고1 민우',
    situation: '다음 달 친구들과 1박 2일 여행 갈 경비 50만 원을 언제든 꺼내 쓸 수 있게 보관하고 싶다.',
    targetAnswer: '보통예금',
    options: ['보통예금', '정기적금', '개별 주식', '개인연금'],
    explanation: '사용 시점이 한 달 뒤로 가깝고 수시로 입출금해야 하므로 유동성이 가장 높은 보통예금이 적합합니다.',
  },
  {
    id: 2,
    person: '고1 서연',
    situation: '3년 뒤 고교 졸업 시 노트북(150만 원)을 사려고 매달 4만 원씩 원금 손실 없이 모으려 한다.',
    targetAnswer: '정기적금',
    options: ['정기적금', '정기예금', '주식 (Stock)', '금 ETF'],
    explanation: '매달 일정 금액을 불입하여 목돈을 모으고 예금자보호로 원금이 보장되는 정기적금이 적합합니다.',
  },
  {
    id: 3,
    person: '청년 준호',
    situation: '10년 이상 장기 투자하며 원금 손실 위험을 감수하더라도 기업의 높은 성장을 통한 고수익을 원한다.',
    targetAnswer: '주식 (Stock)',
    options: ['정기예금', '주식 (Stock)', '국채 (3년물)', '국민연금'],
    explanation: '투자 기간이 길고 고위험·고수익을 감수할 수 있으므로 주식 투자가 적합합니다.',
  },
  {
    id: 4,
    person: '가장 성민',
    situation: '중대 질병에 걸려 수천만 원의 수술비로 가족의 전 재산이 무너지는 위험을 방어하고 싶다.',
    targetAnswer: '보험 (Insurance)',
    options: ['주식 (Stock)', '정기적금', '보험 (Insurance)', 'ETF'],
    explanation: '보험은 불의의 질병·사고 발생 시 목돈의 보험금을 받아 가계 파산을 막는 안전장치입니다.',
  },
  {
    id: 5,
    person: '직장인 지현',
    situation: '30년 뒤 은퇴 후에도 월급처럼 매달 노후 생활비를 받고 세액공제 혜택도 누리고 싶다.',
    targetAnswer: '연금 (Pension)',
    options: ['보통예금', '연금 (Pension)', '단기 회사채', '자동차 구매'],
    explanation: '연금은 장기 적립과 세액공제 혜택을 받으며 은퇴 후 노후 생활비를 보장받는 수단입니다.',
  },
];

const CONCEPT_QUESTIONS = [
  {
    id: 1,
    topic: '1. 요구불예금과 저축성예금',
    question: '언제든지 수시로 입출금할 수 있는 "요구불예금"에 해당하는 것은?',
    options: ['보통예금', '정기예금', '정기적금', '양도성예금증서'],
    correctIndex: 0,
    basisExplanation: '보통예금은 자유롭게 입출금할 수 있는 요구불예금이며, 정기예금·정기적금은 만기가 정해진 저축성예금입니다.',
    commonMisconception: '오개념: "모든 은행 통장은 똑같다?" → 보통예금은 유동성이 높지만 금리가 낮고, 저축성예금은 만기 유지 시 높은 이자를 줍니다.',
  },
  {
    id: 2,
    topic: '2. 정기예금과 정기적금의 이자 차이',
    question: '같은 1,200만 원을 연 4%로 1년간 저축할 때, 정기예금 이자가 정기적금보다 많은 이유는?',
    options: [
      '정기예금의 수수료가 더 적기 때문',
      '정기예금은 1,200만 원 전체가 1년 내내 은행에 맡겨지기 때문',
      '정기적금은 예금자보호가 안 되기 때문',
      '정기적금은 복리로만 계산되기 때문',
    ],
    correctIndex: 1,
    basisExplanation: '정기예금은 목돈 전액에 12개월 이자가 붙지만, 적금은 매달 나누어 내므로 뒤 회차일수록 이자 기간이 짧아집니다.',
    commonMisconception: '오개념: "금리가 4%로 같으면 총이자도 같다?" → 적금은 첫 달 돈만 12개월, 마지막 달 돈은 1개월 치 이자만 붙습니다.',
  },
  {
    id: 3,
    topic: '3. 주식의 시세차익과 배당금',
    question: '주식 투자자의 2대 수익원에 대한 설명으로 가장 올바른 것은?',
    options: [
      '주식을 사기만 하면 확정된 시세차익을 매달 받는다.',
      '모든 회사는 적자가 나도 매년 똑같은 배당금을 준다.',
      '시세차익은 주가 상승 시 매도 차익, 배당금은 기업 이익의 분배다.',
      '배당금을 받으면 주가가 폭락해도 무조건 이익이다.',
    ],
    correctIndex: 2,
    basisExplanation: '주식은 싸게 사서 비싸게 파는 시세차익과 기업 이익을 나누어 받는 배당금으로 수익을 얻습니다.',
    commonMisconception: '오개념: "배당만 받으면 손실이 없다?" → 배당금보다 주가 하락 폭이 크면 전체 자산은 손실이 됩니다.',
  },
  {
    id: 4,
    topic: '4. 주식과 채권의 권리 비교',
    question: '주식 투자자와 채권 투자자의 법적 지위를 바르게 짝지은 것은?',
    options: [
      '주식: 돈 빌려준 채권자 / 채권: 회사 주주',
      '주식: 회사 소유 지분을 가진 주주 / 채권: 원리금을 돌려받을 채권자',
      '주식: 원금 보장 청구권자 / 채권: 경영 의결권자',
      '둘 다 회사가 망해도 국가가 원금 100% 보장',
    ],
    correctIndex: 1,
    basisExplanation: '주주는 기업의 소유자(의결권·배당권), 채권자는 돈을 빌려준 채권자(확정 이자·만기 원금 상환권)입니다.',
    commonMisconception: '오개념: "채권도 주주총회 투표권이 있다?" → 채권자는 돈을 빌려준 사람일 뿐 경영 의결권이 없습니다.',
  },
  {
    id: 5,
    topic: '5. 펀드와 ETF의 원금 위험',
    question: '펀드(Fund)와 ETF에 대한 설명으로 옳지 않은 것은?',
    options: [
      '소액으로도 여러 종목에 분산 투자할 수 있다.',
      '전문가가 포트폴리오를 운용하는 간접 투자 상품이다.',
      'ETF는 주식시장에서 실시간으로 매매할 수 있다.',
      '분산 투자하므로 원금 손실이 절대 없으며 예금자보호가 된다.',
    ],
    correctIndex: 3,
    basisExplanation: '펀드와 ETF는 실적 배당 상품으로 시장 전체 하락 시 원금 손실이 발생하며 예금자보호 대상이 아닙니다.',
    commonMisconception: '오개념: "분산 투자하면 원금 100% 보장?" → 개별 위험은 줄이지만 시장 전체 하락 위험은 남습니다.',
  },
];

export const Page07ComprehensiveComparison: React.FC<Page07Props> = ({ resetSignal }) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'conceptQuiz' | 'matrix'>('activity');
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [conceptAnswers, setConceptAnswers] = useState<Record<number, number>>({});
  const [conceptRevealed, setConceptRevealed] = useState<Record<number, boolean>>({});

  const [selectedProdIdx, setSelectedProdIdx] = useState<number>(0);

  useEffect(() => {
    setActiveTab('activity');
    setScenarioIdx(0);
    setUserAnswers({});
    setQuizIdx(0);
    setConceptAnswers({});
    setConceptRevealed({});
    setSelectedProdIdx(0);
  }, [resetSignal]);

  const sc = SCENARIOS[scenarioIdx];
  const scChosen = userAnswers[sc.id];
  const scCorrect = scChosen === sc.targetAnswer;
  const totalScCorrect = SCENARIOS.filter((s) => userAnswers[s.id] === s.targetAnswer).length;

  const cq = CONCEPT_QUESTIONS[quizIdx];
  const cqChosen = conceptAnswers[cq.id];
  const cqRevealed = !!conceptRevealed[cq.id];
  const totalCqCorrect = CONCEPT_QUESTIONS.filter((q) => conceptAnswers[q.id] === q.correctIndex).length;

  const prod = PRODUCTS_MATRIX[selectedProdIdx];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-emerald-800">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 7</span>
            <span aria-hidden="true">·</span>
            <span>금융상품 종합 정리</span>
          </div>
          <h2 className="text-[38px] xl:text-[44px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            금융상품 8종 종합 비교 &amp; 실전 평가
          </h2>
        </div>

        <nav className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-2 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black cursor-pointer whitespace-nowrap ${
              activeTab === 'activity' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            STEP 1. 실전 시나리오 ({totalScCorrect}/5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('conceptQuiz')}
            className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black cursor-pointer whitespace-nowrap ${
              activeTab === 'conceptQuiz' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            STEP 2. 핵심 개념 퀴즈 ({totalCqCorrect}/5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black cursor-pointer whitespace-nowrap ${
              activeTab === 'matrix' ? 'bg-emerald-700 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            STEP 3. 8대 상품 탐험
          </button>
        </nav>
      </div>

      {/* STEP 1: Paginated Scenario Matching (1 at a time) */}
      {activeTab === 'activity' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <span className="text-[26px] font-black text-amber-300">
              시나리오 {sc.id} / 5 · {sc.person}
            </span>
            <div className="flex items-center gap-2">
              {SCENARIOS.map((item, idx) => {
                const ans = userAnswers[item.id];
                let cls = 'bg-slate-800 text-slate-300';
                if (idx === scenarioIdx) cls = 'bg-amber-400 text-slate-950';
                else if (ans) cls = ans === item.targetAnswer ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScenarioIdx(idx)}
                    className={`min-h-[48px] w-12 rounded-xl font-black text-[20px] cursor-pointer ${cls}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setUserAnswers({});
                  setScenarioIdx(0);
                }}
                className="min-h-[48px] px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-[20px] flex items-center gap-1.5 cursor-pointer ml-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>초기화</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 space-y-7 flex-1 flex flex-col justify-center">
            <p className="text-[30px] xl:text-[34px] font-black text-white leading-snug">
              &ldquo;{sc.situation}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sc.options.map((opt) => {
                let btnCls = 'bg-slate-700 hover:bg-slate-600 text-white';
                if (scChosen) {
                  if (opt === sc.targetAnswer) btnCls = 'bg-emerald-500 text-slate-950';
                  else if (scChosen === opt) btnCls = 'bg-rose-600 text-white';
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setUserAnswers((prev) => ({ ...prev, [sc.id]: opt }))}
                    className={`min-h-[72px] px-5 py-4 rounded-2xl font-black text-[24px] cursor-pointer transition-all ${btnCls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {scChosen && (
              <div
                className={`p-6 rounded-2xl border-2 text-[24px] font-bold flex items-start gap-4 ${
                  scCorrect
                    ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100'
                    : 'bg-rose-950/70 border-rose-400 text-rose-100'
                }`}
              >
                {scCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-400 shrink-0 mt-1" />
                )}
                <div>
                  <span className="font-black block mb-1">
                    {scCorrect ? '정답입니다! ' : `정답은 '${sc.targetAnswer}'입니다. `}
                  </span>
                  <span className="font-medium text-slate-100">{sc.explanation}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              disabled={scenarioIdx === 0}
              onClick={() => setScenarioIdx((i) => Math.max(0, i - 1))}
              className="min-h-[60px] px-7 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-white font-black text-[22px] cursor-pointer"
            >
              이전 시나리오
            </button>
            <button
              type="button"
              disabled={scenarioIdx === SCENARIOS.length - 1}
              onClick={() => setScenarioIdx((i) => Math.min(SCENARIOS.length - 1, i + 1))}
              className="min-h-[60px] px-7 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-35 text-slate-950 font-black text-[22px] cursor-pointer"
            >
              다음 시나리오
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Paginated Concept Quiz (1 at a time) */}
      {activeTab === 'conceptQuiz' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <span className="text-[26px] font-black text-indigo-300">{cq.topic}</span>
            <div className="flex items-center gap-2">
              {CONCEPT_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuizIdx(idx)}
                  className={`min-h-[48px] w-12 rounded-xl font-black text-[20px] cursor-pointer ${
                    idx === quizIdx ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setConceptRevealed((p) => ({ ...p, [cq.id]: !p[cq.id] }))}
                className="min-h-[48px] px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[20px] cursor-pointer ml-2"
              >
                {cqRevealed ? '해설 닫기' : '정답 및 해설 공개'}
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 space-y-6 flex-1 flex flex-col justify-center">
            <h3 className="text-[30px] xl:text-[34px] font-black text-white leading-snug">
              Q{cq.id}. {cq.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cq.options.map((opt, idx) => {
                const isChosen = cqChosen === idx;
                const isRight = idx === cq.correctIndex;
                let cls = 'bg-slate-700 hover:bg-slate-600 text-white';
                if (cqRevealed) {
                  if (isRight) cls = 'bg-emerald-600 text-white ring-2 ring-emerald-300';
                  else if (isChosen) cls = 'bg-rose-600 text-white opacity-80';
                } else if (isChosen) {
                  cls = 'bg-indigo-600 text-white ring-2 ring-indigo-300';
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setConceptAnswers((p) => ({ ...p, [cq.id]: idx }))}
                    className={`min-h-[68px] p-5 rounded-2xl text-left text-[22px] xl:text-[24px] font-bold flex items-start gap-3 cursor-pointer ${cls}`}
                  >
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {cqRevealed && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-950/70 border border-emerald-400 rounded-2xl space-y-1">
                  <span className="text-[22px] font-black text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" /> 정답: {cq.correctIndex + 1}번
                  </span>
                  <p className="text-[22px] font-medium text-slate-100 leading-relaxed">{cq.basisExplanation}</p>
                </div>
                <div className="p-5 bg-rose-950/70 border border-rose-400 rounded-2xl space-y-1">
                  <span className="text-[22px] font-black text-rose-300 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6" /> 오개념 바로잡기
                  </span>
                  <p className="text-[22px] font-medium text-slate-100 leading-relaxed">{cq.commonMisconception}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              disabled={quizIdx === 0}
              onClick={() => setQuizIdx((i) => Math.max(0, i - 1))}
              className="min-h-[60px] px-7 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-white font-black text-[22px] cursor-pointer"
            >
              이전 문항
            </button>
            <button
              type="button"
              disabled={quizIdx === CONCEPT_QUESTIONS.length - 1}
              onClick={() => setQuizIdx((i) => Math.min(CONCEPT_QUESTIONS.length - 1, i + 1))}
              className="min-h-[60px] px-7 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-35 text-slate-950 font-black text-[22px] cursor-pointer"
            >
              다음 문항
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Interactive 8-Product Explorer (Replaces cramped 8-row micro table) */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 border-2 border-slate-200 flex flex-col justify-between gap-4">
            <h3 className="text-[28px] font-black text-slate-900">
              비교할 금융상품을 선택하세요
            </h3>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {PRODUCTS_MATRIX.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setSelectedProdIdx(idx)}
                  className={`min-h-[68px] px-4 py-3 rounded-2xl text-left font-black text-[22px] cursor-pointer transition-all ${
                    selectedProdIdx === idx
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <span className="block">{p.name}</span>
                  <span
                    className={`text-[18px] font-bold block ${
                      selectedProdIdx === idx ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    위험도: {p.riskLevel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2 border-b border-slate-800 pb-5">
              <span className="text-[22px] font-bold text-emerald-300 block">{prod.category}</span>
              <h3 className="text-[40px] xl:text-[46px] font-black text-white">{prod.name}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <span className="text-[20px] font-bold text-slate-400 block">주요 활용 목적</span>
                <p className="text-[26px] font-black text-white mt-2">{prod.purpose}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <span className="text-[20px] font-bold text-slate-400 block">핵심 수익원</span>
                <p className="text-[26px] font-black text-amber-300 mt-2">{prod.revenueSource}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <span className="text-[20px] font-bold text-slate-400 block">원금 손실 가능성</span>
                <p className="text-[26px] font-black text-emerald-300 mt-2">{prod.lossRisk}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <span className="text-[20px] font-bold text-slate-400 block">유동성 및 위험도</span>
                <p className="text-[26px] font-black text-blue-300 mt-2">
                  유동성 {prod.liquidity} · 위험 {prod.riskLevel}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-[22px] font-bold text-slate-200">
              자산 관리의 3대 원칙(안전성 · 수익성 · 유동성)에 따라 목적에 맞는 상품을 조합하는 것이 핵심입니다!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
