import React from 'react';
import { ListTodo, Calendar } from 'lucide-react';

interface TodoHeaderProps {
  totalCount: number;
  completedCount: number;
}

/**
 * TodoHeader 컴포넌트
 * - 앱의 헤더 타이틀과 오늘 날짜를 표시합니다.
 */
export const TodoHeader: React.FC<TodoHeaderProps> = () => {
  // 오늘 날짜 포맷 (한국어 형식)
  const todayFormatted = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());

  return (
    <header className="mb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-xs">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              오늘의 할 일
            </h1>
            <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium mt-0.5">
              <Calendar className="w-3 h-3 text-neutral-400" />
              <span>{todayFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
