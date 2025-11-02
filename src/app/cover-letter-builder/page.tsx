"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { CoverLetterForm } from "components/CoverLetterForm";
import { CoverLetter } from "components/CoverLetter";

export default function CreateCoverLetter() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <CoverLetterForm />
          </div>
          <div className="col-span-3">
            <CoverLetter />
          </div>
        </div>
      </main>
    </Provider>
  );
}