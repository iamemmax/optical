import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface dashboardOverviewProp {
  wallet_balance: number;
  invested_capital: number;
  return_on_investment: number;
  referral_balance: number;
}
interface filterprop{
    filter:string
}
export const getDashboardOverview = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/accounts/dash-analytics-overview?filter=${filter}`);
  return data as dashboardOverviewProp;
};

export const useDashboardOverview = (filter:string) =>
  useQuery({
    queryKey:['fetch-dashboard-overview',filter], 
    queryFn:()=>getDashboardOverview({filter})});
