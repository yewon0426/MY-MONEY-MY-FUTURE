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
  onPageChange: (page: number) => void;
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
  onPageChange,
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
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const progressPercentage = Math.round((currentPage / totalPages) * 100);

  return (
    <header className="w-full bg-slate-900 text-white select-none shadow-lg z-30 shrink-0">
      {/* Top Main Bar */}
      <div className="max-w-[1920px] mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Unit Selector & Lesson Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCurriculum}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl tracking-wider transition-colors cursor-pointer shadow-sm"
            title="전체 단원 목차 보기"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>단원 목차</span>
          </button>

          {/* Unit 1 / Unit 2 / Unit 3 Direct Toggle Buttons */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => onSelectUnit(1)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentUnit === 1
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UNIT 01
            </button>
            <button
              onClick={() => onSelectUnit(2)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentUnit === 2
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UNIT 02
            </button>
            <button
              onClick={() => onSelectUnit(3)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentUnit === 3
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UNIT 03
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <h1 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2 truncate max-w-xs md:max-w-md">
            <span className={`font-black ${
              currentUnit === 1 ? 'text-blue-400' : currentUnit === 2 ? 'text-emerald-400' : 'text-purple-400'
            }`}>
              UNIT 0{currentUnit}
            </span>
            <span className="truncate text-slate-200">{unitTitle}</span>
          </h1>
        </div>

        {/* Center: Page Stepper & Dropdown Selector */}
        <div className="relative flex items-center gap-2">
          <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="이전 페이지 (단축키: 왼쪽 화살표)"
              title="이전 페이지 (←)"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowPageMenu(!showPageMenu)}
              className="px-3 py-1 flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
            >
              <span className={`font-mono text-base font-extrabold ${currentUnit === 1 ? 'text-blue-400' : 'text-emerald-400'}`}>
                {currentPage}
              </span>
              <span className="text-slate-500">/</span>
              <span className="font-mono text-slate-400">{totalPages}</span>
              <List className="w-4 h-4 text-slate-400 ml-1" />
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="다음 페이지 (단축키: 오른쪽 화살표)"
              title="다음 페이지 (→)"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Page Jump Dropdown */}
          {showPageMenu && (
            <div
              className="absolute top-12 left-1/2 -translate-x-1/2 w-80 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in"
              onClick={() => setShowPageMenu(false)}
            >
              <div className="text-xs font-bold text-slate-400 px-3 py-2 border-b border-slate-700 flex justify-between items-center">
                <span>{currentUnit === 1 ? 'UNIT 01' : 'UNIT 02'} 페이지 목차</span>
                <span className="text-[10px] text-slate-500 font-mono">1~{totalPages}단계</span>
              </div>
              <div className="max-h-80 overflow-y-auto py-1">
                {pageTitles.map((title, idx) => {
                  const pNum = idx + 1;
                  const isActive = pNum === currentPage;
                  return (
                    <button
                      key={pNum}
                      onClick={() => {
                        onPageChange(pNum);
                        setShowPageMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isActive
                          ? currentUnit === 1
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-emerald-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-700/80 hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-xs ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
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

        {/* Right: Smartboard Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Reset Page State */}
          <button
            onClick={onReset}
            title="현재 화면 활동 초기화"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">초기화</span>
          </button>

          {/* Teacher Guide Trigger */}
          <button
            onClick={onToggleGuide}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
              isGuideOpen
                ? 'bg-amber-400 text-slate-950 shadow-amber-400/20'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <Lightbulb className={`w-4 h-4 ${isGuideOpen ? 'text-slate-950 fill-current' : 'text-amber-400'}`} />
            <span>교사용 가이드</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="전체 화면 토글"
            title="전체 화면 발표 모드"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar Strip */}
      <div className="w-full bg-slate-800/80 h-1 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            currentUnit === 1
              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </header>
  );
};
