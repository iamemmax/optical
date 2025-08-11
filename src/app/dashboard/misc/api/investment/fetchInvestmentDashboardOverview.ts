import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface dashboardOverviewProp {
  invested_capital: Investedcapital;
  roi: Investedcapital;
  active_investment: Investedcapital;
  completed_investment: Investedcapital;
}

interface Investedcapital {
  amount: number;
  last_month_perc_change: number;
}
interface filterprop {
  filter: string
}
export const getInvestmentDashboardOverview = async ({ filter }: filterprop) => {
  const { data } = await adminAxios.get(`/api/investment/investment_dash_overview?filter=${filter}`);
  return data as dashboardOverviewProp;
};

export const useInvestmentDashboardOverview = (filter: string) =>
  useQuery({
    queryKey: ['fetch-investment-dashboard-overview', filter],
    queryFn: () => getInvestmentDashboardOverview({ filter }),
    enabled:!!filter
  });

