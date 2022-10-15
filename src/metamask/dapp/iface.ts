import { utils } from "ethers";
import abi from "./abi";

const iface: utils.Interface = new utils.Interface(abi);

export default iface;
