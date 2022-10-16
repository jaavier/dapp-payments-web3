declare type Payment = {
  description?: string;
  receiver?: string;
  payer?: string;
  amount?: number;
  amountWithFee?: any;
  status?: boolean;
  paymentId?: string;
};
