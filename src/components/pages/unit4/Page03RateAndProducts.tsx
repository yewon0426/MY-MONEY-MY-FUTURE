import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Eye, Scale } from 'lucide-react';

interface Page03Props {
  resetSignal: number;
}

type RateDirection = 'hike' | 'cut';

interface ProductEffectCard {
  id: string;
  productName: string;
  hikeHeadline: string;
  hikeDetail: string;
  hikeBadge: string;
  cutHeadline: string;
  cutDetail: string;
  cutBadge: string;
}

const PRODUCT_EFFECTS: ProductEffectCard[] = [
  {
    id: 'deposit',
    productName: '1. 예금 · 적금',
    hikeHeadline: '신규 예·적금 이자 상승',
    hikeDetail: '은행이 높은 이자를 제시하므로 안전한 예·적금에 자금을 맡기려는 유인이 커집니다.',
    hikeBadge: '신규 금리 상승',
    cutHeadline: '신규 예·적금 이자 하락',
    cutDetail: '은행 이자가 낮아지면 물가 상승률을 이기기 어려워 다른 투자처에 대한 관심이 커집니다.',
    cutBadge: '신규 금리 하락',
  },
  {
    id: 'loan',
    productName: '2. 대출 이자 부담',
    hikeHeadline: '변동금리 대출 이자 급증',
    hikeDetail: '주택담보·신용대출 이자가 올라 가계 소비 여력과 기업 투자 여력이 줄어듭니다.',
    hikeBadge: '상환 부담 증가',
    cutHeadline: '대출 이자 부담 완화',
    cutDetail: '빌린 돈의 이자가 줄어 가계와 기업의 자금 조달·소비·설비 투자 여력이 늘어납니다.',
    cutBadge: '상환 부담 감소',
  },
  {
    id: 'bond',
    productName: '3. 기존 채권 가격',
    hikeHeadline: '기존 채권 가격 하락 압력',
    hikeDetail: '더 높은 금리의 새 채권이 발행되므로, 기존 저금리 채권을 팔려면 가격을 낮춰야 합니다.',
    hikeBadge: '가격 하락 요인',
    cutHeadline: '기존 채권 가격 상승 압력',
    cutDetail: '높은 이자를 주던 기존 채권의 가치가 돋보이면서 만기 전 매매 시 가격이 오를 수 있습니다.',
    cutBadge: '가격 상승 요인',
  },
  {
    id: 'stock',
    productName: '4. 주식시장 (복합 요인)',
    hikeHeadline: '조달 비용↑ · 실적·기대에 따라 상이',
    hikeDetail: '금리 상승은 기업 이자 부담과 할인율을 높여 하락 요인이 되지만, 호황기 기업 이익 성장 시 주가가 오를 수도 있어 단일 방향으로 단정할 수 없습니다.',
    hikeBadge: '복합 요인 작용',
    cutHeadline: '유동성↑ · 경기 침체 우려와 공존',
    cutDetail: '금리 인하는 기업 부담을 낮추고 자금 유입 요인이 되지만, 경기 침체 때문에 급히 내린 경우에는 기업 실적 악화로 주가가 하락할 수도 있습니다.',
    cutBadge: '복합 요인 작용',
  },
];

export const Page03RateAndProducts: React.FC<Page03Props> = ({ resetSignal }) => {
  const [direction, setDirection] = useState<RateDirection>('hike');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDirection('hike');
    setRevealedIds({});
  }, [resetSignal]);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    setRevealedIds({ deposit: true, loan: true, bond: true, stock: true });
  };

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-amber-700">
            <span>UNIT 04</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 3</span>
            <span aria-hidden="true">·</span>
            <span>기준금리 파급 경로</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            금리가 오르고 내리면 금융상품은 어떻게 변할까?
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setDirection('hike');
              setRevealedIds({});
            }}
            className={`min-h-[52px] px-5 py-2 rounded-xl text-[19px] font-black flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
              direction === 'hike'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>금리 상승기 (인상)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDirection('cut');
              setRevealedIds({});
            }}
            className={`min-h-[52px] px-5 py-2 rounded-xl text-[19px] font-black flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
              direction === 'cut'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <TrendingDown className="w-5 h-5" />
            <span>금리 하락기 (인하)</span>
          </button>

          <button
            type="button"
            onClick={revealAll}
            className="min-h-[52px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[18px] font-black cursor-pointer whitespace-nowrap"
          >
            전체 해설 보기
          </button>
        </div>
      </div>

      {/* Scenario Prompt */}
      <div
        className={`rounded-2xl px-6 py-4 flex items-center justify-between gap-4 border ${
          direction === 'hike'
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : 'bg-blue-50 border-blue-200 text-blue-950'
        }`}
      >
        <div className="text-[22px] font-black">
          {direction === 'hike'
            ? '시나리오 A: 한국은행이 물가 안정을 위해 기준금리를 인상했습니다. (예: 2.5% → 4.5%)'
            : '시나리오 B: 한국은행이 경기 활성화를 위해 기준금리를 인하했습니다. (예: 4.5% → 2.5%)'}
        </div>
        <span className="text-[19px] font-bold shrink-0">카드를 눌러 예측 확인</span>
      </div>

      {/* 4 Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {PRODUCT_EFFECTS.map((item) => {
          const isRevealed = Boolean(revealedIds[item.id]);
          const headline = direction === 'hike' ? item.hikeHeadline : item.cutHeadline;
          const detail = direction === 'hike' ? item.hikeDetail : item.cutDetail;
          const badge = direction === 'hike' ? item.hikeBadge : item.cutBadge;

          return (
            <div
              key={item.id}
              className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[26px] font-black text-slate-900">{item.productName}</h3>
                {isRevealed && (
                  <span
                    className={`px-4 py-1.5 rounded-xl text-[18px] font-black whitespace-nowrap ${
                      item.id === 'stock'
                        ? 'bg-purple-100 text-purple-900'
                        : direction === 'hike'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </div>

              {!isRevealed ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 gap-3 text-center">
                  <p className="text-[21px] font-bold text-slate-700">
                    학생들과 먼저 방향을 예측한 뒤 결과를 확인하세요.
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleReveal(item.id)}
                    className="min-h-[54px] px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-[20px] flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-5 h-5" />
                    <span>영향 확인하기</span>
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-2xl p-5 gap-3">
                  <div>
                    <div className="text-[24px] font-black text-slate-900 flex items-center gap-2">
                      {item.id === 'stock' && <Scale className="w-6 h-6 text-purple-700 shrink-0" />}
                      <span>{headline}</span>
                    </div>
                    <p className="text-[20px] font-bold text-slate-700 leading-relaxed mt-2">
                      {detail}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => toggleReveal(item.id)}
                      className="min-h-[42px] px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-[17px] font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      가리기
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
