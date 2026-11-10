/**
 * Finance calculations and utilities for High School Social Studies financial life module
 */

export interface SalaryBreakdown {
  grossWon: number;
  nationalPension: number; // 국민연금 (4.5%)
  healthInsurance: number; // 건강보험 (3.545%)
  longTermCare: number; // 노인장기요양보험 (건보의 12.95%)
  employmentInsurance: number; // 고용보험 (0.9%)
  incomeTax: number; // 소득세 (간이세액표 근사)
  localIncomeTax: number; // 지방소득세 (소득세의 10%)
  totalDeductions: number; // 총 공제액
  netWon: number; // 실수령액
  deductionRate: number; // 공제율 (%)
}

/**
 * Calculates estimated net take-home pay from gross monthly salary.
 * Uses realistic 4 major social insurances and simplified progressive income tax rate.
 */
export function calculateNetSalary(grossWon: number): SalaryBreakdown {
  if (grossWon <= 0) {
    return {
      grossWon: 0,
      nationalPension: 0,
      healthInsurance: 0,
      longTermCare: 0,
      employmentInsurance: 0,
      incomeTax: 0,
      localIncomeTax: 0,
      totalDeductions: 0,
      netWon: 0,
      deductionRate: 0,
    };
  }

  // 국민연금: 4.5% (월 소득 상한선 617만원 기준 적용)
  const pensionBase = Math.min(grossWon, 6170000);
  const nationalPension = Math.floor(pensionBase * 0.045);

  // 건강보험: 3.545%
  const healthInsurance = Math.floor(grossWon * 0.03545);

  // 장기요양보험: 건강보험료의 12.95%
  const longTermCare = Math.floor(healthInsurance * 0.1295);

  // 고용보험: 0.9%
  const employmentInsurance = Math.floor(grossWon * 0.009);

  // 간이 소득세 근사 모델 (단신 1인 가구 기준)
  let incomeTax = 0;
  if (grossWon <= 1500000) {
    incomeTax = Math.floor(grossWon * 0.005);
  } else if (grossWon <= 2500000) {
    incomeTax = Math.floor(grossWon * 0.015);
  } else if (grossWon <= 3500000) {
    // 300만원의 경우 약 6.4만원 수준
    incomeTax = Math.floor(grossWon * 0.0215);
  } else if (grossWon <= 5000000) {
    incomeTax = Math.floor(grossWon * 0.038);
  } else {
    incomeTax = Math.floor(grossWon * 0.065);
  }

  // 지방소득세: 소득세의 10%
  const localIncomeTax = Math.floor(incomeTax * 0.1);

  const totalDeductions =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax;

  const netWon = grossWon - totalDeductions;
  const deductionRate = Math.round((totalDeductions / grossWon) * 1000) / 10;

  return {
    grossWon,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeductions,
    netWon,
    deductionRate,
  };
}

/**
 * Calculates total living expenses
 */
export function calculateTotalExpense(expenses: Record<string, number>): number {
  return Object.values(expenses).reduce((sum, val) => sum + (val || 0), 0);
}

/**
 * Calculates monthly surplus (남는 돈)
 */
export function calculateMonthlySurplus(netIncome: number, totalExpense: number): number {
  return netIncome - totalExpense;
}

/**
 * Calculates savings projection over 1, 3, and 5 years
 */
export function calculateSavingsProjection(monthlySavings: number) {
  const safeMonthly = Math.max(0, monthlySavings);
  return {
    oneYear: safeMonthly * 12,
    threeYears: safeMonthly * 36,
    fiveYears: safeMonthly * 60,
  };
}

/**
 * Calculates duration in months and formatted text required to reach a savings goal
 */
export function calculateGoalDuration(targetAmount: number, monthlySavings: number): {
  totalMonths: number;
  years: number;
  months: number;
  isAchievable: boolean;
  formattedDuration: string;
} {
  if (monthlySavings <= 0) {
    return {
      totalMonths: Infinity,
      years: 0,
      months: 0,
      isAchievable: false,
      formattedDuration: "저축액 필요",
    };
  }

  if (targetAmount <= 0) {
    return {
      totalMonths: 0,
      years: 0,
      months: 0,
      isAchievable: true,
      formattedDuration: "0개월 (달성 완료)",
    };
  }

  const totalMonths = Math.ceil(targetAmount / monthlySavings);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let formattedDuration = "";
  if (years > 0 && months > 0) {
    formattedDuration = `${years}년 ${months}개월 (${totalMonths}개월)`;
  } else if (years > 0 && months === 0) {
    formattedDuration = `${years}년 (${totalMonths}개월)`;
  } else {
    formattedDuration = `${months}개월`;
  }

  return {
    totalMonths,
    years,
    months,
    isAchievable: true,
    formattedDuration,
  };
}

/**
 * Calculates Net Worth (순자산) and Debt Ratio
 */
export function calculateNetWorth(totalAssets: number, totalLiabilities: number): {
  netWorth: number;
  debtRatio: number;
  isPositive: boolean;
} {
  const netWorth = totalAssets - totalLiabilities;
  const debtRatio =
    totalAssets > 0
      ? Math.round((totalLiabilities / totalAssets) * 1000) / 10
      : totalLiabilities > 0
        ? 100
        : 0;

  return {
    netWorth,
    debtRatio,
    isPositive: netWorth >= 0,
  };
}

/**
 * Format Korean Won amounts into easily readable education labels
 * e.g. 2650000 -> "265만 원", 10000000 -> "1,000만 원", 1500000 -> "150만 원"
 */
export function formatWon(won: number): string {
  if (won === 0) return "0원";
  const absWon = Math.abs(won);
  const sign = won < 0 ? "-" : "";

  if (absWon >= 100000000) {
    const eok = Math.floor(absWon / 100000000);
    const remainderMan = Math.floor((absWon % 100000000) / 10000);
    if (remainderMan > 0) {
      return `${sign}${eok}억 ${remainderMan.toLocaleString()}만 원`;
    }
    return `${sign}${eok}억 원`;
  }

  if (absWon >= 10000) {
    const man = Math.floor(absWon / 10000);
    const remainder = absWon % 10000;
    if (remainder > 0) {
      return `${sign}${man.toLocaleString()}만 ${remainder.toLocaleString()}원`;
    }
    return `${sign}${man.toLocaleString()}만 원`;
  }

  return `${sign}${absWon.toLocaleString()}원`;
}

/**
 * Format Won strictly in 만원 units for quick display
 */
export function formatManWon(manWon: number): string {
  if (manWon === 0) return "0만 원";
  const sign = manWon < 0 ? "-" : "";
  const abs = Math.abs(manWon);
  if (abs >= 10000) {
    const eok = Math.floor(abs / 10000);
    const rem = abs % 10000;
    return rem > 0 ? `${sign}${eok}억 ${rem.toLocaleString()}만 원` : `${sign}${eok}억 원`;
  }
  return `${sign}${abs.toLocaleString()}만 원`;
}

/**
 * UNIT 02: Calculate simple interest (단리)
 */
export function calculateSimpleInterest(
  principalWon: number,
  annualRatePercent: number,
  years: number
): {
  principalWon: number;
  preTaxInterest: number;
  interestTax: number;
  postTaxInterest: number;
  totalPreTax: number;
  totalPostTax: number;
} {
  const rate = Math.max(0, annualRatePercent) / 100;
  const safeYears = Math.max(0, years);
  const preTaxInterest = Math.floor(principalWon * rate * safeYears);
  const interestTax = Math.floor(preTaxInterest * 0.154); // 이자소득세 15.4%
  const postTaxInterest = preTaxInterest - interestTax;

  return {
    principalWon,
    preTaxInterest,
    interestTax,
    postTaxInterest,
    totalPreTax: principalWon + preTaxInterest,
    totalPostTax: principalWon + postTaxInterest,
  };
}

export interface CompoundYearData {
  year: number;
  simpleTotal: number;
  compoundTotal: number;
  simpleInterest: number;
  compoundInterest: number;
  difference: number;
}

/**
 * UNIT 02: Calculate compound interest (복리) and compare with simple interest
 */
export function calculateCompoundInterest(
  principalWon: number,
  annualRatePercent: number,
  years: number
): {
  principalWon: number;
  preTaxInterest: number;
  totalPreTax: number;
  yearlyBreakdown: CompoundYearData[];
} {
  const rate = Math.max(0, annualRatePercent) / 100;
  const safeYears = Math.max(1, Math.min(30, years));
  const compoundTotal = Math.floor(principalWon * Math.pow(1 + rate, safeYears));
  const preTaxInterest = compoundTotal - principalWon;

  const yearlyBreakdown: CompoundYearData[] = [];
  const maxYear = Math.max(safeYears, 5);

  for (let t = 1; t <= maxYear; t++) {
    const sInt = Math.floor(principalWon * rate * t);
    const sTot = principalWon + sInt;
    const cTot = Math.floor(principalWon * Math.pow(1 + rate, t));
    const cInt = cTot - principalWon;
    yearlyBreakdown.push({
      year: t,
      simpleTotal: sTot,
      compoundTotal: cTot,
      simpleInterest: sInt,
      compoundInterest: cInt,
      difference: cTot - sTot,
    });
  }

  return {
    principalWon,
    preTaxInterest,
    totalPreTax: compoundTotal,
    yearlyBreakdown,
  };
}

/**
 * UNIT 02: Stock returns and price fluctuation simulator
 */
export function calculateStockReturn(
  purchasePriceWon: number,
  currentPriceWon: number,
  shares: number,
  dividendWonPerShare: number = 0
): {
  totalInvested: number;
  currentValue: number;
  capitalGain: number;
  totalDividends: number;
  totalReturn: number;
  returnRatePercent: number;
  isProfit: boolean;
} {
  const safeShares = Math.max(0, shares);
  const totalInvested = purchasePriceWon * safeShares;
  const currentValue = currentPriceWon * safeShares;
  const capitalGain = currentValue - totalInvested;
  const totalDividends = dividendWonPerShare * safeShares;
  const totalReturn = capitalGain + totalDividends;
  const returnRatePercent =
    totalInvested > 0 ? Math.round((totalReturn / totalInvested) * 1000) / 10 : 0;

  return {
    totalInvested,
    currentValue,
    capitalGain,
    totalDividends,
    totalReturn,
    returnRatePercent,
    isProfit: totalReturn >= 0,
  };
}

/**
 * UNIT 02: Bond issuance, coupon cash flows, and maturity repayment
 */
export function calculateBondCashflow(
  faceValueWon: number,
  couponRatePercent: number,
  maturityYears: number
): {
  faceValueWon: number;
  yearlyCoupon: number;
  totalCoupons: number;
  principalAtMaturity: number;
  totalReceived: number;
  schedule: { year: number; coupon: number; principalReturn: number; totalCashflow: number }[];
} {
  const safeYears = Math.max(1, maturityYears);
  const yearlyCoupon = Math.floor(faceValueWon * (couponRatePercent / 100));
  const totalCoupons = yearlyCoupon * safeYears;
  const principalAtMaturity = faceValueWon;
  const totalReceived = totalCoupons + principalAtMaturity;

  const schedule = [];
  for (let y = 1; y <= safeYears; y++) {
    const isMaturity = y === safeYears;
    const pReturn = isMaturity ? principalAtMaturity : 0;
    schedule.push({
      year: y,
      coupon: yearlyCoupon,
      principalReturn: pReturn,
      totalCashflow: yearlyCoupon + pReturn,
    });
  }

  return {
    faceValueWon,
    yearlyCoupon,
    totalCoupons,
    principalAtMaturity,
    totalReceived,
    schedule,
  };
}
