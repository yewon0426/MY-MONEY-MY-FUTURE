import { jsPDF } from 'jspdf';
import type { Unit6PlanState } from '../types';
import {
  diagnoseFinancialPlan,
  evaluateEconomicShock,
  evaluateGoalFeasibility,
  evaluateMonthlyBudget,
} from './finance';

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const result: string[] = [];
  const paragraphs = text.split('\n');
  for (const para of paragraphs) {
    if (!para.trim()) {
      result.push('');
      continue;
    }
    let current = '';
    for (const ch of para) {
      const test = current + ch;
      if (ctx.measureText(test).width > maxWidth && current.length > 0) {
        result.push(current);
        current = ch;
      } else {
        current = test;
      }
    }
    if (current) result.push(current);
  }
  return result;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fillStyle?: string,
  strokeStyle?: string,
  lineWidth = 2
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}

/**
 * Renders the student-safe (no PII) UNIT 06 Financial Life Plan document
 * onto a crisp 2x A4 canvas and exports a downloadable .pdf via jsPDF.
 */
export async function exportUnit6PlanToPdf(plan: Unit6PlanState): Promise<void> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed with fallback system sans font
    }
  }

  const width = 1240;
  const height = 1754; // A4 ratio @ ~150dpi
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('PDF 캔버스를 생성할 수 없습니다.');
  }

  const fontFamily = "'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
  const budgetEval = evaluateMonthlyBudget(plan.monthlyIncomeMan, plan.budget);
  const shockImpact = evaluateEconomicShock(
    plan.monthlyIncomeMan,
    plan.budget,
    plan.emergencyFundMan,
    plan.activeShockId
  );
  const goalEval = evaluateGoalFeasibility(
    plan.goalTargetMan,
    plan.goalMonths,
    budgetEval.savingsAndInvestMan,
    0
  );
  const diagnosis = diagnoseFinancialPlan(plan);

  // Page Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Header Banner
  drawRoundedRect(ctx, 56, 48, width - 112, 136, 20, '#0F172A');
  ctx.fillStyle = '#60A5FA';
  ctx.font = `700 20px ${fontFamily}`;
  ctx.fillText('2022 개정 통합사회2 · MONEY LAB 활동 설계서', 92, 92);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 40px ${fontFamily}`;
  ctx.fillText('나의 첫 금융 생활 설계서', 92, 144);

  const today = new Date();
  const dateText = `작성일: ${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(
    today.getDate()
  ).padStart(2, '0')}`;
  ctx.fillStyle = '#CBD5E1';
  ctx.font = `600 20px ${fontFamily}`;
  ctx.textAlign = 'right';
  ctx.fillText(dateText, width - 92, 96);
  ctx.fillText('학번·이름 등 개인정보 미수집 (교육용)', width - 92, 138);
  ctx.textAlign = 'left';

  let cursorY = 208;

  // Row 1: KPI 4 Cards
  const kpiW = (width - 112 - 36) / 4;
  const kpis = [
    { label: '월 실수령 소득', value: `${plan.monthlyIncomeMan}만 원`, sub: '사회초년생 기준', bg: '#EFF6FF', border: '#BFDBFE', valColor: '#1D4ED8' },
    { label: '월 생활비 지출', value: `${budgetEval.livingExpenseMan}만 원`, sub: `보험 별도 ${budgetEval.insuranceMan}만 원`, bg: '#F8FAFC', border: '#CBD5E1', valColor: '#0F172A' },
    { label: '월 저축·투자 금액', value: `${budgetEval.savingsAndInvestMan}만 원`, sub: `소득의 ${budgetEval.savingsRatePercent}%`, bg: '#ECFDF5', border: '#A7F3D0', valColor: '#047857' },
    { label: '비상자금 확보액', value: `${plan.emergencyFundMan}만 원`, sub: `진단 충족 ${diagnosis.metCount}/6개`, bg: '#FFFBEB', border: '#FDE68A', valColor: '#B45309' },
  ];

  kpis.forEach((k, i) => {
    const x = 56 + i * (kpiW + 12);
    drawRoundedRect(ctx, x, cursorY, kpiW, 128, 16, k.bg, k.border, 2);
    ctx.fillStyle = '#475569';
    ctx.font = `700 18px ${fontFamily}`;
    ctx.fillText(k.label, x + 20, cursorY + 34);
    ctx.fillStyle = k.valColor;
    ctx.font = `900 32px ${fontFamily}`;
    ctx.fillText(k.value, x + 20, cursorY + 80);
    ctx.fillStyle = '#64748B';
    ctx.font = `600 16px ${fontFamily}`;
    ctx.fillText(k.sub, x + 20, cursorY + 110);
  });

  cursorY += 152;

  // Section 2: 월간 예산 배분표 (9개 항목)
  drawRoundedRect(ctx, 56, cursorY, width - 112, 232, 18, '#F8FAFC', '#CBD5E1', 2);
  ctx.fillStyle = '#0F172A';
  ctx.font = `900 24px ${fontFamily}`;
  ctx.fillText('1. 월간 소득·지출 예산 계획 (총 배분: ' + budgetEval.totalAllocatedMan + '만 원 / ' + plan.monthlyIncomeMan + '만 원)', 84, cursorY + 42);

  ctx.fillStyle = budgetEval.isOverBudget ? '#DC2626' : '#059669';
  ctx.font = `800 20px ${fontFamily}`;
  ctx.textAlign = 'right';
  ctx.fillText(
    budgetEval.isOverBudget
      ? `예산 초과 경고: -${budgetEval.overAmountMan}만 원`
      : `예비 여유자금: +${budgetEval.remainingMan}만 원`,
    width - 84,
    cursorY + 42
  );
  ctx.textAlign = 'left';

  const budgetItems = [
    ['주거비', `${plan.budget.housing}만 원`],
    ['식비', `${plan.budget.food}만 원`],
    ['교통비', `${plan.budget.transport}만 원`],
    ['통신비', `${plan.budget.telecom}만 원`],
    ['여가비', `${plan.budget.leisure}만 원`],
    ['저축 (예·적금)', `${plan.budget.savings}만 원`],
    ['투자 (채권·ETF·주식)', `${plan.budget.investment}만 원`],
    ['보험료', `${plan.budget.insurance}만 원`],
    ['기타 지출', `${plan.budget.other}만 원`],
  ];

  const colW = (width - 168 - 24) / 3;
  budgetItems.forEach(([name, val], idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const bx = 84 + col * (colW + 12);
    const by = cursorY + 64 + row * 50;
    drawRoundedRect(ctx, bx, by, colW, 42, 10, '#FFFFFF', '#E2E8F0', 1.5);
    ctx.fillStyle = '#334155';
    ctx.font = `700 18px ${fontFamily}`;
    ctx.fillText(name, bx + 14, by + 27);
    ctx.fillStyle = '#0F172A';
    ctx.font = `800 19px ${fontFamily}`;
    ctx.textAlign = 'right';
    ctx.fillText(val, bx + colW - 14, by + 27);
    ctx.textAlign = 'left';
  });

  cursorY += 256;

  // Section 3: 포트폴리오 & 선택 이유 (Left) + 재무 목표 및 달성 계획 (Right)
  const halfW = (width - 112 - 20) / 2;
  drawRoundedRect(ctx, 56, cursorY, halfW, 300, 18, '#FFFFFF', '#CBD5E1', 2);
  ctx.fillStyle = '#0F172A';
  ctx.font = `900 24px ${fontFamily}`;
  ctx.fillText('2. 선택한 금융상품 포트폴리오 & 이유', 84, cursorY + 42);

  const portItems = [
    { label: '예금·적금', pct: plan.portfolio.depositPercent, color: '#2563EB' },
    { label: '채권', pct: plan.portfolio.bondPercent, color: '#059669' },
    { label: '펀드·ETF', pct: plan.portfolio.fundEtfPercent, color: '#7C3AED' },
    { label: '주식', pct: plan.portfolio.stockPercent, color: '#D97706' },
  ];

  portItems.forEach((p, idx) => {
    const py = cursorY + 66 + idx * 34;
    ctx.fillStyle = '#334155';
    ctx.font = `700 18px ${fontFamily}`;
    ctx.fillText(p.label, 84, py + 20);
    drawRoundedRect(ctx, 196, py + 5, 250, 18, 9, '#F1F5F9');
    if (p.pct > 0) {
      drawRoundedRect(ctx, 196, py + 5, Math.max(14, (250 * p.pct) / 100), 18, 9, p.color);
    }
    ctx.fillStyle = '#0F172A';
    ctx.font = `800 18px ${fontFamily}`;
    ctx.textAlign = 'right';
    ctx.fillText(`${p.pct}%`, 56 + halfW - 28, py + 20);
    ctx.textAlign = 'left';
  });

  ctx.fillStyle = '#475569';
  ctx.font = `700 17px ${fontFamily}`;
  ctx.fillText('선택 근거:', 84, cursorY + 218);
  ctx.fillStyle = '#1E293B';
  ctx.font = `600 17px ${fontFamily}`;
  const reasonLines = wrapTextLines(ctx, plan.portfolioReason || '목적과 기간에 맞춰 분산 배분함.', halfW - 56).slice(0, 3);
  reasonLines.forEach((line, i) => {
    ctx.fillText(line, 84, cursorY + 244 + i * 23);
  });

  // Right card: 재무 목표
  const rightX = 56 + halfW + 20;
  drawRoundedRect(ctx, rightX, cursorY, halfW, 300, 18, '#FFFFFF', '#CBD5E1', 2);
  ctx.fillStyle = '#0F172A';
  ctx.font = `900 24px ${fontFamily}`;
  ctx.fillText('3. 나의 재무 목표 및 달성 계획', rightX + 28, cursorY + 42);

  drawRoundedRect(ctx, rightX + 28, cursorY + 64, halfW - 56, 78, 12, '#EFF6FF', '#BFDBFE', 1.5);
  ctx.fillStyle = '#1E3A8A';
  ctx.font = `900 22px ${fontFamily}`;
  ctx.fillText(plan.goalTitle, rightX + 46, cursorY + 98);
  ctx.fillStyle = '#1D4ED8';
  ctx.font = `700 18px ${fontFamily}`;
  ctx.fillText(`목표 금액: ${plan.goalTargetMan.toLocaleString('ko-KR')}만 원  ·  목표 기간: ${plan.goalMonths}개월`, rightX + 46, cursorY + 128);

  const goalStats = [
    `월 저축·투자 여력: ${budgetEval.savingsAndInvestMan}만 원 / 월`,
    `기한 내 예상 적립액(원금): ${goalEval.projectedTotalMan.toLocaleString('ko-KR')}만 원 (달성률 ${goalEval.achievementPercent}%)`,
    `목표 달성을 위한 필요 월 저축액: ${goalEval.requiredMonthlyMan}만 원`,
    goalEval.isAchievable
      ? `판정: 현재 저축 계획으로 목표 달성이 가능합니다 (+${goalEval.surplusMan}만 원 여유).`
      : `판정: 월 ${goalEval.shortfallMan}만 원(총액 기준) 부족 — 소비 조정 또는 기간 연장이 필요합니다.`,
  ];
  ctx.font = `600 17px ${fontFamily}`;
  goalStats.forEach((st, idx) => {
    ctx.fillStyle = idx === 3 ? (goalEval.isAchievable ? '#047857' : '#B45309') : '#334155';
    const lines = wrapTextLines(ctx, st, halfW - 56).slice(0, 2);
    lines.forEach((ln, lIdx) => {
      ctx.fillText(ln, rightX + 28, cursorY + 174 + idx * 32 + lIdx * 20);
    });
  });

  cursorY += 324;

  // Section 4: 돌발 상황 · 위험 대비 계획
  drawRoundedRect(ctx, 56, cursorY, width - 112, 188, 18, '#FFFBEB', '#FDE68A', 2);
  ctx.fillStyle = '#92400E';
  ctx.font = `900 23px ${fontFamily}`;
  ctx.fillText('4. 돌발 상황 및 경제 환경 변화 대응 계획', 84, cursorY + 40);

  ctx.fillStyle = '#1E293B';
  ctx.font = `700 18px ${fontFamily}`;
  ctx.fillText(
    `선택 점검 시나리오: ${shockImpact.title}  |  충격 후 비상자금 잔액: ${shockImpact.remainingEmergencyFundMan}만 원  |  조정 후 월 수지: ${shockImpact.adjustedMonthlyBalanceMan >= 0 ? '+' : ''}${shockImpact.adjustedMonthlyBalanceMan}만 원`,
    84,
    cursorY + 76
  );

  ctx.fillStyle = '#334155';
  ctx.font = `600 18px ${fontFamily}`;
  const riskLines = wrapTextLines(
    ctx,
    `나의 위험 대비 방안: ${plan.riskResponsePlan}${plan.shockResolvedNote ? ' / 추가 조정 메모: ' + plan.shockResolvedNote : ''}`,
    width - 168
  ).slice(0, 3);
  riskLines.forEach((line, idx) => {
    ctx.fillText(line, 84, cursorY + 112 + idx * 25);
  });

  cursorY += 210;

  // Section 5: 6대 영역 종합 진단 결과
  drawRoundedRect(ctx, 56, cursorY, width - 112, 378, 18, '#F8FAFC', '#CBD5E1', 2);
  ctx.fillStyle = '#0F172A';
  ctx.font = `900 24px ${fontFamily}`;
  ctx.fillText(`5. 나의 금융 생활 계획 6대 기준 점검 (충족 ${diagnosis.metCount} / 6개)`, 84, cursorY + 42);

  diagnosis.criteria.forEach((c, idx) => {
    const cy = cursorY + 62 + idx * 45;
    drawRoundedRect(ctx, 84, cy, width - 168, 38, 10, '#FFFFFF', '#E2E8F0', 1.5);
    const badgeColor =
      c.status === '충족' ? '#059669' : c.status === '보완 권장' ? '#D97706' : '#DC2626';
    drawRoundedRect(ctx, 96, cy + 7, 94, 24, 6, badgeColor);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 14px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(c.status, 143, cy + 24);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#0F172A';
    ctx.font = `800 17px ${fontFamily}`;
    ctx.fillText(c.label, 206, cy + 25);

    ctx.fillStyle = '#475569';
    ctx.font = `600 16px ${fontFamily}`;
    ctx.textAlign = 'right';
    ctx.fillText(c.scoreText, width - 100, cy + 25);
    ctx.textAlign = 'left';
  });

  ctx.fillStyle = '#1E3A8A';
  ctx.font = `700 17px ${fontFamily}`;
  const overallLines = wrapTextLines(ctx, `종합 의견: ${diagnosis.overallComment}`, width - 168).slice(0, 2);
  overallLines.forEach((ln, i) => {
    ctx.fillText(ln, 84, cursorY + 344 + i * 22);
  });

  // Footer Disclaimer
  ctx.fillStyle = '#64748B';
  ctx.font = `600 16px ${fontFamily}`;
  ctx.fillText(
    '※ 본 문서는 고등학교 통합사회2 「자산 관리와 금융 생활 설계」 교육용 가상 시뮬레이션 결과이며, 특정 금융상품의 투자 권유나 수익 보장이 아닙니다.',
    56,
    height - 36
  );

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  pdf.save('나의_첫_금융_생활_설계서.pdf');
}
