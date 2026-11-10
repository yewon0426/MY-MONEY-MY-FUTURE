import React, { useState, useEffect } from 'react';
import {
  Video,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface Page10Props {
  resetSignal: number;
}

interface VideoPreset {
  id: string;
  title: string;
  organization: string;
  duration: string;
  youtubeId: string;
  description: string;
}

// Pre-curated legitimate high-quality educational videos
const PRESET_VIDEOS: VideoPreset[] = [
  {
    id: 'ebs_capitalism',
    title: 'EBS 다큐프라임 자본주의 제2부: 소비는 감정이다',
    organization: 'EBS 다큐프라임',
    duration: '약 15분 클립',
    youtubeId: 'JswjM26l46A',
    description: '우리가 왜 마케팅과 감정에 휘둘려 충동구매를 하는지 뇌과학과 심리학으로 풀어낸 교과서 필수 시청 명작',
  },
  {
    id: 'fss_teen_finance',
    title: '금융감독원 고교생 금융교육: 청소년이 알아야 할 금융의 기초',
    organization: '금융감독원 (FSS)',
    duration: '약 18분',
    youtubeId: 'WkR_sD-h02o',
    description: '사회초년생이 되기 전 반드시 익혀야 할 통장 관리, 신용점수, 4대 사회보험의 실제 작동 원리',
  },
  {
    id: 'toss_moneygraphy',
    title: '토스 머니그라피: 왜 소득이 늘어도 돈이 모이지 않을까?',
    organization: '토스 (Toss)',
    duration: '약 12분',
    youtubeId: '2m-4e3xXn6U',
    description: '소득의 크기보다 지출 관리와 저축 시스템 구축이 미래 자산에 미치는 결정적 영향',
  },
];

export const Page10VideoWatch: React.FC<Page10Props> = ({ resetSignal }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoPreset>(PRESET_VIDEOS[0]);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [activeYoutubeId, setActiveYoutubeId] = useState<string>(PRESET_VIDEOS[0].youtubeId);

  // 20-minute class timer (20 * 60 = 1200 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'preview' | 'postview'>('preview');

  useEffect(() => {
    setSelectedVideo(PRESET_VIDEOS[0]);
    setActiveYoutubeId(PRESET_VIDEOS[0].youtubeId);
    setCustomUrl('');
    setTimeLeft(1200);
    setIsTimerRunning(false);
    setActiveTab('preview');
  }, [resetSignal]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          // Optional sound beep or notification
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Parse Youtube URL to ID
  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) return;
    const match = customUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      setActiveYoutubeId(match[1]);
    } else {
      // Direct ID fallback if 11 chars
      if (customUrl.trim().length === 11) {
        setActiveYoutubeId(customUrl.trim());
      } else {
        alert('올바른 유튜브 영상 URL 또는 영상 ID를 입력해 주세요.');
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = Math.round(((1200 - timeLeft) / 1200) * 100);

  return (
    <div className="w-full h-full flex flex-col justify-between py-3 px-6 sm:px-8 max-w-[1700px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Video className="w-3.5 h-3.5 text-blue-600" />
          <span>시청각 활동 · 20분 금융 영상 탐구</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          "금융 생활 영상 시청"
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          영상을 감상하며 소비의 본질과 돈을 관리하는 사람들의 공통점을 발견해 보세요.
        </p>
      </div>

      {/* Main Center Area: Video Player & Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-3 flex-1 items-stretch">
        {/* Left Column (8 cols): Video Player & Controls */}
        <div className="lg:col-span-8 bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border-2 border-slate-800">
          {/* Top Bar inside Player */}
          <div className="p-3 bg-slate-900/90 text-white flex items-center justify-between text-xs border-b border-slate-800">
            <span className="font-bold text-slate-300 truncate max-w-md">
              {selectedVideo.title}
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${activeYoutubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>유튜브 새 창으로 열기 (임베드 제한 시)</span>
            </a>
          </div>

          {/* Iframe Container */}
          <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center">
            <iframe
              src={`https://www.youtube.com/embed/${activeYoutubeId}?rel=0&autoplay=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Bottom Video Selection & Custom URL Input */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
            {/* Presets Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">추천 교과 영상:</span>
              {PRESET_VIDEOS.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => {
                    setSelectedVideo(vid);
                    setActiveYoutubeId(vid.youtubeId);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeYoutubeId === vid.youtubeId
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {vid.organization}
                </button>
              ))}
            </div>

            {/* Custom URL Input Field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="교사용 직접 입력: 유튜브 영상 URL 또는 ID 붙여넣기 (https://youtu.be/...)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleApplyCustomUrl}
                className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                영상 변경
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): 20-min Timer & Discussion Questions */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {/* 20-min Classroom Countdown Timer */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>20분 수업 타이머</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
                title={soundEnabled ? '알림 켜짐' : '알림 꺼짐'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Large Digits */}
            <div className="text-center my-3">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white tabular-nums">
                {formattedTime}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                영상 시청 및 메모 정리 시간
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-3">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-1000"
                style={{ width: `${timerPercentage}%` }}
              />
            </div>

            {/* Timer Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  isTimerRunning
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? '일시정지' : '시작'}</span>
              </button>

              <button
                onClick={() => {
                  setTimeLeft(1200);
                  setIsTimerRunning(false);
                }}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>리셋</span>
              </button>

              <button
                onClick={() => setTimeLeft((prev) => prev + 60)}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs cursor-pointer"
              >
                +1분
              </button>

              <button
                onClick={() => setTimeLeft((prev) => prev + 300)}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs cursor-pointer"
              >
                +5분
              </button>
            </div>
          </div>

          {/* Pre-Viewing & Post-Viewing Discussion Tabs */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  시청 전 생각하기
                </button>
                <button
                  onClick={() => setActiveTab('postview')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'postview'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-500 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  시청 후 나눔 질문
                </button>
              </div>

              {activeTab === 'preview' ? (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>[시청 전 질문]</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    "돈을 많이 벌면 누구나 부자가 될까요?"
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    스포츠 스타나 복권 당첨자처럼 수백억을 벌었어도 몇 년 뒤 파산한 사람들의 사례를 생각하며, '소득'과 '관리'의 차이를 유심히 지켜봅시다.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>[시청 후 질문]</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    "돈을 잘 관리하는 사람은 어떤 행동을 할까요?"
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    1. 감정적인 충동구매 멈추기 (필요 Need vs 욕구 Want 구분)<br />
                    2. 월급날 먼저 저축하고 남은 돈으로 생활하기<br />
                    3. 비상금을 마련하여 돌발 위험에 대비하기
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-400">
              ※ 영상 시청 중 학생들에게 인상 깊은 키워드 1가지를 공책에 적도록 안내해 주세요.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400">
        ※ 학교 네트워크 환경에 따라 유튜브 임베드가 차단될 경우, 우측 상단의 '유튜브 새 창으로 열기'를 눌러 재생해 주세요.
      </div>
    </div>
  );
};
