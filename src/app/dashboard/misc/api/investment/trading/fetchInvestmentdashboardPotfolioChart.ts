import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface portfolioProp {
  labels: string[];
  chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getInvestmentDashboardPortfolioChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/trading_portfolio_doughnut_chart?filter=${filter}`);
  return data as portfolioProp ;
};

export const useGetInvestmentDashboardPortfolioChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-investment-trading-dashboard-Portfolio-chart',filter], 
    queryFn:()=>getInvestmentDashboardPortfolioChart({filter}),
    enabled:!!filter
  });
