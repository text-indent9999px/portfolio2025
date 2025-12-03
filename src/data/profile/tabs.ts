export interface TabItem {
  label: string;
  value: string;
  id: string;
  title: string;
  description?: string;
  bottomSpacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  needsBlank?: boolean;
  needsSkillTab?: boolean; // skill 탭인 경우에만 true
}

export const profileTabItems: TabItem[] = [
  {
    label: '자기소개',
    value: 'introduction',
    id: 'introduction',
    title: 'Introduction',
    bottomSpacing: 'xs',
  },
  {
    label: '기술스택',
    value: 'skill',
    id: 'skill',
    title: 'Skill',
    description: '주요 기술 스택 및 사용 이유입니다.',
    bottomSpacing: 'sm',
    needsBlank: true,
    needsSkillTab: true,
  },
  {
    label: '이력',
    value: 'experience',
    id: 'experience',
    title: 'Experience',
    description: '경력 및 프로젝트 경험을 타임라인으로 정리했습니다.',
    bottomSpacing: 'md',
    needsBlank: true,
  },
];
