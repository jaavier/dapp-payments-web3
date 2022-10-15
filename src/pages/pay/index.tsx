import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMetamask } from "../../metamask";
import CustomButton from "../../components/CustomButton";

type Payment = {
  description?: string;
  receiver?: string;
  amount?: number;
  amountWithFee?: number;
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
  const payNow = async () => {};
  useEffect(() => {
    loadPayment();
  }, []);

  if (!payment.amount) return <p>Cargando...</p>;

  return (
    <div>
      <div className="text-center text-lg mb-4 font-light uppercase tracking-wide">
        Pay Request <span className="underline">#{paymentId}</span>
      </div>
      <div>
        <div className="font-light tracking-wide flex gap-2 my-2">
          <div className="uppercase font-bold">Description:</div>
          <div>{payment.description}</div>
        </div>
        <div className="font-light tracking-wide flex gap-10">
          <div className="uppercase font-bold">Receiver:</div>
          <div>{payment.receiver}</div>
        </div>
        <div className="font-light tracking-wide flex gap-12 my-2 items-center">
          <div className="uppercase font-bold">Amount:</div>
          <div className="flex items-center gap-2 h-8">
            <span>1.3 ETH</span>
            <span className="text-xs">
              (Balance: {user.balance.toString().slice(0, 10)} ETH)
            </span>
          </div>
        </div>
        <div className="mt-4">
          <CustomButton text="PAY NOW" onClick={payNow} />
        </div>
      </div>
    </div>
  );
}
