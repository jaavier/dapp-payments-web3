import { ethers } from "ethers";
import dapp from "../dapp";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  dapp.address,
  dapp.abi,
  provider.getSigner()
);

export { contract, provider };
