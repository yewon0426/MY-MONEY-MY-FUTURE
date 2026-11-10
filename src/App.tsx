import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { CurriculumModal } from './components/CurriculumModal';
import { getTeacherGuide } from './data/teacherGuides';

// Unit 1 Components (11 Pages)
import { Page1Salary } from './components/pages/Page1Salary';
import { Page2LivingCost } from './components/pages/Page2LivingCost';
import { Page3Survival300 } from './components/pages/Page3Survival300';
import { Page4SavingsGoals } from './components/pages/Page4SavingsGoals';
import { Page5WhatIsFinance } from './components/pages/Page5WhatIsFinance';
import { Page6MarketsAndInstitutions } from './components/pages/Page6MarketsAndInstitutions';
import { Page7FourConceptsQuiz } from './components/pages/Page7FourConceptsQuiz';
import { Page8AssetsLiabilities } from './components/pages/Page8AssetsLiabilities';
import { Page9ProductsAndPrinciples } from './components/pages/Page9ProductsAndPrinciples';
import { Page10VideoWatch } from './components/pages/Page10VideoWatch';
import { Page11ClassSummary } from './components/pages/Page11ClassSummary';

// Unit 2 Components (7 Pages)
import { Page01RealVsFinancial } from './components/pages/unit2/Page01RealVsFinancial';
import { Page02DepositSavings } from './components/pages/unit2/Page02DepositSavings';
import { Page03Stock } from './components/pages/unit2/Page03Stock';
import { Page04Bond } from './components/pages/unit2/Page04Bond';
import { Page05FundEtf } from './components/pages/unit2/Page05FundEtf';
import { Page06InsurancePension } from './components/pages/unit2/Page06InsurancePension';
import { Page07ComprehensiveComparison } from './components/pages/unit2/Page07ComprehensiveComparison';

import { ChevronLeft, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';

const UNIT1_PAGES_COUNT = 11;
const UNIT2_PAGES_COUNT = 7;

const UNIT1_PAGE_TITLES = [
  '30살의 나는 얼마를 벌고 있을까?',
  '혼자 살려면 한 달에 얼마가 필요할까?',
  '월급 300만 원으로 살아남기',
  '돈을 모으면 무엇을 할 수 있을까?',
  '금융이란 무엇일까?',
  '금융시장과 금융기관',
  '소득·지출·저축·투자',
  '자산·부채·순자산',
  '금융상품과 자산 관리의 3대 원칙',
  '영상 시청 (20분)',
  '오늘의 금융 생활 정리',
];

const UNIT2_PAGE_TITLES = [
  '금융 자산과 실물 자산',
  '예금과 적금 · 단리와 복리',
  '주식(Stock)과 주주의 권리',
  '채권(Bond)과 확정 이자',
  '펀드(Fund)와 ETF(상장지수펀드)',
  '보험(Insurance)과 연금(Pension)',
  '금융상품 8종 종합 비교 & 실전 매칭',
];

export default function App() {
  const [currentUnit, setCurrentUnit] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [resetSignals, setResetSignals] = useState<Record<string, number>>({});

  const totalPagesInUnit = currentUnit === 1 ? UNIT1_PAGES_COUNT : UNIT2_PAGES_COUNT;
  const pageTitles = currentUnit === 1 ? UNIT1_PAGE_TITLES : UNIT2_PAGE_TITLES;
  const unitTitle =
    currentUnit === 1 ? '금융 생활의 시작' : '금융 자산의 종류와 특징';

  // Smartboard keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 't' || e.key === 'T') {
        setIsGuideOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsCurriculumOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsGuideOpen(false);
        setIsCurriculumOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUnit, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPagesInUnit) {
      setCurrentPage((prev) => prev + 1);
    } else if (currentUnit === 1) {
      // Seamless progression into Unit 2
      setCurrentUnit(2);
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (currentUnit === 2) {
      // Return to last page of Unit 1
      setCurrentUnit(1);
      setCurrentPage(UNIT1_PAGES_COUNT);
    }
  };

  const handleSelectUnit = (unitNumber: number) => {
    if (unitNumber === 1 || unitNumber === 2) {
      setCurrentUnit(unitNumber);
      setCurrentPage(1);
    }
  };

  const handleResetCurrentPage = () => {
    const key = `${currentUnit}_${currentPage}`;
    setResetSignals((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const currentGuide = getTeacherGuide(currentUnit, currentPage);
  const currentResetSignal = resetSignals[`${currentUnit}_${currentPage}`] || 0;

  // Render current unit and page
  const renderPage = () => {
    if (currentUnit === 1) {
      switch (currentPage) {
        case 1:
          return <Page1Salary resetSignal={currentResetSignal} />;
        case 2:
          return <Page2LivingCost resetSignal={currentResetSignal} />;
        case 3:
          return <Page3Survival300 resetSignal={currentResetSignal} />;
        case 4:
          return <Page4SavingsGoals resetSignal={currentResetSignal} />;
        case 5:
          return <Page5WhatIsFinance resetSignal={currentResetSignal} />;
        case 6:
          return <Page6MarketsAndInstitutions resetSignal={currentResetSignal} />;
        case 7:
          return <Page7FourConceptsQuiz resetSignal={currentResetSignal} />;
        case 8:
          return <Page8AssetsLiabilities resetSignal={currentResetSignal} />;
        case 9:
          return <Page9ProductsAndPrinciples resetSignal={currentResetSignal} />;
        case 10:
          return <Page10VideoWatch resetSignal={currentResetSignal} />;
        case 11:
          return <Page11ClassSummary resetSignal={currentResetSignal} />;
        default:
          return <Page1Salary resetSignal={currentResetSignal} />;
      }
    } else {
      switch (currentPage) {
        case 1:
          return <Page01RealVsFinancial resetSignal={currentResetSignal} />;
        case 2:
          return <Page02DepositSavings resetSignal={currentResetSignal} />;
        case 3:
          return <Page03Stock resetSignal={currentResetSignal} />;
        case 4:
          return <Page04Bond resetSignal={currentResetSignal} />;
        case 5:
          return <Page05FundEtf resetSignal={currentResetSignal} />;
        case 6:
          return <Page06InsurancePension resetSignal={currentResetSignal} />;
        case 7:
          return <Page07ComprehensiveComparison resetSignal={currentResetSignal} />;
        default:
          return <Page01RealVsFinancial resetSignal={currentResetSignal} />;
      }
    }
  };

  const isFirstOverallPage = currentUnit === 1 && currentPage === 1;
  const isLastOverallPage = currentUnit === 2 && currentPage === UNIT2_PAGES_COUNT;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#FDFBF7] text-slate-900 overflow-hidden font-sans select-none">
      {/* Smartboard Top Bar Navigation */}
      <HeaderNav
        currentUnit={currentUnit}
        currentPage={currentPage}
        totalPages={totalPagesInUnit}
        pageTitles={pageTitles}
        unitTitle={unitTitle}
        onPageChange={(page) => setCurrentPage(page)}
        onSelectUnit={handleSelectUnit}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        onReset={handleResetCurrentPage}
        onToggleGuide={() => setIsGuideOpen(!isGuideOpen)}
        isGuideOpen={isGuideOpen}
      />

      {/* Main Presentation Stage */}
      <main className="flex-1 overflow-y-auto relative flex flex-col justify-between">
        {renderPage()}

        {/* Smartboard Bottom Quick Step Bar */}
        <div className="w-full px-6 py-2.5 bg-white/70 backdrop-blur-xs border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <button
            onClick={handlePrevPage}
            disabled={isFirstOverallPage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 font-bold transition-all cursor-pointer text-slate-700"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">이전 (←)</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`font-black px-2 py-0.5 rounded text-[11px] ${
                currentUnit === 1 ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              UNIT 0{currentUnit}
            </span>
            <span className="font-extrabold text-slate-700">
              PAGE {currentPage} / {totalPagesInUnit}
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline font-medium text-slate-600 truncate max-w-md">
              {pageTitles[currentPage - 1]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 font-bold text-amber-800 border border-amber-200/80 transition-all cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>지도 팁 (T)</span>
            </button>
            <button
              onClick={handleNextPage}
              disabled={isLastOverallPage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 font-bold text-white transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">다음 (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Teacher Guide Modal */}
      {currentGuide && (
        <TeacherGuideModal
          guide={currentGuide}
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
          totalPages={totalPagesInUnit}
          currentUnit={currentUnit}
        />
      )}

      {/* Curriculum Modal */}
      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        currentUnit={currentUnit}
        onSelectUnit={handleSelectUnit}
      />
    </div>
  );
}
