import React from "react";
import FormField from "./formField";

interface FormStepProps {
  step: string;
  schema: Step;
  formData: object;
  onInputChange: (fieldName: string, value: string) => void;
}

interface Step {
  title: string;
  fields: StepField[];
}

interface StepField {
  name: string;
  label: string;
  labelh: string;
  type: string;
  required: boolean;
  options?: any;
  dropdownLabel?: string;
  dropdownLabelh?: string;
  hidden?: boolean;
  answer?: string;
}

const FormStep: React.FC<FormStepProps> = ({
  step,
  schema,
  formData,
  onInputChange,
}) => {
  const fields = schema?.fields;
  // @ts-ignore
  const getFieldValue = (fieldName: string) => {
    // @ts-ignore
    const fieldData = formData?.find((item: any) => item.marker === fieldName);
    return fieldData?.value;
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    onInputChange(fieldName, value);
  };

  return (
    <div>
      {fields?.map((field) => (
        <FormField
          key={field?.name}
          field={{
            ...field,
            hidden:
              field?.name === "educationQualification" &&
              getFieldValue("occupation") !== "Student",
          }}
          formData={formData}
          onInputChange={handleFieldChange}
        />
      ))}
    </div>
  );
};

export default FormStep;
