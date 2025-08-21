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
  filter?: string; // Make filter optional
}

export const getInvestmentDashboardOverview = async ({ filter }: filterprop) => {
  // Only add filter parameter if it exists and is not undefined
  const url = filter && filter !== 'undefined' 
    ? `/api/investment/investment_dash_overview?filter=${filter}`
    : `/api/investment/investment_dash_overview`;
    
  const { data } = await adminAxios.get(url);
  return data as dashboardOverviewProp;
};

export const useInvestmentDashboardOverview = (filter?: string) =>
  useQuery({
    queryKey: ['fetch-investment-dashboard-overview', filter || 'today'],
    queryFn: () => getInvestmentDashboardOverview({ filter }),
    // enabled: true // Always enabled since we handle undefined filters
  });