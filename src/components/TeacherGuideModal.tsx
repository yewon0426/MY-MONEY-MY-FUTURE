import React from 'react';
import { TeacherGuide } from '../types';
import { X, BookOpen, HelpCircle, MessageSquareQuote, Compass, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xs tracking-wider uppercase text-amber-300 font-semibold">
                선생님을 위한 수업 지도 가이드 · UNIT 0{currentUnit} · PAGE {guide.pageNumber}/{totalPages}
              </span>
              <h2 id="teacher-guide-title" className="text-2xl font-bold tracking-tight text-white">
                {guide.pageTitle}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="가이드 닫기"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-base leading-relaxed">
          {/* 1. 핵심 개념 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-indigo-700 font-bold mb-2 text-lg">
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>1. 이 화면에서 설명해야 할 핵심 개념</span>
            </div>
            <p className="text-slate-800 text-lg font-medium pl-7">
              {guide.coreConcept}
            </p>
          </div>

          {/* 2. 학생들에게 던질 질문 & 예상 답변 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-2 text-blue-800 font-bold mb-2 text-lg">
                <HelpCircle className="w-5 h-5 shrink-0 text-blue-600" />
                <span>2. 학생들에게 던질 질문</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-blue-100 flex-1 flex items-center shadow-xs">
                <p className="text-blue-950 font-semibold text-lg italic leading-snug">
                  "{guide.studentQuestion}"
                </p>
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-2 text-emerald-800 font-bold mb-2 text-lg">
                <MessageSquareQuote className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>3. 학생들의 예상 답변</span>
              </div>
              <ul className="space-y-2 flex-1">
                {guide.expectedAnswers.map((ans, idx) => (
                  <li
                    key={idx}
                    className="bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-950 border border-emerald-100 shadow-xs"
                  >
                    {ans}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. 교사가 이어서 설명할 실생활 사례 */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-2 text-lg">
              <Compass className="w-5 h-5 shrink-0 text-amber-600" />
              <span>4. 교사가 들려줄 실생활 이야기 (구어체 예시)</span>
            </div>
            <p className="text-slate-800 text-base leading-relaxed pl-7 bg-white/80 p-4 rounded-xl border border-amber-100">
              "{guide.realLifeStory}"
            </p>
          </div>

          {/* 5. 학생들이 오해하기 쉬운 부분 */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-rose-800 font-bold mb-2 text-lg">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>5. 학생들이 오해하기 쉬운 착각 및 지도 팁</span>
            </div>
            <p className="text-slate-800 text-base leading-relaxed pl-7">
              {guide.commonMisconceptions}
            </p>
          </div>

          {/* 6. 다음 화면으로 연결하는 멘트 */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-indigo-900 font-bold mb-2 text-lg">
              <ArrowRight className="w-5 h-5 shrink-0 text-indigo-600" />
              <span>6. 다음 화면으로 연결하는 전환 멘트</span>
            </div>
            <p className="text-indigo-950 font-semibold text-lg italic pl-7 bg-white/70 p-3.5 rounded-xl border border-indigo-100">
              "{guide.nextPageTransition}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            단축키: ESC 또는 상단 [교사용 가이드] 버튼을 다시 누르면 닫힙니다.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
