import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";


interface dashboardOnleandingTableProp {
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
export const getInvestmentDashboardOnleandingTable = async () => {
  const { data } = await adminAxios.get(`/api/investment/onlending_investments_table`);
  return data as dashboardOnleandingTableProp;
};

export const useInvestmentDashboardOnleandingTable = () =>
  useQuery({
    queryKey: ['fetch-investment-dashboard-onleanding-table'],
    queryFn:  getInvestmentDashboardOnleandingTable,
    // enabled:!!filter
  });

