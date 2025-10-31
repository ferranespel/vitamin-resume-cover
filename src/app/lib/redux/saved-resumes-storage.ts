import type { Resume, SavedResume } from "./types";

const SAVED_RESUMES_KEY = "saved-resumes";

// Importar settings por defecto
const DEFAULT_SETTINGS = {
  themeColor: "#38bdf8",
  fontFamily: "Roboto",
  fontSize: "11",
  documentSize: "Letter",
  formToShow: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    languages: true,
    custom: false,
  },
  formToHeading: {
    workExperiences: "WORK EXPERIENCE",
    educations: "EDUCATION",
    projects: "PROJECT",
    skills: "SKILLS",
    languages: "LANGUAGES",
    custom: "CUSTOM SECTION",
  },
  formsOrder: ["workExperiences", "educations", "projects", "skills", "languages", "custom"],
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    languages: false,
    custom: true,
  },
};

/**
 * Genera un ID único para cada resume
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Formatea una fecha al estilo "Updated 4 October, 09:58"
 */
export const formatUpdateDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `Updated ${day} ${month}, ${hours}:${minutes}`;
};

/**
 * Obtiene todos los resumes guardados del localStorage
 * 👇 AÑADIDO: Migración automática para resumes sin settings
 */
export const getSavedResumes = (): SavedResume[] => {
  try {
    const stored = localStorage.getItem(SAVED_RESUMES_KEY);
    if (!stored) return [];
    
    const resumes = JSON.parse(stored) as SavedResume[];
    
    // Migrar resumes antiguos sin settings
    const migratedResumes = resumes.map(resume => {
      if (!resume.settings) {
        return {
          ...resume,
          settings: DEFAULT_SETTINGS,  // 👈 Añadir settings por defecto
        };
      }
      return resume;
    });
    
    // Guardar versión migrada si hubo cambios
    const hadMigration = migratedResumes.some((r, i) => !resumes[i].settings);
    if (hadMigration) {
      localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(migratedResumes));
    }
    
    // Ordenar por fecha de actualización (más reciente primero)
    return migratedResumes.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (e) {
    console.error("Error loading saved resumes:", e);
    return [];
  }
};

/**
 * Guarda un nuevo resume o actualiza uno existente
 */
export const saveResume = (
  name: string, 
  resumeData: Resume, 
  settings: any,
  existingId?: string
): SavedResume => {
  const resumes = getSavedResumes();
  const now = new Date().toISOString();
  
  let savedResume: SavedResume;
  
  if (existingId) {
    // Actualizar resume existente
    const index = resumes.findIndex(r => r.id === existingId);
    if (index !== -1) {
      savedResume = {
        ...resumes[index],
        name,
        updatedAt: now,
        resumeData,
        settings,
      };
      resumes[index] = savedResume;
    } else {
      // Si no se encuentra, crear uno nuevo
      savedResume = {
        id: generateId(),
        name,
        createdAt: now,
        updatedAt: now,
        resumeData,
        settings,
      };
      resumes.push(savedResume);
    }
  } else {
    // Crear nuevo resume
    savedResume = {
      id: generateId(),
      name,
      createdAt: now,
      updatedAt: now,
      resumeData,
      settings,
    };
    resumes.push(savedResume);
  }
  
  localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(resumes));
  return savedResume;
};

/**
 * Elimina un resume por ID
 */
export const deleteResume = (id: string): void => {
  const resumes = getSavedResumes();
  const filtered = resumes.filter(r => r.id !== id);
  localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(filtered));
};

/**
 * Obtiene un resume específico por ID
 */
export const getResumeById = (id: string): SavedResume | undefined => {
  const resumes = getSavedResumes();
  return resumes.find(r => r.id === id);
};