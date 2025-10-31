"use client";
import { useState, useRef } from "react";
import { exportAllData, importDataFromJSON, readFileAsText } from "lib/redux/data-export";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface DataManagementProps {
  onImportSuccess: () => void;
}

export const DataManagement = ({ onImportSuccess }: DataManagementProps) => {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const exportData = exportAllData();
      alert(`Successfully exported ${exportData.resumes.length} resume(s)`);
    } catch (error) {
      console.error("Export error:", error);
      alert("Error exporting data. Please try again.");
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    try {
      const jsonString = await readFileAsText(file);
      const result = importDataFromJSON(jsonString);

      if (result.success) {
        alert(result.message);
        onImportSuccess(); // Recargar la lista
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Import error:", error);
      alert("Error importing file. Please try again.");
    } finally {
      setIsImporting(false);
      // Reset input para permitir importar el mismo archivo de nuevo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-8">
      {/* Export Button */}
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        Export All Data
      </button>

      {/* Import Button */}
      <button
        onClick={handleImportClick}
        disabled={isImporting}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        {isImporting ? "Importing..." : "Import Data"}
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};