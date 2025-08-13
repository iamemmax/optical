import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface dashboardtradingTableProp {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

interface Result {
  id: number;
  title: string;
  investment_type: string;
  asset: string;
  amount: string;
  expected_returns: string;
  roi_percentage: string;
  duration: string;
  status: string;
  payment_method: string;
  description: string;
  start_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}
interface filterprop {
  filter: string
}
export const getInvestmentDashboardtradingTable = async () => {
  const { data } = await adminAxios.get(`/api/investment/trading_investments_table`);
  return data as dashboardtradingTableProp;
};

export const useInvestmentDashboardtradingTable = () =>
  useQuery({
    queryKey: ['fetch-investment-dashboard-tading-table'],
    queryFn:  getInvestmentDashboardtradingTable,
    // enabled:!!filter
  });

