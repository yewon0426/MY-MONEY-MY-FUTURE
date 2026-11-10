import React, { useState } from 'react';
import { calculateTotalExpense, formatManWon } from '../../utils/finance';
import { HelpCircle, Plus, Minus, Home, Utensils, Smartphone, ShoppingBag, ShieldAlert, Sparkles } from 'lucide-react';

interface Page2Props {
  resetSignal: number;
}

interface ExpenseCategory {
  key: string;
  name: string;
  amount: number; // in 만원
  icon: React.ReactNode;
  type: 'fixed' | 'variable';
  typeLabel: '고정지출' | '변동지출';
  detail: string;
}

const INITIAL_EXPENSES: ExpenseCategory[] = [
  {
    key: 'rent',
    name: '월세·관리비',
    amount: 65,
    icon: <Home className="w-6 h-6 text-indigo-600" />,
    type: 'fixed',
    typeLabel: '고정지출',
    detail: '원룸 월세 55만 + 수도/전기/가스/인터넷 10만',
  },
  {
    key: 'food',
    name: '식비·카페',
    amount: 45,
    icon: <Utensils className="w-6 h-6 text-amber-600" />,
    type: 'variable',
    typeLabel: '변동지출',
    detail: '하루 두 끼 밥값 + 커피/배달음식',
  },
  {
    key: 'transport',
    name: '교통·통신',
    amount: 20,
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    type: 'fixed',
    typeLabel: '고정지출',
    detail: '지하철/버스 정기요금 + 스마트폰 무제한 요금제',
  },
  {
    key: 'leisure',
    name: '쇼핑·여가',
    amount: 35,
    icon: <ShoppingBag className="w-6 h-6 text-emerald-600" />,
    type: 'variable',
    typeLabel: '변동지출',
    detail: '의류/화장품 구입, 영화/OTT 구독, 취미 생활',
  },
  {
    key: 'insurance',
    name: '보험·의료·기타',
    amount: 20,
    icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
    type: 'fixed',
    typeLabel: '고정지출',
    detail: '실손의료보험 7만 + 병원/약국 + 생활 생필품',
  },
];

export const Page2LivingCost: React.FC<Page2Props> = ({ resetSignal }) => {
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(INITIAL_EXPENSES);
  const [showDiscussionResult, setShowDiscussionResult] = useState<boolean>(false);
  const [selectedHardestCut, setSelectedHardestCut] = useState<string | null>(null);

  React.useEffect(() => {
    setExpenses(INITIAL_EXPENSES);
    setShowDiscussionResult(false);
    setSelectedHardestCut(null);
  }, [resetSignal]);

  const updateAmount = (key: string, delta: number) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, amount: Math.max(0, item.amount + delta) } : item
      )
    );
  };

  const expenseRecord = expenses.reduce((acc, cur) => {
    acc[cur.key] = cur.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalExpense = calculateTotalExpense(expenseRecord);

  // Calculate fixed vs variable total
  const fixedTotal = expenses
    .filter((e) => e.type === 'fixed')
    .reduce((sum, e) => sum + e.amount, 0);
  const variableTotal = expenses
    .filter((e) => e.type === 'variable')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>청년 1인 가구 독립 생활비 시뮬레이터</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "혼자 살려면 한 달에 얼마가 필요할까?"
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl font-medium">
          각 항목의 금액을 터치하여 조정해 보세요. 총 생활비가 즉시 계산됩니다.
        </p>
      </div>

      {/* Main Grid: 5 Expense Categories */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
        {expenses.map((item) => (
          <div
            key={item.key}
            className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
              selectedHardestCut === item.key ? 'border-amber-500 ring-4 ring-amber-100' : 'border-slate-200'
            }`}
          >
            {/* Header: Icon & Category Tag */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  {item.icon}
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.type === 'fixed'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {item.typeLabel}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[32px] leading-relaxed">
                {item.detail}
              </p>
            </div>

            {/* Amount & Adjust Buttons */}
            <div className="my-4">
              <div className="text-center bg-slate-50 border border-slate-100 rounded-2xl p-3 mb-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                  {formatManWon(item.amount)}
                </span>
              </div>

              {/* Quick Stepper Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateAmount(item.key, -5)}
                  disabled={item.amount < 5}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 disabled:opacity-30 transition-all cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" /> -5만
                </button>
                <button
                  onClick={() => updateAmount(item.key, 5)}
                  className="py-2 px-3 bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> +5만
                </button>
              </div>
            </div>

            {/* Discussion vote select button */}
            <button
              onClick={() => {
                setSelectedHardestCut(item.key);
                setShowDiscussionResult(true);
              }}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedHardestCut === item.key
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              줄이기 가장 어렵다 투표
            </button>
          </div>
        ))}
      </div>

      {/* Summary KPI Strip & Discussion Insight */}
      <div className="space-y-4">
        {/* Total Cost Strip */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                가상 1인 가구 월 생활비 합계
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight tabular-nums">
                  {formatManWon(totalExpense)}
                </span>
                <span className="text-slate-400 text-sm hidden sm:inline">
                  (고정지출 {formatManWon(fixedTotal)} + 변동지출 {formatManWon(variableTotal)})
                </span>
              </div>
            </div>
          </div>

          {/* Discussion Trigger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDiscussionResult(!showDiscussionResult)}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm"
            >
              <HelpCircle className="w-5 h-5 text-slate-950" />
              <span>질문: 가장 줄이기 어려운 지출은 무엇일까요?</span>
            </button>
          </div>
        </div>

        {/* Classroom Discussion Modal / Card */}
        {showDiscussionResult && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 animate-fade-in shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xl">
                <span>💡 교실 토론 포인트: 고정지출 vs 변동지출</span>
              </div>
              <span className="text-xs text-amber-800 font-semibold bg-amber-200/80 px-3 py-1 rounded-full">
                정답: 계약으로 묶인 "고정지출(월세·관리비 등)"
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-2xl border border-rose-200">
                <h4 className="font-extrabold text-rose-800 text-base mb-1">
                  1. 고정지출 (월세, 관리비, 통신비 등)
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  임대차 계약이나 요금제 약정으로 묶여 있어, 내가 돈이 없다고 해서 당장 다음 달에 줄일 수 없습니다.
                  연체하면 신용점수가 떨어지거나 주거가 불안정해집니다.
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-emerald-200">
                <h4 className="font-extrabold text-emerald-800 text-base mb-1">
                  2. 변동지출 (식비, 카페, 쇼핑, 문화생활)
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  외식을 줄이고 집밥을 먹거나, 쇼핑을 미루는 등 나의 의지와 절약으로 줄일 수 있는 지출입니다.
                  하지만 무리하게 줄이면 삶의 질이 떨어집니다.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-slate-400">
          ※ 본 금액은 실제 통계 평균이 아닌 청년 1인 가구의 이해를 돕기 위한 교육용 가상 사례입니다.
        </div>
      </div>
    </div>
  );
};
