import React, { useState } from 'react';
import { FinancialProductInfo } from '../../types';
import {
  ShieldAlert,
  TrendingUp,
  Coins,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface Page9Props {
  resetSignal: number;
}

const PRODUCTS: FinancialProductInfo[] = [
  { id: '1', name: '정기예금', category: '저축성', safety: '매우 높음', profitability: '낮음', liquidity: '보통', purpose: '목돈을 일정 기간 안전하게 묶어두고 약정 이자를 수령', features: '예금자보호 5,000만 원, 원금 보장' },
  { id: '2', name: '정기적금', category: '저축성', safety: '매우 높음', profitability: '낮음', liquidity: '보통', purpose: '매달 일정 금액을 꾸준히 부어 목돈을 만드는 대표 저축', features: '종잣돈 마련의 기본, 원금 보장' },
  { id: '3', name: '주식 (Stock)', category: '투자성', safety: '낮음', profitability: '매우 높음', liquidity: '매우 높음', purpose: '기업의 지분을 소유하여 시세 차익과 배당금 획득 추구', features: '원금 손실 가능, 시장 변동성 큼' },
  { id: '4', name: '채권 (Bond)', category: '투자성', safety: '높음', profitability: '보통', liquidity: '높음', purpose: '정부나 기업에 돈을 빌려주고 정기적 이자와 원금 상환 받음', features: '국채는 안전성 매우 높음, 회사채는 신용도에 따름' },
  { id: '5', name: '펀드 (Fund)', category: '투자성', safety: '보통', profitability: '높음', liquidity: '높음', purpose: '전문 운용사(펀드매니저)가 여러 주식·채권에 분산 투자', features: '간접 투자, 분산 투자 효과, 수수료 발생' },
  { id: '6', name: '보험 (Insurance)', category: '보장성', safety: '매우 높음', profitability: '낮음', liquidity: '낮음', purpose: '질병, 상해, 사망 등 미래의 돌발 위험을 보장받음', features: '저축 목적이 아닌 위험 대비 안전망' },
  { id: '7', name: '연금 (Pension)', category: '저축성', safety: '높음', profitability: '보통', liquidity: '낮음', purpose: '은퇴 후 노후 생활비를 매달 정기적으로 지급받는 상품', features: '국민·퇴직·개인연금, 장기 유지 필수' },
];

export const Page9ProductsAndPrinciples: React.FC<Page9Props> = ({ resetSignal }) => {
  const [selectedProduct, setSelectedProduct] = useState<FinancialProductInfo>(PRODUCTS[0]);
  const [discussionStage, setDiscussionStage] = useState<number>(0); // 0: initial, 1: student choices, 2: analysis, 3: conclusion

  React.useEffect(() => {
    setSelectedProduct(PRODUCTS[0]);
    setDiscussionStage(0);
  }, [resetSignal]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold">
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          <span>자산 관리의 3대 원칙 & 금융상품 비교</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "금융상품과 자산 관리의 3대 원칙"
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl font-medium">
          안전성, 수익성, 유동성(환금성)의 균형을 바탕으로 금융상품을 현명하게 선택하는 법을 알아봅니다.
        </p>
      </div>

      {/* 3 Pillars of Asset Management Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
        <div className="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              🛡️
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">원칙 1</span>
              <h3 className="text-xl font-black text-slate-900">안전성 (Safety)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            원금 손실의 위험이 얼마나 낮은가? (돈을 잃지 않고 지킬 수 있는 정도)
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-blue-800">
            대표: 정기예금, 적금, 국채
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              📈
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase">원칙 2</span>
              <h3 className="text-xl font-black text-slate-900">수익성 (Profitability)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            투입한 자금에 비해 얼마나 많은 이익과 수익률을 기대할 수 있는가?
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-amber-800">
            대표: 주식, 성장형 펀드
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              💧
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase">원칙 3</span>
              <h3 className="text-xl font-black text-slate-900">유동성 · 환금성 (Liquidity)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            내가 현금이 필요할 때 손실 없이 얼마나 쉽고 빠르게 돈으로 바꿀 수 있는가?
          </p>
          <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-emerald-800">
            대표: 수시입출금통장, 상장 주식
          </div>
        </div>
      </div>

      {/* 7 Products Selector Strip */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm my-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            주요 7대 금융상품 탭을 터치하여 상세 스펙 비교
          </span>
          <span className="text-xs font-semibold text-indigo-600">
            선택된 상품: {selectedProduct.name}
          </span>
        </div>

        {/* Product selector buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                selectedProduct.id === prod.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {prod.name}
            </button>
          ))}
        </div>

        {/* Selected Product Detail Card */}
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {selectedProduct.category}
              </span>
              <h4 className="text-xl font-black text-slate-900">{selectedProduct.name}</h4>
            </div>
            <p className="text-xs text-slate-600 mt-1">{selectedProduct.purpose}</p>
          </div>

          <div className="md:col-span-5 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">안전성</span>
              <span className="font-extrabold text-blue-700 mt-1 block">
                {selectedProduct.safety}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">수익성</span>
              <span className="font-extrabold text-amber-700 mt-1 block">
                {selectedProduct.profitability}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">유동성</span>
              <span className="font-extrabold text-emerald-700 mt-1 block">
                {selectedProduct.liquidity}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-slate-800 block">핵심 포인트:</strong>
            {selectedProduct.features}
          </div>
        </div>
      </div>

      {/* Classroom Situation Question: College Tuition in Stocks? */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 my-2">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>상황 질문 토론</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              "1년 뒤 꼭 필요한 대학교 등록금 500만 원을, 대박 날 것 같은 주식에 전부 투자해도 괜찮을까요?"
            </h4>
          </div>

          {/* Stepper reveal button */}
          <button
            onClick={() => setDiscussionStage((prev) => (prev >= 3 ? 0 : prev + 1))}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
          >
            {discussionStage === 0 && <span>학생 토론 및 해설 단계별 공개 (1단계 시작)</span>}
            {discussionStage === 1 && <span>2단계: 자산 관리 원칙 적용 보기</span>}
            {discussionStage === 2 && <span>3단계: 최종 교사 결론 보기</span>}
            {discussionStage === 3 && <span>처음부터 다시 보기</span>}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-stage progressive reveal */}
        {discussionStage >= 1 && (
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-fade-in">
            <div className={`p-4 rounded-2xl border transition-all ${discussionStage >= 1 ? 'bg-slate-800 border-amber-400/50' : 'opacity-40'}`}>
              <div className="text-amber-300 font-extrabold text-sm mb-1">1단계: 학생들의 예상 의견</div>
              <p className="text-slate-300 leading-relaxed">
                "절대 안 돼요! 만약 주가가 30% 폭락하면 등록금을 못 내서 휴학해야 하잖아요!" vs "1년 동안 2배 오르면 등록금 내고 용돈도 생기지 않나요?"
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${discussionStage >= 2 ? 'bg-slate-800 border-blue-400/50' : 'opacity-40'}`}>
              <div className="text-blue-300 font-extrabold text-sm mb-1">2단계: 원칙 적용 (자금 성격 분석)</div>
              <p className="text-slate-300 leading-relaxed">
                등록금은 1년 뒤라는 <strong>'기한이 명확히 정해진 필수 목적 자금'</strong>입니다. 주식 시장이 침체되어 원금이 깎이면 회복을 기다릴 시간적 여유가 없으므로 <strong>안전성</strong>이 최우선되어야 합니다.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${discussionStage >= 3 ? 'bg-emerald-950/80 border-emerald-400/80' : 'opacity-40'}`}>
              <div className="text-emerald-300 font-extrabold text-sm mb-1">3단계: 올바른 자산 관리 결론</div>
              <p className="text-slate-200 leading-relaxed">
                따라서 1년제 <strong>정기예금이나 적금</strong>처럼 원금이 100% 보장되는 안전한 상품에 넣어두는 것이 정답입니다. 투자는 5~10년 이상 잃어도 당장 생계에 지장 없는 여유 자금으로 해야 합니다.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400">
        ※ 금융상품의 위험 수준은 고정 불변이 아니며, 채권의 발행 주체 신용등급이나 펀드의 자산 구성 등 세부 조건에 따라 달라집니다.
      </div>
    </div>
  );
};
