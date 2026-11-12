import React from 'react';
import { X, BookOpen, CheckCircle2, Clock, Sparkles, ChevronRight, Lock } from 'lucide-react';

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
      'EBS 다큐 금융 영상 시청',
      '1차시 수업 마무리 및 성찰',
    ],
  },
  {
    number: 2,
    title: '금융 자산의 종류와 특징',
    subtitle: '예적금, 주식, 채권, 펀드·ETF, 보험과 연금 종합',
    pagesCount: 7,
    status: 'active',
    topics: [
      '금융 자산 vs 실물 자산 구분',
      '예금과 적금 · 단리와 복리 시뮬레이터',
      '주식과 주주의 권리 (10주 모의투자)',
      '채권과 확정 이자 (국채 3년물 현금흐름)',
      '펀드와 ETF (계란 바구니 분산투자)',
      '보험과 연금 (상부상조 & 3층 보장)',
      '금융상품 8종 종합 매트릭스 & 시나리오 매칭',
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
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                2022 개정 고등학교 통합사회2
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                전체 단원 목차 (Curriculum Overview)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Units List */}
        <div className="p-6 overflow-y-auto space-y-3.5 bg-[#FDFBF7]">
          {UNITS.map((unit) => {
            const isCurrent = unit.number === currentUnit;
            const isAvailable = unit.status !== 'upcoming';

            return (
              <div
                key={unit.number}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-200'
                    : isAvailable
                    ? 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                        unit.number === 1
                          ? 'bg-blue-600 text-white'
                          : unit.number === 2
                          ? 'bg-emerald-600 text-white'
                          : unit.number === 3
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      UNIT 0{unit.number}
                    </span>

                    {unit.status === 'completed' && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 11차시 완료
                      </span>
                    )}
                    {unit.status === 'active' && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> {unit.pagesCount}차시 학습 가능
                      </span>
                    )}
                    {unit.status === 'upcoming' && (
                      <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Lock className="w-3 h-3" /> 추후 제작 예정
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-600">{unit.subtitle}</p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {unit.topics.slice(0, 4).map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded-md font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                    {unit.topics.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-semibold">
                        +{unit.topics.length - 4}개 더보기
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isAvailable ? (
                    <button
                      onClick={() => {
                        onSelectUnit(unit.number);
                        onClose();
                      }}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                        isCurrent
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{isCurrent ? '현재 단원 학습 중' : '이 단원으로 이동'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-bold px-3 py-2 bg-slate-100 rounded-xl">
                      추후 제작 예정
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>총 6개 단원 중 UNIT 01 (11차시) & UNIT 02 (7차시) 총 18개 학습 페이지 제공</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
