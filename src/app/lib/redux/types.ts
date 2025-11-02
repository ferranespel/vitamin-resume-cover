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
  id?: string;  // 👈 NUEVO: ID opcional para trackear resumes guardados
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

// Cover Letter Types
export interface CoverLetterPersonalDetails {
  coverName: string;        // Nombre de la carta (ej: "Google - Software Engineer")
  name: string;             // Tu nombre completo
  jobTitle: string;         // El puesto al que aplicas
  address: string;          // Tu dirección
  phone: string;            // Teléfono
  email: string;            // Email
}

export interface CoverLetterEmployerDetails {
  companyName: string;      // Nombre de la empresa
  hiringManagerName: string; // Nombre del reclutador/manager
}

export interface CoverLetterContent {
  coverText: string;        // Contenido principal (soporta markdown)
}

export interface CoverLetter {
  id?: string;  // 👈 NUEVO: ID opcional para trackear cover letters guardadas
  personalDetails: CoverLetterPersonalDetails;
  employerDetails: CoverLetterEmployerDetails;
  content: CoverLetterContent;
}

export interface SavedCoverLetter {
  id: string;
  name: string;             // Usaremos coverName
  createdAt: string;
  updatedAt: string;
  coverLetterData: CoverLetter;
  settings: any;            // Reutilizamos settings (colores, fonts, etc)
}

export type ResumeKey = keyof Resume;
