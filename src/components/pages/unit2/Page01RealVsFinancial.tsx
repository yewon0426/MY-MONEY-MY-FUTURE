import React, { useState, useEffect } from 'react';
import {
  Building,
  Coins,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
} from 'lucide-react';

interface Page01Props {
  resetSignal: number;
}

interface AssetItem {
  id: string;
  name: string;
  category: 'financial' | 'real';
  shortDesc: string;
  explanation: string;
}

const ASSET_ITEMS: AssetItem[] = [
  {
    id: '1',
    name: '정기예금 통장',
    category: 'financial',
    shortDesc: '은행에 맡긴 1,000만 원 예금',
    explanation: '은행에 원금과 약정 이자를 돌려달라고 요구할 수 있는 금융상의 청구권입니다.',
  },
  {
    id: '2',
    name: '아파트 (부동산)',
    category: 'real',
    shortDesc: '내가 거주하는 30평 아파트',
    explanation: '주거 공간으로서 물리적 실체와 사용 가치를 지닌 대표적인 실물 자산입니다.',
  },
  {
    id: '3',
    name: '기업 주식',
    category: 'financial',
    shortDesc: '삼성전자 주식 50주',
    explanation: '기업 소유 지분을 나타내며 배당과 시세차익을 청구할 수 있는 금융 증권입니다.',
  },
  {
    id: '4',
    name: '자가용 자동차',
    category: 'real',
    shortDesc: '출퇴근용 준중형 승용차',
    explanation: '이동 수단이라는 물리적 형태와 사용 효용을 지닌 실물 자산입니다.',
  },
  {
    id: '5',
    name: '정부 국채 (채권)',
    category: 'financial',
    shortDesc: '대한민국 국고채 3년물',
    explanation: '국가에 자금을 빌려주고 원리금 상환을 약속받은 채무 증권(금융 자산)입니다.',
  },
  {
    id: '6',
    name: '글로벌 ETF (펀드)',
    category: 'financial',
    shortDesc: '미국 S&P500 지수 추종 ETF',
    explanation: '여러 자산에 간접 투자해 운용 수익을 배분받는 금융 상품입니다.',
  },
  {
    id: '7',
    name: '순금 골드바 (100g)',
    category: 'real',
    shortDesc: '귀금속 실물 금괴',
    explanation: '금이라는 원자재 자체의 물리적 실체와 희소 가치를 지닌 실물 자산입니다. (단, 금 ETF는 금융 자산!)',
  },
  {
    id: '8',
    name: '5만 원권 지폐 (현금)',
    category: 'financial',
    shortDesc: '지갑 속 현금 50만 원',
    explanation: '종이 자체가 아니라 한국은행과 국가 신용이 보증하는 화폐·금융 자산입니다.',
  },
];

export const Page01RealVsFinancial: React.FC<Page01Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<'concept' | 'quiz'>('concept');
  const [showCashAnswer, setShowCashAnswer] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, 'financial' | 'real'>>({});

  useEffect(() => {
    setActiveStep('concept');
    setShowCashAnswer(false);
    setCurrentIdx(0);
    setAnswers({});
  }, [resetSignal]);

  const currentItem = ASSET_ITEMS[currentIdx];
  const chosen = answers[currentItem.id];
  const isCorrect = chosen === currentItem.category;
  const correctCount = ASSET_ITEMS.filter((item) => answers[item.id] === item.category).length;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & Step Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-800">
            <span>UNIT 02</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 1</span>
            <span aria-hidden="true">·</span>
            <span>자산의 두 가지 얼굴</span>
          </div>
          <h2 className="text-[42px] xl:text-[48px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            금융 자산과 실물 자산
          </h2>
        </div>

        <nav className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveStep('concept')}
            className={`min-h-[60px] px-6 py-3 rounded-xl text-[22px] font-black cursor-pointer whitespace-nowrap ${
              activeStep === 'concept' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            STEP 1. 개념 비교 &amp; 현금의 비밀
          </button>
          <button
            type="button"
            onClick={() => setActiveStep('quiz')}
            className={`min-h-[60px] px-6 py-3 rounded-xl text-[22px] font-black cursor-pointer whitespace-nowrap ${
              activeStep === 'quiz' ? 'bg-slate-900 text-white shadow-md' : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            STEP 2. 8대 자산 분류 활동 ({Object.keys(answers).length}/8)
          </button>
        </nav>
      </div>

      {/* STEP 1 */}
      {activeStep === 'concept' && (
        <div className="flex-1 flex flex-col gap-6 justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 items-stretch">
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Coins className="w-8 h-8" />
                  </div>
                  <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                    금융 자산 (Financial Asset)
                  </h3>
                </div>
                <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                  물리적 사용 가치는 없지만, 은행·기업에 <strong className="text-blue-700">돈이나 이익을 요구할 수 있는 법적 권리(청구권)</strong>입니다.
                </p>
                <p className="text-[22px] font-bold text-blue-900 bg-blue-50 p-5 rounded-2xl border border-blue-200">
                  대표 예시: 현금, 보통·정기예금, 적금, 주식, 채권, 펀드, ETF
                </p>
              </div>
              <p className="text-[22px] font-bold text-slate-700">
                장점: 거래·보관이 편리하고 현금화가 쉬움 (단, 투자 상품은 원금 손실 가능)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Building className="w-8 h-8" />
                  </div>
                  <h3 className="text-[30px] xl:text-[34px] font-black text-slate-900">
                    실물 자산 (Real Asset)
                  </h3>
                </div>
                <p className="text-[24px] xl:text-[26px] font-semibold text-slate-800 leading-relaxed">
                  눈에 보이는 형체를 가지고, <strong className="text-amber-800">물건 자체의 사용 가치와 희소성</strong>으로 가치가 정해지는 자산입니다.
                </p>
                <p className="text-[22px] font-bold text-amber-950 bg-amber-50 p-5 rounded-2xl border border-amber-200">
                  대표 예시: 아파트·토지(부동산), 자동차, 순금 골드바, 원자재
                </p>
              </div>
              <p className="text-[22px] font-bold text-slate-700">
                장점: 물가 상승 방어 효과 (단, 관리·보관 비용이 들고 현금화가 느림)
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 text-amber-300 text-[22px] font-black">
                <HelpCircle className="w-7 h-7" />
                <span>가장 많이 틀리는 질문</span>
              </div>
              <p className="text-[26px] xl:text-[30px] font-black text-white">
                &ldquo;5만 원권 지폐(현금)는 만질 수 있으니까 실물 자산일까요?&rdquo;
              </p>
              {showCashAnswer && (
                <p className="text-[22px] font-semibold text-emerald-300 pt-2 leading-relaxed">
                  아닙니다! 지폐는 종이 원가가 아니라 한국은행과 국가 신용이 보증하는 약속 증서이므로 <strong className="text-white">화폐·금융 자산</strong>으로 분류합니다.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowCashAnswer(!showCashAnswer)}
              className="min-h-[64px] px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl cursor-pointer shrink-0"
            >
              {showCashAnswer ? '해설 접기' : '정답 해설 공개'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {activeStep === 'quiz' && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[26px] font-black text-amber-300">
                자산 분류 퀴즈 ({currentIdx + 1} / {ASSET_ITEMS.length})
              </span>
              <span className="text-[22px] font-bold text-slate-300 tabular-nums">
                · 맞춘 개수: {correctCount} / {ASSET_ITEMS.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {ASSET_ITEMS.map((item, idx) => {
                const ans = answers[item.id];
                let btnColor = 'bg-slate-800 text-slate-300';
                if (idx === currentIdx) btnColor = 'bg-amber-400 text-slate-950';
                else if (ans) btnColor = ans === item.category ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`min-h-[48px] w-12 rounded-xl font-black text-[20px] cursor-pointer ${btnColor}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setCurrentIdx(0);
                }}
                className="min-h-[48px] px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-[20px] flex items-center gap-1.5 cursor-pointer ml-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>초기화</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col gap-6 flex-1 justify-center">
            <div className="space-y-2 text-center">
              <span className="text-[22px] font-bold text-slate-300 block">{currentItem.shortDesc}</span>
              <h3 className="text-[40px] xl:text-[46px] font-black text-white">{currentItem.name}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl w-full mx-auto">
              <button
                type="button"
                onClick={() => setAnswers((p) => ({ ...p, [currentItem.id]: 'financial' }))}
                className={`min-h-[72px] rounded-2xl font-black text-[28px] cursor-pointer transition-all ${
                  chosen === 'financial'
                    ? isCorrect
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                금융 자산
              </button>
              <button
                type="button"
                onClick={() => setAnswers((p) => ({ ...p, [currentItem.id]: 'real' }))}
                className={`min-h-[72px] rounded-2xl font-black text-[28px] cursor-pointer transition-all ${
                  chosen === 'real'
                    ? isCorrect
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                실물 자산
              </button>
            </div>

            {chosen && (
              <div
                className={`max-w-4xl mx-auto w-full p-6 rounded-2xl border-2 flex items-start gap-4 text-[24px] font-bold ${
                  isCorrect
                    ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100'
                    : 'bg-rose-950/70 border-rose-400 text-rose-100'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-400 shrink-0 mt-1" />
                )}
                <div>
                  <span className="font-black block mb-1">
                    {isCorrect ? '정답입니다! ' : '다시 확인해 보세요! '}
                    (정답: {currentItem.category === 'financial' ? '금융 자산' : '실물 자산'})
                  </span>
                  <span className="font-medium text-slate-100">{currentItem.explanation}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              className="min-h-[60px] px-7 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-white font-black text-[22px] cursor-pointer"
            >
              이전 자산
            </button>
            <button
              type="button"
              disabled={currentIdx === ASSET_ITEMS.length - 1}
              onClick={() => setCurrentIdx((i) => Math.min(ASSET_ITEMS.length - 1, i + 1))}
              className="min-h-[60px] px-7 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-35 text-slate-950 font-black text-[22px] cursor-pointer"
            >
              다음 자산
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
