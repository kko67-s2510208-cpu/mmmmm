import React, { useState } from 'react';
import { CheckCheck, ChevronDown, Trash2 } from 'lucide-react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface CompletedSectionProps {
  completedTodos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onClearCompleted?: () => void;
}

/**
 * CompletedSection 컴포넌트
 * - 완료(체크)된 할 일들을 하단에 별도로 모아 정리해주는 전용 섹션입니다.
 * - 접기/펼치기 토글 기능 및 완료 항목 일괄 비우기 편의 기능을 제공합니다.
 */
export const CompletedSection: React.FC<CompletedSectionProps> = ({
  completedTodos,
  onToggleTodo,
  onDeleteTodo,
  onClearCompleted,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (completedTodos.length === 0) {
    return null;
  }

  return (
    <section
      id="completed-tasks-section"
      aria-labelledby="completed-tasks-heading"
      className="mt-6 pt-5 border-t border-dashed border-neutral-200"
    >
      {/* 하단 완료 전용 섹션 헤더 카드 */}
      <div className="flex items-center justify-between p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/70 mb-3">
        {/* 접기/펼치기 버튼 */}
        <button
          type="button"
          id="toggle-completed-list-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 text-left cursor-pointer group select-none"
          aria-expanded={isOpen}
          aria-controls="completed-todos-container"
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700">
            <CheckCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span id="completed-tasks-heading" className="text-xs font-bold text-neutral-800">
                완료된 일 전용 보관함
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                {completedTodos.length}개
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              {isOpen ? '완료된 항목 보기' : '항목이 접혀 있습니다'}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-transform duration-200 ml-1 ${
              isOpen ? 'rotate-0' : '-rotate-90'
            }`}
          />
        </button>

        {/* 완료 항목 일괄 정리 버튼 */}
        {onClearCompleted && (
          <button
            type="button"
            id="clear-all-completed-btn"
            onClick={onClearCompleted}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="완료된 모든 항목 지우기"
          >
            <Trash2 className="w-3 h-3" />
            <span>비우기</span>
          </button>
        )}
      </div>

      {/* 완료된 항목 리스트 컨테이너 */}
      {isOpen && (
        <div id="completed-todos-container">
          <ul className="space-y-2.5">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggleTodo}
                onDelete={onDeleteTodo}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
