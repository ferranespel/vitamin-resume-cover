import { BaseForm } from "components/ResumeForm/Form";
import { Input } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changePersonalDetails, selectPersonalDetails } from "lib/redux/coverLetterSlice";
import { CoverLetterPersonalDetails } from "lib/redux/types";

export const PersonalDetailsForm = () => {
  const personalDetails = useAppSelector(selectPersonalDetails);
  const dispatch = useAppDispatch();
  const { coverName, name, jobTitle, address, phone, email } = personalDetails;

  const handleChange = (field: keyof CoverLetterPersonalDetails, value: string) => {
    dispatch(changePersonalDetails({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Cover Letter Name"
          labelClassName="col-span-full"
          name="coverName"
          placeholder="Google - Software Engineer Application"
          value={coverName}
          onChange={handleChange}
        />
        
        <Input
          label="Your Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={handleChange}
        />
        
        <Input
          label="Job Title"
          labelClassName="col-span-full"
          name="jobTitle"
          placeholder="Software Engineer"
          value={jobTitle}
          onChange={handleChange}
        />
        
        <Input
          label="Address"
          labelClassName="col-span-full"
          name="address"
          placeholder="123 Main Street, New York, NY 10001"
          value={address}
          onChange={handleChange}
        />
        
        <Input
          label="Phone"
          labelClassName="col-span-3"
          name="phone"
          placeholder="(123) 456-7890"
          value={phone}
          onChange={handleChange}
        />
        
        <Input
          label="Email"
          labelClassName="col-span-3"
          name="email"
          placeholder="john.doe@email.com"
          value={email}
          onChange={handleChange}
        />
      </div>
    </BaseForm>
  );
};