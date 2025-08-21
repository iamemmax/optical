import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
import { IdCardIcon } from "@radix-ui/react-icons";


interface investmentProp {
  data:{
    id: number;
  date_time: string;
  type: string;
  asset: string;
  amount: number;
  reference_id: string;
  status: string;
  action?:string
  }
}

export const transactionDetails = async (id:string):Promise<investmentProp> => {
  const { data } = await adminAxios.get<investmentProp>(`/api/accounts/transactions-detail/?transaction_id=${id}/`);
  return data 
};

export const useGetTransactionDetails = (id:string) =>
  useQuery({
    queryKey:['fetch-transaction-details',IdCardIcon], 
    queryFn:()=>transactionDetails(id),
    enabled:!!id
  });
