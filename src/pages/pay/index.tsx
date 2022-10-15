import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMetamask } from "../../metamask";
import CustomButton from "../../components/CustomButton";
import { utils } from "ethers";
import dapp from "../../metamask/dapp";
import Badge from "../../components/Badge";

const iface: utils.Interface = new utils.Interface(dapp.abi);

export default function Pay() {
  const { paymentId } = useParams();
  const { user, contract } = useMetamask();
  const [payment, setPayment] = useState<Payment>({});
  const loadPayment = async () => {
    try {
      const response = await contract.toPay();
      if (response.length)
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
      to: dapp.address,
      value: payment.amountWithFee._hex,
      gas: "99999", //todo cambiar a 21000,
      chainId: `0x${Number(11155111).toString(16)}`,
      data: iface.encodeFunctionData("pay", [parseInt(paymentId)]),
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
    const timer = window.setInterval(() => {
      loadPayment();
    }, 5000);
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
      <div className="flex justify-center">
        <Link to="/pay">Go back</Link>
      </div>
    </div>
  );
}
