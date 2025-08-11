import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface portfolioProp {
  labels: string[];
  chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getDashboardPortfolioChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/accounts/dash-portfolio-doughnut-chart?filter=${filter}`);
  return data as portfolioProp ;
};

export const useDashboardPortfolioChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-dashboard-Portfolio-chart',filter], 
    queryFn:()=>getDashboardPortfolioChart({filter}),
    enabled:!!filter
  });
