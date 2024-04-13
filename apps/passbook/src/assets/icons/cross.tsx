interface CrossIconProps {
  width?: string;
  height?: string;
  viewbox?: string;
}

export const CrossIcon: React.FC<CrossIconProps> = ({
  width,
  height,
  viewbox,
}) => {
  return (
    <svg
      width={width ? width : "52"}
      height={height ? height : "52"}
      viewBox={viewbox ? viewbox : "0 0 52 52"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8773 32.8207L23.8819 26.1166L17.1778 20.112L19.1793 17.8773L25.8834 23.8819L31.888 17.1778L34.1227 19.1793L28.1181 25.8834L34.8222 31.888L32.8207 34.1227L26.1166 28.1181L20.112 34.8223L17.8773 32.8207Z"
        fill="#626161"
      />
    </svg>
  );
};
