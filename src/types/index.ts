/**
 * Type definitions for High School Integrated Social Studies 2 Financial Life Unit
 */

export interface TeacherGuide {
  pageNumber: number;
  pageTitle: string;
  learningObjective?: string; // 1. 학습 목표
  coreConcept: string; // 개념 설명 멘트 / 핵심 개념
  studentQuestion: string; // 2. 도입 질문
  expectedAnswers: string[]; // 예상 답변
  realLifeStory: string; // 4. 생활 속 사례
  simulatorSteps?: string[]; // 5. 시뮬레이터 조작 순서
  whyItHappens?: string; // 6. 결과가 나타나는 이유
  commonMisconceptions: string; // 7. 학생 예상 오개념
  closingQuestion?: string; // 8. 마무리 질문
  nextPageTransition: string; // 다음 화면으로 연결하는 멘트
}

export interface VoteOption {
  id: string;
  label: string;
  amountWon: number;
  votes: number;
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number; // in 만원
  category: 'fixed' | 'variable';
  description: string;
  iconName: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number; // in 만원
  icon: string;
  description: string;
}

export interface QuizScenario {
  id: number;
  character: string;
  situation: string;
  correctAnswer: '소득' | '지출' | '저축' | '투자';
  explanation: string;
  subType?: string;
}

export interface FinancialProductInfo {
  id: string;
  name: string;
  category: '저축성' | '투자성' | '보장성';
  safety: '매우 높음' | '높음' | '보통' | '낮음';
  profitability: '낮음' | '보통' | '높음' | '매우 높음';
  liquidity: '매우 높음' | '높음' | '보통' | '낮음';
  purpose: string;
  features: string;
}

export interface Unit6BudgetAllocation {
  housing: number; // 주거비 (만원)
  food: number; // 식비
  transport: number; // 교통비
  telecom: number; // 통신비
  leisure: number; // 여가비
  savings: number; // 저축
  investment: number; // 투자
  insurance: number; // 보험
  other: number; // 기타 지출
}

export interface Unit6PortfolioAllocation {
  depositPercent: number; // 예금·적금
  bondPercent: number; // 채권
  fundEtfPercent: number; // 펀드·ETF
  stockPercent: number; // 주식
}

export type Unit6ShockId = 'none' | 'medical' | 'appliance' | 'incomeDrop' | 'familyEvent' | 'inflation';

export interface Unit6PlanState {
  monthlyIncomeMan: number; // 250만원 기준
  budget: Unit6BudgetAllocation;
  portfolio: Unit6PortfolioAllocation;
  portfolioReason: string;
  emergencyFundMan: number;
  activeShockId: Unit6ShockId;
  shockResolvedNote: string;
  goalId: string;
  goalTitle: string;
  goalTargetMan: number;
  goalMonths: number;
  riskResponsePlan: string;
}

