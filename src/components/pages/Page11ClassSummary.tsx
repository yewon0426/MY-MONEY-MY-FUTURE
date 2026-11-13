import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';

interface Page11Props {
  resetSignal: number;
}

type SummaryStep = 'step1' | 'step2';

interface SummaryCard {
  id: number;
  term: string;
  definition: string;
  takeaway: string;
}

const SUMMARY_ITEMS: SummaryCard[] = [
  { id: 1, term: '금융 (Finance)', definition: '자금 수요자와 공급자 사이에서 돈이 융통되는 경제 활동', takeaway: '경제 전체를 살리는 혈액순환 역할' },
  { id: 2, term: '금융시장', definition: '자금 수요자와 공급자가 금융상품을 거래하는 온·오프라인 장소', takeaway: '주식시장, 채권시장, 외환시장 등' },
  { id: 3, term: '금융기관', definition: '자금의 중개와 거래 서비스를 전문적으로 제공하는 공인 기관', takeaway: '은행(간접), 증권사(직접), 보험사(보장)' },
  { id: 4, term: '금융상품', definition: '저축, 투자, 위험 보장을 목적으로 거래하는 계약 증서', takeaway: '예금, 적금, 주식, 채권, 펀드, 보험, 연금' },
  { id: 5, term: '소득과 지출', definition: '노동 등으로 얻는 돈(소득)과 생계를 위해 쓰는 돈(지출)', takeaway: '세전 vs 실수령 차이, 고정지출 관리 필수' },
  { id: 6, term: '저축과 투자', definition: '원금 보존 중심의 저축 vs 원금손실 위험을 감수하는 투자', takeaway: '선저축 후지출 습관, 종잣돈 마련' },
  { id: 7, term: '자산과 부채', definition: '내가 가진 재산(자산)과 남에게 갚아야 할 빚(부채)', takeaway: '자산 − 부채 = 진짜 내 재산(순자산)' },
  { id: 8, term: '자산 관리의 3원칙', definition: '안전성, 수익성, 유동성(환금성) 사이의 균형 잡기', takeaway: '자금 목적과 기한에 맞춘 분산 투자' },
  { id: 9, term: '금융 생활 설계', definition: '자신의 생애 주기에 맞추어 재무 목표를 계획하는 일', takeaway: '내 삶의 행복을 지키는 경제 내비게이션' },
];

export const Page11ClassSummary: React.FC<Page11Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<SummaryStep>('step1');
  const [groupIdx, setGroupIdx] = useState<number>(0); // 0: 1-3, 1: 4-6, 2: 7-9
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep('step1');
    setGroupIdx(0);
    setRevealedIds(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    setCopied(false);
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

  const visibleItems = SUMMARY_ITEMS.slice(groupIdx * 3, groupIdx * 3 + 3);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-emerald-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 11</span>
            <span aria-hidden="true">·</span>
            <span>50분 수업 마무리 정리</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            오늘의 금융 생활 핵심 총정리
          </h2>
        </div>

        <nav
          aria-label="수업 마무리 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 9대 핵심 개념' },
            { id: 'step2' as const, label: 'STEP 2. 오늘의 한 줄 & 다짐' },
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

      {/* ================= STEP 1. 9대 핵심 개념 (3개씩 보기) ================= */}
      {activeStep === 'step1' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-3xl p-5 border-2 border-slate-200">
            <div className="flex flex-wrap gap-2.5">
              {[
                { idx: 0, label: '1 ~ 3번 개념 (금융의 틀)' },
                { idx: 1, label: '4 ~ 6번 개념 (상품·소득·저축)' },
                { idx: 2, label: '7 ~ 9번 개념 (순자산·설계)' },
              ].map((g) => (
                <button
                  key={g.idx}
                  type="button"
                  onClick={() => setGroupIdx(g.idx)}
                  className={`min-h-[56px] px-5 rounded-2xl text-[20px] font-black cursor-pointer ${
                    groupIdx === g.idx
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={copySummaryText}
              className="min-h-[56px] px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-[20px] flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? '9대 개념 복사 완료!' : '전체 요약 복사'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
            {visibleItems.map((item) => {
              const isRevealed = revealedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleReveal(item.id)}
                  className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-500 text-left flex flex-col justify-between gap-5 cursor-pointer transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 text-[24px] font-black flex items-center justify-center">
                        0{item.id}
                      </span>
                      <span className="text-[18px] font-bold text-slate-500">
                        {isRevealed ? '터치하여 접기' : '터치하여 펼치기'}
                      </span>
                    </div>
                    <h3 className="text-[32px] font-black text-slate-900 mb-3">
                      {item.term}
                    </h3>
                    {isRevealed && (
                      <p className="text-[24px] font-medium text-slate-800 leading-relaxed">
                        {item.definition}
                      </p>
                    )}
                  </div>

                  {isRevealed && (
                    <div className="pt-4 border-t border-slate-200 text-[20px] font-black text-emerald-800 flex items-center gap-2.5">
                      <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-600" />
                      <span>{item.takeaway}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 2. 오늘의 한 줄 & 다짐 ================= */}
      {activeStep === 'step2' && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-3">
            <span className="text-[20px] font-black text-amber-300 block">
              오늘의 가장 중요한 한 줄
            </span>
            <p className="text-[32px] xl:text-[40px] font-black text-white leading-snug">
              &ldquo;돈을 많이 버는 것도 중요하지만, 돈을 어떻게 관리하느냐가 미래의 삶을 바꾼다.&rdquo;
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-8 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-amber-950 font-black text-[22px]">
                <BookOpen className="w-7 h-7 text-amber-700" />
                <span>미래의 나에게 던지는 마지막 질문</span>
              </div>
              <h3 className="text-[30px] xl:text-[36px] font-black text-slate-900">
                &ldquo;미래의 내가 원하는 삶을 살기 위해 지금부터 무엇을 준비해야 할까요?&rdquo;
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
                <strong className="text-amber-950 text-[26px] font-black block mb-2">
                  1. 소비 습관 관찰하기
                </strong>
                <p className="text-[22px] text-slate-800 font-medium leading-relaxed">
                  용돈 중에서 <strong className="text-amber-800">필요(Need)</strong>와{' '}
                  <strong className="text-amber-800">욕구(Want)</strong>를 구별해 봅니다.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
                <strong className="text-emerald-950 text-[26px] font-black block mb-2">
                  2. 작은 저축 성공하기
                </strong>
                <p className="text-[22px] text-slate-800 font-medium leading-relaxed">
                  매달 1~2만 원이라도 스스로 모아 목표를 달성하는 성취감을 느껴봅니다.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
                <strong className="text-blue-950 text-[26px] font-black block mb-2">
                  3. 경제 뉴스 읽기
                </strong>
                <p className="text-[22px] text-slate-800 font-medium leading-relaxed">
                  금리·주식·물가·환율이 내 삶과 어떻게 연결되어 있는지 관심을 가집니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
