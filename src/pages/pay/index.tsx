import { useParams } from "react-router-dom";

export default function Pay() {
  const { paymentId } = useParams();

  return (
    <div>
      <div className="text-center text-lg mb-4 font-light uppercase tracking-wide">
        Pay Request <span className="underline">#{paymentId}</span>
      </div>
      <div>
        <div className="font-light tracking-wide flex gap-2">
          <div className="uppercase font-bold">Receiver</div>
          <div>0xd823Ff0182d87666e8e1eDFb4287Fd99FbDaD8C8</div>
        </div>
        <div className="font-light tracking-wide flex gap-4 my-2">
          <div className="uppercase font-bold">Amount</div>
          <div>1.3 ETH</div>
        </div>
      </div>
    </div>
  );
}
