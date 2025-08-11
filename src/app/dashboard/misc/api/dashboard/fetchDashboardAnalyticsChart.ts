import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface analyticsDataProp {
  labels: string[];
  trading_investment_chart_data: number[];
  onlending_chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getDashboardAnalyticsChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/accounts/dashboard-analytics-charts?filter=${filter}`);
  return data as analyticsDataProp;
};

export const useDashboardAnalyticsChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-dashboard-analytics-chart',filter], 
    queryFn:()=>getDashboardAnalyticsChart({filter}),
    enabled:!!filter
  });
