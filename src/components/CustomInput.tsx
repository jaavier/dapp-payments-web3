export default function CustomInput (props: any) {
  const {options, label} = props;

  return (
		<div className="my-3">
			<div className="my-2 text-xs uppercase tracking-wide">{label}</div>
			<div className="my-2">
				<input
					className="py-1 px-2 border border-slate-400 shadow-sm rounded-sm outline-none"
					{...options}
				/>
			</div>
		</div>
	);
}