import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, TrendingUp, Coins, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatWon, formatManWon } from '../../../utils/finance';

interface Page08Props {
  resetSignal: number;
}

type Step8Tab = 'step1' | 'step2';

export const Page08ComprehensiveChallenge: React.FC<Page08Props> = ({ resetSignal }) => {
  const TOTAL_FUND = 5000000;
  const [activeStep, setActiveStep] = useState<Step8Tab>('step1');

  // Bucket Allocations in Man Won (Target Sum = 500)
  const [emergencyMan, setEmergencyMan] = useState<number>(100);
  const [savingsMan, setSavingsMan] = useState<number>(200);
  const [investMan, setInvestMan] = useState<number>(200);

  const [stressScenario, setStressScenario] = useState<'normal' | 'recession' | 'inflation'>('normal');
  const [criterionIdx, setCriterionIdx] = useState<number>(0); // 0..6 for 7 criteria
  const [showUnit4Bridge, setShowUnit4Bridge] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setEmergencyMan(100);
    setSavingsMan(200);
    setInvestMan(200);
    setStressScenario('normal');
    setCriterionIdx(0);
    setShowUnit4Bridge(false);
  }, [resetSignal]);

  const currentTotalMan = emergencyMan + savingsMan + investMan;
  const isExactSum = currentTotalMan === 500;

  const applyPresetProfile = (e: number, s: number, i: number) => {
    setEmergencyMan(e);
    setSavingsMan(s);
    setInvestMan(i);
  };

  // 7-Point Evaluation Criteria
  const safetyShare = ((emergencyMan + savingsMan) / 500) * 100;
  const safetyEval =
    safetyShare >= 50
      ? `우수 (비중 ${safetyShare.toFixed(0)}%): 원금 안전성이 확보된 자산 비중이 50% 이상으로 매우 든든합니다.`
      : `주의 (비중 ${safetyShare.toFixed(0)}%): 안전 자산 비중이 50% 미만으로 시장 급락 시 원금 손실 압박이 큽니다.`;

  const profitShare = (investMan / 500) * 100;
  const profitEval =
    profitShare >= 30
      ? `우수 (투자 비중 ${profitShare.toFixed(0)}%): 장기 자산 증식과 인플레이션 방어를 위한 투자 비중이 충분합니다.`
      : `안정 지향 (투자 비중 ${profitShare.toFixed(0)}%): 원금 보존 중심이나 장기 수익 증식 속도는 완만할 수 있습니다.`;

  const liquidityEval =
    emergencyMan >= 100
      ? `적정 (비상금 ${emergencyMan}만 원): 갑작스러운 병원비나 경조사 지출에 즉각 대응 가능합니다.`
      : `주의 (비상금 ${emergencyMan}만 원): 비상금이 100만 원 미만이어서 응급 상황 시 적금이나 주식을 해약할 위험이 있습니다.`;

  const isWellDiversified = emergencyMan > 0 && savingsMan > 0 && investMan > 0;
  const diversificationEval = isWellDiversified
    ? '완벽 분산: 세 바구니에 고르게 나누어 담아 한쪽이 흔들려도 전체가 무너지지 않습니다.'
    : '편중 주의: 0원인 바구니가 있어 특정 경제 위기 상황에 취약할 수 있습니다.';

  const opportunityCostEval =
    investMan > savingsMan
      ? '성장 기회를 위해 안전 예금 이자를 일부 양보하는 기회비용을 합리적으로 감수하고 있습니다.'
      : '원금 안전성과 심리적 평안을 위해 주식의 높은 기대수익을 기회비용으로 지불하고 있습니다.';

  let improvementSuggestion =
    '균형 잡힌 포트폴리오입니다! 나의 소득 안정성과 사용 기한에 맞춰 비중을 미세 조정해 보세요.';
  if (!isExactSum) {
    improvementSuggestion = `총합이 500만 원(현재 ${currentTotalMan}만 원)이 되도록 슬라이더를 맞춰 주세요.`;
  } else if (emergencyMan < 50) {
    improvementSuggestion = '비상금을 최소 50~100만 원 수준으로 늘려 돌발 지출에 대비하세요.';
  } else if (investMan === 0) {
    improvementSuggestion = '사회초년생의 긴 투자 기간을 활용해 20~30%는 우량 ETF에 장기 투자해 보세요.';
  }

  const criteriaList = [
    {
      num: 1,
      title: '① 선택한 자산 배분 총괄',
      headline: `비상금 ${emergencyMan}만 원 + 단기 저축 ${savingsMan}만 원 + 장기 투자 ${investMan}만 원`,
      detail: `총 배분 금액 ${formatManWon(currentTotalMan)} / 목표 500만 원 ${isExactSum ? '(배분 완료)' : '(조정 필요)'}`,
      accent: 'text-amber-300',
    },
    {
      num: 2,
      title: '② 안전성 평가',
      headline: `안전자산 비중 ${safetyShare.toFixed(0)}%`,
      detail: safetyEval,
      accent: 'text-blue-300',
    },
    {
      num: 3,
      title: '③ 수익성 평가',
      headline: `성장 투자 비중 ${profitShare.toFixed(0)}%`,
      detail: profitEval,
      accent: 'text-purple-300',
    },
    {
      num: 4,
      title: '④ 유동성(비상금) 평가',
      headline: `즉시 인출 비상자금 ${formatManWon(emergencyMan)}`,
      detail: liquidityEval,
      accent: 'text-emerald-300',
    },
    {
      num: 5,
      title: '⑤ 위험 분산(포트폴리오) 평가',
      headline: isWellDiversified ? '3대 바구니 분산 완료' : '특정 자산 편중',
      detail: diversificationEval,
      accent: 'text-amber-300',
    },
    {
      num: 6,
      title: '⑥ 기회비용 이해도',
      headline: investMan > savingsMan ? '성장 추구형 선택' : '안전 중시형 선택',
      detail: opportunityCostEval,
      accent: 'text-rose-300',
    },
    {
      num: 7,
      title: '⑦ 종합 조언 및 개선 포인트',
      headline: isExactSum ? '실천을 위한 맞춤 피드백' : '합계 500만 원 맞추기 필요',
      detail: improvementSuggestion,
      accent: 'text-emerald-300',
    },
  ];

  const getStressResult = () => {
    const e = emergencyMan * 10000;
    const s = savingsMan * 10000;
    const i = investMan * 10000;

    if (stressScenario === 'normal') {
      const p = Math.round(e * 0.005 + s * 0.035 + i * 0.08);
      return { profit: p, rate: ((p / TOTAL_FUND) * 100).toFixed(1) };
    }
    if (stressScenario === 'recession') {
      const p = Math.round(e * 0.005 + s * 0.035 + i * -0.20);
      return { profit: p, rate: ((p / TOTAL_FUND) * 100).toFixed(1) };
    }
    const p = Math.round(e * 0.005 + s * 0.035 + i * 0.12);
    return { profit: p, rate: ((p / TOTAL_FUND) * 100).toFixed(1) };
  };

  const stressRes = getStressResult();
  const activeCriterion = criteriaList[criterionIdx];

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 03</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 8</span>
            <span aria-hidden="true">·</span>
            <span>대단원 종합 피날레 챌린지</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            사회초년생 500만 원 자산 배분 챌린지
          </h2>
        </div>

        <nav
          aria-label="종합 챌린지 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 3대 바구니 & 테스트' },
            { id: 'step2' as const, label: 'STEP 2. 7대 평가 기준 공개' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[60px] px-6 py-3 rounded-xl text-[20px] xl:text-[22px] font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/70 text-slate-700 hover:bg-white hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ================= STEP 1. 3대 바구니 배분 & 스트레스 테스트 ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          {/* Preset Bar & Total Status */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => applyPresetProfile(100, 200, 200)}
                className="min-h-[56px] px-5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl text-[20px] font-black cursor-pointer"
              >
                황금 균형형 (100:200:200)
              </button>
              <button
                type="button"
                onClick={() => applyPresetProfile(150, 250, 100)}
                className="min-h-[56px] px-5 bg-blue-50 hover:bg-blue-100 text-blue-950 rounded-2xl text-[20px] font-black cursor-pointer"
              >
                안전 방어형 (150:250:100)
              </button>
              <button
                type="button"
                onClick={() => applyPresetProfile(50, 150, 300)}
                className="min-h-[56px] px-5 bg-purple-50 hover:bg-purple-100 text-purple-950 rounded-2xl text-[20px] font-black cursor-pointer"
              >
                청년 성장형 (50:150:300)
              </button>
            </div>

            <div
              className={`px-6 py-3 rounded-2xl font-mono font-black text-[22px] tabular-nums border-2 ${
                isExactSum
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-400'
                  : 'bg-rose-100 text-rose-950 border-rose-400'
              }`}
            >
              총 배분: {currentTotalMan}만 / 500만 원 {isExactSum ? '(완료 ✓)' : '(조정 필요)'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
            {/* Left: 3 Sliders */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-7 border-2 border-slate-200 flex flex-col justify-between gap-4">
              <div className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200 space-y-2">
                <div className="flex justify-between items-center font-black">
                  <span className="text-[24px] text-blue-950 flex items-center gap-2">
                    <Coins className="w-6 h-6 text-blue-700" />
                    ① 생활비 · 비상자금 (유동성)
                  </span>
                  <span className="text-[28px] font-mono text-blue-800 tabular-nums">
                    {emergencyMan}만 원 ({((emergencyMan / 500) * 100).toFixed(0)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={25}
                  value={emergencyMan}
                  onChange={(e) => setEmergencyMan(Number(e.target.value))}
                  className="w-full h-4 accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-200 space-y-2">
                <div className="flex justify-between items-center font-black">
                  <span className="text-[24px] text-emerald-950 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-700" />
                    ② 단기 저축 (안전성)
                  </span>
                  <span className="text-[28px] font-mono text-emerald-800 tabular-nums">
                    {savingsMan}만 원 ({((savingsMan / 500) * 100).toFixed(0)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={25}
                  value={savingsMan}
                  onChange={(e) => setSavingsMan(Number(e.target.value))}
                  className="w-full h-4 accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="p-5 bg-purple-50 rounded-2xl border-2 border-purple-200 space-y-2">
                <div className="flex justify-between items-center font-black">
                  <span className="text-[24px] text-purple-950 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-700" />
                    ③ 장기 투자 (수익성)
                  </span>
                  <span className="text-[28px] font-mono text-purple-800 tabular-nums">
                    {investMan}만 원 ({((investMan / 500) * 100).toFixed(0)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={25}
                  value={investMan}
                  onChange={(e) => setInvestMan(Number(e.target.value))}
                  className="w-full h-4 accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Stress Test & Next Step */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="text-[24px] font-black text-amber-300 block">
                  경제 상황 스트레스 테스트
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'normal' as const, label: '평상시' },
                    { id: 'recession' as const, label: '경기 불황' },
                    { id: 'inflation' as const, label: '고물가' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStressScenario(s.id)}
                      className={`min-h-[56px] rounded-xl text-[20px] font-black cursor-pointer ${
                        stressScenario === s.id
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 space-y-2">
                <span className="text-[20px] font-bold text-slate-300 block">
                  선택한 배분안의 예상 연간 손익
                </span>
                <div
                  className={`text-[42px] xl:text-[48px] font-mono font-black tabular-nums ${
                    stressRes.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {stressRes.profit >= 0 ? '+' : ''}
                  {formatWon(stressRes.profit)} ({stressRes.rate}%)
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveStep('step2')}
                className="w-full min-h-[68px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[24px] rounded-2xl flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>7대 평가 기준 단계별 확인</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 7대 평가 기준 단계별 공개 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          {/* 1~7 Step Indicator */}
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {criteriaList.map((c, idx) => (
                <button
                  key={c.num}
                  type="button"
                  onClick={() => setCriterionIdx(idx)}
                  className={`min-h-[56px] px-5 rounded-2xl text-[20px] font-black cursor-pointer transition-all ${
                    criterionIdx === idx
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  기준 {c.num}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCriterionIdx((prev) => Math.max(0, prev - 1))}
                disabled={criterionIdx === 0}
                className="min-h-[56px] px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 font-black text-[20px] flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>이전</span>
              </button>
              <button
                type="button"
                onClick={() => setCriterionIdx((prev) => Math.min(criteriaList.length - 1, prev + 1))}
                disabled={criterionIdx === criteriaList.length - 1}
                className="min-h-[56px] px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white font-black text-[20px] flex items-center gap-1.5 cursor-pointer"
              >
                <span>다음</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Focused Single Criterion Stage */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <span className={`text-[24px] font-black block ${activeCriterion.accent}`}>
                {activeCriterion.title} ({criterionIdx + 1} / 7)
              </span>
              <h3 className="text-[36px] xl:text-[42px] font-black text-white leading-snug">
                {activeCriterion.headline}
              </h3>
              <p className="text-[26px] xl:text-[30px] font-semibold text-slate-200 leading-relaxed pt-2">
                {activeCriterion.detail}
              </p>
            </div>

            {/* UNIT 04 Bridge Box */}
            <div className="bg-slate-800 rounded-3xl p-6 border-2 border-blue-500/60 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-amber-300 font-black text-[24px]">
                  <Sparkles className="w-7 h-7 shrink-0" />
                  <span>UNIT 04 연결 질문: &ldquo;경제 상황이 달라져도 이 전략을 그대로 유지해도 될까요?&rdquo;</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUnit4Bridge(!showUnit4Bridge)}
                  className="min-h-[56px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-[20px] shrink-0 cursor-pointer"
                >
                  {showUnit4Bridge ? '예고 접기' : '다음 단원 예고 열기'}
                </button>
              </div>
              {showUnit4Bridge && (
                <p className="text-[22px] font-bold text-slate-100 leading-relaxed pt-3 border-t border-slate-700">
                  기준금리 급등, 환율 변동, 인플레이션이 발생하면 어제의 정답도 바뀝니다. 다음 <strong className="text-amber-300">UNIT 04 「경제·정치·사회적 환경 변화와 금융 의사 결정」</strong>에서 거시경제 변화에 대응하는 법을 배웁니다!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
