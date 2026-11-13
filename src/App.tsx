import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { CurriculumModal } from './components/CurriculumModal';
import { getTeacherGuide } from './data/teacherGuides';
import type { Unit6PlanState } from './types';
import { createInitialUnit6Plan } from './utils/finance';

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

// Unit 3 Components (8 Pages)
import { Page01WhereToPut } from './components/pages/unit3/Page01WhereToPut';
import { Page02ThreePrinciples } from './components/pages/unit3/Page02ThreePrinciples';
import { Page03RiskAndReturn } from './components/pages/unit3/Page03RiskAndReturn';
import { Page04RationalChoiceCost } from './components/pages/unit3/Page04RationalChoiceCost';
import { Page05PortfolioSimulator } from './components/pages/unit3/Page05PortfolioSimulator';
import { Page06RiskCards } from './components/pages/unit3/Page06RiskCards';
import { Page07ChooseMyProduct } from './components/pages/unit3/Page07ChooseMyProduct';
import { Page08ComprehensiveChallenge } from './components/pages/unit3/Page08ComprehensiveChallenge';

// Unit 4 Components (7 Pages)
import { Page01MoneyValueChange } from './components/pages/unit4/Page01MoneyValueChange';
import { Page02InterestRateBasics } from './components/pages/unit4/Page02InterestRateBasics';
import { Page03RateAndProducts } from './components/pages/unit4/Page03RateAndProducts';
import { Page04InflationPurchasingPower } from './components/pages/unit4/Page04InflationPurchasingPower';
import { Page05NominalVsRealReturn } from './components/pages/unit4/Page05NominalVsRealReturn';
import { Page06ExchangeRate } from './components/pages/unit4/Page06ExchangeRate';
import { Page07MacroExperiment } from './components/pages/unit4/Page07MacroExperiment';

// Unit 5 Components (6 Pages)
import { Page01LifetimeMoneyMoments } from './components/pages/unit5/Page01LifetimeMoneyMoments';
import { Page02LifeCycleEconomy } from './components/pages/unit5/Page02LifeCycleEconomy';
import { Page03IncomeExpenseCurve } from './components/pages/unit5/Page03IncomeExpenseCurve';
import { Page04FinancialGoalsPeriod } from './components/pages/unit5/Page04FinancialGoalsPeriod';
import { Page05InsurancePensionRole } from './components/pages/unit5/Page05InsurancePensionRole';
import { Page06LifeCycleDesignLab } from './components/pages/unit5/Page06LifeCycleDesignLab';

// Unit 6 Components (8 Pages)
import { Page01FirstSalary250 } from './components/pages/unit6/Page01FirstSalary250';
import { Page02MonthlyBudget } from './components/pages/unit6/Page02MonthlyBudget';
import { Page03ConsumptionVsSavings } from './components/pages/unit6/Page03ConsumptionVsSavings';
import { Page04MyPortfolio } from './components/pages/unit6/Page04MyPortfolio';
import { Page05UnexpectedEvent } from './components/pages/unit6/Page05UnexpectedEvent';
import { Page06GoalAchievementPlan } from './components/pages/unit6/Page06GoalAchievementPlan';
import { Page07ComprehensiveDiagnosis } from './components/pages/unit6/Page07ComprehensiveDiagnosis';
import { Page08FinancialPlanDocument } from './components/pages/unit6/Page08FinancialPlanDocument';

const UNIT_PAGE_COUNTS: Record<number, number> = {
  1: 11,
  2: 7,
  3: 8,
  4: 7,
  5: 6,
  6: 8,
};

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

const UNIT3_PAGE_TITLES = [
  '도입 — 100만 원, 어디에 둘까?',
  '자산 관리의 세 가지 원칙',
  '금융상품의 위험과 기대수익률',
  '합리적 선택과 기회비용',
  '분산 투자 시뮬레이터',
  '금융상품 위험 상황 카드',
  '나에게 맞는 금융상품 선택하기',
  '종합 의사결정 챌린지',
];

const UNIT4_PAGE_TITLES = [
  '같은 돈 100만 원, 5년 뒤에도 가치가 같을까?',
  '금리란 무엇일까? (예금 금리 vs 대출 금리)',
  '금리 변화가 금융상품에 미치는 영향',
  '물가 상승(인플레이션)과 실질 구매력',
  '명목 수익률 vs 실질 수익률',
  '환율과 글로벌 금융',
  '가상 경제 충격 실험실',
];

const UNIT5_PAGE_TITLES = [
  '인생에서 큰돈이 필요한 순간',
  '생애 주기별 경제생활 특징',
  '소득과 소비의 생애 곡선',
  '단기·중기·장기 재무 목표 설정',
  '생애 주기 속 보험과 연금의 역할',
  '생애 단계별 금융 설계 실습실',
];

const UNIT6_PAGE_TITLES = [
  '도입 — 나의 첫 월급 250만 원',
  '월간 소득·지출 예산 설계',
  '소비와 저축의 균형 & 비상자금',
  '나만의 금융상품 선택과 포트폴리오',
  '예상치 못한 상황과 위기 대응',
  '재무 목표와 달성 가능성 점검',
  '나의 금융 생활 계획 종합 진단',
  '완성 — 나의 첫 금융 생활 설계서',
];

const UNIT_TITLES: Record<number, string> = {
  1: '금융 생활의 시작',
  2: '금융 자산의 종류와 특징',
  3: '합리적인 자산 관리와 금융 의사결정',
  4: '금융 환경의 변화와 자산 가치',
  5: '생애 주기와 소득·지출',
  6: '미래를 위한 금융 생활 설계',
};

const UNIT_PAGE_TITLE_LIST: Record<number, string[]> = {
  1: UNIT1_PAGE_TITLES,
  2: UNIT2_PAGE_TITLES,
  3: UNIT3_PAGE_TITLES,
  4: UNIT4_PAGE_TITLES,
  5: UNIT5_PAGE_TITLES,
  6: UNIT6_PAGE_TITLES,
};

export default function App() {
  const [currentUnit, setCurrentUnit] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [resetSignals, setResetSignals] = useState<Record<string, number>>({});
  const [unit6Plan, setUnit6Plan] = useState<Unit6PlanState>(() => createInitialUnit6Plan());

  const totalPagesInUnit = UNIT_PAGE_COUNTS[currentUnit] || 11;
  const pageTitles = UNIT_PAGE_TITLE_LIST[currentUnit] || UNIT1_PAGE_TITLES;
  const unitTitle = UNIT_TITLES[currentUnit] || UNIT_TITLES[1];

  const handleNextPage = () => {
    if (currentPage < totalPagesInUnit) {
      setCurrentPage((prev) => prev + 1);
    } else if (currentUnit < 6) {
      setCurrentUnit((prev) => prev + 1);
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (currentUnit > 1) {
      const prevUnit = currentUnit - 1;
      setCurrentUnit(prevUnit);
      setCurrentPage(UNIT_PAGE_COUNTS[prevUnit] || 1);
    }
  };

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
  }, [currentUnit, currentPage, totalPagesInUnit]);

  const handleSelectUnit = (unitNumber: number) => {
    if (unitNumber >= 1 && unitNumber <= 6) {
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

    if (currentUnit === 6) {
      const defaults = createInitialUnit6Plan();
      if (currentPage === 2) {
        setUnit6Plan((prev) => ({ ...prev, budget: defaults.budget }));
      } else if (currentPage === 4) {
        setUnit6Plan((prev) => ({
          ...prev,
          portfolio: defaults.portfolio,
          portfolioReason: defaults.portfolioReason,
        }));
      } else if (currentPage === 5) {
        setUnit6Plan((prev) => ({
          ...prev,
          emergencyFundMan: defaults.emergencyFundMan,
          activeShockId: defaults.activeShockId,
          shockResolvedNote: '',
          riskResponsePlan: defaults.riskResponsePlan,
        }));
      } else if (currentPage === 6) {
        setUnit6Plan((prev) => ({
          ...prev,
          goalId: defaults.goalId,
          goalTitle: defaults.goalTitle,
          goalTargetMan: defaults.goalTargetMan,
          goalMonths: defaults.goalMonths,
        }));
      }
    }
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
    } else if (currentUnit === 2) {
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
    } else if (currentUnit === 3) {
      switch (currentPage) {
        case 1:
          return <Page01WhereToPut resetSignal={currentResetSignal} />;
        case 2:
          return <Page02ThreePrinciples resetSignal={currentResetSignal} />;
        case 3:
          return <Page03RiskAndReturn resetSignal={currentResetSignal} />;
        case 4:
          return <Page04RationalChoiceCost resetSignal={currentResetSignal} />;
        case 5:
          return <Page05PortfolioSimulator resetSignal={currentResetSignal} />;
        case 6:
          return <Page06RiskCards resetSignal={currentResetSignal} />;
        case 7:
          return <Page07ChooseMyProduct resetSignal={currentResetSignal} />;
        case 8:
          return <Page08ComprehensiveChallenge resetSignal={currentResetSignal} />;
        default:
          return <Page01WhereToPut resetSignal={currentResetSignal} />;
      }
    } else if (currentUnit === 4) {
      switch (currentPage) {
        case 1:
          return <Page01MoneyValueChange resetSignal={currentResetSignal} />;
        case 2:
          return <Page02InterestRateBasics resetSignal={currentResetSignal} />;
        case 3:
          return <Page03RateAndProducts resetSignal={currentResetSignal} />;
        case 4:
          return <Page04InflationPurchasingPower resetSignal={currentResetSignal} />;
        case 5:
          return <Page05NominalVsRealReturn resetSignal={currentResetSignal} />;
        case 6:
          return <Page06ExchangeRate resetSignal={currentResetSignal} />;
        case 7:
          return <Page07MacroExperiment resetSignal={currentResetSignal} />;
        default:
          return <Page01MoneyValueChange resetSignal={currentResetSignal} />;
      }
    } else if (currentUnit === 5) {
      switch (currentPage) {
        case 1:
          return <Page01LifetimeMoneyMoments resetSignal={currentResetSignal} />;
        case 2:
          return <Page02LifeCycleEconomy resetSignal={currentResetSignal} />;
        case 3:
          return <Page03IncomeExpenseCurve resetSignal={currentResetSignal} />;
        case 4:
          return <Page04FinancialGoalsPeriod resetSignal={currentResetSignal} />;
        case 5:
          return <Page05InsurancePensionRole resetSignal={currentResetSignal} />;
        case 6:
          return <Page06LifeCycleDesignLab resetSignal={currentResetSignal} />;
        default:
          return <Page01LifetimeMoneyMoments resetSignal={currentResetSignal} />;
      }
    } else {
      switch (currentPage) {
        case 1:
          return <Page01FirstSalary250 resetSignal={currentResetSignal} />;
        case 2:
          return <Page02MonthlyBudget plan={unit6Plan} onUpdatePlan={setUnit6Plan} />;
        case 3:
          return <Page03ConsumptionVsSavings resetSignal={currentResetSignal} />;
        case 4:
          return <Page04MyPortfolio plan={unit6Plan} onUpdatePlan={setUnit6Plan} />;
        case 5:
          return <Page05UnexpectedEvent plan={unit6Plan} onUpdatePlan={setUnit6Plan} />;
        case 6:
          return <Page06GoalAchievementPlan plan={unit6Plan} onUpdatePlan={setUnit6Plan} />;
        case 7:
          return (
            <Page07ComprehensiveDiagnosis
              plan={unit6Plan}
              onNavigatePage={(p) => setCurrentPage(p)}
            />
          );
        case 8:
          return <Page08FinancialPlanDocument plan={unit6Plan} />;
        default:
          return <Page01FirstSalary250 resetSignal={currentResetSignal} />;
      }
    }
  };

  const isFirstOverallPage = currentUnit === 1 && currentPage === 1;
  const isLastOverallPage = currentUnit === 6 && currentPage === UNIT_PAGE_COUNTS[6];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#FDFBF7] text-slate-900 overflow-hidden font-sans select-none">
      {/* Smartboard Top Bar Navigation */}
      <HeaderNav
        currentUnit={currentUnit}
        currentPage={currentPage}
        totalPages={totalPagesInUnit}
        pageTitles={pageTitles}
        unitTitle={unitTitle}
        currentPageTitle={pageTitles[currentPage - 1]}
        onPageChange={(page) => setCurrentPage(page)}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        canGoPrev={!isFirstOverallPage}
        canGoNext={!isLastOverallPage}
        onSelectUnit={handleSelectUnit}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        onReset={handleResetCurrentPage}
        onToggleGuide={() => setIsGuideOpen(!isGuideOpen)}
        isGuideOpen={isGuideOpen}
      />

      {/* Main Presentation Stage */}
      <main className="flex-1 min-h-0 relative flex flex-col overflow-hidden">
        <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col">
          {renderPage()}
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
