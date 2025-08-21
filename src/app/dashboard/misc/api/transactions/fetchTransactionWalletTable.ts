import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


export interface TransactionWalletTableProp {
  data: investmentProp[];
}

export interface investmentProp {
  id: number;
  date_time: string;
  type: string;
  asset: string;
  amount: number;
  reference_id: string;
  status: string;
  action?:string
}

export const transactionWalletTable = async ():Promise<TransactionWalletTableProp> => {
  const { data } = await adminAxios.get<TransactionWalletTableProp>(`/api/accounts/wallet-transactions-list/`);
  return data 
};

export const useGetTransactionWalletTable = () =>
  useQuery({
    queryKey:['fetch-transaction-Wallet-Table'], 
    queryFn:transactionWalletTable,
  });
