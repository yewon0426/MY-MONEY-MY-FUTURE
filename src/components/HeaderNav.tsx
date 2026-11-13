import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2,
  Minimize2,
  Lightbulb,
  List,
  BookOpen,
} from 'lucide-react';

interface HeaderNavProps {
  currentUnit: number;
  currentPage: number;
  totalPages: number;
  pageTitles: string[];
  unitTitle: string;
  currentPageTitle: string;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  onSelectUnit: (unit: number) => void;
  onOpenCurriculum: () => void;
  onReset: () => void;
  onToggleGuide: () => void;
  isGuideOpen: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentUnit,
  currentPage,
  totalPages,
  pageTitles,
  unitTitle,
  currentPageTitle,
  onPageChange,
  onPrevPage,
  onNextPage,
  canGoPrev,
  canGoNext,
  onSelectUnit,
  onOpenCurriculum,
  onReset,
  onToggleGuide,
  isGuideOpen,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPageMenu, setShowPageMenu] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else if (document.exitFullscreen) {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const progressPercentage = Math.round((currentPage / totalPages) * 100);

  return (
    <header className="w-full bg-slate-900 text-white select-none shadow-lg z-30 shrink-0">
      <div className="max-w-[1920px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Unit Controls & Active Unit Context */}
        <div className="flex items-center gap-3 shrink-0 min-w-0">
          <button
            type="button"
            onClick={onOpenCurriculum}
            className="min-h-[48px] flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-base font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="전체 단원 목차 보기 (M)"
          >
            <BookOpen className="w-5 h-5" />
            <span>목차</span>
          </button>

          <div
            className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 shrink-0"
            role="group"
            aria-label="단원 선택"
          >
            {[1, 2, 3].map((unitNum) => {
              const isActive = currentUnit === unitNum;
              const activeClass =
                unitNum === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : unitNum === 2
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-purple-600 text-white shadow-sm';
              return (
                <button
                  key={unitNum}
                  type="button"
                  onClick={() => onSelectUnit(unitNum)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-sm font-black transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive ? activeClass : 'text-slate-300 hover:text-white'
                  }`}
                >
                  UNIT 0{unitNum}
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-2 text-base font-bold text-slate-200 truncate max-w-[360px]">
            <span className="text-slate-400">·</span>
            <span className="truncate" title={`${unitTitle} — ${currentPageTitle}`}>
              {currentPageTitle}
            </span>
          </div>
        </div>

        {/* Zone 2: Single Central Page Navigation */}
        <div className="relative flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrevPage}
            disabled={!canGoPrev}
            aria-label="이전 페이지 (←)"
            title="이전 페이지 (←)"
            className="min-h-[48px] px-4 py-2 flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-25 disabled:hover:bg-slate-800 text-slate-100 font-bold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0 border border-slate-700"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">이전</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPageMenu(!showPageMenu)}
            aria-expanded={showPageMenu}
            aria-label="페이지 목록 열기"
            className="min-h-[48px] px-5 py-2 flex items-center gap-2.5 text-lg font-black text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums"
          >
            <span
              className={`font-mono text-xl font-black ${
                currentUnit === 1
                  ? 'text-blue-400'
                  : currentUnit === 2
                  ? 'text-emerald-400'
                  : 'text-purple-400'
              }`}
            >
              {currentPage}
            </span>
            <span className="text-slate-500 font-normal">/</span>
            <span className="font-mono text-slate-300">{totalPages}</span>
            <List className="w-5 h-5 text-slate-400 ml-1" />
          </button>

          <button
            type="button"
            onClick={onNextPage}
            disabled={!canGoNext}
            aria-label="다음 페이지 (→)"
            title="다음 페이지 (→)"
            className="min-h-[48px] px-4 py-2 flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-25 disabled:hover:bg-slate-800 text-slate-100 font-bold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0 border border-slate-700"
          >
            <span className="hidden sm:inline">다음</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          {showPageMenu && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowPageMenu(false)}
              aria-hidden="true"
            />
          )}

          {showPageMenu && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[420px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50">
              <div className="text-base font-black text-slate-200 px-3 py-2 border-b border-slate-700 flex justify-between items-center">
                <span>UNIT 0{currentUnit} · {unitTitle}</span>
                <span className="text-sm text-slate-400 font-mono tabular-nums">
                  {currentPage} / {totalPages}
                </span>
              </div>
              <div className="max-h-[460px] overflow-y-auto py-2 space-y-1.5">
                {pageTitles.map((title, idx) => {
                  const pNum = idx + 1;
                  const isActive = pNum === currentPage;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => {
                        onPageChange(pNum);
                        setShowPageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold flex items-center gap-3 transition-colors cursor-pointer ${
                        isActive
                          ? currentUnit === 1
                            ? 'bg-blue-600 text-white'
                            : currentUnit === 2
                            ? 'bg-emerald-600 text-white'
                            : 'bg-purple-600 text-white'
                          : 'text-slate-200 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-black shrink-0 tabular-nums ${
                          isActive ? 'bg-white/25 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {pNum}
                      </span>
                      <span className="truncate">{title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Zone 3: Smartboard Utility Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onReset}
            title="현재 화면 활동 초기화"
            className="min-h-[48px] flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white border border-slate-700 rounded-xl text-base font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span className="hidden lg:inline">초기화</span>
          </button>

          <button
            type="button"
            onClick={onToggleGuide}
            className={`min-h-[48px] flex items-center gap-2 px-4 py-2 rounded-xl text-base font-black transition-all cursor-pointer active:scale-95 whitespace-nowrap shrink-0 ${
              isGuideOpen
                ? 'bg-amber-400 text-slate-950'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <Lightbulb className={`w-5 h-5 ${isGuideOpen ? 'text-slate-950 fill-current' : 'text-amber-400'}`} />
            <span>교사용 가이드 (T)</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="전체 화면 토글"
            title="전체 화면 발표 모드"
            className="min-h-[48px] min-w-[48px] flex items-center justify-center p-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar Strip */}
      <div className="w-full bg-slate-800 h-1.5 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            currentUnit === 1
              ? 'bg-blue-500'
              : currentUnit === 2
              ? 'bg-emerald-500'
              : 'bg-purple-500'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </header>
  );
};
