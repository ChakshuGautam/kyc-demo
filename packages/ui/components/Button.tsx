interface ButtonProps {
  className?: string;
  onClick: (event: any) => void;
  text: string | JSX.Element;
  id?: string;
  outline?: boolean;
  disabled?: boolean;
  icon?: any;
}

export const Button = (props: ButtonProps) => {
  const { className, onClick, text, id, outline, disabled, icon } = props;
  return (
    <>
      <button
        className={
          outline
            ? `${className} rounded border-2 border-[#E1703B] py-2 px-10 text-[#E1703B]`
            : disabled
            ? `${className} rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b] disabled`
            : `${className} rounded bg-[#E1703B] py-2 px-10 text-white hover:bg-[#c0440b]`
        }
        onClick={onClick}
        id={id}
        disabled={disabled}
      >
        {icon && <span className="inline-block mr-2">{icon}</span>}
        {text}
      </button>
    </>
  );
};
