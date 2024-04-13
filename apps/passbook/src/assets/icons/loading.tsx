interface LoadingProps {
  color?: string;
}

const Loading = (props: LoadingProps) => {
  return (
    <div
      className={`inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-[${
        props.color ? props.color : "parimary"
      }] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    ></div>
  );
};

export default Loading;
