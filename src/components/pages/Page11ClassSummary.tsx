import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface Page11Props {
  resetSignal: number;
}

interface SummaryCard {
  id: number;
  term: string;
  definition: string;
  takeaway: string;
}

const SUMMARY_ITEMS: SummaryCard[] = [
  { id: 1, term: '금융 (Finance)', definition: '자금 수요자와 공급자 사이에서 돈이 융통되는 경제 활동', takeaway: '사회 전체의 부와 일자리를 만드는 경제의 혈액순환' },
  { id: 2, term: '금융시장', definition: '자금 수요자와 공급자가 금융상품을 거래하는 온·오프라인 장소', takeaway: '주식시장, 채권시장, 외환시장 등' },
  { id: 3, term: '금융기관', definition: '자금의 중개와 거래 서비스를 전문적으로 제공하는 기관', takeaway: '은행(간접금융), 증권사(직접금융), 보험사(위험보장)' },
  { id: 4, term: '금융상품', definition: '저축, 투자, 위험 보장을 목적으로 거래하는 계약 증서', takeaway: '예금, 적금, 주식, 채권, 펀드, 보험, 연금' },
  { id: 5, term: '소득과 지출', definition: '노동 등으로 얻는 돈(소득)과 생계를 위해 쓰는 돈(지출)', takeaway: '세전 월급과 실수령액의 차이, 고정지출 관리 필수' },
  { id: 6, term: '저축과 투자', definition: '원금 보존 중심의 저축 vs 고수익·원금손실 위험 감수의 투자', takeaway: '선저축 후지출 습관, 종잣돈(시드머니) 마련' },
  { id: 7, term: '자산과 부채', definition: '내가 가진 재산(자산)과 남에게 갚아야 할 빚(부채)', takeaway: '자산 − 부채 = 진짜 내 재산인 "순자산"' },
  { id: 8, term: '자산 관리의 3원칙', definition: '안전성, 수익성, 유동성(환금성)의 상충 관계(트릴레마)', takeaway: '자금의 목적과 기한에 맞춘 분산 포트폴리오 설계' },
  { id: 9, term: '금융 생활 설계', definition: '자신의 생애 주기(청년-장년-노년)에 맞추어 재무 목표를 계획하는 일', takeaway: '주체적으로 내 삶의 행복과 꿈을 지키는 내비게이션' },
];

export const Page11ClassSummary: React.FC<Page11Props> = ({ resetSignal }) => {
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  const [copied, setCopied] = useState<boolean>(false);
  const [showReflectionModal, setShowReflectionModal] = useState<boolean>(false);

  React.useEffect(() => {
    setRevealedIds(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    setCopied(false);
    setShowReflectionModal(false);
  }, [resetSignal]);

  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copySummaryText = () => {
    const text = SUMMARY_ITEMS.map(
      (item) => `${item.id}. ${item.term}: ${item.definition} (${item.takeaway})`
    ).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>수업 마무리 · 9대 핵심 개념 총정리</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "오늘의 금융 생활 정리"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          50분 동안 배운 핵심 개념들을 되짚어보고, 나의 미래 경제생활을 향한 다짐을 세워봅시다.
        </p>
      </div>

      {/* 9 Core Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-4 flex-1">
        {SUMMARY_ITEMS.map((item) => {
          const isRevealed = revealedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleReveal(item.id)}
              className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 hover:border-blue-400 shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
                    0{item.id}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-blue-600">
                    {isRevealed ? '터치하여 접기' : '터치하여 확인'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.term}
                </h3>
                {isRevealed && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed animate-fade-in">
                    {item.definition}
                  </p>
                )}
              </div>

              {isRevealed && (
                <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.takeaway}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Classroom Golden Quote & Reflection Question */}
      <div className="space-y-2 mt-2">
        {/* Golden Quote Box */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                오늘의 가장 중요한 한 줄
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                "돈을 많이 버는 것도 중요하지만, 돈을 어떻게 관리하느냐가 미래의 삶을 바꾼다."
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowReflectionModal(!showReflectionModal)}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>마지막 질문 보기</span>
            </button>
            <button
              onClick={copySummaryText}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="9대 개념 텍스트 복사"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '요약 복사'}</span>
            </button>
          </div>
        </div>

        {/* Final Reflection Modal / Expandable Box */}
        {showReflectionModal && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2 text-amber-900 font-black text-xl mb-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <span>미래의 나에게 던지는 마지막 질문</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mb-4">
              "미래의 내가 원하는 삶을 살기 위해 지금부터 무엇을 준비해야 할까요?"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-4 rounded-xl border border-amber-200">
                <strong className="text-amber-900 block mb-1">1. 나의 소비 습관 관찰하기</strong>
                <p className="text-slate-600">
                  내가 쓰는 용돈 중에서 '진짜 필요했던 것(Need)'과 '순간적인 욕심(Want)'을 구별해 봅니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200">
                <strong className="text-emerald-900 block mb-1">2. 작은 저축의 성공 경험 만들기</strong>
                <p className="text-slate-600">
                  청소년 자유적금 통장에 매달 1~2만 원이라도 스스로 모아 목표를 달성하는 기쁨을 느껴봅니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200">
                <strong className="text-blue-900 block mb-1">3. 경제 뉴스에 귀 기울이기</strong>
                <p className="text-slate-600">
                  금리, 주식, 물가, 환율 같은 금융 뉴스가 내 삶과 어떻게 연결되어 있는지 관심을 가집니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
