import React from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';

interface TodoHeaderProps {
  totalCount: number;
  completedCount: number;
}

/**
 * TodoHeader 컴포넌트
 * - 앱의 헤더 타이틀과 오늘 날짜, 진행 상황 통계를 표시합니다.
 */
export const TodoHeader: React.FC<TodoHeaderProps> = ({ totalCount, completedCount }) => {
  // 오늘 날짜 포맷 (한국어 형식)
  const todayFormatted = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());

  // 완료 비율 계산 (0 ~ 100%)
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-sm">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              오늘의 할 일
            </h1>
            <p className="text-xs text-neutral-500 font-medium">{todayFormatted}</p>
          </div>
        </div>

        {/* 진행 현황 뱃지 */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            {completedCount} / {totalCount} 완료
          </span>
        </div>
      </div>

      {/* 진행률 프로그레스 바 */}
      {totalCount > 0 && (
        <div className="mt-3">
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${completionRate}%` }}
              role="progressbar"
              aria-valuenow={completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}
    </header>
  );
};
