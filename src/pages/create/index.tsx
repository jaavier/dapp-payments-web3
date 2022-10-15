import { ethers } from "ethers";
import { ChangeEvent, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useMetamask } from "../../metamask";
import fields from "./form/fields";

export default function Create() {
  const { user } = useMetamask();
  const [form, setForm] = useState<any>()
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
		setForm({ ...form, [event.target.name]: event.target.value });
  const onSubmit = function (event: any) {
		event.preventDefault();
		console.log("FORM SENT:", form);
	};

  return (
		<div>
			<div className="text-center text-lg mb-4 font-light uppercase tracking-wide">
				Create Request {user.balance}
			</div>
			<div>
				<form onSubmit={onSubmit}>
					<div className="flex items-center justify-center gap-5">
						{fields.map((field: any, index: number) => (
							<CustomInput
								key={index}
								label={field.label}
								options={{ onChange, ...field.options }}
							/>
						))}
					<div className="mt-5">
						<CustomButton text="Send Request" />
					</div>
					</div>
				</form>
			</div>
		</div>
	);
}
