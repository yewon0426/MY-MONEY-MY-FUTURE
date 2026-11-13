import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface Page10Props {
  resetSignal: number;
}

type VideoStep = 'step1' | 'step2';

interface VideoPreset {
  id: string;
  title: string;
  organization: string;
  youtubeId: string;
}

const PRESET_VIDEOS: VideoPreset[] = [
  {
    id: 'ebs_capitalism',
    title: 'EBS 다큐프라임 자본주의 제2부: 소비는 감정이다',
    organization: 'EBS 다큐프라임',
    youtubeId: 'JswjM26l46A',
  },
  {
    id: 'fss_teen_finance',
    title: '금융감독원 고교생 금융교육: 청소년이 알아야 할 금융의 기초',
    organization: '금융감독원 (FSS)',
    youtubeId: 'WkR_sD-h02o',
  },
  {
    id: 'toss_moneygraphy',
    title: '토스 머니그라피: 왜 소득이 늘어도 돈이 모이지 않을까?',
    organization: '토스 (Toss)',
    youtubeId: '2m-4e3xXn6U',
  },
];

export const Page10VideoWatch: React.FC<Page10Props> = ({ resetSignal }) => {
  const [activeStep, setActiveStep] = useState<VideoStep>('step1');
  const [selectedVideo, setSelectedVideo] = useState<VideoPreset>(PRESET_VIDEOS[0]);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [urlError, setUrlError] = useState<string>('');
  const [activeYoutubeId, setActiveYoutubeId] = useState<string>(PRESET_VIDEOS[0].youtubeId);

  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    setActiveStep('step1');
    setSelectedVideo(PRESET_VIDEOS[0]);
    setActiveYoutubeId(PRESET_VIDEOS[0].youtubeId);
    setCustomUrl('');
    setUrlError('');
    setTimeLeft(1200);
    setIsTimerRunning(false);
  }, [resetSignal]);

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleApplyCustomUrl = () => {
    setUrlError('');
    const trimmed = customUrl.trim();
    if (!trimmed) {
      setUrlError('유튜브 영상 URL 또는 11자리 영상 ID를 입력해 주세요.');
      return;
    }
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      setActiveYoutubeId(match[1]);
    } else if (/^[\w-]{11}$/.test(trimmed)) {
      setActiveYoutubeId(trimmed);
    } else {
      setUrlError('올바른 유튜브 URL(https://youtu.be/...) 또는 11자리 영상 ID를 입력해 주세요.');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timerPercentage = Math.round(((1200 - timeLeft) / 1200) * 100);

  return (
    <div className="flex-1 w-full max-w-[1720px] mx-auto px-8 xl:px-12 py-6 flex flex-col gap-6">
      {/* Header & STEP Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 text-[20px] font-bold text-blue-700">
            <span>UNIT 01</span>
            <span aria-hidden="true">·</span>
            <span>PAGE 10</span>
            <span aria-hidden="true">·</span>
            <span>20분 금융 영상 시청 및 토의</span>
          </div>
          <h2 className="text-[40px] xl:text-[46px] font-black text-slate-900 tracking-tight leading-tight mt-1">
            금융 생활 영상 시청
          </h2>
        </div>

        <nav
          aria-label="영상 시청 학습 단계"
          className="grid grid-cols-2 gap-2.5 bg-slate-200/80 p-2 rounded-2xl shrink-0"
        >
          {[
            { id: 'step1' as const, label: 'STEP 1. 영상 시청 & 타이머' },
            { id: 'step2' as const, label: 'STEP 2. 시청 전·후 나눔 질문' },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStep(tab.id)}
                className={`min-h-[60px] px-6 py-3 rounded-xl text-[20px] xl:text-[22px] font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/70 text-slate-700 hover:bg-white hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ================= STEP 1. 영상 시청 & 20분 타이머 ================= */}
      {activeStep === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-stretch">
          {/* Left: Video Player */}
          <div className="lg:col-span-8 bg-slate-950 rounded-3xl overflow-hidden flex flex-col justify-between border-2 border-slate-800">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
              <span className="font-black text-[22px] truncate">{selectedVideo.title}</span>
              <a
                href={`https://www.youtube.com/watch?v=${activeYoutubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-[19px] flex items-center gap-2 shrink-0"
              >
                <ExternalLink className="w-5 h-5" />
                <span>새 창 열기</span>
              </a>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeYoutubeId}?rel=0&autoplay=0`}
                title="교육용 금융 영상 플레이어"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[19px] text-slate-300 font-bold">추천 영상:</span>
                {PRESET_VIDEOS.map((vid) => (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => {
                      setSelectedVideo(vid);
                      setActiveYoutubeId(vid.youtubeId);
                      setUrlError('');
                    }}
                    className={`min-h-[52px] px-4 rounded-xl text-[19px] font-black cursor-pointer ${
                      activeYoutubeId === vid.youtubeId
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {vid.organization}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="유튜브 URL 또는 11자리 영상 ID 붙여넣기"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    if (urlError) setUrlError('');
                  }}
                  className="flex-1 min-w-[240px] min-h-[52px] px-4 bg-slate-800 border border-slate-700 rounded-xl text-[19px] text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="min-h-[52px] px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-[19px] font-black cursor-pointer shrink-0"
                >
                  영상 변경
                </button>
              </div>

              {urlError && (
                <div className="p-3 rounded-xl bg-rose-950 border border-rose-500 text-rose-200 text-[18px] font-bold">
                  {urlError}
                </div>
              )}
            </div>
          </div>

          {/* Right: 20-Min Class Timer */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[24px] font-black text-amber-300">
                <Clock className="w-7 h-7" />
                <span>20분 수업 타이머</span>
              </div>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? '알림 소리 끄기' : '알림 소리 켜기'}
                className="min-h-[48px] min-w-[48px] rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-6 h-6 text-emerald-400" /> : <VolumeX className="w-6 h-6 text-slate-400" />}
              </button>
            </div>

            <div className="text-center space-y-4 my-auto">
              <div className="text-[76px] xl:text-[88px] font-black font-mono tracking-tight text-white tabular-nums leading-none">
                {formattedTime}
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${timerPercentage}%` }}
                />
              </div>
              <p className="text-[20px] font-bold text-slate-300">
                영상 시청 중 인상 깊은 키워드 1가지를 적어보세요
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`min-h-[64px] rounded-2xl font-black text-[22px] flex items-center justify-center gap-2 cursor-pointer ${
                  isTimerRunning
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                }`}
              >
                {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                <span>{isTimerRunning ? '일시정지' : '시작'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTimeLeft(1200);
                  setIsTimerRunning(false);
                }}
                className="min-h-[64px] bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-[22px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-6 h-6" />
                <span>20분 리셋</span>
              </button>

              <button
                type="button"
                onClick={() => setTimeLeft((prev) => prev + 60)}
                className="min-h-[56px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-black text-[20px] cursor-pointer"
              >
                +1분 추가
              </button>

              <button
                type="button"
                onClick={() => setTimeLeft((prev) => prev + 300)}
                className="min-h-[56px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-black text-[20px] cursor-pointer"
              >
                +5분 추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2. 시청 전·후 나눔 질문 ================= */}
      {activeStep === 'step2' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 font-black text-[20px]">
                <HelpCircle className="w-6 h-6" />
                <span>시청 전 생각 열기 질문</span>
              </div>
              <h3 className="text-[32px] xl:text-[38px] font-black text-slate-900 leading-snug">
                &ldquo;돈을 많이 벌면 누구나 부자가 될까요?&rdquo;
              </h3>
              <p className="text-[24px] font-semibold text-slate-700 leading-relaxed">
                수백억 원을 벌고도 몇 년 뒤 파산한 사람들의 사례를 떠올리며, 단순히 &lsquo;소득&rsquo;이 많은 것과 돈을 &lsquo;관리&rsquo;하는 것의 차이를 유심히 살펴봅시다.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 text-[22px] font-bold text-blue-950">
              포인트: 마케팅과 충동이 내 지갑을 어떻게 여는지 관찰해 보세요.
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 border-2 border-emerald-500 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[20px]">
                <Sparkles className="w-6 h-6" />
                <span>시청 후 교실 나눔 질문</span>
              </div>
              <h3 className="text-[32px] xl:text-[38px] font-black text-white leading-snug">
                &ldquo;돈을 잘 관리하는 사람은 어떤 행동을 할까요?&rdquo;
              </h3>
              <ul className="space-y-3 text-[24px] font-bold text-slate-100 leading-relaxed">
                <li>1. 감정적인 충동구매 멈추기 (필요 vs 욕구 구분)</li>
                <li>2. 월급날 먼저 저축하고 남은 돈으로 생활하기</li>
                <li>3. 비상금을 마련해 돌발 위험에 대비하기</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-2xl p-5 text-[22px] font-bold text-emerald-300">
              내가 공책에 적은 핵심 키워드 1가지를 옆 친구와 나누어 보세요!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
