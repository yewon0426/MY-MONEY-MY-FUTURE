import React, { useState, useEffect } from 'react';
import { Eye, Sparkles, Calculator } from 'lucide-react';
import { calculateRealReturn, formatWon } from '../../../utils/finance';

interface Page05Props {
  resetSignal: number;
}

type ReturnPrediction = 'gain' | 'same' | 'loss' | null;

export const Page05NominalVsRealReturn: React.FC<Page05Props> = ({ resetSignal }) => {
  const [prediction, setPrediction] = useState<ReturnPrediction>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [nominalRate, setNominalRate] = useState<number>(3.0);
  const [inflationRate, setInflationRate] = useState<number>(5.0);

  useEffect(() => {
    setPrediction(null);
    setRevealed(false);
    setNominalRate(3.0);
    setInflationRate(5.0);
  }, [resetSignal]);

  const res = calculateRealReturn(nominalRate, inflationRate, 1000000);
  const isNegativeReal = res.exactRealRatePercent < 0;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 5</span>
            <span aria-hidden="true">·</span>
            <span>명목 vs 실질 수익률</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            예금 이자 3%인데 물가가 5% 오르면?
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {[
            { label: '예금 3% · 물가 5%', nom: 3, inf: 5 },
            { label: '예금 4% · 물가 2%', nom: 4, inf: 2 },
            { label: '투자 6% · 물가 3%', nom: 6, inf: 3 },
          ].map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setNominalRate(p.nom);
                setInflationRate(p.inf);
                setRevealed(true);
              }}
              className="min-h-[48px] px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-[18px] cursor-pointer whitespace-nowrap"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Controls & Prediction */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-[20px] font-black text-slate-900 mb-3 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-amber-600" />
                100만 원 · 1년 뒤 상황 설정
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[20px] font-black text-blue-900 mb-1.5">
                    <label htmlFor="u4-p5-nom">명목 수익률 (통장 표시 이자율)</label>
                    <span className="font-mono text-blue-700">{nominalRate.toFixed(1)}%</span>
                  </div>
                  <input
                    id="u4-p5-nom"
                    type="range"
                    min={0}
                    max={12}
                    step={0.5}
                    value={nominalRate}
                    onChange={(e) => setNominalRate(Number(e.target.value))}
                    className="w-full h-3 accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[20px] font-black text-rose-900 mb-1.5">
                    <label htmlFor="u4-p5-inf">물가 상승률 (인플레이션)</label>
                    <span className="font-mono text-rose-700">{inflationRate.toFixed(1)}%</span>
                  </div>
                  <input
                    id="u4-p5-inf"
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full h-3 accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {!revealed && (
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
                <div className="text-[20px] font-black text-amber-300">
                  예측: 명목 3% · 물가 5%일 때 내 실질 구매력은?
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'gain' as const, label: '① 이자를 3% 받았으니 실질 구매력도 증가' },
                    { id: 'same' as const, label: '② 본전과 똑같다' },
                    { id: 'loss' as const, label: '③ 물가가 더 올라 실질 구매력은 감소(-)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrediction(opt.id)}
                      className={`min-h-[48px] px-4 py-2 rounded-xl text-left text-[18px] font-bold cursor-pointer border-2 transition-all ${
                        prediction === opt.id
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  disabled={!prediction}
                  className="w-full min-h-[54px] bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl font-black text-[20px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-5 h-5" />
                  <span>실질 수익률 계산 결과 공개하기</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-[18px] font-bold text-slate-800 leading-relaxed">
            근사 공식: <span className="font-mono font-black">실질 ≈ 명목 - 물가</span>
            <br />
            정확 공식(피셔): <span className="font-mono font-black">(1+명목)/(1+물가) - 1</span>
          </div>
        </div>

        {/* Right: Results */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          {!revealed ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 gap-4">
              <Sparkles className="w-14 h-14 text-amber-500" />
              <div className="text-[28px] font-black text-slate-800">
                먼저 왼쪽에서 예측을 선택하고 결과를 공개해 주세요
              </div>
              <p className="text-[21px] font-bold text-slate-600 max-w-xl">
                통장에 찍힌 &lsquo;명목 금액&rsquo;과 물가 변화를 반영한 &lsquo;실질 구매력&rsquo;이 얼마나 다른지 직접 확인합니다.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[20px] font-black text-blue-900">
                    겉보기 수익 (명목 수익률 {nominalRate.toFixed(1)}%)
                  </span>
                  <div className="font-mono text-[40px] font-black text-blue-700 tabular-nums my-2">
                    {formatWon(res.nominalEndingWon)}
                  </div>
                  <p className="text-[19px] font-bold text-slate-700">
                    통장 잔고는 +{formatWon(res.nominalEndingWon - 1000000)} 증가
                  </p>
                </div>

                <div
                  className={`border-2 rounded-2xl p-5 flex flex-col justify-between ${
                    isNegativeReal ? 'bg-rose-50 border-rose-300' : 'bg-emerald-50 border-emerald-300'
                  }`}
                >
                  <span
                    className={`text-[20px] font-black ${
                      isNegativeReal ? 'text-rose-900' : 'text-emerald-900'
                    }`}
                  >
                    물가 반영 실질 가치 (정확 실질 {res.exactRealRatePercent > 0 ? '+' : ''}
                    {res.exactRealRatePercent}%)
                  </span>
                  <div
                    className={`font-mono text-[40px] font-black tabular-nums my-2 ${
                      isNegativeReal ? 'text-rose-700' : 'text-emerald-700'
                    }`}
                  >
                    {formatWon(res.realPurchasingPowerEndingWon)}
                  </div>
                  <p className="text-[19px] font-bold text-slate-800">
                    근사치(명목-물가):{' '}
                    <span className="font-mono font-black">
                      {res.approxRealRatePercent > 0 ? '+' : ''}
                      {res.approxRealRatePercent}%
                    </span>{' '}
                    / 정확치:{' '}
                    <span className="font-mono font-black">
                      {res.exactRealRatePercent > 0 ? '+' : ''}
                      {res.exactRealRatePercent}%
                    </span>
                  </p>
                </div>
              </div>

              {/* Comparison Visual */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="text-[22px] font-black text-slate-900">
                  100만 원 하던 물건 가격 vs 내 통장 잔액 비교
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[20px] font-bold">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4">
                    <div className="text-slate-600">1년 뒤 물건 가격 (물가 {inflationRate.toFixed(1)}%)</div>
                    <div className="font-mono text-[30px] font-black text-rose-700 mt-1">
                      {formatWon(Math.round(1000000 * (1 + inflationRate / 100)))}
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4">
                    <div className="text-slate-600">1년 뒤 내 통장 금액 (명목 {nominalRate.toFixed(1)}%)</div>
                    <div className="font-mono text-[30px] font-black text-blue-700 mt-1">
                      {formatWon(res.nominalEndingWon)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Takeaway */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 text-[20px] font-bold leading-relaxed">
                {isNegativeReal ? (
                  <>
                    <span className="text-rose-300 font-black">실질 구매력 감소 상태:</span> 명목 이자를 받아 통장 숫자는 커졌지만, 물가가 더 빨리 올라 실제 구매력은{' '}
                    <span className="text-amber-300 font-black">{res.exactRealRatePercent}%</span> 줄었습니다.
                  </>
                ) : (
                  <>
                    <span className="text-emerald-300 font-black">실질 구매력 방어 성공:</span> 수익률이 물가 상승률을 넘어서 실제 살 수 있는 가치가{' '}
                    <span className="text-amber-300 font-black">+{res.exactRealRatePercent}%</span> 늘었습니다.
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
