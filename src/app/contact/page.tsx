import { redirect } from 'next/navigation';

/** 예전 연락처 페이지 주소는 홈의 연락처 섹션으로 연결한다. */
export default function ContactPage() {
  redirect('/#contact');
}
