import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

function loadSmartContract(
	address: string,
	abi: Record<string, any>[]
): ethers.Contract | null {
	if (!window.ethereum) return null;
	const contract = new ethers.Contract(address, abi, provider.getSigner());
	return contract;
}

export { loadSmartContract, provider };
