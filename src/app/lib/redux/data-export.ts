import { getSavedResumes } from "./saved-resumes-storage";
import type { SavedResume } from "./types";

export interface ExportData {
  version: string;
  exportDate: string;
  resumes: SavedResume[];
  // coverLetters: SavedCoverLetter[];  // Lo añadiremos en Phase 2
}

/**
 * Exporta todos los resumes a un archivo JSON descargable
 */
export const exportAllData = () => {
  const resumes = getSavedResumes();
  
  const exportData: ExportData = {
    version: "1.0.0",
    exportDate: new Date().toISOString(),
    resumes: resumes,
  };

  // Crear blob con el JSON
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  
  // Crear link de descarga
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  
  // Nombre del archivo con fecha
  const date = new Date().toISOString().split('T')[0]; // 2025-10-31
  link.download = `vitamin-resume-backup-${date}.json`;
  
  // Trigger download
  link.click();
  
  // Cleanup
  URL.revokeObjectURL(url);
  
  return exportData;
};

/**
 * Importa datos desde un archivo JSON
 */
export const importDataFromJSON = (jsonString: string): {
  success: boolean;
  message: string;
  resumesCount?: number;
} => {
  try {
    const data = JSON.parse(jsonString) as ExportData;
    
    // Validar estructura
    if (!data.version || !data.resumes || !Array.isArray(data.resumes)) {
      return {
        success: false,
        message: "Invalid file format. Please select a valid Vitamin Resume backup file.",
      };
    }
    
    // Guardar resumes en localStorage
    localStorage.setItem("saved-resumes", JSON.stringify(data.resumes));
    
    return {
      success: true,
      message: `Successfully imported ${data.resumes.length} resume(s)`,
      resumesCount: data.resumes.length,
    };
  } catch (error) {
    console.error("Error importing data:", error);
    return {
      success: false,
      message: "Error reading file. Please make sure it's a valid JSON file.",
    };
  }
};

/**
 * Lee un archivo y devuelve su contenido como string
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsText(file);
  });
};