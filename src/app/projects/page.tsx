import { redirect } from 'next/navigation';

/** 예전 목록 페이지 주소는 홈의 프로젝트 섹션으로 연결한다. */
export default function ProjectsPage() {
  redirect('/#work');
}
