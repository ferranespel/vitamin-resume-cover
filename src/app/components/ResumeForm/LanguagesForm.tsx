import { Form } from "components/ResumeForm/Form";
import { InputGroupWrapper } from "components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectLanguages, changeLanguages } from "lib/redux/resumeSlice";
import { selectThemeColor } from "lib/redux/settingsSlice";

export const LanguagesForm = () => {
  const languages = useAppSelector(selectLanguages);
  const dispatch = useAppDispatch();
  const { featuredLanguages } = languages;
  const form = "languages";
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleFeaturedLanguagesChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeLanguages({ field: "featuredLanguages", idx, skill, rating }));
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <InputGroupWrapper
          label="Featured Languages (Optional)"
          className="col-span-full"
        >
          <p className="mt-2 text-sm font-normal text-gray-600">
            Rate your language proficiency with more circles meaning higher fluency.
          </p>
        </InputGroupWrapper>

        {featuredLanguages.map(({ skill, rating }, idx) => (
          <FeaturedSkillInput
            key={idx}
            className="col-span-3"
            skill={skill}
            rating={rating}
            setSkillRating={(newSkill, newRating) => {
              handleFeaturedLanguagesChange(idx, newSkill, newRating);
            }}
            placeholder={`Language ${idx + 1}`}
            circleColor={themeColor}
          />
        ))}
      </div>
    </Form>
  );
};