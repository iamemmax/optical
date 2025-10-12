import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";


interface prop {
  deposit_amount: number;
  
}
export interface depositResult {
  amount: number;
  dollar_amount: number;
  exchange_rate: number;
  account_number: string;
  account_name: string;
  bank_name: string;
  transaction_reference: string;
  message: string;
}
export const depositAmount = async ({deposit_amount}:prop) => {
  const { data } = await adminAxios.post(`api/accounts/initiate-wallet-deposit/`,{deposit_amount});
  return data  as depositResult
};

export const useMakeDeposit = () =>
  useMutation({
    mutationFn:depositAmount,
  });
