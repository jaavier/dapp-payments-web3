import { utils } from "ethers";

const fields: Record<string, any> = {
  description: {
    label: "Description",
    options: {
      placeholder: "Dinner last night",
      type: "text",
      size: 30,
    },
  },
  payer: {
    label: "Wallet Payer",
    options: {
      placeholder: "0xd823Ff0182d87666e8e1eDFb4287Fd99FbDaD8C8",
      type: "text",
    },
  },
  amount: {
    label: "Amount",
    options: {
      placeholder: "1.3 ETH",
      type: "number",
    },
  },
};

export default fields;
