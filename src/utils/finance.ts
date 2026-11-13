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

export interface InstallmentMonthData {
  month: number;
  cumulativePrincipal: number;
  interestEarnedSoFar: number;
}

/**
 * UNIT 02: Calculate installment savings (정기적금 - 월초납 단리)
 */
export function calculateInstallmentSavings(
  monthlyDepositWon: number,
  annualRatePercent: number,
  months: number
): {
  monthlyDepositWon: number;
  months: number;
  totalPrincipalWon: number;
  preTaxInterest: number;
  interestTax: number;
  postTaxInterest: number;
  totalPreTax: number;
  totalPostTax: number;
  monthlyBreakdown: InstallmentMonthData[];
} {
  const safeMonths = Math.max(1, months);
  const totalPrincipalWon = monthlyDepositWon * safeMonths;
  const monthlyRate = (annualRatePercent / 100) / 12;

  // 월초납 단리 공식: 매달 넣은 원금이 남은 개월 수만큼 이자가 붙음
  // 이자 합 = 월납입액 * 월이율 * (months * (months + 1) / 2)
  const factor = (safeMonths * (safeMonths + 1)) / 2;
  const preTaxInterest = Math.floor(monthlyDepositWon * monthlyRate * factor);
  const interestTax = Math.floor(preTaxInterest * 0.154);
  const postTaxInterest = preTaxInterest - interestTax;

  const monthlyBreakdown: InstallmentMonthData[] = [];
  let runningInterest = 0;
  for (let m = 1; m <= safeMonths; m++) {
    const cumulativePrincipal = monthlyDepositWon * m;
    // By month m, all previous deposits have earned interest for that month
    runningInterest += Math.floor(monthlyDepositWon * m * monthlyRate);
    monthlyBreakdown.push({
      month: m,
      cumulativePrincipal,
      interestEarnedSoFar: runningInterest,
    });
  }

  return {
    monthlyDepositWon,
    months: safeMonths,
    totalPrincipalWon,
    preTaxInterest,
    interestTax,
    postTaxInterest,
    totalPreTax: totalPrincipalWon + preTaxInterest,
    totalPostTax: totalPrincipalWon + postTaxInterest,
    monthlyBreakdown,
  };
}

/**
 * UNIT 02: Compare Fixed Deposit (정기예금) vs Installment Savings (정기적금)
 * with the same total principal, interest rate, and duration.
 */
export function compareDepositAndSavings(
  totalPrincipalWon: number,
  annualRatePercent: number,
  months: number
): {
  totalPrincipalWon: number;
  annualRatePercent: number;
  months: number;
  fixedDeposit: {
    preTaxInterest: number;
    interestTax: number;
    totalReceived: number;
  };
  installmentSavings: {
    monthlyDepositWon: number;
    preTaxInterest: number;
    interestTax: number;
    totalReceived: number;
  };
  interestDifference: number;
  explanation: string;
} {
  const safeMonths = Math.max(1, months);
  const rate = annualRatePercent / 100;

  // 정기예금: 목돈 전액이 전체 기간 동안 거치
  const fdPreTax = Math.floor(totalPrincipalWon * rate * (safeMonths / 12));
  const fdTax = Math.floor(fdPreTax * 0.154);

  // 정기적금: 매달 나누어 불입
  const monthlyDepositWon = Math.floor(totalPrincipalWon / safeMonths);
  const isResult = calculateInstallmentSavings(monthlyDepositWon, annualRatePercent, safeMonths);

  const interestDifference = fdPreTax - isResult.preTaxInterest;

  return {
    totalPrincipalWon,
    annualRatePercent,
    months: safeMonths,
    fixedDeposit: {
      preTaxInterest: fdPreTax,
      interestTax: fdTax,
      totalReceived: totalPrincipalWon + (fdPreTax - fdTax),
    },
    installmentSavings: {
      monthlyDepositWon,
      preTaxInterest: isResult.preTaxInterest,
      interestTax: isResult.interestTax,
      totalReceived: isResult.totalPostTax,
    },
    interestDifference,
    explanation: `정기예금은 처음부터 전체 목돈(${formatWon(totalPrincipalWon)})이 은행에 맡겨져 ${safeMonths}개월 내내 이자가 붙지만, 정기적금은 매달 나누어 납입하므로 뒤에 넣은 돈일수록 이자가 붙는 기간이 짧아 이자 총액이 적습니다.`,
  };
}

/**
 * UNIT 02: Calculate demand deposit (보통예금) estimated interest
 */
export function calculateDemandDepositInterest(
  balanceWon: number,
  annualRatePercent: number,
  days: number = 30
): {
  preTaxInterest: number;
  interestTax: number;
  postTaxInterest: number;
} {
  const rate = Math.max(0, annualRatePercent) / 100;
  const safeDays = Math.max(0, days);
  const preTaxInterest = Math.floor(balanceWon * rate * (safeDays / 365));
  const interestTax = Math.floor(preTaxInterest * 0.154);
  return {
    preTaxInterest,
    interestTax,
    postTaxInterest: preTaxInterest - interestTax,
  };
}

/**
 * UNIT 02 (Page 3 STEP 3): Virtual Stock Trading Portfolio Engine
 */
export interface StockPortfolioState {
  cashWon: number;
  sharesHeld: number;
  avgBuyPrice: number;
  realizedPnL: number;
}

export interface StockTradeResult {
  ok: boolean;
  error?: string;
  state: StockPortfolioState;
  tradeAmountWon: number;
  tradePnL: number;
}

export function createInitialStockPortfolio(initialCashWon: number = 1000000): StockPortfolioState {
  return {
    cashWon: initialCashWon,
    sharesHeld: 0,
    avgBuyPrice: 0,
    realizedPnL: 0,
  };
}

export function executeStockBuy(
  state: StockPortfolioState,
  priceWon: number,
  quantity: number
): StockTradeResult {
  const safeQty = Math.floor(quantity);
  if (safeQty <= 0 || priceWon <= 0) {
    return {
      ok: false,
      error: '매수 수량과 주가는 1 이상이어야 합니다.',
      state,
      tradeAmountWon: 0,
      tradePnL: 0,
    };
  }

  const totalCost = priceWon * safeQty;
  if (totalCost > state.cashWon) {
    return {
      ok: false,
      error: `보유 현금(${formatWon(state.cashWon)})이 부족합니다. 필요 금액: ${formatWon(totalCost)}`,
      state,
      tradeAmountWon: totalCost,
      tradePnL: 0,
    };
  }

  const prevValue = state.sharesHeld * state.avgBuyPrice;
  const newShares = state.sharesHeld + safeQty;
  const newAvgPrice = Math.round((prevValue + totalCost) / newShares);

  return {
    ok: true,
    state: {
      cashWon: state.cashWon - totalCost,
      sharesHeld: newShares,
      avgBuyPrice: newAvgPrice,
      realizedPnL: state.realizedPnL,
    },
    tradeAmountWon: totalCost,
    tradePnL: 0,
  };
}

export function executeStockSell(
  state: StockPortfolioState,
  priceWon: number,
  quantity: number
): StockTradeResult {
  const safeQty = Math.floor(quantity);
  if (safeQty <= 0 || priceWon <= 0) {
    return {
      ok: false,
      error: '매도 수량과 주가는 1 이상이어야 합니다.',
      state,
      tradeAmountWon: 0,
      tradePnL: 0,
    };
  }

  if (safeQty > state.sharesHeld) {
    return {
      ok: false,
      error: `보유 수량(${state.sharesHeld}주)보다 많은 수량을 매도할 수 없습니다.`,
      state,
      tradeAmountWon: 0,
      tradePnL: 0,
    };
  }

  const proceeds = priceWon * safeQty;
  const tradePnL = (priceWon - state.avgBuyPrice) * safeQty;
  const remainingShares = state.sharesHeld - safeQty;

  return {
    ok: true,
    state: {
      cashWon: state.cashWon + proceeds,
      sharesHeld: remainingShares,
      avgBuyPrice: remainingShares === 0 ? 0 : state.avgBuyPrice,
      realizedPnL: state.realizedPnL + tradePnL,
    },
    tradeAmountWon: proceeds,
    tradePnL,
  };
}

export function computeStockPortfolioMetrics(
  state: StockPortfolioState,
  currentPriceWon: number,
  initialCashWon: number = 1000000
): {
  stockValueWon: number;
  costBasisWon: number;
  unrealizedPnL: number;
  unrealizedRatePercent: number;
  totalAssetsWon: number;
  totalNetReturnWon: number;
  totalNetReturnPercent: number;
} {
  const stockValueWon = state.sharesHeld * currentPriceWon;
  const costBasisWon = state.sharesHeld * state.avgBuyPrice;
  const unrealizedPnL = state.sharesHeld > 0 ? stockValueWon - costBasisWon : 0;
  const unrealizedRatePercent =
    costBasisWon > 0 ? Math.round((unrealizedPnL / costBasisWon) * 1000) / 10 : 0;
  const totalAssetsWon = state.cashWon + stockValueWon;
  const totalNetReturnWon = totalAssetsWon - initialCashWon;
  const totalNetReturnPercent =
    initialCashWon > 0 ? Math.round((totalNetReturnWon / initialCashWon) * 1000) / 10 : 0;

  return {
    stockValueWon,
    costBasisWon,
    unrealizedPnL,
    unrealizedRatePercent,
    totalAssetsWon,
    totalNetReturnWon,
    totalNetReturnPercent,
  };
}

/**
 * UNIT 02 (Page 4 STEP 3): Bond Trading Capital Gain + Holding Coupon Result
 */
export function calculateBondTradingResult(
  faceValueWon: number,
  couponRatePercent: number,
  purchasePriceWon: number,
  salePriceWon: number,
  holdingYears: number
): {
  purchasePriceWon: number;
  salePriceWon: number;
  capitalGainWon: number;
  holdingCouponsWon: number;
  totalReturnWon: number;
  returnRatePercent: number;
  isProfit: boolean;
} {
  const safeYears = Math.max(0, holdingYears);
  const capitalGainWon = salePriceWon - purchasePriceWon;
  const annualCoupon = Math.floor(faceValueWon * (Math.max(0, couponRatePercent) / 100));
  const holdingCouponsWon = annualCoupon * safeYears;
  const totalReturnWon = capitalGainWon + holdingCouponsWon;
  const returnRatePercent =
    purchasePriceWon > 0 ? Math.round((totalReturnWon / purchasePriceWon) * 1000) / 10 : 0;

  return {
    purchasePriceWon,
    salePriceWon,
    capitalGainWon,
    holdingCouponsWon,
    totalReturnWon,
    returnRatePercent,
    isProfit: totalReturnWon >= 0,
  };
}

/**
 * UNIT 02 (Page 4 STEP 4): Bond Present Value (Inverse Relationship with Market Rate)
 */
export function calculateBondPresentValue(
  faceValueWon: number,
  couponRatePercent: number,
  marketRatePercent: number,
  remainingYears: number
): number {
  const n = Math.max(1, Math.floor(remainingYears));
  const coupon = faceValueWon * (Math.max(0, couponRatePercent) / 100);
  const r = Math.max(0.0001, marketRatePercent / 100);

  let pv = 0;
  for (let t = 1; t <= n; t++) {
    pv += coupon / Math.pow(1 + r, t);
  }
  pv += faceValueWon / Math.pow(1 + r, n);

  return Math.round(pv);
}

export interface BondRatePoint {
  ratePercent: number;
  bondPriceWon: number;
  diffFromFaceWon: number;
}

export function generateBondPriceCurve(
  faceValueWon: number,
  couponRatePercent: number,
  remainingYears: number,
  rates: number[] = [1, 2, 3, 4, 5, 6, 7]
): BondRatePoint[] {
  return rates.map((ratePercent) => {
    const bondPriceWon = calculateBondPresentValue(
      faceValueWon,
      couponRatePercent,
      ratePercent,
      remainingYears
    );
    return {
      ratePercent,
      bondPriceWon,
      diffFromFaceWon: bondPriceWon - faceValueWon,
    };
  });
}

// ============================================================================
// UNIT 04: 금융 환경의 변화와 자산 가치 (금리 · 물가 · 환율)
// ============================================================================

export function calculatePurchasingPower(
  amountWon: number,
  annualInflationPercent: number,
  years: number
): {
  futureEquivalentCostWon: number; // 현재 amountWon으로 사던 물건의 미래 가격
  realPurchasingPowerWon: number; // 미래의 amountWon이 현재 가치로 가지는 구매력
  purchasingPowerLossPercent: number; // 구매력 감소율 (%)
} {
  const safeAmount = Math.max(0, amountWon);
  const inf = Math.max(0, annualInflationPercent) / 100;
  const safeYears = Math.max(0, years);
  const factor = Math.pow(1 + inf, safeYears);

  const futureEquivalentCostWon = Math.round(safeAmount * factor);
  const realPurchasingPowerWon = factor > 0 ? Math.round(safeAmount / factor) : safeAmount;
  const purchasingPowerLossPercent =
    safeAmount > 0
      ? Math.round(((safeAmount - realPurchasingPowerWon) / safeAmount) * 1000) / 10
      : 0;

  return {
    futureEquivalentCostWon,
    realPurchasingPowerWon,
    purchasingPowerLossPercent,
  };
}

export function calculateRealReturn(
  nominalRatePercent: number,
  inflationRatePercent: number,
  principalWon: number = 1000000
): {
  exactRealRatePercent: number; // 피셔 방정식: ((1+명목)/(1+물가) - 1) * 100
  approxRealRatePercent: number; // 근사식: 명목 - 물가
  nominalEndingWon: number; // 통장 잔액 (명목)
  realPurchasingPowerEndingWon: number; // 물가 반영 실질 구매력
  isPurchasingPowerGain: boolean;
} {
  const r = nominalRatePercent / 100;
  const pi = inflationRatePercent / 100;
  const exactRealRatePercent = Math.round((((1 + r) / (1 + pi)) - 1) * 10000) / 100;
  const approxRealRatePercent = Math.round((nominalRatePercent - inflationRatePercent) * 100) / 100;

  const nominalEndingWon = Math.round(principalWon * (1 + r));
  const realPurchasingPowerEndingWon = Math.round(nominalEndingWon / (1 + pi));

  return {
    exactRealRatePercent,
    approxRealRatePercent,
    nominalEndingWon,
    realPurchasingPowerEndingWon,
    isPurchasingPowerGain: exactRealRatePercent >= 0,
  };
}

export function calculateExchangeConversion(
  usdAmount: number,
  krwPerUsd: number,
  baselineRate: number = 1350
): {
  krwAmount: number;
  baselineKrwAmount: number;
  differenceKrw: number;
  krwValueStatus: 'stronger' | 'weaker' | 'baseline';
} {
  const safeUsd = Math.max(0, usdAmount);
  const safeRate = Math.max(100, krwPerUsd);
  const krwAmount = Math.round(safeUsd * safeRate);
  const baselineKrwAmount = Math.round(safeUsd * baselineRate);
  const differenceKrw = krwAmount - baselineKrwAmount;

  let krwValueStatus: 'stronger' | 'weaker' | 'baseline' = 'baseline';
  if (safeRate > baselineRate) {
    krwValueStatus = 'weaker'; // 환율 상승 = 원화 가치 하락
  } else if (safeRate < baselineRate) {
    krwValueStatus = 'stronger'; // 환율 하락 = 원화 가치 상승
  }

  return {
    krwAmount,
    baselineKrwAmount,
    differenceKrw,
    krwValueStatus,
  };
}

export function calculateLoanVsDepositImpact(
  amountWon: number,
  depositRatePercent: number,
  loanRatePercent: number,
  years: number = 1
): {
  depositInterestPreTaxWon: number;
  depositInterestPostTaxWon: number;
  loanInterestCostWon: number;
  spreadPercent: number;
} {
  const safeAmount = Math.max(0, amountWon);
  const safeYears = Math.max(1, years);
  const depositInterestPreTaxWon = Math.round(safeAmount * (depositRatePercent / 100) * safeYears);
  const depositInterestPostTaxWon = Math.round(depositInterestPreTaxWon * (1 - 0.154));
  const loanInterestCostWon = Math.round(safeAmount * (loanRatePercent / 100) * safeYears);
  const spreadPercent = Math.round((loanRatePercent - depositRatePercent) * 10) / 10;

  return {
    depositInterestPreTaxWon,
    depositInterestPostTaxWon,
    loanInterestCostWon,
    spreadPercent,
  };
}

// ============================================================================
// UNIT 05: 생애 주기와 소득·지출
// ============================================================================

export function calculateMonthlySavingsRequired(
  targetWon: number,
  months: number,
  annualRatePercent: number = 0
): {
  monthlyRequiredSimpleWon: number;
  monthlyRequiredWithRateWon: number;
  totalPrincipalWithRateWon: number;
  estimatedInterestBenefitWon: number;
} {
  const safeTarget = Math.max(0, targetWon);
  const safeMonths = Math.max(1, Math.floor(months));
  const monthlyRequiredSimpleWon = Math.ceil(safeTarget / safeMonths);

  if (annualRatePercent <= 0) {
    return {
      monthlyRequiredSimpleWon,
      monthlyRequiredWithRateWon: monthlyRequiredSimpleWon,
      totalPrincipalWithRateWon: monthlyRequiredSimpleWon * safeMonths,
      estimatedInterestBenefitWon: 0,
    };
  }

  const rMonthly = annualRatePercent / 100 / 12;
  const fvFactor = (Math.pow(1 + rMonthly, safeMonths) - 1) / rMonthly;
  const monthlyRequiredWithRateWon = fvFactor > 0 ? Math.ceil(safeTarget / fvFactor) : monthlyRequiredSimpleWon;
  const totalPrincipalWithRateWon = monthlyRequiredWithRateWon * safeMonths;
  const estimatedInterestBenefitWon = Math.max(0, safeTarget - totalPrincipalWithRateWon);

  return {
    monthlyRequiredSimpleWon,
    monthlyRequiredWithRateWon,
    totalPrincipalWithRateWon,
    estimatedInterestBenefitWon,
  };
}

export interface LifeCyclePoint {
  ageLabel: string;
  age: number;
  stage: '청소년·청년기' | '경제활동·청장년기' | '중장년기' | '노년기';
  incomeIndex: number; // 상대 지수 (0~100)
  expenseIndex: number; // 상대 지수 (0~100)
  netSavingIndex: number;
}

export function generateLifeCycleModelCurve(): LifeCyclePoint[] {
  const raw: Omit<LifeCyclePoint, 'netSavingIndex'>[] = [
    { ageLabel: '10대', age: 16, stage: '청소년·청년기', incomeIndex: 5, expenseIndex: 28 },
    { ageLabel: '20대', age: 25, stage: '청소년·청년기', incomeIndex: 35, expenseIndex: 42 },
    { ageLabel: '30대', age: 35, stage: '경제활동·청장년기', incomeIndex: 68, expenseIndex: 54 },
    { ageLabel: '40대', age: 45, stage: '중장년기', incomeIndex: 90, expenseIndex: 66 },
    { ageLabel: '50대', age: 55, stage: '중장년기', incomeIndex: 82, expenseIndex: 62 },
    { ageLabel: '60대', age: 65, stage: '노년기', incomeIndex: 38, expenseIndex: 48 },
    { ageLabel: '70대+', age: 75, stage: '노년기', incomeIndex: 24, expenseIndex: 42 },
  ];
  return raw.map((item) => ({
    ...item,
    netSavingIndex: item.incomeIndex - item.expenseIndex,
  }));
}

// ============================================================================
// UNIT 06: 미래를 위한 금융 생활 설계 (예산 · 포트폴리오 · 경제 충격 · 진단)
// ============================================================================

import type {
  Unit6BudgetAllocation,
  Unit6PlanState,
  Unit6ShockId,
} from '../types';

export function createInitialUnit6Plan(): Unit6PlanState {
  return {
    monthlyIncomeMan: 250,
    budget: {
      housing: 55,
      food: 45,
      transport: 15,
      telecom: 8,
      leisure: 22,
      savings: 55,
      investment: 30,
      insurance: 10,
      other: 10,
    },
    portfolio: {
      depositPercent: 40,
      bondPercent: 20,
      fundEtfPercent: 30,
      stockPercent: 10,
    },
    portfolioReason:
      '단기 비상금과 종잣돈은 예·적금으로 안전하게 지키고, 장기 자산은 ETF와 채권으로 분산 투자합니다.',
    emergencyFundMan: 350,
    activeShockId: 'none',
    shockResolvedNote: '',
    goalId: 'goal-independence',
    goalTitle: '3년 뒤 독립·전세 보증금 마련',
    goalTargetMan: 3000,
    goalMonths: 36,
    riskResponsePlan:
      '비상자금 350만 원(월 생활비 약 2.3개월분)을 CMA·보통예금에 분리 보관하고 실손보험으로 의료비 위험에 대비합니다.',
  };
}

export function evaluateMonthlyBudget(
  monthlyIncomeMan: number,
  budget: Unit6BudgetAllocation
): {
  livingExpenseMan: number; // 주거+식비+교통+통신+여가+기타
  savingsAndInvestMan: number; // 저축 + 투자
  insuranceMan: number;
  totalAllocatedMan: number;
  remainingMan: number;
  isOverBudget: boolean;
  overAmountMan: number;
  savingsRatePercent: number;
} {
  const livingExpenseMan =
    budget.housing +
    budget.food +
    budget.transport +
    budget.telecom +
    budget.leisure +
    budget.other;
  const savingsAndInvestMan = budget.savings + budget.investment;
  const insuranceMan = budget.insurance;
  const totalAllocatedMan = livingExpenseMan + savingsAndInvestMan + insuranceMan;
  const remainingMan = monthlyIncomeMan - totalAllocatedMan;
  const isOverBudget = remainingMan < 0;
  const overAmountMan = isOverBudget ? Math.abs(remainingMan) : 0;
  const savingsRatePercent =
    monthlyIncomeMan > 0
      ? Math.round((savingsAndInvestMan / monthlyIncomeMan) * 1000) / 10
      : 0;

  return {
    livingExpenseMan,
    savingsAndInvestMan,
    insuranceMan,
    totalAllocatedMan,
    remainingMan,
    isOverBudget,
    overAmountMan,
    savingsRatePercent,
  };
}

export interface EconomicShockImpact {
  id: Unit6ShockId;
  title: string;
  description: string;
  oneTimeCostMan: number;
  monthlyIncomeChangeMan: number;
  monthlyExpenseIncreaseMan: number;
  remainingEmergencyFundMan: number;
  isEmergencyCovered: boolean;
  adjustedMonthlyBalanceMan: number;
  recommendedAction: string;
}

export function evaluateEconomicShock(
  monthlyIncomeMan: number,
  budget: Unit6BudgetAllocation,
  emergencyFundMan: number,
  shockId: Unit6ShockId
): EconomicShockImpact {
  const baseEval = evaluateMonthlyBudget(monthlyIncomeMan, budget);

  const configs: Record<
    Unit6ShockId,
    {
      title: string;
      description: string;
      oneTimeCostMan: number;
      monthlyIncomeChangeMan: number;
      monthlyExpenseIncreaseMan: number;
      recommendedAction: string;
    }
  > = {
    none: {
      title: '사건 미발생 (평상시)',
      description: '현재 계획한 월간 예산과 비상자금이 정상적으로 유지되고 있습니다.',
      oneTimeCostMan: 0,
      monthlyIncomeChangeMan: 0,
      monthlyExpenseIncreaseMan: 0,
      recommendedAction: '비상자금(생활비 3~6개월분)을 꾸준히 채워 돌발 상황에 대비하세요.',
    },
    medical: {
      title: '갑작스러운 병원비 발생',
      description: '급성 맹장염 수술 및 입원 치료로 자기부담 병원비 120만 원이 즉시 필요해졌습니다.',
      oneTimeCostMan: 120,
      monthlyIncomeChangeMan: 0,
      monthlyExpenseIncreaseMan: 0,
      recommendedAction: '비상자금으로 일시 비용을 먼저 충당하고, 실손의료보험·예비비를 점검하세요.',
    },
    appliance: {
      title: '필수 가전제품(냉장고·세탁기) 고장',
      description: '자취방 핵심 가전이 고장 나 수리·교체 비용 90만 원이 갑자기 발생했습니다.',
      oneTimeCostMan: 90,
      monthlyIncomeChangeMan: 0,
      monthlyExpenseIncreaseMan: 0,
      recommendedAction: '적금을 해지하는 대신 비상자금에서 지출한 뒤, 다음 달 여가비를 줄여 복구하세요.',
    },
    incomeDrop: {
      title: '경기 침체로 월 소득 30만 원 감소',
      description: '야근·성과급 축소로 월 실수령액이 250만 원에서 220만 원으로 줄어들었습니다.',
      oneTimeCostMan: 0,
      monthlyIncomeChangeMan: -30,
      monthlyExpenseIncreaseMan: 0,
      recommendedAction: '고정지출과 변동지출(여가·기타)을 먼저 조정해 적자가 나지 않도록 재편성하세요.',
    },
    familyEvent: {
      title: '예상치 못한 경조사비 지출',
      description: '친한 친구와 친척의 경조사가 한 달에 겹치며 총 40만 원의 지출이 생겼습니다.',
      oneTimeCostMan: 40,
      monthlyIncomeChangeMan: 0,
      monthlyExpenseIncreaseMan: 0,
      recommendedAction: '변동지출(여가·기타)이나 비상금에서 우선 해결하고 경조사 예비 항목을 고려하세요.',
    },
    inflation: {
      title: '생활물가 상승 (식비·교통·공과금 +20만 원)',
      description: '고물가로 매달 꼭 필요한 식비·공과금·교통비가 총 20만 원 더 오르게 되었습니다.',
      oneTimeCostMan: 0,
      monthlyIncomeChangeMan: 0,
      monthlyExpenseIncreaseMan: 20,
      recommendedAction: '실질 구매력 하락에 맞춰 선택적 소비를 줄이고 물가 상승을 고려한 저축·투자를 조율하세요.',
    },
  };

  const cfg = configs[shockId];
  const remainingEmergencyFundMan = emergencyFundMan - cfg.oneTimeCostMan;
  const isEmergencyCovered = remainingEmergencyFundMan >= 0;
  const newIncome = monthlyIncomeMan + cfg.monthlyIncomeChangeMan;
  const newTotalOutflow = baseEval.totalAllocatedMan + cfg.monthlyExpenseIncreaseMan;
  const adjustedMonthlyBalanceMan = newIncome - newTotalOutflow;

  return {
    id: shockId,
    title: cfg.title,
    description: cfg.description,
    oneTimeCostMan: cfg.oneTimeCostMan,
    monthlyIncomeChangeMan: cfg.monthlyIncomeChangeMan,
    monthlyExpenseIncreaseMan: cfg.monthlyExpenseIncreaseMan,
    remainingEmergencyFundMan,
    isEmergencyCovered,
    adjustedMonthlyBalanceMan,
    recommendedAction: cfg.recommendedAction,
  };
}

export function evaluateGoalFeasibility(
  targetMan: number,
  months: number,
  monthlySavingsMan: number,
  startingSavedMan: number = 0
): {
  projectedTotalMan: number;
  shortfallMan: number;
  surplusMan: number;
  requiredMonthlyMan: number;
  isAchievable: boolean;
  achievementPercent: number;
} {
  const safeTarget = Math.max(1, targetMan);
  const safeMonths = Math.max(1, Math.floor(months));
  const safeMonthly = Math.max(0, monthlySavingsMan);
  const safeStart = Math.max(0, startingSavedMan);

  const projectedTotalMan = safeStart + safeMonthly * safeMonths;
  const diff = projectedTotalMan - safeTarget;
  const shortfallMan = diff < 0 ? Math.abs(diff) : 0;
  const surplusMan = diff > 0 ? diff : 0;
  const neededFromMonthly = Math.max(0, safeTarget - safeStart);
  const requiredMonthlyMan = Math.ceil(neededFromMonthly / safeMonths);
  const isAchievable = projectedTotalMan >= safeTarget;
  const achievementPercent = Math.min(100, Math.round((projectedTotalMan / safeTarget) * 100));

  return {
    projectedTotalMan,
    shortfallMan,
    surplusMan,
    requiredMonthlyMan,
    isAchievable,
    achievementPercent,
  };
}

export interface Unit6DiagnosisCriterion {
  key: 'budgetFit' | 'savingsCapacity' | 'emergencyFund' | 'productRationale' | 'riskPreparedness' | 'goalSpecificity';
  label: string;
  status: '충족' | '보완 권장' | '점검 필요';
  scoreText: string;
  feedback: string;
}

export function diagnoseFinancialPlan(plan: Unit6PlanState): {
  criteria: Unit6DiagnosisCriterion[];
  metCount: number;
  overallComment: string;
} {
  const budgetEval = evaluateMonthlyBudget(plan.monthlyIncomeMan, plan.budget);
  const portfolioSum =
    plan.portfolio.depositPercent +
    plan.portfolio.bondPercent +
    plan.portfolio.fundEtfPercent +
    plan.portfolio.stockPercent;
  const goalEval = evaluateGoalFeasibility(
    plan.goalTargetMan,
    plan.goalMonths,
    budgetEval.savingsAndInvestMan,
    0
  );

  // 1. 소득 범위 내 지출
  const budgetFit: Unit6DiagnosisCriterion = !budgetEval.isOverBudget
    ? {
        key: 'budgetFit',
        label: '1. 소득 범위 내 지출',
        status: '충족',
        scoreText: `배분 ${budgetEval.totalAllocatedMan}만 / ${plan.monthlyIncomeMan}만 원`,
        feedback:
          budgetEval.remainingMan > 0
            ? `월 소득 내에서 지출과 저축을 모두 배분했고, 예비 여유자금 ${budgetEval.remainingMan}만 원이 확보되어 있습니다.`
            : '월 소득 250만 원 범위 안에서 균형 있게 모든 항목을 배분했습니다.',
      }
    : {
        key: 'budgetFit',
        label: '1. 소득 범위 내 지출',
        status: '점검 필요',
        scoreText: `${budgetEval.overAmountMan}만 원 초과`,
        feedback: `월 소득보다 ${budgetEval.overAmountMan}만 원 더 지출하고 있습니다. 선택적 지출을 줄여 적자를 해소해야 합니다.`,
      };

  // 2. 저축 가능 금액
  const savingsCapacity: Unit6DiagnosisCriterion =
    budgetEval.savingsRatePercent >= 25 && !budgetEval.isOverBudget
      ? {
          key: 'savingsCapacity',
          label: '2. 저축 가능 금액',
          status: '충족',
          scoreText: `월 ${budgetEval.savingsAndInvestMan}만 원 (${budgetEval.savingsRatePercent}%)`,
          feedback: `소득의 ${budgetEval.savingsRatePercent}%를 저축·투자에 배분해 미래 목표를 꾸준히 준비하고 있습니다.`,
        }
      : budgetEval.savingsAndInvestMan > 0
      ? {
          key: 'savingsCapacity',
          label: '2. 저축 가능 금액',
          status: '보완 권장',
          scoreText: `월 ${budgetEval.savingsAndInvestMan}만 원 (${budgetEval.savingsRatePercent}%)`,
          feedback: '저축·투자를 시작했지만, 소비 항목을 조금 줄여 저축 비중을 25% 이상으로 높여보면 더 안정적입니다.',
        }
      : {
          key: 'savingsCapacity',
          label: '2. 저축 가능 금액',
          status: '점검 필요',
          scoreText: '0만 원',
          feedback: '저축 또는 투자 금액이 배분되지 않았습니다. 소액이라도 먼저 저축하는 습관이 중요합니다.',
        };

  // 3. 비상자금
  const monthlyLiving = Math.max(1, budgetEval.livingExpenseMan);
  const emergencyMonths = Math.round((plan.emergencyFundMan / monthlyLiving) * 10) / 10;
  const emergencyFund: Unit6DiagnosisCriterion =
    plan.emergencyFundMan >= monthlyLiving * 2
      ? {
          key: 'emergencyFund',
          label: '3. 비상자금',
          status: '충족',
          scoreText: `${plan.emergencyFundMan}만 원 (생활비 ${emergencyMonths}개월분)`,
          feedback: '갑작스러운 병원비나 가전 고장에도 적금·투자를 깨지 않고 버틸 수 있는 든든한 비상자금이 있습니다.',
        }
      : {
          key: 'emergencyFund',
          label: '3. 비상자금',
          status: '보완 권장',
          scoreText: `${plan.emergencyFundMan}만 원 (생활비 ${emergencyMonths}개월분)`,
          feedback: '월 생활비의 최소 2~3개월분 이상을 입출금이 자유로운 비상자금 통장에 확보하는 것을 권장합니다.',
        };

  // 4. 금융상품 선택 이유 (수익률 최고가 아니라 비중 완성도와 목적에 맞는 분산 및 설명 여부)
  const isDiversified =
    plan.portfolio.depositPercent > 0 &&
    (plan.portfolio.bondPercent > 0 || plan.portfolio.fundEtfPercent > 0 || plan.portfolio.stockPercent > 0);
  const hasReason = plan.portfolioReason.trim().length >= 10;
  const productRationale: Unit6DiagnosisCriterion =
    portfolioSum === 100 && hasReason
      ? {
          key: 'productRationale',
          label: '4. 금융상품 선택 이유',
          status: '충족',
          scoreText: isDiversified ? '비중 100% · 분산·근거 명확' : '비중 100% · 선택 근거 명확',
          feedback:
            plan.portfolio.stockPercent >= 70
              ? '공격적인 주식 비중이 매우 높아 단기 변동성 위험을 충분히 감수할 수 있는지 한 번 더 점검해 보세요.'
              : '안전성·수익성·유동성 기준과 나의 목표에 맞추어 금융상품 선택 이유를 논리적으로 정리했습니다.',
        }
      : {
          key: 'productRationale',
          label: '4. 금융상품 선택 이유',
          status: '점검 필요',
          scoreText: `배분 합계 ${portfolioSum}%`,
          feedback: '포트폴리오 합계를 100%로 맞추고, 왜 이 상품들을 선택했는지 구체적인 이유를 작성해 보세요.',
        };

  // 5. 위험 대비 (보험 + 위험 대응 계획)
  const hasInsurance = plan.budget.insurance >= 5;
  const hasRiskPlan = plan.riskResponsePlan.trim().length >= 10;
  const riskPreparedness: Unit6DiagnosisCriterion =
    hasInsurance && hasRiskPlan
      ? {
          key: 'riskPreparedness',
          label: '5. 위험 대비',
          status: '충족',
          scoreText: `보험 월 ${plan.budget.insurance}만 원 · 대응안 수립`,
          feedback: '예상치 못한 질병·사고에 대비한 보험과 위기 시 지출 조정 계획이 구체적으로 마련되어 있습니다.',
        }
      : {
          key: 'riskPreparedness',
          label: '5. 위험 대비',
          status: '보완 권장',
          scoreText: `보험 월 ${plan.budget.insurance}만 원`,
          feedback: '질병·사고에 대비하는 최소한의 보험료 배분과 돌발 사건 대응 계획을 함께 준비하면 안전합니다.',
        };

  // 6. 재무 목표의 구체성
  const goalSpecificity: Unit6DiagnosisCriterion =
    plan.goalTitle.trim().length > 0 && plan.goalTargetMan > 0 && plan.goalMonths > 0
      ? {
          key: 'goalSpecificity',
          label: '6. 재무 목표의 구체성',
          status: goalEval.isAchievable ? '충족' : '보완 권장',
          scoreText: `${plan.goalMonths}개월 · ${formatManWon(plan.goalTargetMan)} (${goalEval.achievementPercent}%)`,
          feedback: goalEval.isAchievable
            ? `현재 월 저축·투자 계획(${budgetEval.savingsAndInvestMan}만 원)으로 목표 금액을 기한 내에 달성할 수 있습니다.`
            : `목표 달성까지 월 ${goalEval.requiredMonthlyMan}만 원이 필요합니다. 목표 기간을 늘리거나 월 저축액을 조정해 보세요.`,
        }
      : {
          key: 'goalSpecificity',
          label: '6. 재무 목표의 구체성',
          status: '점검 필요',
          scoreText: '목표 미설정',
          feedback: '목표 금액과 기간이 숫자로 구체화되어야 실천 가능한 계획을 세울 수 있습니다.',
        };

  const criteria = [
    budgetFit,
    savingsCapacity,
    emergencyFund,
    productRationale,
    riskPreparedness,
    goalSpecificity,
  ];
  const metCount = criteria.filter((c) => c.status === '충족').length;

  const overallComment =
    metCount === 6
      ? '모든 기준이 균형 있게 설계되었습니다! 높은 수익률만 쫓지 않고 나의 소득·비상자금·위험 대비·목표 기간에 맞춘 합리적인 계획입니다.'
      : metCount >= 4
      ? '전반적으로 탄탄한 금융 생활 계획입니다. 보완 권장 항목을 1~2가지만 조정하면 훨씬 안정적인 설계서가 됩니다.'
      : '기초 계획의 틀은 잡혔습니다. 소득 범위 내 지출, 비상자금, 목표 기간을 다시 점검하여 현실적인 계획을 완성해 보세요.';

  return {
    criteria,
    metCount,
    overallComment,
  };
}



