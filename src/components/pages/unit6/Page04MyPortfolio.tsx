import React from 'react';
import { Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Unit6PlanState, Unit6PortfolioAllocation } from '../../../types';

interface Page04Props {
  plan: Unit6PlanState;
  onUpdatePlan: React.Dispatch<React.SetStateAction<Unit6PlanState>>;
}

const ASSET_ROWS: {
  key: keyof Unit6PortfolioAllocation;
  name: string;
  safety: string;
  profitability: string;
  liquidity: string;
  risk: string;
  purpose: string;
  accent: string;
}[] = [
  {
    key: 'depositPercent',
    name: '예금 · 적금',
    safety: '매우 높음',
    profitability: '낮음~보통',
    liquidity: '높음 (보통예금)',
    risk: '물가상승 시 실질가치 하락',
    purpose: '비상자금 · 1~3년 단기 자금',
    accent: 'accent-blue-600',
  },
  {
    key: 'bondPercent',
    name: '채권 (국공채·회사채)',
    safety: '보통~높음',
    profitability: '보통',
    liquidity: '보통',
    risk: '금리 상승 시 가격 하락 · 신용위험',
    purpose: '중기 안정적 이자 현금 흐름',
    accent: 'accent-emerald-600',
  },
  {
    key: 'fundEtfPercent',
    name: '펀드 · ETF',
    safety: '보통',
    profitability: '보통~높음',
    liquidity: '높음 (ETF)',
    risk: '시장 변동 시 원금 손실 가능',
    purpose: '소액 분산 · 중장기 자산 성장',
    accent: 'accent-indigo-600',
  },
  {
    key: 'stockPercent',
    name: '주식 (개별 종목)',
    safety: '낮음',
    profitability: '기대수익 높음',
    liquidity: '높음',
    risk: '가격 변동성 큼 · 원금 손실 위험',
    purpose: '장기 여유 자금 성장 투자',
    accent: 'accent-amber-600',
  },
];

const REASON_PRESETS = [
  '단기 비상금과 종잣돈은 예·적금으로 안전하게 지키고, 장기 자산은 ETF와 채권으로 분산 투자합니다.',
  '사회초년생이라 원금 보전이 우선이므로 예·적금과 채권 비중을 70% 이상으로 두고 소액만 ETF를 경험합니다.',
  '5년 이상 장기 목표 자금을 물가 상승으로부터 방어하기 위해 ETF·채권·예금을 균형 있게 배분했습니다.',
];

export const Page04MyPortfolio: React.FC<Page04Props> = ({ plan, onUpdatePlan }) => {
  const { portfolio } = plan;
  const totalPct =
    portfolio.depositPercent +
    portfolio.bondPercent +
    portfolio.fundEtfPercent +
    portfolio.stockPercent;
  const monthlyInvestableMan = plan.budget.savings + plan.budget.investment;

  const updatePct = (key: keyof Unit6PortfolioAllocation, val: number) => {
    onUpdatePlan((prev) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        [key]: Math.max(0, Math.min(100, val)),
      },
    }));
  };

  const applyMixPreset = (mix: Unit6PortfolioAllocation) => {
    onUpdatePlan((prev) => ({ ...prev, portfolio: mix }));
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 4</span>
            <span aria-hidden="true">·</span>
            <span>월 {monthlyInvestableMan}만 원 저축·투자 포트폴리오</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            나만의 금융상품 선택과 포트폴리오 배분
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => applyMixPreset({ depositPercent: 65, bondPercent: 20, fundEtfPercent: 15, stockPercent: 0 })}
            className="min-h-[46px] px-4 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-950 font-black text-[17px] cursor-pointer"
          >
            안정형 (65:20:15:0)
          </button>
          <button
            type="button"
            onClick={() => applyMixPreset({ depositPercent: 40, bondPercent: 20, fundEtfPercent: 30, stockPercent: 10 })}
            className="min-h-[46px] px-4 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-black text-[17px] cursor-pointer"
          >
            균형형 (40:20:30:10)
          </button>
          <button
            type="button"
            onClick={() => applyMixPreset({ depositPercent: 25, bondPercent: 15, fundEtfPercent: 40, stockPercent: 20 })}
            className="min-h-[46px] px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-[17px] cursor-pointer"
          >
            장기성장형 (25:15:40:20)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: 4 Product Sliders + Specs */}
        <div className="xl:col-span-7 flex flex-col justify-between gap-3">
          {ASSET_ROWS.map((row) => {
            const pct = portfolio[row.key];
            const monthlyWon = Math.round((monthlyInvestableMan * pct) / 100);
            return (
              <div
                key={row.key}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor={`pf-${row.key}`}
                      className="text-[22px] font-black text-slate-900"
                    >
                      {row.name}
                    </label>
                    <span className="text-[16px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                      {row.purpose}
                    </span>
                  </div>
                  <div className="font-mono text-[24px] font-black text-indigo-700 tabular-nums">
                    {pct}% <span className="text-[18px] text-slate-500">(월 {monthlyWon}만 원)</span>
                  </div>
                </div>

                <input
                  id={`pf-${row.key}`}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={pct}
                  onChange={(e) => updatePct(row.key, Number(e.target.value))}
                  className={`w-full h-3 cursor-pointer ${row.accent}`}
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[15px] font-bold text-slate-700">
                  <div>안전성: <span className="text-slate-900 font-black">{row.safety}</span></div>
                  <div>수익성: <span className="text-slate-900 font-black">{row.profitability}</span></div>
                  <div>유동성: <span className="text-slate-900 font-black">{row.liquidity}</span></div>
                  <div className="text-rose-800 truncate" title={row.risk}>위험: {row.risk}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Sum Status & Rationale */}
        <div className="xl:col-span-5 flex flex-col justify-between gap-4">
          <div
            className={`rounded-3xl p-5 border-2 flex items-center justify-between ${
              totalPct === 100
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              {totalPct === 100 ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <div className="text-[20px] font-black">
                  {totalPct === 100
                    ? '포트폴리오 비중 합계 100% 완성!'
                    : `합계가 100%가 되도록 조정하세요 (현재 ${totalPct}%)`}
                </div>
                <div className="text-[17px] font-bold opacity-80">
                  수익률이 가장 높은 조합이 아니라 내 목적에 맞는 이유가 중요합니다.
                </div>
              </div>
            </div>
            <span className="font-mono text-[32px] font-black tabular-nums">{totalPct}%</span>
          </div>

          <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between gap-3 shadow-sm">
            <div>
              <div className="text-[21px] font-black text-slate-900 flex items-center gap-2 mb-2">
                <Layers className="w-6 h-6 text-indigo-700" />
                이 금융상품들을 선택한 이유 (설계서에 반영)
              </div>
              <textarea
                aria-label="금융상품 선택 이유"
                rows={4}
                value={plan.portfolioReason}
                onChange={(e) =>
                  onUpdatePlan((prev) => ({ ...prev, portfolioReason: e.target.value }))
                }
                className="w-full rounded-2xl border-2 border-slate-300 focus:border-indigo-600 p-4 text-[19px] font-bold text-slate-900 outline-none resize-none"
                placeholder="왜 이 비율로 나누었는지 목적·기간·위험 관점에서 적어보세요."
              />
            </div>

            <div className="space-y-2">
              <div className="text-[16px] font-black text-slate-600">대표 근거 문장 빠르게 선택하기</div>
              {REASON_PRESETS.map((txt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onUpdatePlan((prev) => ({ ...prev, portfolioReason: txt }))}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-[16px] font-bold text-slate-800 cursor-pointer transition-colors"
                >
                  선택 {idx + 1}: {txt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
