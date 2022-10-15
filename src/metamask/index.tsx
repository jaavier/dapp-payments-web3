import ConnectMetamask from "./components/ConnectMetamask";
import DetectMetamask from "./components/DetectMetamask";
import { contract, provider } from "./helpers/loadSmartContract";
import requestAccounts from "./helpers/requestAccounts";
import getBalance from "./helpers/getBalance";
import changeNetwork from "./helpers/changeNetwork";
import useMetamask from "./useMetamask";
import { MetamaskProvider } from "./context";

export {
  ConnectMetamask,
  DetectMetamask,
  MetamaskProvider,
  useMetamask,
  requestAccounts,
  getBalance,
  changeNetwork,
  contract,
  provider,
};
