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
export const getOnlendingInvestmentDashboardAnalyticsChart = async ({ filter }: filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/onlending_investment_and_roi_chart?filter=${filter}`);
  return data as analyticsDataProp;
};

export const useOnlendingInvestmentDashboardAnalyticsChart = (filter: string) =>
  useQuery({
    queryKey: ['fetch-Onlending-investment-dashboard-analytics-chart', filter],
    queryFn: () => getOnlendingInvestmentDashboardAnalyticsChart({ filter }),
    enabled: !!filter
  });
