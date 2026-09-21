import { redirect } from 'next/navigation';

/** 예전 프로필 페이지 주소는 홈의 경력 섹션으로 연결한다. */
export default function ProfilePage() {
  redirect('/#experience');
}
