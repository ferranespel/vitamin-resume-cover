import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Vitamine Resume & Cover - Free Resume and Cover Letter Builder",
  description:
    "Vitamine Resume & Cover is a free, open-source resume and cover letter builder. Create professional resumes with multiple versions, manage different languages, and build matching cover letters. Privacy-focused - all data stays in your browser.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
