import React, { useState, useEffect } from 'react';
import { Eye, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { calculatePurchasingPower, formatWon } from '../../../utils/finance';

interface Page01Props {
  resetSignal: number;
}

type PredictionChoice = 'same' | 'less' | 'more' | null;

const BASKET_ITEMS = [
  { name: '김밥·분식 세트', unitPrice: 5000, countLabel: '200회' },
  { name: '시내버스·지하철', unitPrice: 1500, countLabel: '666회' },
  { name: '참고서·도서', unitPrice: 20000, countLabel: '50권' },
  { name: '영화 관람권', unitPrice: 15000, countLabel: '66회' },
];

export const Page01MoneyValueChange: React.FC<Page01Props> = ({ resetSignal }) => {
  const [prediction, setPrediction] = useState<PredictionChoice>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(3.5);

  useEffect(() => {
    setPrediction(null);
    setRevealed(false);
    setInflationRate(3.5);
  }, [resetSignal]);

  const power5y = calculatePurchasingPower(1000000, inflationRate, 5);
  const erosionPct = power5y.purchasingPowerLossPercent;
  const basketRatioPercent = Math.round((100 - erosionPct) * 10) / 10;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 1</span>
            <span aria-hidden="true">·</span>
            <span>금융 환경 변화 도입</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            같은 돈 100만 원, 5년 뒤에도 가치가 같을까?
          </h2>
        </div>

        <div className="bg-amber-50 border border-amber-200 px-5 py-2.5 rounded-2xl text-[19px] font-extrabold text-amber-900 shrink-0">
          핵심 질문: 지폐 숫자는 그대로인데 살 수 있는 양은 왜 달라질까?
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Today vs 5 Years Later Prediction */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[22px] font-black text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
                오늘의 100만 원 장바구니
              </span>
              <span className="font-mono text-[22px] font-black text-blue-700 bg-blue-50 px-3.5 py-1 rounded-xl">
                1,000,000원
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {BASKET_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4"
                >
                  <div className="text-[20px] font-black text-slate-900">{item.name}</div>
                  <div className="text-[18px] text-slate-600 font-bold mt-1">
                    개당 {item.unitPrice.toLocaleString('ko-KR')}원 →{' '}
                    <span className="text-blue-700 font-black">{item.countLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Buttons */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
            <div className="text-[21px] font-black text-amber-300">
              학생 예측: 이 100만 원을 서랍에 5년 보관하면?
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'same' as const, label: '① 5년 뒤에도 똑같은 양을 살 수 있다' },
                { id: 'less' as const, label: '② 물가가 올라 지금보다 더 적게 산다' },
                { id: 'more' as const, label: '③ 시간이 지났으니 더 많이 살 수 있다' },
              ].map((opt) => {
                const isSelected = prediction === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPrediction(opt.id)}
                    className={`min-h-[54px] px-4 py-2.5 rounded-xl text-left text-[19px] font-bold transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={!prediction}
              className="w-full min-h-[56px] bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-[21px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Eye className="w-6 h-6" />
              <span>{revealed ? '결과 확인 완료' : '예측 후 5년 뒤 가치 공개하기'}</span>
            </button>
          </div>
        </div>

        {/* Right: Visual Purchasing Power Comparison */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          {!revealed ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 gap-4">
              <Sparkles className="w-14 h-14 text-amber-500" />
              <div className="text-[28px] font-black text-slate-800">
                왼쪽에서 먼저 학생들의 예측을 선택해 주세요
              </div>
              <p className="text-[22px] text-slate-600 font-bold max-w-xl leading-relaxed">
                지폐에 인쇄된 1,000,000원이라는 숫자는 변하지 않지만,
                경제 환경(물가·금리·환율)에 따라 돈이 실제로 살 수 있는 힘은 달라집니다.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between gap-4">
              {/* Rate selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5">
                <span className="text-[20px] font-black text-slate-800">
                  가정 연평균 물가상승률
                </span>
                <div className="flex items-center gap-2">
                  {[2.0, 3.5, 5.0].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setInflationRate(rate)}
                      className={`min-h-[46px] px-4 py-1.5 rounded-xl text-[19px] font-black transition-all cursor-pointer ${
                        inflationRate === rate
                          ? 'bg-amber-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      연 {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[20px] font-extrabold text-blue-800">
                    5년 뒤 통장/서랍 속 숫자 (명목 가치)
                  </span>
                  <div className="font-mono text-[40px] font-black text-blue-700 tabular-nums my-2">
                    1,000,000원
                  </div>
                  <p className="text-[19px] font-bold text-slate-700">
                    지폐 액면 금액 그대로 100만 원 (100% 유지)
                  </p>
                </div>

                <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[20px] font-extrabold text-rose-800">
                    5년 뒤 실제 살 수 있는 힘 (실질 가치)
                  </span>
                  <div className="font-mono text-[40px] font-black text-rose-700 tabular-nums my-2">
                    {formatWon(power5y.realPurchasingPowerWon)}
                  </div>
                  <p className="text-[19px] font-bold text-rose-900">
                    구매력이 약 <span className="font-black">-{erosionPct}%</span> 하락 (체감 감소)
                  </p>
                </div>
              </div>

              {/* Visual Bar Chart */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-[20px] font-black text-slate-800">
                  <span>실질 구매력 비교 그래프 (오늘 100% 기준)</span>
                  <span className="font-mono text-rose-700">
                    현재 가격 물건 {basketRatioPercent}% 분량만 구매 가능
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[18px] font-bold text-slate-700 mb-1">
                      <span>오늘의 100만 원 구매력</span>
                      <span className="font-mono font-black">100.0%</span>
                    </div>
                    <div className="h-7 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[18px] font-bold text-slate-700 mb-1">
                      <span>5년 뒤 현금 100만 원 구매력 (물가 연 {inflationRate}% 가정)</span>
                      <span className="font-mono font-black text-rose-700">
                        {basketRatioPercent}%
                      </span>
                    </div>
                    <div className="h-7 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${basketRatioPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Takeaway */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="text-[20px] font-bold leading-snug">
                  <span className="text-amber-300 font-black">정답 ② 물가가 올라 더 적게 삽니다!</span>{' '}
                  현금의 액면 숫자가 같아도 <span className="text-emerald-300 font-black">물가·금리·환율</span>이 변하면 내 자산의 실질 가치가 바뀝니다.
                </div>
                <ArrowRight className="w-7 h-7 text-amber-300 shrink-0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
