import React, { useState, useEffect } from 'react';
import { Shield, Umbrella, Layers } from 'lucide-react';

interface Page05Props {
  resetSignal: number;
}

type RoleTab = 'insurance' | 'pension' | 'simulation';

export const Page05InsurancePensionRole: React.FC<Page05Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<RoleTab>('insurance');
  const [hasInsurance, setHasInsurance] = useState<boolean>(true);
  const [hasExtraPension, setHasExtraPension] = useState<boolean>(true);

  useEffect(() => {
    setActiveStep('insurance');
    setHasInsurance(true);
    setHasExtraPension(true);
  }, [resetSignal]);

  const emergencyAsset = 1200; // 1,200만 원
  const hospitalBill = 900; // 900만 원 큰 수술비
  const insuranceCovered = 750;
  const selfPay = hasInsurance ? hospitalBill - insuranceCovered : hospitalBill;
  const remainingAssetAfterHealth = emergencyAsset - selfPay;

  const publicPensionMan = 110;
  const extraPensionMan = hasExtraPension ? 95 : 0;
  const totalRetirementMonthly = publicPensionMan + extraPensionMan;

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-4 flex flex-col gap-4">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-teal-700">
            <span>UNIT 05</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 5</span>
            <span aria-hidden="true">·</span>
            <span>생애 위험 대비와 노후 보장</span>
          </div>
          <h2 className="text-[36px] xl:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1 whitespace-nowrap">
            생애 주기 속 보험과 연금의 역할
          </h2>
        </div>

        <nav
          aria-label="보험·연금 학습 단계"
          className="flex flex-wrap items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl shrink-0"
        >
          {[
            { id: 'insurance' as const, label: 'STEP 1. 보험료 vs 보험금' },
            { id: 'pension' as const, label: 'STEP 2. 3층 연금 체계' },
            { id: 'simulation' as const, label: 'STEP 3. 생애 사건 대비 실험' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStep(tab.id)}
              className={`min-h-[52px] px-4 py-2 rounded-xl text-[18px] font-black cursor-pointer transition-all whitespace-nowrap ${
                activeStep === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeStep === 'insurance' && (
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          <div className="bg-slate-900 text-white rounded-3xl p-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[20px] font-black text-teal-300 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                보험은 투자가 아니라 &ldquo;큰 위험을 여럿이 나누어 막는 안전장치&rdquo;
              </div>
              <p className="text-[23px] font-black mt-1">
                매달 내는 돈(보험료)과 위기 발생 시 받는 돈(보험금)을 정확히 구분해야 합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 flex flex-col justify-between gap-3">
              <span className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-black text-[18px] self-start">
                가입자 → 보험회사
              </span>
              <h3 className="text-[32px] font-black text-blue-950">보험료 (매달 내는 비용)</h3>
              <p className="text-[22px] font-bold text-slate-800 leading-relaxed">
                미래에 닥칠 수 있는 질병·상해·자동차 사고 등의 위험에 대비해 가입자가 보험회사에 정기적으로 납부하는 금액입니다.
              </p>
              <div className="bg-white rounded-2xl p-4 border border-blue-200 text-[19px] font-bold text-blue-900">
                * 무조건 많은 보험에 가입하면 생활비가 줄어들므로, 소득 대비 적정 수준 유지가 중요합니다.
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 flex flex-col justify-between gap-3">
              <span className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-[18px] self-start">
                보험회사 → 가입자
              </span>
              <h3 className="text-[32px] font-black text-emerald-950">보험금 (위기 시 받는 돈)</h3>
              <p className="text-[22px] font-bold text-slate-800 leading-relaxed">
                약속된 사고나 질병이 실제로 발생했을 때, 모아둔 공동 기금에서 치료비·생활 손실을 보전받기 위해 수령하는 금액입니다.
              </p>
              <div className="bg-white rounded-2xl p-4 border border-emerald-200 text-[19px] font-bold text-emerald-900">
                * 열심히 모은 저축과 비상자금이 한 번의 큰 병원비로 무너지지 않게 방어해 줍니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 'pension' && (
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          <div className="bg-slate-900 text-white rounded-3xl p-6">
            <div className="text-[20px] font-black text-teal-300 flex items-center gap-2">
              <Layers className="w-6 h-6" />
              연금의 원리: 일하는 시기에 납입 → 은퇴 후 매월 수령
            </div>
            <p className="text-[23px] font-black mt-1">
              청·장년기 흑자 구간의 소득 일부를 적립해, 근로소득이 줄어든 노년기 적자 구간의 생활비로 전환합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
            {[
              {
                tier: '1층 · 공적 보장',
                name: '국민연금 (기초 안전망)',
                role: '국가가 운영하는 의무 사회보험으로 최소한의 노후 기초 생활을 뒷받침합니다.',
                tone: 'bg-blue-50 border-blue-200 text-blue-950',
              },
              {
                tier: '2층 · 직장 보장',
                name: '퇴직연금 (직장인 노후)',
                role: '회사가 근로자의 퇴직 시 지급할 자금을 외부 금융기관에 적립·운용하여 연금으로 받습니다.',
                tone: 'bg-teal-50 border-teal-200 text-teal-950',
              },
              {
                tier: '3층 · 개인 준비',
                name: '개인연금 (맞춤 보완)',
                role: '개인이 여유로운 노후 생활을 위해 자발적으로 가입·납입해 부족한 노후 소득을 보충합니다.',
                tone: 'bg-purple-50 border-purple-200 text-purple-950',
              },
            ].map((item) => (
              <div
                key={item.tier}
                className={`border-2 rounded-3xl p-6 flex flex-col justify-between gap-4 ${item.tone}`}
              >
                <span className="px-4 py-1.5 rounded-xl bg-white border border-slate-300 text-[18px] font-black self-start">
                  {item.tier}
                </span>
                <h3 className="text-[28px] font-black">{item.name}</h3>
                <p className="text-[21px] font-bold text-slate-800 leading-relaxed bg-white/80 rounded-2xl p-4">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeStep === 'simulation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 min-h-0">
          {/* Simulation 1: Unexpected Medical Risk */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[24px] font-black text-slate-900 flex items-center gap-2">
                  <Umbrella className="w-7 h-7 text-blue-600" />
                  상황 ① 중장년기 큰 수술비 900만 원 발생
                </span>
              </div>
              <p className="text-[19px] font-bold text-slate-600 mt-2">
                현재 모아둔 저축·비상금 1,200만 원이 있을 때 보험 가입 유무에 따른 차이
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setHasInsurance(true)}
                className={`flex-1 min-h-[54px] rounded-xl font-black text-[19px] cursor-pointer ${
                  hasInsurance ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                적정 실손·질병보험 가입
              </button>
              <button
                type="button"
                onClick={() => setHasInsurance(false)}
                className={`flex-1 min-h-[54px] rounded-xl font-black text-[19px] cursor-pointer ${
                  !hasInsurance ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                보험 미가입
              </button>
            </div>

            <div
              className={`rounded-2xl p-5 border-2 space-y-2 ${
                hasInsurance ? 'bg-blue-50 border-blue-200' : 'bg-rose-50 border-rose-200'
              }`}
            >
              <div className="flex justify-between text-[20px] font-bold">
                <span>수령 보험금 보전</span>
                <span className="font-mono font-black">{hasInsurance ? '+750만 원' : '0만 원'}</span>
              </div>
              <div className="flex justify-between text-[20px] font-bold">
                <span>본인 부담금 지출</span>
                <span className="font-mono font-black text-rose-700">-{selfPay}만 원</span>
              </div>
              <div className="flex justify-between text-[24px] font-black border-t border-slate-300 pt-2">
                <span>수술 후 남은 저축 자산</span>
                <span className="font-mono text-blue-800">{remainingAssetAfterHealth}만 원</span>
              </div>
            </div>
          </div>

          {/* Simulation 2: Post-Retirement Cashflow */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm">
            <div>
              <span className="text-[24px] font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-7 h-7 text-teal-600" />
                상황 ② 은퇴 후 노년기 월 생활비 마련
              </span>
              <p className="text-[19px] font-bold text-slate-600 mt-2">
                65세 은퇴 후 월 필요 생활비 200만 원 기준 (교육용 가상 예시)
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setHasExtraPension(true)}
                className={`flex-1 min-h-[54px] rounded-xl font-black text-[19px] cursor-pointer ${
                  hasExtraPension ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                3층 연금 준비 (국민+퇴직·개인)
              </button>
              <button
                type="button"
                onClick={() => setHasExtraPension(false)}
                className={`flex-1 min-h-[54px] rounded-xl font-black text-[19px] cursor-pointer ${
                  !hasExtraPension ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                국민연금만 준비
              </button>
            </div>

            <div
              className={`rounded-2xl p-5 border-2 space-y-2 ${
                hasExtraPension ? 'bg-teal-50 border-teal-200' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex justify-between text-[20px] font-bold">
                <span>1층 국민연금 (예시)</span>
                <span className="font-mono font-black">월 {publicPensionMan}만 원</span>
              </div>
              <div className="flex justify-between text-[20px] font-bold">
                <span>2·3층 퇴직·개인연금 (예시)</span>
                <span className="font-mono font-black">월 {extraPensionMan}만 원</span>
              </div>
              <div className="flex justify-between text-[24px] font-black border-t border-slate-300 pt-2">
                <span>은퇴 후 예상 월 수령액</span>
                <span className="font-mono text-teal-800">월 {totalRetirementMonthly}만 원</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
