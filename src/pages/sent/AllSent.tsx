import { utils } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge";
import { DetectMetamask, useMetamask } from "../../metamask";

export default function AllSent() {
  const { contract } = useMetamask();
  const [requests, setRequests] = useState<Payment[]>([]);

  const loadList = async () => {
    try {
      const myPayments = await contract.getPaymentIdsRequests();
      const response = [];
      for (const paymentId of myPayments) {
        const obj = await contract.getPaymentInformation(
          parseInt(paymentId.toString())
        );
        response.push({ ...obj, paymentId });
      }
      setRequests(response);
      // setRequests(response);
    } catch (error) {
      console.log("Error loading list of payments", error);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    loadList();
    const timer = window.setInterval(() => {
      loadList();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-96">
      <div className="text-center text-lg mb-5 font-light tracking-widest">
        <div className="uppercase">Requests Sent</div>
      </div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr className="border-b border-t border-r text-sm uppercase bg-slate-100">
              <th className="p-2 font-light border-l">#</th>
              <th className="p-2 font-light">Description</th>
              <th className="p-2 font-light">Amount</th>
              <th className="p-2 font-light">Receiver</th>
              <th className="p-2 font-light">Date</th>
              <th className="p-2 font-light">Status</th>
              <th className="p-2 font-light">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request: Payment, index: number) => (
              <tr className="border-b text-sm" key={index}>
                <td className="font-extralight py-3">
                  {request.paymentId.toString()}
                </td>
                <td className="font-extralight py-3">{request.description}</td>
                <td className="font-extralight py-3">
                  {utils.formatEther(request.amount.toString())} ETH
                </td>
                <td className="font-extralight py-3 font-semibold">
                  {request.payer && request.payer.slice(0, 20)}...
                </td>
                <td className="font-extralight py-3">Today</td>
                <td className="font-extralight py-3">
                  {<Badge status={request.status} />}
                </td>
                <td className="font-extralight text-blue-700">
                  <div className="flex gap-1 justify-center">
                    <div className={`px-2 border-slate-300`}>
                      <Link to={`/request/${request.paymentId}`}>View</Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="py-2 flex justify-center text-sm">
            <div>
              Create your first{" "}
              <Link
                to="/create"
                className="text-green-700 underline font-semibold"
              >
                payment request
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
