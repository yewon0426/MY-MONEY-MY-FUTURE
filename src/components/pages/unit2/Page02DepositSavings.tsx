import React, { useState } from 'react';
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  formatWon,
  formatManWon,
} from '../../../utils/finance';
import {
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  HelpCircle,
  Calculator,
  Percent,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface Page02Props {
  resetSignal: number;
}

export const Page02DepositSavings: React.FC<Page02Props> = ({ resetSignal }) => {
  const [depositType, setDepositType] = useState<'time' | 'saving' | 'demand'>('time');
  const [principalMan, setPrincipalMan] = useState<number>(100); // 100만 원
  const [annualRate, setAnnualRate] = useState<number>(5.0); // 5.0%
  const [durationYears, setDurationYears] = useState<number>(1); // 1년
  const [taxMode, setTaxMode] = useState<'preTax' | 'postTax'>('preTax');
  const [showProtectionInfo, setShowProtectionInfo] = useState<boolean>(false);

  React.useEffect(() => {
    setDepositType('time');
    setPrincipalMan(100);
    setAnnualRate(5.0);
    setDurationYears(1);
    setTaxMode('preTax');
    setShowProtectionInfo(false);
  }, [resetSignal]);

  const principalWon = principalMan * 10000;
  const simpleResult = calculateSimpleInterest(principalWon, annualRate, durationYears);
  const compoundResult = calculateCompoundInterest(principalWon, annualRate, durationYears);

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <PiggyBank className="w-3.5 h-3.5 text-blue-600" />
          <span>UNIT 02 · 2차시 / 저축의 기본</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "예금과 적금 · 단리와 복리"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          보통예금·정기예금·정기적금의 차이를 익히고, 금리와 시간에 따른 이자를 계산해 봅시다.
        </p>
      </div>

      {/* 3 Types Comparison Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
        <button
          onClick={() => setDepositType('demand')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            depositType === 'demand'
              ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase">수시입출금식</span>
            <h3 className="text-lg font-black text-slate-900">보통예금 (수시입출금)</h3>
            <p className="text-xs text-slate-600 mt-1">
              언제든지 자유롭게 입금하고 찾을 수 있는 통장입니다.
            </p>
          </div>
          <div className="mt-2 text-xs font-bold text-slate-400">
            금리: 0.1% 수준 (유동성 최고, 수익성 최저)
          </div>
        </button>

        <button
          onClick={() => setDepositType('time')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            depositType === 'time'
              ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase">목돈 굴리기</span>
            <h3 className="text-lg font-black text-slate-900">정기예금 (Fixed Deposit)</h3>
            <p className="text-xs text-slate-600 mt-1">
              목돈(예: 1,000만 원)을 일정 기간 동안 묶어두고 약정된 높은 이자를 받는 상품입니다.
            </p>
          </div>
          <div className="mt-2 text-xs font-bold text-indigo-700">
            목돈 거치용 (중도 해지 시 약정 이자 감소)
          </div>
        </button>

        <button
          onClick={() => setDepositType('saving')}
          className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            depositType === 'saving'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase">목돈 만들기</span>
            <h3 className="text-lg font-black text-slate-900">정기적금 (Installment)</h3>
            <p className="text-xs text-slate-600 mt-1">
              매달 정해진 날에 일정 금액(예: 매달 20만 원)을 부어 만기에 큰 목돈을 만듭니다.
            </p>
          </div>
          <div className="mt-2 text-xs font-bold text-emerald-700">
            종잣돈 형성용 (사회초년생 첫걸음)
          </div>
        </button>
      </div>

      {/* Main Interactive Interest & Compound Simulator Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 flex-1 items-stretch">
        {/* Left (6 cols): Parameters Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <span className="font-extrabold text-base text-slate-900">
                  이자 계산 시뮬레이터 (정기예금 기준)
                </span>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setTaxMode('preTax')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                    taxMode === 'preTax' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  세전 이자
                </button>
                <button
                  onClick={() => setTaxMode('postTax')}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                    taxMode === 'postTax' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                  }`}
                >
                  세후 실수령 (15.4% 공제)
                </button>
              </div>
            </div>

            {/* Principal Setting */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">예금 원금 (Principal):</span>
                <span className="text-indigo-700 font-mono text-base font-extrabold">
                  {formatManWon(principalMan)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[100, 300, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setPrincipalMan(amt)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      principalMan === amt
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {amt}만 원
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Setting */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">연 금리 (Interest Rate):</span>
                <span className="text-amber-700 font-mono text-base font-extrabold">
                  연 {annualRate.toFixed(1)}%
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3.0, 4.0, 5.0, 7.0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setAnnualRate(r)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      annualRate === r
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    연 {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Setting */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold">
                <span className="text-slate-600">예치 기간 (Maturity Period):</span>
                <span className="text-emerald-700 font-mono text-base font-extrabold">
                  {durationYears}년 만기
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 5, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setDurationYears(y)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      durationYears === y
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {y}년
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Formula Card */}
          <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-800 font-bold block mb-1">
              💡 교과서 예제 질문 확인:
            </strong>
            "100만 원을 연 5% 금리로 1년간 예금하면 세전 이자는?" →{' '}
            <span className="text-blue-700 font-extrabold font-mono text-sm">
              정답: 50,000원
            </span>{' '}
            (100만 원 × 0.05 × 1년)
          </div>
        </div>

        {/* Right (6 cols): Simple vs Compound Growth Comparison */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  단리 vs 복리 수령액 비교 ({durationYears}년 후)
                </span>
                <span className="text-sm text-slate-300">
                  원금 {formatManWon(principalMan)} · 연 {annualRate}% 기준
                </span>
              </div>
              <span className="text-xs text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full font-bold">
                {taxMode === 'preTax' ? '세전 금액' : '세후(15.4% 공제) 금액'}
              </span>
            </div>

            {/* 2 Big Scorecards: Simple vs Compound */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {/* Simple */}
              <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                <span className="text-xs text-slate-400 font-bold uppercase block">
                  단리 (Simple Interest)
                </span>
                <span className="text-xs text-slate-400">오직 '원금'에만 이자 발생</span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono my-2">
                  {formatWon(
                    taxMode === 'preTax' ? simpleResult.totalPreTax : simpleResult.totalPostTax
                  )}
                </div>
                <div className="text-xs text-blue-400 font-semibold">
                  총 이자: +
                  {formatWon(
                    taxMode === 'preTax' ? simpleResult.preTaxInterest : simpleResult.postTaxInterest
                  )}
                </div>
              </div>

              {/* Compound */}
              <div className="bg-emerald-950/50 rounded-2xl p-4 border border-emerald-500/50">
                <span className="text-xs text-emerald-300 font-bold uppercase block">
                  복리 (Compound Interest)
                </span>
                <span className="text-xs text-emerald-300/80">'원금 + 붙은 이자'에 또 이자 발생</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono my-2">
                  {formatWon(
                    taxMode === 'preTax'
                      ? compoundResult.totalPreTax
                      : Math.floor(principalWon + compoundResult.preTaxInterest * 0.846)
                  )}
                </div>
                <div className="text-xs text-emerald-300 font-semibold">
                  총 이자: +
                  {formatWon(
                    taxMode === 'preTax'
                      ? compoundResult.preTaxInterest
                      : Math.floor(compoundResult.preTaxInterest * 0.846)
                  )}
                </div>
              </div>
            </div>

            {/* Gap Difference Badge */}
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                {durationYears}년 후 복리가 단리보다 더 주는 추가 이익:
              </span>
              <span className="text-amber-400 font-bold font-mono text-sm">
                +{formatWon(compoundResult.totalPreTax - simpleResult.totalPreTax)} 차이!
              </span>
            </div>

            {/* Multi-Year Visual Graph Bars */}
            <div className="mt-3 space-y-1.5">
              <span className="text-[11px] text-slate-400 font-bold block">
                연도별 복리 vs 단리 격차 시각화 (시간이 지날수록 가속):
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                {compoundResult.yearlyBreakdown.slice(0, 5).map((yd) => (
                  <div key={yd.year} className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                    <span className="text-slate-400 block font-bold">{yd.year}년차</span>
                    <span className="text-emerald-400 font-mono font-bold block mt-0.5">
                      +{formatWon(yd.difference)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Protection System Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase block">
              금융 소비자 보호 상식 · 예금자보호제도
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-900">
              은행이 부도나도 <strong>1인당 최고 5,000만 원(원금+이자)</strong>까지 예금보험공사가 보호합니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowProtectionInfo(!showProtectionInfo)}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
        >
          {showProtectionInfo ? '안내 접기' : '보호 대상 상품 확인'}
        </button>
      </div>

      {showProtectionInfo && (
        <div className="bg-white border border-emerald-300 rounded-2xl p-4 text-xs text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in shadow-md">
          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            <strong className="text-emerald-900 font-bold block mb-1">
              ✅ 예금자보호 대상 상품 (안전)
            </strong>
            <p className="leading-relaxed">
              은행의 보통예금, 정기예금, 정기적금, 개인퇴직연금(IRP 등 일부). 은행이 망하더라도 원금과 이자를 합쳐 5,000만 원까지 국가가 대신 지급합니다.
            </p>
          </div>
          <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100">
            <strong className="text-rose-900 font-bold block mb-1">
              ❌ 예금자보호 비대상 상품 (주의)
            </strong>
            <p className="leading-relaxed">
              주식, 펀드, 채권, 수익증권, 변액보험 등. 투자성 상품은 시장 가격 변동에 따른 원금 손실 위험이 있으므로 예금자보호법이 적용되지 않습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
