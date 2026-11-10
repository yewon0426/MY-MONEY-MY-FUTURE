import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNetSalary,
  calculateTotalExpense,
  calculateMonthlySurplus,
  calculateSavingsProjection,
  calculateGoalDuration,
  calculateNetWorth,
  formatWon,
  formatManWon,
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateStockReturn,
  calculateBondCashflow,
} from './finance';

test('calculateNetSalary computes realistic 3,000,000 KRW salary take-home ~ 2.65 million', () => {
  const result = calculateNetSalary(3000000);
  assert.equal(result.grossWon, 3000000);
  // Pension 4.5% = 135,000
  assert.equal(result.nationalPension, 135000);
  // Health insurance 3.545% = 106,350
  assert.equal(result.healthInsurance, 106350);
  // Total deduction should be around 350,000 KRW
  assert.ok(result.totalDeductions > 330000 && result.totalDeductions < 370000);
  // Net take-home should be close to 2.65 million won
  assert.ok(result.netWon > 2630000 && result.netWon < 2670000);
  assert.ok(result.deductionRate > 10 && result.deductionRate < 13);
});

test('calculateNetSalary handles 0 or negative salary gracefully', () => {
  const result = calculateNetSalary(0);
  assert.equal(result.netWon, 0);
  assert.equal(result.totalDeductions, 0);
});

test('calculateTotalExpense and monthly surplus', () => {
  const expenses = {
    rent: 65,
    food: 45,
    transport: 20,
    leisure: 35,
    insurance: 20,
  };
  const total = calculateTotalExpense(expenses);
  assert.equal(total, 185);

  const surplus = calculateMonthlySurplus(265, total);
  assert.equal(surplus, 80);
});

test('calculateSavingsProjection computes 1, 3, 5 years accumulation', () => {
  const projection = calculateSavingsProjection(800000);
  assert.equal(projection.oneYear, 9600000);
  assert.equal(projection.threeYears, 28800000);
  assert.equal(projection.fiveYears, 48000000);
});

test('calculateGoalDuration accurately computes months and years', () => {
  // Goal: 10,000,000 KRW (독립 자금), Monthly: 500,000 KRW -> 20 months (1 year 8 months)
  const result = calculateGoalDuration(10000000, 500000);
  assert.equal(result.totalMonths, 20);
  assert.equal(result.years, 1);
  assert.equal(result.months, 8);
  assert.equal(result.isAchievable, true);
  assert.equal(result.formattedDuration, '1년 8개월 (20개월)');

  // Zero monthly savings test
  const zeroSavings = calculateGoalDuration(10000000, 0);
  assert.equal(zeroSavings.isAchievable, false);
});

test('calculateNetWorth correctly computes assets minus liabilities', () => {
  // Assets 30M - Debt 13M = Net Worth 17M
  const res = calculateNetWorth(30000000, 13000000);
  assert.equal(res.netWorth, 17000000);
  assert.equal(res.debtRatio, 43.3);
  assert.equal(res.isPositive, true);

  // Negative net worth
  const negativeRes = calculateNetWorth(10000000, 15000000);
  assert.equal(negativeRes.netWorth, -5000000);
  assert.equal(negativeRes.isPositive, false);
});

test('formatWon and formatManWon formats amounts cleanly in Korean', () => {
  assert.equal(formatWon(3000000), '300만 원');
  assert.equal(formatWon(2650000), '265만 원');
  assert.equal(formatWon(10000000), '1,000만 원');
  assert.equal(formatWon(150000000), '1억 5,000만 원');

  assert.equal(formatManWon(65), '65만 원');
  assert.equal(formatManWon(185), '185만 원');
  assert.equal(formatManWon(1700), '1,700만 원');
  assert.equal(formatManWon(20000), '2억 원');
});

test('calculateSimpleInterest computes 1,000,000 KRW with 5% rate for 1 year correctly', () => {
  // 100만 원, 연 5%, 1년 -> 세전이자 50,000원
  const res = calculateSimpleInterest(1000000, 5, 1);
  assert.equal(res.principalWon, 1000000);
  assert.equal(res.preTaxInterest, 50000);
  assert.equal(res.interestTax, 7700); // 15.4%
  assert.equal(res.postTaxInterest, 42300);
  assert.equal(res.totalPreTax, 1050000);
  assert.equal(res.totalPostTax, 1042300);
});

test('calculateCompoundInterest computes multi-year exponential growth', () => {
  // 100만 원, 5%, 3년 복리: 100만 * 1.05^3 = 1,157,625원 (단리는 1,150,000원)
  const res = calculateCompoundInterest(1000000, 5, 3);
  assert.equal(res.principalWon, 1000000);
  assert.equal(res.totalPreTax, 1157625);
  assert.equal(res.preTaxInterest, 157625);
  assert.equal(res.yearlyBreakdown.length, 5); // min 5 years generated for graphs
  const year3 = res.yearlyBreakdown[2];
  assert.equal(year3.year, 3);
  assert.equal(year3.simpleTotal, 1150000);
  assert.equal(year3.compoundTotal, 1157625);
  assert.equal(year3.difference, 7625);
});

test('calculateStockReturn handles profits, losses, and dividends', () => {
  // Buy 10 shares at 70,000 KRW (total 700,000 KRW)
  // Price rises to 80,000 KRW (+10,000/share), dividend 2,000 KRW/share
  const gainRes = calculateStockReturn(70000, 80000, 10, 2000);
  assert.equal(gainRes.totalInvested, 700000);
  assert.equal(gainRes.currentValue, 800000);
  assert.equal(gainRes.capitalGain, 100000);
  assert.equal(gainRes.totalDividends, 20000);
  assert.equal(gainRes.totalReturn, 120000);
  assert.equal(gainRes.returnRatePercent, 17.1); // 120000 / 700000 = 17.14% -> 17.1%
  assert.equal(gainRes.isProfit, true);

  // Price drops to 50,000 KRW (-20,000/share), 0 dividend
  const lossRes = calculateStockReturn(70000, 50000, 10, 0);
  assert.equal(lossRes.totalInvested, 700000);
  assert.equal(lossRes.currentValue, 500000);
  assert.equal(lossRes.capitalGain, -200000);
  assert.equal(lossRes.totalReturn, -200000);
  assert.equal(lossRes.returnRatePercent, -28.6);
  assert.equal(lossRes.isProfit, false);
});

test('calculateBondCashflow simulates 1,000,000 KRW 3% 3-year treasury bond', () => {
  const bond = calculateBondCashflow(1000000, 3, 3);
  assert.equal(bond.faceValueWon, 1000000);
  assert.equal(bond.yearlyCoupon, 30000);
  assert.equal(bond.totalCoupons, 90000);
  assert.equal(bond.principalAtMaturity, 1000000);
  assert.equal(bond.totalReceived, 1090000);
  assert.equal(bond.schedule.length, 3);
  assert.equal(bond.schedule[0].totalCashflow, 30000);
  assert.equal(bond.schedule[2].totalCashflow, 1030000);
});
