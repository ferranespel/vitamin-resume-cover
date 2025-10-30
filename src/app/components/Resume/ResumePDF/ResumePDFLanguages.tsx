import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumeFeaturedSkill,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeLanguages } from "lib/redux/types";

export const ResumePDFLanguages = ({
  heading,
  languages,
  themeColor,
}: {
  heading: string;
  languages: ResumeLanguages;
  themeColor: string;
}) => {
  if (!languages || !languages.featuredLanguages) {
    return null;
  }
  
  const { featuredLanguages } = languages;
  
  const featuredLanguagesWithText = featuredLanguages.filter((item) => item.skill);
  const featuredLanguagesPair = [
    [featuredLanguagesWithText[0], featuredLanguagesWithText[3]],
    [featuredLanguagesWithText[1], featuredLanguagesWithText[4]],
    [featuredLanguagesWithText[2], featuredLanguagesWithText[5]],
  ];

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {featuredLanguagesWithText.length > 0 && (
        <View style={{ ...styles.flexRow, justifyContent: "space-between", marginTop: spacing["0.5"], gap: spacing["4"] }}>
          {featuredLanguagesPair.map((pair, idx) => (
            <View
              key={idx}
              style={{
                ...styles.flexCol,
                flex: 1,
                gap: spacing["2"],
              }}
            >
              {pair.map((featuredLanguage, idx) => {
                if (!featuredLanguage) return null;
                return (
                  <ResumeFeaturedSkill
                    key={idx}
                    skill={featuredLanguage.skill}
                    rating={featuredLanguage.rating}
                    themeColor={themeColor}
                    style={{
                      justifyContent: "flex-start",
                    }}
                  />
                );
              })}
            </View>
          ))}
        </View>
      )}
    </ResumePDFSection>
  );
};