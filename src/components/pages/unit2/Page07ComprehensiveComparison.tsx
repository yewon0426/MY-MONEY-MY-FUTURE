import React, { useState } from 'react';
import {
  Table,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  TrendingUp,
  RotateCcw,
  Layers,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Page07Props {
  resetSignal: number;
}

interface ProductInfo {
  name: string;
  category: string;
  purpose: string;
  revenueSource: string;
  lossRisk: '없음 (예금자보호 1억 원)' | '있음 (원금 손실 가능)' | '신용위험 시 존재' | '해약 시 손실 가능';
  liquidity: '매우 높음' | '매우 높음 (ETF 기준)' | '보통' | '낮음 (중도해지 불리)' | '매우 낮음 (만기/은퇴 시)';
  riskLevel: '최저' | '낮음' | '중간' | '높음' | '매우 높음';
  badgeColor: string;
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
    badgeColor: 'bg-slate-100 text-slate-800',
  },
  {
    name: '정기적금',
    category: '예금 (저축성)',
    purpose: '매달 일정액 저축하여 종잣돈(목돈) 만들기',
    revenueSource: '약정 이자 (연 3~4%)',
    lossRisk: '없음 (예금자보호 1억 원)',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '최저',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    name: '정기예금',
    category: '예금 (저축성)',
    purpose: '이미 모은 목돈을 안전하게 굴리기',
    revenueSource: '약정 이자 (연 3~4%)',
    lossRisk: '없음 (예금자보호 1억 원)',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '최저',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: '주식 (Stock)',
    category: '투자 (직접)',
    purpose: '기업 지분 취득 및 고수익 추구',
    revenueSource: '시세차익 + 배당금',
    lossRisk: '있음 (원금 손실 가능)',
    liquidity: '매우 높음',
    riskLevel: '매우 높음',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    name: '채권 (Bond)',
    category: '투자 (직접)',
    purpose: '정부·기업 대여 및 안정적 고정이자 수취',
    revenueSource: '약정 표면이자(쿠폰) + 매매차익',
    lossRisk: '신용위험 시 존재',
    liquidity: '보통',
    riskLevel: '낮음',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    name: '펀드 / ETF',
    category: '투자 (간접)',
    purpose: '소액 분산 투자 및 전문가 간접 운용',
    revenueSource: '운용 실적 배당 + 시세차익',
    lossRisk: '있음 (원금 손실 가능)',
    liquidity: '매우 높음 (ETF 기준)',
    riskLevel: '중간',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: '보험 (Insurance)',
    category: '보장 (위험대비)',
    purpose: '질병·사고 발생 시 치명적 경제 파산 방지',
    revenueSource: '보험금 (사고 시 지급)',
    lossRisk: '해약 시 손실 가능',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '낮음',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    name: '연금 (Pension)',
    category: '노후 (소득보장)',
    purpose: '은퇴 후 평생 생활비(노후 소득) 보장',
    revenueSource: '매달 연금액 (은퇴 후 수령)',
    lossRisk: '해약 시 손실 가능',
    liquidity: '매우 낮음 (만기/은퇴 시)',
    riskLevel: '낮음',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
];

interface Scenario {
  id: number;
  person: string;
  situation: string;
  targetAnswer: string;
  options: string[];
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    person: '고1 민우',
    situation: '다음 달 친구들과 1박 2일 여행 갈 경비 50만 원을 언제든 꺼내 쓸 수 있게 안전하게 보관하고 싶다.',
    targetAnswer: '보통예금',
    options: ['보통예금', '정기적금', '개별 주식', '개인연금'],
    explanation: '사용 시점이 한 달 뒤로 매우 가깝고 수시로 입출금 및 계좌이체가 필요하므로 유동성이 가장 높은 보통예금이 최적입니다.',
  },
  {
    id: 2,
    person: '고1 서연',
    situation: '3년 뒤 고교 졸업 시 나에게 줄 대학 입학 축하 노트북(150만 원)을 사기 위해 매달 4만 원씩 차곡차곡 모으려고 한다. 절대 원금을 잃어서는 안 된다!',
    targetAnswer: '정기적금',
    options: ['정기적금', '정기예금', '주식 (Stock)', '금 ETF'],
    explanation: '목표 기간이 3년이며 매달 일정 금액을 불입하여 목돈(종잣돈)을 형성하고, 예금자보호로 원금이 안전하게 보장되는 정기적금이 적합합니다.',
  },
  {
    id: 3,
    person: '청년 투자자 준호',
    situation: '10년 이상 장기 투자할 계획이며 원금 손실 위험을 충분히 감수하더라도 혁신 기업의 폭발적 성장에 베팅해 고수익을 원한다.',
    targetAnswer: '주식 (Stock)',
    options: ['정기예금', '주식 (Stock)', '국채 (3년물)', '국민연금'],
    explanation: '투자 기간이 길고 원금 손실 위험(High Risk)을 감수할 수 있으므로 기업 성장의 결실(시세차익+배당)을 직접 누리는 주식 투자가 적합합니다.',
  },
  {
    id: 4,
    person: '가장 성민',
    situation: '만약 암이나 중대 질병에 걸려 수천만 원의 수술비와 치료비로 가족의 전 재산이 날아가는 비극을 방어하고 싶다.',
    targetAnswer: '보험 (Insurance)',
    options: ['주식 (Stock)', '정기적금', '보험 (Insurance)', 'ETF'],
    explanation: '보험은 상부상조의 원리로 평소 소액 보험료를 내고, 불의의 거대한 질병·사고 발생 시 목돈의 보험금을 받아 가계 파산을 막는 안전벨트입니다.',
  },
  {
    id: 5,
    person: '30대 직장인 지현',
    situation: '30년 뒤 은퇴한 후에도 월급처럼 매달 안정적인 노후 생활비를 평생 받고 싶으며, 연말정산 세액공제 혜택도 받고 싶다.',
    targetAnswer: '연금 (Pension)',
    options: ['보통예금', '연금 (Pension)', '단기 회사채', '자동차 구매'],
    explanation: '개인연금·퇴직연금은 초장기 복리 운용과 세액공제 혜택을 받으며 은퇴 후 사망 시까지 평생 월급을 지급하는 노후 소득 보장 수단입니다.',
  },
];

interface ConceptQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  basisExplanation: string;
  commonMisconception: string;
}

const CONCEPT_QUESTIONS: ConceptQuestion[] = [
  {
    id: 1,
    topic: '1. 요구불예금과 저축성예금의 구분',
    question: '다음 중 예금자가 원할 때 언제든지 수시로 입출금할 수 있는 "요구불예금"에 해당하는 것은?',
    options: ['보통예금', '정기예금', '정기적금', '양도성예금증서'],
    correctIndex: 0,
    basisExplanation: '보통예금과 당좌예금은 언제든지 자유롭게 입금하고 출금할 수 있는 결제성 요구불예금입니다. 반면 정기예금과 정기적금은 일정 기간 돈을 묶어두는 저축성예금입니다.',
    commonMisconception: '오개념: "은행 통장은 다 똑같은 예금이다?" → 보통예금은 유동성이 최고이지만 금리가 매우 낮고, 저축성예금은 만기까지 인출이 제한되는 대신 높은 약정이자를 줍니다.',
  },
  {
    id: 2,
    topic: '2. 정기예금과 정기적금의 납입 방식 차이',
    question: '같은 1,200만 원을 연 4% 금리로 1년간 저축할 때, "정기예금"의 이자가 "정기적금"보다 더 많은 이유는?',
    options: [
      '정기예금의 은행 수수료가 더 적기 때문',
      '정기예금은 1,200만 원 전체가 1년 내내 은행에 머물러 이자가 붙기 때문',
      '정기적금은 예금자보호법이 적용되지 않기 때문',
      '정기적금은 복리로만 계산되기 때문',
    ],
    correctIndex: 1,
    basisExplanation: '정기예금은 목돈 전액이 12개월 동안 거치되지만, 정기적금은 매달 나누어 넣으므로 뒤에 입금한 돈일수록 이자가 붙는 기간이 짧아지기 때문입니다.',
    commonMisconception: '오개념: "금리가 같으면 총 이자도 같을 것이다?" → 정기적금은 첫 달 납입금만 12개월 머물고 마지막 달 납입금은 1개월만 머물기 때문에 총 이자가 정기예금의 약 절반 수준입니다.',
  },
  {
    id: 3,
    topic: '3. 주식의 시세차익과 배당금',
    question: '주식 투자자가 얻을 수 있는 2대 수익원에 대한 설명으로 가장 올바른 것은?',
    options: [
      '주식을 보유하기만 하면 무조건 확정된 시세차익을 매달 받는다.',
      '기업의 실적과 관계없이 모든 주식회사는 매년 똑같은 배당금을 지급해야 한다.',
      '시세차익은 주가 상승 시 매도를 통해 얻는 차익이고, 배당금은 기업 이익의 일부를 분배받는 것이다.',
      '배당금을 많이 받으면 주가가 50% 폭락해도 무조건 전체 투자 이익이 된다.',
    ],
    correctIndex: 2,
    basisExplanation: '주식의 수익원은 매수가보다 주가가 올랐을 때 파는 시세차익(Capital Gain)과 기업이 한 해 동안 번 순이익의 일부를 주주에게 나누어주는 배당금(Dividend)입니다.',
    commonMisconception: '오개념: "배당금만 받으면 손실이 없다?" → 배당금(예: 1~2%)보다 주가 하락 폭(-10~-20%)이 크면 전체 투자 원금은 큰 손실을 보게 됩니다.',
  },
  {
    id: 4,
    topic: '4. 주식과 채권의 권리 관계',
    question: '주식 투자자와 채권 투자자의 법적 지위 및 권리 관계를 바르게 짝지은 것은?',
    options: [
      '주식: 채권자(돈 빌려준 사람) / 채권: 주주(회사 소유권자)',
      '주식: 주주(기업의 소유권 지분 보유) / 채권: 채권자(원금과 약정 이자를 돌려받을 권리 보유)',
      '주식: 원금 보장 청구권자 / 채권: 경영권 의결권자',
      '주식과 채권 모두 회사가 망해도 국가가 100% 원금을 보장해 준다.',
    ],
    correctIndex: 1,
    basisExplanation: '주식은 회사의 지분(Equity) 증서로 주주는 기업의 공동 주인이 되어 경영 의결권과 이익 배분권을 갖고, 채권은 차용증(Debt)으로 채권자는 약정된 고정 이자와 만기 원금을 상환받을 권리를 갖습니다.',
    commonMisconception: '오개념: "채권은 주식처럼 주주총회에 가서 투표할 수 있다?" → 채권자는 돈을 빌려준 채권자일 뿐 기업의 소유자가 아니므로 경영 의결권이 없습니다.',
  },
  {
    id: 5,
    topic: '5. 펀드와 ETF의 관계 및 위험',
    question: '펀드(Fund)와 ETF(상장지수펀드)에 대한 설명으로 옳지 않은 것은?',
    options: [
      '소액으로도 여러 종목에 나누어 투자하는 분산 투자 효과를 누릴 수 있다.',
      '전문가(자산운용사)가 대신 포트폴리오를 구성하고 운용해 주는 간접 투자 상품이다.',
      'ETF는 주식시장에 상장되어 있어 일반 주식처럼 스마트폰 앱에서 실시간으로 매매할 수 있다.',
      '전문가가 수십 개 종목에 분산하여 운용하므로 원금 손실 위험이 절대 발생하지 않고 예금자보호가 된다.',
    ],
    correctIndex: 3,
    basisExplanation: '펀드와 ETF는 엄연한 실적 배당 상품이므로 시장 전체가 폭락하면 원금 손실이 발생할 수 있으며, 예금자보호법이 적용되지 않습니다. (4번이 옳지 않은 설명)',
    commonMisconception: '오개념: "분산 투자했으니 원금은 100% 안전하다?" → 분산 투자는 개별 기업 부도 위험을 줄여줄 뿐, 거시 경제 위기나 시장 전체 하락으로 인한 원금 손실까지 완전히 없앨 수는 없습니다.',
  },
];

export const Page07ComprehensiveComparison: React.FC<Page07Props> = ({ resetSignal }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'activity' | 'conceptQuiz'>('activity');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Concept Quiz state (5 Questions)
  const [conceptAnswers, setConceptAnswers] = useState<Record<number, number>>({});
  const [conceptRevealed, setConceptRevealed] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    setActiveTab('activity');
    setUserAnswers({});
    setSelectedProduct(null);
    setConceptAnswers({});
    setConceptRevealed({});
  }, [resetSignal]);

  const handleSelectOption = (scenarioId: number, chosen: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [scenarioId]: chosen,
    }));
  };

  const handleSelectConceptOption = (qId: number, optIdx: number) => {
    setConceptAnswers((prev) => ({
      ...prev,
      [qId]: optIdx,
    }));
  };

  const handleToggleRevealConcept = (qId: number) => {
    setConceptRevealed((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const correctCount = SCENARIOS.filter(
    (sc) => userAnswers[sc.id] === sc.targetAnswer
  ).length;

  const conceptCorrectCount = CONCEPT_QUESTIONS.filter(
    (cq) => conceptAnswers[cq.id] === cq.correctIndex
  ).length;

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>UNIT 02 · 7차시 / 금융 자산 종합 정리 & 실전 역량 평가</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "금융상품 8종 종합 비교 & 개념 확인"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          8대 금융상품의 다차원 특징을 비교하고, 5대 개념 퀴즈와 5대 실생활 시나리오 매칭을 완성해 봅시다.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 my-1.5">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 shadow-inner text-xs font-bold">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'activity' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎯 실전 5대 시나리오 매칭 ({correctCount} / 5)
          </button>
          <button
            onClick={() => setActiveTab('conceptQuiz')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'conceptQuiz' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>💡 5대 핵심 개념 확인 퀴즈 ({conceptCorrectCount} / 5)</span>
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'matrix' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 8대 금융상품 종합 비교 매트릭스
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'activity' && (
        /* Scenario Matching Quiz */
        <div className="bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex-1 flex flex-col justify-between my-1">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase">
                  실전 의사결정 활동
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  각 인물의 상황과 자금 목적에 가장 적합한 최선의 금융상품을 골라보세요!
                </span>
              </div>
              <button
                onClick={() => setUserAnswers({})}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>답변 초기화</span>
              </button>
            </div>

            {/* 5 Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 my-2.5">
              {SCENARIOS.map((sc) => {
                const chosen = userAnswers[sc.id];
                const isAnswered = !!chosen;
                const isCorrect = chosen === sc.targetAnswer;

                return (
                  <div
                    key={sc.id}
                    className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'bg-slate-800/90 border-rose-500 ring-2 ring-rose-500/30'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-amber-300">
                          시나리오 0{sc.id} · {sc.person}
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                              isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                            }`}
                          >
                            {isCorrect ? '정답' : '오답'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                        "{sc.situation}"
                      </p>
                    </div>

                    <div className="mt-2.5 space-y-1.5">
                      <div className="grid grid-cols-2 gap-1.5">
                        {sc.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelectOption(sc.id, opt)}
                            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer truncate ${
                              chosen === opt
                                ? opt === sc.targetAnswer
                                  ? 'bg-emerald-500 text-slate-950 font-black'
                                  : 'bg-rose-500 text-white'
                                : 'bg-slate-700/80 hover:bg-slate-600 text-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {isAnswered && (
                        <div className="p-1.5 bg-slate-900/90 rounded-lg border border-slate-700 text-[10px] text-slate-300 leading-tight animate-fade-in">
                          <strong className="text-amber-300 mr-1">[해설]</strong>
                          {sc.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {correctCount === 5 && (
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/60 rounded-2xl flex items-center justify-between animate-fade-in text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-extrabold text-emerald-300">
                  🎉 완벽합니다! 5가지 실전 시나리오를 모두 올바르게 매칭하였습니다.
                </span>
              </div>
              <span className="text-[11px] text-emerald-200">2022 개정 통합사회 금융 자산 역량 달성</span>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: 5대 핵심 개념 확인 퀴즈 (Part A-2 신규) ================= */}
      {activeTab === 'conceptQuiz' && (
        <div className="bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex-1 flex flex-col justify-between my-1 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-500 text-white font-black text-xs rounded-full uppercase">
                  5대 핵심 개념 확인 퀴즈
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  질문 제시 → 학생 생각/토론 → 교사 정답 공개 → 근거와 오개념 해설
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-300">
                  맞춘 문항: {conceptCorrectCount} / 5
                </span>
                <button
                  onClick={() => {
                    setConceptAnswers({});
                    setConceptRevealed({});
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>초기화</span>
                </button>
              </div>
            </div>

            {/* 5 Concept Questions List */}
            <div className="space-y-3 my-2.5">
              {CONCEPT_QUESTIONS.map((cq) => {
                const userChoice = conceptAnswers[cq.id];
                const isSelected = userChoice !== undefined;
                const isRevealed = !!conceptRevealed[cq.id];
                const isCorrect = userChoice === cq.correctIndex;

                return (
                  <div
                    key={cq.id}
                    className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-amber-300 text-xs">
                        {cq.topic}
                      </span>
                      <div className="flex items-center gap-2">
                        {isSelected && !isRevealed && (
                          <span className="text-[10px] text-slate-400">학생 선택 완료 (정답 미공개)</span>
                        )}
                        <button
                          onClick={() => handleToggleRevealConcept(cq.id)}
                          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          {isRevealed ? '해설 닫기 ▲' : '정답 및 해설 공개 ▶'}
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      Q{cq.id}. {cq.question}
                    </h4>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {cq.options.map((opt, optIdx) => {
                        const isThisChosen = userChoice === optIdx;
                        const isThisCorrect = optIdx === cq.correctIndex;

                        let btnStyle = 'bg-slate-700/70 hover:bg-slate-700 text-slate-200';
                        if (isRevealed) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-600 text-white font-black ring-2 ring-emerald-400';
                          } else if (isThisChosen && !isThisCorrect) {
                            btnStyle = 'bg-rose-600 text-white line-through opacity-80';
                          }
                        } else if (isThisChosen) {
                          btnStyle = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-300';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectConceptOption(cq.id, optIdx)}
                            className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${btnStyle}`}
                          >
                            <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {optIdx + 1}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Revealed Explanation Area */}
                    {isRevealed && (
                      <div className="mt-2.5 pt-2 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] animate-fade-in">
                        <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xl space-y-1">
                          <strong className="text-emerald-300 font-bold block flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            정답: {cq.correctIndex + 1}번 — {cq.options[cq.correctIndex]}
                          </strong>
                          <p className="text-slate-200 leading-relaxed">{cq.basisExplanation}</p>
                        </div>

                        <div className="p-2.5 bg-rose-950/50 border border-rose-500/50 rounded-xl space-y-1">
                          <strong className="text-rose-300 font-bold block flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5" />
                            대표적인 학생 오개념 바로잡기:
                          </strong>
                          <p className="text-slate-200 leading-relaxed">{cq.commonMisconception}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
            <span>💡 5대 핵심 개념은 UNIT 03 합리적 자산 관리 의사결정의 기초가 됩니다.</span>
            <span className="text-indigo-300 font-bold">통합사회 개념 완성</span>
          </div>
        </div>
      )}

      {/* ================= TAB 3: 8대 금융상품 종합 비교 매트릭스 ================= */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex-1 flex flex-col justify-between my-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-700 font-extrabold">
                  <th className="py-2 px-3">금융상품</th>
                  <th className="py-2 px-3">주요 목적</th>
                  <th className="py-2 px-3">주요 수익원</th>
                  <th className="py-2 px-3">원금 손실 가능성</th>
                  <th className="py-2 px-3">유동성</th>
                  <th className="py-2 px-3">위험도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCTS_MATRIX.map((p) => {
                  const isHighlighted = selectedProduct === p.name;
                  return (
                    <tr
                      key={p.name}
                      onClick={() => setSelectedProduct(isHighlighted ? null : p.name)}
                      className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                        isHighlighted ? 'bg-blue-100/60 font-bold' : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.badgeColor}`}>
                          {p.name}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-600">{p.purpose}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">{p.revenueSource}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.lossRisk.includes('없음')
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.lossRisk.includes('있음')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.lossRisk}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-700 font-medium">{p.liquidity}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`font-mono font-bold text-xs ${
                            p.riskLevel === '최저' || p.riskLevel === '낮음'
                              ? 'text-emerald-700'
                              : p.riskLevel === '중간'
                              ? 'text-amber-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {p.riskLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>💡 표의 행을 클릭하면 특정 상품이 강조 표시됩니다. (예금자보호한도: 1개 금융기관당 1인당 최고 1억 원)</span>
            <span className="font-semibold text-slate-700">자산 관리의 3대 원칙: 안전성 · 수익성 · 유동성</span>
          </div>
        </div>
      )}

      {/* Unit 2 Completion Celebration Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-amber-400">🎓 UNIT 02 학습 완료:</span>
          <span>금융 자산의 종류와 특징을 모두 마쳤습니다! 다음 UNIT 03에서는 이를 나만의 포트폴리오로 조합하는 '합리적인 자산 관리'를 학습합니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-emerald-400 font-mono">UNIT 02 / 7 PAGES</span>
      </div>
    </div>
  );
};
