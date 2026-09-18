import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  // 완료 여부 토글 핸들러
  onToggle: (id: string) => void;
  // 삭제 핸들러
  onDelete: (id: string) => void;
}

/**
 * TodoItem 컴포넌트
 * - 단일 할 일 항목을 렌더링합니다.
 * - 체크박스를 누르면 완료 여부가 변경되고, 완료 시 취소선이 그어집니다.
 * - 우측 휴지통 버튼을 누르면 항목이 삭제됩니다.
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      id={`todo-item-${todo.id}`}
      className={`group flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-150 ${
        todo.completed
          ? 'bg-neutral-50/70 border-neutral-200'
          : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
      }`}
    >
      {/* 완료 토글 버튼 및 텍스트 영역 */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* 체크박스 버튼 */}
        <button
          type="button"
          id={`toggle-todo-${todo.id}`}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? '완료 취소' : '할 일 완료로 표시'}
          className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-150 cursor-pointer shrink-0 ${
            todo.completed
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'border-neutral-300 hover:border-indigo-500 bg-white'
          }`}
        >
          {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* 할 일 텍스트 및 시간 정보 */}
        <div className="flex flex-col min-w-0 flex-1">
          <span
            onClick={() => onToggle(todo.id)}
            className={`text-sm cursor-pointer select-none truncate transition-all duration-150 ${
              todo.completed
                ? 'line-through text-neutral-400'
                : 'text-neutral-800 font-normal'
            }`}
          >
            {todo.text}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
            <Clock className="w-3 h-3" />
            {todo.createdAt}
          </span>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <button
        type="button"
        id={`delete-todo-${todo.id}`}
        onClick={() => onDelete(todo.id)}
        aria-label="할 일 삭제"
        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
        title="삭제"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </li>
  );
};
