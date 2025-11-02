"use client";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "lib/redux/hooks";
import { selectCoverLetter } from "lib/redux/coverLetterSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { CoverLetterPDF } from "components/CoverLetter/CoverLetterPDF";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import { PDFViewer } from "@react-pdf/renderer";

export const CoverLetter = () => {
  const coverLetter = useAppSelector(selectCoverLetter);
  const settings = useAppSelector(selectSettings);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-400">Loading preview...</p>
      </div>
    );
  }

  if (DEBUG_RESUME_PDF_FLAG) {
    return (
      <div className="h-screen">
        <PDFViewer width="100%" height="100%">
          <CoverLetterPDF coverLetter={coverLetter} settings={settings} isPDF={true} />
        </PDFViewer>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-50">
      <div className="flex justify-center overflow-auto px-4 py-8 md:h-[calc(100vh-var(--top-nav-bar-height))] md:px-8">
        <div className="bg-white shadow-lg" style={{ width: "8.5in", minHeight: "11in" }}>
          <CoverLetterPDF coverLetter={coverLetter} settings={settings} isPDF={false} />
        </div>
      </div>
    </div>
  );
};