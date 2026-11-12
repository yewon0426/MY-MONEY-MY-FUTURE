import React, { useState } from 'react';
import {
  Trophy,
  Sliders,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Coins,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  BarChart3,
  Flame,
} from 'lucide-react';
import { formatWon, formatManWon } from '../../../utils/finance';

interface Page08Props {
  resetSignal: number;
}

export const Page08ComprehensiveChallenge: React.FC<Page08Props> = ({ resetSignal }) => {
  const TOTAL_FUND = 5000000; // 500만 원

  // Bucket Allocations in Man Won (Sum must be 500)
  const [emergencyMan, setEmergencyMan] = useState<number>(100); // 비상자금 100만 원 (20%)
  const [savingsMan, setSavingsMan] = useState<number>(200); // 단기 저축 200만 원 (40%)
  const [investMan, setInvestMan] = useState<number>(200); // 장기 투자 200만 원 (40%)

  // Rationale selection
  const [emergencyReason, setEmergencyReason] = useState<string>('갑작스러운 병원비나 경조사비 즉시 대비');
  const [savingsReason, setSavingsReason] = useState<string>('1년 뒤 이사 보증금 및 여행 경비 안전 보존');
  const [investReason, setInvestReason] = useState<string>('10년 뒤 내 집 마련 종잣돈 복리 증식');

  // Economic stress test scenario
  const [stressScenario, setStressScenario] = useState<'normal' | 'recession' | 'inflation'>('normal');
  const [showUnit4Bridge, setShowUnit4Bridge] = useState<boolean>(false);

  React.useEffect(() => {
    setEmergencyMan(100);
    setSavingsMan(200);
    setInvestMan(200);
    setEmergencyReason('갑작스러운 병원비나 경조사비 즉시 대비');
    setSavingsReason('1년 뒤 이사 보증금 및 여행 경비 안전 보존');
    setInvestReason('10년 뒤 내 집 마련 종잣돈 복리 증식');
    setStressScenario('normal');
    setShowUnit4Bridge(false);
  }, [resetSignal]);

  const currentTotalMan = emergencyMan + savingsMan + investMan;
  const isExactSum = currentTotalMan === 500;

  // Preset Allocation Profiles
  const applyPresetProfile = (e: number, s: number, i: number) => {
    setEmergencyMan(e);
    setSavingsMan(s);
    setInvestMan(i);
  };

  // 7-Point Feedback Evaluation Calculations
  // ② 안전성 고려 여부
  const safetyShare = ((emergencyMan + savingsMan) / 500) * 100;
  const safetyEval = safetyShare >= 50
    ? '우수: 원금 안전성이 확보된 비중이 50% 이상으로 매우 든든합니다.'
    : '주의: 안전 자산 비중이 50% 미만으로 시장 급락 시 원금 손실 압박이 클 수 있습니다.';

  // ③ 수익성 고려 여부
  const profitShare = (investMan / 500) * 100;
  const profitEval = profitShare >= 30
    ? '우수: 장기 자산 증식을 위한 투자 비중이 30% 이상 배정되어 인플레이션을 방어합니다.'
    : '안정 지향: 원금 보존 중심이나 장기 자산 증식 속도는 다소 완만할 수 있습니다.';

  // ④ 유동성 고려 여부
  const liquidityShare = (emergencyMan / 500) * 100;
  const liquidityEval = emergencyMan >= 100
    ? '적정: 비상자금 100만 원 이상 확보되어 갑작스러운 의료비·지출에 즉각 대응 가능합니다.'
    : '위험: 비상자금이 100만 원 미만으로 응급 상황 시 적금이나 주식을 헐값에 해약해야 할 위험이 있습니다.';

  // ⑤ 위험 분산 여부
  const isWellDiversified = emergencyMan > 0 && savingsMan > 0 && investMan > 0;
  const diversificationEval = isWellDiversified
    ? '완벽: 세 바구니에 고르게 나누어 담아 한쪽이 흔들려도 전체가 무너지지 않습니다.'
    : '편중: 특정 바구니가 0원이어서 예상치 못한 위기 상황에 취약할 수 있습니다.';

  // ⑥ 기회비용 이해도
  const opportunityCostEval = investMan > savingsMan
    ? '성장 기회를 위해 안전 이자를 일부 양보하는 기회비용을 합리적으로 감수하고 있습니다.'
    : '안전과 심리적 안정을 위해 높은 주식 수익 기회를 기회비용으로 지불하고 있습니다.';

  // ⑦ 개선 가능한 부분
  let improvementSuggestion = '균형 잡힌 포트폴리오입니다! 현재 나이와 직업 안정성에 맞춰 비중을 미세 조정해 보세요.';
  if (!isExactSum) {
    improvementSuggestion = `총합이 500만 원(현재 ${currentTotalMan}만 원)이 되도록 슬라이더를 맞춰주세요.`;
  } else if (emergencyMan < 50) {
    improvementSuggestion = '비상금을 최소 50~100만 원 수준으로 늘려 갑작스러운 지출에 대비하세요.';
  } else if (investMan === 0) {
    improvementSuggestion = '사회초년생의 긴 투자 기간을 활용해 20~30%는 우량 ETF에 장기 투자해 보세요.';
  }

  // Stress test calculation
  // normal: emergency 0.5%, savings 3.5%, invest 8.0%
  // recession: emergency 0.5%, savings 3.5%, invest -20.0%
  // inflation: emergency 0.5% (실질 -4%), savings 3.5% (실질 -1.5%), invest +12.0%
  const getStressResult = () => {
    const e = emergencyMan * 10000;
    const s = savingsMan * 10000;
    const i = investMan * 10000;

    if (stressScenario === 'normal') {
      const p = Math.round(e * 0.005 + s * 0.035 + i * 0.08);
      return { text: '평상시 무난한 성장', profit: p, rate: ((p / TOTAL_FUND) * 100).toFixed(1) };
    } else if (stressScenario === 'recession') {
      const p = Math.round(e * 0.005 + s * 0.035 + i * -0.20);
      return { text: '경기 불황 주가 급락장', profit: p, rate: ((p / TOTAL_FUND) * 100).toFixed(1) };
    } else {
      const p = Math.round(e * 0.005 + s * 0.035 + i * 0.12);
      return { text: '고물가 인플레이션 환경', profit: p, rate: ((p / TOTAL_FUND) * 100).toFixed(1) };
    }
  };

  const stressRes = getStressResult();

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>UNIT 03 · 8차시 / 대단원 종합 피날레 챌린지</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "사회초년생 500만 원 자산 배분 챌린지"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          3대 바구니에 여유자금을 배분하고, 7대 의사결정 지표로 나의 자산 관리 전략을 다각도로 평가합니다.
        </p>
      </div>

      {/* Preset Profiles Bar */}
      <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border-2 border-slate-200 shadow-xs my-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-slate-800">대표 배분 전략 프리셋:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => applyPresetProfile(100, 200, 200)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              황금 균형형 (100:200:200)
            </button>
            <button
              onClick={() => applyPresetProfile(150, 250, 100)}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              안전 방어형 (150:250:100)
            </button>
            <button
              onClick={() => applyPresetProfile(50, 150, 300)}
              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              청년 성장형 (50:150:300)
            </button>
          </div>
        </div>

        <div className={`text-xs font-mono font-black px-3 py-1 rounded-xl ${
          isExactSum ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800 animate-pulse'
        }`}>
          총 배분: {currentTotalMan}만 원 / 500만 원 {isExactSum ? '(100% 완료)' : `(${currentTotalMan > 500 ? '초과' : '부족'})`}
        </div>
      </div>

      {/* Main 12-Col Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1 items-stretch">
        {/* Left Column (5 cols): 3 Allocation Buckets & Rationales */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                1단계: 3대 바구니 자금 배분 조절
              </span>
              <span className="text-xs font-bold text-slate-400">슬라이더 조절</span>
            </div>

            {/* Bucket 1: 생활비 및 비상자금 */}
            <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-blue-900 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-blue-600" />
                  ① 생활비 및 비상자금 (유동성)
                </span>
                <span className="text-blue-700 font-mono text-sm font-black">{emergencyMan}만 원 ({((emergencyMan / 500) * 100).toFixed(0)}%)</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={25}
                value={emergencyMan}
                onChange={(e) => setEmergencyMan(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">선택 근거: {emergencyReason}</span>
            </div>

            {/* Bucket 2: 단기 저축 */}
            <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ② 단기 저축 (안전성)
                </span>
                <span className="text-emerald-700 font-mono text-sm font-black">{savingsMan}만 원 ({((savingsMan / 500) * 100).toFixed(0)}%)</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={25}
                value={savingsMan}
                onChange={(e) => setSavingsMan(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">선택 근거: {savingsReason}</span>
            </div>

            {/* Bucket 3: 장기 투자 */}
            <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-purple-900 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                  ③ 장기 투자 (수익성)
                </span>
                <span className="text-purple-700 font-mono text-sm font-black">{investMan}만 원 ({((investMan / 500) * 100).toFixed(0)}%)</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={25}
                value={investMan}
                onChange={(e) => setInvestMan(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">선택 근거: {investReason}</span>
            </div>
          </div>

          {/* Stress test selector */}
          <div className="mt-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
            <span className="font-bold text-slate-800 block">경제 상황 스트레스 테스트:</span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setStressScenario('normal')}
                className={`py-1 rounded-lg text-[11px] font-bold cursor-pointer ${stressScenario === 'normal' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border'}`}
              >
                평상시
              </button>
              <button
                onClick={() => setStressScenario('recession')}
                className={`py-1 rounded-lg text-[11px] font-bold cursor-pointer ${stressScenario === 'recession' ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border'}`}
              >
                경기 불황
              </button>
              <button
                onClick={() => setStressScenario('inflation')}
                className={`py-1 rounded-lg text-[11px] font-bold cursor-pointer ${stressScenario === 'inflation' ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border'}`}
              >
                고물가 상승
              </button>
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>예상 손익:</span>
              <span className={`font-mono font-bold ${stressRes.profit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {stressRes.profit >= 0 ? '+' : ''}{formatWon(stressRes.profit)} ({stressRes.rate}%)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): 7-Point Comprehensive Feedback Dashboard */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">
                2단계: 7대 다각도 의사결정 피드백 대시보드
              </span>
              <span className="text-[10px] text-slate-400">단일 점수 강제 없음</span>
            </div>

            {/* 7 Point Feedback Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2.5 text-xs">
              {/* Point 1 */}
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold block">① 선택한 자산 배분</span>
                <span className="text-xs font-mono font-black text-amber-300">
                  비상금 {emergencyMan}만 + 저축 {savingsMan}만 + 투자 {investMan}만
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">총 {formatManWon(500)} 포트폴리오</p>
              </div>

              {/* Point 2 */}
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] text-blue-300 font-bold block">② 안전성 고려 여부</span>
                <p className="text-[11px] text-slate-200 leading-tight">{safetyEval}</p>
              </div>

              {/* Point 3 */}
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] text-purple-300 font-bold block">③ 수익성 고려 여부</span>
                <p className="text-[11px] text-slate-200 leading-tight">{profitEval}</p>
              </div>

              {/* Point 4 */}
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] text-emerald-300 font-bold block">④ 유동성 고려 여부</span>
                <p className="text-[11px] text-slate-200 leading-tight">{liquidityEval}</p>
              </div>

              {/* Point 5 */}
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] text-amber-300 font-bold block">⑤ 위험 분산 여부</span>
                <p className="text-[11px] text-slate-200 leading-tight">{diversificationEval}</p>
              </div>

              {/* Point 6 */}
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] text-rose-300 font-bold block">⑥ 기회비용에 대한 이해</span>
                <p className="text-[11px] text-slate-200 leading-tight">{opportunityCostEval}</p>
              </div>
            </div>

            {/* Point 7: Suggestions */}
            <div className="p-2.5 bg-slate-800/90 rounded-xl border border-amber-400/40 text-xs">
              <span className="text-[10px] text-amber-300 font-bold block">⑦ 개선 가능한 부분 및 조언:</span>
              <p className="text-[11px] text-slate-200 mt-0.5 leading-snug">{improvementSuggestion}</p>
            </div>
          </div>

          {/* UNIT 04 Bridge Question Box */}
          <div className="mt-2.5 p-3 bg-gradient-to-r from-blue-950 to-indigo-950 rounded-2xl border border-blue-600/60 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                UNIT 04 연결 생각 열기:
              </span>
              <button
                onClick={() => setShowUnit4Bridge(!showUnit4Bridge)}
                className="text-amber-300 font-bold hover:underline cursor-pointer text-xs"
              >
                {showUnit4Bridge ? '접기 ▲' : '다음 단원 질문 열기 ▶'}
              </button>
            </div>

            <p className="text-white font-bold text-xs mt-1">
              "경제 상황이 달라진다면 지금의 자산 관리 전략을 그대로 유지해도 될까요?"
            </p>

            {showUnit4Bridge && (
              <p className="mt-1.5 pt-1.5 border-t border-slate-700 text-[11px] text-slate-300 leading-relaxed animate-fade-in">
                👉 <strong>예고:</strong> 기준금리가 치솟거나 환율이 폭등하고 인플레이션이 발생하면, 과거의 황금 전략도 실패할 수 있습니다. 다음 <strong>UNIT 04 「경제·환경 변화와 금융 의사 결정」</strong>에서 거시 경제의 거대한 파도에 맞서는 지혜를 배웁니다!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-amber-700">🎓 UNIT 03 완강:</span>
          <span>합리적 자산 관리는 정답 암기가 아니라, <strong>자신의 상황에 맞는 이유를 설명할 수 있는 주체적인 금융 역량</strong>입니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-emerald-600 font-mono">UNIT 03 / 8 PAGES COMPLETED</span>
      </div>
    </div>
  );
};
