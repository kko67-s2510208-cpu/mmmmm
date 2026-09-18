import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  // 새 할 일을 추가할 때 부모 컴포넌트(App)로 텍스트를 전달하는 콜백 함수
  onAddTodo: (text: string) => void;
}

/**
 * TodoInput 컴포넌트
 * - 사용자가 새로운 할 일을 입력하고 등록할 수 있는 입력 폼입니다.
 * - React의 제어 컴포넌트(Controlled Component) 패턴을 사용하여 input의 값을 state로 관리합니다.
 */
export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  // 입력창에 타이핑되는 텍스트를 담아두는 로컬 state
  const [inputText, setInputText] = useState<string>('');

  // 폼 제출 이벤트 핸들러 (Enter 키 입력 또는 추가 버튼 클릭 시 실행)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 폼 제출 시 브라우저가 새로고침되는 기본 동작 방지
    e.preventDefault();

    // 입력값 앞뒤 공백 제거
    const trimmed = inputText.trim();

    // 빈 문자열이거나 공백만 있는 경우 추가하지 않음
    if (!trimmed) {
      return;
    }

    // 부모 컴포넌트의 등록 함수 호출
    onAddTodo(trimmed);

    // 입력창 초기화
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            id="todo-input-field"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="새로운 할 일을 입력해 보세요..."
            className="w-full px-4 py-3 text-sm bg-white border border-neutral-300 rounded-xl shadow-xs placeholder-neutral-400 text-neutral-900 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition duration-150"
            maxLength={100}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          id="add-todo-button"
          disabled={!inputText.trim()}
          className="flex items-center justify-center gap-1.5 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 transition-all duration-150 shadow-xs cursor-pointer"
          title="할 일 추가하기"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">추가</span>
        </button>
      </div>
    </form>
  );
};
