import { adminAxios } from "@/lib/axios";
import { useQuery } from "react-query";
interface assetDetailsProps {
  overview: Overview;
  performance_chart: Performancechart;
  investment_timelines: Investmenttimelines;
  roi_details: Roidetails;
  trade_analysis: Tradeanalysis;
}

interface Tradeanalysis {
  asset_pair: string;
  entry_price: number;
  strategy: string;
  technical_analysis: string;
  fundamental_note: string;
  sentiment_indicator: string;
  terms: string;
}

interface Roidetails {
  roi_percentage: number;
  progress_tracker: number;
  current_earnings: number;
  next_payout: number;
}

interface Investmenttimelines {
  initiated: string;
  approved_on: string;
  payout_date: string;
  maturity_date: string;
}

interface Performancechart {
  chart_label: string[];
  chart_values: number[];
}

interface Overview {
  asset_name: string;
  status: string;
  amount_invested: number;
  expected_returns: number;
  current_earnings: number;
  progress_tracker: number;
  start_date: string;
  due_date: string;
}

export const getInvestmentAssetDetails = async (id:string) => {
  const { data } = await adminAxios.get(`/api/investment/asset_detail?investment_id=${id}`);
  return data as assetDetailsProps;
};

export const useGetInvestmentAssetDetails = (id: string) =>
  useQuery({
    queryKey: ['fetch-investment-asset-details', id],
    queryFn: () => getInvestmentAssetDetails(id),
    enabled:!!id
  });

