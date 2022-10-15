import { useMetamask, ConnectMetamask } from "../metamask";

export default function HelloMetamask() {
  const { user } = useMetamask();

  return (
    <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
      <div className="shadow-lg text-center border border-slate-300 bg-white p-10 rounded-md">
        {!user.isConnected ? (
          <ConnectMetamask />
        ) : (
          <>
            <div className="my-1 uppercase tracking-wide">
              Wallet connected:
            </div>
            <div className="my-1 tracking-widest font-extrabold">
              {user.address}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
