export interface Skill {
  name: string;
  icon: string;
  hasBackground?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface SkillTabItem {
  label: string;
  value: string;
  id: string;
}

