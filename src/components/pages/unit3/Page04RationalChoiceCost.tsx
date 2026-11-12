import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { formatWon } from '../../../utils/finance';

interface Page04Props {
  resetSignal: number;
}

export const Page04RationalChoiceCost: React.FC<Page04Props> = ({ resetSignal }) => {
  const [selectedChoice, setSelectedChoice] = useState<'deposit' | 'stock'>('deposit');
  const [showTeacherInsight, setShowTeacherInsight] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedChoice('deposit');
    setShowTeacherInsight(false);
  }, [resetSignal]);

  return (
    <div className="w-full h-full flex flex-col justify-between py-2.5 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in select-none">
      {/* Header */}
      <div className="text-center space-y-0.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
          <Scale className="w-3.5 h-3.5 text-indigo-600" />
          <span>UNIT 03 · 4차시 / 통합사회2 경제 핵심 연계</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          "합리적 선택과 기회비용(Opportunity Cost)"
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          편익과 비용뿐만 아니라 '포기한 대안의 가치'를 고려하여 합리적으로 금융 의사결정을 내리는 법을 배웁니다.
        </p>
      </div>

      {/* Classroom Situation Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-slate-700/80 my-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
              Q
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                합리적 선택의 딜레마
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                "여러분에게 100만 원이 있고 오직 하나의 금융상품만 골라야 한다면, 무엇을 선택하고 무엇을 포기하겠습니까?"
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTeacherInsight(!showTeacherInsight)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer shrink-0"
            >
              {showTeacherInsight ? '핵심 해설 닫기 ▲' : '교사용 발문 해설 열기 ▼'}
            </button>
          </div>
        </div>

        {showTeacherInsight && (
          <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-200 animate-fade-in p-3 bg-white/10 rounded-xl space-y-1 leading-relaxed">
            <strong className="text-amber-300 block font-bold text-sm">
              교사용 발문: "만약 주식이 나중에 20% 대박이 났다면, 정기예금을 골랐던 사람은 반드시 비합리적인 바보였을까요?"
            </strong>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              👉 <strong>핵심 해설:</strong> "전혀 아닙니다! 합리적 선택은 <strong>사후적 결과</strong>만으로 평가하는 것이 아닙니다. 선택 당시 학생에게 주어진 정보, 자금의 사용 시점(예: 몇 달 뒤 등록금), 개인의 위험 감수 능력을 종합적으로 고려하여 신중하게 결정했다면 그것이 바로 그 사람에게 가장 합리적인 선택입니다."
            </p>
          </div>
        )}
      </div>

      {/* Main Choice Comparison: A (Fixed Deposit) vs B (Stock) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-1">
        {/* Option A: 정기예금 */}
        <div
          onClick={() => setSelectedChoice('deposit')}
          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedChoice === 'deposit'
              ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-200 shadow-md'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-extrabold text-sm sm:text-base text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                대안 A. 정기예금 선택 (1년 만기 연 3.5%)
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                안전성 최우선
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                <span className="font-bold text-emerald-700 block">① 기대되는 금전적 편익:</span>
                <span className="text-slate-700">1년 후 확정 세전 이자 +35,000원 (원금 100만 원 100% 보장)</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                <span className="font-bold text-blue-700 block">② 감수해야 할 비용/제약:</span>
                <span className="text-slate-700">1년 동안 돈이 묶여 중도 인출 시 약정 이자 손실 (유동성 제약)</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                <span className="font-bold text-rose-700 block">③ 포기하는 대안의 가치 (기회비용):</span>
                <span className="text-slate-700">주식 시장 상승 시 누릴 수 있었던 고수익 기회(+10~20%) 포기</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs font-bold">
            <span className="text-blue-900">적합한 사람: 1년 내 쓸 돈이거나 손실을 두려워하는 사람</span>
            <span className={selectedChoice === 'deposit' ? 'text-blue-600' : 'text-slate-400'}>
              {selectedChoice === 'deposit' ? '내 선택 ●' : '클릭하여 선택'}
            </span>
          </div>
        </div>

        {/* Option B: 주식 투자 */}
        <div
          onClick={() => setSelectedChoice('stock')}
          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedChoice === 'stock'
              ? 'bg-rose-50/80 border-rose-600 ring-2 ring-rose-200 shadow-md'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-extrabold text-sm sm:text-base text-rose-900 flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-rose-600" />
                대안 B. 주식 투자 선택 (우량 기업 지분 매수)
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                수익성 추구
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-rose-100">
                <span className="font-bold text-rose-700 block">① 기대되는 금전적 편익:</span>
                <span className="text-slate-700">기업 성장 시 시세차익 + 배당금 (기대수익률 연 +10% 이상 가능)</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-rose-100">
                <span className="font-bold text-rose-700 block">② 감수해야 할 비용/위험:</span>
                <span className="text-slate-700">원금 손실 위험(주가 폭락 시 -20~-30% 손실), 심리적 불안감</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-rose-100">
                <span className="font-bold text-blue-700 block">③ 포기하는 대안의 가치 (기회비용):</span>
                <span className="text-slate-700">정기예금이 100% 안전하게 주었을 확정 이자(+35,000원)와 마음의 평안 포기</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs font-bold">
            <span className="text-rose-900">적합한 사람: 장기 투자 가능하고 손실 위험을 감수할 수 있는 사람</span>
            <span className={selectedChoice === 'stock' ? 'text-rose-600' : 'text-slate-400'}>
              {selectedChoice === 'stock' ? '내 선택 ●' : '클릭하여 선택'}
            </span>
          </div>
        </div>
      </div>

      {/* Opportunity Cost Visualization Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 border-2 border-slate-800 shadow-xl my-1 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-amber-300">
              📊 내가 선택한 대안({selectedChoice === 'deposit' ? '대안 A 정기예금' : '대안 B 주식'})의 기회비용 심층 비교
            </span>
            <span className="text-[11px] text-slate-400">통합사회 경제 원리</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
            {/* Box 1: What I Gain */}
            <div className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">선택으로 얻은 편익</span>
              <h4 className="text-sm font-extrabold text-white">
                {selectedChoice === 'deposit' ? '원금 안전성 100% + 확정 이자 3.5만 원' : '기업 성장의 결실 + 고수익 기회'}
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {selectedChoice === 'deposit'
                  ? '밤에 발 뻗고 잘 수 있는 심리적 안정감과 1년 뒤 정확히 1,035,000원을 돌려받는 확실성.'
                  : '자본주의 경제의 꽃인 우량 기업의 주주가 되어 인플레이션을 뛰어넘는 자산 증식의 가능성.'}
              </p>
            </div>

            {/* Box 2: What I Gave Up (Opportunity Cost) */}
            <div className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 space-y-1.5">
              <span className="text-[10px] font-bold text-rose-400 uppercase block">포기한 최선의 대안의 가치 (기회비용)</span>
              <h4 className="text-sm font-extrabold text-amber-300">
                {selectedChoice === 'deposit' ? '주식 시장의 높은 성장 잠재력 포기' : '원금 100% 안전 보장과 확정 이자 포기'}
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {selectedChoice === 'deposit'
                  ? '기회비용: 만약 주식이 크게 올랐을 때 누렸을 시세차익이 바로 내가 정기예금을 선택하면서 치른 대가입니다.'
                  : '기회비용: 손실 걱정 없이 꼬박꼬박 통장에 꽂혔을 예금 이자 35,000원이 주식을 선택하며 포기한 대가입니다.'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
          <span>💡 경제학의 황금률: "어떤 선택을 하든 반드시 포기해야 하는 대가(기회비용)가 따른다."</span>
          <span className="text-amber-300 font-bold font-mono">순편익 = 편익 - 기회비용</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-indigo-700">💡 합리적 선택의 정의:</span>
          <span>합리적 금융 의사결정은 편익이 기회비용보다 크고, 나의 목표와 위험 감수 능력에 부합하는 선택입니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">Rational Decision</span>
      </div>
    </div>
  );
};
