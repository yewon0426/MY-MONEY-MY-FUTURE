import React from 'react';
import { X, BookOpen, CheckCircle2, Sparkles, ChevronRight, Lock } from 'lucide-react';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUnit: number;
  onSelectUnit: (unitNumber: number) => void;
}

interface UnitInfo {
  number: number;
  title: string;
  subtitle: string;
  pagesCount: number;
  status: 'completed' | 'active' | 'upcoming';
  topics: string[];
}

const UNITS: UnitInfo[] = [
  {
    number: 1,
    title: '금융 생활의 시작',
    subtitle: '소득과 지출, 금융의 본질과 자산·부채 기초',
    pagesCount: 11,
    status: 'completed',
    topics: [
      '30살 희망 월급 & 실수령액',
      '1인 가구 독립 생활비 시뮬레이터',
      '월급 300만 원 생존과 비상금',
      '재무 목표 달성 계산기',
      '금융의 본질 (자금의 융통)',
      '금융시장과 금융기관 3요소',
      '소득·지출·저축·투자 퀴즈',
      '자산 = 부채 + 순자산',
      '금융상품과 3대 원칙',
      '금융 다큐 영상 시청',
      '1차시 수업 마무리 및 성찰',
    ],
  },
  {
    number: 2,
    title: '금융 자산의 종류와 특징',
    subtitle: '예적금, 주식(가상매매), 채권(금리-가격), 펀드·ETF, 보험·연금',
    pagesCount: 7,
    status: 'active',
    topics: [
      '금융 자산 vs 실물 자산 구분',
      '보통예금·정기예금·정기적금 & 1억 원 예금자보호',
      '주식 이해·주가 실험·가상 매수·매도',
      '채권 이해·이자수익·매매차익·금리와 채권 가격',
      '펀드와 ETF 분산투자',
      '보험과 연금 (3층 보장 체계)',
      '금융상품 8종 종합 비교 & 실전 매칭',
    ],
  },
  {
    number: 3,
    title: '합리적인 자산 관리와 금융 의사결정',
    subtitle: '3대 원칙, 위험과 기대수익, 기회비용, 분산 투자 포트폴리오',
    pagesCount: 8,
    status: 'active',
    topics: [
      '100만 원, 어디에 둘까? (상황별 선택)',
      '자산 관리 3대 원칙 (삼각형 시각화)',
      '금융상품의 위험과 기대수익률',
      '합리적 선택과 기회비용',
      '분산 투자 시뮬레이터 (100% 자산 배분)',
      '금융상품 위험 상황 카드 5종',
      '나에게 맞는 금융상품 선택하기',
      '종합 의사결정 챌린지 (500만 원 배분)',
    ],
  },
  {
    number: 4,
    title: '경제·환경 변화와 금융 의사 결정',
    subtitle: '기준금리, 인플레이션, 환율 변동과 나의 금융생활',
    pagesCount: 5,
    status: 'upcoming',
    topics: ['물가상승과 실질 금리', '한국은행 기준금리 정책', '글로벌 환율과 자산'],
  },
  {
    number: 5,
    title: '생애 주기별 소득과 소비',
    subtitle: '유년기-청년기-중장년기-노년기 생애 주기 곡선 분석',
    pagesCount: 5,
    status: 'upcoming',
    topics: ['소득과 소비의 불일치', '적자-흑자-적자 생애 곡선', '생애 재무 이벤트'],
  },
  {
    number: 6,
    title: '나의 미래를 위한 금융 생활 설계',
    subtitle: '인생 100세 시대 나만의 평생 재무 계획 포트폴리오 수립',
    pagesCount: 5,
    status: 'upcoming',
    topics: ['나만의 재무 목표 로드맵', '가상 은퇴 시뮬레이션', '최종 금융 생활 선언문'],
  },
];

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  currentUnit,
  onSelectUnit,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 select-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-blue-300 block">
                2022 개정 고등학교 통합사회2 · 자산 관리와 금융 생활 설계
              </span>
              <h2 id="curriculum-modal-title" className="text-[28px] xl:text-[32px] font-black text-white">
                전체 단원 목차
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="목차 닫기"
            className="min-h-[56px] min-w-[56px] flex items-center justify-center rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Units List */}
        <div className="p-8 overflow-y-auto space-y-5 bg-[#FDFBF7]">
          {UNITS.map((unit) => {
            const isCurrent = unit.number === currentUnit;
            const isAvailable = unit.status !== 'upcoming';

            return (
              <div
                key={unit.number}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : isAvailable
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-slate-50 border-slate-200 opacity-65'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-base font-black">
                    <span
                      className={
                        unit.number === 1
                          ? 'text-blue-700'
                          : unit.number === 2
                          ? 'text-emerald-700'
                          : unit.number === 3
                          ? 'text-purple-700'
                          : 'text-slate-500'
                      }
                    >
                      UNIT 0{unit.number}
                    </span>
                    <span className="text-slate-300">·</span>
                    {unit.status === 'completed' && (
                      <span className="text-blue-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-5 h-5" /> {unit.pagesCount}차시 완성
                      </span>
                    )}
                    {unit.status === 'active' && (
                      <span className="text-emerald-800 flex items-center gap-1.5">
                        <Sparkles className="w-5 h-5" /> {unit.pagesCount}차시 학습 가능
                      </span>
                    )}
                    {unit.status === 'upcoming' && (
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Lock className="w-4 h-4" /> 추후 제작 예정
                      </span>
                    )}
                  </div>

                  <h3 className="text-[26px] xl:text-[28px] font-black text-slate-900">
                    {unit.title}
                  </h3>
                  <p className="text-[20px] text-slate-700 font-medium">{unit.subtitle}</p>
                </div>

                <div className="shrink-0">
                  {isAvailable ? (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectUnit(unit.number);
                        onClose();
                      }}
                      className={`min-h-[60px] px-7 py-3 rounded-2xl font-black text-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap ${
                        isCurrent
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{isCurrent ? '현재 학습 중' : '이 단원으로 이동'}</span>
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  ) : (
                    <span className="inline-block text-lg text-slate-500 font-bold px-5 py-3 bg-slate-100 rounded-2xl">
                      추후 제작 예정
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-white border-t border-slate-200 flex items-center justify-between text-lg text-slate-700 shrink-0">
          <span className="font-bold">UNIT 01 (11p) · UNIT 02 (7p) · UNIT 03 (8p) 총 26페이지</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[56px] px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl cursor-pointer text-lg"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
