import React, { useState } from 'react';
import {
  FileText,
  Landmark,
  Building,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Calendar,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import { calculateBondCashflow, formatWon, formatManWon } from '../../../utils/finance';

interface Page04Props {
  resetSignal: number;
}

export const Page04Bond: React.FC<Page04Props> = ({ resetSignal }) => {
  const [faceValueMan, setFaceValueMan] = useState<number>(100); // 100만 원
  const [couponRate, setCouponRate] = useState<number>(3.0); // 3.0%
  const [maturityYears, setMaturityYears] = useState<number>(3); // 3년
  const [bondType, setBondType] = useState<'treasury' | 'corporate'>('treasury');
  const [showGovernmentAnswer, setShowGovernmentAnswer] = useState<boolean>(false);
  const [showInversionGuide, setShowInversionGuide] = useState<boolean>(false);

  React.useEffect(() => {
    setFaceValueMan(100);
    setCouponRate(3.0);
    setMaturityYears(3);
    setBondType('treasury');
    setShowGovernmentAnswer(false);
    setShowInversionGuide(false);
  }, [resetSignal]);

  const faceValueWon = faceValueMan * 10000;
  const bondCashflow = calculateBondCashflow(faceValueWon, couponRate, maturityYears);

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 4차시 / 빚을 나타내는 증서와 약정 이자</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "채권(Bond)과 확정 이자"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          정부나 기업이 발행하는 차용증인 채권의 3대 요소와 만기 현금흐름 구조를 알아봅니다.
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
                "우리가 대한민국 정부에 돈을 빌려주고 국가로부터 꼬박꼬박 이자를 받을 수 있을까?"
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowGovernmentAnswer(!showGovernmentAnswer)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
          >
            {showGovernmentAnswer ? '해설 닫기 ▲' : '정답 및 핵심 해설 열기 ▼'}
          </button>
        </div>

        {showGovernmentAnswer && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <strong className="text-amber-300 font-bold block mb-1">
                정답: "네, 가능합니다! 바로 '국채(국고채)'를 매수하는 것입니다."
              </strong>
              <p className="text-slate-200 leading-relaxed">
                국가가 고속철도, 공항, 국방 등 대규모 사업을 할 때 국민과 금융기관으로부터 돈을 빌리며 발행하는 공식 차용증서를 <strong>국채(Government Bond)</strong>라고 합니다.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <strong className="text-emerald-300 font-bold block mb-1">
                국채의 가장 큰 특징: "국가가 보증하는 최고 수준의 안전성"
              </strong>
              <p className="text-slate-200 leading-relaxed">
                대한민국이라는 국가가 망하지 않는 한 원금과 약정된 이자를 100% 보장하여 돌려주므로, 일반 예금이나 주식보다 원금 손실 위험이 극히 낮습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3 Core Components of Bonds Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
            ①
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-600 block">원금 기준</span>
            <h4 className="text-sm font-black text-slate-900">액면가 (Face Value)</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              채권 만기에 최종적으로 상환받기로 적힌 원금 금액 (예: 100만 원)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
            ②
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-600 block">약정 이자율</span>
            <h4 className="text-sm font-black text-slate-900">표면이율 (쿠폰금리)</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              매년 액면가 기준으로 지급하기로 약속된 고정 이자율 (예: 연 3.0%)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-200 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            ③
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-600 block">상환 기한</span>
            <h4 className="text-sm font-black text-slate-900">만기 (Maturity)</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              빌린 돈을 최종적으로 모두 갚기로 약속한 날짜 (예: 3년 후)
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Bond Cashflow & Comparison Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 flex-1 items-stretch">
        {/* Left: Treasury vs Corporate Bond Selector & Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                발행 주체 및 조건 선택
              </span>
              <span className="text-xs font-bold text-slate-400">
                고1 교과서 표준 모델
              </span>
            </div>

            {/* Bond Type Toggle: 국채 vs 회사채 */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setBondType('treasury');
                  setCouponRate(3.0);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  bondType === 'treasury'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Landmark className="w-4 h-4 text-blue-600" />
                  <span className="font-extrabold text-xs text-slate-900">국채 (국고채)</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  정부 발행 · 부도 위험 거의 없음 · 표면이율 연 3.0%
                </p>
              </button>

              <button
                onClick={() => {
                  setBondType('corporate');
                  setCouponRate(5.5);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  bondType === 'corporate'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-100'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-amber-600" />
                  <span className="font-extrabold text-xs text-slate-900">회사채 (기업채권)</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  기업 발행 · 신용위험 존재 · 더 높은 표면이율 연 5.5%
                </p>
              </button>
            </div>

            {/* Face Value Setting */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">액면가 (투자 원금):</span>
                <span className="text-indigo-700 font-mono text-base font-extrabold">
                  {formatManWon(faceValueMan)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[100, 300, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setFaceValueMan(amt)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      faceValueMan === amt
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {amt}만 원
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Rate */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">표면이율 (쿠폰금리):</span>
                <span className="text-emerald-700 font-mono text-base font-extrabold">
                  연 {couponRate.toFixed(1)}% (매년 {formatWon(bondCashflow.yearlyCoupon)})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2.5, 3.0, 4.0, 5.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setCouponRate(r)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      couponRate === r
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    연 {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Maturity */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">만기 (상환 기한):</span>
                <span className="text-blue-700 font-mono text-base font-extrabold">
                  {maturityYears}년 만기
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 5].map((y) => (
                  <button
                    key={y}
                    onClick={() => setMaturityYears(y)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      maturityYears === y
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {y}년
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bankruptcy Risk Notice for Corporate Bonds */}
          <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <strong className="font-extrabold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              채권의 원금 손실 위험 (신용 위험):
            </strong>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              국채는 국가가 파산하지 않는 한 안전하지만, <strong>회사채는 돈을 빌려간 기업이 부도(파산)나면 원금과 이자를 돌려받지 못하는 원금 손실</strong> 위험이 있습니다.
            </p>
          </div>
        </div>

        {/* Right: Interactive 3-Year Cashflow Timeline & In-depth Teacher Insight (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  만기 상환 현금흐름 시각화 ({formatManWon(faceValueMan)} · {maturityYears}년 만기)
                </span>
                <span className="text-sm text-emerald-400 font-extrabold font-mono">
                  총 수령액: {formatWon(bondCashflow.totalReceived)} (원금 + 이자 {formatWon(bondCashflow.totalCoupons)})
                </span>
              </div>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-bold border border-slate-700">
                연 {couponRate}% 고정 쿠폰
              </span>
            </div>

            {/* Timeline Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 my-4">
              {/* Year 0: Invest */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">발행 시점</span>
                  <h5 className="font-black text-sm text-slate-200">채권 매수</h5>
                  <p className="text-[11px] text-slate-400 mt-1">자금 대여</p>
                </div>
                <div className="mt-3 text-rose-400 font-mono font-black text-sm">
                  -{formatWon(faceValueWon)}
                </div>
              </div>

              {/* Year 1: Interest */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">1년 차</span>
                  <h5 className="font-black text-sm text-emerald-400">1차 이자</h5>
                  <p className="text-[11px] text-slate-400 mt-1">약정 쿠폰 수령</p>
                </div>
                <div className="mt-3 text-emerald-400 font-mono font-black text-sm">
                  +{formatWon(bondCashflow.yearlyCoupon)}
                </div>
              </div>

              {/* Year 2: Interest */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">2년 차</span>
                  <h5 className="font-black text-sm text-emerald-400">2차 이자</h5>
                  <p className="text-[11px] text-slate-400 mt-1">약정 쿠폰 수령</p>
                </div>
                <div className="mt-3 text-emerald-400 font-mono font-black text-sm">
                  +{formatWon(bondCashflow.yearlyCoupon)}
                </div>
              </div>

              {/* Year 3: Maturity (Principal + Final Interest) */}
              <div className="p-3 bg-emerald-950/60 rounded-2xl border-2 border-emerald-500/70 flex flex-col justify-between ring-1 ring-emerald-500/30">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block">3년 차 만기</span>
                  <h5 className="font-black text-sm text-white">원금 + 이자</h5>
                  <p className="text-[11px] text-emerald-300 mt-1">원금 전액 반환!</p>
                </div>
                <div className="mt-3 text-emerald-300 font-mono font-black text-sm">
                  +{formatWon(faceValueWon + bondCashflow.yearlyCoupon)}
                </div>
              </div>
            </div>

            {/* Total Return Scoreboard */}
            <div className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                {maturityYears}년 동안 안전하게 챙긴 순수 이자 수익:
              </span>
              <span className="text-amber-400 font-extrabold font-mono text-base">
                +{formatWon(bondCashflow.totalCoupons)} (수익률 {((bondCashflow.totalCoupons / faceValueWon) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Teacher In-depth: Inverse Relation between Interest Rate and Bond Price */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-black text-[11px] border border-indigo-500/40">
                  교사용 심화
                </span>
                <span className="text-xs font-bold text-slate-300">
                  "시장 금리가 오르면 채권 가격은 왜 떨어질까?" (금리와 채권 가격의 역의 관계)
                </span>
              </div>
              <button
                onClick={() => setShowInversionGuide(!showInversionGuide)}
                className="text-xs text-amber-300 font-bold hover:underline cursor-pointer"
              >
                {showInversionGuide ? '접기 ▲' : '심화 해설 열기 ▼'}
              </button>
            </div>

            {showInversionGuide && (
              <div className="mt-3 p-3.5 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-slate-300 space-y-2 animate-fade-in">
                <p className="leading-relaxed">
                  내가 <strong>연 3%짜리 채권</strong>을 가지고 있는데, 은행 기준금리가 급등하여 새로 발행되는 채권들이 <strong>연 5% 이자</strong>를 준다고 가정해 봅시다.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-amber-300">
                  새 채권이 연 5%를 주는데, 누가 내가 가진 연 3%짜리 구형 채권을 원래 값에 사려고 할까요? 아무도 안 사겠죠! 따라서 구형 3% 채권은 가격을 깎아서 헐값에 팔아야만 거래가 성립됩니다.
                </div>
                <p className="leading-relaxed text-[11px] text-slate-300">
                  👉 <strong>결론:</strong> 시중 금리가 <strong>상승(↑)</strong>하면 기존 채권의 매력도가 떨어져 채권 유통 가격은 <strong>하락(↓)</strong>하고, 반대로 시중 금리가 <strong>하락(↓)</strong>하면 기존 고금리 채권 가격은 <strong>상승(↑)</strong>합니다. (시소 관계)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-blue-700">💡 주식 vs 채권 핵심 비교:</span>
          <span>주식은 <strong>소유권(지분)</strong>을 사서 이익을 나누는 투자이고, 채권은 <strong>돈을 빌려주고(채권자)</strong> 약정된 이자와 원금을 돌려받는 대여입니다.</span>
        </div>
        <span className="hidden sm:inline font-bold text-slate-400">정부·기업의 자금 조달 수단</span>
      </div>
    </div>
  );
};
