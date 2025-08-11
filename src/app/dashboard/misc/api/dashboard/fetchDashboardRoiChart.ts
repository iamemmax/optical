import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";



interface RoiDataProp {
  labels: string[];
  roi_investment_chart_data: number[];
}
interface filterprop{
    filter:string
}
export const getDashboardRoiChart = async ({filter}:filterprop) => {
  const { data } = await adminAxios.get(`/api/accounts/dashboard-return-on-investment-chart?filter=${filter}`);
  return data as RoiDataProp;
};

export const useDashboardRoiChart = (filter:string) =>
  useQuery({
    queryKey:['fetch-dashboard-Roi-chart',filter], 
    queryFn:()=>getDashboardRoiChart({filter}),
    enabled:!!filter
  });
