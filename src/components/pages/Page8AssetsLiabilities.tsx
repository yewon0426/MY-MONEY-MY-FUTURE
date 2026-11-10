import React, { useState } from 'react';
import { calculateNetWorth, formatManWon } from '../../utils/finance';
import { Scale, HelpCircle, CheckCircle2, ChevronRight, Calculator, AlertCircle } from 'lucide-react';

interface Page8Props {
  resetSignal: number;
}

export const Page8AssetsLiabilities: React.FC<Page8Props> = ({ resetSignal }) => {
  const [showCalculation, setShowCalculation] = useState<boolean>(false);
  const [predictedAmount, setPredictedAmount] = useState<number | null>(null);

  React.useEffect(() => {
    setShowCalculation(false);
    setPredictedAmount(null);
  }, [resetSignal]);

  const assets = [
    { name: '은행 예금', amount: 1000, desc: '비상금 통장 및 적금' },
    { name: '보유 주식', amount: 500, desc: '국내외 우량주 평가액' },
    { name: '자동차', amount: 1500, desc: '현재 중고 시세 평가액' },
  ];

  const liabilities = [
    { name: '자동차 할부 대출', amount: 800, desc: '차량 구매 시 발생한 대출 잔액' },
    { name: '대학 학자금 대출', amount: 500, desc: '한국장학재단 학자금 대출' },
  ];

  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0); // 3000
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0); // 1300
  const netWorthResult = calculateNetWorth(totalAssets * 10000, totalLiabilities * 10000);
  const netWorthMan = totalAssets - totalLiabilities; // 1700

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>재무 상태의 진실 · 회계 기본 등식</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "자산 · 부채 · 순자산"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          가상의 30세 직장인 민우의 재무 상태표를 보고, 진짜 재산(순자산)이 얼마인지 계산해 봅시다.
        </p>
      </div>

      {/* Main Two-Column Balance Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        {/* Left: Total Assets */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  +
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    내가 가진 모든 것
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">자산 (Assets)</h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">자산 총계</span>
                <span className="text-3xl font-black text-blue-700 font-mono">
                  {formatManWon(totalAssets)}
                </span>
              </div>
            </div>

            {/* Assets List */}
            <div className="space-y-3 mt-4">
              {assets.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800 text-base">{item.name}</span>
                    <span className="text-xs text-slate-500 block">{item.desc}</span>
                  </div>
                  <span className="text-xl font-black text-blue-900 font-mono">
                    {formatManWon(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-4 border-t border-slate-100 mt-4">
            ※ 자동차나 집처럼 내 명의로 소유한 모든 물건과 통장의 돈은 일단 '자산'으로 기록됩니다.
          </p>
        </div>

        {/* Right: Liabilities (Debts) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  -
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    남에게 갚아야 할 빚
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">부채 (Liabilities)</h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">부채 총계</span>
                <span className="text-3xl font-black text-rose-600 font-mono">
                  {formatManWon(totalLiabilities)}
                </span>
              </div>
            </div>

            {/* Liabilities List */}
            <div className="space-y-3 mt-4">
              {liabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800 text-base">{item.name}</span>
                    <span className="text-xs text-slate-500 block">{item.desc}</span>
                  </div>
                  <span className="text-xl font-black text-rose-700 font-mono">
                    {formatManWon(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-4 border-t border-slate-100 mt-4">
            ※ 미래에 현금으로 반드시 갚아야 할 법적·경제적 상환 의무를 뜻합니다.
          </p>
        </div>
      </div>

      {/* Interactive Prediction & Reveal Action Area */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        {!showCalculation ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>학생 예상 참여</span>
              </div>
              <h4 className="text-2xl font-extrabold text-white">
                "그렇다면 민우의 실제 진짜 재산(순자산)은 얼마일까요?"
              </h4>
              <p className="text-sm text-slate-300">
                자산 3,000만 원에서 빚 1,300만 원을 고려해 학생들과 함께 답을 맞춰보세요.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[1300, 1700, 3000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setPredictedAmount(amt)}
                  className={`px-4 py-2.5 rounded-xl font-mono font-bold text-sm transition-all cursor-pointer ${
                    predictedAmount === amt
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {formatManWon(amt)}
                </button>
              ))}

              <button
                onClick={() => setShowCalculation(true)}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm shrink-0"
              >
                <Calculator className="w-5 h-5 text-slate-950" />
                <span>순자산 계산 공식 공개하기</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in space-y-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  회계 공식 적용 결과
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  자산 {formatManWon(totalAssets)} − 부채 {formatManWon(totalLiabilities)} = 순자산 {formatManWon(netWorthMan)}
                </h4>
              </div>

              <div className="text-center bg-emerald-950/80 border border-emerald-500/50 rounded-2xl px-6 py-3">
                <span className="text-xs text-emerald-300 font-bold block">진짜 내 재산 (순자산)</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  {formatManWon(netWorthMan)}
                </span>
              </div>
            </div>

            {/* Visual Balance Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-rose-400">부채: 43.3% ({formatManWon(totalLiabilities)})</span>
                <span className="text-emerald-400">순자산: 56.7% ({formatManWon(netWorthMan)})</span>
              </div>
              <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: '43.3%' }} className="bg-rose-500 h-full" title="부채 43.3%" />
                <div style={{ width: '56.7%' }} className="bg-emerald-500 h-full" title="순자산 56.7%" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Teacher Takeaway Banner */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
          💡
        </div>
        <p className="text-slate-800 font-bold text-sm sm:text-base">
          교사용 설명: "자산이 많아 보여도 빚을 함께 고려해야 실제 재산 상태를 파악할 수 있습니다. 겉모습보다 순자산이 튼튼한 사람이 진짜 부자입니다."
        </p>
      </div>
    </div>
  );
};
