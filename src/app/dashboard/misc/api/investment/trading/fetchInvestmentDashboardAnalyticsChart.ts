import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface analyticsDataProp {
  labels: string[];
  investment_chart_data: number[];
  roi_chart_data: number[];
}
interface filterprop {
  filter: string
}
export const getTradingInvestmentDashboardAnalyticsChart = async ({ filter }: filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/trading_investment_and_roi_chart?filter=${filter}`);
  return data as analyticsDataProp;
};

export const useTradingInvestmentDashboardAnalyticsChart = (filter: string) =>
  useQuery({
    queryKey: ['fetch-trading-investment-dashboard-analytics-chart', filter],
    queryFn: () => getTradingInvestmentDashboardAnalyticsChart({ filter }),
    enabled: !!filter
  });
