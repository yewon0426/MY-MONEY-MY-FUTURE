/**
 * Type definitions for High School Integrated Social Studies 2 Financial Life Unit
 */

export interface TeacherGuide {
  pageNumber: number;
  pageTitle: string;
  coreConcept: string; // 1. 해당 화면에서 설명해야 할 핵심 개념
  studentQuestion: string; // 2. 학생들에게 던질 질문
  expectedAnswers: string[]; // 3. 학생들의 예상 답변
  realLifeStory: string; // 4. 교사가 이어서 설명할 실생활 사례
  commonMisconceptions: string; // 5. 학생들이 오해하기 쉬운 부분
  nextPageTransition: string; // 6. 다음 화면으로 연결하는 멘트
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
  subType?: string; // e.g. '근로소득', '소비지출', '정기적금' 등
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
