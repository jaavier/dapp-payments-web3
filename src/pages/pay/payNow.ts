import { dapp } from "../../metamask";

const payNow = async ({ payment, address }: any) => {
  const tx = {
    from: address,
    to: dapp.address,
    value: payment.amountWithFee._hex,
    gas: "99999", //todo cambiar a 21000,
    chainId: `0x${Number(11155111).toString(16)}`,
    data: dapp.iface.encodeFunctionData("pay", [parseInt(payment.paymentId)]),
  };
  await window.ethereum
    .request({ method: "eth_sendTransaction", params: [tx] })
    .then(() => {
      alert("Payment sent!");
    });
};

export default payNow;
