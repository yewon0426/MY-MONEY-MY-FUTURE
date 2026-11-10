import React, { useState } from 'react';
import {
  Layers,
  Building,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Repeat,
  CheckCircle2,
} from 'lucide-react';

interface Page6Props {
  resetSignal: number;
}

export const Page6MarketsAndInstitutions: React.FC<Page6Props> = ({ resetSignal }) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'institutions' | 'direct_indirect'>('concepts');
  const [showMarketNuance, setShowMarketNuance] = useState<boolean>(false);

  React.useEffect(() => {
    setActiveTab('concepts');
    setShowMarketNuance(false);
  }, [resetSignal]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>금융 시스템의 뼈대 이해하기</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "금융시장과 금융기관"
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl font-medium">
          시장·기관·상품의 3요소와 3대 금융기관, 그리고 직접 금융과 간접 금융의 차이를 비교해 봅시다.
        </p>
      </div>

      {/* Navigation Segmented Control */}
      <div className="flex justify-center my-4">
        <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl gap-2">
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'concepts'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. 금융 3요소 (시장·기관·상품)
          </button>
          <button
            onClick={() => setActiveTab('institutions')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'institutions'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. 3대 금융기관 비교 (은행·증권·보험)
          </button>
          <button
            onClick={() => setActiveTab('direct_indirect')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'direct_indirect'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. 직접 금융 vs 간접 금융
          </button>
        </div>
      </div>

      {/* Tab 1: 3 Core Concepts */}
      {activeTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 animate-fade-in flex-1 items-stretch">
          <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl mb-4">
                01
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                거래가 일어나는 장소
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 mb-3">금융시장</h3>
              <p className="text-base text-slate-700 leading-relaxed">
                자금의 <strong>수요자(필요한 사람)</strong>와 <strong>공급자(여유 있는 사람)</strong>가 금융상품을 거래하는 온·오프라인 시장입니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              예시: 주식시장(코스피·코스닥), 채권시장, 외환시장
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xl mb-4">
                02
              </div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                거래를 돕는 중개자
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 mb-3">금융기관</h3>
              <p className="text-base text-slate-700 leading-relaxed">
                자금의 중개나 금융거래 전문 서비스를 제공하여 자금 흐름을 원활하게 돕는 공인 기관입니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              예시: 은행, 증권회사, 보험회사, 카드사
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl mb-4">
                03
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                거래되는 구체적 수단
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 mb-3">금융상품</h3>
              <p className="text-base text-slate-700 leading-relaxed">
                저축, 투자, 미래 위험 보장 등의 구체적 목적을 위해 금융기관과 맺는 계약 및 거래 증서입니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              예시: 정기예금, 적금, 주식, 채권, 펀드, 실손보험
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3 Major Institutions */}
      {activeTab === 'institutions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 animate-fade-in flex-1 items-stretch">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase">안전성 중심</span>
                  <h3 className="text-2xl font-black text-slate-900">은행 (Bank)</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>예금과 적금:</strong> 고객의 돈을 안전하게 보관하고 정해진 약정 이자를 지급</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>대출 업무:</strong> 필요한 기업과 개인에게 자금을 빌려주고 대출 이자를 받음</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>특징:</strong> 예금자보호법(1인당 5,000만 원 한도) 적용으로 안전성이 매우 높음</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs font-bold text-blue-900 text-center">
              "간접 금융의 대표 주자"
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-400 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase">수익성 중심</span>
                  <h3 className="text-2xl font-black text-slate-900">증권회사 (Securities)</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>주식·채권 매매 중개:</strong> 투자자가 기업 주식을 사고팔 수 있도록 시장을 연결</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>기업 자금 조달 지원:</strong> 기업이 새로운 주식이나 채권을 발행할 때 주관사 역할</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>특징:</strong> 높은 수익을 기대할 수 있으나 원금 손실(투자 위험)이 발생할 수 있음</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-xl text-xs font-bold text-indigo-900 text-center">
              "직접 금융의 중개 통로"
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-400 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">위험 보장 중심</span>
                  <h3 className="text-2xl font-black text-slate-900">보험회사 (Insurance)</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>보험료 수납:</strong> 많은 가입자로부터 작은 보험료를 모아 기금을 조성</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>보험금 지급:</strong> 질병, 사고, 화재 등 우연한 위험이 발생했을 때 큰 보험금 지급</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>특징:</strong> 미래의 불확실한 경제적 위험을 분산하여 삶의 안정을 지킴</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-900 text-center">
              "미래 위험 대비 안전망"
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Direct Finance vs Indirect Finance */}
      {activeTab === 'direct_indirect' && (
        <div className="space-y-4 my-2 animate-fade-in flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct */}
            <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  투자자가 직접 기업을 선택
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-2">직접 금융 (Direct Finance)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  자금 수요자(기업)가 주식이나 채권을 직접 발행하고, 자금 공급자(투자자)가 이를 직접 매수하여 자금을 조달하는 방식입니다.
                </p>

                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-indigo-900">
                    <span>투자자 (나)</span>
                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                    <span>증권사(매매중개)</span>
                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                    <span>기업 (주식·채권)</span>
                  </div>
                  <p className="text-slate-600 pt-1">
                    • 투자 위험(원금 손실)과 높은 수익의 결과는 모두 <strong>투자자 본인의 책임</strong>입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Indirect */}
            <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  금융기관이 자기 책임으로 중개
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-2">간접 금융 (Indirect Finance)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  자금 공급자(예금자)가 은행에 돈을 맡기면, 은행이 자신의 책임과 계산으로 자금 수요자(기업·대출자)에게 대출해 주는 방식입니다.
                </p>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span>예금자 (나)</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    <span>은행(자체책임 대출)</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    <span>기업·대출자</span>
                  </div>
                  <p className="text-slate-600 pt-1">
                    • 기업이 망해도 은행은 예금자에게 약정된 예금과 이자를 돌려줄 의무가 있어 <strong>안전성</strong>이 높습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deep-Dive Nuance: Issuing Market vs Trading Market */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  !
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    선생님이 짚어주는 중요 포인트: 발행시장 vs 유통시장
                  </h4>
                  <p className="text-xs text-slate-400">
                    "내가 오늘 주식 앱에서 삼전 주식을 샀다면, 그 돈이 삼성전자의 연구비로 바로 들어갈까요?"
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMarketNuance(!showMarketNuance)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                {showMarketNuance ? '설명 접기' : '정답 확인'}
              </button>
            </div>

            {showMarketNuance && (
              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fade-in">
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <strong className="text-amber-300 block mb-1">1. 유통시장 (Secondary Market)</strong>
                  <p className="text-slate-300">
                    우리가 스마트폰 앱으로 거래하는 대부분의 주식 거래는 이미 발행된 주식을 '투자자 A'가 '투자자 B'에게 파는 <strong>유통시장 거래</strong>입니다. 기업으로 돈이 새로 들어가는 것이 아닙니다.
                  </p>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                  <strong className="text-emerald-300 block mb-1">2. 발행시장 (Primary Market)</strong>
                  <p className="text-slate-300">
                    기업이 최초로 상장(IPO)하거나 신주를 새로 찍어낼 때 투자자로부터 돈을 모으는 시장입니다. 이 때만 기업 금고로 공장 지을 새 자금이 조달됩니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Summary Bar */}
      <div className="text-center text-xs font-semibold text-slate-500 pt-2">
        💡 금융기관과 시장은 자금이 필요한 곳에 효율적으로 배분되도록 신용을 평가하고 위험을 관리하는 사회적 인프라입니다.
      </div>
    </div>
  );
};
