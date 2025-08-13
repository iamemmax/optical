import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface portfolioProp {
  labels: string[];
  chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getInvestmentOnlendingPortfolioChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/onlending_portfolio_doughnut_chart?filter=${filter}`);
  return data as portfolioProp ;
};

export const useGetInvestmentOnlendingPortfolioChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-investment-Onlending-Portfolio-chart',filter], 
    queryFn:()=>getInvestmentOnlendingPortfolioChart({filter}),
    enabled:!!filter
  });
