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
  calculateInstallmentSavings,
  compareDepositAndSavings,
  createInitialStockPortfolio,
  executeStockBuy,
  executeStockSell,
  computeStockPortfolioMetrics,
  calculateBondTradingResult,
  calculateBondPresentValue,
  generateBondPriceCurve,
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

test('calculateInstallmentSavings computes 100,000 KRW/mo for 12 months at 4%', () => {
  // Monthly 100k, 12 months, 4%
  // Principal: 1,200,000 KRW
  // Pre-tax interest: 100,000 * (0.04 / 12) * (12 * 13 / 2) = 100,000 * 0.0033333 * 78 = 26,000 KRW
  const isRes = calculateInstallmentSavings(100000, 4, 12);
  assert.equal(isRes.totalPrincipalWon, 1200000);
  assert.equal(isRes.preTaxInterest, 26000);
  assert.equal(isRes.interestTax, 4004); // 26000 * 0.154 = 4004
  assert.equal(isRes.postTaxInterest, 21996);
  assert.equal(isRes.totalPreTax, 1226000);
  assert.equal(isRes.totalPostTax, 1221996);
  assert.equal(isRes.monthlyBreakdown.length, 12);
});

test('compareDepositAndSavings demonstrates deposit interest is greater than savings for same total', () => {
  // Total 1,200,000 KRW, 4%, 12 months
  // Fixed Deposit: 1,200,000 * 0.04 = 48,000 KRW
  // Installment Savings: 100,000 * 12 at 4% = 26,000 KRW
  const comp = compareDepositAndSavings(1200000, 4, 12);
  assert.equal(comp.fixedDeposit.preTaxInterest, 48000);
  assert.equal(comp.installmentSavings.preTaxInterest, 26000);
  assert.equal(comp.interestDifference, 22000);
  assert.ok(comp.fixedDeposit.preTaxInterest > comp.installmentSavings.preTaxInterest);
});

test('virtual stock trading portfolio handles buy, weighted avg price, partial/full sell, and validation', () => {
  const initial = createInitialStockPortfolio(1000000);
  assert.equal(initial.cashWon, 1000000);
  assert.equal(initial.sharesHeld, 0);
  assert.equal(initial.avgBuyPrice, 0);
  assert.equal(initial.realizedPnL, 0);

  // Buy 5 shares at 50,000 KRW -> cost 250,000, cash 750,000, avg 50,000
  const buy1 = executeStockBuy(initial, 50000, 5);
  assert.equal(buy1.ok, true);
  assert.equal(buy1.state.cashWon, 750000);
  assert.equal(buy1.state.sharesHeld, 5);
  assert.equal(buy1.state.avgBuyPrice, 50000);

  // Buy 5 more shares at 70,000 KRW -> cost 350,000, cash 400,000, avg (250k+350k)/10 = 60,000
  const buy2 = executeStockBuy(buy1.state, 70000, 5);
  assert.equal(buy2.ok, true);
  assert.equal(buy2.state.cashWon, 400000);
  assert.equal(buy2.state.sharesHeld, 10);
  assert.equal(buy2.state.avgBuyPrice, 60000);

  // Reject overspending
  const badBuy = executeStockBuy(buy2.state, 100000, 10);
  assert.equal(badBuy.ok, false);
  assert.equal(badBuy.state.cashWon, 400000);

  // Unrealized PnL at 75,000 KRW -> (75k - 60k) * 10 = +150,000, total assets = 400k + 750k = 1,150,000
  const metrics = computeStockPortfolioMetrics(buy2.state, 75000, 1000000);
  assert.equal(metrics.unrealizedPnL, 150000);
  assert.equal(metrics.totalAssetsWon, 1150000);
  assert.equal(metrics.totalNetReturnWon, 150000);

  // Partial sell: sell 4 shares at 75,000 KRW -> realizedPnL +60,000, remaining 6 shares, avg remains 60,000
  const sell1 = executeStockSell(buy2.state, 75000, 4);
  assert.equal(sell1.ok, true);
  assert.equal(sell1.tradePnL, 60000);
  assert.equal(sell1.state.realizedPnL, 60000);
  assert.equal(sell1.state.sharesHeld, 6);
  assert.equal(sell1.state.avgBuyPrice, 60000);
  assert.equal(sell1.state.cashWon, 700000);

  // Reject oversell
  const badSell = executeStockSell(sell1.state, 75000, 7);
  assert.equal(badSell.ok, false);

  // Full sell: sell remaining 6 shares at 55,000 KRW -> tradePnL -30,000, total realizedPnL +30,000, avg resets to 0
  const sell2 = executeStockSell(sell1.state, 55000, 6);
  assert.equal(sell2.ok, true);
  assert.equal(sell2.tradePnL, -30000);
  assert.equal(sell2.state.realizedPnL, 30000);
  assert.equal(sell2.state.sharesHeld, 0);
  assert.equal(sell2.state.avgBuyPrice, 0);
  assert.equal(sell2.state.cashWon, 1030000);
});

test('calculateBondTradingResult computes capital gain and holding coupons accurately', () => {
  // Buy at 1,000,000, sell at 1,050,000 after 1 year with 3% coupon on 1,000,000 face value
  const res = calculateBondTradingResult(1000000, 3, 1000000, 1050000, 1);
  assert.equal(res.capitalGainWon, 50000);
  assert.equal(res.holdingCouponsWon, 30000);
  assert.equal(res.totalReturnWon, 80000);
  assert.equal(res.returnRatePercent, 8);
  assert.equal(res.isProfit, true);

  // Loss scenario: buy at 1,000,000, sell at 950,000 after 0 years
  const lossRes = calculateBondTradingResult(1000000, 3, 1000000, 950000, 0);
  assert.equal(lossRes.capitalGainWon, -50000);
  assert.equal(lossRes.totalReturnWon, -50000);
  assert.equal(lossRes.isProfit, false);
});

test('calculateBondPresentValue and generateBondPriceCurve show inverse rate-price relationship', () => {
  // When market rate == coupon rate (3%), PV equals face value (1,000,000)
  const parPrice = calculateBondPresentValue(1000000, 3, 3, 3);
  assert.equal(parPrice, 1000000);

  // When market rate rises to 5%, existing 3% bond price drops below face value
  const discountPrice = calculateBondPresentValue(1000000, 3, 5, 3);
  assert.ok(discountPrice < 1000000);

  // When market rate drops to 1%, existing 3% bond price rises above face value
  const premiumPrice = calculateBondPresentValue(1000000, 3, 1, 3);
  assert.ok(premiumPrice > 1000000);

  const curve = generateBondPriceCurve(1000000, 3, 3, [1, 3, 5]);
  assert.equal(curve.length, 3);
  assert.ok(curve[0].bondPriceWon > curve[1].bondPriceWon);
  assert.ok(curve[1].bondPriceWon > curve[2].bondPriceWon);
  assert.equal(curve[1].bondPriceWon, 1000000);
});

