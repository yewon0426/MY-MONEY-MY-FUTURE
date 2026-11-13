import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

interface Page06Props {
  resetSignal: number;
}

type PersonaKey = 'young' | 'middle' | 'senior';

interface PersonaConfig {
  label: string;
  ageTitle: string;
  defaultIncomeMan: number;
  defaultExpenseMan: number;
  defaultSavingGoalMan: number;
  productFocus: string[];
  riskFocus: string[];
}

const PERSONAS: Record<PersonaKey, PersonaConfig> = {
  young: {
    label: '청년기 (28세 사회초년생)',
    ageTitle: '독립 · 종잣돈 형성기',
    defaultIncomeMan: 260,
    defaultExpenseMan: 165,
    defaultSavingGoalMan: 85,
    productFocus: ['보통예금(비상자금)', '정기적금', '펀드·ETF 소액 분산', '실손보험'],
    riskFocus: ['생활비 3개월분 비상금', '고정비(월세·통신) 통제', '충동 소비 방지'],
  },
  middle: {
    label: '중장년기 (45세 가정 경제기)',
    ageTitle: '자녀 교육 · 노후 준비 병행기',
    defaultIncomeMan: 520,
    defaultExpenseMan: 340,
    defaultSavingGoalMan: 160,
    productFocus: ['정기예금·채권', '글로벌 ETF 분산', '퇴직·개인연금 적립', '가족 보장 보험'],
    riskFocus: ['소득 중단·질병 대비 보험', '대출 금리 변동 관리', '노후 연금 비중 확보'],
  },
  senior: {
    label: '노년기 (65세 은퇴 전환기)',
    ageTitle: '자산 보전 · 현금 흐름 유지기',
    defaultIncomeMan: 230,
    defaultExpenseMan: 195,
    defaultSavingGoalMan: 30,
    productFocus: ['3층 연금 수령', '예금자보호 분산 예금', '국공채·안정 배당형', '의료 실손 대비'],
    riskFocus: ['고위험 집중 투자 자제', '의료·간병비 예비자금', '금융사기·보이스피싱 예방'],
  },
};

export const Page06LifeCycleDesignLab: React.FC<Page06Props> = ({ resetSignal }) => {
  const [personaKey, setPersonaKey] = useState<PersonaKey>('young');
  const [incomeMan, setIncomeMan] = useState<number>(260);
  const [expenseMan, setExpenseMan] = useState<number>(165);
  const [savingMan, setSavingMan] = useState<number>(85);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(PERSONAS.young.productFocus.slice(0, 3));
  const [selectedRisk, setSelectedRisk] = useState<string>(PERSONAS.young.riskFocus[0]);

  useEffect(() => {
    setPersonaKey('young');
    setIncomeMan(PERSONAS.young.defaultIncomeMan);
    setExpenseMan(PERSONAS.young.defaultExpenseMan);
    setSavingMan(PERSONAS.young.defaultSavingGoalMan);
    setSelectedProducts(PERSONAS.young.productFocus.slice(0, 3));
    setSelectedRisk(PERSONAS.young.riskFocus[0]);
  }, [resetSignal]);

  const handleSelectPersona = (key: PersonaKey) => {
    const p = PERSONAS[key];
    setPersonaKey(key);
    setIncomeMan(p.defaultIncomeMan);
    setExpenseMan(p.defaultExpenseMan);
    setSavingMan(p.defaultSavingGoalMan);
    setSelectedProducts(p.productFocus.slice(0, 3));
    setSelectedRisk(p.riskFocus[0]);
  };

  const toggleProduct = (prod: string) => {
    setSelectedProducts((prev) =>
      prev.includes(prod) ? (prev.length > 1 ? prev.filter((x) => x !== prod) : prev) : [...prev, prod]
    );
  };

  const p = PERSONAS[personaKey];
  const remaining = incomeMan - expenseMan - savingMan;
  const savingRate = incomeMan > 0 ? Math.round((savingMan / incomeMan) * 100) : 0;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-teal-700">
            <span>UNIT 05</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 6</span>
            <span aria-hidden="true">·</span>
            <span>생애 단계 맞춤 설계 실습</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            생애 단계별 금융 설계 실습실
          </h2>
        </div>

        <nav
          aria-label="생애 설계 대상 선택"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {(Object.keys(PERSONAS) as PersonaKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleSelectPersona(k)}
              className={`min-h-[52px] px-4 py-2 rounded-xl text-[18px] font-black cursor-pointer transition-all whitespace-nowrap ${
                personaKey === k
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {PERSONAS[k].label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left: Interactive Controls */}
        <div className="xl:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <div className="flex justify-between text-[18px] font-black text-slate-900 mb-1">
                  <label htmlFor="u5-p6-inc">예상 월 소득</label>
                  <span className="font-mono text-blue-700">{incomeMan}만</span>
                </div>
                <input
                  id="u5-p6-inc"
                  type="range"
                  min={150}
                  max={700}
                  step={10}
                  value={incomeMan}
                  onChange={(e) => setIncomeMan(Number(e.target.value))}
                  className="w-full h-3 accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[18px] font-black text-slate-900 mb-1">
                  <label htmlFor="u5-p6-exp">예상 월 지출</label>
                  <span className="font-mono text-rose-700">{expenseMan}만</span>
                </div>
                <input
                  id="u5-p6-exp"
                  type="range"
                  min={100}
                  max={550}
                  step={10}
                  value={expenseMan}
                  onChange={(e) => setExpenseMan(Number(e.target.value))}
                  className="w-full h-3 accent-rose-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[18px] font-black text-slate-900 mb-1">
                  <label htmlFor="u5-p6-sav">월 저축·투자</label>
                  <span className="font-mono text-teal-700">{savingMan}만</span>
                </div>
                <input
                  id="u5-p6-sav"
                  type="range"
                  min={10}
                  max={300}
                  step={5}
                  value={savingMan}
                  onChange={(e) => setSavingMan(Number(e.target.value))}
                  className="w-full h-3 accent-teal-600 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <div className="text-[19px] font-black text-slate-900 mb-2">
                적합 금융상품 선택 (복수 선택 가능)
              </div>
              <div className="flex flex-wrap gap-2">
                {p.productFocus.map((prod) => {
                  const chosen = selectedProducts.includes(prod);
                  return (
                    <button
                      key={prod}
                      type="button"
                      onClick={() => toggleProduct(prod)}
                      className={`min-h-[48px] px-4 py-2 rounded-xl text-[18px] font-black border-2 cursor-pointer transition-all ${
                        chosen
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {prod}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-[19px] font-black text-slate-900 mb-2">
                핵심 위험 대비 방안 선택
              </div>
              <div className="flex flex-wrap gap-2">
                {p.riskFocus.map((rk) => {
                  const chosen = selectedRisk === rk;
                  return (
                    <button
                      key={rk}
                      type="button"
                      onClick={() => setSelectedRisk(rk)}
                      className={`min-h-[48px] px-4 py-2 rounded-xl text-[18px] font-black border-2 cursor-pointer transition-all ${
                        chosen
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {rk}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Presentation Summary Card */}
        <div className="xl:col-span-6 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-teal-300" />
              <div>
                <div className="text-[18px] font-bold text-teal-300">{p.label}</div>
                <h3 className="text-[28px] font-black">{p.ageTitle} 설계안</h3>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-xl text-[18px] font-black ${
                remaining < 0 ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              {remaining < 0 ? `월 ${Math.abs(remaining)}만 원 초과` : `예비 여유 +${remaining}만 원`}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-[17px] text-slate-300 font-bold">월 소득</div>
              <div className="font-mono text-[28px] font-black text-blue-300">{incomeMan}만 원</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-[17px] text-slate-300 font-bold">월 지출</div>
              <div className="font-mono text-[28px] font-black text-rose-300">{expenseMan}만 원</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-[17px] text-slate-300 font-bold">저축·투자율</div>
              <div className="font-mono text-[28px] font-black text-emerald-300">
                {savingMan}만 ({savingRate}%)
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-4 space-y-2">
            <div className="text-[18px] font-black text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              선택한 금융상품 & 위험 대비 핵심
            </div>
            <div className="text-[19px] font-bold text-slate-100">
              • 금융상품: {selectedProducts.join(' + ')}
            </div>
            <div className="text-[19px] font-bold text-slate-100">
              • 위험 대비: {selectedRisk}
            </div>
          </div>

          <div className="text-[18px] font-bold text-teal-200 bg-teal-950/60 border border-teal-700/60 rounded-2xl p-4">
            {remaining < 0
              ? '지출과 저축 목표의 합이 예상 월 소득을 초과했습니다. 지출 또는 저축 규모를 조정해 소득 범위 내에 맞추세요.'
              : `월 소득 안에서 소비(${expenseMan}만 원)와 저축(${savingMan}만 원)의 균형이 안정적으로 유지되고 있습니다.`}
          </div>
        </div>
      </div>
    </div>
  );
};
