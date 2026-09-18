import React from 'react';
import { FilterType } from '../types';

interface TodoFilterProps {
  currentFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

/**
 * TodoFilter 컴포넌트
 * - "전체 / 진행 중 / 완료" 목록을 전환하는 필터 탭입니다.
 * - 현재 선택된 필터 탭을 시각적으로 강조하며 항목 수를 함께 보여줍니다.
 */
export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onSelectFilter,
  counts,
}) => {
  // 필터 탭 구성 정보 목록
  const filterOptions: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: '전체', count: counts.all },
    { key: 'active', label: '진행 중', count: counts.active },
    { key: 'completed', label: '완료', count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl mb-4">
      {filterOptions.map((opt) => {
        const isActive = currentFilter === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            id={`filter-tab-${opt.key}`}
            onClick={() => onSelectFilter(opt.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
            }`}
          >
            <span>{opt.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              {opt.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
