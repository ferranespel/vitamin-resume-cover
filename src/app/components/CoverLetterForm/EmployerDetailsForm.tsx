import { BaseForm } from "components/ResumeForm/Form";
import { Input } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeEmployerDetails, selectEmployerDetails } from "lib/redux/coverLetterSlice";
import { CoverLetterEmployerDetails } from "lib/redux/types";

export const EmployerDetailsForm = () => {
  const employerDetails = useAppSelector(selectEmployerDetails);
  const dispatch = useAppDispatch();
  const { companyName, hiringManagerName } = employerDetails;

  const handleChange = (field: keyof CoverLetterEmployerDetails, value: string) => {
    dispatch(changeEmployerDetails({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Company Name"
          labelClassName="col-span-full"
          name="companyName"
          placeholder="Google Inc."
          value={companyName}
          onChange={handleChange}
        />
        
        <Input
          label="Hiring Manager Name"
          labelClassName="col-span-full"
          name="hiringManagerName"
          placeholder="Jane Smith"
          value={hiringManagerName}
          onChange={handleChange}
        />
      </div>
    </BaseForm>
  );
};