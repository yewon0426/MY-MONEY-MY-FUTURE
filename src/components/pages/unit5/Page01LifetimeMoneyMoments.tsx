import React, { useState, useEffect } from 'react';
import { Calendar, Eye, CheckCircle2 } from 'lucide-react';

interface Page01Props {
  resetSignal: number;
}

interface LifeMoment {
  id: string;
  order: string;
  title: string;
  typicalExpenses: string;
  needWhy: string;
}

const LIFE_MOMENTS: LifeMoment[] = [
  {
    id: 'college',
    order: '① 20세 전후',
    title: '대학 진학 · 진로 준비',
    typicalExpenses: '등록금 · 교재 · 자격증 · 기숙사/통학비',
    needWhy: '소득은 아직 적지만 교육과 미래 역량 투자에 목돈이 집중됩니다.',
  },
  {
    id: 'job',
    order: '② 20대 초중반',
    title: '첫 취업 · 사회 진입',
    typicalExpenses: '직장 적응비 · 경조사 · 비상자금 적립',
    needWhy: '근로소득이 시작되므로 월급 관리 습관과 종잣돈을 처음 모아야 합니다.',
  },
  {
    id: 'indep',
    order: '③ 20대 후반',
    title: '독립 · 자취 시작',
    typicalExpenses: '월세 보증금 · 가전·가구 · 매달 생활비',
    needWhy: '보증금 같은 일시 목돈과 매월 빠져나가는 고정 생활비를 감당해야 합니다.',
  },
  {
    id: 'housing',
    order: '④ 30대 이후',
    title: '주거 마련 · 전세/내 집',
    typicalExpenses: '전세 자금 · 주택 매입 · 대출 원리금',
    needWhy: '일생에서 가장 규모가 큰 목돈이 필요해 장기 저축과 대출 관리가 중요합니다.',
  },
  {
    id: 'family',
    order: '⑤ 중장년기',
    title: '가족 형성 · 양육/돌봄',
    typicalExpenses: '생활비 증가 · 자녀 교육 · 가족 보장 보험',
    needWhy: '부양 가족과 교육·의료 지출이 늘어나는 만큼 위험 대비가 필수적입니다.',
  },
  {
    id: 'retire',
    order: '⑥ 60대 전후',
    title: '은퇴 (근로소득 감소)',
    typicalExpenses: '퇴직 전환기 생활비 · 건강관리비',
    needWhy: '매월 들어오던 근로 월급이 줄어들기 때문에 연금으로 소득을 대체해야 합니다.',
  },
  {
    id: 'senior',
    order: '⑦ 노후 생활',
    title: '은퇴 후 노년기',
    typicalExpenses: '일상 생활비 · 병원비 · 간병/돌봄비',
    needWhy: '기대수명 증가로 20~30년 이상 생활비가 계속 필요하므로 장기 현금 흐름이 핵심입니다.',
  },
];

export const Page01LifetimeMoneyMoments: React.FC<Page01Props> = ({ resetSignal }) => {
  const [selectedId, setSelectedId] = useState<string>('college');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSelectedId('college');
    setRevealedIds({});
  }, [resetSignal]);

  const active = LIFE_MOMENTS.find((m) => m.id === selectedId) || LIFE_MOMENTS[0];
  const isRevealed = Boolean(revealedIds[active.id]);

  const revealAll = () => {
    const all: Record<string, boolean> = {};
    LIFE_MOMENTS.forEach((m) => {
      all[m.id] = true;
    });
    setRevealedIds(all);
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-teal-700">
            <span>UNIT 05</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 1</span>
            <span aria-hidden="true">·</span>
            <span>생애 주기 도입</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            인생에서 큰돈이 필요한 순간은 언제일까?
          </h2>
        </div>

        <button
          type="button"
          onClick={revealAll}
          className="min-h-[52px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[18px] font-black cursor-pointer whitespace-nowrap shrink-0"
        >
          전체 단계 해설 보기
        </button>
      </div>

      {/* Horizontal 7-Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2.5">
        {LIFE_MOMENTS.map((m) => {
          const isSelected = m.id === selectedId;
          const done = Boolean(revealedIds[m.id]);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedId(m.id)}
              className={`min-h-[76px] p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-teal-700 text-white border-teal-700 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-teal-400'
              }`}
            >
              <div className="flex items-center justify-between text-[15px] font-black">
                <span className={isSelected ? 'text-teal-200' : 'text-teal-700'}>{m.order}</span>
                {done && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              </div>
              <div className="text-[19px] font-black leading-snug mt-1">{m.title}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Moment Interactive Card */}
      <div className="flex-1 bg-white border-2 border-slate-200 rounded-3xl p-7 flex flex-col justify-between gap-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[18px] font-black text-teal-700">{active.order}</span>
              <h3 className="text-[32px] font-black text-slate-900">{active.title}</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRevealedIds((prev) => ({ ...prev, [active.id]: !prev[active.id] }))}
            className="min-h-[54px] px-6 py-2.5 bg-teal-700 hover:bg-teal-600 text-white font-black text-[20px] rounded-2xl flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Eye className="w-5 h-5" />
            <span>{isRevealed ? '핵심 내용 가리기' : '필요한 지출·이유 공개하기'}</span>
          </button>
        </div>

        {!isRevealed ? (
          <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="text-[28px] font-black text-slate-900">
              질문: &ldquo;{active.title}&rdquo; 시기에는 어떤 돈이 왜 많이 필요할까요?
            </div>
            <p className="text-[21px] font-bold text-slate-600">
              학생들이 먼저 떠오르는 지출 항목을 말해보게 한 뒤, 오른쪽 위 공개 버튼을 눌러 확인하세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 flex flex-col justify-center gap-2">
              <span className="text-[20px] font-black text-teal-800">대표적으로 크게 들어가는 돈</span>
              <div className="text-[26px] font-black text-slate-900 leading-snug">
                {active.typicalExpenses}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center gap-2">
              <span className="text-[20px] font-black text-slate-700">미리 준비가 필요한 이유</span>
              <div className="text-[24px] font-bold text-slate-900 leading-relaxed">
                {active.needWhy}
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 text-[19px] font-bold">
          * 위 7단계는 대표적인 생애 사건 예시이며, 개인의 가치관·진로·가족 계획에 따라 순서나 선택은 얼마든지 달라질 수 있습니다.
        </div>
      </div>
    </div>
  );
};
