import React, { useState, useEffect } from 'react';
import { Clock, Target, Plane, Home, ShieldCheck } from 'lucide-react';
import { calculateMonthlySavingsRequired, formatWon } from '../../../utils/finance';

interface Page04Props {
  resetSignal: number;
}

interface GoalPreset {
  id: string;
  horizon: '단기 (1~3년)' | '중기 (3~10년)' | '장기 (10년 이상)';
  title: string;
  targetMan: number;
  months: number;
  ratePercent: number;
  strategyTip: string;
}

const GOAL_PRESETS: GoalPreset[] = [
  {
    id: 'travel',
    horizon: '단기 (1~3년)',
    title: '1년 뒤 졸업·해외여행',
    targetMan: 240,
    months: 12,
    ratePercent: 3.0,
    strategyTip: '원금 보전이 가장 중요하므로 보통예금·단기 정기적금 등 안전성과 유동성이 높은 상품이 적합합니다.',
  },
  {
    id: 'indep',
    horizon: '중기 (3~10년)',
    title: '5년 뒤 독립·전세 자금',
    targetMan: 3000,
    months: 60,
    ratePercent: 4.0,
    strategyTip: '안전자산(적금·채권)을 기본으로 하되, 일부를 중위험 분산 상품으로 조합해 목표 금액을 안정적으로 키웁니다.',
  },
  {
    id: 'house',
    horizon: '장기 (10년 이상)',
    title: '20년 뒤 주거 마련 종잣돈',
    targetMan: 10000,
    months: 240,
    ratePercent: 5.0,
    strategyTip: '긴 기간 동안 물가 상승을 방어해야 하므로 예적금 외에 채권·펀드·ETF 장기 분산 투자를 함께 고려합니다.',
  },
  {
    id: 'retire',
    horizon: '장기 (10년 이상)',
    title: '은퇴 후 노후 생활 준비',
    targetMan: 15000,
    months: 360,
    ratePercent: 5.0,
    strategyTip: '복리 효과와 세제 혜택을 활용할 수 있는 연금 계좌(3층 연금 체계)로 장기 꾸준히 적립하는 것이 핵심입니다.',
  },
];

export const Page04FinancialGoalsPeriod: React.FC<Page04Props> = ({ resetSignal }) => {
  const [selectedId, setSelectedId] = useState<string>('indep');
  const [targetMan, setTargetMan] = useState<number>(3000);
  const [months, setMonths] = useState<number>(60);
  const [assumedRate, setAssumedRate] = useState<number>(4.0);

  useEffect(() => {
    setSelectedId('indep');
    setTargetMan(3000);
    setMonths(60);
    setAssumedRate(4.0);
  }, [resetSignal]);

  const activePreset = GOAL_PRESETS.find((g) => g.id === selectedId) || GOAL_PRESETS[1];
  const calc = calculateMonthlySavingsRequired(targetMan * 10000, months, assumedRate);

  const selectPreset = (p: GoalPreset) => {
    setSelectedId(p.id);
    setTargetMan(p.targetMan);
    setMonths(p.months);
    setAssumedRate(p.ratePercent);
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-teal-700">
            <span>UNIT 05</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 4</span>
            <span aria-hidden="true">·</span>
            <span>기간별 재무 목표 설정</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            단기 · 중기 · 장기 재무 목표와 월 필요 저축액
          </h2>
        </div>
      </div>

      {/* 4 Goal Preset Tabs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {GOAL_PRESETS.map((g, idx) => {
          const active = g.id === selectedId;
          const Icon = idx === 0 ? Plane : idx === 1 ? Clock : idx === 2 ? Home : ShieldCheck;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => selectPreset(g)}
              className={`min-h-[82px] p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                active
                  ? 'bg-teal-700 text-white border-teal-700 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-teal-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[16px] font-black ${active ? 'text-teal-200' : 'text-teal-700'}`}>
                  {g.horizon}
                </span>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[20px] font-black mt-1">{g.title}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Calculator Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                <label htmlFor="u5-p4-target">목표 금액</label>
                <span className="font-mono text-teal-700">{targetMan.toLocaleString('ko-KR')}만 원</span>
              </div>
              <input
                id="u5-p4-target"
                type="range"
                min={100}
                max={20000}
                step={100}
                value={targetMan}
                onChange={(e) => setTargetMan(Number(e.target.value))}
                className="w-full h-3 accent-teal-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                <label htmlFor="u5-p4-months">목표 달성 기간</label>
                <span className="font-mono text-blue-700">
                  {months}개월 ({Math.round((months / 12) * 10) / 10}년)
                </span>
              </div>
              <input
                id="u5-p4-months"
                type="range"
                min={6}
                max={360}
                step={6}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-3 accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[20px] font-black text-slate-900 mb-1.5">
                <label htmlFor="u5-p4-rate">가정 연 수익률 (참고용)</label>
                <span className="font-mono text-slate-900">연 {assumedRate.toFixed(1)}%</span>
              </div>
              <input
                id="u5-p4-rate"
                type="range"
                min={0}
                max={7}
                step={0.5}
                value={assumedRate}
                onChange={(e) => setAssumedRate(Number(e.target.value))}
                className="w-full h-3 accent-slate-800 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-[18px] font-bold text-teal-950 leading-relaxed">
            <span className="font-black text-teal-800">기간별 전략 포인트:</span> {activePreset.strategyTip}
          </div>
        </div>

        {/* Right: Results */}
        <div className="xl:col-span-7 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between">
              <span className="text-[20px] font-black text-teal-300 flex items-center gap-2">
                <Target className="w-6 h-6" />
                수익률 가정(연 {assumedRate.toFixed(1)}%) 적용 월 저축액
              </span>
              <div className="font-mono text-[42px] font-black text-white tabular-nums my-2">
                {formatWon(calc.monthlyRequiredWithRateWon)}
              </div>
              <p className="text-[18px] font-bold text-slate-300">
                * 투자·예금 수익률은 시장 상황에 따라 달라질 수 있습니다.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 flex flex-col justify-between">
              <span className="text-[20px] font-black text-blue-900">
                원금 기준 단순 월 저축액 (수익률 0% 가정)
              </span>
              <div className="font-mono text-[42px] font-black text-blue-700 tabular-nums my-2">
                {formatWon(calc.monthlyRequiredSimpleWon)}
              </div>
              <p className="text-[18px] font-bold text-slate-700">
                총 {months}개월 ÷ 목표 {targetMan.toLocaleString('ko-KR')}만 원
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div className="text-[24px] font-black text-slate-900">
              기간을 길게 잡으면 매달 부담이 얼마나 줄어들까?
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '짧은 기간 (절반)', m: Math.max(6, Math.round(months / 2)) },
                { label: '현재 설정 기간', m: months },
                { label: '넉넉한 기간 (1.5배)', m: Math.min(420, Math.round(months * 1.5)) },
              ].map((cmp, idx) => {
                const res = calculateMonthlySavingsRequired(targetMan * 10000, cmp.m, assumedRate);
                return (
                  <div
                    key={cmp.label}
                    className={`rounded-2xl p-4 border-2 ${
                      idx === 1 ? 'bg-teal-50 border-teal-400' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-[17px] font-bold text-slate-600">{cmp.label}</div>
                    <div className="text-[20px] font-black text-slate-900">{cmp.m}개월</div>
                    <div className="font-mono text-[24px] font-black text-teal-800 mt-1">
                      월 {Math.round(res.monthlyRequiredWithRateWon / 10000).toLocaleString('ko-KR')}만 원
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
