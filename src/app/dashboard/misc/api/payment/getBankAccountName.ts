import { adminAxios } from "@/lib/axios";
import { useMutation, useQuery } from "react-query";


interface acctNameProp {
  bank_code: string;
  account_number: string;
}
interface bankAcctNameResult {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  account_number: string;
  account_name: string;
  bank_id: number;
}
export const fetchAccountName = async ({account_number,bank_code}:acctNameProp) => {
  const { data } = await adminAxios.post<bankAcctNameResult>(`api/accounts/resolve-bank-account/`,{account_number,bank_code});
  return data  as bankAcctNameResult
};

export const useFetchAccountName = () =>
  useMutation({
    mutationFn:fetchAccountName,
  });
