import type { CoverLetter, SavedCoverLetter } from "./types";

const SAVED_COVER_LETTERS_KEY = "saved-cover-letters";

// Settings por defecto (reutilizamos del resume)
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
 * Genera un ID único para cada cover letter
 */
export const generateCoverLetterId = (): string => {
  return `cl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
 * Obtiene todas las cover letters guardadas del localStorage
 */
export const getSavedCoverLetters = (): SavedCoverLetter[] => {
  try {
    const stored = localStorage.getItem(SAVED_COVER_LETTERS_KEY);
    if (!stored) return [];
    
    const coverLetters = JSON.parse(stored) as SavedCoverLetter[];
    
    // Migrar cover letters antiguas sin settings
    const migratedCoverLetters = coverLetters.map(coverLetter => {
      if (!coverLetter.settings) {
        return {
          ...coverLetter,
          settings: DEFAULT_SETTINGS,
        };
      }
      return coverLetter;
    });
    
    // Guardar versión migrada si hubo cambios
    const hadMigration = migratedCoverLetters.some((c, i) => !coverLetters[i].settings);
    if (hadMigration) {
      localStorage.setItem(SAVED_COVER_LETTERS_KEY, JSON.stringify(migratedCoverLetters));
    }
    
    // Ordenar por ID (más reciente primero - IDs contienen timestamp)
    return migratedCoverLetters.sort((a, b) => 
      b.id.localeCompare(a.id)
    );
  } catch (e) {
    console.error("Error loading saved cover letters:", e);
    return [];
  }
};

/**
 * Guarda una nueva cover letter o actualiza una existente
 */
export const saveCoverLetter = (
  name: string, 
  coverLetterData: CoverLetter, 
  settings: any,
  existingId?: string
): SavedCoverLetter => {
  const coverLetters = getSavedCoverLetters();
  const now = new Date().toISOString();
  
  let savedCoverLetter: SavedCoverLetter;
  
  if (existingId) {
    // Actualizar cover letter existente
    const index = coverLetters.findIndex(c => c.id === existingId);
    if (index !== -1) {
      savedCoverLetter = {
        ...coverLetters[index],
        name,
        updatedAt: now,
        coverLetterData,
        settings,
      };
      coverLetters[index] = savedCoverLetter;
    } else {
      // Si no se encuentra, crear una nueva
      savedCoverLetter = {
        id: generateCoverLetterId(),
        name,
        createdAt: now,
        updatedAt: now,
        coverLetterData,
        settings,
      };
      coverLetters.push(savedCoverLetter);
    }
  } else {
    // Crear nueva cover letter
    savedCoverLetter = {
      id: generateCoverLetterId(),
      name,
      createdAt: now,
      updatedAt: now,
      coverLetterData,
      settings,
    };
    coverLetters.push(savedCoverLetter);
  }
  
  localStorage.setItem(SAVED_COVER_LETTERS_KEY, JSON.stringify(coverLetters));
  return savedCoverLetter;
};

/**
 * Elimina una cover letter por ID
 */
export const deleteCoverLetter = (id: string): void => {
  const coverLetters = getSavedCoverLetters();
  const filtered = coverLetters.filter(c => c.id !== id);
  localStorage.setItem(SAVED_COVER_LETTERS_KEY, JSON.stringify(filtered));
};

/**
 * Obtiene una cover letter específica por ID
 */
export const getCoverLetterById = (id: string): SavedCoverLetter | undefined => {
  const coverLetters = getSavedCoverLetters();
  return coverLetters.find(c => c.id === id);
};