import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMetamask } from "../../metamask";
import CustomButton from "../../components/CustomButton";
import { BigNumber, utils } from "ethers";

type Payment = {
  description?: string;
  receiver?: string;
  amount?: number;
  amountWithFee?: any;
  status?: boolean;
};

export default function Pay() {
  const { paymentId } = useParams();
  const { user, contract } = useMetamask();
  const [payment, setPayment] = useState<Payment>({});
  const loadPayment = async () => {
    try {
      const response = await contract.toPay();
      setPayment({
        description: response[parseInt(paymentId)][0],
        receiver: response[parseInt(paymentId)][1],
        amount: response[parseInt(paymentId)][2],
        amountWithFee: response[parseInt(paymentId)][3],
        status: response[parseInt(paymentId)][4],
      });
    } catch (e) {
      console.log("Error loading payment", e);
    }
  };
  const payNow = async () => {
    const tx = {
      from: user.address,
      to: payment.receiver,
      value: payment.amountWithFee._hex,
      gas: "46587", //todo cambiar a 21000,
      chainId: `0x${Number(11155111).toString(16)}`,
    };
    await window.ethereum
      .request({ method: "eth_sendTransaction", params: [tx] })
      .then(() => {
        console.log("pago realizado con éxito");
        alert("PAGO REALIZADO!");
      });
  };

  useEffect(() => {
    loadPayment();
  }, []);

  if (!payment.amount) return <p>Cargando...</p>;

  const amount = utils.formatEther(payment.amount.toString());
  const amountWithFee = utils.formatEther(payment.amountWithFee.toString());
  const colorStatus = payment.status ? "green" : "yellow";
  const status = payment.status ? "completed" : "pending";

  return (
    <div className="">
      <div className="text-center text-lg mb-4 font-light tracking-wide flex justify-center flex-col items-center gap-1">
        <div className="uppercase">
          Pay Request <span className="underline">#{paymentId}</span>
        </div>
        <div
          className={`bg-${colorStatus}-500 text-white font-extralight py-1 px-2 rounded-md text-xs w-fit tracking-widest`}
        >
          <div>{status}</div>
        </div>
      </div>
      <div>
        <div className="font-light tracking-wide my-2">
          <div className="text-sm font-semibold">Description</div>
          <div className="px-1 py-2">{payment.description}</div>
        </div>
        <div className="font-light tracking-wide my-2">
          <div className="text-sm font-semibold">Receiver</div>
          <div className="px-1 py-2 text-sm">{payment.receiver}</div>
        </div>
        <div className="font-light tracking-wide items-center my-2">
          <div className="flex gap-5 items-center">
            <span className="text-sm font-semibold ">Amount</span>
          </div>
          <div className="px-1 py-2 flex items-center gap-2">
            <span>{amount} ETH</span>
          </div>
        </div>
        <div className="font-light tracking-wide items-center my-2">
          <div className="text-sm font-semibold">With fee</div>
          <div className="px-1 py-2 flex items-center gap-2">
            <span>{amountWithFee} ETH</span>
          </div>
        </div>
        {!payment.status && (
          <div className="mt-4">
            <CustomButton
              text={`PAY NOW ${amountWithFee} ETH`}
              onClick={payNow}
            />
            <span className="text-xs ml-2">
              Balance: {user.balance.toString().slice(0, 10)} ETH
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
