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
} from 'lucide-react';

interface Page07Props {
  resetSignal: number;
}

interface ProductInfo {
  name: string;
  category: string;
  purpose: string;
  revenueSource: string;
  lossRisk: '없음 (예금자보호)' | '있음 (원금 손실 가능)' | '신용위험 시 존재' | '해약 시 손실 가능';
  liquidity: '매우 높음' | '매우 높음 (ETF 기준)' | '보통' | '낮음 (중도해지 불리)' | '매우 낮음 (만기/은퇴 시)';
  riskLevel: '최저' | '낮음' | '중간' | '높음' | '매우 높음';
  badgeColor: string;
}

const PRODUCTS_MATRIX: ProductInfo[] = [
  {
    name: '보통예금',
    category: '예금',
    purpose: '일상 생활비 관리 및 비상금 보관',
    revenueSource: '이자 (연 0.1% 내외)',
    lossRisk: '없음 (예금자보호)',
    liquidity: '매우 높음',
    riskLevel: '최저',
    badgeColor: 'bg-slate-100 text-slate-800',
  },
  {
    name: '정기적금',
    category: '예금',
    purpose: '매달 일정액 저축하여 종잣돈(목돈) 만들기',
    revenueSource: '약정 이자 (연 3~4%)',
    lossRisk: '없음 (예금자보호)',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '최저',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    name: '정기예금',
    category: '예금',
    purpose: '이미 모은 목돈을 안전하게 굴리기',
    revenueSource: '약정 이자 (연 3~4%)',
    lossRisk: '없음 (예금자보호)',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '최저',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: '주식 (Stock)',
    category: '투자',
    purpose: '기업 지분 취득 및 고수익 추구',
    revenueSource: '시세차익 + 배당금',
    lossRisk: '있음 (원금 손실 가능)',
    liquidity: '매우 높음',
    riskLevel: '매우 높음',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    name: '채권 (Bond)',
    category: '투자',
    purpose: '정부·기업 대여 및 안정적 고정이자 수취',
    revenueSource: '약정 표면이자 + 매매차익',
    lossRisk: '신용위험 시 존재',
    liquidity: '보통',
    riskLevel: '낮음',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    name: '펀드 / ETF',
    category: '투자',
    purpose: '소액 분산 투자 및 전문가 간접 운용',
    revenueSource: '운용 실적 배당 + 시세차익',
    lossRisk: '있음 (원금 손실 가능)',
    liquidity: '매우 높음 (ETF 기준)',
    riskLevel: '중간',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: '보험 (Insurance)',
    category: '보장',
    purpose: '질병·사고 발생 시 치명적 경제 파산 방지',
    revenueSource: '보험금 (사고 시 지급)',
    lossRisk: '해약 시 손실 가능',
    liquidity: '낮음 (중도해지 불리)',
    riskLevel: '낮음',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    name: '연금 (Pension)',
    category: '노후',
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
    situation: '6개월 뒤 방학에 친구들과 갈 여행 경비 100만 원을 매달 15만 원씩 모으려고 한다. 절대 원금을 잃어서는 안 된다!',
    targetAnswer: '정기적금',
    options: ['정기적금', '개별 주식', '미국 ETF', '개인연금'],
    explanation: '정기적금은 목표 기한이 6개월로 짧고, 매달 나누어 불입하여 목돈을 만들며, 원금이 100% 안전하게 보장되므로 최적입니다.',
  },
  {
    id: 2,
    person: '30대 직장인 지현',
    situation: '지금부터 25년 뒤 정년퇴직을 한 후, 매달 노후 생활비가 안정적으로 통장에 들어오도록 세제 혜택을 받으며 모으고 싶다.',
    targetAnswer: '개인연금',
    options: ['보통예금', '개인연금', '단기 회사채', '자동차 구매'],
    explanation: '연금(개인연금·퇴직연금)은 초장기 복리 운용과 연말정산 세액공제 혜택을 누리며 은퇴 후 평생 월급을 만드는 최고의 노후 수단입니다.',
  },
  {
    id: 3,
    person: '청년 투자자 준호',
    situation: '단기간에 원금이 20~30% 손실될 위험을 충분히 감수할 수 있으며, 미래 인공지능 혁신 기업의 폭발적 성장에 베팅해 고수익을 원한다.',
    targetAnswer: '주식 (Stock)',
    options: ['정기예금', '주식 (Stock)', '국채 (3년물)', '국민연금'],
    explanation: '원금 손실 위험(High Risk)을 감수하고 기업의 성장 과실(시세차익 및 배당)을 직접 누리는 전형적인 직접 지분 투자입니다.',
  },
  {
    id: 4,
    person: '가장 성민',
    situation: '만약 암이나 중대 질병에 걸려 3천만 원 이상의 수술비와 치료비가 나와 가족의 전 재산이 날아가는 비극을 방어하고 싶다.',
    targetAnswer: '보험 (Insurance)',
    options: ['주식 (Stock)', '정기적금', '보험 (Insurance)', 'ETF'],
    explanation: '보험은 상부상조의 원리로 적은 보험료를 내고, 불의의 거대한 질병·사고 발생 시 목돈의 보험금을 받아 가계 파산을 막는 안전벨트입니다.',
  },
];

export const Page07ComprehensiveComparison: React.FC<Page07Props> = ({ resetSignal }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'activity'>('activity');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveTab('activity');
    setUserAnswers({});
    setSelectedProduct(null);
  }, [resetSignal]);

  const handleSelectOption = (scenarioId: number, chosen: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [scenarioId]: chosen,
    }));
  };

  const correctCount = SCENARIOS.filter(
    (sc) => userAnswers[sc.id] === sc.targetAnswer
  ).length;

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>UNIT 02 · 7차시 / 금융상품 종합 정리 & 실전 역량 평가</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "금융상품 8종 종합 비교 & 실전 매칭"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          8대 금융상품의 다차원 특징을 비교하고, 실생활 4대 시나리오에 적합한 상품을 골라봅시다.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center gap-3 my-2">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎯 실전 4대 시나리오 매칭 퀴즈 ({correctCount} / 4 완료)
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 8대 금융상품 종합 비교 매트릭스
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'activity' ? (
        /* Scenario Matching Quiz */
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex-1 flex flex-col justify-between my-2">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase">
                  실전 의사결정 활동
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  각 인물의 상황과 자금 목적에 가장 적합한 최선의 금융상품을 골라보세요!
                </span>
              </div>
              <button
                onClick={() => setUserAnswers({})}
                className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>답변 초기화</span>
              </button>
            </div>

            {/* 4 Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              {SCENARIOS.map((sc) => {
                const chosen = userAnswers[sc.id];
                const isAnswered = !!chosen;
                const isCorrect = chosen === sc.targetAnswer;

                return (
                  <div
                    key={sc.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'bg-slate-800/90 border-rose-500 ring-2 ring-rose-500/30'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold text-amber-300">
                          시나리오 0{sc.id} · {sc.person}
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded ${
                              isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                            }`}
                          >
                            {isCorrect ? '정답' : '오답'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        "{sc.situation}"
                      </p>
                    </div>

                    {/* Options */}
                    <div className="mt-3 space-y-1.5">
                      <div className="grid grid-cols-2 gap-1.5">
                        {sc.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelectOption(sc.id, opt)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
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

                      {/* Explanation toast */}
                      {isAnswered && (
                        <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-700 text-[11px] text-slate-300 leading-tight animate-fade-in">
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

          {/* Success Banner if all 4 correct */}
          {correctCount === 4 && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/60 rounded-2xl flex items-center justify-between animate-fade-in text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-extrabold text-emerald-300">
                  🎉 완벽합니다! 4가지 실전 시나리오를 모두 올바르게 매칭하였습니다.
                </span>
              </div>
              <span className="text-[11px] text-emerald-200">2022 개정 통합사회 금융 역량 달성</span>
            </div>
          )}
        </div>
      ) : (
        /* Comprehensive Matrix Table */
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex-1 flex flex-col justify-between my-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-700 font-extrabold">
                  <th className="py-2.5 px-3">금융상품</th>
                  <th className="py-2.5 px-3">주요 목적</th>
                  <th className="py-2.5 px-3">주요 수익원</th>
                  <th className="py-2.5 px-3">원금 손실 가능성</th>
                  <th className="py-2.5 px-3">유동성</th>
                  <th className="py-2.5 px-3">위험도</th>
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

          <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>💡 표의 행을 클릭하면 특정 상품이 강조 표시됩니다.</span>
            <span className="font-semibold text-slate-700">자산 관리의 3대 원칙: 안전성 · 수익성 · 유동성</span>
          </div>
        </div>
      )}

      {/* Unit 2 Completion Celebration Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-amber-400">🎓 UNIT 02 학습 완료:</span>
          <span>금융 자산의 종류와 특징을 모두 마쳤습니다! 다음 UNIT 03에서는 이를 나만의 포트폴리오로 조합하는 '합리적인 자산 관리'를 학습합니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-emerald-400 font-mono">18 / 18 PAGES</span>
      </div>
    </div>
  );
};
