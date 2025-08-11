// import { adminAxios } from "@/lib/axios";
import axios from "axios";
import { useQuery } from "react-query";

// Define a type for the API response



interface FxSymbolsResponse {
  data: FxSymbol[];
  count: number;
  status: string;
}

export interface FxSymbol {
  symbol: string;
  currency_group: string;
  currency_base: string;
  currency_quote: string;
}


export const fetchFxSymbols = async ()=> {
  const { data } = await axios.get(
    `https://api.twelvedata.com/forex_pairs?apikey=${process.env.NEXT_PUBLIC_FX_API_KEY}`
  );
  return data as FxSymbolsResponse;
};

export const useFetchFxSymbols = () => {
  return useQuery<FxSymbolsResponse>({
    queryFn: fetchFxSymbols,
    queryKey: ["fetch-dashboard-fx-symbols"],
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
};
