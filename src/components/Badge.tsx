type Props = {
  status: boolean;
};

export default function Badge({ status }: Props) {
  const color = status ? "green" : "yellow";
  const text = status ? "completed" : "pending";

  return (
    <span
      className={`bg-${color}-500 text-white font-extralight py-1 px-2 rounded-md text-xs w-fit tracking-widest`}
    >
      {text}
    </span>
  );
}
