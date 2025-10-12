import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface bankListprop {
  status: string;
  banks_list: Bankslist[];
}

interface Bankslist {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: null | string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  available_for_direct_debit: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export const fetchBankLists = async () => {
  const { data } = await adminAxios.get(`api/accounts/fetch-banks-list/`);
  return data  as bankListprop
};

export const useFetchBankList = () =>
  useQuery({
    queryKey:['fetch-bank-list'], 
    queryFn:fetchBankLists,
  });
