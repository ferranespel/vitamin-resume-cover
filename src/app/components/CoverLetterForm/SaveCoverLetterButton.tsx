"use client";
import { useAppSelector, useAppDispatch } from "lib/redux/hooks";
import { selectCoverLetter, setCoverLetter, initialCoverLetterState } from "lib/redux/coverLetterSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { saveCoverLetter } from "lib/redux/saved-cover-letters-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SaveCoverLetterButton = () => {
  const coverLetter = useAppSelector(selectCoverLetter);
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    // Validar que tenga nombre
    if (!coverLetter.personalDetails.coverName.trim()) {
      alert("Please add a Cover Letter Name before saving");
      return;
    }

    setIsSaving(true);

    try {
      // Guardar en saved-cover-letters
      const savedCoverLetter = saveCoverLetter(
        coverLetter.personalDetails.coverName,
        coverLetter,
        settings,
        coverLetter.id  // 👈 NUEVO: Pasa el ID si existe
      );
      
      // Limpiar el localStorage temporal
      localStorage.removeItem("open-resume-state");
      
      // Resetear el formulario a estado inicial
      dispatch(setCoverLetter(initialCoverLetterState));
      
      // Redirigir a la página de cover letters guardadas
      router.push("/resume-import?tab=coverletters");
      
      console.log("Cover letter saved successfully:", savedCoverLetter);
    } catch (error) {
      console.error("Error saving cover letter:", error);
      alert("Error saving cover letter. Please try again.");
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
        {isSaving ? "Saving..." : "💾 Save Cover Letter"}
      </button>
    </div>
  );
};