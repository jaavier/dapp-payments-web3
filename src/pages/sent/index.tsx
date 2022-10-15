import { useEffect, useState } from "react";
import { useMetamask } from "../../metamask";

export default function Sent() {
  const { contract } = useMetamask();
  const [payments, setPayments] = useState<any[]>([]);
  const loadToGetPaid = async () => {
    try {
      const response = await contract.toGetPaid();
      setPayments(response);
    } catch (e) {
      console.log("Error loading payment", e);
    }
  };

  useEffect(() => {
    loadToGetPaid();
  }, []);

  return <div>Requests sent {payments.length}</div>;
}
