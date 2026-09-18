import React from 'react';
import { CheckCircle, Inbox, Sparkles } from 'lucide-react';
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
 * - 필터링된 할 일 배열(todos)을 받아 화면에 리스트로 출력합니다.
 * - 항목이 없을 경우 사용자가 상황을 바로 파악할 수 있도록 친절한 안내 메시지(Empty State)를 보여줍니다.
 */
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  currentFilter,
  onToggleTodo,
  onDeleteTodo,
}) => {
  // 할 일 목록이 비어있을 때 표시할 메시지와 아이콘 결정
  if (todos.length === 0) {
    let emptyMessage = '등록된 할 일이 없습니다.';
    let emptySubMessage = '위 입력창에서 새로운 할 일을 등록해 보세요!';
    let EmptyIcon = Inbox;

    if (currentFilter === 'active') {
      emptyMessage = '진행 중인 할 일이 없습니다.';
      emptySubMessage = '모든 할 일을 마쳤거나 새로 등록할 작업이 있는지 확인해 보세요.';
      EmptyIcon = CheckCircle;
    } else if (currentFilter === 'completed') {
      emptyMessage = '완료된 할 일이 없습니다.';
      emptySubMessage = '할 일을 완료하면 여기에 모아서 확인할 수 있습니다.';
      EmptyIcon = Sparkles;
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-neutral-50/50 rounded-2xl border border-dashed border-neutral-200">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
          <EmptyIcon className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-neutral-700">{emptyMessage}</p>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs">{emptySubMessage}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {todos.map((todo) => (
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
