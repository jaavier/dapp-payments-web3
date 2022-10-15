import { ethers } from "ethers";
import dapp from "../dapp";

function setupSmartContract() {
  if (!window.ethereum) return {};
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    dapp.address,
    dapp.abi,
    provider.getSigner()
  );
  return { provider, contract };
}

export { setupSmartContract };
