import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";

interface TransactionOverviewProp {
  total_transactions: Totaltransactions;
  pending_transactions: Totaltransactions;
  completed_transactions: Totaltransactions;
  failed_transactions: Totaltransactions;
}

interface Totaltransactions {
  amount: number;
  percentage: number;
}
interface filterprop {
  filter: string
}
export const transactionOverview = async ({ filter }: filterprop):Promise<TransactionOverviewProp> => {
  const { data } = await adminAxios.get<TransactionOverviewProp>(`/api/accounts/dash-transactions-overview?filter=${filter}`);
  return data 
};

export const useGetTransactionOverview = (filter: string) =>
  useQuery({
    queryKey:['fetch-transaction-Overview',filter], 
    queryFn:()=>transactionOverview({filter}),
  });
