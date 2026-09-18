/**
 * @file types.ts
 * @description 할 일(Todo) 애플리케이션에서 사용하는 타입 정의 모음입니다.
 * 초보자도 쉽게 파악할 수 있도록 각 필드의 역할을 명확히 설명합니다.
 */

// 단일 할 일 객체 인터페이스
export interface Todo {
  // 각 할 일을 구분하는 고유 식별자 (예: 'todo-1710662400000')
  id: string;
  // 사용자가 입력한 할 일 본문 텍스트
  text: string;
  // 할 일의 완료 여부 (true면 완료, false면 진행 중)
  completed: boolean;
  // 항목이 등록된 시간 문자열 (예: '오전 10:30')
  createdAt: string;
}

// 할 일 목록 필터링 옵션 타입
// 'all': 전체 보기
// 'active': 진행 중인 할 일만 보기
// 'completed': 완료된 할 일만 보기
export type FilterType = 'all' | 'active' | 'completed';
