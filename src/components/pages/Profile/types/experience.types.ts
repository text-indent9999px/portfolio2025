export interface ProjectItem {
  id: string;
  period: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  companyType?: 'self-service' | 'web-agency' | 'startup' | 'enterprise';
  description: string;
  skills: string[];
  position?: string;
  type: 'work' | 'education' | 'project';
  projects?: ProjectItem[];
}

