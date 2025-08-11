import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";



interface RoiDataProp {
  labels: string[];
  roi_investment_chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getTradingInvestmentDashboardRoiChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/trading_return_in_investments_growth_chart?filter=${filter}`);
  return data as RoiDataProp;
};

export const useGetTradingInvestmentDashboardRoiChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-dashboard-investment-Roi-chart',filter], 
    queryFn:()=>getTradingInvestmentDashboardRoiChart({filter}),
    enabled:!!filter
  });
