export const CheveronIcon = ({ color = "", width = "" }) => {
  return (
    <svg
      width={width ? width : "12"}
      height="8"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <path
        d="M1.23364 1L4.11683 3.88319L7.00002 1"
        stroke={color ? color : "#4F4F4F"}
        strokeWidth="0.720797"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
