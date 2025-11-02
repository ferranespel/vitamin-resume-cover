"use client";
import { useState } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "lib/redux/hooks";
import { PersonalDetailsForm } from "components/CoverLetterForm/PersonalDetailsForm";
import { EmployerDetailsForm } from "components/CoverLetterForm/EmployerDetailsForm";
import { LetterContentForm } from "components/CoverLetterForm/LetterContentForm";
import { SaveCoverLetterButton } from "components/CoverLetterForm/SaveCoverLetterButton";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { cx } from "lib/cx";

export const CoverLetterForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx(
        "flex justify-center scrollbar-thin scrollbar-track-gray-100 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
        isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100"
      )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <PersonalDetailsForm />
        
        <h2 className="text-2xl font-bold text-gray-900">Employer Details</h2>
        <EmployerDetailsForm />
        
        <h2 className="text-2xl font-bold text-gray-900">Letter Content</h2>
        <LetterContentForm />
        
        <ThemeForm />
        
        <SaveCoverLetterButton />
        
        <br />
      </section>
      <FlexboxSpacer maxWidth={50} className="hidden md:block" />
    </div>
  );
};