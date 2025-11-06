
export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  description: string;
}
