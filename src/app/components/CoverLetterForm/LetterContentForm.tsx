import { BaseForm } from "components/ResumeForm/Form";
import { Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeContent, selectContent } from "lib/redux/coverLetterSlice";

export const LetterContentForm = () => {
  const content = useAppSelector(selectContent);
  const dispatch = useAppDispatch();
  const { coverText } = content;

  const handleChange = (_field: string, value: string) => {
    dispatch(changeContent({ value }));
  };

  return (
    <BaseForm>
      <div className="space-y-2">
        <div className="text-sm text-gray-600 mb-2">
          <strong>Hint:</strong> Write 3–4 paragraphs explaining why you're the perfect candidate for this specific job
        </div>
        
        <Textarea
          label="Cover Letter Content"
          labelClassName="col-span-full"
          name="coverText"
          placeholder="Dear [Hiring Manager Name],

I am writing to express my strong interest in the [Job Title] position at [Company Name]. With my background in...

In my previous role at..., I successfully...

I am particularly drawn to [Company Name] because...

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with your team's needs.

Sincerely,
[Your Name]"
          value={coverText}
          onChange={handleChange}
          rows={20}
        />
      </div>
    </BaseForm>
  );
};