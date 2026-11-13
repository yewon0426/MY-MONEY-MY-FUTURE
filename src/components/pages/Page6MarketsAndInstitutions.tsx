import React, { useState, useEffect } from 'react';
import {
  Building,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface Page6Props {
  resetSignal: number;
}

type MarketTab = 'concepts' | 'institutions' | 'direct_indirect';

export const Page6MarketsAndInstitutions: React.FC<Page6Props> = ({ resetSignal }) => {
  const [activeTab, setActiveTab] = useState<MarketTab>('concepts');
  const [showMarketNuance, setShowMarketNuance] = useState<boolean>(false);

  useEffect(() => {
    setActiveTab('concepts');
    setShowMarketNuance(false);
  }, [resetSignal]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 6</span>
            <span aria-hidden="true">·</span>
            <span>금융 시스템의 구조</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            금융시장과 금융기관
          </h2>
        </div>

        <nav
          aria-label="금융시장과 기관 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'concepts' as const, label: 'STEP 1. 금융 3요소' },
            { id: 'institutions' as const, label: 'STEP 2. 3대 금융기관' },
            { id: 'direct_indirect' as const, label: 'STEP 3. 직접 vs 간접금융' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[54px] px-4 py-2.5 rounded-xl text-[18px] xl:text-[20px] font-black transition-all cursor-pointer whitespace-nowrap ${
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

      {/* ================= STEP 1. 금융 3요소 ================= */}
      {activeTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-5">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-[28px] mb-4">
                01
              </div>
              <span className="text-[20px] font-black text-blue-700 block">거래가 일어나는 장소</span>
              <h3 className="text-[32px] font-black text-slate-900 mt-1 mb-4">금융시장</h3>
              <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                자금의 <strong className="text-slate-950 font-black">수요자</strong>와{' '}
                <strong className="text-slate-950 font-black">공급자</strong>가 만나 금융상품을 거래하는 온·오프라인 시장입니다.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 text-[20px] font-bold text-blue-950">
              예시: 주식시장(코스피), 채권시장, 외환시장
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-indigo-200 flex flex-col justify-between gap-5">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-[28px] mb-4">
                02
              </div>
              <span className="text-[20px] font-black text-indigo-700 block">거래를 돕는 중개자</span>
              <h3 className="text-[32px] font-black text-slate-900 mt-1 mb-4">금융기관</h3>
              <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                자금의 중개와 전문 서비스를 제공하여 돈이 안전하고 원활하게 흐르도록 돕는 공인 기관입니다.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-5 text-[20px] font-bold text-indigo-950">
              예시: 은행, 증권회사, 보험회사, 카드사
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 flex flex-col justify-between gap-5">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-[28px] mb-4">
                03
              </div>
              <span className="text-[20px] font-black text-emerald-700 block">거래되는 구체적 수단</span>
              <h3 className="text-[32px] font-black text-slate-900 mt-1 mb-4">금융상품</h3>
              <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                저축, 투자, 위험 보장을 목적으로 금융기관과 맺는 계약 및 거래 증서입니다.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 text-[20px] font-bold text-emerald-950">
              예시: 정기예금, 적금, 주식, 채권, 펀드, 보험
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 3대 금융기관 ================= */}
      {activeTab === 'institutions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Building className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[19px] font-black text-blue-700 block">안전성 중심</span>
                  <h3 className="text-[30px] font-black text-slate-900">은행 (Bank)</h3>
                </div>
              </div>
              <ul className="space-y-3.5 text-[22px] text-slate-800 font-medium leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <span>예금·적금을 받아 보관하고 약정 이자를 지급</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <span>기업과 개인에게 자금을 대출해 주고 이자 수취</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <span><strong>예금자보호법 1억 원 한도</strong> 적용 (안전성 최고)</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl text-[22px] font-black text-blue-950 text-center">
              간접 금융의 대표 기관
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-indigo-200 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[19px] font-black text-indigo-700 block">수익성 중심</span>
                  <h3 className="text-[30px] font-black text-slate-900">증권회사</h3>
                </div>
              </div>
              <ul className="space-y-3.5 text-[22px] text-slate-800 font-medium leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                  <span>투자자가 주식·채권을 사고팔 수 있도록 매매 중개</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                  <span>기업의 상장(IPO) 및 채권 발행을 지원</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                  <span>높은 수익 기대 vs 원금 손실 위험 본인 부담</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl text-[22px] font-black text-indigo-950 text-center">
              직접 금융의 중개 통로
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[19px] font-black text-emerald-700 block">위험 보장 중심</span>
                  <h3 className="text-[30px] font-black text-slate-900">보험회사</h3>
                </div>
              </div>
              <ul className="space-y-3.5 text-[22px] text-slate-800 font-medium leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <span>가입자로부터 작은 보험료를 모아 기금 조성</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <span>질병·사고 등 우연한 위기 발생 시 보험금 지급</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <span>미래의 불확실한 경제적 충격을 공동 분산</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl text-[22px] font-black text-emerald-950 text-center">
              미래 위험 대비 안전망
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3. 직접 vs 간접금융 ================= */}
      {activeTab === 'direct_indirect' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border-2 border-indigo-200 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <span className="text-[20px] font-black text-indigo-700 block">투자자가 직접 기업 선택</span>
                <h3 className="text-[32px] font-black text-slate-900">직접 금융</h3>
                <p className="text-[22px] text-slate-800 font-medium leading-relaxed">
                  기업이 발행한 주식이나 채권을 투자자가 직접 매수해 자금을 조달하는 방식입니다.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between font-black text-indigo-950 text-[22px]">
                  <span>투자자(나)</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>증권사 중개</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>기업(주식·채권)</span>
                </div>
                <p className="text-[20px] font-bold text-indigo-900">
                  고수익과 원금 손실 위험 모두 투자자 본인의 책임!
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <span className="text-[20px] font-black text-blue-700 block">금융기관이 자기 책임으로 중개</span>
                <h3 className="text-[32px] font-black text-slate-900">간접 금융</h3>
                <p className="text-[22px] text-slate-800 font-medium leading-relaxed">
                  예금자가 은행에 돈을 맡기면, 은행이 자신의 책임과 판단으로 기업·개인에게 대출해 주는 방식입니다.
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between font-black text-blue-950 text-[22px]">
                  <span>예금자(나)</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>은행(자체책임)</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>대출자</span>
                </div>
                <p className="text-[20px] font-bold text-blue-900">
                  대출 기업이 어려워져도 은행이 예금과 약정 이자를 지급!
                </p>
              </div>
            </div>
          </div>

          {/* Issuing vs Trading Market Nuance */}
          <div className="bg-slate-900 text-white rounded-3xl p-7 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-[20px] font-black text-amber-300 block">중요 구분 · 발행시장 vs 유통시장</span>
                <h4 className="text-[26px] xl:text-[28px] font-black text-white">
                  &ldquo;내가 오늘 주식 앱에서 주식을 사면 그 돈이 바로 회사로 들어갈까요?&rdquo;
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowMarketNuance(!showMarketNuance)}
                className="min-h-[60px] px-7 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[22px] rounded-2xl cursor-pointer shrink-0"
              >
                {showMarketNuance ? '정답 접기' : '정답 확인'}
              </button>
            </div>

            {showMarketNuance && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-700">
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <strong className="text-amber-300 text-[24px] font-black block mb-1.5">
                    1. 유통시장 (일반 주식 거래)
                  </strong>
                  <p className="text-[21px] text-slate-200 leading-relaxed font-medium">
                    앱에서 주식을 사는 거래는 이미 발행된 주식을 다른 투자자에게 사는 것이므로 회사로 새 돈이 직접 들어가지 않습니다.
                  </p>
                </div>
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <strong className="text-emerald-300 text-[24px] font-black block mb-1.5">
                    2. 발행시장 (IPO · 신주 발행)
                  </strong>
                  <p className="text-[21px] text-slate-200 leading-relaxed font-medium">
                    기업이 최초 상장(공모주)하거나 신주를 새로 발행해 투자자에게 돈을 조달할 때만 기업 금고로 자금이 들어갑니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
