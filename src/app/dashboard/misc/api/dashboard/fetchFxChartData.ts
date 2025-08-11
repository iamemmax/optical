import axios from "axios";
import { useQuery } from "react-query";

interface FxSymbolsResponse {
  meta: Meta;
  values: Value[];
  status: string;
}

interface Value {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface Meta {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
}

interface Props {
  symbol: string;
  interval: string;
}

export const fetchFxChartData = async ({ interval, symbol }: Props): Promise<FxSymbolsResponse> => {
  const { data } = await axios.get<FxSymbolsResponse>(
    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${process.env.NEXT_PUBLIC_FX_API_KEY}`
  );
  return data;
};

export const useFetchFxChartData = (propData: Props) => {
  return useQuery<FxSymbolsResponse>({
    queryFn: () => fetchFxChartData(propData),
    queryKey: ["fetch-dashboard-fx-chart-data", propData],
    enabled: Boolean(propData?.symbol && propData?.interval), // only run if both are provided
    refetchInterval: 1000, // refresh every second
    refetchIntervalInBackground: true, // keep updating even when tab is inactive
    staleTime: 0, // always consider data stale so it refetches
  });
};
