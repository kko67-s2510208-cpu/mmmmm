import React from 'react';
import { CheckCircle, Inbox, Sparkles, Trophy } from 'lucide-react';
import { FilterType, Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  currentFilter: FilterType;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

/**
 * TodoList 컴포넌트
 * - 필터링된 할 일 배열을 받아 화면에 리스트로 출력합니다.
 * - '전체' 탭에서는 아직 완료되지 않은 진행 중인 할 일 목록을 상단에 깔끔하게 보여주며,
 *   완료된 일은 하단 전용 보관함 섹션에서 별도로 관리됩니다.
 */
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  currentFilter,
  onToggleTodo,
  onDeleteTodo,
}) => {
  // '전체(all)' 필터일 때는 상단 리스트에 진행 중인 할 일만 표시
  const displayTodos =
    currentFilter === 'all' ? todos.filter((t) => !t.completed) : todos;

  // 비어있을 때 표시할 메시지와 아이콘 결정
  if (displayTodos.length === 0) {
    if (currentFilter === 'all') {
      // 전체 항목은 존재하지만 모두 완료된 상태인 경우
      if (todos.length > 0) {
        return (
          <div className="py-6 px-4 text-center bg-emerald-50/80 rounded-2xl border border-emerald-100">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
              <Trophy className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-emerald-900">
              진행 중인 모든 할 일을 완료했습니다! 👏
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              완료된 항목은 아래 전용 보관함에서 확인하실 수 있습니다.
            </p>
          </div>
        );
      }
    }

    let emptyMessage = '등록된 할 일이 없습니다.';
    let emptySubMessage = '위 입력창에서 새로운 할 일을 등록해 보세요!';
    let EmptyIcon = Inbox;

    if (currentFilter === 'active') {
      emptyMessage = '진행 중인 할 일이 없습니다.';
      emptySubMessage = '모든 할 일을 마쳤거나 새로운 할 일을 추가해 보세요.';
      EmptyIcon = CheckCircle;
    } else if (currentFilter === 'completed') {
      emptyMessage = '완료된 할 일이 아직 없습니다.';
      emptySubMessage = '할 일을 완료하면 여기에 모아서 확인할 수 있습니다.';
      EmptyIcon = Sparkles;
    }

    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-neutral-50/50 rounded-2xl border border-dashed border-neutral-200">
        <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-2.5">
          <EmptyIcon className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-neutral-700">{emptyMessage}</p>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs">{emptySubMessage}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {displayTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
};
