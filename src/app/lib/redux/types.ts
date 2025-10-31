export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
  resumeName: string;  // 👈 NUEVO CAMPO
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeLanguages {
  featuredLanguages: FeaturedSkill[]; // Reutilizamos FeaturedSkill (tiene skill y rating)
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  languages: ResumeLanguages;
  custom: ResumeCustom;
}

// Multi-Resume Management Types
export interface SavedResume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  resumeData: Resume;
  settings: any;  // 👈 Usamos 'any' por ahora para evitar imports circulares
}

export type ResumeKey = keyof Resume;
