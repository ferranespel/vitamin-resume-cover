"use client";
import { useAppSelector, useAppDispatch } from "lib/redux/hooks";
import { selectResume, setResume, initialResumeState } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";  // 👈 NUEVO IMPORT
import { saveResume } from "lib/redux/saved-resumes-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SaveResumeButton = () => {
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);  // 👈 OBTENER SETTINGS
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    // Validar que tenga nombre
    if (!resume.profile.resumeName.trim()) {
      alert("Please add a Resume Name before saving");
      return;
    }

    setIsSaving(true);

    try {
      // Guardar en saved-resumes con settings (actualiza si existe ID, sino crea nuevo)
      const savedResume = saveResume(
        resume.profile.resumeName, 
        resume, 
        settings,
        resume.id  // 👈 NUEVO: Pasa el ID si existe
      );
      
      // Limpiar el localStorage temporal
      localStorage.removeItem("open-resume-state");
      
      // Resetear el formulario a estado inicial
      dispatch(setResume(initialResumeState));
      
      // Redirigir a la página de resumes guardados
      router.push("/resume-import");
      
      console.log("Resume saved successfully:", savedResume);
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="rounded-full bg-sky-500 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSaving ? "Saving..." : "💾 Save Resume"}
      </button>
    </div>
  );
};