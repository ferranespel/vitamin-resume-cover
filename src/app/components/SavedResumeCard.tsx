"use client";
import { SavedResume } from "lib/redux/types";
import { formatUpdateDate, deleteResume } from "lib/redux/saved-resumes-storage";
import { useRouter } from "next/navigation";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

// Importar ResumePDF dinámicamente para evitar errores de SSR
const ResumePDF = dynamic(
  () => import("components/Resume/ResumePDF").then((mod) => mod.ResumePDF),
  { ssr: false }
);

interface SavedResumeCardProps {
  savedResume: SavedResume;
  onDelete: () => void;
}

export const SavedResumeCard = ({ savedResume, onDelete }: SavedResumeCardProps) => {
  const router = useRouter();
  const { id, name, updatedAt, resumeData, settings } = savedResume;  // 👈 AÑADIR settings

  const handleEdit = () => {
    // Cargar el resume Y settings en localStorage  👇
    localStorage.setItem("open-resume-state", JSON.stringify({
      resume: resumeData,
      settings: settings  // 👈 CARGAR SETTINGS TAMBIÉN
    }));
    router.push("/resume-builder");
  };

  const handleDownload = async () => {
    try {
      // Generar el PDF usando react-pdf
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(
        <ResumePDF 
          resume={resumeData} 
          settings={settings}  // 👈 PASAR SETTINGS AL PDF
          isPDF={true} 
        />
      ).toBlob();
      
      // Crear link de descarga
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error downloading PDF. Please try again.");
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteResume(id);
      onDelete();
    }
  };

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail - clickeable para editar */}
      <div 
        onClick={handleEdit}
        className="cursor-pointer mb-4 aspect-[8.5/11] overflow-hidden rounded border border-gray-200 bg-gray-50 h-64"
      >
        <div className="scale-[0.2] origin-top-left w-[500%] h-[500%] pointer-events-none">
          <ResumePDF resume={resumeData} settings={settings} isPDF={false} />
        </div>
      </div>
      {/* Título - clickeable para editar */}
      <h3 
        onClick={handleEdit}
        className="cursor-pointer font-semibold text-gray-900 hover:text-sky-600 transition-colors mb-1"
      >
        {name}
      </h3>

      {/* Fecha de actualización */}
      <p className="text-sm text-gray-500 mb-4">
        {formatUpdateDate(updatedAt)}
      </p>

      {/* Botones de acción */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Download PDF
        </button>
        
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};