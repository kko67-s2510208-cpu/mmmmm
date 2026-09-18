/**
 * @file App.tsx
 * @description Todo List 메인 애플리케이션 컴포넌트입니다.
 * 
 * [요구사항 준수 내역]
 * 1. 할 일 입력 및 추가 기능
 * 2. 할 일 목록 화면 출력
 * 3. 완료 체크박스 토글
 * 4. 삭제 버튼을 통한 할 일 삭제
 * 5. 완료 항목 취소선 표시
 * 6. "전체 / 진행 중 / 완료" 필터링
 * 7. 깔끔하고 반응형 레이아웃 (모바일 및 데스크톱 대응)
 * 8. Tailwind CSS 기반 스타일링
 * 9. TodoHeader, TodoInput, TodoFilter, TodoList, TodoItem 컴포넌트 분리
 * 10. React의 useState만으로 상태 관리
 * 11. 데이터베이스/로컬스토리지 없이 메모리 배열(state)에만 저장
 * 12. 새로고침 시 데이터 초기화 유지
 */

import { useState } from 'react';
import { Todo, FilterType } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';

/**
 * 초기 할 일 샘플 데이터
 * 사용자가 첫 진입 시 바로 동작 모습을 볼 수 있도록 친절히 제공하며,
 * 새로고침 시 이 기본값으로 재설정됩니다 (영구 저장소 미사용).
 */
const INITIAL_TODOS: Todo[] = [
  {
    id: 'todo-1',
    text: 'React useState 훅으로 상태 관리하기',
    completed: true,
    createdAt: '오전 09:00',
  },
  {
    id: 'todo-2',
    text: 'Tailwind CSS로 반응형 Todo 웹앱 디자인하기',
    completed: false,
    createdAt: '오전 09:30',
  },
  {
    id: 'todo-3',
    text: '새로운 할 일 항목 등록 및 테스트해보기',
    completed: false,
    createdAt: '오전 10:00',
  },
];

export default function App() {
  /**
   * [상태 관리 1] todos: 할 일 목록 배열
   * - React의 useState만 사용하여 브라우저 메모리에 저장합니다.
   * - 데이터베이스나 localStorage를 일체 사용하지 않으므로 새로고침 시 초기화됩니다.
   */
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  /**
   * [상태 관리 2] filter: 현재 선택된 필터 상태 ('all' | 'active' | 'completed')
   */
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * 1. 할 일 추가 핸들러 (Add Todo)
   * - 새 할 일 객체를 생성하여 불변성을 유지하며 기존 배열의 앞/뒤에 추가합니다.
   */
  const handleAddTodo = (text: string) => {
    // 현재 시각 포맷 (예: '오전 10:25')
    const now = new Date();
    const timeString = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now);

    const newTodo: Todo = {
      // 고유 ID 생성 (타임스탬프와 난수 조합으로 안전하게 생성)
      id: `todo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      completed: false,
      createdAt: timeString,
    };

    // React 상태 불변성(Immutability) 규칙: 기존 배열을 직접 수정(push)하지 않고 새 배열 반환
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  /**
   * 2. 완료 여부 토글 핸들러 (Toggle Todo)
   * - 배열 내 해당 id를 가진 항목을 찾아 completed 속성을 반전시킵니다.
   */
  const handleToggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * 3. 할 일 삭제 핸들러 (Delete Todo)
   * - Array.prototype.filter()를 사용하여 해당 id를 제외한 새 배열로 업데이트합니다.
   */
  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  /**
   * 4. 현재 선택된 필터에 따라 화면에 표시할 할 일 목록 계산
   */
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'인 경우 전체 반환
  });

  /**
   * 각 상태별 항목 개수 계산
   */
  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 py-8 px-4 sm:px-6 flex flex-col justify-between items-center font-sans antialiased text-neutral-900">
      {/* 중앙 반응형 카드 컨테이너 */}
      <div className="w-full max-w-lg bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 sm:p-8">
        {/* 1. 상단 타이틀 & 진행 현황 헤더 컴포넌트 */}
        <TodoHeader
          totalCount={counts.all}
          completedCount={counts.completed}
        />

        {/* 2. 할 일 입력 폼 컴포넌트 */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* 3. "전체 / 진행 중 / 완료" 필터 탭 컴포넌트 */}
        <TodoFilter
          currentFilter={filter}
          onSelectFilter={setFilter}
          counts={counts}
        />

        {/* 4. 할 일 목록 리스트 컴포넌트 (체크박스, 취소선, 삭제버튼) */}
        <TodoList
          todos={filteredTodos}
          currentFilter={filter}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>

      {/* 하단 안내 캡션: 새로고침 시 데이터가 유지되지 않는 인메모리 구조 설명 */}
      <footer className="mt-6 text-center text-xs text-neutral-400 max-w-md">
        <p>※ 순수 React useState 메모리 상태로 관리되며, 새로고침 시 데이터가 초기화됩니다.</p>
      </footer>
    </div>
  );
}
