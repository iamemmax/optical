import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";



interface RoiDataProp {
  labels: string[];
  roi_investment_chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getOnlendingInvestmentDashboardRoiChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/onlending_return_in_investments_growth_chart?filter=${filter}`);
  return data as RoiDataProp;
};

export const useGetOnlendingInvestmentDashboardRoiChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-dashboard-investment-Roi-chart',filter], 
    queryFn:()=>getOnlendingInvestmentDashboardRoiChart({filter}),
    enabled:!!filter
  });
