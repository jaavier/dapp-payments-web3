export default function CustomInput(props: any) {
  const { options, label } = props;

  return (
    <div className="my-1 ">
      <div className="my-2 text-xs uppercase tracking-wide">{label}</div>
      <div className="my-2">
        <input
          className="py-1 px-2 border border-slate-400 shadow-sm rounded-md placeholder:font-light placeholder:text-sm outline-none w-full"
          {...options}
        />
      </div>
    </div>
  );
}
