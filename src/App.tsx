/**
 * @file App.tsx
 * @description Todo List 메인 애플리케이션 컴포넌트입니다.
 * 
 * [주요 기능]
 * 1. 할 일 입력 및 추가 (Enter 키 및 버튼 클릭 지원)
 * 2. 할 일 목록 화면 출력
 * 3. 완료 체크박스 토글 (체크 시 하단 완료 전용 보관함으로 자동 정리)
 * 4. 삭제 버튼을 통한 할 일 삭제
 * 5. 완료 항목 취소선 및 스타일 분리
 * 6. "전체 / 진행 중 / 완료" 필터링 탭
 * 7. [신규 추가] 전체 할 일 목록과 다 한 일을 % 및 원형/가로형 게이지로 가시적으로 보여주는 진행 상황 요약 카드
 * 8. 하단 완료된 일 전용 섹션 (접기/펼치기 및 비우기 지원)
 * 9. React의 useState만으로 순수 상태 관리
 * 10. 반응형 모바일 & 데스크톱 레이아웃
 */

import { useState } from 'react';
import { Todo, FilterType } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoProgressCard } from './components/TodoProgressCard';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { CompletedSection } from './components/CompletedSection';

/**
 * 초기 할 일 샘플 데이터
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
   * [상태 관리 1] todos: 할 일 목록 배열 (useState)
   */
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  /**
   * [상태 관리 2] filter: 현재 선택된 필터 상태 ('all' | 'active' | 'completed')
   */
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * 1. 할 일 추가 핸들러 (Add Todo)
   */
  const handleAddTodo = (text: string) => {
    const now = new Date();
    const timeString = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now);

    const newTodo: Todo = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      completed: false,
      createdAt: timeString,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  /**
   * 2. 완료 여부 토글 핸들러 (Toggle Todo)
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
   */
  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  /**
   * 4. 완료된 모든 할 일 일괄 비우기
   */
  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  /**
   * 필터별 할 일 목록 계산
   */
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'인 경우
  });

  // 완료된 할 일 목록
  const completedTodos = todos.filter((todo) => todo.completed);

  /**
   * 각 상태별 항목 개수 계산
   */
  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: completedTodos.length,
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 py-8 px-4 sm:px-6 flex flex-col justify-between items-center font-sans antialiased text-neutral-900">
      {/* 중앙 반응형 카드 컨테이너 */}
      <div className="w-full max-w-lg bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 sm:p-8">
        {/* 1. 상단 타이틀 & 날짜 헤더 */}
        <TodoHeader
          totalCount={counts.all}
          completedCount={counts.completed}
        />

        {/* 2. [신규 기능] %와 게이지로 진행 과정을 가시적으로 보여주는 진행 상황 요약 카드 */}
        <TodoProgressCard
          totalCount={counts.all}
          completedCount={counts.completed}
        />

        {/* 3. 할 일 입력 폼 */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* 4. "전체 / 진행 중 / 완료" 필터 탭 */}
        <TodoFilter
          currentFilter={filter}
          onSelectFilter={setFilter}
          counts={counts}
        />

        {/* 5. 주 할 일 목록 리스트 (체크박스, 취소선, 삭제버튼) */}
        <TodoList
          todos={filteredTodos}
          currentFilter={filter}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        {/* 6. 하단 완료된 일 전용 섹션 ('전체' 탭일 때 완료된 항목을 하단에 모아 정리) */}
        {filter === 'all' && (
          <CompletedSection
            completedTodos={completedTodos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {/* 하단 안내 캡션: 새로고침 시 데이터가 유지되지 않는 인메모리 구조 설명 */}
      <footer className="mt-6 text-center text-xs text-neutral-400 max-w-md">
        <p>※ 순수 React useState 메모리 상태로 관리되며, 새로고침 시 데이터가 초기화됩니다.</p>
      </footer>
    </div>
  );
}
