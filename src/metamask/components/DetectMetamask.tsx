import { ConnectMetamask } from "../";

export default function DetectMetamask() {
  if (!window.ethereum) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg border border-slate-300 bg-white p-7 rounded-md w-4/6 text-center">
          <span className="tracking-wide">
            Metamask is not installed in this browser 😔
          </span>
        </div>
      </div>
    );
  } else {
    return <ConnectMetamask />;
  }
}
