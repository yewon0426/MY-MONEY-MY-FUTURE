import React from 'react';
import { TeacherGuide } from '../types';
import {
  X,
  BookOpen,
  HelpCircle,
  MessageSquareQuote,
  Compass,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  Target,
  Sliders,
  Sparkles,
  CheckSquare,
} from 'lucide-react';

interface TeacherGuideModalProps {
  guide: TeacherGuide;
  isOpen: boolean;
  onClose: () => void;
  totalPages?: number;
  currentUnit?: number;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  guide,
  isOpen,
  onClose,
  totalPages = 11,
  currentUnit = 1,
}) => {
  if (!isOpen) return null;

  const hasExtended8Part = Boolean(
    guide.learningObjective ||
      guide.simulatorSteps?.length ||
      guide.whyItHappens ||
      guide.closingQuestion
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Lightbulb className="w-8 h-8 text-amber-300" />
            </div>
            <div className="min-w-0">
              <span className="text-base text-amber-300 font-bold block">
                교사용 수업 지도 가이드 · UNIT 0{currentUnit} · PAGE {guide.pageNumber} / {totalPages}
              </span>
              <h2
                id="teacher-guide-title"
                className="text-[28px] xl:text-[32px] font-black tracking-tight text-white mt-0.5 truncate"
              >
                {guide.pageTitle}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="가이드 닫기"
            className="min-h-[56px] min-w-[56px] flex items-center justify-center rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-[22px] leading-relaxed">
          {hasExtended8Part ? (
            <>
              {/* 1. 학습 목표 */}
              {guide.learningObjective && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                  <div className="flex items-center gap-3 text-indigo-800 font-black mb-3 text-[24px]">
                    <Target className="w-7 h-7 shrink-0" />
                    <span>1. 학습 목표</span>
                  </div>
                  <p className="text-slate-900 text-[22px] font-bold leading-relaxed">
                    {guide.learningObjective}
                  </p>
                </div>
              )}

              {/* 2. 도입 질문 & 예상 답변 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50/90 border border-blue-200 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center gap-3 text-blue-900 font-black mb-3 text-[24px]">
                    <HelpCircle className="w-7 h-7 shrink-0 text-blue-700" />
                    <span>2. 도입 질문</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-blue-200 flex-1 flex items-center">
                    <p className="text-blue-950 font-extrabold text-[22px] leading-snug">
                      &ldquo;{guide.studentQuestion}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center gap-3 text-emerald-900 font-black mb-3 text-[24px]">
                    <MessageSquareQuote className="w-7 h-7 shrink-0 text-emerald-700" />
                    <span>학생 예상 답변</span>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {guide.expectedAnswers.map((ans, idx) => (
                      <li
                        key={idx}
                        className="bg-white rounded-2xl px-5 py-3.5 text-[20px] font-bold text-emerald-950 border border-emerald-200"
                      >
                        {ans}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. 개념 설명 멘트 */}
              <div className="bg-indigo-50/80 border border-indigo-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-indigo-900 font-black mb-3 text-[24px]">
                  <BookOpen className="w-7 h-7 shrink-0 text-indigo-700" />
                  <span>3. 개념 설명 멘트</span>
                </div>
                <p className="text-slate-900 text-[22px] font-medium leading-relaxed bg-white p-5 rounded-2xl border border-indigo-200">
                  {guide.coreConcept}
                </p>
              </div>

              {/* 4. 생활 속 사례 */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-amber-950 font-black mb-3 text-[24px]">
                  <Compass className="w-7 h-7 shrink-0 text-amber-700" />
                  <span>4. 생활 속 사례</span>
                </div>
                <p className="text-slate-900 text-[22px] font-medium leading-relaxed bg-white p-5 rounded-2xl border border-amber-200">
                  {guide.realLifeStory}
                </p>
              </div>

              {/* 5. 시뮬레이터 조작 순서 */}
              {guide.simulatorSteps && guide.simulatorSteps.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                  <div className="flex items-center gap-3 text-slate-900 font-black mb-3 text-[24px]">
                    <Sliders className="w-7 h-7 shrink-0 text-blue-700" />
                    <span>5. 시뮬레이터 조작 순서</span>
                  </div>
                  <ol className="space-y-2.5">
                    {guide.simulatorSteps.map((step, idx) => (
                      <li
                        key={idx}
                        className="bg-white rounded-2xl px-5 py-3.5 text-[20px] font-bold text-slate-900 border border-slate-200 flex items-start gap-3"
                      >
                        <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-base flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* 6. 결과가 나타나는 이유 */}
              {guide.whyItHappens && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6">
                  <div className="flex items-center gap-3 text-emerald-950 font-black mb-3 text-[24px]">
                    <Sparkles className="w-7 h-7 shrink-0 text-emerald-700" />
                    <span>6. 결과가 나타나는 이유</span>
                  </div>
                  <p className="text-slate-900 text-[22px] font-medium leading-relaxed bg-white p-5 rounded-2xl border border-emerald-200">
                    {guide.whyItHappens}
                  </p>
                </div>
              )}

              {/* 7. 학생 예상 오개념 */}
              <div className="bg-rose-50/90 border border-rose-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-rose-900 font-black mb-3 text-[24px]">
                  <AlertTriangle className="w-7 h-7 shrink-0 text-rose-700" />
                  <span>7. 학생 예상 오개념</span>
                </div>
                <p className="text-slate-900 text-[22px] font-medium leading-relaxed">
                  {guide.commonMisconceptions}
                </p>
              </div>

              {/* 8. 마무리 질문 */}
              {guide.closingQuestion && (
                <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6">
                  <div className="flex items-center gap-3 text-blue-950 font-black mb-3 text-[24px]">
                    <CheckSquare className="w-7 h-7 shrink-0 text-blue-700" />
                    <span>8. 마무리 질문</span>
                  </div>
                  <p className="text-blue-950 font-bold text-[22px] bg-white p-5 rounded-2xl border border-blue-200">
                    &ldquo;{guide.closingQuestion}&rdquo;
                  </p>
                </div>
              )}

              {/* 다음 화면 전환 멘트 */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-indigo-950 font-black mb-3 text-[24px]">
                  <ArrowRight className="w-7 h-7 shrink-0 text-indigo-700" />
                  <span>다음 화면 전환 멘트</span>
                </div>
                <p className="text-indigo-950 font-bold text-[22px] bg-white p-5 rounded-2xl border border-indigo-200">
                  &ldquo;{guide.nextPageTransition}&rdquo;
                </p>
              </div>
            </>
          ) : (
            <>
              {/* 1. 핵심 개념 (Existing Unit 1~3 layout preserved) */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-indigo-800 font-black mb-3 text-[24px]">
                  <BookOpen className="w-7 h-7 shrink-0" />
                  <span>1. 이 화면에서 설명해야 할 핵심 개념</span>
                </div>
                <p className="text-slate-900 text-[22px] font-bold leading-relaxed">
                  {guide.coreConcept}
                </p>
              </div>

              {/* 2 & 3. 학생들에게 던질 질문 & 예상 답변 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50/90 border border-blue-200 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center gap-3 text-blue-900 font-black mb-3 text-[24px]">
                    <HelpCircle className="w-7 h-7 shrink-0 text-blue-700" />
                    <span>2. 학생들에게 던질 질문</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-blue-200 flex-1 flex items-center">
                    <p className="text-blue-950 font-extrabold text-[22px] leading-snug">
                      &ldquo;{guide.studentQuestion}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center gap-3 text-emerald-900 font-black mb-3 text-[24px]">
                    <MessageSquareQuote className="w-7 h-7 shrink-0 text-emerald-700" />
                    <span>3. 학생들의 예상 답변</span>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {guide.expectedAnswers.map((ans, idx) => (
                      <li
                        key={idx}
                        className="bg-white rounded-2xl px-5 py-3.5 text-[20px] font-bold text-emerald-950 border border-emerald-200"
                      >
                        {ans}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. 실생활 사례 */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-amber-950 font-black mb-3 text-[24px]">
                  <Compass className="w-7 h-7 shrink-0 text-amber-700" />
                  <span>4. 교사가 들려줄 실생활 이야기 & 조작 팁</span>
                </div>
                <p className="text-slate-900 text-[22px] font-medium leading-relaxed bg-white p-5 rounded-2xl border border-amber-200">
                  {guide.realLifeStory}
                </p>
              </div>

              {/* 5. 오해 및 지도 팁 */}
              <div className="bg-rose-50/90 border border-rose-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-rose-900 font-black mb-3 text-[24px]">
                  <AlertTriangle className="w-7 h-7 shrink-0 text-rose-700" />
                  <span>5. 오해하기 쉬운 착각 및 지도 팁</span>
                </div>
                <p className="text-slate-900 text-[22px] font-medium leading-relaxed">
                  {guide.commonMisconceptions}
                </p>
              </div>

              {/* 6. 다음 화면 전환 멘트 */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-indigo-950 font-black mb-3 text-[24px]">
                  <ArrowRight className="w-7 h-7 shrink-0 text-indigo-700" />
                  <span>6. 다음 화면 전환 멘트</span>
                </div>
                <p className="text-indigo-950 font-bold text-[22px] bg-white p-5 rounded-2xl border border-indigo-200">
                  &ldquo;{guide.nextPageTransition}&rdquo;
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-lg text-slate-600 font-bold">
            단축키: ESC 또는 T 키로 닫기
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[56px] px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
