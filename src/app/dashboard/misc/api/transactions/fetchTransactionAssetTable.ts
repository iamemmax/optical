import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
import { TransactionWalletTableProp } from "./fetchTransactionWalletTable";




export const transactionAssetTable = async ():Promise<TransactionWalletTableProp> => {
  const { data } = await adminAxios.get<TransactionWalletTableProp>(`/api/accounts/assets-transactions-list/`);
  return data 
};

export const useGetTransactionAssetTable = () =>
  useQuery({
    queryKey:['fetch-transaction-Asset-Table'], 
    queryFn:transactionAssetTable,
  });
