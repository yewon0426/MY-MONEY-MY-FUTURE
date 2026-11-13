import React, { useState, useEffect } from 'react';
import { FlaskConical, Eye } from 'lucide-react';

interface Page07Props {
  resetSignal: number;
}

type MacroShockKey = 'rateUp' | 'inflationUp' | 'fxUp';

interface AssetImpactItem {
  asset: string;
  directionLabel: string;
  tone: 'blue' | 'rose' | 'purple' | 'emerald';
  explanation: string;
}

const MACRO_SHOCKS: Record<
  MacroShockKey,
  {
    title: string;
    badge: string;
    summary: string;
    impacts: AssetImpactItem[];
    takeaway: string;
  }
> = {
  rateUp: {
    title: '충격 ① 기준금리 급등 (예: 2.5% → 5.0%)',
    badge: '금리 상승기',
    summary: '돈을 빌리는 비용이 비싸지고 은행의 신규 예·적금 금리가 올라가는 환경입니다.',
    impacts: [
      {
        asset: '예금 · 적금',
        directionLabel: '신규 금리 상승 요인',
        tone: 'blue',
        explanation: '새로 가입하는 예·적금의 이자율이 올라 안전자산 선호가 커집니다.',
      },
      {
        asset: '기존 채권',
        directionLabel: '가격 하락 압력',
        tone: 'rose',
        explanation: '더 높은 금리의 새 채권과 경쟁해야 해 만기 전 매매 가격은 하락 압력을 받습니다.',
      },
      {
        asset: '주식시장',
        directionLabel: '복합 요인 (단정 불가)',
        tone: 'purple',
        explanation: '이자 비용 증가는 부담이지만 기업 실적 성장 여부에 따라 주가 방향은 달라집니다.',
      },
      {
        asset: '대출 부담',
        directionLabel: '상환 이자 증가',
        tone: 'rose',
        explanation: '변동금리 대출이 있는 가계와 기업의 이자 지출이 빠르게 불어납니다.',
      },
    ],
    takeaway: '금리 상승기에는 고정 지출·대출 부담을 점검하고, 기존 장기 채권 가격 변동에 유의해야 합니다.',
  },
  inflationUp: {
    title: '충격 ② 물가 상승 지속 (예: 연 5% 이상 고물가)',
    badge: '인플레이션',
    summary: '생활필수품과 서비스 가격이 빠르게 올라 현금의 실질 구매력이 낮아지는 환경입니다.',
    impacts: [
      {
        asset: '현금 · 저금리 예금',
        directionLabel: '실질 구매력 하락',
        tone: 'rose',
        explanation: '예금 이자보다 물가가 더 많이 오르면 실질 수익률이 마이너스(-)가 됩니다.',
      },
      {
        asset: '고정금리 채권',
        directionLabel: '실질 이자 가치 축소',
        tone: 'rose',
        explanation: '약속된 명목 이자 금액이 같더라도 그 돈으로 살 수 있는 양이 줄어듭니다.',
      },
      {
        asset: '주식 · ETF',
        directionLabel: '기업별 차이 큼',
        tone: 'purple',
        explanation: '가격 전가력이 높은 기업은 방어할 수 있지만 원가 부담 큰 기업은 부진할 수 있습니다.',
      },
      {
        asset: '가계 소비 생활',
        directionLabel: '필수 생활비 증가',
        tone: 'emerald',
        explanation: '동일한 식비·교통비를 유지해도 지출 금액이 커져 예산 재조정이 필요합니다.',
      },
    ],
    takeaway: '물가가 높을 때는 현금 100% 보관보다 실질 수익률을 함께 살피며 목적별로 분산 관리해야 합니다.',
  },
  fxUp: {
    title: '충격 ③ 원/달러 환율 상승 (예: 1,250원 → 1,450원)',
    badge: '고환율 · 원화 약세',
    summary: '1달러를 사는 데 필요한 원화가 많아져 원화 가치가 하락하고 달러 가치가 오른 상황입니다.',
    impacts: [
      {
        asset: '원화 예금',
        directionLabel: '국내 가치 유지 · 대외 약세',
        tone: 'blue',
        explanation: '국내 원화 금액은 같지만 해외여행·유학·직구 시 체감 구매력은 감소합니다.',
      },
      {
        asset: '외화(달러) · 해외 자산',
        directionLabel: '원화 환산액 상승',
        tone: 'emerald',
        explanation: '보유한 달러나 해외 자산의 원화 환산 금액이 올라갑니다(단, 추후 환율 하락 시 감소 위험).',
      },
      {
        asset: '주식시장 (업종별)',
        directionLabel: '수출 vs 수입 엇갈림',
        tone: 'purple',
        explanation: '달러로 매출을 올리는 수출 기업과 해외 원재료를 수입하는 기업의 영향이 서로 다릅니다.',
      },
      {
        asset: '수입 물가',
        directionLabel: '국내 물가 자극 가능',
        tone: 'rose',
        explanation: '원유·곡물·부품 수입 가격이 올라 국내 소비자 물가 상승 압력으로 이어질 수 있습니다.',
      },
    ],
    takeaway: '환율 변동은 한쪽에는 기회, 다른 쪽에는 비용이 되므로 미래 외화 지출 여부를 기준으로 대비해야 합니다.',
  },
};

export const Page07MacroExperiment: React.FC<Page07Props> = ({ resetSignal }) => {
  const [shock, setShock] = useState<MacroShockKey>('rateUp');
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    setShock('rateUp');
    setRevealed(false);
  }, [resetSignal]);

  const current = MACRO_SHOCKS[shock];

  const toneClasses: Record<AssetImpactItem['tone'], string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    rose: 'bg-rose-50 border-rose-200 text-rose-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 7</span>
            <span aria-hidden="true">·</span>
            <span>거시경제 변화 종합 실험</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            경제 충격이 오면 내 금융 자산은 어떻게 반응할까?
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {(
            [
              { id: 'rateUp' as const, label: '금리 상승' },
              { id: 'inflationUp' as const, label: '물가 상승' },
              { id: 'fxUp' as const, label: '환율 상승' },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => {
                setShock(btn.id);
                setRevealed(false);
              }}
              className={`min-h-[52px] px-5 py-2 rounded-xl font-black text-[19px] cursor-pointer transition-all whitespace-nowrap ${
                shock === btn.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Banner */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-lg bg-amber-600 text-white text-[16px] font-black mb-1">
            {current.badge}
          </span>
          <h3 className="text-[26px] font-black text-slate-900">{current.title}</h3>
          <p className="text-[20px] font-bold text-slate-700 mt-0.5">{current.summary}</p>
        </div>

        <button
          type="button"
          onClick={() => setRevealed((prev) => !prev)}
          className="min-h-[56px] px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[20px] flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Eye className="w-6 h-6 text-amber-300" />
          <span>{revealed ? '예측 모드로 가리기' : '4대 자산 영향 공개하기'}</span>
        </button>
      </div>

      {/* Impact Grid */}
      {!revealed ? (
        <div className="flex-1 bg-white border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-5">
          <FlaskConical className="w-16 h-16 text-amber-600" />
          <div className="text-[30px] font-black text-slate-900">
            교실 토의: {current.badge} 상황에서 아래 4가지 자산은 어떻게 변할까요?
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {current.impacts.map((imp) => (
              <div
                key={imp.asset}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[22px] font-black text-slate-800"
              >
                {imp.asset}
              </div>
            ))}
          </div>
          <p className="text-[20px] font-bold text-slate-600">
            학생들과 구두로 먼저 예측을 나눈 뒤 오른쪽 위 &lsquo;4대 자산 영향 공개하기&rsquo; 버튼을 눌러주세요.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {current.impacts.map((imp) => (
              <div
                key={imp.asset}
                className={`border-2 rounded-3xl p-6 flex flex-col justify-between gap-3 ${toneClasses[imp.tone]}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[26px] font-black text-slate-900">{imp.asset}</span>
                  <span className="px-4 py-1.5 rounded-xl bg-white/90 border border-slate-300 text-[18px] font-black whitespace-nowrap">
                    {imp.directionLabel}
                  </span>
                </div>
                <p className="text-[21px] font-bold text-slate-800 leading-relaxed bg-white/80 rounded-2xl p-4">
                  {imp.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-2xl px-6 py-4 text-[21px] font-bold flex items-center justify-between gap-4">
            <span>
              <span className="text-amber-300 font-black">핵심 정리:</span> {current.takeaway}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
