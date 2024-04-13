import { useState } from "react";
import { CheveronIcon, CloseIcon, CrossIcon } from "assets/icons";
import { useStateContext } from "context";

interface DropdownProps {
  options: any;
  heading: string;
  handleChange: (selectedValue: string) => void;
  setter?: (state: []) => void;
  value: any;
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  showCross?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  heading,
  handleChange,
  setter,
  value,
  className = "",
  type = "",
  name = "",
  id = "",
  disabled,
  showCross,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useStateContext();

  const isActive = (key: string) => {
    return value?.includes(key) ? "bg-primary text-white" : "";
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const selectOption = (selectedValue: string) => {
    handleChange(selectedValue);
    setIsOpen(false);
  };

  const header = () => {
    if (
      type !== "discovery" &&
      value !== "" &&
      value !== undefined &&
      value.length > 0
    ) {
      const selectedOption = options.find(
        (option) => option.value === value[0]
      );
      return selectedOption?.label;
    } else if (value !== "" && value !== undefined) {
      const selectedOption = options.find((option) => option.value === value);
      return selectedOption
        ? locale === "hi"
          ? selectedOption.labelh
          : selectedOption.label
        : heading;
    } else {
      return heading;
    }
  };

  const setEmpty = () => {
    if (setter) setter([]);
    else {
      toggleDropdown();
    }
  };

  return (
    <div
      className={
        type === "discovery"
          ? "dropdown dropdown-bottom block w-full shadow-lg min-h-[40px]"
          : `dropdown dropdown-bottom ${className} block`
      }
    >
      <label
        tabIndex={0}
        className={
          type === "discovery"
            ? `font-regular ${
                disabled ? "bg-[#efefef]" : "bg-white"
              } rounded px-3 text-appGray pt-2 pb-[0.65rem] block`
            : "text-[11px] font-regular bg-white rounded px-3 py-2 text-appGray w-full flex items-baseline justify-between"
        }
        onClick={value.length > 0 ? setEmpty : toggleDropdown}
        id={id}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "80%",
          }}
        >
          {header()}
        </div>
        <div
          className={
            type === "discovery"
              ? "flex justify-end mr-2 mt-[-10px]"
              : "ml-1 mt-[-13px] inline-block"
          }
        >
          {disabled ? (
            <div className="mt-[-0.70rem]">
              <img src={`${process.env.NEXT_PUBLIC_URL}/images/verified.png`} />
            </div>
          ) : value.length > 0 && showCross ? (
            <CrossIcon height="10px" width="10px" viewbox="15 15 20 20" />
          ) : (
            <CheveronIcon />
          )}
        </div>
      </label>
      {isOpen && (
        <ul
          tabIndex={0}
          className={
            type === "discovery"
              ? "dropdown-content menu shadow bg-base-100 rounded w-full font-regular text-[12px] cursor-pointer"
              : "dropdown-content menu py-2 shadow bg-base-100 rounded w-auto uppercase font-demi text-[12px] mt-2 cursor-pointer"
          }
          // @ts-ignore
          onClick={
            type == "discovery" ? (e: any) => handleChange(e) : handleChange
          }
        >
          <div
            className={
              type === "discovery"
                ? "max-h-[150px] overflow-y-scroll"
                : "max-h-[200px] overflow-y-scroll"
            }
          >
            {options &&
              options?.map((option: any) => (
                <li
                  className={` ${isActive(
                    option?.value
                  )} text-[#313144] border-b ${
                    value?.includes(option?.value) ? "selected" : ""
                  }`}
                  key={option?.value}
                  onClick={() => selectOption(option?.value)}
                >
                  <a
                    // @ts-ignore
                    value={option?.value}
                    name={name}
                    label={
                      locale == "hi" && type == "discovery"
                        ? option?.labelh
                        : option?.label
                    }
                  >
                    {locale == "hi" && type == "discovery"
                      ? option?.labelh
                      : option?.label}
                  </a>
                </li>
              ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
