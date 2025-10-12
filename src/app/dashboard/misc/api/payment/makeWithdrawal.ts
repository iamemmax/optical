import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";


interface prop {
  amount: number;
  bank_code: string;
  account_number: string;
  narration: string;
  withdrawal_pin: string;
}
export const makeWithdrawal = async ({account_number,bank_code,amount,narration,withdrawal_pin}:prop) => {
  const { data } = await adminAxios.post(`api/accounts/initiate-withdrawal/`,{account_number,bank_code,amount,narration,withdrawal_pin});
  return data  
};

export const useMakeWithdrawal = () =>
  useMutation({
    mutationFn:makeWithdrawal,
  });
