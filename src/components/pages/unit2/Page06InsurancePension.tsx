import React, { useState } from 'react';
import {
  ShieldAlert,
  Umbrella,
  HeartPulse,
  Layers,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Building,
  User,
  CheckCircle2,
} from 'lucide-react';

interface Page06Props {
  resetSignal: number;
}

export const Page06InsurancePension: React.FC<Page06Props> = ({ resetSignal }) => {
  const [showQuestionAnswer, setShowQuestionAnswer] = useState<boolean>(false);
  const [selectedPensionLayer, setSelectedPensionLayer] = useState<number>(2); // 1: 국민연금, 2: 퇴직연금, 3: 개인연금
  const [showBeltNote, setShowBeltNote] = useState<boolean>(false);

  React.useEffect(() => {
    setShowQuestionAnswer(false);
    setSelectedPensionLayer(2);
    setShowBeltNote(false);
  }, [resetSignal]);

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Umbrella className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 6차시 / 미래의 위험 대비와 노후 소득 보장</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "보험(Insurance)과 연금(Pension)"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          예기치 못한 사고에 대비하는 상부상조의 보험과 든든한 3층 노후 연금 체계를 알아봅니다.
        </p>
      </div>

      {/* Classroom Big Question Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-700/80 my-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0">
              Q
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                수업 도입 생각 열기
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                "만약 갑자기 큰 병에 걸려 치료비가 3천만 원이 나오거나, 은퇴하여 월급이 끊기면 어떻게 살아야 할까?"
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowQuestionAnswer(!showQuestionAnswer)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
          >
            {showQuestionAnswer ? '해설 닫기 ▲' : '정답 및 핵심 해설 열기 ▼'}
          </button>
        </div>

        {showQuestionAnswer && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <strong className="text-amber-300 font-bold block mb-1">
                🛡️ 위험에 대한 방패: "보험"
              </strong>
              <p className="text-slate-200 leading-relaxed">
                질병, 상해, 화재 등 불의의 사고가 발생했을 때 평생 모은 저축이 한순간에 바닥나지 않도록 목돈의 치료비와 생활비를 보장받습니다.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <strong className="text-emerald-300 font-bold block mb-1">
                🌅 노후에 대한 월급: "연금"
              </strong>
              <p className="text-slate-200 leading-relaxed">
                정년퇴직 등으로 근로소득이 끊긴 후에도 사망할 때까지 매달 평생 월급처럼 생활비가 나오는 금융 시스템입니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main 2 Column Comparison: Left = Insurance / Right = 3-Tier Pension */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 flex-1 items-stretch">
        {/* Left (6 cols): Insurance - Mutual Aid & Premium vs Claim */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-500" />
                <h4 className="font-extrabold text-base text-slate-900">
                  보험의 본질: 상부상조와 위험 분산
                </h4>
              </div>
              <span className="text-xs font-bold bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                Mutual Assistance
              </span>
            </div>

            {/* Premium vs Claim Distinction Card */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200">
                <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">
                  소비자가 내는 돈
                </span>
                <strong className="text-sm font-black text-slate-900 block">
                  보험료 (Premium)
                </strong>
                <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                  위험 보장을 받기 위해 계약자가 보험회사에 매달 또는 정기적으로 납부하는 돈입니다.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">
                  사고 시 받는 돈
                </span>
                <strong className="text-sm font-black text-slate-900 block">
                  보험금 (Benefit / Payout)
                </strong>
                <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                  약정된 사고나 질병이 실제로 발생했을 때 보험회사가 피해자에게 지급하는 돈입니다.
                </p>
              </div>
            </div>

            {/* Mutual Aid Visual Diagram */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-800 block">
                🤝 상부상조의 구체적 작동 원리:
              </span>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-center">
                <div>
                  <span className="font-bold text-blue-700 block">1만 명의 계약자</span>
                  <span className="text-[10px] text-slate-500">매달 1만 원씩 납부</span>
                </div>
                <span className="text-slate-400 font-bold">➔</span>
                <div className="px-2 py-1 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="font-black text-amber-700 block">1억 원 공동 기금</span>
                  <span className="text-[10px] text-amber-600">위험 준비금</span>
                </div>
                <span className="text-slate-400 font-bold">➔</span>
                <div>
                  <span className="font-bold text-rose-600 block">사고 난 1명 지원</span>
                  <span className="text-[10px] text-slate-500">1억 원 치료비 지급!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seatbelt Analogy Toggle */}
          <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                "안 아프면 보험료 낸 게 아까운 낭비일까?"
              </span>
              <button
                onClick={() => setShowBeltNote(!showBeltNote)}
                className="text-amber-800 font-extrabold hover:underline cursor-pointer"
              >
                {showBeltNote ? '닫기 ▲' : '비유 보기 ▼'}
              </button>
            </div>
            {showBeltNote && (
              <p className="mt-2 text-[11px] text-slate-700 leading-relaxed border-t border-amber-200 pt-2 animate-fade-in">
                보험은 <strong>자동차의 안전벨트</strong>와 같습니다. 교통사고가 나지 않았다고 해서 "안전벨트 괜히 맸네, 아깝다"라고 생각하지 않듯, 보험은 사고가 나지 않은 평온한 삶 자체를 지켜주는 <strong>'안전 비용'</strong>입니다.
              </p>
            )}
          </div>
        </div>

        {/* Right (6 cols): Pension - 3-Tier Pension Security System */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  노후 소득 보장 피라미드
                </span>
                <h4 className="text-lg font-black text-white">
                  3층 보장 연금 체계 (Three-Tier Pension)
                </h4>
              </div>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-bold border border-slate-700">
                터치하여 층별 확인
              </span>
            </div>

            {/* 3 Tier Interactive Visual Stack */}
            <div className="space-y-2.5 my-4">
              {/* Tier 3: 개인연금 */}
              <button
                onClick={() => setSelectedPensionLayer(3)}
                className={`w-full p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedPensionLayer === 3
                    ? 'bg-amber-400/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                    3층
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-white">개인연금 (연금저축 · IRP)</h5>
                    <span className="text-[11px] text-slate-400">개인 준비 · 금융기관 가입 · 여유로운 생활</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">여유 보장 ✨</span>
              </button>

              {/* Tier 2: 퇴직연금 */}
              <button
                onClick={() => setSelectedPensionLayer(2)}
                className={`w-full p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedPensionLayer === 2
                    ? 'bg-blue-600/30 border-blue-400 text-blue-200 ring-2 ring-blue-400/30'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-xs">
                    2층
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-white">퇴직연금 (DB형 · DC형)</h5>
                    <span className="text-[11px] text-slate-400">기업 준비 · 직장인 의무 적립 · 표준적인 생활</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-400">표준 보장 🏢</span>
              </button>

              {/* Tier 1: 국민연금 */}
              <button
                onClick={() => setSelectedPensionLayer(1)}
                className={`w-full p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedPensionLayer === 1
                    ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/30'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">
                    1층
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-white">국민연금 (공적연금)</h5>
                    <span className="text-[11px] text-slate-400">국가 보장 · 국민 의무 가입 · 기초 기본 생활</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">기본 보장 🏛️</span>
              </button>
            </div>

            {/* Selected Tier Deep-Dive Details */}
            <div className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 text-xs text-slate-300">
              {selectedPensionLayer === 1 && (
                <div>
                  <strong className="text-emerald-400 font-bold block mb-1">
                    🏛️ 1층: 국민연금 (공적연금 - 국가 차원)
                  </strong>
                  <p className="leading-relaxed text-[11px]">
                    모든 국민이 의무적으로 가입하여 최소한의 노후 생계를 지켜주는 사회보장제도입니다. 물가 상승률이 매년 연금액에 반영되어 화폐 가치 하락을 방어해 주는 강력한 장점이 있습니다.
                  </p>
                </div>
              )}
              {selectedPensionLayer === 2 && (
                <div>
                  <strong className="text-blue-400 font-bold block mb-1">
                    🏢 2층: 퇴직연금 (기업 차원)
                  </strong>
                  <p className="leading-relaxed text-[11px]">
                    기업이 근로자의 퇴직금을 금융기관에 적립하여 은퇴 후 일시금이나 매달 연금으로 지급하는 제도입니다. 직장인들의 안정적인 중산층 표준 생활을 유지하는 데 기여합니다.
                  </p>
                </div>
              )}
              {selectedPensionLayer === 3 && (
                <div>
                  <strong className="text-amber-400 font-bold block mb-1">
                    ✨ 3층: 개인연금 (개인 차원 - 자율 가입)
                  </strong>
                  <p className="leading-relaxed text-[11px]">
                    국민연금과 퇴직연금만으로 부족한 여행, 취미 생활 등 풍요롭고 여유로운 노후를 위해 개인이 자발적으로 은행·보험·증권사에 가입하는 사적 연금입니다. (세액공제 혜택 제공)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>💡 3개 층이 모두 결합될 때 비로소 빈틈없는 노후 생활 안전망이 완성됩니다.</span>
            <span className="text-emerald-400 font-bold">1층 + 2층 + 3층 = 황금 연금</span>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 생애 위험 관리:</span>
          <span>보험은 <strong>예상치 못한 불의의 사고(위험)</strong>를 막는 방패이고, 연금은 <strong>오래 사는 위험(장수 리스크)</strong>에 대비하는 마르지 않는 샘물입니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">삶의 전 주기를 지키는 금융 안전망</span>
      </div>
    </div>
  );
};
