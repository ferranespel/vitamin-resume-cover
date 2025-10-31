"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { getSavedResumes } from "lib/redux/saved-resumes-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { SavedResumeCard } from "components/SavedResumeCard";
import { DataManagement } from "components/DataManagement";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { SavedResume } from "lib/redux/types";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  
  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  const loadSavedResumes = () => {
    setSavedResumes(getSavedResumes());
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
    loadSavedResumes();
  }, []);

  return (
    <main className="mx-auto max-w-screen-2xl px-8 py-12">
      {/* Sección de import existente */}
      <div className="mx-auto max-w-3xl rounded-md border border-gray-200 px-10 py-10 text-center shadow-md bg-white">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-lg font-semibold text-gray-900">
              Import data from an existing resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in browser from prior session"
                  buttonText="Continue where I left off"
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-gray-900">
              Override data with a new resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
          </>
        )}
      </div>

      {/* Botón Create New centrado */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/resume-builder"
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-sky-600 transition-colors"
        >
          <span className="text-xl">+</span>
          Create New
        </Link>
      </div>
      {/* 👇 NUEVO: Botones de Export/Import */}
      <div className="mt-8">
        <DataManagement onImportSuccess={loadSavedResumes} />
      </div>
      {/* Grid de resumes guardados */}
      {savedResumes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
            Saved Resumes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {savedResumes.map((savedResume) => (
              <SavedResumeCard
                key={savedResume.id}
                savedResume={savedResume}
                onDelete={loadSavedResumes}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mensaje si no hay resumes guardados */}
      {savedResumes.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-lg">
            No saved resumes yet. Create your first one! 👆
          </p>
        </div>
      )}
    </main>
  );
}

const OrDivider = () => (
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
      <p className="font-semibold text-gray-900">{heading}</p>
      <div className="mt-5">
        <Link
          href="/resume-builder"
          className="outline-theme-blue rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-base font-semibold text-white"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};