import React, { useState, useEffect } from 'react';
import { Flame, ShoppingCart, AlertCircle } from 'lucide-react';
import { calculatePurchasingPower, formatWon } from '../../../utils/finance';

interface Page04Props {
  resetSignal: number;
}

export const Page04InflationPurchasingPower: React.FC<Page04Props> = ({ resetSignal }) => {
  const [monthlyBudgetMan, setMonthlyBudgetMan] = useState<number>(100);
  const [inflationRate, setInflationRate] = useState<number>(4.0);
  const [years, setYears] = useState<number>(10);

  useEffect(() => {
    setMonthlyBudgetMan(100);
    setInflationRate(4.0);
    setYears(10);
  }, [resetSignal]);

  const result = calculatePurchasingPower(monthlyBudgetMan * 10000, inflationRate, years);
  const basketRatioPercent = Math.round((100 - result.purchasingPowerLossPercent) * 10) / 10;
  const totalCarts = 10;
  const filledCarts = Math.max(1, Math.round((basketRatioPercent / 100) * totalCarts));

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 4</span>
            <span aria-hidden="true">·</span>
            <span>인플레이션 체험 시뮬레이터</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            물가 상승(인플레이션)과 실질 구매력의 변화
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {[
            { label: '안정 물가 (2%)', rate: 2.0, yrs: 10 },
            { label: '중간 물가 (4%)', rate: 4.0, yrs: 10 },
            { label: '고물가 장기 (6% · 15년)', rate: 6.0, yrs: 15 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setInflationRate(preset.rate);
                setYears(preset.yrs);
              }}
              className="min-h-[48px] px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-[18px] cursor-pointer whitespace-nowrap"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Controls */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-[21px] font-black text-slate-900 mb-2">
                <label htmlFor="u4-p4-budget">현재 한 달 생활비</label>
                <span className="font-mono text-blue-700">{monthlyBudgetMan}만 원</span>
              </div>
              <input
                id="u4-p4-budget"
                type="range"
                min={50}
                max={300}
                step={10}
                value={monthlyBudgetMan}
                onChange={(e) => setMonthlyBudgetMan(Number(e.target.value))}
                className="w-full h-3 accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[21px] font-black text-slate-900 mb-2">
                <label htmlFor="u4-p4-inf">연평균 물가 상승률</label>
                <span className="font-mono text-rose-700">연 {inflationRate.toFixed(1)}%</span>
              </div>
              <input
                id="u4-p4-inf"
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-3 accent-rose-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[21px] font-black text-slate-900 mb-2">
                <label htmlFor="u4-p4-yrs">경과 기간</label>
                <span className="font-mono text-slate-900">{years}년 뒤</span>
              </div>
              <input
                id="u4-p4-yrs"
                type="range"
                min={1}
                max={20}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-3 accent-slate-900 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[19px] font-bold text-amber-950 leading-relaxed">
              물가 상승률은 매년 복리로 누적됩니다. 이자가 붙지 않는 현금만 보유하면 살 수 있는 물건의 양이 계속 줄어듭니다.
            </p>
          </div>
        </div>

        {/* Right: Outcomes + Basket Graphic */}
        <div className="xl:col-span-7 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 flex flex-col justify-between">
              <div className="text-[20px] font-extrabold text-rose-800 flex items-center gap-2">
                <Flame className="w-6 h-6" />
                {years}년 뒤 현재 {monthlyBudgetMan}만 원의 실질 구매력
              </div>
              <div className="font-mono text-[40px] font-black text-rose-700 tabular-nums my-2">
                {formatWon(result.realPurchasingPowerWon)}
              </div>
              <p className="text-[19px] font-bold text-slate-700">
                현재 물건 기준 약 <span className="text-rose-800 font-black">{basketRatioPercent}%</span>만 구매 가능
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between">
              <div className="text-[20px] font-extrabold text-amber-300">
                지금과 같은 생활을 유지하려면 {years}년 뒤 필요한 돈
              </div>
              <div className="font-mono text-[40px] font-black text-emerald-300 tabular-nums my-2">
                {formatWon(result.futureEquivalentCostWon)}
              </div>
              <p className="text-[19px] font-bold text-slate-300">
                물가 상승분 +{formatWon(result.futureEquivalentCostWon - monthlyBudgetMan * 10000)} 추가 필요
              </p>
            </div>
          </div>

          {/* Shopping Basket Visual */}
          <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-[24px] font-black text-slate-900">
                장바구니 구매량 체감 비교 (현재 10칸 기준)
              </h3>
              <span className="font-mono text-[22px] font-black text-rose-700">
                10칸 → {filledCarts}칸 수준
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="text-[19px] font-black text-blue-900 mb-2">
                  현재 {monthlyBudgetMan}만 원으로 살 수 있는 양 (100%)
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                <div className="text-[19px] font-black text-rose-900 mb-2">
                  {years}년 뒤 같은 {monthlyBudgetMan}만 원으로 살 수 있는 양 ({basketRatioPercent}%)
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const active = idx < filledCarts;
                    return (
                      <div
                        key={idx}
                        className={`h-12 rounded-xl flex items-center justify-center transition-all ${
                          active
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200 text-slate-400 border border-dashed border-slate-300'
                        }`}
                      >
                        <ShoppingCart className="w-6 h-6" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
