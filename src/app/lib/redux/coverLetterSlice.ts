import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "lib/redux/store";
import type {
  CoverLetter,
  CoverLetterPersonalDetails,
  CoverLetterEmployerDetails,
  CoverLetterContent,
} from "lib/redux/types";

export const initialPersonalDetails: CoverLetterPersonalDetails = {
  coverName: "",
  name: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
};

export const initialEmployerDetails: CoverLetterEmployerDetails = {
  companyName: "",
  hiringManagerName: "",
};

export const initialContent: CoverLetterContent = {
  coverText: "",
};

export const initialCoverLetterState: CoverLetter = {
  personalDetails: initialPersonalDetails,
  employerDetails: initialEmployerDetails,
  content: initialContent,
};

export const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState: initialCoverLetterState,
  reducers: {
    changePersonalDetails: (
      draft,
      action: PayloadAction<{ field: keyof CoverLetterPersonalDetails; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.personalDetails[field] = value;
    },
    changeEmployerDetails: (
      draft,
      action: PayloadAction<{ field: keyof CoverLetterEmployerDetails; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.employerDetails[field] = value;
    },
    changeContent: (
      draft,
      action: PayloadAction<{ value: string }>
    ) => {
      const { value } = action.payload;
      draft.content.coverText = value;
    },
    setCoverLetter: (draft, action: PayloadAction<CoverLetter>) => {
      return action.payload;
    },
  },
});

export const {
  changePersonalDetails,
  changeEmployerDetails,
  changeContent,
  setCoverLetter,
} = coverLetterSlice.actions;

export const selectCoverLetter = (state: RootState) => state.coverLetter;
export const selectPersonalDetails = (state: RootState) => state.coverLetter.personalDetails;
export const selectEmployerDetails = (state: RootState) => state.coverLetter.employerDetails;
export const selectContent = (state: RootState) => state.coverLetter.content;

export default coverLetterSlice.reducer;