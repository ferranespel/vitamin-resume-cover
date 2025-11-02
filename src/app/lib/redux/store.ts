import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "lib/redux/resumeSlice";
import settingsReducer from "lib/redux/settingsSlice";
import coverLetterReducer from "lib/redux/coverLetterSlice"; // 👈 NUEVO

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    settings: settingsReducer,
    coverLetter: coverLetterReducer, // 👈 NUEVO
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
