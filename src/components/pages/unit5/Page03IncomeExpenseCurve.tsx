import React, { useState, useEffect } from 'react';
import { TrendingUp, Info } from 'lucide-react';
import { generateLifeCycleModelCurve } from '../../../utils/finance';

interface Page03Props {
  resetSignal: number;
}

type CurveStep = 1 | 2 | 3;

export const Page03IncomeExpenseCurve: React.FC<Page03Props> = ({ resetSignal }) => {
  const [step, setStep] = useState<CurveStep>(1);

  useEffect(() => {
    setStep(1);
  }, [resetSignal]);

  const points = generateLifeCycleModelCurve();

  // SVG coordinate space (960 x 400)
  const W = 960;
  const H = 400;
  const padL = 70;
  const padR = 50;
  const padT = 56;
  const padB = 56;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const getX = (idx: number) => padL + (idx / (points.length - 1)) * plotW;
  const getY = (val: number) => padT + plotH - (val / 100) * plotH;

  const expensePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(p.expenseIndex).toFixed(1)}`)
    .join(' ');

  const incomePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(p.incomeIndex).toFixed(1)}`)
    .join(' ');

  // Surplus polygon between index 2 (30대) and index 4 (50대) roughly where income > expense
  const surplusTop = points.slice(2, 5).map((p, i) => `${getX(i + 2)},${getY(p.incomeIndex)}`).join(' ');
  const surplusBottom = [...points.slice(2, 5)]
    .reverse()
    .map((p, i) => `${getX(4 - i)},${getY(p.expenseIndex)}`)
    .join(' ');

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header & Stepper */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-teal-700">
            <span>UNIT 05</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 3</span>
            <span aria-hidden="true">·</span>
            <span>생애 주기 곡선</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            소득과 소비의 생애 곡선 (적자 · 흑자 · 노후)
          </h2>
        </div>

        <nav
          aria-label="생애 곡선 공개 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 1 as const, label: 'STEP 1. 소비지출 곡선' },
            { id: 2 as const, label: 'STEP 2. 근로소득 곡선 추가' },
            { id: 3 as const, label: 'STEP 3. 적자 · 흑자 구간' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStep(tab.id)}
              className={`min-h-[52px] px-4 py-2 rounded-xl text-[18px] font-black cursor-pointer whitespace-nowrap ${
                step === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Chart Card */}
        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-2 text-[22px] font-black text-slate-900">
              <TrendingUp className="w-6 h-6 text-teal-700" />
              <span>일반적 생애 주기 소득 · 소비 모형 (단위: 상대 지수)</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[18px] font-black">
              <span className="flex items-center gap-2 text-rose-700">
                <span className="w-5 h-2 rounded bg-rose-500 inline-block" /> 소비지출 곡선
              </span>
              {step >= 2 && (
                <span className="flex items-center gap-2 text-blue-700">
                  <span className="w-5 h-2 rounded bg-blue-600 inline-block" /> 근로소득 곡선
                </span>
              )}
              {step === 3 && (
                <span className="flex items-center gap-2 text-emerald-700">
                  <span className="w-4 h-4 rounded bg-emerald-200 border border-emerald-500 inline-block" /> 저축 흑자 구간
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex-1 flex items-center justify-center min-h-[280px]">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto max-h-[390px]"
              role="img"
              aria-label="생애 주기별 근로소득과 소비지출 비교 곡선"
            >
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#E2E8F0" strokeWidth={1.5} />
                    <text
                      x={padL - 12}
                      y={y + 6}
                      textAnchor="end"
                      fill="#475569"
                      fontSize="18"
                      fontWeight="700"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Step 3 Shaded Zones */}
              {step === 3 && (
                <>
                  {/* Deficit 1: Youth */}
                  <rect
                    x={padL}
                    y={padT}
                    width={getX(1) - padL}
                    height={plotH}
                    fill="#FEE2E2"
                    opacity={0.45}
                  />
                  {/* Surplus Highlight */}
                  <polygon points={`${surplusTop} ${surplusBottom}`} fill="#A7F3D0" opacity={0.6} />
                  {/* Deficit 2: Retirement */}
                  <rect
                    x={getX(5)}
                    y={padT}
                    width={getX(6) - getX(5)}
                    height={plotH}
                    fill="#FEF3C7"
                    opacity={0.55}
                  />

                  <text
                    x={(padL + getX(1)) / 2}
                    y={30}
                    textAnchor="middle"
                    fill="#B91C1C"
                    fontSize="20"
                    fontWeight="900"
                  >
                    ① 적자 구간
                  </text>
                  <text
                    x={getX(3)}
                    y={30}
                    textAnchor="middle"
                    fill="#047857"
                    fontSize="21"
                    fontWeight="900"
                  >
                    ② 흑자 구간 (저축·투자)
                  </text>
                  <text
                    x={(getX(5) + getX(6)) / 2}
                    y={30}
                    textAnchor="middle"
                    fill="#B45309"
                    fontSize="20"
                    fontWeight="900"
                  >
                    ③ 은퇴 후 적자
                  </text>
                </>
              )}

              {/* Consumption Curve */}
              <path
                d={expensePath}
                fill="none"
                stroke="#E11D48"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((p, i) => (
                <circle
                  key={`exp-${p.ageLabel}`}
                  cx={getX(i)}
                  cy={getY(p.expenseIndex)}
                  r={6.5}
                  fill="#E11D48"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              ))}

              {/* Income Curve */}
              {step >= 2 && (
                <>
                  <path
                    d={incomePath}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth={5.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {points.map((p, i) => (
                    <circle
                      key={`inc-${p.ageLabel}`}
                      cx={getX(i)}
                      cy={getY(p.incomeIndex)}
                      r={7}
                      fill="#2563EB"
                      stroke="#FFFFFF"
                      strokeWidth={2.5}
                    />
                  ))}
                </>
              )}

              {/* X-axis labels */}
              {points.map((p, i) => (
                <text
                  key={p.ageLabel}
                  x={getX(i)}
                  y={H - 18}
                  textAnchor="middle"
                  fill="#0F172A"
                  fontSize="20"
                  fontWeight="800"
                >
                  {p.ageLabel}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Side Explanation */}
        <div className="xl:col-span-4 flex flex-col justify-between gap-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3">
            <span className="inline-block px-3 py-1 rounded-lg bg-teal-600 text-white text-[17px] font-black">
              STEP {step} 핵심 해설
            </span>
            <h3 className="text-[26px] font-black text-amber-300 leading-snug">
              {step === 1
                ? '소비는 태어나서 노년기까지 평생 멈추지 않습니다.'
                : step === 2
                ? '근로소득은 주로 20대~50대에 집중되어 종 모양을 그립니다.'
                : '흑자 구간에서 모은 자산이 은퇴 후 적자 구간을 메워줍니다.'}
            </h3>
            <p className="text-[20px] font-bold text-slate-200 leading-relaxed">
              {step === 1
                ? '의식주와 교육·의료 지출 때문에 은퇴한 뒤에도 소비 곡선은 0으로 떨어지지 않고 계속 이어집니다.'
                : step === 2
                ? '일해서 돈을 버는 기간은 한정되어 있는 반면, 기대수명이 길어지면서 소득 없는 기간은 점점 길어지고 있습니다.'
                : '① 청소년기 적자(가족 지원) → ② 청·장년기 흑자(종잣돈·연금 축적) → ③ 은퇴 후 적자(연금·자산 인출로 충당)의 균형이 생애 설계의 핵심입니다.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2.5 shadow-sm">
            <div className="text-[20px] font-black text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-700" />
              학생들에게 꼭 짚어줄 점
            </div>
            <p className="text-[19px] font-bold text-slate-700 leading-relaxed">
              이 그래프는 이해를 돕기 위한 <span className="text-teal-800 font-black">일반적인 생애 모형</span>입니다. 개인의 진로, 창업·재취업, 생활 방식에 따라 소득 정점과 소비 형태는 다르게 나타날 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
