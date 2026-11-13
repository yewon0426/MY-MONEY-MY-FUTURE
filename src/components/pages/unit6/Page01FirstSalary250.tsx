import React, { useState, useEffect } from 'react';
import { Wallet, Eye, Sparkles, ArrowRight } from 'lucide-react';

interface Page01Props {
  resetSignal: number;
}

type LifestyleVote = 'saver' | 'balanced' | 'spender' | null;

const ARCHETYPES = [
  {
    id: 'saver' as const,
    name: '유형 A · 알뜰 종잣돈형',
    split: '생활·여가 130만 · 저축/투자 110만 · 보험 10만',
    outcome3y: '3년 누적 원금 약 3,960만 원',
    note: '여가를 줄여 빠르게 종잣돈을 모으지만 지나친 절약은 유지 피로도가 생길 수 있습니다.',
  },
  {
    id: 'balanced' as const,
    name: '유형 B · 균형 설계형',
    split: '생활·여가 155만 · 저축/투자 85만 · 보험 10만',
    outcome3y: '3년 누적 원금 약 3,060만 원',
    note: '삶의 만족도와 저축·보험의 균형을 맞추어 오래 지속하기 좋은 구조입니다.',
  },
  {
    id: 'spender' as const,
    name: '유형 C · 현재 소비형',
    split: '생활·여가 215만 · 저축/투자 25만 · 보험 10만',
    outcome3y: '3년 누적 원금 약 900만 원',
    note: '당장 여가와 소비는 풍족하지만 돌발 지출이나 미래 독립 자금 준비가 느려집니다.',
  },
];

export const Page01FirstSalary250: React.FC<Page01Props> = ({ resetSignal }) => {
  const [selectedVote, setSelectedVote] = useState<LifestyleVote>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    setSelectedVote(null);
    setRevealed(false);
  }, [resetSignal]);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-indigo-700">
            <span>UNIT 06</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 1</span>
            <span aria-hidden="true">·</span>
            <span>실전 설계 프로젝트 도입</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            나의 첫 월급 250만 원, 어떻게 설계할까?
          </h2>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 px-5 py-2.5 rounded-2xl text-[19px] font-black text-indigo-900 shrink-0">
          가상 조건: 20대 사회초년생 · 1인 독립 가구 · 세후 실수령 250만 원
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Scenario Card & Vote */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-900 text-white rounded-2xl p-5">
              <div>
                <div className="text-[18px] font-bold text-indigo-300">매달 통장에 들어오는 금액</div>
                <div className="font-mono text-[42px] font-black text-white tabular-nums">
                  2,500,000원
                </div>
              </div>
              <Wallet className="w-12 h-12 text-indigo-300 shrink-0" />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-[19px] font-bold text-slate-800">
              <div className="font-black text-slate-900">현실 고민 3가지</div>
              <div>• 월세·식비·교통·통신비 등 숨만 쉬어도 나가는 생활비</div>
              <div>• 내 집·여행·독립을 위한 저축 및 분산 투자</div>
              <div>• 갑작스러운 병원비·가전 고장에 대비하는 보험과 비상자금</div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="text-[20px] font-black text-slate-900">
              학급 투표: 내가 사회초년생이라면 어떤 유형을 고를까요?
            </div>
            <div className="grid grid-cols-1 gap-2">
              {ARCHETYPES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSelectedVote(a.id)}
                  className={`min-h-[50px] px-4 py-2 rounded-xl text-left text-[18px] font-black border-2 cursor-pointer transition-all ${
                    selectedVote === a.id
                      ? 'bg-indigo-700 text-white border-indigo-700'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="w-full min-h-[54px] bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-[20px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-5 h-5 text-amber-300" />
              <span>{revealed ? '비교 결과 확인 완료' : '유형별 3년 뒤 결과 비교하기'}</span>
            </button>
          </div>
        </div>

        {/* Right: Reveal Panel */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          {!revealed ? (
            <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
              <Sparkles className="w-14 h-14 text-indigo-600" />
              <div className="text-[28px] font-black text-slate-900">
                생활비, 저축·투자, 여가비, 비상금을 어떻게 나눌까요?
              </div>
              <p className="text-[21px] font-bold text-slate-600 max-w-xl leading-relaxed">
                학생들이 손들기로 각 유형을 선택한 뒤, 왼쪽 &lsquo;유형별 3년 뒤 결과 비교하기&rsquo; 버튼을 눌러 3년 뒤 자산 차이를 확인하세요.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="text-[24px] font-black text-slate-900">
                월급 250만 원 배분 유형별 3년(36개월) 누적 비교
              </div>

              <div className="grid grid-cols-1 gap-3.5 flex-1">
                {ARCHETYPES.map((a) => {
                  const chosen = selectedVote === a.id;
                  return (
                    <div
                      key={a.id}
                      className={`rounded-2xl p-5 border-2 flex flex-col justify-between gap-1.5 ${
                        chosen
                          ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[22px] font-black text-slate-900">{a.name}</span>
                        <span className="font-mono text-[22px] font-black text-indigo-700">
                          {a.outcome3y}
                        </span>
                      </div>
                      <div className="text-[18px] font-extrabold text-slate-700">{a.split}</div>
                      <p className="text-[18px] font-bold text-slate-600">{a.note}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 flex items-center justify-between gap-4 text-[19px] font-bold">
                <span>
                  이제 다음 페이지부터 여러분만의 250만 원 예산표·포트폴리오·위기대응·목표를 설계해 최종 &lsquo;금융 생활 설계서&rsquo;를 완성합니다!
                </span>
                <ArrowRight className="w-6 h-6 text-amber-300 shrink-0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
