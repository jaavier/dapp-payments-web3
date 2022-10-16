import { utils } from "ethers";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { dapp, useMetamask } from "../../metamask";
import fields from "./form/fields";

export default function Create() {
  const { user, contract } = useMetamask();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({
    description: "",
    amount: "0.0",
    payer: "",
  });
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const createRequest = async () => {
    try {
      const tx = {
        from: user.address,
        to: dapp.address,
        gas: "99999", //todo cambiar a 21000,
        chainId: `0x${Number(11155111).toString(16)}`,
        data: dapp.iface.encodeFunctionData("createRequest", [
          form.description,
          form.payer,
          utils.parseEther(form.amount),
        ]),
      };
      await window.ethereum
        .request({ method: "eth_sendTransaction", params: [tx] })
        .then(() => {
          alert("Request sent!");
        });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.tsx ~ line 22 ~ createRequest ~ error)",
        error
      );
    }
  };

  const onClick = function (event: any) {
    event.preventDefault();
    createRequest();
    navigate("/sent");
  };

  const keys = Object.keys(fields);

  return (
    <div className="h-96">
      <div className="text-center text-lg mb-4 font-light uppercase tracking-widest">
        Create Request {form.amount}
      </div>
      <div>
        <div className="grid grid-cols-2 items-center justify-center gap-3">
          {keys.slice(0, 2).map((name: string, index: number) => (
            <CustomInput
              key={index}
              label={fields[name].label}
              options={{ onChange, ...fields[name].options, name }}
            />
          ))}
        </div>
        <div>
          {keys.slice(2).map((name: string, index: number) => (
            <CustomInput
              key={index}
              label={fields[name].label}
              options={{ onChange, ...fields[name].options, name }}
            />
          ))}
        </div>
        <div className="mt-3">
          <CustomButton text="Send Request" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
