import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMetamask } from "../../metamask";
import { utils } from "ethers";
import dapp from "../../metamask/dapp";
import Badge from "../../components/Badge";

const iface: utils.Interface = new utils.Interface(dapp.abi);

export default function Sent() {
  const { paymentId } = useParams();
  const { contract } = useMetamask();
  const [payment, setPayment] = useState<Payment>({});
  const navigate = useNavigate();
  const loadPayment = async () => {
    try {
      const response = await contract.toGetPaid();
      if (response.length)
        setPayment({
          description: response[parseInt(paymentId)].description,
          receiver: response[parseInt(paymentId)].receiver,
          amount: response[parseInt(paymentId)].amount,
          amountWithFee: response[parseInt(paymentId)].amountWithFee,
          status: response[parseInt(paymentId)].status,
          payer: response[parseInt(paymentId)].payer,
        });
    } catch (e) {
      console.log("Error loading payment", e);
    }
  };

  useEffect(() => {
    loadPayment();
    const timer = window.setInterval(() => {
      loadPayment();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!payment.amount) return <p>Request #{paymentId} not found</p>;

  const amount = utils.formatEther(payment.amount.toString());
  const amountWithFee = utils.formatEther(payment.amountWithFee.toString());

  return (
    <div className="">
      <div className="text-center text-lg mb-4 font-light tracking-wide flex justify-center flex-col items-center gap-1">
        <div className="uppercase">
          Pay Request <span className="underline">#{paymentId}</span>
        </div>
        <Badge status={payment.status} />
      </div>
      <div>
        <div className="font-light tracking-wide my-2">
          <div className="text-sm font-semibold">Description</div>
          <div className="px-1 py-2">{payment.description}</div>
        </div>
        <div className="font-light tracking-wide my-2">
          <div className="text-sm font-semibold">Payer</div>
          <div className="px-1 py-2 text-sm">{payment.payer}</div>
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
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
}
