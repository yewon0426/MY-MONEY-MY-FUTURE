import React, { useState } from 'react';
import {
  Layers,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Building,
  Coins,
} from 'lucide-react';

interface Page01Props {
  resetSignal: number;
}

interface AssetItem {
  id: string;
  name: string;
  category: 'financial' | 'real';
  icon: string;
  shortDesc: string;
  explanation: string;
}

const ASSET_ITEMS: AssetItem[] = [
  {
    id: '1',
    name: '정기예금 통장',
    category: 'financial',
    icon: '🏦',
    shortDesc: '은행에 맡긴 1,000만 원 예금',
    explanation: '은행에 원금과 약정 이자를 돌려달라고 요구할 수 있는 금융상의 "청구권"입니다.',
  },
  {
    id: '2',
    name: '아파트 (부동산)',
    category: 'real',
    icon: '🏢',
    shortDesc: '내가 거주하는 30평 아파트',
    explanation: '주거 공간으로서의 물리적 실체와 사용 가치를 직접 지닌 대표적인 "실물 자산"입니다.',
  },
  {
    id: '3',
    name: '기업 주식',
    category: 'financial',
    icon: '📈',
    shortDesc: '삼성전자 주식 50주',
    explanation: '기업의 소유 지분을 나타내며 배당과 시세차익을 청구할 수 있는 "금융 증권"입니다.',
  },
  {
    id: '4',
    name: '자가용 자동차',
    category: 'real',
    icon: '🚗',
    shortDesc: '출퇴근용 준중형 승용차',
    explanation: '이동 수단이라는 물리적 형태와 사용 효용을 지닌 내구재 "실물 자산"입니다.',
  },
  {
    id: '5',
    name: '정부 국채 (채권)',
    category: 'financial',
    icon: '📜',
    shortDesc: '대한민국 국고채 3년물',
    explanation: '국가에 자금을 대여하고 원리금 상환을 약속받은 법적 "채무 증권"입니다.',
  },
  {
    id: '6',
    name: '글로벌 ETF (펀드)',
    category: 'financial',
    icon: '🌐',
    shortDesc: '미국 S&P500 지수 추종 ETF',
    explanation: '여러 자산에 간접 투자하여 발생한 운용 수익을 배분받을 수 있는 "금융 상품"입니다.',
  },
  {
    id: '7',
    name: '순금 골드바 (100g)',
    category: 'real',
    icon: '🪙',
    shortDesc: '귀금속 실물 금괴',
    explanation: '금이라는 희소한 원자재 자체의 물리적 실체와 내재적 가치를 지닌 "실물 자산"입니다.',
  },
  {
    id: '8',
    name: '5만 원권 지폐 (현금)',
    category: 'financial',
    icon: '💵',
    shortDesc: '지갑 속 현금 50만 원',
    explanation: '종이 자체의 실물 가치가 아니라 한국은행의 신용에 기반한 특수한 "화폐·금융 자산"입니다!',
  },
];

export const Page01RealVsFinancial: React.FC<Page01Props> = ({ resetSignal }) => {
  const [classifications, setClassifications] = useState<Record<string, 'financial' | 'real'>>({});
  const [activeItem, setActiveItem] = useState<AssetItem | null>(null);
  const [showCashNote, setShowCashNote] = useState<boolean>(false);

  React.useEffect(() => {
    setClassifications({});
    setActiveItem(null);
    setShowCashNote(false);
  }, [resetSignal]);

  const handleClassify = (item: AssetItem, chosenCategory: 'financial' | 'real') => {
    setClassifications((prev) => ({
      ...prev,
      [item.id]: chosenCategory,
    }));
    setActiveItem(item);
  };

  const completedCount = Object.keys(classifications).length;

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 1차시 / 자산의 본질 탐구</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "금융 자산과 실물 자산"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          자산의 두 축인 '금융상의 권리(청구권)'와 '물리적 실체'를 구분해 봅시다.
        </p>
      </div>

      {/* 2 Bucket Drop Targets Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {/* Financial Assets Bucket */}
        <div className="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    권리와 청구권 중심
                  </span>
                  <h3 className="text-xl font-black text-slate-900">금융 자산 (Financial Asset)</h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                예금 · 주식 · 채권 · 펀드 · 현금
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              자체적으로 물리적 사용 가치는 없지만, 은행이나 기업 등 타인에게 <strong>돈이나 미래의 이익을 청구할 수 있는 법적 권리(청구권)</strong>를 나타내는 자산입니다.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-blue-900 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>장점: 유동성이 높고 보관 및 거래가 편리함 / 주의: 인플레이션 시 실질 가치 하락</span>
          </div>
        </div>

        {/* Real Assets Bucket */}
        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    물리적 형태와 내재 가치
                  </span>
                  <h3 className="text-xl font-black text-slate-900">실물 자산 (Real Asset)</h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
                부동산 · 자동차 · 금(골드바) · 원자재
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              형체(물리적 실체)를 가지고 있으며, 살거나 운전하는 등 <strong>그 물건 자체의 물리적 사용 가치와 희소성</strong>에 의해 가치가 결정되는 자산입니다.
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-amber-900 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>장점: 물가 상승(인플레이션) 헤지 효과 / 주의: 감가상각, 관리비 발생, 유동성 낮음</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Classification Activity Area */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 my-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full uppercase">
              실전 교실 활동
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              아래 8가지 자산을 터치하여 알맞은 자산 유형으로 분류해 보세요! ({completedCount} / 8 완료)
            </span>
          </div>
          <button
            onClick={() => setClassifications({})}
            className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>분류 초기화</span>
          </button>
        </div>

        {/* 8 Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ASSET_ITEMS.map((item) => {
            const chosen = classifications[item.id];
            const isCorrect = chosen === item.category;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                  chosen
                    ? isCorrect
                      ? 'bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-800/90 border-rose-500 ring-2 ring-rose-500/30'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    {chosen && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                        }`}
                      >
                        {isCorrect ? '정답' : '오답'}
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm text-white truncate">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{item.shortDesc}</p>
                </div>

                {/* 2 Choice Buttons */}
                <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                  <button
                    onClick={() => handleClassify(item, 'financial')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      chosen === 'financial'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700/80 hover:bg-blue-600/60 text-slate-200'
                    }`}
                  >
                    금융 자산
                  </button>
                  <button
                    onClick={() => handleClassify(item, 'real')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      chosen === 'real'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-700/80 hover:bg-amber-500/60 text-slate-200'
                    }`}
                  >
                    실물 자산
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Item Explanation Feedback Toast */}
        {activeItem && (
          <div className="mt-3 p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeItem.icon}</span>
              <div>
                <strong className="text-amber-300 font-bold mr-1">
                  [{activeItem.name}] 해설:
                </strong>
                <span className="text-slate-200">{activeItem.explanation}</span>
              </div>
            </div>
            <span
              className={`font-black px-2 py-0.5 rounded text-xs shrink-0 ${
                classifications[activeItem.id] === activeItem.category
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-rose-500 text-white'
              }`}
            >
              정답: {activeItem.category === 'financial' ? '금융 자산' : '실물 자산'}
            </span>
          </div>
        )}
      </div>

      {/* Special Classroom In-depth Insight: Is Cash a Real Asset? */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
            !
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase block">
              학생들이 가장 헷갈려하는 1순위 오답
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-900">
              "지폐(현금)는 손으로 만질 수 있는 실물이니까 실물 자산 아닌가요?"
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCashNote(!showCashNote)}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
        >
          {showCashNote ? '해설 접기' : '교사용 핵심 해설 확인'}
        </button>
      </div>

      {showCashNote && (
        <div className="bg-white border border-amber-300 rounded-2xl p-4 text-xs text-slate-700 space-y-1 animate-fade-in shadow-md">
          <strong className="text-indigo-900 font-bold block text-sm">
            💡 화폐 자산(현금)의 경제학적 정의
          </strong>
          <p className="leading-relaxed">
            지폐는 물리적으로는 종이 조각에 불과합니다. 지폐 한 장으로 5만 원어치 음식을 살 수 있는 이유는 종이 자체의 원자재 가치가 아니라, <strong>국가 중앙은행(한국은행)의 신용과 법적 강제통용력</strong>이 부여된 금융상의 약속이기 때문입니다. 따라서 경제학에서는 현금을 실물 자산이 아닌 <strong>화폐·금융 자산</strong>으로 분류합니다.
          </p>
        </div>
      )}
    </div>
  );
};
