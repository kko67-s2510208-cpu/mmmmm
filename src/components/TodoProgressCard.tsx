import React from 'react';
import { CheckCircle2, Circle, Trophy, Flame, PlayCircle, Sparkles } from 'lucide-react';

interface TodoProgressCardProps {
  totalCount: number;
  completedCount: number;
}

/**
 * TodoProgressCard 컴포넌트
 * - 할 일 목록 전체와 완료된 항목을 % 및 시각적 게이지로 한눈에 확인할 수 있는 프로그레스 대시보드 카드입니다.
 * - 원형 SVG 도넛 차트, 가로형 애니메이션 바, 3분할 통계 칩, 그리고 달성률에 따른 동적 피드백 메시지를 제공합니다.
 */
export const TodoProgressCard: React.FC<TodoProgressCardProps> = ({
  totalCount,
  completedCount,
}) => {
  // 진행 중(남은) 할 일 개수
  const activeCount = Math.max(0, totalCount - completedCount);

  // 달성률 계산 (0 ~ 100%)
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 원형 프로그레스 바 SVG 계산용 상수
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  // 달성률에 따른 상태별 메시지와 테마 색상 설정
  const getProgressStatus = () => {
    if (totalCount === 0) {
      return {
        message: '새로운 할 일을 추가하고 하루를 계획해 보세요!',
        icon: Sparkles,
        badgeText: '준비 완료',
        badgeColor: 'bg-neutral-100 text-neutral-600',
        strokeColor: 'stroke-neutral-300',
        barGradient: 'from-neutral-300 to-neutral-400',
      };
    }
    if (percentage === 100) {
      return {
        message: '모든 할 일을 완벽히 마쳤어요! 최고의 하루네요 👏',
        icon: Trophy,
        badgeText: '100% 목표 달성',
        badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        strokeColor: 'stroke-emerald-500',
        barGradient: 'from-emerald-500 to-teal-500',
      };
    }
    if (percentage >= 50) {
      return {
        message: '벌써 절반 이상 해냈어요! 끝까지 힘내보아요 💪',
        icon: Flame,
        badgeText: '순항 중',
        badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
        strokeColor: 'stroke-indigo-600',
        barGradient: 'from-indigo-600 to-violet-600',
      };
    }
    return {
      message: '시작이 반이에요! 하나씩 차근차근 완료해 보세요 🏃‍♂️',
      icon: PlayCircle,
      badgeText: '진행 중',
      badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200',
      strokeColor: 'stroke-indigo-600',
      barGradient: 'from-indigo-500 to-blue-500',
    };
  };

  const status = getProgressStatus();
  const StatusIcon = status.icon;

  return (
    <div
      id="todo-progress-dashboard"
      className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-50 via-white to-neutral-50 border border-neutral-200/90 shadow-xs"
    >
      {/* 상단: 타이틀 및 뱃지 */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <StatusIcon className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold text-neutral-800 tracking-wide uppercase">
            진행 상황 요약
          </h2>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${status.badgeColor}`}
        >
          {status.badgeText}
        </span>
      </div>

      {/* 중앙: 원형 프로그레스 게이지 + 수치 카드 그리드 */}
      <div className="flex items-center gap-4 py-1">
        {/* 원형 SVG 프로그레스 차트 */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-22 h-22 -rotate-90 transform" viewBox="0 0 88 88">
            {/* 배경 트랙 원 */}
            <circle
              cx="44"
              cy="44"
              r={radius}
              className="stroke-neutral-100"
              strokeWidth="7"
              fill="transparent"
            />
            {/* 채워지는 프로그레스 원 */}
            <circle
              cx="44"
              cy="44"
              r={radius}
              className={`${status.strokeColor} transition-all duration-500 ease-out`}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* 원 내부 중앙 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold text-neutral-900 tracking-tight leading-none">
              {percentage}
              <span className="text-xs font-semibold text-neutral-500 ml-0.5">%</span>
            </span>
            <span className="text-[10px] font-medium text-neutral-400 mt-0.5">완료율</span>
          </div>
        </div>

        {/* 3대 핵심 수치 통계 칩 */}
        <div className="flex-1 grid grid-cols-3 gap-2">
          {/* 1. 전체 할 일 */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-200/70 shadow-2xs text-center">
            <span className="text-[11px] font-medium text-neutral-500">전체</span>
            <span className="text-base font-bold text-neutral-900 mt-0.5">
              {totalCount}
            </span>
          </div>

          {/* 2. 진행 중인 일 */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-200/70 shadow-2xs text-center">
            <span className="text-[11px] font-medium text-amber-600 flex items-center gap-0.5">
              <Circle className="w-2.5 h-2.5 fill-amber-500 stroke-none" />
              진행 중
            </span>
            <span className="text-base font-bold text-neutral-900 mt-0.5">
              {activeCount}
            </span>
          </div>

          {/* 3. 다 한 일(완료) */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-200/70 shadow-2xs text-center">
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5 stroke-emerald-600" />
              다 한 일
            </span>
            <span className="text-base font-bold text-emerald-600 mt-0.5">
              {completedCount}
            </span>
          </div>
        </div>
      </div>

      {/* 하단 가로형 프로그레스 바 */}
      <div className="mt-3.5">
        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium mb-1.5">
          <span className="truncate pr-2">{status.message}</span>
          <span className="font-semibold text-neutral-700 shrink-0">
            {completedCount}/{totalCount}개
          </span>
        </div>
        <div className="w-full h-2 bg-neutral-200/70 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${status.barGradient} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
};
