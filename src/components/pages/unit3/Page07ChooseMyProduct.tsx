import React, { useState } from 'react';
import {
  UserCheck,
  Sparkles,
  Sliders,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Info,
  ShieldCheck,
  TrendingUp,
  Clock,
  Coins,
  ChevronRight,
} from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page07Props {
  resetSignal: number;
}

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
    rationale: '여행 경비는 사용 시점이 매우 가깝고 절대 줄어들어서는 안 되는 돈이므로, 예금자보호법이 적용되어 원금이 100% 보장되는 6개월 정기적금이나 파킹통장이 가장 합리적입니다.',
    caution: '주식이나 펀드에 넣었다가 6개월 뒤 여행 떠날 때 -20% 손실이 나면 비행기 표를 취소해야 합니다.',
  },
  {
    id: 'B',
    name: '학생 B (서연)',
    avatar: '🌱',
    goal: '10년 뒤 성인이 되어 독립할 때 쓸 종잣돈 1,000만 원 형성',
    timeHorizon: '초장기 (10년 이상 미사용 가능)',
    riskTolerance: '일정한 손실 위험 감수 가능 (수익 추구)',
    emergencyNeed: '긴급 인출 불필요 (여유 자금)',
    recommendedOptions: ['주식형 ETF (S&P500 / KOSPI200)', '우량 배당주 포트폴리오', '적립식 펀드'],
    rationale: '투자 시계가 10년으로 매우 길기 때문에 단기적인 주가 등락 위험을 극복할 수 있습니다. 물가 상승을 뛰어넘는 복리 효과와 자본 증식을 위해 광범위한 지수 추종 ETF나 우량 펀드에 장기 분산 적립하는 것이 현명합니다.',
    caution: '아무리 장기 투자라도 단일 테마주나 급등주에 몰빵하면 기업 상장폐지 위험이 있으므로 반드시 ETF나 펀드로 분산해야 합니다.',
  },
  {
    id: 'C',
    name: '학생 C (준호)',
    avatar: '⚡',
    goal: '갑작스러운 대학 자취 생활비 및 비상 지출 대비 100만 원 보관',
    timeHorizon: '수시 (오늘 밤 당장 쓸 수도 있음)',
    riskTolerance: '손실 위험 극도로 기피',
    emergencyNeed: '수시 체크카드 결제 및 계좌이체 필수 (최고 유동성)',
    recommendedOptions: ['보통예금 (수시입출금 통장)', 'CMA / MMF 파킹통장'],
    rationale: '오늘 밤이라도 당장 편의점 결제나 병원비 이체가 필요하므로 이자율(수익성)보다 "언제든지 뺄 수 있는 유동성"이 절대적으로 중요합니다.',
    caution: '이자 몇 푼 더 받겠다고 1년짜리 정기예금에 묶어두면, 급할 때 해약하여 약정 이자를 손해 보거나 돈을 제때 쓰지 못합니다.',
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
  const [activePersonaId, setActivePersonaId] = useState<'A' | 'B' | 'C'>('A');

  // Custom simulator conditions
  const [customFundAmount, setCustomFundAmount] = useState<number>(100); // 100만 원
  const [customHorizon, setCustomHorizon] = useState<'short' | 'medium' | 'long'>('short');
  const [customRisk, setCustomRisk] = useState<'low' | 'medium' | 'high'>('low');
  const [customEmergency, setCustomEmergency] = useState<boolean>(true);

  // Student choices for personas
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string[]>>({});
  const [revealedAnalysis, setRevealedAnalysis] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setActivePersonaId('A');
    setCustomFundAmount(100);
    setCustomHorizon('short');
    setCustomRisk('low');
    setCustomEmergency(true);
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
      } else {
        return { ...prev, [currentPersona.id]: [...current, prod] };
      }
    });
  };

  const toggleReveal = () => {
    setRevealedAnalysis((prev) => ({
      ...prev,
      [currentPersona.id]: !prev[currentPersona.id],
    }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
          <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>UNIT 03 · 7차시 / 재무 목표와 상황별 맞춤 금융 설계</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "나에게 맞는 금융상품 선택하기"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          단 하나의 정답을 강요하지 않습니다. 목표와 상황 조건에 따라 합리적인 이유를 들어 상품을 골라봅시다.
        </p>
      </div>

      {/* 3 Persona Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1">
        {PERSONAS.map((p) => {
          const isSelected = activePersonaId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePersonaId(p.id)}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{p.avatar}</span>
                <div>
                  <span className={`text-[10px] font-bold block ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    사례 {p.id}
                  </span>
                  <h4 className="font-extrabold text-sm">{p.name}</h4>
                </div>
              </div>
              <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                {isSelected ? '선택됨 ●' : '선택 ▶'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main 12-Col Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left Column (5 cols): Persona Condition & Rationale Check */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentPersona.avatar}</span>
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  {currentPersona.name}의 재무 목표 & 제약 조건
                </span>
              </div>
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                목표 분석
              </span>
            </div>

            {/* Goal card */}
            <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 uppercase block">핵심 재무 목표</span>
              <p className="text-xs font-extrabold text-indigo-950">
                "{currentPersona.goal}"
              </p>
            </div>

            {/* 3 Constraints */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-600 flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  사용 예정 시점:
                </span>
                <span className="font-black text-slate-900">{currentPersona.timeHorizon}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-600 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  손실 감수 능력:
                </span>
                <span className="font-black text-slate-900">{currentPersona.riskTolerance}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-600 flex items-center gap-1 font-bold">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  긴급 자금 필요성:
                </span>
                <span className="font-black text-slate-900">{currentPersona.emergencyNeed}</span>
              </div>
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
            <strong className="block font-bold mb-0.5">💡 열린 사고 교육 원칙:</strong>
            상황에 따라 복수의 조합(예: 보통예금 30% + 적금 70%)도 훌륭한 정답이 될 수 있습니다.
          </div>
        </div>

        {/* Right Column (7 cols): Product Selection & Pedagogical Rationale */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">
                {currentPersona.name}에게 알맞은 금융상품을 골라보세요 (복수 선택 가능):
              </span>
              <button
                onClick={toggleReveal}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                {isRevealed ? '해설 닫기 ▲' : '교사용 추천 해설 보기 ▶'}
              </button>
            </div>

            {/* Product selection grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
              {AVAILABLE_PRODUCTS.map((prod) => {
                const isSelected = userSelected.includes(prod);
                const isRecommended = currentPersona.recommendedOptions.some((rec) => rec.includes(prod.split(' ')[0]));

                return (
                  <button
                    key={prod}
                    onClick={() => handleToggleProduct(prod)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-300 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span className="block truncate">{prod.split(' (')[0]}</span>
                    <span className="text-[10px] opacity-70 block truncate">
                      {prod.includes('(') ? `(${prod.split('(')[1]}` : ''}
                    </span>
                    {isSelected && (
                      <span className="mt-1 text-[10px] text-amber-300 font-black block">선택됨 ✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Revealed Teacher Explanation */}
            {isRevealed && (
              <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-2 text-xs animate-fade-in">
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl space-y-1">
                  <strong className="text-emerald-300 font-bold block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    교사용 추천 상품 및 선택의 근거:
                  </strong>
                  <div className="flex flex-wrap gap-1.5 my-1">
                    {currentPersona.recommendedOptions.map((rec) => (
                      <span key={rec} className="px-2 py-0.5 bg-emerald-600 text-white rounded-lg text-xs font-bold">
                        {rec}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {currentPersona.rationale}
                  </p>
                </div>

                <div className="p-2.5 bg-rose-950/50 border border-rose-500/50 rounded-xl space-y-0.5">
                  <strong className="text-rose-300 font-bold block flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    주의할 점 및 피해야 할 선택:
                  </strong>
                  <p className="text-slate-300 text-[11px] leading-tight">
                    {currentPersona.caution}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
            <span>나만의 포트폴리오를 구성할 때는 언제나 목표와 기한을 먼저 명확히 세웁니다.</span>
            <span className="text-indigo-400 font-bold">Goal-Based Investing</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-indigo-700">💡 수업 지도 팁:</span>
          <span>학생들에게 "왜 그 상품을 골랐는지 근거를 말해보세요"라고 유도하며, 목표 기간과 위험 감수도의 연결 논리를 칭찬해 주세요.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">자기주도적 의사결정</span>
      </div>
    </div>
  );
};
