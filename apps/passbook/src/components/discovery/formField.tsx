import React from "react";
import Dropdown from "components/dropdown";
import { useStateContext } from "context";

interface FormFieldProps {
  field: StepField;
  formData: object;
  onInputChange: (fieldName: string, value: string) => void;
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
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  formData,
  onInputChange,
}) => {
  const {
    type,
    label,
    name,
    options,
    required,
    dropdownLabel,
    dropdownLabelh,
    hidden,
    labelh,
  } = field;

  const { locale } = useStateContext();
  const handleInputChange = (e: any) => {
    // Check if the input contains numeric characters
    const containsNumbers = /\d/.test(e?.target?.value);

    // If the input contains numbers and the type is "text," do not update the state
    if (type === "text" && containsNumbers) {
      return;
    }
    if (type === "dropdown" || type === "mcq") {
      onInputChange(
        e?.target?.getAttribute("name"),
        e?.target?.getAttribute("value")
      );
      return;
    }
    onInputChange(e?.target?.name, e?.target?.value);
  };

  if (type === "mcq" && options) {
    return (
      <>
        {hidden ? null : (
          <div className="mb-5 py-0 relative">
            <label
              htmlFor={name}
              className={
                locale == "hi"
                  ? "font-black	text-appGray text-center text-[15px]"
                  : "font-demi text-appGray text-center text-[15px]"
              }
            >
              {locale == "hi" ? labelh : label}
              {required && <span className="text-primary">*</span>}
            </label>
            {options?.map((option) => (
              <div
                key={option?.value}
                className={` ${
                  field?.answer === option?.value
                    ? "bg-primary text-white font-medium"
                    : "text-appGray font-regular"
                } shadow rounded text-[14px] py-2 px-3 mb-2`}
                onClick={handleInputChange}
                // @ts-ignore
                value={option?.value}
                name={name}
              >
                {locale == "hi" ? option?.labelh : option?.label}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  if (type === "dropdown" && options) {
    return (
      <>
        {hidden ? null : (
          <div className="mb-5 py-0 relative">
            <label
              htmlFor={name}
              className={
                locale == "hi"
                  ? "font-black	text-appGray text-center text-[15px]"
                  : "font-demi text-appGray text-center text-[15px]"
              }
            >
              {locale == "hi" ? labelh : label}
              {required && <span className="text-primary">*</span>}
            </label>
            &emsp;
            <Dropdown
              heading={locale == "hi" ? dropdownLabelh : dropdownLabel}
              options={options}
              handleChange={handleInputChange}
              value={field?.answer}
              type={"discovery"}
              className={`${
                field?.disabled && "bg-[#efefef]"
              } block w-full shadow-lg`}
              name={name}
              disabled={field?.disabled}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {hidden ? null : (
        <div className="mb-5">
          <label
            htmlFor={name}
            className={
              locale == "hi"
                ? "font-black	text-appGray text-center text-[15px]"
                : "font-demi text-appGray text-center text-[15px]"
            }
          >
            {locale == "hi" ? labelh : label}
            {required && <span className="text-primary">*</span>}
          </label>
          <div className="input-container">
            <input
              type={type}
              name={name}
              className={`
      ${
        field?.disabled && "bg-[#efefef]"
      } shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-1 `}
              onChange={handleInputChange}
              value={field?.answer}
              disabled={field?.disabled}
            />
            {field?.disabled && (
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/images/verified.png`}
                className="input-image"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FormField;
