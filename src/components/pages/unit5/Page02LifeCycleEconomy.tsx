import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Home, HeartHandshake, Info } from 'lucide-react';

interface Page02Props {
  resetSignal: number;
}

type StageKey = 'youth' | 'youngAdult' | 'middleAge' | 'senior';

interface StageDetail {
  key: StageKey;
  label: string;
  ageRange: string;
  tagline: string;
  activity: string;
  incomeStructure: string;
  expenseFeature: string;
  financialGoal: string;
  balanceBadge: string;
  icon: React.FC<{ className?: string }>;
}

const STAGES: Record<StageKey, StageDetail> = {
  youth: {
    key: 'youth',
    label: '청소년기',
    ageRange: '10대 (학업·진로 준비)',
    tagline: '소비를 배우고 경제 습관의 기초를 세우는 시기',
    activity: '학업, 진로 탐색, 아르바이트 경험 또는 용돈 관리',
    incomeStructure: '주로 부모·보호자의 지원(용돈)과 소규모 근로 경험',
    expenseFeature: '교육비, 학용품, 여가·또래 문화 소비 중심 (소득 < 소비)',
    financialGoal: '용돈 기입장, 충동소비 절제, 소액 저축 습관 형성',
    balanceBadge: '경제적 의존 · 기초 습관기',
    icon: GraduationCap,
  },
  youngAdult: {
    key: 'youngAdult',
    label: '청년기',
    ageRange: '20~30대 초중반 (취업·독립)',
    tagline: '첫 근로소득이 시작되고 종잣돈을 모으는 시기',
    activity: '취업·사회 진출, 1인 가구 독립, 경력 개발',
    incomeStructure: '근로소득·사업소득 본격 발생 (시간이 지남에 따라 점진 증가)',
    expenseFeature: '월세·식비 등 고정 생활비와 독립 자금·자기계발비',
    financialGoal: '비상자금(생활비 3개월) 확보, 적금·투자 분산을 통한 종잣돈 형성',
    balanceBadge: '소득 시작 · 종잣돈 형성기',
    icon: Briefcase,
  },
  middleAge: {
    key: 'middleAge',
    label: '중장년기',
    ageRange: '30대 후반~50대 (소득 정점)',
    tagline: '소득이 가장 크지만 지출과 노후 준비 책임도 큰 시기',
    activity: '직업 경력 정점, 주거 안정, 가족 부양 또는 개인 삶의 확장',
    incomeStructure: '생애 중 근로소득과 자산 규모가 가장 높은 시기',
    expenseFeature: '주거비, 자녀 양육·교육비, 가족 의료비 등 큰 지출 공존',
    financialGoal: '균형 있는 자산 축적, 위험 대비(보험), 은퇴·노후 연금 본격 준비',
    balanceBadge: '최대 흑자 · 노후 대비 핵심기',
    icon: Home,
  },
  senior: {
    key: 'senior',
    label: '노년기',
    ageRange: '60대 이후 (은퇴·노후)',
    tagline: '근로소득이 줄고 미리 모아둔 자산과 연금으로 살아가는 시기',
    activity: '은퇴 이후 여가·사회 참여, 건강 관리, 재취업 일부',
    incomeStructure: '국민·퇴직·개인연금 및 보유 금융자산의 이자·배당 소득',
    expenseFeature: '근로 활동 비용은 줄지만 의료비·돌봄·생활비 지속 발생',
    financialGoal: '원금 보전 중심의 안정적 현금 흐름 유지 및 건강·의료비 대비',
    balanceBadge: '연금 인출 · 안정 유지기',
    icon: HeartHandshake,
  },
};

export const Page02LifeCycleEconomy: React.FC<Page02Props> = ({ resetSignal }) => {
  const [selectedStage, setSelectedStage] = useState<StageKey>('youngAdult');

  useEffect(() => {
    setSelectedStage('youngAdult');
  }, [resetSignal]);

  const current = STAGES[selectedStage];
  const Icon = current.icon;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-teal-700">
            <span>UNIT 05</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 2</span>
            <span aria-hidden="true">·</span>
            <span>생애 4단계 비교</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            생애 주기별 경제생활 특징
          </h2>
        </div>

        <nav
          aria-label="생애 단계 선택"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {(Object.keys(STAGES) as StageKey[]).map((k) => {
            const st = STAGES[k];
            const active = selectedStage === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setSelectedStage(k)}
                className={`min-h-[52px] px-5 py-2 rounded-xl text-[19px] font-black cursor-pointer transition-all whitespace-nowrap ${
                  active
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Stage Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
            <Icon className="w-9 h-9" />
          </div>
          <div>
            <div className="text-[19px] font-black text-teal-300">{current.ageRange}</div>
            <h3 className="text-[30px] font-black text-white">{current.label} — {current.tagline}</h3>
          </div>
        </div>
        <span className="px-4 py-2 rounded-xl bg-teal-600 text-white font-black text-[18px] whitespace-nowrap shrink-0">
          {current.balanceBadge}
        </span>
      </div>

      {/* 4 Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-center gap-2 shadow-sm">
          <span className="text-[20px] font-black text-teal-700">1. 주요 경제 활동</span>
          <p className="text-[24px] font-black text-slate-900 leading-snug">{current.activity}</p>
        </div>

        <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 flex flex-col justify-center gap-2 shadow-sm">
          <span className="text-[20px] font-black text-blue-700">2. 소득 구조 (돈이 들어오는 길)</span>
          <p className="text-[24px] font-black text-slate-900 leading-snug">{current.incomeStructure}</p>
        </div>

        <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 flex flex-col justify-center gap-2 shadow-sm">
          <span className="text-[20px] font-black text-rose-700">3. 지출 특징 (돈이 나가는 길)</span>
          <p className="text-[24px] font-black text-slate-900 leading-snug">{current.expenseFeature}</p>
        </div>

        <div className="bg-teal-50 border-2 border-teal-300 rounded-3xl p-6 flex flex-col justify-center gap-2 shadow-sm">
          <span className="text-[20px] font-black text-teal-900">4. 핵심 재무 목표</span>
          <p className="text-[24px] font-black text-teal-950 leading-snug">{current.financialGoal}</p>
        </div>
      </div>

      {/* Individual variation notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-3.5 flex items-center gap-3 text-[19px] font-bold text-amber-950">
        <Info className="w-6 h-6 text-amber-700 shrink-0" />
        <span>
          생애 단계별 특징은 일반적인 모형이며, 학업 기간·직업·건강·가족 형태 등 개인의 삶에 따라 시기와 비중이 다를 수 있습니다.
        </span>
      </div>
    </div>
  );
};
